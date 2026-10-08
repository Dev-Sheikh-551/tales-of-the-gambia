"use client";

import React, { useEffect, useState } from "react";
import { X, Sparkles, RotateCcw, Play } from "lucide-react";
import { Story } from "@/types/story";
import { useStoryPlayback } from "@/hooks/useStoryPlayback";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { useNarrator } from "@/hooks/useNarrator";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { useOfflineStory } from "@/hooks/useOfflineStory";
import { StoryDownloadButton } from "../StoryDownloadButton";
import { NarratorPicker } from "../NarratorPicker";
import { StorySceneViewport } from "./StorySceneViewport";
import { StoryPlaybackControls } from "./StoryPlaybackControls";
import { StoryCompletionView } from "./StoryCompletionView";
import { registerBackButtonHandler } from "@/lib/native/backButton";

interface StoryCinematicModeProps {
  story: Story;
  onExit: () => void;
  initialSceneIndex?: number;
}

export function StoryCinematicMode({
  story,
  onExit,
  initialSceneIndex = 0,
}: StoryCinematicModeProps) {
  // Pre-check for audio mode on initial render
  const [currentSceneIdx, setCurrentSceneIdx] = React.useState(initialSceneIndex);
  const { selectedNarratorId, selectedNarrator } = useNarrator();
  const [isNarratorPickerOpen, setIsNarratorPickerOpen] = React.useState(false);

  const {
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
    togglePlayPause,
    goToNextScene,
    goToPreviousScene,
    jumpToScene,
    replay,
  } = useStoryPlayback({
    story,
    initialSceneIndex,
    onExit,
    autoAdvanceDefault: true,
    audioMode: Boolean(story.scenes[currentSceneIdx]?.audio?.narrationUrl),
  });

  // Keep currentSceneIdx in sync with useStoryPlayback
  React.useEffect(() => {
    setCurrentSceneIdx(currentSceneIndex);
  }, [currentSceneIndex]);

  // Resolve narration track for current scene given the selected storyteller
  const resolvedNarration = resolveSceneNarration(currentScene.audio, selectedNarratorId);

  // Offline asset resolution: use cached audio blob/URI when story is downloaded
  const { isOfflineReady, resolveAssetUri } = useOfflineStory(story);
  const [effectiveAudioSrc, setEffectiveAudioSrc] = useState<string | undefined>(
    resolvedNarration.narrationUrl
  );

  useEffect(() => {
    let isMounted = true;
    if (!resolvedNarration.narrationUrl) {
      setEffectiveAudioSrc(undefined);
      return;
    }

    if (isOfflineReady) {
      resolveAssetUri(resolvedNarration.narrationUrl).then((localUri) => {
        if (isMounted) {
          setEffectiveAudioSrc(localUri || resolvedNarration.narrationUrl);
        }
      });
    } else {
      setEffectiveAudioSrc(resolvedNarration.narrationUrl);
    }

    return () => {
      isMounted = false;
    };
  }, [resolvedNarration.narrationUrl, isOfflineReady, resolveAssetUri]);

  const storyAudio = useStoryAudio({
    narrationSrc: effectiveAudioSrc,
    onNarrationEnded: () => {
      if (isAutoAdvanceEnabled) {
        goToNextScene();
      }
    },
  });

  // Synchronize audio playback with story playback state
  useEffect(() => {
    if (
      playbackState === "playing" &&
      storyAudio.hasAudio &&
      (storyAudio.audioState === "ready" || storyAudio.audioState === "paused")
    ) {
      storyAudio.play().catch(() => {});
    } else if (
      playbackState === "paused" ||
      playbackState === "completed" ||
      playbackState === "idle"
    ) {
      storyAudio.pause();
    }
  }, [playbackState, storyAudio.hasAudio, storyAudio.audioState, currentSceneIndex]);

  // Lock body scroll when in cinematic mode
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
      storyAudio.pause();
    };
  }, []);

  // Register native Android back-button handler to exit cinematic mode cleanly
  useEffect(() => {
    return registerBackButtonHandler(() => {
      onExit();
      return true;
    });
  }, [onExit]);

  const isPaused = playbackState === "paused";
  const isCompleted = playbackState === "completed";

  // When narration audio exists, audio duration and current time become authoritative
  const effectiveDuration =
    storyAudio.hasAudio && (storyAudio.duration > 0 || resolvedNarration.narrationDurationSeconds || currentScene.audio?.narrationDurationSeconds)
      ? storyAudio.duration || resolvedNarration.narrationDurationSeconds || currentScene.audio?.narrationDurationSeconds || sceneDuration
      : sceneDuration;

  const effectiveElapsed = storyAudio.hasAudio
    ? storyAudio.currentTime
    : elapsedSeconds;

  const effectiveProgressPercent =
    effectiveDuration > 0
      ? Math.min(100, Math.round((effectiveElapsed / effectiveDuration) * 100))
      : progressPercent;

  // Mobile cinematic controls visibility: tap to reveal, auto-fade during playback
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimeout = React.useCallback(() => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (playbackState === "playing") {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  }, [playbackState]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, [playbackState, currentSceneIndex, resetControlsTimeout]);

  const toggleControls = () => {
    if (showControls) {
      setShowControls(false);
    } else {
      resetControlsTimeout();
    }
  };

  return (
    <div
      role="region"
      aria-label="Cinematic Story Mode"
      onClick={resetControlsTimeout}
      onPointerMove={resetControlsTimeout}
      className="fixed inset-0 z-50 flex flex-col bg-[#0C0A09] text-[#F7F3EB] overflow-hidden select-none animate-in fade-in duration-300"
    >
      {/* Top Cinematic Navigation Header with Safe Area Insets */}
      <header
        className={`relative z-40 flex items-center justify-between px-4 sm:px-8 py-2.5 sm:py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] bg-gradient-to-b from-black/95 via-black/60 to-transparent border-b border-white/5 transition-opacity duration-300 ${
          showControls || isPaused || isCompleted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#D9732B]/20 border border-[#D9732B]/40 flex items-center justify-center shrink-0">
            <span className="font-story-serif text-sm font-bold text-[#F2C765]">TG</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-story-serif text-xs sm:text-base font-medium text-[#F7F3EB] truncate max-w-[170px] sm:max-w-md">
              {story.title}
            </h1>
            <span className="text-[10px] text-[#AB9784] font-mono">
              Scene {String(currentSceneIndex + 1).padStart(2, "0")} of{" "}
              {String(totalScenes).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Exit & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <StoryDownloadButton story={story} variant="compact" />
          <span className="hidden md:inline text-[11px] text-[#857364] font-mono">
            Press ESC or click Exit
          </span>
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] sm:min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium text-[#F7F3EB] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] cursor-pointer"
            aria-label="Exit cinematic mode"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Mode</span>
          </button>
        </div>
      </header>

      {/* Main Viewport or Completion View */}
      <main className="relative flex-1 flex flex-col overflow-hidden">
        {isCompleted ? (
          <StoryCompletionView
            currentStory={story}
            onReplay={replay}
            onReturnToReader={onExit}
          />
        ) : (
          <StorySceneViewport
            scene={currentScene}
            totalScenes={totalScenes}
            isPaused={isPaused}
            storySlug={story.slug}
            currentTime={effectiveElapsed}
            hasAudio={storyAudio.hasAudio}
            cues={resolvedNarration.cues}
            onNext={goToNextScene}
            onPrevious={goToPreviousScene}
          />
        )}

        {/* Saved Progress Prompt Modal */}
        {savedProgressPrompt && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-md w-full bg-[#1A1613] border border-[#3E352E] rounded-2xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#D9732B]/15 border border-[#D9732B]/30 mx-auto flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#E0AB3A]" />
              </div>
              <h3 className="font-story-serif text-xl text-[#F7F3EB]">
                Resume Your Story?
              </h3>
              <p className="text-xs text-[#AB9784] leading-relaxed">
                You previously reached{" "}
                <strong className="text-[#F2C765]">
                  Scene {savedProgressPrompt.sceneIndex + 1}
                </strong>{" "}
                ({savedProgressPrompt.percent}% complete). Would you like to pick up where you
                left off or start from the beginning?
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={declineResume}
                  className="px-4 py-2 rounded-xl bg-[#241F1A] hover:bg-[#2F2721] border border-[#3E352E] text-xs font-medium text-[#CBBCAE]"
                >
                  Start from Beginning
                </button>
                <button
                  onClick={acceptResume}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9732B] to-[#C69224] text-white text-xs font-medium shadow-md flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume Scene {savedProgressPrompt.sceneIndex + 1}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Transport Controls (Auto-faded during playback on mobile, reveals on tap) */}
      {!isCompleted && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`transition-opacity duration-300 z-40 ${
            showControls || isPaused
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <StoryPlaybackControls
            currentSceneIndex={currentSceneIndex}
            totalScenes={totalScenes}
            playbackState={playbackState}
            elapsedSeconds={effectiveElapsed}
            sceneDuration={effectiveDuration}
            progressPercent={effectiveProgressPercent}
            isAutoAdvanceEnabled={isAutoAdvanceEnabled}
            onToggleAutoAdvance={() => setIsAutoAdvanceEnabled(!isAutoAdvanceEnabled)}
            onTogglePlayPause={togglePlayPause}
            onNext={goToNextScene}
            onPrevious={goToPreviousScene}
            onJumpToScene={jumpToScene}
            hasAudio={storyAudio.hasAudio}
            playbackRate={storyAudio.playbackRate}
            onSetRate={storyAudio.setPlaybackRate}
            narrationVolume={storyAudio.narrationVolume}
            onToggleMute={() => {
              storyAudio.setNarrationVolume(storyAudio.narrationVolume === 0 ? 0.8 : 0);
            }}
            onOpenNarratorPicker={() => setIsNarratorPickerOpen(true)}
            currentNarratorName={selectedNarrator.name}
          />
        </div>
      )}

      {/* Narrator Selection Bottom Sheet / Modal */}
      <NarratorPicker
        isOpen={isNarratorPickerOpen}
        onClose={() => setIsNarratorPickerOpen(false)}
      />
    </div>
  );
}
