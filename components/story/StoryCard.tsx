"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  Volume2,
  BookOpen,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Story, StoryProgress } from "@/types/story";
import { StoryArt } from "@/components/ui/StoryArt";
import { MOTION_EASINGS } from "@/lib/motion/tokens";
import { useOfflineStory } from "@/hooks/useOfflineStory";

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
  const { isOfflineReady } = useOfflineStory(story);

  // Extract tradition/community
  const tradition =
    story.origin.community ||
    story.origin.ethnicGroup ||
    story.provenance?.community ||
    story.origin.region;

  // Check if story has any scene audio narration
  const hasNarration = Boolean(
    story.scenes.some((s) => s.audio?.narrationUrl) || story.listeningDurationSeconds > 0
  );

  return (
    <motion.article
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.22, ease: MOTION_EASINGS.standard }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] transition-all p-3.5 sm:p-4 overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
    >
      {/* Full Card Tap Target Overlay */}
      <Link
        href={`/stories/${story.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Open story: ${story.title}`}
        tabIndex={-1}
      />

      {/* Top Media & Content */}
      <div className="space-y-3 relative z-10 pointer-events-none">
        {/* Visual Artwork Container */}
        <div className="relative overflow-hidden rounded-xl pointer-events-auto">
          <Link
            href={`/stories/${story.slug}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-xl"
            tabIndex={-1}
            aria-hidden="true"
          >
            <StoryArt
              theme={story.coverImage.paletteTheme}
              size="sm"
              className="rounded-xl transition-transform duration-300 group-hover:scale-103"
            />
          </Link>

          {/* Favorite Toggle Button matching prototype */}
          {onToggleFavorite && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.8 }}
              animate={isFavorite ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(story.slug);
              }}
              className={`absolute top-2 right-2 min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer z-20 ${
                isFavorite
                  ? "bg-[var(--accent-ochre)] text-white shadow-md"
                  : "bg-black/60 text-white/80 hover:text-white"
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

          {/* Reading Status Indicator */}
          {isInProgress && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] text-[var(--accent-gold)] font-mono">
              Scene {progress.currentSceneNumber} of {progress.totalScenes}
            </div>
          )}

          {isCompleted && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-950/80 backdrop-blur-sm text-[10px] text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-300" />
              <span>Read</span>
            </div>
          )}
        </div>

        {/* Minimal Category & Tradition Line matching prototype */}
        <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--accent-ochre)] font-semibold flex items-center gap-1.5">
          <span>{story.category}</span>
          {tradition && (
            <>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-secondary)] truncate">{tradition}</span>
            </>
          )}
        </div>

        {/* Title and Subtitle matching prototype */}
        <div>
          <h3 className="font-story-serif text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-ochre)] transition-colors leading-snug">
            <Link
              href={`/stories/${story.slug}`}
              className="focus:outline-none focus-visible:underline decoration-[var(--accent-gold)] underline-offset-4"
            >
              {story.title}
            </Link>
          </h3>
          {story.subtitle && (
            <p className="font-story-serif text-xs italic text-[var(--text-muted)] mt-0.5 line-clamp-1">
              &ldquo;{story.subtitle}&rdquo;
            </p>
          )}
        </div>

        {/* Excerpt Description */}
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {story.description}
        </p>
      </div>

      {/* Footer Reading Action */}
      <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[11px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[var(--accent-ochre)]" />
            {story.readingTimeMinutes} min
          </span>
          {hasNarration && (
            <span className="flex items-center gap-1 text-[var(--accent-gold)]" title="Narration audio available">
              <Volume2 className="w-3 h-3" />
              <span>Audio</span>
            </span>
          )}
          {isOfflineReady && (
            <span className="flex items-center gap-1 text-emerald-500 font-medium" title="Saved offline">
              <CheckCircle2 className="w-3 h-3" />
              <span>Offline</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 relative z-10">
          <Link
            href={`/stories/${story.slug}?mode=cinematic`}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
            title="Cinematic Story Mode"
            aria-label={`Cinematic mode for ${story.title}`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </Link>

          <Link
            href={`/stories/${story.slug}`}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[var(--accent-ochre)] hover:bg-[var(--bg-secondary)] text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Read</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
