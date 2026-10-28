"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { getFeaturedStory, MOCK_STORIES } from "@/data/stories";
import { StoryCard } from "@/components/story/StoryCard";
import { StoryArt } from "@/components/ui/StoryArt";

/**
 * Purpose-built home screen for Capacitor Android/iOS.
 * Replaces the website hero with a compact, theme-aware app-style layout.
 * The web homepage and its hero section remain completely untouched.
 */
export default function NativeMobileHome() {
  const { progressList, isLoaded, isFav, toggleFav, getProgress } = useStoryStorage();

  const featured = getFeaturedStory();

  // Last in-progress story for the "Continue" card
  const continueItem = React.useMemo(() => {
    if (!isLoaded) return null;
    const active = progressList
      .map((p) => {
        const story = MOCK_STORIES.find((s) => s.slug === p.storySlug);
        if (!story || p.percentComplete >= 100) return null;
        return { story, progress: p };
      })
      .filter(Boolean)[0];
    return active ?? null;
  }, [isLoaded, progressList]);

  // Recent stories for the discovery carousel (skip featured)
  const recentStories = MOCK_STORIES.filter((s) => s.slug !== featured.slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-28">

      {/* ── Compact Brand Header with Safe Area Spacing ───────── */}
      <header className="px-5 pt-[calc(max(env(safe-area-inset-top,0px),1.25rem)+0.5rem)] pb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent-gold)] font-semibold mb-0.5">
            Tales of The Gambia
          </p>
          <p className="text-[var(--text-secondary)] text-xs font-light">
            Stories from the Senegambia
          </p>
        </div>
        <ThemeToggle size="md" />
      </header>

      <div className="px-4 space-y-7">

        {/* ── Continue Reading (only when real progress exists) ── */}
        {continueItem && (
          <section>
            <h2 className="font-story-serif text-lg font-medium text-[var(--text-primary)] mb-3">
              Continue Reading
            </h2>
            <Link
              href={`/stories/${continueItem.story.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] transition-all active:scale-[0.98]"
            >
              {/* Artwork thumbnail */}
              <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                <StoryArt
                  theme={continueItem.story.coverImage.paletteTheme}
                  src={continueItem.story.coverImage.src}
                  alt={continueItem.story.coverImage.alt}
                  size="sm"
                  className="w-full h-full"
                />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[var(--accent-ochre)] font-semibold mb-0.5">
                  Scene {continueItem.progress.currentSceneNumber} of {continueItem.progress.totalScenes}
                </p>
                <h3 className="font-story-serif text-sm font-semibold text-[var(--text-primary)] line-clamp-2 leading-snug">
                  {continueItem.story.title}
                </h3>
                {/* Progress bar */}
                <div className="mt-2 w-full h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-ochre)] to-[var(--accent-gold)] rounded-full"
                    style={{ width: `${continueItem.progress.percentComplete}%` }}
                  />
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            </Link>
          </section>
        )}

        {/* ── Featured Story ───────────────────────────────────── */}
        <section>
          <h2 className="font-story-serif text-lg font-medium text-[var(--text-primary)] mb-3">
            Featured Story
          </h2>
          <div className="rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
            {/* Artwork banner */}
            <div className="relative h-44 sm:h-52">
              <StoryArt
                theme={featured.coverImage.paletteTheme}
                src={featured.coverImage.src}
                alt={featured.coverImage.alt}
                size="hero"
                className="w-full h-full rounded-none border-0 object-cover"
              />
              {/* Cinematic button overlaid */}
              <Link
                href={`/stories/${featured.slug}?mode=cinematic`}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium hover:bg-black/80 transition-all active:scale-95"
              >
                <Play className="w-3 h-3 fill-current text-[#E0AB3A]" />
                <span>Cinematic</span>
              </Link>
            </div>
            {/* Details */}
            <div className="p-4 space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-[var(--accent-ochre)] font-semibold">
                {featured.category}
              </p>
              <h3 className="font-story-serif text-xl font-semibold text-[var(--text-primary)] leading-snug">
                {featured.title}
              </h3>
              <div className="pt-1">
                <Link
                  href={`/stories/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-gold)] hover:underline underline-offset-4"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Story</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Story Discovery Carousel (Spacious Layout) ───────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-story-serif text-lg font-medium text-[var(--text-primary)]">
                Explore Stories
              </h2>
              <p className="text-[11px] text-[var(--text-muted)]">
                Swipe to browse oral tales & fables
              </p>
            </div>
            <Link
              href="/stories"
              className="text-xs font-semibold text-[var(--accent-ochre)] flex items-center gap-1 hover:underline underline-offset-4"
            >
              <span>View all ({MOCK_STORIES.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Polished horizontal story carousel with snap points */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory -mx-4 px-4 pb-2">
            {recentStories.map((story) => (
              <div
                key={story.id}
                className="w-[260px] sm:w-[280px] shrink-0 snap-start"
              >
                <StoryCard
                  story={story}
                  progress={getProgress(story.slug)}
                  isFavorite={isFav(story.slug)}
                  onToggleFavorite={toggleFav}
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
