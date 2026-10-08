/**
 * Story Download Manager — Coordinates per-story downloads, storage, and lifecycle.
 *
 * Responsibilities:
 * - Orchestrates download of individual story packages via an OfflineStorageAdapter
 * - Tracks real progress percentages (based on byte count & assets)
 * - Validates package integrity before marking as "downloaded"
 * - Handles deletion and cache clearance
 * - Emits reactive state updates to UI subscribers and cross-tab/window events
 */

import type {
  StoryOfflinePackage,
  StoryOfflineState,
  OfflineStorageAdapter,
  OfflineStorageQuota,
} from "@/types/offline";
import type { Story } from "@/types/story";
import { getOfflineStorageAdapter } from "./adapterProvider";
import { generateStoryOfflineManifest } from "./manifest";
import {
  createInitialOfflineState,
  updateDownloadProgress,
  recordDownloadFailure,
} from "./status";
import { DEFAULT_NARRATOR_ID } from "@/lib/narrators/registry";

export const OFFLINE_CHANGE_EVENT = "totg_offline_change";

type StoryStateListener = (state: StoryOfflineState) => void;
type GlobalChangeListener = () => void;

class StoryDownloadManager {
  private adapter: OfflineStorageAdapter;
  private activeStates = new Map<string, StoryOfflineState>();
  private listeners = new Map<string, Set<StoryStateListener>>();
  private globalListeners = new Set<GlobalChangeListener>();
  private abortControllers = new Map<string, AbortController>();

  constructor(adapter?: OfflineStorageAdapter) {
    this.adapter = adapter || getOfflineStorageAdapter();
  }

  /**
   * Override or swap storage adapter (e.g. for native Capacitor or testing)
   */
  public setAdapter(adapter: OfflineStorageAdapter) {
    this.adapter = adapter;
  }

  public getAdapter(): OfflineStorageAdapter {
    return this.adapter;
  }

  // ---------------------------------------------------------------------------
  // Subscription system
  // ---------------------------------------------------------------------------

  public subscribe(storySlug: string, callback: StoryStateListener): () => void {
    if (!this.listeners.has(storySlug)) {
      this.listeners.set(storySlug, new Set());
    }
    const set = this.listeners.get(storySlug)!;
    set.add(callback);

    // Initial notification if state is already known
    const currentState = this.activeStates.get(storySlug);
    if (currentState) {
      callback(currentState);
    } else {
      // Check stored package asynchronously
      this.getStoryOfflineState(storySlug).then((state) => callback(state));
    }

    return () => {
      set.delete(callback);
      if (set.size === 0) {
        this.listeners.delete(storySlug);
      }
    };
  }

  public subscribeGlobal(callback: GlobalChangeListener): () => void {
    this.globalListeners.add(callback);
    return () => {
      this.globalListeners.delete(callback);
    };
  }

  private notifyState(state: StoryOfflineState) {
    this.activeStates.set(state.storySlug, state);

    const slugListeners = this.listeners.get(state.storySlug);
    if (slugListeners) {
      slugListeners.forEach((cb) => cb(state));
    }

    this.globalListeners.forEach((cb) => cb());

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(OFFLINE_CHANGE_EVENT, { detail: state })
      );
    }
  }

  // ---------------------------------------------------------------------------
  // State querying
  // ---------------------------------------------------------------------------

  public async getStoryOfflineState(
    storySlug: string,
    narratorId?: string
  ): Promise<StoryOfflineState> {
    const memoryState = this.activeStates.get(storySlug);
    if (memoryState && memoryState.status !== "available") {
      return memoryState;
    }

    if (typeof window === "undefined") {
      return createInitialOfflineState(storySlug, narratorId);
    }

    try {
      const isAvail = await this.adapter.isAvailable();
      if (!isAvail) {
        return createInitialOfflineState(storySlug, narratorId);
      }

      const pkg = await this.adapter.getPackageMetadata(storySlug);
      if (pkg) {
        const state: StoryOfflineState = {
          storySlug,
          narratorId: pkg.narratorId,
          status: "downloaded",
          progressPercent: 100,
          downloadedBytes: pkg.totalSizeBytes,
          totalBytes: pkg.totalSizeBytes,
          lastUpdatedTimestamp: new Date(pkg.createdAt).getTime(),
          packageVersion: pkg.version,
        };
        this.activeStates.set(storySlug, state);
        return state;
      }
    } catch {
      // Fall through to initial state
    }

    const initial = createInitialOfflineState(storySlug, narratorId);
    this.activeStates.set(storySlug, initial);
    return initial;
  }

  public async isStoryDownloaded(storySlug: string): Promise<boolean> {
    const state = await this.getStoryOfflineState(storySlug);
    return state.status === "downloaded";
  }

  public async listDownloadedPackages(): Promise<StoryOfflinePackage[]> {
    if (typeof window === "undefined") return [];
    try {
      const isAvail = await this.adapter.isAvailable();
      if (!isAvail) return [];
      return await this.adapter.listDownloadedPackages();
    } catch {
      return [];
    }
  }

  public async getStorageQuota(): Promise<OfflineStorageQuota> {
    if (typeof window === "undefined") {
      return { usedBytes: 0, storyCount: 0 };
    }
    try {
      return await this.adapter.getStorageQuota();
    } catch {
      return { usedBytes: 0, storyCount: 0 };
    }
  }

  /**
   * Resolves the playable URL for an asset. If the asset has been saved
   * locally in offline storage, returns its local URI / blob URL;
   * otherwise returns undefined.
   */
  public async getOfflineAssetUri(url: string): Promise<string | undefined> {
    if (typeof window === "undefined" || !url) return undefined;
    try {
      return await this.adapter.getAssetUri(url);
    } catch {
      return undefined;
    }
  }

  /**
   * Retrieves the full offline package including embedded canonical story
   * and scene cues from persistent storage.
   */
  public async getStoryPackage(storySlug: string): Promise<StoryOfflinePackage | undefined> {
    if (typeof window === "undefined") return undefined;
    try {
      const isAvail = await this.adapter.isAvailable();
      if (!isAvail) return undefined;
      return await this.adapter.getPackageMetadata(storySlug);
    } catch {
      return undefined;
    }
  }

  // ---------------------------------------------------------------------------
  // Download execution
  // ---------------------------------------------------------------------------

  public async downloadStory(
    story: Story,
    narratorId: string = DEFAULT_NARRATOR_ID
  ): Promise<void> {
    const isAvail = await this.adapter.isAvailable();
    if (!isAvail) {
      const failState = recordDownloadFailure(
        createInitialOfflineState(story.slug, narratorId),
        "Offline storage is not supported or accessible on this browser."
      );
      this.notifyState(failState);
      throw new Error(failState.error);
    }

    const abortController = new AbortController();
    this.abortControllers.set(story.slug, abortController);

    // 1. Generate package manifest
    const pkg = generateStoryOfflineManifest(story, narratorId);
    const totalBytes = Math.max(1, pkg.totalSizeBytes);

    // Initial queued state
    let currentState: StoryOfflineState = {
      storySlug: story.slug,
      narratorId,
      status: "queued",
      progressPercent: 0,
      downloadedBytes: 0,
      totalBytes,
      lastUpdatedTimestamp: Date.now(),
    };
    this.notifyState(currentState);

    let accumulatedBytes = 0;

    try {
      // 2. Download assets sequentially to maintain steady progress and prevent network congestion
      for (let i = 0; i < pkg.assets.length; i++) {
        if (abortController.signal.aborted) {
          throw new Error("Download cancelled by user.");
        }

        const asset = pkg.assets[i];
        const assetExpectedBytes = asset.fileSizeBytes || Math.round(totalBytes / pkg.assets.length);

        try {
          const res = await fetch(asset.url, {
            signal: abortController.signal,
          });

          if (!res.ok) {
            // If asset is required, fail download
            if (asset.required) {
              throw new Error(`Required asset failed to load (${res.status}): ${asset.url}`);
            }
            // Optional asset (e.g. cue JSON or cover image missing), continue
            accumulatedBytes += assetExpectedBytes;
            currentState = updateDownloadProgress(currentState, accumulatedBytes, totalBytes);
            this.notifyState(currentState);
            continue;
          }

          const blob = await res.blob();
          const actualBytes = blob.size || assetExpectedBytes;
          await this.adapter.saveAsset(asset.url, blob);

          accumulatedBytes += actualBytes;
          currentState = updateDownloadProgress(currentState, accumulatedBytes, totalBytes);
          this.notifyState(currentState);
        } catch (assetErr: any) {
          if (abortController.signal.aborted) throw assetErr;
          if (asset.required) {
            throw assetErr;
          }
          // Non-required asset failed, keep progressing
          accumulatedBytes += assetExpectedBytes;
          currentState = updateDownloadProgress(currentState, accumulatedBytes, totalBytes);
          this.notifyState(currentState);
        }
      }

      // 3. Save package metadata to persistent storage
      await this.adapter.savePackageMetadata(pkg);

      // 4. Validate package before marking complete
      const savedPkg = await this.adapter.getPackageMetadata(story.slug);
      if (!savedPkg) {
        throw new Error("Package verification failed: metadata could not be retrieved from storage.");
      }

      // Check package version and narrator alignment
      if (savedPkg.version !== pkg.version) {
        throw new Error(`Package verification failed: version mismatch (${savedPkg.version} !== ${pkg.version}).`);
      }
      if (savedPkg.narratorId !== narratorId) {
        throw new Error(`Package verification failed: narrator mismatch (${savedPkg.narratorId} !== ${narratorId}).`);
      }

      // Verify all required assets are readable from storage adapter
      for (const asset of pkg.assets) {
        if (asset.required) {
          const resolved = await this.adapter.getAssetUri(asset.url);
          if (!resolved) {
            throw new Error(`Package verification failed: required asset missing from storage (${asset.url}).`);
          }
        }
      }

      // 5. Finalize state
      const finalState: StoryOfflineState = {
        storySlug: story.slug,
        narratorId,
        status: "downloaded",
        progressPercent: 100,
        downloadedBytes: totalBytes,
        totalBytes,
        lastUpdatedTimestamp: Date.now(),
        packageVersion: pkg.version,
      };
      this.notifyState(finalState);
    } catch (err: any) {
      const failState = recordDownloadFailure(
        currentState,
        err.message || "Failed to download story package."
      );
      this.notifyState(failState);
      throw err;
    } finally {
      this.abortControllers.delete(story.slug);
    }
  }

  // ---------------------------------------------------------------------------
  // Removal
  // ---------------------------------------------------------------------------

  public async removeStory(storySlug: string): Promise<void> {
    // Abort if currently downloading
    const activeAbort = this.abortControllers.get(storySlug);
    if (activeAbort) {
      activeAbort.abort();
      this.abortControllers.delete(storySlug);
    }

    const removingState: StoryOfflineState = {
      storySlug,
      status: "removing",
      progressPercent: 0,
      downloadedBytes: 0,
      totalBytes: 0,
      lastUpdatedTimestamp: Date.now(),
    };
    this.notifyState(removingState);

    try {
      const pkg = await this.adapter.getPackageMetadata(storySlug);
      if (pkg && pkg.assets) {
        // Delete all cached asset blobs
        await Promise.allSettled(
          pkg.assets.map((asset) => this.adapter.deleteAsset(asset.url))
        );
      }
      await this.adapter.removePackage(storySlug);
    } catch (err) {
      console.warn(`[StoryDownloadManager] Error clearing package for ${storySlug}:`, err);
    }

    const availableState = createInitialOfflineState(storySlug);
    this.notifyState(availableState);
  }
}

// Global singleton instance
export const storyDownloadManager = new StoryDownloadManager();
