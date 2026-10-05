"use client";

import { useState, useEffect, useCallback } from "react";
import { Narrator } from "@/types/narrator";
import {
  DEFAULT_NARRATOR_ID,
  getAllNarrators,
  getAvailableNarrators,
  getNarratorById,
  getDefaultNarrator,
} from "@/lib/narrators/registry";
import {
  getSelectedNarratorId,
  setSelectedNarratorId,
  STORAGE_EVENT_NAME,
} from "@/lib/storyStorage";

export interface UseNarratorReturn {
  /** Active selected narrator identifier (e.g. "amara-gambia") */
  selectedNarratorId: string;
  /** Complete Narrator object for the selected storyteller */
  selectedNarrator: Narrator;
  /** List of all registered narrators (including Coming Soon) */
  allNarrators: Narrator[];
  /** List of only narrators with available audio tracks */
  availableNarrators: Narrator[];
  /** Whether a given narrator ID has production audio available */
  isNarratorAvailable: (id: string) => boolean;
  /**
   * Attempts to select a narrator.
   * If the narrator has active audio tracks, updates preference and returns success.
   * If the narrator is Coming Soon, leaves current selection untouched and returns error.
   */
  selectNarrator: (id: string) => { success: boolean; reason?: string };
}

export function useNarrator(): UseNarratorReturn {
  const [selectedNarratorId, setSelectedNarratorIdState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_NARRATOR_ID;
    return getSelectedNarratorId();
  });

  // Keep state synchronized with storage updates (e.g. across tabs, reader, cinematic mode)
  useEffect(() => {
    const handleStorageUpdate = () => {
      const storedId = getSelectedNarratorId();
      setSelectedNarratorIdState(storedId);
    };

    window.addEventListener(STORAGE_EVENT_NAME, handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener(STORAGE_EVENT_NAME, handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const allNarrators = getAllNarrators();
  const availableNarrators = getAvailableNarrators();

  const selectedNarrator =
    getNarratorById(selectedNarratorId) || getDefaultNarrator();

  const isNarratorAvailable = useCallback(
    (id: string): boolean => {
      const narrator = getNarratorById(id);
      return Boolean(narrator?.available);
    },
    []
  );

  const selectNarrator = useCallback(
    (id: string): { success: boolean; reason?: string } => {
      const target = getNarratorById(id);
      if (!target) {
        return { success: false, reason: "Unknown narrator voice" };
      }

      if (!target.available) {
        return {
          success: false,
          reason: `${target.name} is currently in production and coming soon. Narration will remain with ${selectedNarrator.name}.`,
        };
      }

      setSelectedNarratorId(id);
      setSelectedNarratorIdState(id);
      return { success: true };
    },
    [selectedNarrator.name]
  );

  return {
    selectedNarratorId,
    selectedNarrator,
    allNarrators,
    availableNarrators,
    isNarratorAvailable,
    selectNarrator,
  };
}
