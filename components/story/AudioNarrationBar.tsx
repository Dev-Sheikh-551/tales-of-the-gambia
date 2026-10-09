"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RefreshCw,
  Mic,
  Loader2,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { AudioState, PlaybackRate, PLAYBACK_RATES } from "@/hooks/useStoryAudio";
import { useNarrator } from "@/hooks/useNarrator";
import { NarratorPicker } from "./NarratorPicker";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface AudioNarrationBarProps {
  currentSceneTitle: string;
  sceneNumber?: number;
  totalScenes?: number;
  onPreviousScene?: () => void;
  onNextScene?: () => void;
  hasPreviousScene?: boolean;
  hasNextScene?: boolean;
  audioState: AudioState;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  hasAudio: boolean;
  playbackRate: PlaybackRate;
  narrationVolume: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (seconds: number) => void;
  onSetRate: (rate: PlaybackRate) => void;
  onSetNarrationVolume: (v: number) => void;
  onRetry: () => void;
  onNarratorChanged?: (narratorId: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return "0:00";
  const s = Math.floor(secs);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? "0" : ""}${rem}`;
}

// ---------------------------------------------------------------------------
// Main Component — Story Reader Audio Companion matching Prototype Screenshot 1
// ---------------------------------------------------------------------------

export function AudioNarrationBar({
  currentSceneTitle,
  sceneNumber = 1,
  totalScenes = 1,
  onPreviousScene,
  onNextScene,
  hasPreviousScene = false,
  hasNextScene = false,
  audioState,
  currentTime,
  duration,
  isPlaying,
  hasAudio,
  playbackRate,
  narrationVolume,
  onPlay,
  onPause,
  onSeek,
  onSetRate,
  onSetNarrationVolume,
  onRetry,
  onNarratorChanged,
}: AudioNarrationBarProps) {
  const scrubId = useId();
  const [isNarratorPickerOpen, setIsNarratorPickerOpen] = useState(false);
  const { selectedNarrator } = useNarrator();

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleToggle = () => {
    if (isPlaying) onPause();
    else onPlay();
  };

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  const cycleRate = () => {
    const idx = PLAYBACK_RATES.indexOf(playbackRate);
    const nextRate = PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length];
    onSetRate(nextRate);
  };

  // ── Missing State ──
  if (audioState === "missing" || audioState === "idle" || !hasAudio) {
    return (
      <div className="w-full py-3 px-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] select-none">
        <div className="flex items-center gap-2">
          <Mic className="w-3.5 h-3.5 text-[var(--accent-ochre)]" />
          <span>Narration coming soon</span>
        </div>
        <span className="text-[11px] font-story-serif italic text-[var(--text-muted)]">
          {currentSceneTitle}
        </span>
      </div>
    );
  }

  // ── Loading State ──
  if (audioState === "loading") {
    return (
      <div className="w-full py-3 px-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-2.5 text-xs text-[var(--text-muted)] select-none">
        <Loader2 className="w-3.5 h-3.5 text-[var(--accent-gold)] animate-spin" />
        <span>Loading narration…</span>
      </div>
    );
  }

  // ── Error State ──
  if (audioState === "error") {
    return (
      <div className="w-full py-3 px-5 rounded-2xl bg-red-950/20 border border-red-900/30 flex items-center justify-between text-xs text-[#C07070] select-none">
        <span>Narration couldn&apos;t load</span>
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-xs text-[var(--text-primary)] hover:underline cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          Retry
        </button>
      </div>
    );
  }

  // ── Active Player State matching Prototype Screenshot 1 ──
  return (
    <div className="w-full max-w-xl mx-auto bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm select-none transition-all space-y-3">
      {/* Screen-reader Live Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isPlaying ? `Playing audio for Scene ${sceneNumber}` : "Narration paused"}
      </div>

      {/* Top Row: Scene Number & Narrator Indicator */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="font-medium tracking-tight">
          Scene {sceneNumber} of {totalScenes}
        </span>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNarratorPickerOpen(true)}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          title="Change storyteller voice"
          aria-label={`Storyteller voice: ${selectedNarrator.name}`}
        >
          <Mic className="w-3.5 h-3.5 text-[var(--accent-ochre)]" />
          <span className="font-medium">{selectedNarrator.name}</span>
        </motion.button>
      </div>

      {/* Scrubber Progress Bar */}
      <div className="relative py-1 cursor-pointer select-none">
        <div className="w-full h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden pointer-events-none relative">
          <div
            className="h-full bg-[var(--accent-ochre)] rounded-full transition-all duration-100 relative"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <input
          id={scrubId}
          type="range"
          min={0}
          max={duration || 1}
          step={0.5}
          value={currentTime}
          onChange={handleScrubChange}
          data-no-swipe="true"
          className="absolute inset-0 w-full opacity-0 cursor-pointer select-none touch-none no-swipe h-full"
          aria-label="Seek narration"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        />
      </div>

      {/* Bottom Controls Row: Speed on left, Transport controls on center/right */}
      <div className="flex items-center justify-between pt-1">
        {/* Playback Speed Pill Button matching prototype */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={cycleRate}
          className="w-9 h-9 rounded-full bg-[#1A1614] text-white dark:bg-white dark:text-[#12100E] text-xs font-semibold flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title={`Speed: ${playbackRate}x. Click to change.`}
          aria-label={`Playback speed ${playbackRate}x`}
        >
          <span>{playbackRate}x</span>
        </motion.button>

        {/* Previous, Play/Pause, Next Scene Controls matching prototype */}
        <div className="flex items-center gap-3">
          {/* Previous Scene Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            disabled={!hasPreviousScene}
            onClick={onPreviousScene}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Previous scene"
            title="Previous scene"
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>

          {/* Primary Play / Pause Button matching terracotta circle in Screenshot 1 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleToggle}
            className="w-12 h-12 rounded-full bg-[#8C3B14] hover:bg-[#78320F] text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause narration" : "Play narration"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </motion.button>

          {/* Next Scene Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            disabled={!hasNextScene}
            onClick={onNextScene}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Next scene"
            title="Next scene"
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Narrator Selection Bottom Sheet / Modal */}
      <NarratorPicker
        isOpen={isNarratorPickerOpen}
        onClose={() => setIsNarratorPickerOpen(false)}
        onNarratorChanged={onNarratorChanged}
      />
    </div>
  );
}
