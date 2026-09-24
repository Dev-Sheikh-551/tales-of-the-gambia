"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Volume2, Clock, Play } from "lucide-react";
import { getFeaturedStory } from "@/data/stories";
import { StoryArt } from "@/components/ui/StoryArt";

export default function FeaturedStory() {
  const story = getFeaturedStory();

  const tradition =
    story.origin.community ||
    story.origin.ethnicGroup ||
    story.provenance?.community ||
    story.origin.region;

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#241F1A] pb-3 mb-6">
          <span className="text-xs uppercase tracking-widest text-[#E0AB3A] font-semibold">
            Featured Tale
          </span>
        </div>

        {/* Large Clean Editorial Card */}
        <div className="overflow-hidden rounded-2xl bg-[#171310] border border-[#2A231D] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Artwork */}
            <div className="lg:col-span-5 relative">
              <StoryArt
                theme={story.coverImage.paletteTheme}
                size="hero"
                className="rounded-xl shadow-lg w-full"
              />
            </div>

            {/* Story Details & Actions */}
            <div className="lg:col-span-7 space-y-5">
              {/* Category & Region */}
              <div className="text-xs uppercase tracking-wider text-[#E0AB3A] font-semibold flex items-center gap-2">
                <span>{story.category}</span>
                {tradition && (
                  <>
                    <span className="text-[#857364]">·</span>
                    <span className="text-[#AB9784]">{tradition}</span>
                  </>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-story-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F3EB] leading-tight">
                  <Link
                    href={`/stories/${story.slug}`}
                    className="hover:text-[#F2C765] transition-colors"
                  >
                    {story.title}
                  </Link>
                </h2>
                {story.subtitle && (
                  <p className="font-story-serif text-base sm:text-lg italic text-[#AB9784] mt-1">
                    &ldquo;{story.subtitle}&rdquo;
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#CBBCAE] leading-relaxed">
                {story.description}
              </p>

              {/* Read Time & Audio Status */}
              <div className="flex items-center gap-4 text-xs text-[#857364] pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D9732B]" />
                  {story.readingTimeMinutes} min reading
                </span>
                <span className="flex items-center gap-1.5 text-[#E0AB3A]">
                  <Volume2 className="w-3.5 h-3.5" />
                  Full Audio Narration
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D9732B] to-[#C69224] text-white font-medium text-sm shadow-md hover:opacity-95 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read & Listen</span>
                </Link>

                <Link
                  href={`/stories/${story.slug}?mode=cinematic`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#221D18] hover:bg-[#2A241E] border border-[#3E352E] text-[#F2C765] text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Cinematic Mode</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
