"use client";

import React from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from "lucide-react";
import { PlaybackState } from "@/hooks/useStoryPlayback";
import { PlaybackRate, PLAYBACK_RATES } from "@/hooks/useStoryAudio";
import { Volume2, VolumeX, Mic } from "lucide-react";

interface StoryPlaybackControlsProps {
  currentSceneIndex: number;
  totalScenes: number;
  playbackState: PlaybackState;
  elapsedSeconds: number;
  sceneDuration: number;
  progressPercent: number;
  isAutoAdvanceEnabled: boolean;
  onToggleAutoAdvance: () => void;
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onJumpToScene: (index: number) => void;
  hasAudio?: boolean;
  playbackRate?: PlaybackRate;
  onSetRate?: (rate: PlaybackRate) => void;
  narrationVolume?: number;
  onToggleMute?: () => void;
}

export function StoryPlaybackControls({
  currentSceneIndex,
  totalScenes,
  playbackState,
  elapsedSeconds,
  sceneDuration,
  progressPercent,
  isAutoAdvanceEnabled,
  onToggleAutoAdvance,
  onTogglePlayPause,
  onNext,
  onPrevious,
  onJumpToScene,
  hasAudio,
  playbackRate,
  onSetRate,
  narrationVolume,
  onToggleMute,
}: StoryPlaybackControlsProps) {

  const isPlaying = playbackState === "playing";

  const formatTime = (seconds: number) => {
    const s = Math.floor(seconds);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  };

  return (
    <div className="w-full bg-[#12100E]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-3.5 z-40 select-none">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Segmented Scene Progress Bar */}
        <div className="flex items-center gap-1.5 w-full">
          {Array.from({ length: totalScenes }).map((_, idx) => {
            const isCompleted = idx < currentSceneIndex;
            const isCurrent = idx === currentSceneIndex;

            return (
              <button
                key={idx}
                onClick={() => onJumpToScene(idx)}
                className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/15 cursor-pointer relative transition-all hover:h-2"
                aria-label={`Jump to scene ${idx + 1}`}
                title={`Scene ${idx + 1}`}
              >
                {isCompleted && <div className="w-full h-full bg-[#D9732B]" />}
                {isCurrent && (
                  <div
                    className="h-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Transport Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Time display & Auto-advance toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-xs text-[#AB9784] flex items-center gap-1.5">
              {hasAudio && (
                <span title="Narration audio active" className="inline-flex items-center">
                  <Mic className="w-3 h-3 text-[#E0AB3A]" />
                </span>
              )}
              <span>
                {formatTime(elapsedSeconds)} / {formatTime(sceneDuration)}
              </span>
            </span>

            <button
              onClick={onToggleAutoAdvance}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                isAutoAdvanceEnabled
                  ? "bg-[#D9732B]/15 border-[#D9732B]/40 text-[#F2C765]"
                  : "bg-white/5 border-white/10 text-[#857364] hover:text-[#CBBCAE]"
              }`}
              title="Toggle automatic advance between scenes"
              aria-label="Toggle auto-advance"
            >
              <RotateCw className="w-3 h-3" />
              <span>Auto-advance: {isAutoAdvanceEnabled ? "On" : "Off"}</span>
            </button>
          </div>

          {/* Center: Main Playback Buttons (Thumb-friendly 44px+) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              disabled={currentSceneIndex === 0}
              onClick={onPrevious}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-[#F7F3EB] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous scene"
              title="Previous scene (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePlayPause}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D9732B] to-[#C69224] text-white shadow-lg shadow-[#D9732B]/30 hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlaying ? "Pause playback" : "Play playback"}
              title="Play / Pause (Space)"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-[#F7F3EB] transition-all"
              aria-label={
                currentSceneIndex === totalScenes - 1
                  ? "Complete story"
                  : "Next scene"
              }
              title="Next scene (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Audio options & Scene count indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onSetRate && playbackRate && (
              <button
                onClick={() => {
                  const idx = PLAYBACK_RATES.indexOf(playbackRate);
                  onSetRate(PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length]);
                }}
                className="hidden sm:inline-flex px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#AB9784] hover:text-[#F7F3EB] transition-colors"
                title="Change playback speed"
                aria-label={`Playback speed: ${playbackRate}×`}
              >
                {playbackRate}×
              </button>
            )}

            {onToggleMute && narrationVolume !== undefined && (
              <button
                onClick={onToggleMute}
                className="p-1.5 rounded-lg text-[#857364] hover:text-[#F7F3EB] hover:bg-white/5 transition-colors"
                title={narrationVolume === 0 ? "Unmute audio" : "Mute audio"}
                aria-label={narrationVolume === 0 ? "Unmute audio" : "Mute audio"}
              >
                {narrationVolume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}

            <div className="flex items-center gap-1 text-xs font-mono text-[#AB9784]">
              <span className="hidden sm:inline">Scene</span>
              <span className="text-[#F2C765] font-semibold">
                {String(currentSceneIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(totalScenes).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
