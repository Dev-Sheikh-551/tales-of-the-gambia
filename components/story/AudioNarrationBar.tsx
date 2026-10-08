"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RefreshCw,
  Mic,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { AudioState, PlaybackRate, PLAYBACK_RATES } from "@/hooks/useStoryAudio";
import { useNarrator } from "@/hooks/useNarrator";
import { NarratorPicker } from "./NarratorPicker";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface AudioNarrationBarProps {
  currentSceneTitle: string;
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
// Main Component — Compact Storybook Audio Companion
// ---------------------------------------------------------------------------

export function AudioNarrationBar({
  currentSceneTitle,
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
  const narVolId = useId();
  const [showSettings, setShowSettings] = useState(false);
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

  // ── Missing State ──
  if (audioState === "missing" || audioState === "idle" || !hasAudio) {
    return (
      <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-[#857364] select-none">
        <div className="flex items-center gap-2">
          <Mic className="w-3.5 h-3.5 text-[#5C5046]" />
          <span>Narration coming soon</span>
        </div>
        <span className="text-[11px] font-story-serif italic text-[#5C5046]">
          {currentSceneTitle}
        </span>
      </div>
    );
  }

  // ── Loading State ──
  if (audioState === "loading") {
    return (
      <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-xs text-[#857364] select-none">
        <Loader2 className="w-3.5 h-3.5 text-[#E0AB3A] animate-spin" />
        <span>Loading narration…</span>
      </div>
    );
  }

  // ── Error State ──
  if (audioState === "error") {
    return (
      <div className="w-full py-2 px-4 rounded-xl bg-red-950/20 border border-red-900/30 flex items-center justify-between text-xs text-[#C07070] select-none">
        <span>Narration couldn&apos;t load</span>
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-xs text-[#E5DAC6] hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          Retry
        </button>
      </div>
    );
  }

  // ── Active Player State ──
  return (
    <div className="w-full bg-[#181410] border border-[#2E2721] rounded-xl p-3 sm:p-3.5 shadow-md select-none transition-all">
      {/* Screen-reader Live Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isPlaying ? `Playing audio for ${currentSceneTitle}` : "Narration paused"}
      </div>

      {/* Main Single-Row Audio Companion */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Tactile Play / Pause Button (44px touch-friendly) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={handleToggle}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D9732B] to-[#C69224] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform cursor-pointer"
          aria-label={isPlaying ? "Pause narration" : "Play narration"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </motion.button>

        {/* Audio Equalizer & Time Readout */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Subtle 3-bar audio reactive visualizer */}
          <div className="flex items-end gap-0.5 h-3 px-0.5" aria-hidden="true">
            <motion.span
              animate={isPlaying ? { height: ["30%", "100%", "45%", "85%", "30%"] } : { height: "25%" }}
              transition={{ duration: 1.1, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              className="w-0.5 bg-[#E0AB3A] rounded-full"
            />
            <motion.span
              animate={isPlaying ? { height: ["60%", "25%", "95%", "40%", "60%"] } : { height: "25%" }}
              transition={{ duration: 0.9, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              className="w-0.5 bg-[#D9732B] rounded-full"
            />
            <motion.span
              animate={isPlaying ? { height: ["20%", "80%", "30%", "100%", "20%"] } : { height: "25%" }}
              transition={{ duration: 1.3, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
              className="w-0.5 bg-[#F2C765] rounded-full"
            />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#857364] w-14 sm:w-16">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Scrubber Progress Bar */}
        <div className="relative flex-1 py-2 cursor-pointer select-none">
          <div className="w-full h-1 bg-[#26201A] rounded-full overflow-hidden pointer-events-none relative">
            <div
              className="h-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A] rounded-full transition-all duration-100 relative"
              style={{ width: `${progressPercent}%` }}
            >
              {isPlaying && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFE8A3] shadow-[0_0_6px_#E0AB3A]" />
              )}
            </div>
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

        {/* Storyteller Voice Trigger */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsNarratorPickerOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-[#CBBCAE] hover:text-[#F7F3EB] transition-colors cursor-pointer"
          title="Choose storyteller voice"
          aria-label={`Storyteller voice: ${selectedNarrator.name}`}
        >
          <Mic className="w-3.5 h-3.5 text-[#E0AB3A]" />
          <span className="hidden sm:inline font-story-sans text-[11px] max-w-[100px] truncate">
            {selectedNarrator.name}
          </span>
        </motion.button>

        {/* Audio Settings & Volume Disclosure Toggle */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowSettings(!showSettings)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs transition-colors cursor-pointer shrink-0 ${
            showSettings
              ? "bg-[#2A231D] text-[#F2C765]"
              : "text-[#857364] hover:text-[#F7F3EB] hover:bg-white/5"
          }`}
          title="Audio levels & playback speed"
          aria-label="Audio settings"
          aria-expanded={showSettings}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Expandable Subtle Audio Levels Drawer */}
      {showSettings && (
        <div className="mt-3 pt-3 border-t border-[#26201A] flex flex-wrap items-center justify-between gap-4 text-xs animate-in fade-in slide-in-from-top-1 duration-150 select-none">
          {/* Narration Volume */}
          <div className="flex items-center gap-2 flex-1 min-w-[160px]">
            <label htmlFor={narVolId} className="text-[10px] uppercase text-[#857364]">
              Volume
            </label>
            <input
              id={narVolId}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={narrationVolume}
              onChange={(e) => onSetNarrationVolume(Number(e.target.value))}
              data-no-swipe="true"
              className="flex-1 accent-[#D9732B] h-2 cursor-pointer select-none touch-none no-swipe"
              aria-label="Narration volume"
            />
            <span className="text-[10px] font-mono text-[#857364] w-7 text-right">
              {Math.round(narrationVolume * 100)}%
            </span>
          </div>

          {/* Playback Speed selector */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#857364]">
            <span className="text-[10px] uppercase mr-1">Speed</span>
            {PLAYBACK_RATES.map((rate) => (
              <button
                key={rate}
                onClick={() => onSetRate(rate)}
                className={`min-w-[32px] min-h-[32px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center px-1.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                  playbackRate === rate
                    ? "bg-[#D9732B] text-white font-bold"
                    : "hover:text-[#F7F3EB] hover:bg-white/5"
                }`}
              >
                {rate}×
              </button>
            ))}
          </div>

          {/* Storyteller Voice Quick-link in Drawer */}
          <div className="w-full pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#857364]">
            <div className="flex items-center gap-1.5">
              <Mic className="w-3 h-3 text-[#E0AB3A]" />
              <span className="text-[11px]">Voice: {selectedNarrator.name}</span>
            </div>
            <button
              onClick={() => setIsNarratorPickerOpen(true)}
              className="text-[11px] text-[#F2C765] hover:underline cursor-pointer"
            >
              Change Voice
            </button>
          </div>
        </div>
      )}

      {/* Narrator Selection Bottom Sheet / Modal */}
      <NarratorPicker
        isOpen={isNarratorPickerOpen}
        onClose={() => setIsNarratorPickerOpen(false)}
        onNarratorChanged={onNarratorChanged}
      />
    </div>
  );
}
