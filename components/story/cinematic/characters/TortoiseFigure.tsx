"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface TortoiseFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function TortoiseFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: TortoiseFigureProps) {
  const isFlipped = facing === "left";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)] ${className}`}
    >
      <svg
        viewBox="0 0 200 140"
        className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-40 overflow-visible"
      >
        <defs>
          <linearGradient id="tortoiseShell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C8F54" />
            <stop offset="50%" stopColor="#4D6B3C" />
            <stop offset="100%" stopColor="#304424" />
          </linearGradient>
          <linearGradient id="tortoiseSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8BAA70" />
            <stop offset="100%" stopColor="#5E7548" />
          </linearGradient>
        </defs>

        {/* Back Feet */}
        <motion.ellipse
          cx="45"
          cy="115"
          rx="18"
          ry="11"
          fill="#445533"
          animate={action === "step" || action === "walk" ? { x: [-3, 5, -3] } : {}}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Forefeet */}
        <motion.ellipse
          cx="125"
          cy="115"
          rx="18"
          ry="11"
          fill="url(#tortoiseSkin)"
          animate={action === "step" || action === "walk" ? { x: [4, -4, 4] } : {}}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neck and Head */}
        <motion.g
          animate={
            isPaused
              ? {}
              : action === "step" || action === "walk"
              ? { x: [0, 8, 0], y: [0, -3, 0] }
              : action === "joy"
              ? { y: -8, rotate: -6 }
              : { x: [0, 3, 0] }
          }
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "135px 85px" }}
        >
          {/* Wrinkled Neck */}
          <path d="M125,85 Q150,75 160,80 L158,100 Q135,102 125,95 Z" fill="url(#tortoiseSkin)" />
          {/* Head */}
          <ellipse cx="165" cy="78" rx="16" ry="12" fill="url(#tortoiseSkin)" />
          {/* Wise Eye */}
          <circle cx="168" cy="74" r="3.5" fill="#241406" />
          <circle cx="169" cy="73" r="1.2" fill="#FFFFFF" />
          {/* Beak / Mouth */}
          <path d="M172,83 Q178,85 180,82" stroke="#3D4D2E" strokeWidth="2" fill="none" />
        </motion.g>

        {/* Dome Carapace Shell */}
        <path
          d="M25,105 C20,45 80,30 110,30 C135,30 150,55 145,105 Z"
          fill="url(#tortoiseShell)"
          stroke="#2A381E"
          strokeWidth="3"
        />

        {/* Mandinka Geometric Carapace Plates */}
        <g stroke="#97BA7A" strokeWidth="1.8" opacity="0.8" fill="none">
          <polygon points="80,42 98,52 98,72 80,82 62,72 62,52" />
          <polygon points="115,50 130,58 130,75 115,83 100,75 100,58" />
          <polygon points="48,55 60,62 60,78 48,85 36,78 36,62" />
          <line x1="80" y1="42" x2="80" y2="30" />
          <line x1="115" y1="50" x2="125" y2="34" />
          <line x1="80" y1="82" x2="80" y2="105" />
          <line x1="98" y1="72" x2="115" y2="83" />
        </g>

        {/* Damp River Silt on Shell (when in labor action) */}
        {action === "labor" && (
          <path
            d="M50,45 Q85,35 120,48 Q100,60 60,56 Z"
            fill="#38291A"
            opacity="0.85"
          />
        )}
      </svg>
    </motion.div>
  );
}
