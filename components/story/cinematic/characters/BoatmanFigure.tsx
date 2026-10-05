"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface BoatmanFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function BoatmanFigure({
  action = "paddle",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: BoatmanFigureProps) {
  const isFlipped = facing === "left";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg
        viewBox="0 0 240 180"
        className="w-48 h-36 sm:w-60 sm:h-44 md:w-72 md:h-52 overflow-visible"
      >
        <defs>
          <linearGradient id="canoeWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A2E18" />
            <stop offset="50%" stopColor="#6E4424" />
            <stop offset="100%" stopColor="#3B2211" />
          </linearGradient>
          <linearGradient id="sambaRobe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A6B7C" />
            <stop offset="100%" stopColor="#153E49" />
          </linearGradient>
        </defs>

        {/* Canoe Gentle Water Bobbing */}
        <motion.g
          animate={isPaused ? {} : { y: [-3, 3, -3], rotate: [-0.8, 0.8, -0.8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 140px" }}
        >
          {/* Water Wake / Ripples at Pirogue Hull */}
          <ellipse cx="120" cy="155" rx="90" ry="8" fill="#1C4B56" opacity="0.4" />
          <ellipse cx="120" cy="157" rx="70" ry="5" fill="#3AA8C1" opacity="0.3" />

          {/* Carved Wooden Pirogue Boat */}
          <path
            d="M15,135 Q120,165 225,135 Q210,150 120,158 Q30,150 15,135 Z"
            fill="url(#canoeWood)"
            stroke="#2B170B"
            strokeWidth="2.5"
          />
          {/* Canoe Rim Interior Shadow */}
          <path
            d="M20,135 Q120,155 220,135 Q120,146 20,135 Z"
            fill="#2A170B"
            opacity="0.85"
          />

          {/* Seated Samba Figure */}
          <g transform="translate(100, 50)">
            {/* Tunic / Torso */}
            <path
              d="M10,45 L32,45 L36,85 L8,85 Z"
              fill="url(#sambaRobe)"
              stroke="#0E2B33"
              strokeWidth="1.5"
            />
            {/* Fisher Belt / Sash */}
            <rect x="9" y="65" width="25" height="5" fill="#E5A93C" />

            {/* Neck & Head */}
            <circle cx="21" cy="30" r="11" fill="#7A4B27" />
            {/* Facial profile */}
            <ellipse cx="27" cy="30" rx="3.5" ry="3.5" fill="#7A4B27" />
            <ellipse cx="25" cy="28" rx="2" ry="1.5" fill="#1A0D05" />

            {/* Conical Woven Straw Hat */}
            <polygon points="21,5 2,22 40,22" fill="#E5C16C" stroke="#A68233" strokeWidth="1.5" />
            <ellipse cx="21" cy="22" rx="20" ry="3" fill="#C49F44" />
          </g>

          {/* Wooden Paddle & Arms Group */}
          <motion.g
            animate={
              isPaused
                ? {}
                : action === "paddle"
                ? {
                    rotate: [-15, 20, -15],
                    y: [0, 8, 0],
                  }
                : action === "reach"
                ? { rotate: 25, y: 15 } // Releasing the fish back
                : { rotate: 0, y: -4 } // Paused in awe
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "125px 95px" }}
          >
            {/* Arms */}
            <path
              d="M115,92 L135,102 L148,94"
              stroke="url(#sambaRobe)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Paddle Shaft */}
            <line x1="165" y1="65" x2="115" y2="168" stroke="#A87544" strokeWidth="4" strokeLinecap="round" />
            {/* Paddle Blade (dips into river) */}
            <path
              d="M120,140 Q105,175 110,175 Q125,170 128,142 Z"
              fill="#82572D"
              stroke="#543315"
              strokeWidth="1.5"
            />
          </motion.g>
        </motion.g>
      </svg>
    </motion.div>
  );
}
