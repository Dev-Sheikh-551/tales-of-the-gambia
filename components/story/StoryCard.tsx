"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  Volume2,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Story, StoryProgress } from "@/types/story";
import { StoryArt } from "@/components/ui/StoryArt";
import { MOTION_EASINGS } from "@/lib/motion/tokens";

interface StoryCardProps {
  story: Story;
  progress?: StoryProgress;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
  priority?: boolean;
}

export function StoryCard({
  story,
  progress,
  isFavorite = false,
  onToggleFavorite,
}: StoryCardProps) {
  const isCompleted = progress && progress.percentComplete >= 100;
  const isInProgress = progress && progress.percentComplete > 0 && !isCompleted;

  // Check if story has any scene audio narration
  const hasNarration = Boolean(
    story.scenes.some((s) => s.audio?.narrationUrl) || story.listeningDurationSeconds > 0
  );

  return (
    <motion.article
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: MOTION_EASINGS.standard }}
      className="group relative flex flex-col justify-end rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all overflow-hidden shadow-sm hover:shadow-xl cursor-pointer min-h-[300px] sm:min-h-[340px] aspect-[3/4]"
    >
      {/* Full Card Tap Target Link */}
      <Link
        href={`/stories/${story.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Open story: ${story.title}`}
        tabIndex={-1}
      />

      {/* Background Artwork Layer Filling Entire Card */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <StoryArt
          theme={story.coverImage.paletteTheme}
          src={story.coverImage.src}
          alt={story.coverImage.alt}
          size="hero"
          className="!h-full !w-full rounded-none border-0 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle Dark Gradient: Transparent top half, smooth darkening behind text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 via-45% to-transparent pointer-events-none" />
      </div>

      {/* Top Left: Reading / Progress Status */}
      {isCompleted && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-md text-[10px] text-emerald-300 font-medium flex items-center gap-1 z-20 pointer-events-none">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Read</span>
        </div>
      )}
      {isInProgress && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] text-[var(--accent-gold)] font-mono z-20 pointer-events-none">
          Scene {progress.currentSceneNumber}/{progress.totalScenes}
        </div>
      )}

      {/* Top Right: Favorite Bookmark Button */}
      {onToggleFavorite && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          animate={isFavorite ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(story.slug);
          }}
          className={`absolute top-3 right-3 min-w-[36px] min-h-[36px] flex items-center justify-center p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-20 ${
            isFavorite
              ? "bg-[var(--accent-ochre)] text-white shadow-lg"
              : "bg-black/50 text-white/80 hover:text-white hover:bg-black/70 border border-white/10"
          }`}
          aria-label={
            isFavorite
              ? `Remove ${story.title} from favorites`
              : `Save ${story.title} to favorites`
          }
          title={isFavorite ? "Saved" : "Save"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
        </motion.button>
      )}

      {/* Bottom Content Overlay */}
      <div className="relative z-20 p-4 sm:p-4.5 space-y-1.5 pointer-events-none">
        {/* Category Badge */}
        <div>
          <span className="inline-block text-[10px] uppercase tracking-widest text-[#F2C765] font-semibold drop-shadow-sm">
            {story.category}
          </span>
        </div>

        {/* Story Title */}
        <h3 className="font-story-serif text-base sm:text-lg font-bold text-white group-hover:text-[#F2C765] transition-colors leading-snug line-clamp-2 drop-shadow-md">
          {story.title}
        </h3>

        {/* Metadata & Actions Bar */}
        <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 font-medium text-[11px] text-[#E4DCD3]">
              <Clock className="w-3 h-3 text-[#E0AB3A]" />
              {story.readingTimeMinutes} min
            </span>
            {hasNarration && (
              <span className="flex items-center gap-1 text-[11px] text-[#F2C765]" title="Narration audio available">
                <Volume2 className="w-3 h-3" />
                <span>Audio</span>
              </span>
            )}
          </div>

          <div className="pointer-events-auto flex items-center gap-1">
            <Link
              href={`/stories/${story.slug}?mode=cinematic`}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#E0AB3A] hover:text-[#12100E] text-white/90 backdrop-blur-md transition-all active:scale-95"
              title="Cinematic Story Mode"
              aria-label={`Cinematic mode for ${story.title}`}
            >
              <Play className="w-3 h-3 fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
