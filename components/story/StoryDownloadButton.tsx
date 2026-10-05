"use client";

import React, { useState } from "react";
import {
  Download,
  Check,
  Loader2,
  Trash2,
  AlertCircle,
  HardDriveDownload,
} from "lucide-react";
import { Story } from "@/types/story";
import { useOfflineStory } from "@/hooks/useOfflineStory";
import { formatBytes } from "@/lib/offline/assetResolver";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { useNarrator } from "@/hooks/useNarrator";

interface StoryDownloadButtonProps {
  story: Story;
  variant?: "compact" | "bar" | "full";
  className?: string;
}

export function StoryDownloadButton({
  story,
  variant = "compact",
  className = "",
}: StoryDownloadButtonProps) {
  const { selectedNarratorId } = useNarrator();
  const {
    status,
    isOfflineReady,
    isDownloading,
    progressPercent,
    error,
    downloadStory,
    removeStory,
  } = useOfflineStory(story);

  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  // Check if story has production narration
  const hasNarration = story.scenes.some((s) => {
    const res = resolveSceneNarration(s.audio, selectedNarratorId);
    return res.hasAudio && res.narrationUrl;
  });

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isDownloading) return;
    await downloadStory();
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await removeStory();
    setShowConfirmRemove(false);
  };

  const handleToggleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowConfirmRemove((prev) => !prev);
  };

  // Compact variant: fits nicely in header/action bar
  if (variant === "compact") {
    if (isDownloading) {
      return (
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 ${className}`}
          title={`Downloading offline package: ${progressPercent}%`}
          aria-live="polite"
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>{progressPercent}%</span>
        </div>
      );
    }

    if (isOfflineReady) {
      if (showConfirmRemove) {
        return (
          <div className="flex items-center gap-1 bg-red-950/60 border border-red-500/30 rounded-full px-2 py-0.5 text-xs text-red-200">
            <span>Remove?</span>
            <button
              onClick={handleRemove}
              className="px-1.5 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-medium"
              aria-label="Confirm delete offline download"
            >
              Yes
            </button>
            <button
              onClick={handleToggleConfirm}
              className="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              aria-label="Cancel removal"
            >
              No
            </button>
          </div>
        );
      }

      return (
        <button
          onClick={handleToggleConfirm}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30 transition-colors group ${className}`}
          title="Downloaded for offline use (Click to remove)"
          aria-label="Story downloaded offline. Click to remove."
        >
          <Check className="w-3.5 h-3.5 group-hover:hidden" />
          <Trash2 className="w-3.5 h-3.5 hidden group-hover:inline" />
          <span className="group-hover:hidden">Offline</span>
          <span className="hidden group-hover:inline">Remove</span>
        </button>
      );
    }

    return (
      <button
        onClick={handleDownload}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 hover:border-neutral-600 transition-colors ${className}`}
        title={
          hasNarration
            ? "Download story & narration for offline listening"
            : "Download story text & visuals for offline reading"
        }
        aria-label="Download story for offline use"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Save</span>
      </button>
    );
  }

  // Full / Bar variant: used inside settings drawer or dedicated info cards
  return (
    <div
      className={`p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-2 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDriveDownload className="w-4 h-4 text-amber-500" />
          <div>
            <div className="text-sm font-medium text-neutral-200">
              Offline Story Package
            </div>
            <div className="text-xs text-neutral-400">
              {hasNarration
                ? "Full story + synchronized voice narration"
                : "Story narrative & visual presentation (Voice coming soon)"}
            </div>
          </div>
        </div>

        {isDownloading ? (
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{progressPercent}%</span>
          </div>
        ) : isOfflineReady ? (
          showConfirmRemove ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRemove}
                className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-medium text-white transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleToggleConfirm}
                className="px-2 py-1 rounded-lg bg-neutral-800 text-xs text-neutral-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleToggleConfirm}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-red-950/40 hover:border-red-500/30 hover:text-red-300 text-xs font-medium transition-colors group"
            >
              <Check className="w-3.5 h-3.5 group-hover:hidden" />
              <Trash2 className="w-3.5 h-3.5 hidden group-hover:inline" />
              <span className="group-hover:hidden">Downloaded</span>
              <span className="hidden group-hover:inline">Remove</span>
            </button>
          )
        ) : (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-neutral-950 font-semibold text-xs transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        )}
      </div>

      {isDownloading && (
        <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
