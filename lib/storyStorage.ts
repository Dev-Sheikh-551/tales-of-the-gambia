import { StoryProgress, RecentStory, AudioSettings } from "@/types/story";

export const STORAGE_KEYS = {
  FAVORITES: "totg_favorites",
  PROGRESS: "totg_reading_progress",
  RECENT: "totg_recent_stories",
  AUDIO_SETTINGS: "totg_audio_settings",
} as const;

export const STORAGE_EVENT_NAME = "totg-storage-update";

function notifyStorageUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT_NAME));
  }
}

// ---------------- FAVORITES ----------------
export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const list = getFavorites();
    let updated: string[];
    let state: boolean;
    if (list.includes(slug)) {
      updated = list.filter((s) => s !== slug);
      state = false;
    } else {
      updated = [...list, slug];
      state = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    notifyStorageUpdate();
    return state;
  } catch {
    return false;
  }
}

export function removeFavorite(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getFavorites().filter((s) => s !== slug);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
    notifyStorageUpdate();
  } catch {
    // Ignore
  }
}

// ---------------- READING PROGRESS ----------------
export function getReadingProgress(): StoryProgress[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getStoryProgress(slug: string): StoryProgress | undefined {
  return getReadingProgress().find((item) => item.storySlug === slug);
}

export function saveReadingProgress(
  slug: string,
  sceneNumber: number,
  totalScenes: number,
  audioPositionSeconds?: number
): void {
  if (typeof window === "undefined") return;
  try {
    const list = getReadingProgress().filter((item) => item.storySlug !== slug);
    const percentComplete = Math.min(100, Math.round((sceneNumber / totalScenes) * 100));
    const entry: StoryProgress = {
      storySlug: slug,
      currentSceneNumber: sceneNumber,
      totalScenes,
      percentComplete,
      lastReadTimestamp: Date.now(),
    };
    if (audioPositionSeconds !== undefined && audioPositionSeconds > 0) {
      entry.audioPositionSeconds = audioPositionSeconds;
    }
    list.unshift(entry);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(list));
    notifyStorageUpdate();
  } catch {
    // Ignore
  }
}

export function clearReadingProgress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    notifyStorageUpdate();
  } catch {
    // Ignore
  }
}

// ---------------- RECENT STORIES ----------------
const MAX_RECENT_STORIES = 8;

export function getRecentStories(): RecentStory[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECENT);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function recordRecentStory(storyId: string, slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getRecentStories().filter((item) => item.slug !== slug);
    list.unshift({
      storyId,
      slug,
      timestamp: Date.now(),
    });
    const trimmed = list.slice(0, MAX_RECENT_STORIES);
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(trimmed));
    notifyStorageUpdate();
  } catch {
    // Ignore
  }
}

export function clearRecentStories(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT);
    notifyStorageUpdate();
  } catch {
    // Ignore
  }
}

// ---------------- AUDIO SETTINGS ----------------
const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  narrationVolume: 1,
  ambienceVolume: 0.2,
  playbackRate: 1,
  ambienceEnabled: true,
};

export function getAudioSettings(): AudioSettings {
  if (typeof window === "undefined") return { ...DEFAULT_AUDIO_SETTINGS };
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AUDIO_SETTINGS);
    if (!data) return { ...DEFAULT_AUDIO_SETTINGS };
    const parsed = JSON.parse(data);
    return {
      ...DEFAULT_AUDIO_SETTINGS,
      ...parsed,
      ambienceEnabled: parsed.ambienceEnabled !== undefined ? parsed.ambienceEnabled : true,
    };
  } catch {
    return { ...DEFAULT_AUDIO_SETTINGS };
  }
}

export function saveAudioSettings(partial: Partial<AudioSettings>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getAudioSettings();
    const updated: AudioSettings = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEYS.AUDIO_SETTINGS, JSON.stringify(updated));
    // Audio settings don't need to trigger the storage UI update event
  } catch {
    // Ignore
  }
}

export function resetAudioSettings(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.AUDIO_SETTINGS);
  } catch {
    // Ignore
  }
}
