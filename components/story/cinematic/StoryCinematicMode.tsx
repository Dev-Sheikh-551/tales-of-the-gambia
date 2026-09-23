"use client";

import React, { useEffect } from "react";
import { X, Sparkles, RotateCcw, Play } from "lucide-react";
import { Story } from "@/types/story";
import { useStoryPlayback } from "@/hooks/useStoryPlayback";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { StorySceneViewport } from "./StorySceneViewport";
import { StoryPlaybackControls } from "./StoryPlaybackControls";
import { StoryCompletionView } from "./StoryCompletionView";

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

  const storyAudio = useStoryAudio({
    narrationSrc: currentScene.audio?.narrationUrl,
    ambienceSrc: currentScene.audio?.ambienceUrl,
    ambienceLoop: currentScene.audio?.ambienceLoop ?? true,
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

  const isPaused = playbackState === "paused";
  const isCompleted = playbackState === "completed";

  // When narration audio exists, audio duration and current time become authoritative
  const effectiveDuration =
    storyAudio.hasAudio && (storyAudio.duration > 0 || currentScene.audio?.narrationDurationSeconds)
      ? storyAudio.duration || currentScene.audio?.narrationDurationSeconds || sceneDuration
      : sceneDuration;

  const effectiveElapsed = storyAudio.hasAudio
    ? storyAudio.currentTime
    : elapsedSeconds;

  const effectiveProgressPercent =
    effectiveDuration > 0
      ? Math.min(100, Math.round((effectiveElapsed / effectiveDuration) * 100))
      : progressPercent;

  return (
    <div
      role="region"
      aria-label="Cinematic Story Mode"
      className="fixed inset-0 z-50 flex flex-col bg-[#0C0A09] text-[#F7F3EB] overflow-hidden select-none animate-in fade-in duration-300"
    >
      {/* Top Cinematic Navigation Header */}
      <header className="relative z-40 flex items-center justify-between px-4 sm:px-8 py-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#D9732B]/20 border border-[#D9732B]/40 flex items-center justify-center">
            <span className="font-story-serif text-sm font-bold text-[#F2C765]">TG</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-story-serif text-sm sm:text-base font-medium text-[#F7F3EB] truncate max-w-[200px] sm:max-w-md">
              {story.title}
            </h1>
            <span className="text-[10px] text-[#AB9784] font-mono">
              Scene {String(currentSceneIndex + 1).padStart(2, "0")} of{" "}
              {String(totalScenes).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Exit & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline text-[11px] text-[#857364] font-mono">
            Press ESC or click Exit
          </span>
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium text-[#F7F3EB] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A]"
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

      {/* Bottom Transport Controls (Hidden if Completed) */}
      {!isCompleted && (
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
          ambienceEnabled={storyAudio.ambienceEnabled}
          onToggleAmbience={() => storyAudio.setAmbienceEnabled(!storyAudio.ambienceEnabled)}
        />
      )}
    </div>
  );
}
