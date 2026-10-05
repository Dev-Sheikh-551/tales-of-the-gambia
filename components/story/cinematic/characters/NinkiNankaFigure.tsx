"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface NinkiNankaFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function NinkiNankaFigure({
  action = "reveal",
  facing = "left",
  scale = 1,
  isPaused = false,
  className = "",
}: NinkiNankaFigureProps) {
  const isFlipped = facing === "right";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_12px_32px_rgba(20,90,75,0.7)] ${className}`}
    >
      <svg
        viewBox="0 0 320 220"
        className="w-64 h-44 sm:w-80 sm:h-56 md:w-96 md:h-64 overflow-visible"
      >
        <defs>
          <linearGradient id="ninkiSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2CD5A5" />
            <stop offset="35%" stopColor="#1B8A6E" />
            <stop offset="70%" stopColor="#105746" />
            <stop offset="100%" stopColor="#082E25" />
          </linearGradient>
          <radialGradient id="jadeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#36E5B6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#1D9977" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0C4537" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Jade Aura Water Disturbance Halo */}
        <motion.ellipse
          cx="160"
          cy="185"
          rx="140"
          ry="25"
          fill="url(#jadeGlow)"
          animate={isPaused ? {} : { scale: [0.95, 1.1, 0.95], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Serpentine Body Coils Under Water */}
        <motion.g
          animate={isPaused ? {} : { y: [-3, 3, -3], x: [-2, 2, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Back Coil */}
          <path
            d="M230,195 Q260,160 280,185 Q295,195 270,205 Z"
            fill="url(#ninkiSkin)"
            opacity="0.8"
          />
          {/* Midground Coil Arc */}
          <path
            d="M140,195 Q180,135 220,185 Q205,200 160,202 Z"
            fill="url(#ninkiSkin)"
          />
          {/* Dorsal Crest Spine Fin */}
          <path
            d="M170,145 L178,135 L182,148 L192,140 L195,155"
            stroke="#5FF0C8"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* Massive Dragon-Serpent Head & Rising Neck */}
        <motion.g
          animate={
            isPaused
              ? {}
              : action === "rise"
              ? { y: [15, -12, 0], rotate: [-2, 2, 0] }
              : { y: [-4, 4, -4], rotate: [-1, 1.5, -1] }
          }
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "90px 170px" }}
        >
          {/* Rising Neck Segment */}
          <path
            d="M65,195 Q75,130 95,95 Q125,100 115,195 Z"
            fill="url(#ninkiSkin)"
          />

          {/* Dragon-Serpent Crest / Horns */}
          <path
            d="M95,85 Q115,45 145,40 Q130,65 118,85 Z"
            fill="#126853"
            stroke="#47E0B7"
            strokeWidth="2"
          />
          <path
            d="M90,80 Q105,50 128,52 Q115,70 108,82 Z"
            fill="#32B58F"
            opacity="0.8"
          />

          {/* Majestic Head Profile */}
          <path
            d="M45,95 Q75,80 115,90 Q120,120 85,125 Q50,120 45,95 Z"
            fill="url(#ninkiSkin)"
            stroke="#126853"
            strokeWidth="2"
          />

          {/* Glowing Jade Eyes (The legendary mesmerising gaze) */}
          <ellipse cx="72" cy="98" rx="6.5" ry="4.5" fill="#5FF0C8" />
          <circle cx="73" cy="98" r="2.2" fill="#FFFFFF" />
          {/* Eye Flare Pulse */}
          <motion.circle
            cx="72"
            cy="98"
            r="10"
            fill="#5FF0C8"
            opacity="0.4"
            animate={isPaused ? {} : { scale: [0.8, 1.4, 0.8], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Whispering Mist Tendrils Curling from Snout */}
          <motion.path
            d="M40,105 Q20,100 8,110 Q-5,115 -18,108"
            stroke="#8DF6D8"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            animate={isPaused ? {} : { pathLength: [0.3, 1, 0.3], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* River Water Surface Cut-off Waves */}
        <path
          d="M10,192 Q50,185 90,192 Q130,198 170,192 Q210,185 250,192 Q290,198 320,192 L320,220 L10,220 Z"
          fill="#0B2328"
          opacity="0.8"
        />
        <path
          d="M15,190 Q90,183 170,190 Q250,197 315,190"
          stroke="#47E0B7"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
}
