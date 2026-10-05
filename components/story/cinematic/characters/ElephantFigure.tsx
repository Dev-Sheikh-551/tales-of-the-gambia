"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface ElephantFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function ElephantFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: ElephantFigureProps) {
  const isFlipped = facing === "left";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg
        viewBox="0 0 280 260"
        className="w-56 h-52 sm:w-72 sm:h-64 md:w-88 md:h-80 overflow-visible"
      >
        <defs>
          <linearGradient id="elephantSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C9184" />
            <stop offset="50%" stopColor="#7A6F62" />
            <stop offset="100%" stopColor="#574E43" />
          </linearGradient>
          <linearGradient id="tuskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="100%" stopColor="#E0D2B4" />
          </linearGradient>
        </defs>

        {/* Back Legs */}
        <rect x="55" y="160" width="34" height="85" rx="10" fill="#4A4237" />
        <rect x="175" y="160" width="36" height="85" rx="10" fill="#4A4237" />

        {/* Tail */}
        <motion.path
          d="M32,150 Q20,185 24,205"
          stroke="#4A4237"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{ rotate: [-4, 6, -4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "32px 150px" }}
        />

        {/* Massive Body Torso */}
        <path
          d="M40,160 C30,110 70,80 140,80 C200,80 230,110 230,165 C230,195 210,210 140,210 C70,210 45,195 40,160 Z"
          fill="url(#elephantSkin)"
        />

        {/* Front Pillars (Forelegs) */}
        <rect x="75" y="155" width="38" height="95" rx="12" fill="url(#elephantSkin)" />
        {/* Toenails */}
        <circle cx="85" cy="245" r="5" fill="#D9D2C5" opacity="0.8" />
        <circle cx="95" cy="245" r="5" fill="#D9D2C5" opacity="0.8" />
        <circle cx="105" cy="245" r="5" fill="#D9D2C5" opacity="0.8" />

        <rect x="155" y="155" width="40" height="95" rx="12" fill="url(#elephantSkin)" />
        <circle cx="165" cy="245" r="5" fill="#D9D2C5" opacity="0.8" />
        <circle cx="175" cy="245" r="5" fill="#D9D2C5" opacity="0.8" />
        <circle cx="185" cy="245" r="5" fill="#D9D2C5" opacity="0.8" />

        {/* Head & Ivory Tusks Group */}
        <g>
          {/* Head Dome */}
          <circle cx="215" cy="110" r="42" fill="url(#elephantSkin)" />

          {/* Majestic Ivory Tusk */}
          <path
            d="M230,135 Q265,150 280,125 Q265,138 232,126 Z"
            fill="url(#tuskGrad)"
            stroke="#CFC3A5"
            strokeWidth="1.5"
          />

          {/* Articulated Trunk */}
          <motion.path
            d={
              action === "triumphant" || action === "joy"
                ? "M235,120 Q265,90 275,50 Q265,45 250,75 Q240,105 220,130 Z" // Trumpeting high in victory!
                : action === "reach" || action === "gesture"
                ? "M235,120 Q270,160 260,205 Q250,210 245,175 Q240,140 220,130 Z" // Digging into well
                : "M235,120 Q260,150 248,185 Q238,190 238,160 Q238,135 220,130 Z" // Dignified elder curve
            }
            fill="url(#elephantSkin)"
            stroke="#574E43"
            strokeWidth="1"
            animate={
              isPaused
                ? {}
                : action === "triumphant"
                ? { rotate: [-4, 6, -4] }
                : action === "gesture"
                ? { rotate: [-6, 8, -6] }
                : { rotate: [-2, 3, -2] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "235px 120px" }}
          />

          {/* Wise Eye */}
          <ellipse cx="210" cy="100" rx="4.5" ry="3.5" fill="#241406" />
          <circle cx="212" cy="99" r="1.5" fill="#FFFFFF" />
          {/* Elder Wrinkles */}
          <path d="M200,94 Q212,90 222,94" stroke="#4A4237" strokeWidth="1.8" fill="none" />
          <path d="M202,107 Q212,112 222,108" stroke="#4A4237" strokeWidth="1.5" fill="none" />

          {/* Broad Fan Ear (Flaps gently with elder cadence) */}
          <motion.path
            d="M175,85 C145,75 145,145 175,155 C195,160 205,130 195,95 Z"
            fill="#877B6D"
            stroke="#574E43"
            strokeWidth="2"
            animate={
              isPaused
                ? {}
                : action === "gesture" || action === "triumphant"
                ? { scaleX: [1, 1.15, 1], rotate: [-2, 5, -2] }
                : { scaleX: [1, 1.08, 1] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "190px 105px" }}
          />
        </g>
      </svg>
    </motion.div>
  );
}
