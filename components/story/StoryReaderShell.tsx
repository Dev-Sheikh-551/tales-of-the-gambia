"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  // Sync mode=cinematic URL query parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("mode") === "cinematic") {
        setIsCinematicOpen(true);
      }
    }
  }, []);

  const activeScene: Scene = story.scenes[activeSceneIndex] || story.scenes[0];

  const storyAudio = useStoryAudio({
    narrationSrc: activeScene.audio?.narrationUrl,
  });

  const handleEnterCinematic = () => {
    storyAudio.pause();
    setIsCinematicOpen(true);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("mode", "cinematic");
      window.history.replaceState({}, "", url.toString());
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
      className={`min-h-screen transition-colors duration-300 pb-20 ${
        settings.theme === "parchment"
          ? "bg-[#F9F6F0] text-[#1A1714]"
          : settings.theme === "river-dusk"
          ? "bg-[#0E181A] text-[#F0F6F7]"
          : "bg-[#12100E] text-[#F7F3EB]"
      }`}
    >
      {/* Top Subtle Reading Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 backdrop-blur-md bg-black/30 px-4 sm:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/stories"
            className="flex items-center gap-1.5 text-xs text-[#AB9784] hover:text-[#F7F3EB] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] rounded px-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Stories</span>
            <span className="sm:hidden">Stories</span>
          </Link>

          {/* Center Story Title snippet */}
          <div className="text-center truncate max-w-xs px-2">
            <span className="font-story-serif text-sm font-medium tracking-tight truncate block opacity-85">
              {story.title}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 select-none">
            <button
              onClick={handleEnterCinematic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D9732B] to-[#C69224] text-white text-xs font-medium shadow-sm hover:opacity-95 transition-opacity"
              title="Cinematic Story Mode"
              aria-label="Enter cinematic story mode"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Cinematic</span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-lg text-[#AB9784] hover:text-[#F7F3EB] hover:bg-white/5 transition-colors"
              aria-label="Adjust reading typography and theme"
              title="Reading display settings"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-[#F2C765]"
                  : "text-[#AB9784] hover:text-[#F7F3EB] hover:bg-white/5"
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this story"}
              title="Bookmark story"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current text-[#D9732B]" : ""}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-[#AB9784] hover:text-[#F7F3EB] hover:bg-white/5 transition-colors relative"
              aria-label="Share story link"
              title="Copy link"
            >
              <Share2 className="w-4 h-4" />
              {shareFeedback && (
                <span className="absolute -bottom-8 right-0 bg-[#D9732B] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Reading Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Story Header: Clean, Typography-First */}
        <header className="space-y-3 mb-8 text-center sm:text-left">
          {/* Max 2 pieces of essential context: Category · Tradition */}
          <div className="text-xs uppercase tracking-widest text-[#E0AB3A] font-semibold flex items-center justify-center sm:justify-start gap-2">
            <span>{story.category}</span>
            <span>·</span>
            <span>{tradition}</span>
            <span className="text-[#857364]">·</span>
            <span className="text-[#857364] normal-case tracking-normal">{story.readingTimeMinutes} min read</span>
          </div>

          <h1 className="font-story-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] text-[#F7F3EB]">
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="font-story-serif text-lg sm:text-xl italic text-[#AB9784]">
              &ldquo;{story.subtitle}&rdquo;
            </p>
          )}
        </header>

        {/* Audio Narration Bar: Integrated Reading Companion */}
        <div className="mb-10">
          <AudioNarrationBar
            currentSceneTitle={`Scene ${activeScene.sceneNumber}: ${activeScene.title}`}
            audioState={storyAudio.audioState}
            currentTime={storyAudio.currentTime}
            duration={storyAudio.duration || activeScene.audio?.narrationDurationSeconds || activeScene.durationSeconds}
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

        {/* Scene Navigation Strip: Clean & Restrained */}
        {story.scenes.length > 1 && (
          <nav
            aria-label="Scene selection"
            className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.03] border border-white/5 mb-8 select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#857364]">Scene</span>
              <div className="flex items-center gap-1">
                {story.scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors ${
                      idx === activeSceneIndex
                        ? "bg-[#D9732B] text-white font-semibold shadow-sm"
                        : "text-[#857364] hover:text-[#F7F3EB] hover:bg-white/5"
                    }`}
                    aria-label={`Jump to scene ${idx + 1}: ${s.title}`}
                    aria-current={idx === activeSceneIndex ? "true" : undefined}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#AB9784] font-story-serif italic truncate max-w-[180px] sm:max-w-xs text-right">
              {activeScene.title}
            </div>
          </nav>
        )}

        {/* Editorial Story Text — Pure Storybook Page */}
        <article className="space-y-6 pt-2">
          {/* Scene Title Cue with Narration Indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="font-story-serif text-2xl sm:text-3xl font-medium text-[#F7F3EB]">
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

          {/* Narrative Body — Generous Editorial Typography */}
          <div
            className={`story-dropcap font-story-serif font-normal select-text text-[#F7F3EB] space-y-5 ${textSizeClass}`}
          >
            <NarratedStoryText
              text={activeScene.text}
              cues={activeScene.audio?.cues || getStorySceneCues(story.slug, activeScene.sceneNumber)}
              currentTime={storyAudio.currentTime}
              hasAudio={storyAudio.hasAudio}
              className="leading-relaxed"
              enableAutoScroll={true}
            />
          </div>

          {/* Traditional Oral Closing Formula (Final Scene) */}
          {activeSceneIndex === story.scenes.length - 1 && story.narrative?.closingFormula && (
            <blockquote className="border-l-2 border-[#D9732B] pl-4 py-1 italic font-story-serif text-base sm:text-lg text-[#F2C765]/90">
              &ldquo;{story.narrative.closingFormula}&rdquo;
            </blockquote>
          )}

          {/* Scene Stepper Bottom Controls */}
          {story.scenes.length > 1 && (
            <div className="pt-8 border-t border-white/10 flex items-center justify-between select-none">
              <button
                disabled={activeSceneIndex === 0}
                onClick={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[#CBBCAE] disabled:opacity-20 disabled:cursor-not-allowed hover:text-white hover:bg-white/5 transition-all select-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Scene</span>
              </button>

              <span className="text-xs text-[#857364] font-mono select-none">
                {activeSceneIndex + 1} of {story.scenes.length}
              </span>

              <button
                disabled={activeSceneIndex === story.scenes.length - 1}
                onClick={() =>
                  setActiveSceneIndex((prev) =>
                    Math.min(story.scenes.length - 1, prev + 1)
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D9732B] hover:bg-[#C45E1B] text-white text-xs font-medium disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm select-none"
              >
                <span>Next Scene</span>
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
