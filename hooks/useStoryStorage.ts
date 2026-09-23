"use client";

import { useState, useEffect, useCallback } from "react";
import { StoryProgress, RecentStory } from "@/types/story";
import {
  getFavorites,
  toggleFavorite as storageToggleFavorite,
  removeFavorite as storageRemoveFavorite,
  getReadingProgress,
  getRecentStories,
  STORAGE_EVENT_NAME,
} from "@/lib/storyStorage";

export function useStoryStorage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progressList, setProgressList] = useState<StoryProgress[]>([]);
  const [recentList, setRecentList] = useState<RecentStory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = useCallback(() => {
    setFavorites(getFavorites());
    setProgressList(getReadingProgress());
    setRecentList(getRecentStories());
  }, []);

  useEffect(() => {
    refresh();
    setIsLoaded(true);

    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener(STORAGE_EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(STORAGE_EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  const toggleFav = useCallback((slug: string) => {
    return storageToggleFavorite(slug);
  }, []);

  const removeFav = useCallback((slug: string) => {
    storageRemoveFavorite(slug);
  }, []);

  const isFav = useCallback(
    (slug: string) => {
      return favorites.includes(slug);
    },
    [favorites]
  );

  const getProgress = useCallback(
    (slug: string) => {
      return progressList.find((p) => p.storySlug === slug);
    },
    [progressList]
  );

  return {
    favorites,
    progressList,
    recentList,
    isLoaded,
    toggleFav,
    removeFav,
    isFav,
    getProgress,
    refresh,
  };
}
