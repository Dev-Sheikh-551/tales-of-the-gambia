import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#D9732B]/15 border border-[#D9732B]/30 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-[#E0AB3A]" />
        </div>

        <h1 className="font-story-serif text-3xl sm:text-4xl text-[#F7F3EB]">
          The Path Has Faded
        </h1>

        <p className="text-sm text-[#AB9784] leading-relaxed">
          Like a footpath covered by the tall savanna grass after the rainy season, this story or
          page cannot be found.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#241F1A] hover:bg-[#2F2721] text-sm text-[#F7F3EB] border border-[#3E352E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D9732B]" />
            <span>Return to the Story Hearth</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
