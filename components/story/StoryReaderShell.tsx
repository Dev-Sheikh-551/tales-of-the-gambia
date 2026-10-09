"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Sliders,
  Share2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Play,
} from "lucide-react";
import { Story, ReadingSettings, Scene } from "@/types/story";
import { AudioNarrationBar } from "./AudioNarrationBar";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { ReadingSettingsModal } from "./ReadingSettingsModal";
import { StoryCinematicMode } from "./cinematic/StoryCinematicMode";
import { StoryProvenanceCard } from "./StoryProvenanceCard";
import { NarratedStoryText } from "./NarratedStoryText";
import { getStorySceneCues } from "@/data/audio/cues";
import { MOTION_EASINGS } from "@/lib/motion/tokens";
import { useNarrator } from "@/hooks/useNarrator";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { useOfflineStory } from "@/hooks/useOfflineStory";
import { StoryDownloadButton } from "./StoryDownloadButton";
import { useSceneSwipe } from "@/hooks/useSceneSwipe";
import {
  isFavorite,
  toggleFavorite as toggleStorageFavorite,
  saveReadingProgress,
  recordRecentStory,
  getStoryProgress,
} from "@/lib/storyStorage";

interface StoryReaderShellProps {
  story: Story;
}

export default function StoryReaderShell({ story }: StoryReaderShellProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [isCinematicOpen, setIsCinematicOpen] = useState(false);

  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: "base",
    theme: "midnight",
    lineHeight: "relaxed",
    reducedMotion: false,
  });

  // Record recent story and check initial progress on mount
  useEffect(() => {
    recordRecentStory(story.id, story.slug);
    setIsBookmarked(isFavorite(story.slug));

    const prog = getStoryProgress(story.slug);
    if (prog && prog.currentSceneNumber > 1 && prog.currentSceneNumber <= story.scenes.length) {
      setActiveSceneIndex(prog.currentSceneNumber - 1);
    }
  }, [story.id, story.slug, story.scenes.length]);

  // Sync mode=cinematic URL query parameter and handle back button popstate
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      setIsCinematicOpen(urlParams.get("mode") === "cinematic");
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const sceneTopRef = React.useRef<HTMLDivElement | null>(null);
  const isInitialMount = React.useRef(true);

  // Auto-advance to next scene when current scene audio finishes
  const handleNarrationEnded = React.useCallback(() => {
    setActiveSceneIndex((prev) => {
      if (prev < story.scenes.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [story.scenes.length]);

  const activeScene: Scene = story.scenes[activeSceneIndex] || story.scenes[0];
  const { selectedNarratorId } = useNarrator();
  const resolvedNarration = resolveSceneNarration(activeScene.audio, selectedNarratorId);

  // Offline asset resolution: if the story is downloaded offline, resolve cached audio URI
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
    onNarrationEnded: handleNarrationEnded,
  });

  // Smoothly scroll reader to top of scene content when scene changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (sceneTopRef.current && typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      sceneTopRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [activeSceneIndex]);

  const handleEnterCinematic = () => {
    storyAudio.pause();
    setIsCinematicOpen(true);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("mode", "cinematic");
      window.history.pushState({ mode: "cinematic" }, "", url.toString());
    }
  };

  const handleExitCinematic = () => {
    setIsCinematicOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("mode");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Touch gesture swipe hook for natural scene navigation
  const swipeHandlers = useSceneSwipe({
    onNext: () => {
      if (activeSceneIndex < story.scenes.length - 1) {
        setActiveSceneIndex((prev) => prev + 1);
      }
    },
    onPrevious: () => {
      if (activeSceneIndex > 0) {
        setActiveSceneIndex((prev) => prev - 1);
      }
    },
    canNext: activeSceneIndex < story.scenes.length - 1,
    canPrevious: activeSceneIndex > 0,
    disabled: isCinematicOpen,
  });

  // Save reading progress whenever active scene changes
  useEffect(() => {
    saveReadingProgress(story.slug, activeSceneIndex + 1, story.scenes.length);
  }, [story.slug, activeSceneIndex, story.scenes.length]);

  const toggleBookmark = () => {
    const newState = toggleStorageFavorite(story.slug);
    setIsBookmarked(newState);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  // Text size classes based on settings
  const textSizeClass = {
    sm: "text-base sm:text-lg leading-relaxed",
    base: "text-lg sm:text-xl leading-relaxed",
    lg: "text-xl sm:text-2xl leading-loose",
    xl: "text-2xl sm:text-3xl leading-loose",
  }[settings.fontSize];

  // Essential metadata: Category + Tradition (max 2 items)
  const tradition =
    story.origin.community ||
    story.origin.ethnicGroup ||
    story.provenance?.community ||
    story.origin.region;

  return (
    <div
      data-theme={settings.theme}
      className="min-h-screen transition-colors duration-300 pb-20 bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      {/* Sub-header Navigation matching prototype Screenshot 1 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex items-center justify-between">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-lg py-1 px-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Library</span>
        </Link>

        {/* Action icons on right: Save Offline + Bookmark matching prototype */}
        <div className="flex items-center gap-2 select-none shrink-0">
          <StoryDownloadButton story={story} variant="compact" />

          <motion.button
            whileTap={{ scale: 0.8 }}
            animate={isBookmarked ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={toggleBookmark}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer border border-[var(--border-subtle)] ${
              isBookmarked
                ? "bg-[var(--accent-ochre)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this story"}
            title="Bookmark story"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </div>
      </div>

      {/* Main Editorial Reading Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 pb-[calc(7rem+env(safe-area-inset-bottom,0px))]">
        {/* Story Header matching prototype Screenshot 1 */}
        <header className="space-y-3 mb-6 sm:mb-8 text-left">
          {/* Category Tag */}
          <div className="text-[11px] uppercase tracking-widest text-[var(--accent-ochre)] font-semibold">
            {story.category}
          </div>

          {/* Title */}
          <h1 className="font-story-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight text-[var(--text-primary)]">
            {story.title}
          </h1>

          {/* Enter Cinematic Mode Button matching prototype */}
          <div className="pt-1">
            <button
              onClick={handleEnterCinematic}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1A1614] text-white dark:bg-white dark:text-[#12100E] text-xs sm:text-sm font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
              title="Enter Cinematic Story Mode"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Enter Cinematic Mode</span>
            </button>
          </div>

          {/* Segmented Scene Progress Bars matching prototype */}
          <div className="flex items-center gap-2 w-full pt-4">
            {story.scenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSceneIndex(idx)}
                className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                  idx === activeSceneIndex
                    ? "bg-[#1A1614] dark:bg-white"
                    : idx < activeSceneIndex
                    ? "bg-[#8A7E72] dark:bg-[#AB9784]"
                    : "bg-[var(--border-subtle)]"
                }`}
                aria-label={`Jump to scene ${idx + 1}`}
                title={`Scene ${idx + 1}`}
              />
            ))}
          </div>
        </header>

        {/* Editorial Story Text — Pure Storybook Page with Touch Swipe Navigation */}
        <article {...swipeHandlers} className="space-y-6 pt-1 touch-pan-y">
          {/* Scroll anchor — scene transitions bring this into view */}
          <div ref={sceneTopRef} aria-hidden="true" />

          {/* Scene Title Cue with Narration Indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="font-story-serif text-xl sm:text-3xl font-medium text-[#F7F3EB]">
              {activeScene.title}
            </h2>
            {storyAudio.isPlaying && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#E0AB3A] font-mono select-none">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Narrating</span>
              </span>
            )}
          </div>

          {/* Traditional Oral Opening Formula (Scene 1) */}
          {activeSceneIndex === 0 && story.narrative?.openingFormula && (
            <blockquote className="border-l-2 border-[#E0AB3A] pl-4 py-1 italic font-story-serif text-base sm:text-lg text-[#F2C765]/90">
              &ldquo;{story.narrative.openingFormula}&rdquo;
            </blockquote>
          )}

          {/* Spoken Narration Prompt */}
          {activeScene.narration && (
            <div className="text-xs sm:text-sm italic text-[#AB9784] font-story-serif border-l border-white/20 pl-3">
              &ldquo;{activeScene.narration}&rdquo;
            </div>
          )}

          {/* Narrative Body — Generous Editorial Typography matching prototype */}
          <div
            className={`font-story-serif font-normal select-text text-[var(--text-primary)] space-y-5 ${textSizeClass}`}
          >
            <NarratedStoryText
              text={activeScene.text}
              cues={resolvedNarration.cues || activeScene.audio?.cues || getStorySceneCues(story.slug, activeScene.sceneNumber)}
              currentTime={storyAudio.currentTime}
              hasAudio={storyAudio.hasAudio}
              className="leading-relaxed"
              enableAutoScroll={true}
            />
          </div>

          {/* Traditional Oral Closing Formula (Final Scene) */}
          {activeSceneIndex === story.scenes.length - 1 && story.narrative?.closingFormula && (
            <blockquote className="border-l-2 border-[var(--accent-ochre)] pl-4 py-1 italic font-story-serif text-base sm:text-lg text-[var(--text-secondary)]">
              &ldquo;{story.narrative.closingFormula}&rdquo;
            </blockquote>
          )}

          {/* Audio Narration Bar: Integrated Reading Companion matching Prototype Screenshot 1 */}
          <div className="pt-6 pb-2">
            <AudioNarrationBar
              currentSceneTitle={`Scene ${activeScene.sceneNumber}: ${activeScene.title}`}
              sceneNumber={activeSceneIndex + 1}
              totalScenes={story.scenes.length}
              onPreviousScene={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
              onNextScene={() => setActiveSceneIndex((prev) => Math.min(story.scenes.length - 1, prev + 1))}
              hasPreviousScene={activeSceneIndex > 0}
              hasNextScene={activeSceneIndex < story.scenes.length - 1}
              audioState={storyAudio.audioState}
              currentTime={storyAudio.currentTime}
              duration={storyAudio.duration || resolvedNarration.narrationDurationSeconds || activeScene.audio?.narrationDurationSeconds || activeScene.durationSeconds}
              isPlaying={storyAudio.isPlaying}
              hasAudio={storyAudio.hasAudio}
              playbackRate={storyAudio.playbackRate}
              narrationVolume={storyAudio.narrationVolume}
              onPlay={storyAudio.play}
              onPause={storyAudio.pause}
              onSeek={storyAudio.seek}
              onSetRate={storyAudio.setPlaybackRate}
              onSetNarrationVolume={storyAudio.setNarrationVolume}
              onRetry={storyAudio.retry}
            />
          </div>

          {/* Scene Stepper Bottom Controls */}
          {story.scenes.length > 1 && (
            <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between select-none gap-2">
              <button
                disabled={activeSceneIndex === 0}
                onClick={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 min-h-[40px] rounded-full text-xs font-medium text-[var(--text-secondary)] disabled:opacity-20 disabled:cursor-not-allowed hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all select-none cursor-pointer border border-[var(--border-subtle)]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs text-[var(--text-muted)] font-mono select-none">
                {activeSceneIndex + 1} of {story.scenes.length}
              </span>

              <button
                disabled={activeSceneIndex === story.scenes.length - 1}
                onClick={() =>
                  setActiveSceneIndex((prev) =>
                    Math.min(story.scenes.length - 1, prev + 1)
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-full bg-[var(--accent-ochre)] hover:opacity-90 text-white text-xs font-medium disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm select-none cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </article>

        {/* Quiet, Collapsible Provenance at the bottom */}
        <StoryProvenanceCard story={story} />
      </main>

      {/* Reading Settings Drawer/Modal */}
      <ReadingSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
      />

      {/* Full-Screen Cinematic Story Mode */}
      {isCinematicOpen && (
        <StoryCinematicMode
          story={story}
          initialSceneIndex={activeSceneIndex}
          onExit={handleExitCinematic}
        />
      )}
    </div>
  );
}
