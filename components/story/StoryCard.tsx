"use client";

import React from "react";
import Link from "next/link";
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
    <article className="group relative flex flex-col justify-between rounded-xl bg-[#1A1613] border border-[#2A231D] hover:border-[#3E352E] transition-all duration-200 p-4 overflow-hidden">
      {/* Top Media & Content */}
      <div className="space-y-3">
        {/* Visual Artwork Container */}
        <div className="relative overflow-hidden rounded-lg">
          <Link
            href={`/stories/${story.slug}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] rounded-lg"
            tabIndex={-1}
            aria-hidden="true"
          >
            <StoryArt
              theme={story.coverImage.paletteTheme}
              size="sm"
              className="rounded-lg transition-transform duration-300 group-hover:scale-102"
            />
          </Link>

          {/* Favorite Toggle Button */}
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(story.slug);
              }}
              className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isFavorite
                  ? "bg-[#D9732B] text-white"
                  : "bg-black/60 text-[#AB9784] hover:text-[#F7F3EB]"
              }`}
              aria-label={
                isFavorite
                  ? `Remove ${story.title} from favorites`
                  : `Save ${story.title} to favorites`
              }
              title={isFavorite ? "Saved" : "Save"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          )}

          {/* Minimal Reading Status Indicator */}
          {isInProgress && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] text-[#F2C765] font-mono">
              Scene {progress.currentSceneNumber} of {progress.totalScenes}
            </div>
          )}

          {isCompleted && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#1B2F21]/90 backdrop-blur-sm text-[10px] text-[#97D6A7] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#97D6A7]" />
              <span>Read</span>
            </div>
          )}
        </div>

        {/* Minimal Category & Tradition Line (No Stacked Pills) */}
        <div className="text-[11px] uppercase tracking-wider text-[#E0AB3A] font-semibold flex items-center gap-1.5">
          <span>{story.category}</span>
          {tradition && (
            <>
              <span className="text-[#857364]">·</span>
              <span className="text-[#AB9784] truncate">{tradition}</span>
            </>
          )}
        </div>

        {/* Title and Subtitle */}
        <div>
          <h3 className="font-story-serif text-lg sm:text-xl text-[#F7F3EB] group-hover:text-[#F2C765] transition-colors leading-snug">
            <Link
              href={`/stories/${story.slug}`}
              className="focus:outline-none focus-visible:underline decoration-[#E0AB3A] underline-offset-4"
            >
              {story.title}
            </Link>
          </h3>
          {story.subtitle && (
            <p className="font-story-serif text-xs italic text-[#857364] mt-0.5 line-clamp-1">
              &ldquo;{story.subtitle}&rdquo;
            </p>
          )}
        </div>

        {/* Single Short Description */}
        <p className="text-xs text-[#AB9784] line-clamp-2 leading-relaxed">
          {story.description}
        </p>
      </div>

      {/* Footer Reading Action */}
      <div className="mt-4 pt-3 border-t border-[#241F1A] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#857364]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D9732B]" />
            {story.readingTimeMinutes}m
          </span>
          {hasNarration && (
            <span className="flex items-center gap-1 text-[#E0AB3A]" title="Narration audio available">
              <Volume2 className="w-3 h-3" />
              <span>Audio</span>
            </span>
          )}
        </div>

        {/* Primary Action Button + Secondary Cinematic Icon */}
        <div className="flex items-center gap-1.5">
          <Link
            href={`/stories/${story.slug}?mode=cinematic`}
            className="p-1.5 rounded-lg text-[#857364] hover:text-[#E0AB3A] hover:bg-white/5 transition-colors"
            title="Cinematic Story Mode"
            aria-label={`Cinematic mode for ${story.title}`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </Link>

          <Link
            href={`/stories/${story.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9732B]/15 hover:bg-[#D9732B]/25 text-[#F2C765] text-xs font-medium transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            <span>{hasNarration ? "Read & Listen" : "Read"}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
