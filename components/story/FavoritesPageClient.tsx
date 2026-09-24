"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { MOCK_STORIES } from "@/data/stories";
import { StoryCard } from "./StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";

export function FavoritesPageClient() {
  const { favorites, isFav, toggleFav, getProgress, isLoaded } = useStoryStorage();

  const favoriteStories = useMemo(() => {
    return MOCK_STORIES.filter((s) => favorites.includes(s.slug));
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-story-serif text-3xl sm:text-4xl font-medium text-[#F7F3EB] tracking-tight">
          Saved Stories
        </h1>
        <p className="text-sm text-[#AB9784] mt-1">
          Your personal collection of bookmarked Gambian folktales and oral legends.
        </p>
      </div>

      {/* Loading state */}
      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 rounded-xl bg-[#1A1613] border border-[#2A231D]"
            />
          ))}
        </div>
      ) : favoriteStories.length === 0 ? (
        /* Simple, Restrained Empty State */
        <div className="text-center py-16 px-4 rounded-xl bg-[#171310] border border-[#2A231D] max-w-md mx-auto space-y-4">
          <Bookmark className="w-8 h-8 text-[#857364] mx-auto" />
          <div>
            <h2 className="font-story-serif text-lg text-[#F7F3EB]">
              No saved stories yet
            </h2>
            <p className="text-xs text-[#857364] mt-1">
              Bookmark stories while browsing to keep them here for easy reading.
            </p>
          </div>
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D9732B] text-white text-xs font-medium hover:bg-[#C45E1B] transition-colors"
          >
            <span>Explore Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* Favorites Grid */
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#241F1A] text-xs text-[#857364]">
            <span>
              {favoriteStories.length} saved {favoriteStories.length === 1 ? "story" : "stories"}
            </span>
            <Link
              href="/stories"
              className="text-[#E0AB3A] hover:underline underline-offset-4 flex items-center gap-1"
            >
              <span>Browse all stories</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

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
        </div>
      )}
    </div>
  );
}
