"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface GriotFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function GriotFigure({
  action = "pluck-kora",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: GriotFigureProps) {
  const isFlipped = facing === "left";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_12px_28px_rgba(180,110,30,0.5)] ${className}`}
    >
      <svg
        viewBox="0 0 240 240"
        className="w-52 h-52 sm:w-64 sm:h-64 md:w-76 md:h-76 overflow-visible"
      >
        <defs>
          <linearGradient id="griotBoubou" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5A93C" />
            <stop offset="50%" stopColor="#C47D1C" />
            <stop offset="100%" stopColor="#7A4205" />
          </linearGradient>
          <radialGradient id="koraCalabash" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E88B35" />
            <stop offset="60%" stopColor="#B85914" />
            <stop offset="100%" stopColor="#5E2A03" />
          </radialGradient>
        </defs>

        {/* Melodic Acoustic Soundwaves (radiating from kora gourd) */}
        {!isPaused && (
          <g transform="translate(135, 160)">
            <motion.circle
              cx="0"
              cy="0"
              r="40"
              stroke="#F2C765"
              strokeWidth="1.5"
              fill="none"
              style={{ transformOrigin: "0px 0px" }}
              animate={{ scale: [0.5, 1.4], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="35"
              stroke="#E0AB3A"
              strokeWidth="1.5"
              fill="none"
              style={{ transformOrigin: "0px 0px" }}
              animate={{ scale: [0.4, 1.3], opacity: [0.8, 0] }}
              transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, ease: "easeOut" }}
            />
          </g>
        )}

        {/* Seated Body / Grand Boubou Robe */}
        <motion.g
          animate={isPaused ? {} : { rotate: [-1.2, 1.2, -1.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "90px 180px" }}
        >
          {/* Seated Base Fold */}
          <path
            d="M30,215 Q90,195 160,215 Q140,230 45,230 Z"
            fill="#5E2A03"
          />
          {/* Grand Boubou Robe Silhouette */}
          <path
            d="M45,130 Q90,110 135,130 L160,215 Q90,225 30,215 Z"
            fill="url(#griotBoubou)"
            stroke="#5E2A03"
            strokeWidth="2"
          />
          {/* Gold Embroidery Neckline */}
          <path
            d="M75,120 Q90,135 105,120 L108,145 Q90,160 72,145 Z"
            fill="#FBE29D"
            stroke="#C47D1C"
            strokeWidth="1.5"
          />

          {/* Griot Head & Mandinka Kufi Cap */}
          <g transform="translate(90, 85)">
            {/* Neck */}
            <rect x="-8" y="15" width="16" height="20" fill="#7A4205" />
            {/* Head */}
            <ellipse cx="0" cy="8" rx="15" ry="17" fill="#7A4205" />
            {/* Beard & Jaw */}
            <path d="M-12,12 Q0,30 12,12 Z" fill="#241406" />
            {/* Facial profile */}
            <circle cx="6" cy="6" r="2.5" fill="#241406" />
            <circle cx="7" cy="5.5" r="0.9" fill="#FFFFFF" />

            {/* Embroidered Kufi Hat */}
            <path
              d="M-16,4 Q0,-14 16,4 L14,-6 Q0,-18 -14,-6 Z"
              fill="#F2C765"
              stroke="#B85914"
              strokeWidth="1.5"
            />
          </g>
        </motion.g>

        {/* 21-String Kora & Plucking Hands */}
        <g transform="translate(130, 90)">
          {/* Hardwood Neck Pole */}
          <line x1="0" y1="-70" x2="10" y2="120" stroke="#4A2606" strokeWidth="6" strokeLinecap="round" />
          {/* Tuning Rings (Konso) at Top */}
          <rect x="-4" y="-60" width="8" height="25" rx="3" fill="#D9732B" stroke="#241406" strokeWidth="1" />

          {/* Large Calabash Gourd Resonator (Covered with cowhide) */}
          <ellipse cx="8" cy="85" rx="36" ry="34" fill="url(#koraCalabash)" stroke="#241406" strokeWidth="2.5" />
          {/* Decorative Brass Studs */}
          <circle cx="-15" cy="80" r="2.5" fill="#F2C765" />
          <circle cx="0" cy="65" r="2.5" fill="#F2C765" />
          <circle cx="20" cy="72" r="2.5" fill="#F2C765" />
          <circle cx="30" cy="90" r="2.5" fill="#F2C765" />

          {/* Rosewood Bridge */}
          <polygon points="5,60 12,60 10,85 7,85" fill="#241406" />

          {/* The 21 Resonant Strings (Fine silver lines) */}
          <g stroke="#F7F3EB" strokeWidth="1" opacity="0.85">
            <line x1="0" y1="-45" x2="8" y2="60" />
            <line x1="1" y1="-35" x2="9" y2="62" />
            <line x1="2" y1="-25" x2="10" y2="64" />
            <line x1="3" y1="-15" x2="11" y2="66" />
            <line x1="-1" y1="-40" x2="7" y2="61" />
            <line x1="-2" y1="-30" x2="6" y2="63" />
          </g>

          {/* Griot's Plucking Hands (Active musical animation) */}
          <motion.g
            animate={
              isPaused
                ? {}
                : {
                    x: [-2, 3, -1, 2, -2],
                    y: [0, -2, 1, -1, 0],
                  }
            }
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Handholding Handposts & Plucking Strings with Thumb/Index */}
            <circle cx="0" cy="52" r="6" fill="#7A4205" />
            <line x1="-3" y1="50" x2="7" y2="55" stroke="#7A4205" strokeWidth="3" strokeLinecap="round" />
            <circle cx="16" cy="54" r="6" fill="#7A4205" />
            <line x1="12" y1="52" x2="22" y2="56" stroke="#7A4205" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}
