"use client";

import React, { useState } from "react";
import { MOCK_STORIES } from "@/data/stories";
import { StoryCategory } from "@/types/story";
import { StoryCard } from "@/components/story/StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";

const CATEGORY_TABS: Array<{ id: StoryCategory | "all"; label: string }> = [
  { id: "all", label: "All Stories" },
  { id: "folktale", label: "Folktales" },
  { id: "fable", label: "Fables" },
  { id: "legend", label: "Legends" },
  { id: "historical", label: "Historical" },
  { id: "children", label: "Children" },
  { id: "bedtime", label: "Bedtime" },
];

export default function StoryDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "all">("all");
  const { isFavorite, toggleFavorite, getProgress } = useStoryStorage();

  const filteredStories =
    selectedCategory === "all"
      ? MOCK_STORIES
      : MOCK_STORIES.filter((s) => s.category === selectedCategory);

  return (
    <section id="explore-stories" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Simple Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-story-serif text-2xl sm:text-3xl font-medium text-[#F7F3EB]">
              Story Collection
            </h2>
            <p className="text-xs text-[#857364] mt-1">
              Explore {filteredStories.length} {filteredStories.length === 1 ? "tale" : "tales"} of oral heritage & wisdom
            </p>
          </div>

          {/* Clean Horizontal Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#D9732B] text-white"
                      : "bg-[#1A1613] text-[#AB9784] hover:text-[#F7F3EB] hover:bg-[#221D18] border border-[#2A231D]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Unified Story Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              progress={getProgress(story.slug)}
              isFavorite={isFavorite(story.slug)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
