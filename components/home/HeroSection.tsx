"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[68vh] flex items-center justify-center overflow-hidden pt-12 pb-16">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm Ochre Glow from Top Center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#D9732B]/10 via-[#E0AB3A]/5 to-transparent blur-3xl rounded-full" />
        {/* River Gambia Deep Water Glow */}
        <div className="absolute -bottom-20 right-0 w-[450px] h-[450px] bg-[#264A51]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Editorial Headline */}
        <h1 className="font-story-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F7F3EB] leading-[1.12]">
          Stories carried through{" "}
          <span className="italic font-normal bg-gradient-to-r from-[#F2C765] via-[#E0AB3A] to-[#D9732B] bg-clip-text text-transparent">
            generations.
          </span>
        </h1>

        {/* Short Atmospheric Introduction */}
        <p className="text-base sm:text-xl text-[#CBBCAE] max-w-2xl mx-auto leading-relaxed font-light">
          A digital home for the folktales, fables, historical narratives, and river
          legends of The Gambia — preserved with the reverence of the oral tradition.
        </p>

        {/* Clean Primary Action */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D9732B] to-[#C69224] text-white text-sm font-semibold shadow-lg shadow-[#D9732B]/20 hover:opacity-95 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore the Stories</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
