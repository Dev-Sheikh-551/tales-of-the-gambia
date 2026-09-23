"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, BookOpen, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Story } from "@/types/story";
import { MOCK_STORIES } from "@/data/stories";
import { StoryArt } from "@/components/ui/StoryArt";
import { ContentTypeBadge } from "@/components/ui/Badge";

interface StoryCompletionViewProps {
  currentStory: Story;
  onReplay: () => void;
  onReturnToReader: () => void;
}

export function StoryCompletionView({
  currentStory,
  onReplay,
  onReturnToReader,
}: StoryCompletionViewProps) {
  // Find a single recommended next story
  const nextStory =
    MOCK_STORIES.find((s) => s.slug !== currentStory.slug) || MOCK_STORIES[1];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 bg-[#12100E] z-30 select-none">
      {/* Background soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D9732B]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-xl w-full bg-[#1A1613] border border-[#3E352E] rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Completion Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D9732B]/20 to-[#C69224]/20 border border-[#E0AB3A]/40 mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-[#F2C765]" />
        </div>

        {/* Title & Celebration */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#E0AB3A] font-semibold">
            Story Complete
          </span>
          <h2 className="font-story-serif text-2xl sm:text-4xl text-[#F7F3EB] leading-tight">
            {currentStory.title}
          </h2>
          <p className="font-story-serif italic text-xs sm:text-sm text-[#AB9784]">
            &ldquo;{currentStory.subtitle}&rdquo;
          </p>
        </div>

        {currentStory.narrative?.closingFormula ? (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#C69224]/10 to-transparent border-l-2 border-[#E0AB3A] text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#E0AB3A] font-semibold block mb-1">
              Traditional Oral Closing
            </span>
            <p className="font-story-serif italic text-xs sm:text-sm text-[#F7F3EB]">
              &ldquo;{currentStory.narrative.closingFormula}&rdquo;
            </p>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-[#CBBCAE] leading-relaxed max-w-md mx-auto">
            The oral journey has reached its conclusion. May the wisdom of this tale remain with
            your spirit until the next fire is lit.
          </p>
        )}

        {currentStory.narrative?.communalMoral && (
          <div className="text-xs text-[#AB9784] bg-[#14100E] p-3 rounded-xl border border-[#2E2721] text-left">
            <span className="text-[#E0AB3A] font-semibold block mb-0.5">Communal Reflection:</span>
            <span>{currentStory.narrative.communalMoral}</span>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#241F1A] hover:bg-[#2F2721] border border-[#3E352E] text-xs font-medium text-[#F7F3EB] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E0AB3A]" />
            <span>Replay Story</span>
          </button>

          <button
            onClick={onReturnToReader}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D9732B] to-[#C69224] text-white text-xs font-medium shadow-md hover:scale-102 transition-transform"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Return to Reading Mode</span>
          </button>
        </div>

        {/* Single Strong Next Story Suggestion */}
        {nextStory && (
          <div className="pt-6 border-t border-[#26201A] text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#857364] font-medium block mb-2">
              Recommended Next Journey
            </span>

            <Link
              href={`/stories/${nextStory.slug}?mode=cinematic`}
              className="group flex items-center gap-3.5 p-3 rounded-2xl bg-[#14100E] border border-[#2E2721] hover:border-[#4A3E34] transition-all"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <StoryArt
                  theme={nextStory.coverImage.paletteTheme}
                  size="sm"
                  className="w-full h-full rounded-xl"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <ContentTypeBadge type={nextStory.contentType} />
                </div>
                <h4 className="font-story-serif text-sm font-medium text-[#F7F3EB] group-hover:text-[#F2C765] truncate transition-colors">
                  {nextStory.title}
                </h4>
                <p className="text-[11px] text-[#AB9784] truncate">{nextStory.subtitle}</p>
              </div>

              <ArrowRight className="w-4 h-4 text-[#857364] group-hover:text-[#F2C765] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
