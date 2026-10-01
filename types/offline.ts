import { Story } from "./story";

/**
 * State of an offline story download package
 */
export type OfflineStatus =
  | "available"   // Package metadata available on server; not yet downloaded locally
  | "queued"      // User requested download; waiting in task queue
  | "downloading" // Actively downloading assets
  | "downloaded"  // Fully downloaded and verified offline
  | "paused"      // Download temporarily suspended
  | "failed"      // Download encountered an unrecoverable error
  | "removing";   // Background job deleting local cached files

/**
 * Categories of downloadable story assets
 */
export type OfflineAssetType =
  | "audio"       // Scene narration MP3 files
  | "image"       // Cover art, scene visuals, SVG/WebP illustrations
  | "animation"   // Lottie JSON / dotLottie binary files
  | "cue-data"    // Precise word/sentence synchronization JSON manifests
  | "story-json"; // Canonical story metadata & narrative text

/**
 * A discrete asset item within a story's offline bundle
 */
export interface OfflineAssetEntry {
  /** Original remote or static URL (e.g. "/audio/stories/hare-drought/scene-01.mp3") */
  url: string;
  /** Local storage URI when downloaded (e.g. "capacitor://localhost/_offline/stories/...") */
  localUri?: string;
  /** Asset category */
  type: OfflineAssetType;
  /** Size in bytes if known */
  fileSizeBytes?: number;
  /** Cryptographic or content hash for cache busting and integrity verification */
  checksum?: string;
  /** Whether the story experience requires this asset to function offline */
  required: boolean;
}

/**
 * Full structural description of an offline story package.
 * Defines everything needed to download, store, and play a story without network connectivity.
 */
export interface StoryOfflinePackage {
  /** Story identifier (e.g. "story-hare-drought") */
  storyId: string;
  /** URL slug */
  slug: string;
  /** Package schema/data version (e.g. "2.0.0") */
  version: string;
  /** Story title */
  title: string;
  /** Active narrator identity for this package */
  narratorId?: string;
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** Estimated total uncompressed payload size in bytes */
  totalSizeBytes: number;
  /** All discrete asset items */
  assets: OfflineAssetEntry[];
  /** Convenience array of audio asset URLs */
  audioAssets: string[];
  /** Convenience array of image asset URLs */
  imageAssets: string[];
  /** Convenience array of animation asset URLs */
  animationAssets: string[];
  /** Convenience array of data/cue asset URLs */
  dataAssets: string[];
  /** Embedded canonical story payload (cached for instant offline reader initialization) */
  embeddedStory?: Story;
}

/**
 * Real-time download progress and persistence state for a single story
 */
export interface StoryOfflineState {
  storySlug: string;
  narratorId?: string;
  status: OfflineStatus;
  /** Progress percentage from 0 to 100 */
  progressPercent: number;
  /** Bytes received so far */
  downloadedBytes: number;
  /** Total bytes expected */
  totalBytes: number;
  /** Timestamp of last state change or progress update */
  lastUpdatedTimestamp: number;
  /** Human-readable error message if status is 'failed' */
  error?: string;
  /** Version string of the currently saved offline package */
  packageVersion?: string;
}

/**
 * Device storage quota and utilization metrics
 */
export interface OfflineStorageQuota {
  /** Bytes used by downloaded stories */
  usedBytes: number;
  /** Total storage capacity allocated for the application if known */
  quotaBytes?: number;
  /** Number of stories stored offline */
  storyCount: number;
  /** Space available before reaching storage limit */
  remainingBytes?: number;
}

/**
 * Abstract storage engine interface for offline persistence.
 * Implementable by IndexedDB on web and @capacitor/filesystem on native mobile.
 */
export interface OfflineStorageAdapter {
  isAvailable(): Promise<boolean>;
  saveAsset(url: string, data: Blob | ArrayBuffer): Promise<string>;
  getAssetUri(url: string): Promise<string | undefined>;
  deleteAsset(url: string): Promise<boolean>;
  savePackageMetadata(pkg: StoryOfflinePackage): Promise<void>;
  getPackageMetadata(slug: string): Promise<StoryOfflinePackage | undefined>;
  removePackage(slug: string): Promise<void>;
  listDownloadedPackages(): Promise<StoryOfflinePackage[]>;
  getStorageQuota(): Promise<OfflineStorageQuota>;
}
