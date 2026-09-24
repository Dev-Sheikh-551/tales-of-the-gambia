"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NarratedStoryText } from "../NarratedStoryText";
import { getStorySceneCues } from "@/data/audio/cues";

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
}: SceneCaptionProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="rounded-xl bg-black/75 backdrop-blur-md border border-white/10 p-4 sm:p-5 shadow-xl space-y-2 select-text">
        {/* Minimal Scene Header & Spoken Cue */}
        <div className="flex items-center justify-between text-[11px] text-[#AB9784] font-mono select-none">
          <span className="text-[#E0AB3A] font-medium">
            Scene {sceneNumber} of {totalScenes} · {title}
          </span>
        </div>

        {/* Narrative Spoken Cue */}
        {narration && (
          <p className="text-xs italic text-[#F2C765]/90 font-story-serif line-clamp-1">
            &ldquo;{narration}&rdquo;
          </p>
        )}

        {/* Narrative Text */}
        <NarratedStoryText
          text={text}
          cues={storySlug ? getStorySceneCues(storySlug, sceneNumber) : undefined}
          currentTime={currentTime}
          hasAudio={hasAudio}
          className="font-story-serif text-sm sm:text-base text-[#F7F3EB] leading-relaxed line-clamp-3 sm:line-clamp-4"
        />
      </div>
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-30 pointer-events-auto">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      key={sceneId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-30 pointer-events-auto"
    >
      {content}
    </motion.div>
  );
}
