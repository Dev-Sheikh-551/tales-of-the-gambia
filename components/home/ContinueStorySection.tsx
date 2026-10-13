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
    <section id="continue-reading" className="py-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-ochre)]/10 border border-[var(--accent-ochre)]/25 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-[var(--accent-ochre)]" />
            </div>
            <div>
              <h3 className="font-story-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
                Continue Your Journey
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Pick up where you left off</p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearReadingProgress}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] flex items-center gap-1 transition-colors cursor-pointer"
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
                <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <CategoryBadge category={story.category} />
                      <span className="text-xs text-[var(--accent-gold)] font-medium">
                        Scene {progress.currentSceneNumber} of {progress.totalScenes}
                      </span>
                    </div>

                    <h4 className="font-story-serif text-lg text-[var(--text-primary)] font-medium leading-snug">
                      {story.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-1">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--accent-ochre)] to-[var(--accent-gold)] rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentComplete}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--accent-ochre)]" />
                        {story.readingTimeMinutes} min story
                      </span>

                      <Link
                        href={`/stories/${story.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-gold)] hover:text-[var(--accent-ochre)] transition-colors"
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
