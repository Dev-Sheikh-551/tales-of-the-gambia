"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Bookmark, HardDriveDownload } from "lucide-react";
import { MOCK_STORIES } from "@/data/stories";
import { StoryCard } from "./StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { useDownloadedStories } from "@/hooks/useOfflineStory";

export function FavoritesPageClient() {
  const { favorites, isFav, toggleFav, getProgress, isLoaded } = useStoryStorage();
  const { downloadedSlugs } = useDownloadedStories();

  const favoriteStories = useMemo(() => {
    return MOCK_STORIES.filter((s) => favorites.includes(s.slug));
  }, [favorites]);

  const downloadedStories = useMemo(() => {
    return MOCK_STORIES.filter((s) => downloadedSlugs.has(s.slug));
  }, [downloadedSlugs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 pb-28 space-y-12">
      {/* Page Title matching prototype Screenshot 4 */}
      <div>
        <h1 className="font-story-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
          Saved
        </h1>
      </div>

      {/* 1. Saved Stories Section */}
      <section className="space-y-4">
        <h2 className="font-story-serif text-xl sm:text-2xl font-normal text-[var(--text-primary)]">
          Saved Stories
        </h2>

        {!isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
              />
            ))}
          </div>
        ) : favoriteStories.length === 0 ? (
          /* Empty State matching Screenshot 4 */
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
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1A1614] text-white dark:bg-white dark:text-[#12100E] text-xs font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
              >
                Browse Stories
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

      {/* 2. Downloaded Section */}
      <section className="space-y-4">
        <h2 className="font-story-serif text-xl sm:text-2xl font-normal text-[var(--text-primary)]">
          Downloaded
        </h2>

        {downloadedStories.length === 0 ? (
          /* Empty State matching Screenshot 4 */
          <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/40 p-12 sm:p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--accent-ochre)]">
              <HardDriveDownload className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-story-serif text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                No downloads yet
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                Use Save Offline inside any story to keep it ready for when you have no signal.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadedStories.map((story) => (
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
