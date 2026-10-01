import { StoryOfflineState, OfflineStatus } from "@/types/offline";

/**
 * Creates the default initial offline state for an un-downloaded story
 */
export function createInitialOfflineState(
  storySlug: string,
  narratorId?: string
): StoryOfflineState {
  return {
    storySlug,
    narratorId,
    status: "available",
    progressPercent: 0,
    downloadedBytes: 0,
    totalBytes: 0,
    lastUpdatedTimestamp: Date.now(),
  };
}

/**
 * Pure transition helper to advance download progress
 */
export function updateDownloadProgress(
  previousState: StoryOfflineState,
  downloadedBytes: number,
  totalBytes: number
): StoryOfflineState {
  const percent = totalBytes > 0 ? Math.min(100, Math.round((downloadedBytes / totalBytes) * 100)) : 0;
  return {
    ...previousState,
    status: percent >= 100 ? "downloaded" : "downloading",
    progressPercent: percent,
    downloadedBytes,
    totalBytes,
    lastUpdatedTimestamp: Date.now(),
    error: undefined,
  };
}

/**
 * Pure transition helper to record a download error
 */
export function recordDownloadFailure(
  previousState: StoryOfflineState,
  errorMessage: string
): StoryOfflineState {
  return {
    ...previousState,
    status: "failed",
    error: errorMessage,
    lastUpdatedTimestamp: Date.now(),
  };
}

/**
 * Pure transition helper to mark a package as fully removed
 */
export function markPackageRemoved(
  storySlug: string,
  narratorId?: string
): StoryOfflineState {
  return createInitialOfflineState(storySlug, narratorId);
}

/**
 * Checks if a story offline state represents a playable offline package
 */
export function isStoryPlayableOffline(state?: StoryOfflineState): boolean {
  return state !== undefined && state.status === "downloaded";
}
