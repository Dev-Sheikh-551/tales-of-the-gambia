"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface HyenaFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function HyenaFigure({
  action = "stand",
  facing = "left",
  scale = 1,
  isPaused = false,
  className = "",
}: HyenaFigureProps) {
  const isFlipped = facing === "right";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] ${className}`}
    >
      <svg
        viewBox="0 0 200 160"
        className="w-36 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 overflow-visible"
      >
        {/* Ground shadow */}
        <ellipse cx="95" cy="148" rx="70" ry="12" fill="rgba(0,0,0,0.4)" />

        {/* 4 Straight Legs */}
        {/* Back Legs */}
        <rect x="48" y="98" width="12" height="46" rx="4" fill="#8C5528" />
        <rect x="124" y="98" width="12" height="46" rx="4" fill="#8C5528" />

        {/* Front Legs */}
        <rect x="64" y="102" width="12" height="44" rx="4" fill="#75431C" />
        <rect x="140" y="102" width="12" height="44" rx="4" fill="#75431C" />

        {/* Tail pointing up and curved */}
        <path
          d="M150,90 C165,85 178,75 175,60 C170,58 160,70 148,82 Z"
          fill="#C4A47C"
        />

        {/* Hyena Body - Rounded back, sturdy belly */}
        <ellipse cx="100" cy="85" rx="55" ry="32" fill="#C4A47C" />

        {/* Jagged Dorsal Spikes / Mane on Back */}
        <path
          d="M75,60 L85,45 L95,60 L105,45 L115,60 L125,48 L135,62 Z"
          fill="#2C241E"
        />

        {/* Hyena Spots */}
        <circle cx="85" cy="80" r="4.5" fill="#8C6B46" opacity="0.8" />
        <circle cx="115" cy="82" r="5" fill="#8C6B46" opacity="0.8" />
        <circle cx="100" cy="94" r="4" fill="#8C6B46" opacity="0.8" />
        <circle cx="130" cy="90" r="3.5" fill="#8C6B46" opacity="0.8" />
        <circle cx="70" cy="90" r="4" fill="#8C6B46" opacity="0.8" />

        {/* Neck & Head pointing left */}
        <path
          d="M60,85 L35,60 L48,50 L75,70 Z"
          fill="#C4A47C"
        />

        {/* Head triangle / snout */}
        <path
          d="M48,50 L18,72 L45,82 Z"
          fill="#C4A47C"
        />

        {/* Ears */}
        <polygon points="44,52 48,32 58,48" fill="#A87B4F" />

        {/* Nose Tip */}
        <polygon points="18,72 23,69 22,76" fill="#1A1410" />

        {/* Eye */}
        <circle cx="38" cy="62" r="3" fill="#1A1410" />
      </svg>
    </motion.div>
  );
}
