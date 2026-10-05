"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  StoryOfflineState,
  StoryOfflinePackage,
  OfflineStatus,
} from "@/types/offline";
import type { Story } from "@/types/story";
import {
  storyDownloadManager,
  OFFLINE_CHANGE_EVENT,
} from "@/lib/offline/storyDownloadManager";
import { useNarrator } from "@/hooks/useNarrator";

export interface UseOfflineStoryReturn {
  status: OfflineStatus;
  isOfflineReady: boolean;
  isDownloading: boolean;
  progressPercent: number;
  downloadedBytes: number;
  totalBytes: number;
  error?: string;
  downloadStory: () => Promise<void>;
  removeStory: () => Promise<void>;
  resolveAssetUri: (url: string) => Promise<string | undefined>;
  getStoryPackage: () => Promise<StoryOfflinePackage | undefined>;
}

export function useOfflineStory(story?: Story): UseOfflineStoryReturn {
  const { selectedNarratorId } = useNarrator();
  const storySlug = story?.slug;

  const [state, setState] = useState<StoryOfflineState>({
    storySlug: storySlug || "",
    status: "available",
    progressPercent: 0,
    downloadedBytes: 0,
    totalBytes: 0,
    lastUpdatedTimestamp: Date.now(),
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (!storySlug) return;

    // Subscribe to manager updates for this story
    const unsubscribe = storyDownloadManager.subscribe(storySlug, (newState) => {
      if (isMountedRef.current) {
        setState(newState);
      }
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [storySlug]);

  const downloadStory = useCallback(async () => {
    if (!story) return;
    try {
      await storyDownloadManager.downloadStory(story, selectedNarratorId);
    } catch (err) {
      console.warn(`[useOfflineStory] Download failed for ${story.slug}:`, err);
    }
  }, [story, selectedNarratorId]);

  const removeStory = useCallback(async () => {
    if (!storySlug) return;
    try {
      await storyDownloadManager.removeStory(storySlug);
    } catch (err) {
      console.warn(`[useOfflineStory] Removal failed for ${storySlug}:`, err);
    }
  }, [storySlug]);

  const resolveAssetUri = useCallback(
    async (url: string): Promise<string | undefined> => {
      if (!url) return undefined;
      return storyDownloadManager.getOfflineAssetUri(url);
    },
    []
  );

  const getStoryPackage = useCallback(async (): Promise<StoryOfflinePackage | undefined> => {
    if (!storySlug) return undefined;
    return storyDownloadManager.getStoryPackage(storySlug);
  }, [storySlug]);

  return {
    status: state.status,
    isOfflineReady: state.status === "downloaded",
    isDownloading: state.status === "downloading" || state.status === "queued",
    progressPercent: state.progressPercent,
    downloadedBytes: state.downloadedBytes,
    totalBytes: state.totalBytes,
    error: state.error,
    downloadStory,
    removeStory,
    resolveAssetUri,
    getStoryPackage,
  };
}

/**
 * Hook to retrieve all downloaded stories for library filtering
 */
export function useDownloadedStories() {
  const [downloadedPackages, setDownloadedPackages] = useState<StoryOfflinePackage[]>([]);
  const [downloadedSlugs, setDownloadedSlugs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const fetchDownloaded = useCallback(async () => {
    try {
      const packages = await storyDownloadManager.listDownloadedPackages();
      setDownloadedPackages(packages);
      setDownloadedSlugs(new Set(packages.map((p) => p.slug)));
    } catch (err) {
      console.warn("[useDownloadedStories] Failed to fetch downloaded packages:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDownloaded();

    // Subscribe to global manager changes
    const unsubGlobal = storyDownloadManager.subscribeGlobal(() => {
      fetchDownloaded();
    });

    // Also listen to window event for cross-tab sync
    const handleWindowEvent = () => {
      fetchDownloaded();
    };

    if (typeof window !== "undefined") {
      window.addEventListener(OFFLINE_CHANGE_EVENT, handleWindowEvent);
    }

    return () => {
      unsubGlobal();
      if (typeof window !== "undefined") {
        window.removeEventListener(OFFLINE_CHANGE_EVENT, handleWindowEvent);
      }
    };
  }, [fetchDownloaded]);

  return {
    downloadedPackages,
    downloadedSlugs,
    isLoading,
    refresh: fetchDownloaded,
  };
}
