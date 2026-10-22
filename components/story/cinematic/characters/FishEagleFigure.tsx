"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface FishEagleFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * FishEagleFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Birds' Parliament" (The Great Fish Eagle)
 *
 * Species & Anatomical traits:
 *   - African Fish Eagle (Haliaeetus vocifer) — apex avian master of the River Gambia
 *   - Striking contrast: snow-white head, mantle, and breast against deep rich chestnut-chocolate body
 *   - Large raptor curved beak: bright yellow cere with a sharp hooked dark gray/black tip
 *   - Fierce, piercing golden-amber raptor eye with dark brow
 *   - Massive muscular yellow talons gripping a weathered river driftwood log
 *   - Broad, formidable wings capable of spreading in dominance
 *   - Framer Motion actions: imposing breathing idle, spread-wing sky declaration, bowed head of wisdom
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function FishEagleFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: FishEagleFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  // Pose classification
  const isDominant =
    action === "gesture" ||
    action === "singing" ||
    action === "mock" ||
    action === "jump" ||
    action === "triumphant";

  const isBowing =
    action === "concern" ||
    action === "crouch" ||
    action === "still";

  const isWalking =
    action === "walk" ||
    action === "step" ||
    action === "approach";

  // Body animation
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isDominant) {
      return {
        y: [0, -6, 0],
        rotate: [-1, 2, -1],
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isWalking) {
      return {
        y: [0, -4, 0],
        rotate: [-1.5, 1.5, -1.5],
        transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Formidable respiratory expansion
    return {
      y: [0, -3, 0],
      transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Wing movement
  const getWingAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isDominant) {
      return {
        rotate: [-6, 10, -6],
        transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-1, 1.5, -1],
      transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Head posture
  const getHeadAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isBowing) {
      return {
        rotate: 14,
        y: 6,
        transition: { duration: 0.8, ease: "easeOut" as const },
      };
    }
    if (isDominant) {
      return {
        rotate: [-4, 6, -4],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-1, 2, -1],
      transition: { duration: 4.0, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_12px_26px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/*
        ViewBox: 250 wide × 250 tall
        Substantial, imposing apex predator proportions
      */}
      <svg
        viewBox="0 0 250 250"
        className="w-48 h-48 sm:w-60 sm:h-60 md:w-76 md:h-76 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Deep chestnut-chocolate body gradient */}
          <linearGradient id={`eagleBrown_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#693318" />
            <stop offset="50%" stopColor="#4A220E" />
            <stop offset="100%" stopColor="#2D1306" />
          </linearGradient>

          {/* Dark flight feathers */}
          <linearGradient id={`eagleWing_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#381D0F" />
            <stop offset="60%" stopColor="#221208" />
            <stop offset="100%" stopColor="#120904" />
          </linearGradient>

          {/* Beak & Cere Gradient */}
          <linearGradient id={`cereGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D033" />
            <stop offset="100%" stopColor="#D99B0B" />
          </linearGradient>

          {/* Talons Yellow */}
          <linearGradient id={`talonGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAD446" />
            <stop offset="100%" stopColor="#C48805" />
          </linearGradient>

          {/* River Driftwood Log */}
          <linearGradient id={`driftwood_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#61564A" />
            <stop offset="50%" stopColor="#453B31" />
            <stop offset="100%" stopColor="#2B241E" />
          </linearGradient>
        </defs>

        {/* ── WEATHERED RIVER DRIFTWOOD PERCH ── */}
        <g id="driftwood">
          {/* Main stranded driftwood log */}
          <path
            d="M 20 220 Q 80 205 150 210 Q 210 215 240 226 L 235 242 Q 170 232 100 234 Q 40 236 15 240 Z"
            fill={`url(#driftwood_${uid})`}
          />
          {/* Wood grain cracks */}
          <path d="M 60 218 Q 110 214 170 218" stroke="#1F1A15" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M 90 226 Q 140 224 200 228" stroke="#1F1A15" strokeWidth="1.5" fill="none" opacity="0.7" />
          {/* Cut-off branch stub */}
          <ellipse cx="230" cy="228" rx="8" ry="12" fill="#3D342B" />
          <ellipse cx="230" cy="228" rx="5" ry="8" fill="#29221B" />
        </g>

        {/* ── WHITE TAIL FEATHERS ── */}
        <g id="tail">
          <path
            d="M 80 180 L 46 220 L 64 224 L 98 190 Z"
            fill="#F0F4F7"
          />
          <path d="M 54 212 L 86 186" stroke="#D0D9DE" strokeWidth="1.8" />
        </g>

        {/* ── CHESTNUT TORSO & BELLY ── */}
        <g id="torso">
          {/* Heavy muscular raptor belly and lower flanks */}
          <path
            d="M 90 120 Q 72 150 82 186 Q 106 198 138 184 Q 150 150 144 120 Z"
            fill={`url(#eagleBrown_${uid})`}
          />
          {/* Feather layering ridges on flanks */}
          <path d="M 96 142 Q 112 148 128 142" stroke="#2D1306" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 92 160 Q 110 166 128 160" stroke="#2D1306" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>

        {/* ── POWERFUL YELLOW TALONS ── */}
        <g id="talons">
          {/* Left Foot */}
          <path
            d="M 102 180 L 98 206 M 92 206 L 82 210 M 98 208 L 98 215 M 104 207 L 112 212"
            stroke={`url(#talonGrad_${uid})`}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Left Claws (Black curved raptor hooks) */}
          <path d="M 82 210 Q 76 216 78 222" stroke="#12100E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 98 215 Q 98 222 96 227" stroke="#12100E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 112 212 Q 118 218 116 224" stroke="#12100E" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Right Foot */}
          <path
            d="M 128 180 L 132 206 M 126 206 L 118 210 M 132 208 L 134 215 M 138 207 L 146 212"
            stroke={`url(#talonGrad_${uid})`}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Right Claws */}
          <path d="M 118 210 Q 112 216 114 222" stroke="#12100E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 134 215 Q 134 222 132 227" stroke="#12100E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 146 212 Q 152 218 150 224" stroke="#12100E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>

        {/* ── BROAD RAPTOR WING ── */}
        <motion.g
          id="wing"
          animate={getWingAnimation()}
          style={{ originX: "105px", originY: "115px" }}
        >
          {isDominant ? (
            /* Wing flared and lifted in sky dominance */
            <g id="spreadWing">
              <path
                d="M 95 110 Q 50 85 24 50 Q 42 110 55 170 Q 95 180 120 150 Z"
                fill={`url(#eagleWing_${uid})`}
              />
              {/* Primary flight feather finger tips */}
              <path d="M 24 50 L 12 36 L 32 64 L 16 56 L 38 78 L 22 72 L 46 95" stroke="#140904" strokeWidth="3" fill="none" />
              <path d="M 45 100 Q 75 110 105 105" stroke="#5A2E16" strokeWidth="2.5" fill="none" />
              <path d="M 52 125 Q 80 135 110 130" stroke="#5A2E16" strokeWidth="2.5" fill="none" />
            </g>
          ) : (
            /* Wing folded securely along the flank */
            <g id="foldedWing">
              <path
                d="M 98 108 Q 66 128 58 178 Q 78 186 100 174 Q 130 155 125 118 Z"
                fill={`url(#eagleWing_${uid})`}
              />
              {/* Covert feather rows */}
              <path d="M 90 122 Q 78 140 72 165" stroke="#542B15" strokeWidth="2.5" fill="none" />
              <path d="M 100 125 Q 90 145 84 170" stroke="#542B15" strokeWidth="2.5" fill="none" />
              <path d="M 112 128 Q 102 148 96 172" stroke="#542B15" strokeWidth="2.5" fill="none" />
            </g>
          )}
        </motion.g>

        {/* ── SNOW-WHITE BREAST & MANTLE ── */}
        <g id="whiteBreast">
          {/* Pristine white mantle covering chest, shoulders, and lower neck */}
          <path
            d="M 94 80 Q 75 105 88 128 Q 115 138 140 125 Q 152 102 136 78 Z"
            fill="#FFFFFF"
          />
          {/* Subtle soft feather shadow lines */}
          <path d="M 86 112 Q 104 122 122 115" stroke="#D2DCE2" strokeWidth="2" fill="none" />
          <path d="M 94 124 Q 110 132 128 126" stroke="#D2DCE2" strokeWidth="1.8" fill="none" />
        </g>

        {/* ── HEAD, FIERCE EYE & HOOKED BEAK ── */}
        <motion.g
          id="eagleHead"
          animate={getHeadAnimation()}
          style={{ originX: "116px", originY: "78px" }}
        >
          {/* Snow-white head and crest nape */}
          <path
            d="M 102 78 Q 96 52 112 40 Q 134 38 152 52 Q 158 68 144 82 Q 124 86 102 78 Z"
            fill="#FFFFFF"
          />
          {/* Nape feather ruff */}
          <path d="M 104 74 L 94 76 L 102 68 L 92 68 L 102 60" stroke="#D2DCE2" strokeWidth="2" fill="none" />

          {/* Fierce Raptor Brow */}
          <path
            d="M 126 50 Q 140 48 150 56"
            stroke="#BDCAD2"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Golden-Amber Eye with Raptor Glare */}
          <circle cx="138" cy="55" r="5" fill="#E6AC10" />
          <circle cx="139" cy="55" r="3" fill="#140D05" />
          <circle cx="140.5" cy="53.5" r="1.2" fill="#FFFFFF" />

          {/* Yellow Cere (Nasal skin) */}
          <path
            d="M 148 50 Q 160 52 162 64 L 148 68 Z"
            fill={`url(#cereGrad_${uid})`}
          />
          {/* Nostril slit */}
          <ellipse cx="154" cy="58" rx="2" ry="1" fill="#755005" transform="rotate(-15 154 58)" />

          {/* Formidable Hooked Raptor Beak */}
          {isDominant ? (
            /* Beak agape shrieking sky law */
            <g id="openBeak">
              <path
                d="M 158 52 Q 178 52 186 64 Q 186 74 176 72 Q 166 68 160 62 Z"
                fill="#241E18"
              />
              <path
                d="M 156 66 L 176 76 L 154 75 Z"
                fill="#241E18"
              />
              {/* Yellow cere highlight */}
              <path d="M 158 53 L 166 54 L 164 62 L 157 62 Z" fill={`url(#cereGrad_${uid})`} />
            </g>
          ) : (
            /* Closed massive hooked raptor beak */
            <g id="closedBeak">
              <path
                d="M 158 52 Q 182 52 188 68 Q 185 75 178 74 Q 170 65 152 68 Z"
                fill="#241E18"
              />
              {/* Cere overlap */}
              <path d="M 154 52 Q 164 53 166 64 L 152 67 Z" fill={`url(#cereGrad_${uid})`} />
              {/* Sharp beak tip sheen */}
              <path d="M 172 58 Q 182 62 186 67" stroke="#63574A" strokeWidth="1.2" fill="none" />
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
