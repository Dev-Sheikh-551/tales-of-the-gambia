"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Scene, Story } from "@/types/story";

export type PlaybackState =
  | "idle"
  | "playing"
  | "paused"
  | "transitioning"
  | "completed";

interface UseStoryPlaybackOptions {
  story: Story;
  initialSceneIndex?: number;
  onExit?: () => void;
  autoAdvanceDefault?: boolean;
  /**
   * When true, the built-in timer interval will NOT trigger auto-advance.
   * Scene advancement is instead driven by the `onNarrationEnded` callback
   * from `useStoryAudio`. Set to true when real narration audio is present
   * for the current scene.
   */
  audioMode?: boolean;
}

export function useStoryPlayback({
  story,
  initialSceneIndex = 0,
  onExit,
  autoAdvanceDefault = true,
  audioMode = false,
}: UseStoryPlaybackOptions) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(initialSceneIndex);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAutoAdvanceEnabled, setIsAutoAdvanceEnabled] = useState(autoAdvanceDefault);
  const [savedProgressPrompt, setSavedProgressPrompt] = useState<{
    sceneIndex: number;
    percent: number;
  } | null>(null);

  const totalScenes = story.scenes.length;
  const currentScene: Scene = story.scenes[currentSceneIndex] || story.scenes[0];
  const sceneDuration = currentScene.durationSeconds || 15;

  // Track previous state for clean pause/resume during manual transitions
  const stateBeforeTransitionRef = useRef<PlaybackState>("playing");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check saved progress from localStorage on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("totg_reading_progress");
      if (stored) {
        const parsed = JSON.parse(stored);
        const item = parsed.find(
          (p: { storySlug: string; currentSceneNumber: number }) =>
            p.storySlug === story.slug
        );
        if (item && item.currentSceneNumber > 1 && item.currentSceneNumber <= totalScenes) {
          setSavedProgressPrompt({
            sceneIndex: item.currentSceneNumber - 1,
            percent: item.percentComplete || 0,
          });
        }
      }
    } catch {
      // Ignore in SSR
    }
  }, [story.slug, totalScenes]);

  // Persist current scene progress to localStorage
  const saveProgress = useCallback(
    (sceneIdx: number) => {
      try {
        const stored = localStorage.getItem("totg_reading_progress");
        const parsed = stored ? JSON.parse(stored) : [];
        const filtered = parsed.filter(
          (p: { storySlug: string }) => p.storySlug !== story.slug
        );
        filtered.unshift({
          storySlug: story.slug,
          currentSceneNumber: sceneIdx + 1,
          totalScenes,
          percentComplete: Math.round(((sceneIdx + 1) / totalScenes) * 100),
          lastReadTimestamp: Date.now(),
        });
        localStorage.setItem("totg_reading_progress", JSON.stringify(filtered));
      } catch {
        // Ignore
      }
    },
    [story.slug, totalScenes]
  );

  // Clear running timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Transition to a specific scene cleanly
  const transitionToScene = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= totalScenes) return;

      clearTimer();
      setPlaybackState("transitioning");
      setElapsedSeconds(0);

      const timer = setTimeout(() => {
        setCurrentSceneIndex(targetIndex);
        saveProgress(targetIndex);
        setPlaybackState(
          stateBeforeTransitionRef.current === "playing" ? "playing" : "paused"
        );
      }, 400);

      return () => clearTimeout(timer);
    },
    [clearTimer, totalScenes, saveProgress]
  );

  // Scene navigation actions
  const goToNextScene = useCallback(() => {
    if (currentSceneIndex < totalScenes - 1) {
      transitionToScene(currentSceneIndex + 1);
    } else {
      clearTimer();
      setPlaybackState("completed");
    }
  }, [currentSceneIndex, totalScenes, transitionToScene, clearTimer]);

  const goToPreviousScene = useCallback(() => {
    if (currentSceneIndex > 0) {
      transitionToScene(currentSceneIndex - 1);
    }
  }, [currentSceneIndex, transitionToScene]);

  const jumpToScene = useCallback(
    (index: number) => {
      transitionToScene(index);
    },
    [transitionToScene]
  );

  // Transport controls
  const play = useCallback(() => {
    if (playbackState === "completed") {
      transitionToScene(0);
      setPlaybackState("playing");
      stateBeforeTransitionRef.current = "playing";
      return;
    }
    stateBeforeTransitionRef.current = "playing";
    setPlaybackState("playing");
  }, [playbackState, transitionToScene]);

  const pause = useCallback(() => {
    stateBeforeTransitionRef.current = "paused";
    setPlaybackState("paused");
  }, []);

  const togglePlayPause = useCallback(() => {
    if (playbackState === "playing") {
      pause();
    } else {
      play();
    }
  }, [playbackState, pause, play]);

  const replay = useCallback(() => {
    transitionToScene(0);
    stateBeforeTransitionRef.current = "playing";
    setPlaybackState("playing");
  }, [transitionToScene]);

  // Main countdown timer when playing
  useEffect(() => {
    if (playbackState === "playing") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 0.5;
          if (next >= sceneDuration) {
            // In audioMode, the timer never auto-advances — the audio "ended"
            // event triggers goToNextScene via the onNarrationEnded callback.
            if (!audioMode && isAutoAdvanceEnabled) {
              if (currentSceneIndex >= totalScenes - 1) {
                setPlaybackState("completed");
                return sceneDuration;
              } else {
                goToNextScene();
                return 0;
              }
            } else if (!audioMode) {
              setPlaybackState("paused");
              return sceneDuration;
            }
            // audioMode: keep ticking at sceneDuration max; audio will trigger advance
            return sceneDuration;
          }
          return next;
        });
      }, 500);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [
    playbackState,
    sceneDuration,
    isAutoAdvanceEnabled,
    audioMode,
    currentSceneIndex,
    totalScenes,
    goToNextScene,
    clearTimer,
  ]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input, textarea, select, or contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNextScene();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPreviousScene();
          break;
        case "Escape":
          e.preventDefault();
          if (onExit) onExit();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause, goToNextScene, goToPreviousScene, onExit]);

  // Handle saved progress resume vs start from beginning
  const acceptResume = () => {
    if (savedProgressPrompt) {
      transitionToScene(savedProgressPrompt.sceneIndex);
      setSavedProgressPrompt(null);
      play();
    }
  };

  const declineResume = () => {
    setSavedProgressPrompt(null);
    transitionToScene(0);
    play();
  };

  const progressPercent = Math.min(
    100,
    Math.round((elapsedSeconds / sceneDuration) * 100)
  );

  return {
    currentSceneIndex,
    currentScene,
    totalScenes,
    playbackState,
    elapsedSeconds,
    sceneDuration,
    progressPercent,
    isAutoAdvanceEnabled,
    setIsAutoAdvanceEnabled,
    savedProgressPrompt,
    acceptResume,
    declineResume,
    play,
    pause,
    togglePlayPause,
    goToNextScene,
    goToPreviousScene,
    jumpToScene,
    replay,
  };
}
