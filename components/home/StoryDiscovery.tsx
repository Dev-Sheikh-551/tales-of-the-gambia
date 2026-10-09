"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_STORIES } from "@/data/stories";
import { StoryCategory } from "@/types/story";
import { StoryCard } from "@/components/story/StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";

const EXPLORE_CATEGORIES = [
  {
    id: "folktale",
    label: "Folktales",
    description: "Trickster tales and animal wisdom",
  },
  {
    id: "legend",
    label: "Legends",
    description: "Rivers, spirits, and griots",
  },
  {
    id: "historical",
    label: "Historical",
    description: "Warriors and kingdoms",
  },
  {
    id: "fable",
    label: "Fables",
    description: "Lessons from the forest",
  },
  {
    id: "children",
    label: "Children",
    description: "Stories to grow up with",
  },
  {
    id: "bedtime",
    label: "Bedtime",
    description: "Gentle tales for sleep",
  },
];

export default function StoryDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "all">("all");
  const { isFav, toggleFav, getProgress } = useStoryStorage();

  const filteredStories =
    selectedCategory === "all"
      ? MOCK_STORIES
      : MOCK_STORIES.filter((s) => s.category === selectedCategory);

  return (
    <section id="explore-stories" className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Explore Stories Categories Grid matching Screenshot 3 */}
        <div>
          <h2 className="font-story-serif text-2xl sm:text-3xl font-normal text-[var(--text-primary)] mb-6">
            Explore Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/stories?category=${cat.id}`}
                className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] hover:shadow-md transition-all group block cursor-pointer"
              >
                <h3 className="font-story-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-ochre)] transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Story Collection Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="font-story-serif text-xl sm:text-2xl font-normal text-[var(--text-primary)]">
                Latest Stories
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Showing {Math.min(filteredStories.length, 6)} of {filteredStories.length} oral stories
              </p>
            </div>

            <Link
              href="/stories"
              className="text-xs font-semibold text-[var(--accent-ochre)] hover:underline underline-offset-4 flex items-center gap-1"
            >
              <span>View all 29 stories</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.slice(0, 6).map((story) => (
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
      </div>
    </section>
  );
}
