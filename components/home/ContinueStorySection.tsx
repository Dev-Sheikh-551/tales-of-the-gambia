"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, Clock, ArrowRight, RotateCcw, BookOpen } from "lucide-react";
import { MOCK_STORIES } from "@/data/stories";
import { Story } from "@/types/story";
import { CategoryBadge } from "@/components/ui/Badge";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { clearReadingProgress } from "@/lib/storyStorage";

export default function ContinueStorySection() {
  const { progressList, isLoaded } = useStoryStorage();

  const getStory = (slug: string): Story | undefined => {
    return MOCK_STORIES.find((s) => s.slug === slug);
  };

  // Only consider in-progress stories (not completed, valid story found)
  const activeProgress = progressList
    .map((item) => {
      const story = getStory(item.storySlug);
      if (!story || item.percentComplete >= 100) return null;
      return { story, progress: item };
    })
    .filter((item): item is { story: Story; progress: (typeof progressList)[0] } => item !== null);

  // Return null if not loaded yet or no genuine reading progress exists
  if (!isLoaded || activeProgress.length === 0) {
    return null;
  }

  return (
    <section id="continue-reading" className="py-10 border-t border-[#26201A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D9732B]/15 border border-[#D9732B]/30 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-[#D9732B]" />
            </div>
            <div>
              <h3 className="font-story-serif text-xl sm:text-2xl font-medium text-[#F7F3EB]">
                Continue Your Journey
              </h3>
              <p className="text-xs text-[#857364]">Pick up where you left off</p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearReadingProgress}
            className="text-xs text-[#857364] hover:text-[#CBBCAE] flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset active bookmarks"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Clear History</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeProgress.map(({ story, progress }) => {
            return (
              <MotionReveal key={story.slug} delay={0.05} direction="up">
                <div className="p-4 sm:p-5 rounded-xl bg-[#1B1714] border border-[#2E2721] hover:border-[#4A3E34] transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <CategoryBadge category={story.category} />
                      <span className="text-xs text-[#E0AB3A] font-medium">
                        Scene {progress.currentSceneNumber} of {progress.totalScenes}
                      </span>
                    </div>

                    <h4 className="font-story-serif text-lg text-[#F7F3EB] font-medium leading-snug">
                      {story.title}
                    </h4>
                    <p className="text-xs text-[#AB9784] line-clamp-1 mt-1">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-[#26201A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A] rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentComplete}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#857364]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D9732B]" />
                        {story.readingTimeMinutes} min story
                      </span>

                      <Link
                        href={`/stories/${story.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F2C765] hover:text-white transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Continue Story (Scene {progress.currentSceneNumber})</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
