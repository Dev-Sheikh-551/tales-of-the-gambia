"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useStoryStorage } from "@/hooks/useStoryStorage";

export default function HeroSection() {
  const { progressList, isLoaded } = useStoryStorage();
  const lastReadStorySlug =
    isLoaded && progressList.length > 0 ? progressList[0].storySlug : null;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#111618] via-[#141B1E] to-[#1A2529] text-[#F7F3EB] pt-28 sm:pt-36 pb-20 sm:pb-24">
      {/* Background Ambience: Subtle Stars, Moon Glow, and Silhouette */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Golden Moon Glow at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#E0AB3A]/15 via-[#D9732B]/8 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle Constellation Dots */}
        <div className="absolute top-12 left-[12%] w-1.5 h-1.5 rounded-full bg-[#FFEAA7]/60" />
        <div className="absolute top-24 left-[28%] w-1 h-1 rounded-full bg-[#FFEAA7]/40" />
        <div className="absolute top-16 right-[15%] w-1.5 h-1.5 rounded-full bg-[#FFEAA7]/70" />
        <div className="absolute top-28 right-[32%] w-1 h-1 rounded-full bg-[#FFEAA7]/50" />
        <div className="absolute top-8 left-[45%] w-1 h-1 rounded-full bg-[#FFEAA7]/50" />
        <div className="absolute top-10 right-[42%] w-1 h-1 rounded-full bg-[#FFEAA7]/50" />

        {/* Subtle Baobab Tree Silhouette on the right */}
        <svg
          viewBox="0 0 600 600"
          className="absolute right-[-40px] sm:right-[5%] bottom-[-50px] w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] opacity-15"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M300,600 C300,450 280,380 250,320 C180,310 120,280 80,220 C140,210 190,230 220,260 C210,180 180,130 130,80 C190,100 230,150 250,210 C270,120 290,70 320,20 C340,80 340,150 330,210 C370,140 430,100 480,80 C440,140 410,190 390,260 C430,230 480,220 530,220 C490,280 430,310 360,320 C340,380 320,450 320,600 Z" />
        </svg>

        {/* Gentle Horizon Line */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-5">
        {/* Eyebrow matching prototype */}
        <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#E0AB3A] font-semibold">
          A home for Gambian storytelling
        </div>

        {/* Editorial Headline matching prototype */}
        <h1 className="font-story-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
          This is a place where stories are told.
        </h1>

        {/* Atmospheric Introduction matching prototype */}
        <p className="text-base sm:text-lg text-[#CBBCAE] max-w-2xl leading-relaxed font-light">
          Folktales, legends, and fables from the Gambia and Senegambia — narrated, illustrated, and brought to life.
        </p>

        {/* Actions matching prototype */}
        <div className="pt-3 flex flex-wrap items-center gap-3.5">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E0AB3A] hover:bg-[#D99B26] text-[#1A1614] text-sm font-semibold transition-all shadow-md cursor-pointer"
          >
            <span>Explore Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={lastReadStorySlug ? `/stories/${lastReadStorySlug}` : "/stories/the-clever-hare-and-the-great-drought"}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white text-sm font-medium transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Continue Reading</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
