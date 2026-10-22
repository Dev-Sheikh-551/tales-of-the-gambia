"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface StorkFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * StorkFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Birds' Parliament" (The Marabou Stork)
 *
 * Species & Anatomical traits:
 *   - Gambian Marabou Stork (Leptoptilos crumenifer) — "The Undertaker Bird"
 *   - Unmistakable hunched judge silhouette with dark slate-gray cloak wings
 *   - Massive, heavy bone-colored wedge-shaped bill
 *   - Bare pinkish-mottled head and neck with white down neck-ruff
 *   - Distinctive pendulous fleshy pink throat sac (gular pouch)
 *   - Pristine white fluffy belly and undertail down
 *   - Tall, knobby, chalky-gray stilt legs
 *   - Actions: hunched judge stance, clattering bill gesture/demand, slow throat pouch breathing, stalking walk
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function StorkFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: StorkFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  // Pose classification
  const isDemanding =
    action === "gesture" ||
    action === "singing" ||
    action === "mock" ||
    action === "approach" ||
    action === "point";

  const isWalking =
    action === "walk" ||
    action === "step";

  // Body animation
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        y: [0, -6, 0],
        rotate: [-1.5, 1.5, -1.5],
        transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isDemanding) {
      return {
        y: [0, -4, 0],
        rotate: [-1, 2, -1],
        transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Heavy hunched respiratory cycle
    return {
      y: [0, -3, 0],
      transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Clattering bill and neck thrust animation
  const getNeckAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isDemanding) {
      return {
        rotate: [-6, 8, -6],
        x: [0, 6, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-1, 1.5, -1],
      transition: { duration: 4.0, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Throat sac pulse
  const getPouchAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    return {
      scaleY: [0.92, 1.08, 0.92],
      scaleX: [1.04, 0.96, 1.04],
      transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_12px_26px_rgba(0,0,0,0.58)] ${className}`}
    >
      {/*
        ViewBox: 230 wide × 270 tall
        Tall, heavy hunched stature
      */}
      <svg
        viewBox="0 0 230 270"
        className="w-48 h-56 sm:w-58 sm:h-68 md:w-68 md:h-80 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Slate Cloak Wings */}
          <linearGradient id={`storkSlate_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3C434B" />
            <stop offset="60%" stopColor="#252A30" />
            <stop offset="100%" stopColor="#14171A" />
          </linearGradient>

          {/* Bare Pinkish Head & Neck */}
          <linearGradient id={`storkSkin_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D98282" />
            <stop offset="50%" stopColor="#BA6363" />
            <stop offset="100%" stopColor="#8A4040" />
          </linearGradient>

          {/* Massive Bone Bill */}
          <linearGradient id={`storkBill_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2D4B6" />
            <stop offset="55%" stopColor="#C7B48F" />
            <stop offset="100%" stopColor="#8C7A58" />
          </linearGradient>

          {/* Chalky Legs */}
          <linearGradient id={`storkLegs_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#69737D" />
            <stop offset="100%" stopColor="#3C434A" />
          </linearGradient>
        </defs>

        {/* ── GROUND CONTACT SHADOW ── */}
        <ellipse cx="110" cy="260" rx="52" ry="8" fill="#000000" opacity="0.45" />

        {/* ── TALL CHALKY STILT LEGS ── */}
        <g id="storkLegs">
          {/* Back Leg */}
          <path
            d="M 120 180 L 124 218 L 121 258 M 121 258 L 108 261 M 121 258 L 123 263 M 121 258 L 134 261"
            stroke={`url(#storkLegs_${uid})`}
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          {/* Back Knee Joint */}
          <circle cx="124" cy="218" r="3.6" fill="#4B535C" />

          {/* Front Leg */}
          <path
            d="M 100 180 L 103 220 L 98 258 M 98 258 L 84 261 M 98 258 L 99 263 M 98 258 L 111 261"
            stroke={`url(#storkLegs_${uid})`}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Front Knee Joint */}
          <circle cx="103" cy="220" r="4" fill="#4B535C" />
        </g>

        {/* ── WHITE FLUFFY UNDERBELLY & DOWN ── */}
        <g id="whiteBelly">
          <path
            d="M 88 125 Q 70 148 76 178 Q 98 186 124 180 Q 138 162 134 135 Z"
            fill="#FFFFFF"
          />
          {/* Soft downy undertail tufts */}
          <path d="M 68 174 Q 60 185 54 182 Q 65 170 74 165 Z" fill="#F0F4F7" />
          <path d="M 62 182 Q 54 192 48 188 Q 58 178 68 174 Z" fill="#E2EBF0" />
        </g>

        {/* ── DARK SLATE CLOAK WINGS (Hunched Judge Stature) ── */}
        <g id="slateCloak">
          {/* Main cloak draped across the back and shoulders */}
          <path
            d="M 86 102 Q 54 125 50 178 Q 72 188 94 172 Q 134 148 132 108 Q 112 96 86 102 Z"
            fill={`url(#storkSlate_${uid})`}
          />
          {/* Feather ridges on the folded slate cloak */}
          <path d="M 78 118 Q 66 140 60 168" stroke="#1D2226" strokeWidth="2.5" fill="none" />
          <path d="M 90 120 Q 80 144 74 172" stroke="#1D2226" strokeWidth="2.5" fill="none" />
          <path d="M 104 122 Q 94 146 88 172" stroke="#1D2226" strokeWidth="2.5" fill="none" />
        </g>

        {/* ── WHITE DOWN NECK RUFF ── */}
        <g id="neckRuff">
          {/* Thick fluffy collar around lower neck base */}
          <path
            d="M 98 90 Q 116 86 132 94 Q 138 108 126 116 Q 106 116 94 105 Z"
            fill="#FFFFFF"
          />
          {/* Fluffy edge scallop */}
          <path d="M 98 94 Q 94 100 98 104" stroke="#D1DCE2" strokeWidth="1.8" fill="none" />
          <path d="M 112 112 Q 118 118 124 114" stroke="#D1DCE2" strokeWidth="1.8" fill="none" />
          <path d="M 126 102 Q 134 108 132 114" stroke="#D1DCE2" strokeWidth="1.8" fill="none" />
        </g>

        {/* ── PENDULOUS FLESHY PINK THROAT SAC (Gular Pouch) ── */}
        <motion.g
          id="gularPouch"
          animate={getPouchAnimation()}
          style={{ originX: "128px", originY: "96px" }}
        >
          {/* Inflatable pink fleshy pouch hanging down the breast */}
          <path
            d="M 124 94 Q 138 98 138 132 Q 134 148 128 148 Q 120 148 120 132 Q 118 108 124 94 Z"
            fill={`url(#storkSkin_${uid})`}
          />
          {/* Pouch wrinkles */}
          <path d="M 124 112 Q 129 114 134 112" stroke="#6E3030" strokeWidth="1.2" fill="none" />
          <path d="M 123 124 Q 128 126 133 124" stroke="#6E3030" strokeWidth="1.2" fill="none" />
          <path d="M 122 136 Q 126 138 130 136" stroke="#6E3030" strokeWidth="1.2" fill="none" />
        </motion.g>

        {/* ── BARE PINK MOTTLED HEAD & MASSIVE BONE WEDGE BILL ── */}
        <motion.g
          id="storkHead"
          animate={getNeckAnimation()}
          style={{ originX: "116px", originY: "92px" }}
        >
          {/* Bare Pink Neck extending from ruff */}
          <path
            d="M 112 92 Q 118 72 126 64 L 138 68 Q 132 82 128 94 Z"
            fill={`url(#storkSkin_${uid})`}
          />
          {/* Neck scab/mottling spots */}
          <circle cx="122" cy="78" r="1.5" fill="#752B2B" opacity="0.7" />
          <circle cx="125" cy="84" r="1.2" fill="#752B2B" opacity="0.7" />

          {/* Bald Head */}
          <path
            d="M 122 66 Q 126 48 142 46 Q 156 46 160 58 Q 156 70 136 72 Z"
            fill={`url(#storkSkin_${uid})`}
          />
          {/* Scabby crown spots */}
          <circle cx="134" cy="50" r="2" fill="#692525" opacity="0.65" />
          <circle cx="142" cy="48" r="1.5" fill="#692525" opacity="0.65" />
          <circle cx="148" cy="52" r="1.8" fill="#692525" opacity="0.65" />

          {/* Impatient Yellow / Pale Iris Eye */}
          <circle cx="145" cy="56" r="3.8" fill="#E8DDA0" />
          <circle cx="145" cy="56" r="2" fill="#1A150E" />
          <circle cx="146" cy="55" r="0.8" fill="#FFFFFF" />

          {/* Massive Heavy Wedge-Shaped Bone Bill */}
          {isDemanding ? (
            /* Bill open clattering in greedy demand */
            <g id="clatteringBill">
              <path
                d="M 152 48 L 222 52 L 158 64 Z"
                fill={`url(#storkBill_${uid})`}
              />
              <path
                d="M 156 66 L 216 78 L 152 74 Z"
                fill={`url(#storkBill_${uid})`}
              />
              {/* Clattering sound marks */}
              <path d="M 224 48 L 228 44" stroke="#D1BC94" strokeWidth="2" strokeLinecap="round" />
              <path d="M 226 62 L 232 62" stroke="#D1BC94" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            /* Closed massive bone dagger bill */
            <g id="closedBill">
              <path
                d="M 152 48 L 224 64 L 154 72 Z"
                fill={`url(#storkBill_${uid})`}
              />
              {/* Central bill seam line */}
              <path d="M 154 62 L 220 64" stroke="#61533B" strokeWidth="1.8" />
              {/* Horn ridges */}
              <path d="M 162 52 L 164 58" stroke="#8C7A58" strokeWidth="1.2" />
              <path d="M 174 54 L 176 60" stroke="#8C7A58" strokeWidth="1.2" />
              <path d="M 188 57 L 190 62" stroke="#8C7A58" strokeWidth="1.2" />
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
