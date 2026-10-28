"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { MOCK_STORIES } from "@/data/stories";
import { StoryCard } from "./StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { usePlatform } from "@/hooks/usePlatform";

export function FavoritesPageClient() {
  const { favorites, isFav, toggleFav, getProgress, isLoaded } = useStoryStorage();
  const { isNative } = usePlatform();

  const favoriteStories = useMemo(() => {
    return MOCK_STORIES.filter((s) => favorites.includes(s.slug));
  }, [favorites]);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
      isNative ? "pt-[calc(max(env(safe-area-inset-top,0px),1.25rem)+0.5rem)]" : "py-8 sm:py-14"
    } pb-28 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] space-y-8`}>
      {/* Page Title */}
      <div>
        <h1 className="font-story-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
          Saved Stories
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          {favoriteStories.length} {favoriteStories.length === 1 ? "story" : "stories"} bookmarked in your personal library
        </p>
      </div>

      {/* Saved Stories Section */}
      <section>
        {!isLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
              />
            ))}
          </div>
        ) : favoriteStories.length === 0 ? (
          <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/40 p-12 sm:p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--accent-ochre)]">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-story-serif text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Nothing saved yet
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                Stories you bookmark will appear here, ready whenever you want to come back to them.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/stories"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer active:scale-95"
              >
                <span>Browse Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                progress={getProgress(story.slug)}
                isFavorite={isFav(story.slug)}
                onToggleFavorite={toggleFav}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
