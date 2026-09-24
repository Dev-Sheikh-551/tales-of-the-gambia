"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { NarrationCue } from "@/types/story";
import { findActiveCueIndex } from "@/data/audio/cues";

interface NarratedStoryTextProps {
  /** The canonical text of the scene */
  text: string;
  /** Optional array of chronological narration cues */
  cues?: NarrationCue[];
  /** Current playback time in seconds from HTML5 audio */
  currentTime: number;
  /** Whether narration audio is expected for this scene */
  hasAudio: boolean;
  /** Additional wrapper CSS classes */
  className?: string;
  /** Whether gentle auto-scroll is enabled */
  enableAutoScroll?: boolean;
}

interface TextSegment {
  key: string;
  text: string;
  isCue: boolean;
  cueIndex?: number;
}

export function NarratedStoryText({
  text,
  cues,
  currentTime,
  hasAudio,
  className = "",
  enableAutoScroll = false,
}: NarratedStoryTextProps) {
  const activeCueRef = useRef<HTMLSpanElement | null>(null);

  // Determine active cue index using binary search
  const activeIndex = useMemo(() => {
    if (!hasAudio || !cues || cues.length === 0) return -1;
    return findActiveCueIndex(cues, currentTime);
  }, [cues, currentTime, hasAudio]);

  // Gentle auto-scroll when active cue is outside comfortable reading area
  useEffect(() => {
    if (!enableAutoScroll || activeIndex === -1 || !activeCueRef.current) return;
    if (typeof window === "undefined") return;

    const el = activeCueRef.current;
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Only scroll if text is cut off near the top or bottom of the viewport
    const isAbove = rect.top < viewportHeight * 0.15;
    const isBelow = rect.bottom > viewportHeight * 0.85;

    if (isAbove || isBelow) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  }, [activeIndex, enableAutoScroll]);

  // Fallback: if no cues available, render canonical text with zero overhead
  if (!cues || cues.length === 0) {
    return <p className={className}>{text}</p>;
  }

  // Segment canonical text into cue and non-cue chunks to preserve exact spacing & punctuation
  const segments: TextSegment[] = [];
  let currentPos = 0;

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    const cueStart =
      cue.charStart !== undefined
        ? cue.charStart
        : text.indexOf(cue.text, currentPos);

    if (cueStart === -1) {
      // In case of mismatch, skip offset tracking
      continue;
    }

    const cueEnd =
      cue.charEnd !== undefined ? cue.charEnd : cueStart + cue.text.length;

    // Preceding non-cue text (e.g. whitespace, punctuation, quotes)
    if (cueStart > currentPos) {
      segments.push({
        key: `gap-${currentPos}`,
        text: text.slice(currentPos, cueStart),
        isCue: false,
      });
    }

    // Cue segment
    segments.push({
      key: `cue-${cue.index}`,
      text: text.slice(cueStart, cueEnd),
      isCue: true,
      cueIndex: cue.index,
    });

    currentPos = cueEnd;
  }

  // Trailing text after last cue
  if (currentPos < text.length) {
    segments.push({
      key: `gap-${currentPos}`,
      text: text.slice(currentPos),
      isCue: false,
    });
  }

  return (
    <p className={className}>
      {segments.map((seg) => {
        if (!seg.isCue || seg.cueIndex === undefined) {
          return <React.Fragment key={seg.key}>{seg.text}</React.Fragment>;
        }

        const isActive = activeIndex === seg.cueIndex;

        return (
          <span
            key={seg.key}
            ref={isActive ? activeCueRef : undefined}
            data-active-cue={isActive ? "true" : undefined}
            className={`transition-colors duration-200 rounded-md box-decoration-clone ${
              isActive
                ? "bg-[#D9732B]/20 text-[#F2C765] shadow-[0_0_12px_rgba(217,115,43,0.15)] px-1 py-0.5"
                : "text-inherit"
            }`}
          >
            {seg.text}
          </span>
        );
      })}
    </p>
  );
}
