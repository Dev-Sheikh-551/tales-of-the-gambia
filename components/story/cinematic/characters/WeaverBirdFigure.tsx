"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface WeaverBirdFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * WeaverBirdFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Golden Palm and the Orphan Boy" (The Golden Weaver Bird)
 *
 * Species & Anatomical traits:
 *   - Gambian savanna Village Weaver (Ploceus cucullatus)
 *   - Rich golden-yellow chest, crown, and belly plumage
 *   - Distinctive dark chestnut-black face mask across the lores and throat
 *   - Alert red-amber avian eye with bright specular gleam
 *   - Strong conical seed-cracking beak (dark horn color)
 *   - Detailed wing coverts with olive-brown scalloped feather edges
 *   - Slender pinkish-tan perching toes gripping a thorny acacia sprig
 *   - Framer Motion actions: perching & tail flick, wing flutter/hover, singing/fluttering
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function WeaverBirdFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: WeaverBirdFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  const isSinging =
    action === "gesture" ||
    action === "singing" ||
    action === "react" ||
    action === "joy";

  const isFlying =
    action === "walk" ||
    action === "approach" ||
    action === "jump" ||
    action === "reach";

  // Body bob / hover animation
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isFlying) {
      return {
        y: [-12, 4, -12],
        rotate: [-3, 3, -3],
        transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isSinging) {
      return {
        y: [0, -4, 0],
        rotate: [0, -2, 0],
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Perched idle breath
    return {
      y: [0, -2, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Wing flap animation
  const getWingAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isFlying) {
      return {
        rotate: [-18, 12, -18],
        scaleY: [0.85, 1.05, 0.85],
        transition: { duration: 0.35, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isSinging) {
      return {
        rotate: [0, 6, 0],
        transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [0, 1.5, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Tail flick animation
  const getTailAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    return {
      rotate: [-3, 5, -3],
      transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/*
        ViewBox: 170 wide × 140 tall
        Scaled appropriately for a small bird on the story stage
      */}
      <svg
        viewBox="0 0 170 140"
        className="w-36 h-32 sm:w-44 sm:h-38 md:w-52 md:h-44 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Golden plumage gradient */}
          <linearGradient id={`goldFeathers_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDE43" />
            <stop offset="45%" stopColor="#F5B800" />
            <stop offset="100%" stopColor="#C97F00" />
          </linearGradient>

          {/* Wing mantle & coverts */}
          <linearGradient id={`weaverWing_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6E5014" />
            <stop offset="60%" stopColor="#4A3408" />
            <stop offset="100%" stopColor="#2A1C03" />
          </linearGradient>

          {/* Mask & beak */}
          <linearGradient id={`weaverMask_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#382212" />
            <stop offset="100%" stopColor="#1A0D05" />
          </linearGradient>
        </defs>

        {/* ── ACACIA PERCH BRANCH ── */}
        <g id="perchBranch">
          {/* Main thorny twig */}
          <path
            d="M 12 122 Q 60 114 110 118 T 162 120"
            stroke="#543D28"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Acacia thorns */}
          <path d="M 45 116 L 41 106" stroke="#C49B66" strokeWidth="2" strokeLinecap="round" />
          <path d="M 130 119 L 134 110" stroke="#C49B66" strokeWidth="2" strokeLinecap="round" />
          {/* Fresh acacia leaflets */}
          <ellipse cx="32" cy="116" rx="4" ry="2" fill="#588142" transform="rotate(-25 32 116)" />
          <ellipse cx="36" cy="113" rx="4" ry="2" fill="#6A9E4E" transform="rotate(-40 36 113)" />
          <ellipse cx="145" cy="120" rx="4" ry="2" fill="#588142" transform="rotate(20 145 120)" />
        </g>

        {/* ── TAIL FEATHERS ── */}
        <motion.g
          id="tail"
          animate={getTailAnimation()}
          style={{ originX: "50px", originY: "88px" }}
        >
          <path
            d="M 50 82 L 15 106 L 22 113 L 56 94 Z"
            fill="#B87807"
          />
          <path
            d="M 48 84 L 18 108 L 24 114 L 54 94 Z"
            fill="#3B2606"
            opacity="0.6"
          />
        </motion.g>

        {/* ── ROUND GOLDEN BODY & BELLY ── */}
        <g id="birdBody">
          {/* Main golden chest and torso */}
          <path
            d="M 60 48 Q 42 70 54 98 Q 72 114 100 102 Q 118 90 114 62 Q 106 42 80 44 Z"
            fill={`url(#goldFeathers_${uid})`}
          />
          {/* Subtle breast feather texture marks */}
          <path d="M 76 68 Q 82 72 88 68" stroke="#D48800" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 84 76 Q 90 80 96 76" stroke="#D48800" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 72 80 Q 78 84 84 80" stroke="#D48800" strokeWidth="1.2" fill="none" opacity="0.6" />
        </g>

        {/* ── PERCHING CLAWS ── */}
        <g id="claws">
          <path
            d="M 78 102 L 76 116 M 75 116 L 70 118 M 76 116 L 78 120 M 77 116 L 82 118"
            stroke="#D6A56E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 94 100 L 92 114 M 91 114 L 86 116 M 92 114 L 94 118 M 93 114 L 98 116"
            stroke="#D6A56E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* ── FOLDED / FLUTTERING WING ── */}
        <motion.g
          id="wing"
          animate={getWingAnimation()}
          style={{ originX: "68px", originY: "56px" }}
        >
          {/* Wing mantle */}
          <path
            d="M 64 54 Q 50 78 38 98 Q 54 104 74 94 Q 92 78 88 56 Z"
            fill={`url(#weaverWing_${uid})`}
          />
          {/* Wing covert feather scalloping */}
          <path
            d="M 68 62 Q 76 70 64 78"
            stroke="#FFD53D"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 58 70 Q 66 78 54 86"
            stroke="#FFD53D"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 48 78 Q 56 86 44 94"
            stroke="#FFD53D"
            strokeWidth="2"
            fill="none"
          />
          {/* Golden flight feather tips */}
          <path
            d="M 38 98 L 44 102 L 56 97 L 66 93"
            stroke="#FFB800"
            strokeWidth="1.8"
            fill="none"
          />
        </motion.g>

        {/* ── HEAD, BLACK MASK & BEAK ── */}
        <g id="birdHead">
          {/* Golden crown and nape */}
          <path
            d="M 80 44 Q 92 30 110 32 Q 124 36 126 50 Q 124 64 108 64 Z"
            fill={`url(#goldFeathers_${uid})`}
          />

          {/* Mask: Chestnut-black throat, lores, and ear coverts */}
          <path
            d="M 104 38 Q 116 38 122 46 Q 124 58 114 62 Q 102 64 96 56 Q 96 46 104 38 Z"
            fill={`url(#weaverMask_${uid})`}
          />

          {/* Conical Seed Beak */}
          {isSinging ? (
            /* Beak open in crystal song */
            <g id="openBeak">
              <path d="M 120 44 L 142 42 L 122 48 Z" fill="#24190E" />
              <path d="M 121 49 L 138 54 L 120 52 Z" fill="#24190E" />
              {/* Pink tongue tip */}
              <path d="M 124 48 L 130 48.5 L 124 49.5 Z" fill="#E67373" />
            </g>
          ) : (
            /* Closed sturdy conical seed beak */
            <path
              d="M 120 42 L 140 47 L 118 52 Z"
              fill="#24190E"
            />
          )}

          {/* Keen Amber Eye */}
          <circle cx="111" cy="46" r="3.2" fill="#C93B12" />
          <circle cx="111" cy="46" r="1.8" fill="#140803" />
          <circle cx="112" cy="45" r="0.9" fill="#FFFFFF" />
        </g>

        {/* ── CELESTIAL BLESSING SPARKLES (When singing / magic palm guide) ── */}
        {isSinging && (
          <g id="songSparkles">
            <circle cx="148" cy="36" r="2" fill="#FFE27A" opacity="0.85" />
            <circle cx="156" cy="42" r="1.5" fill="#FFE27A" opacity="0.75" />
            <circle cx="144" cy="24" r="1.2" fill="#FFE27A" opacity="0.65" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
