"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight, Play } from "lucide-react";
import { getFeaturedStory } from "@/data/stories";
import { StoryArt } from "@/components/ui/StoryArt";

export default function FeaturedStory() {
  const story = getFeaturedStory();

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching prototype */}
        <h2 className="font-story-serif text-2xl sm:text-3xl font-normal text-[var(--text-primary)] mb-6">
          Featured Story
        </h2>

        {/* Large Cinematic Showcase Card matching prototype */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-[#221D18] border border-white/10 shadow-2xl transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Visual Artwork on the Left */}
            <div className="md:col-span-6 relative h-[260px] sm:h-[320px] md:h-[400px]">
              <StoryArt
                theme={story.coverImage.paletteTheme}
                size="hero"
                className="w-full h-full rounded-none border-0"
              />
            </div>

            {/* Story Details on the Right matching prototype */}
            <div className="md:col-span-6 p-6 sm:p-8 md:p-12 space-y-4">
              {/* Category */}
              <div className="text-xs uppercase tracking-widest text-[#E0AB3A] font-semibold">
                {story.category}
              </div>

              {/* Title */}
              <h3 className="font-story-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight">
                <Link
                  href={`/stories/${story.slug}`}
                  className="hover:text-[#F2C765] transition-colors"
                >
                  {story.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-[#CBBCAE] leading-relaxed line-clamp-3">
                {story.description}
              </p>

              {/* Read Time */}
              <div className="flex items-center gap-1.5 text-xs text-[#857364] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#D9732B]" />
                <span>{story.readingTimeMinutes} min</span>
              </div>

              {/* Open Story Action Link matching prototype */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1.5 text-[#E0AB3A] hover:text-[#F2C765] text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Open Story</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  href={`/stories/${story.slug}?mode=cinematic`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium transition-colors cursor-pointer"
                  title="Cinematic Mode"
                >
                  <Play className="w-3 h-3 fill-current text-[#E0AB3A]" />
                  <span>Cinematic</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
