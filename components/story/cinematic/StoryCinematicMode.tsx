"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { X, Sparkles, Play, Pause, SkipBack, SkipForward, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Story } from "@/types/story";
import { useStoryPlayback } from "@/hooks/useStoryPlayback";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { useNarrator } from "@/hooks/useNarrator";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { useOfflineStory } from "@/hooks/useOfflineStory";
import { NarratorPicker } from "../NarratorPicker";
import { StorySceneViewport } from "./StorySceneViewport";
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
  const [currentSceneIdx, setCurrentSceneIdx] = useState(initialSceneIndex);
  const { selectedNarratorId, selectedNarrator } = useNarrator();
  const [isNarratorPickerOpen, setIsNarratorPickerOpen] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [isInsightDismissed, setIsInsightDismissed] = useState(false);

  const {
    currentSceneIndex,
    currentScene,
    totalScenes,
    playbackState,
    elapsedSeconds,
    sceneDuration,
    progressPercent,
    isAutoAdvanceEnabled,
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
  useEffect(() => {
    setCurrentSceneIdx(currentSceneIndex);
  }, [currentSceneIndex]);

  // Resolve narration track for current scene given the selected storyteller
  const resolvedNarration = resolveSceneNarration(
    currentScene.audio,
    selectedNarratorId
  );

  // Offline asset resolution
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

  const effectiveDuration =
    storyAudio.hasAudio &&
    (storyAudio.duration > 0 ||
      resolvedNarration.narrationDurationSeconds ||
      currentScene.audio?.narrationDurationSeconds)
      ? storyAudio.duration ||
        resolvedNarration.narrationDurationSeconds ||
        currentScene.audio?.narrationDurationSeconds ||
        sceneDuration
      : sceneDuration;

  const effectiveElapsed = storyAudio.hasAudio
    ? storyAudio.currentTime
    : elapsedSeconds;

  const effectiveProgressPercent =
    effectiveDuration > 0
      ? Math.min(100, Math.round((effectiveElapsed / effectiveDuration) * 100))
      : progressPercent;

  // Short story title for scene header matching prototype
  const storyShortTitle = story.title.split(":")[0];

  // Cultural insight text
  const insightText =
    story.narrative?.contextualNotes?.[0] ||
    story.origin.culturalContext ||
    "In Senegambian storytelling traditions, trickster fables explore communal solidarity, moral discernment, and the perils of greed.";

  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#0D0B0A] text-[#F7F3EB] overflow-hidden select-none">
        <StoryCompletionView
          currentStory={story}
          onReplay={replay}
          onReturnToReader={onExit}
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Cinematic Story Mode"
      className="fixed inset-0 z-50 flex flex-col bg-[#0D0B0A] text-[#F7F3EB] overflow-hidden select-none animate-in fade-in duration-300"
    >
      {/* Top Segmented Progress Bar matching Prototype Screenshot 2 */}
      <div className="w-full flex items-center gap-1.5 px-4 sm:px-6 pt-2.5 pb-1 z-40 select-none">
        {Array.from({ length: totalScenes }).map((_, idx) => {
          const isPast = idx < currentSceneIndex;
          const isCurrent = idx === currentSceneIndex;

          return (
            <button
              key={idx}
              onClick={() => jumpToScene(idx)}
              className="flex-1 h-1 rounded-full overflow-hidden bg-white/20 cursor-pointer relative transition-all"
              aria-label={`Jump to scene ${idx + 1}`}
              title={`Scene ${idx + 1}`}
            >
              {(isPast || isCurrent) && (
                <div
                  className={`h-full ${
                    isPast
                      ? "w-full bg-white"
                      : "bg-white transition-all duration-200"
                  }`}
                  style={
                    isCurrent
                      ? { width: `${Math.max(15, effectiveProgressPercent)}%` }
                      : undefined
                  }
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Top Navigation Row: Circular Close Button on Left, Title · Scene on Right */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 z-40">
        <button
          onClick={onExit}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/90 transition-colors cursor-pointer"
          aria-label="Exit cinematic mode"
          title="Exit cinematic mode"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-xs sm:text-sm text-[#AB9784] font-story-sans">
          {storyShortTitle} · Scene {currentSceneIndex + 1}/{totalScenes}
        </span>
      </div>

      {/* Visual Canvas Stage (Top ~40-44% height) */}
      <div className="relative h-[38vh] sm:h-[42vh] w-full overflow-hidden shrink-0">
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
          hideCaption={true}
        />

        {/* Smooth Gradient Bridge Fading into Lower Dark Section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#0D0B0A]/60 to-[#0D0B0A] pointer-events-none z-30" />
      </div>

      {/* Narrative & Control Canvas (Bottom ~56-60% height) matching Prototype Screenshot 2 */}
      <div className="flex-1 min-h-0 flex flex-col justify-between py-3 sm:py-5 px-6 sm:px-12 bg-[#0D0B0A] relative z-20 overflow-hidden">
        {/* Centered Story Narrative Text */}
        <div className="flex-1 min-h-0 flex items-center justify-center text-center my-auto px-4 overflow-y-auto scrollbar-none select-text">
          <p className="font-story-serif text-base sm:text-xl md:text-2xl text-[#F7F3EB] leading-relaxed max-w-2xl sm:max-w-3xl mx-auto text-center select-text">
            {currentScene.text}
          </p>
        </div>

        {/* Bottom Control Bar matching Prototype Screenshot 2 (Pinned shrink-0) */}
        <div className="shrink-0 flex items-center justify-between w-full pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
          {/* Left: 1 Insight Pill */}
          <div className="w-32 sm:w-40 flex items-center justify-start">
            {!isInsightDismissed ? (
              <button
                onClick={() => setIsInsightOpen(!isInsightOpen)}
                className="rounded-full bg-[#E58929] hover:bg-[#D9732B] text-white px-3 py-1.5 flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                title="Cultural Insight"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] select-none">
                  N&apos;
                </span>
                <span className="text-xs font-medium whitespace-nowrap">
                  1 Insight
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsInsightDismissed(true);
                  }}
                  className="ml-0.5 hover:opacity-75 cursor-pointer"
                  aria-label="Dismiss insight"
                >
                  <X className="w-3.5 h-3.5" />
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsInsightDismissed(false);
                  setIsInsightOpen(true);
                }}
                className="w-8 h-8 rounded-full bg-[#E58929] hover:bg-[#D9732B] text-white flex items-center justify-center shadow-md font-bold text-xs cursor-pointer"
                title="Show cultural insight"
              >
                N&apos;
              </button>
            )}
          </div>

          {/* Center: Main Transport Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Previous Scene Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              disabled={currentSceneIndex === 0}
              onClick={goToPreviousScene}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/15 text-white/80 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Previous scene"
              title="Previous scene"
            >
              <SkipBack className="w-4 h-4" />
            </motion.button>

            {/* Large Yellow / Amber Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={togglePlayPause}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-[#E5A93C] hover:bg-[#D99B26] text-[#12100E] shadow-xl shadow-[#E5A93C]/20 transition-all cursor-pointer"
              aria-label={
                playbackState === "playing"
                  ? "Pause narration"
                  : "Play narration"
              }
              title={playbackState === "playing" ? "Pause" : "Play"}
            >
              {playbackState === "playing" ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </motion.button>

            {/* Next Scene Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              disabled={currentSceneIndex === totalScenes - 1}
              onClick={goToNextScene}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/15 text-white/80 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Next scene"
              title="Next scene"
            >
              <SkipForward className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right: Narrator Voice Button */}
          <div className="w-32 sm:w-40 flex items-center justify-end gap-2">
            <button
              onClick={() => setIsNarratorPickerOpen(true)}
              className="p-2 rounded-full text-[#AB9784] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={`Storyteller voice: ${selectedNarrator.name}`}
              aria-label="Change storyteller voice"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cultural Insight Modal Popover */}
      <AnimatePresence>
        {isInsightOpen && (
          <div
            onClick={() => setIsInsightOpen(false)}
            className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full bg-[#1C1713] border border-white/15 rounded-3xl p-6 shadow-2xl text-left space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E58929] text-white flex items-center justify-center font-bold text-xs select-none">
                    N&apos;
                  </span>
                  <h3 className="font-story-serif text-lg text-[#F7F3EB] font-medium">
                    Cultural Insight
                  </h3>
                </div>
                <button
                  onClick={() => setIsInsightOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#AB9784] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close insight"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[#D6C7B2] leading-relaxed font-story-serif">
                {insightText}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              ({savedProgressPrompt.percent}% complete). Would you like to pick up
              where you left off or start from the beginning?
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

      {/* Narrator Selection Modal */}
      <NarratorPicker
        isOpen={isNarratorPickerOpen}
        onClose={() => setIsNarratorPickerOpen(false)}
      />
    </div>
  );
}
