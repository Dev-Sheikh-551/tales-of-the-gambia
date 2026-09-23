"use client";

import React from "react";
import Link from "next/link";
import { History, ArrowRight, BookOpen } from "lucide-react";
import { MOCK_STORIES } from "@/data/stories";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { CategoryBadge, ContentTypeBadge } from "@/components/ui/Badge";
import { MotionReveal } from "@/components/motion/MotionReveal";

export default function RecentlyReadSection() {
  const { recentList, isLoaded } = useStoryStorage();

  if (!isLoaded || recentList.length === 0) {
    return null;
  }

  const stories = recentList
    .map((item) => {
      const story = MOCK_STORIES.find((s) => s.slug === item.slug);
      return story ? { story, timestamp: item.timestamp } : null;
    })
    .filter((item): item is { story: (typeof MOCK_STORIES)[0]; timestamp: number } => item !== null);

  if (stories.length === 0) return null;

  return (
    <section className="py-10 border-t border-[#26201A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#264A51]/20 border border-[#4B8590]/30 flex items-center justify-center">
              <History className="w-4 h-4 text-[#97CDD6]" />
            </div>
            <div>
              <h3 className="font-story-serif text-xl sm:text-2xl font-medium text-[#F7F3EB]">
                Recently Visited
              </h3>
              <p className="text-xs text-[#857364]">Stories you recently explored</p>
            </div>
          </div>

          <Link
            href="/stories"
            className="text-xs text-[#E0AB3A] hover:underline underline-offset-4 flex items-center gap-1"
          >
            <span>View all stories</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.slice(0, 4).map(({ story }, idx) => (
            <MotionReveal key={story.id} delay={idx * 0.05} direction="up">
              <Link
                href={`/stories/${story.slug}`}
                className="group p-4 rounded-xl bg-[#1A1613] border border-[#2A231D] hover:border-[#4A3E34] transition-all flex flex-col justify-between h-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={story.category} />
                    <ContentTypeBadge type={story.contentType} />
                  </div>
                  <h4 className="font-story-serif text-base text-[#F7F3EB] group-hover:text-[#F2C765] transition-colors line-clamp-1 leading-snug">
                    {story.title}
                  </h4>
                  <p className="text-xs text-[#AB9784] line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#26201A] flex items-center justify-between text-xs text-[#857364]">
                  <span>{story.readingTimeMinutes} min</span>
                  <span className="inline-flex items-center gap-1 text-[#F2C765] group-hover:translate-x-0.5 transition-transform">
                    <BookOpen className="w-3 h-3" />
                    <span>Open</span>
                  </span>
                </div>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
