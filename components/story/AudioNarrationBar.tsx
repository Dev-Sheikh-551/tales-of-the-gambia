"use client";

import React, { useId, useState } from "react";
import {
  Play,
  Pause,
  RefreshCw,
  Mic,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { AudioState, PlaybackRate, PLAYBACK_RATES } from "@/hooks/useStoryAudio";

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
}: AudioNarrationBarProps) {
  const scrubId = useId();
  const narVolId = useId();
  const [showSettings, setShowSettings] = useState(false);

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
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play / Pause Button */}
        <button
          onClick={handleToggle}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9732B] to-[#C69224] text-white flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label={isPlaying ? "Pause narration" : "Play narration"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Time Readout */}
        <span className="text-[11px] font-mono text-[#857364] shrink-0 w-16">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Scrubber Progress Bar */}
        <div className="relative flex-1 py-2 cursor-pointer select-none">
          <div className="w-full h-1 bg-[#26201A] rounded-full overflow-hidden pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A] rounded-full transition-all duration-100"
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
            className="absolute inset-0 w-full opacity-0 cursor-pointer select-none touch-none h-full"
            aria-label="Seek narration"
            aria-valuemin={0}
            aria-valuemax={duration || 0}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          />
        </div>

        {/* Audio Settings & Volume Disclosure Toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            showSettings
              ? "bg-[#2A231D] text-[#F2C765]"
              : "text-[#857364] hover:text-[#F7F3EB] hover:bg-white/5"
          }`}
          title="Audio levels & playback speed"
          aria-label="Audio settings"
          aria-expanded={showSettings}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
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
              className="flex-1 accent-[#D9732B] h-1 cursor-pointer select-none touch-none"
              aria-label="Narration volume"
            />
            <span className="text-[10px] font-mono text-[#857364] w-7 text-right">
              {Math.round(narrationVolume * 100)}%
            </span>
          </div>

          {/* Playback Speed selector */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#857364]">
            <span className="text-[10px] uppercase mr-1">Speed</span>
            {PLAYBACK_RATES.map((rate) => (
              <button
                key={rate}
                onClick={() => onSetRate(rate)}
                className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                  playbackRate === rate
                    ? "bg-[#D9732B] text-white font-bold"
                    : "hover:text-[#F7F3EB] hover:bg-white/5"
                }`}
              >
                {rate}×
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
