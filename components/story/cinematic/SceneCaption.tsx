"use client";

import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NarratedStoryText } from "../NarratedStoryText";
import { getStorySceneCues } from "@/data/audio/cues";
import { NarrationCue } from "@/types/story";

interface SceneCaptionProps {
  sceneId: string;
  title: string;
  text: string;
  narration?: string;
  sceneNumber: number;
  totalScenes: number;
  storySlug?: string;
  currentTime?: number;
  hasAudio?: boolean;
  isPaused?: boolean;
  cues?: NarrationCue[];
}

export function SceneCaption({
  sceneId,
  title,
  text,
  narration,
  sceneNumber,
  totalScenes,
  storySlug,
  currentTime = 0,
  hasAudio = false,
  isPaused = false,
  cues: explicitCues,
}: SceneCaptionProps) {
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset scroll to top whenever scene changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [sceneId]);

  const cues = explicitCues || (storySlug ? getStorySceneCues(storySlug, sceneNumber) : undefined);

  const content = (
    <div className="max-w-xl lg:max-w-2xl mx-auto px-3 sm:px-6 pointer-events-auto">
      <div className="rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 p-3.5 sm:p-5 shadow-2xl space-y-2 sm:space-y-2.5 select-text">
        {/* Minimal Scene Header & Cue Status */}
        <div className="flex items-center justify-between text-[11px] text-[#AB9784] font-mono select-none">
          <span className="text-[#E0AB3A] font-medium truncate max-w-[75%]">
            Scene {sceneNumber} of {totalScenes} · {title}
          </span>
          {hasAudio && (
            <span className="text-[10px] text-[#D9732B] font-mono shrink-0 flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPaused ? "bg-[#AB9784]" : "bg-[#E0AB3A] animate-pulse"
                }`}
              />
              <span>{isPaused ? "Audio Paused" : "Audio Synced"}</span>
            </span>
          )}
        </div>

        {/* Narrative Spoken Cue (full text, no line-clamp) */}
        {narration && (
          <p className="text-xs italic text-[#F2C765]/90 font-story-serif leading-snug">
            &ldquo;{narration}&rdquo;
          </p>
        )}

        {/* Scrollable Narrative Text Container — Entire Scene Accessible & Auto-Synchronized */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          role="region"
          aria-label="Scene narration text"
          className="max-h-[20vh] sm:max-h-[22vh] md:max-h-[25vh] lg:max-h-[28vh] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E0AB3A]/40 rounded-lg overscroll-contain select-text"
        >
          <NarratedStoryText
            text={text}
            cues={cues}
            currentTime={currentTime}
            hasAudio={hasAudio}
            className="font-story-serif text-sm sm:text-base text-[#F7F3EB] leading-relaxed whitespace-pre-line select-text"
            enableAutoScroll={true}
            containerRef={scrollContainerRef}
          />
        </div>
      </div>
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-0 right-0 z-30 pointer-events-none">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      key={sceneId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.45, ease: [0.0, 0.0, 0.2, 1.0] }}
      className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-0 right-0 z-30 pointer-events-none"
    >
      {content}
    </motion.div>
  );
}
