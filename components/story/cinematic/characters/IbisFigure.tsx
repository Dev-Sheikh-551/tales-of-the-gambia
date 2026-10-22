"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface IbisFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * IbisFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Birds' Parliament" (The Sacred Ibis)
 *
 * Species & Anatomical traits:
 *   - African Sacred Ibis (Threskiornis aethiopicus)
 *   - Bare black textured head and slender, elegant S-curved neck
 *   - Distinctive long, slender, downward-curved sickle bill
 *   - Pure white body plumage contrasting with ornamental dark blue-black tail plumes
 *   - Tall, slender black wading legs standing in gentle river shallows
 *   - Actions: stately upright stance, striking water / council summoning bow, high-stepping wading gait
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function IbisFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: IbisFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  // Pose classification
  const isSummoning =
    action === "gesture" ||
    action === "react" ||
    action === "approach" ||
    action === "point";

  const isWading =
    action === "walk" ||
    action === "step";

  // Body respiratory bob
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWading) {
      return {
        y: [0, -5, 0],
        rotate: [-1, 1.5, -1],
        transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isSummoning) {
      return {
        y: [0, -3, 0],
        transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      y: [0, -2.5, 0],
      transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Neck bowing / striking water animation
  const getNeckAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isSummoning) {
      return {
        rotate: [-8, 14, -8],
        y: [0, 8, 0],
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-1.5, 2, -1.5],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_10px_22px_rgba(0,0,0,0.52)] ${className}`}
    >
      {/*
        ViewBox: 220 wide × 260 tall
        Tall, stately wading bird with long stilt legs
      */}
      <svg
        viewBox="0 0 220 260"
        className="w-44 h-52 sm:w-54 sm:h-64 md:w-64 md:h-76 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* River Water Shallows Gradient */}
          <linearGradient id={`waterGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E6B7A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4CA3B8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2E6B7A" stopOpacity="0.8" />
          </linearGradient>

          {/* Bare Black Head & Neck */}
          <linearGradient id={`ibisBlack_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#282E33" />
            <stop offset="100%" stopColor="#12161A" />
          </linearGradient>

          {/* Blue-Black Ornamental Plumes */}
          <linearGradient id={`ibisPlumes_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A3845" />
            <stop offset="60%" stopColor="#18222B" />
            <stop offset="100%" stopColor="#0E141A" />
          </linearGradient>
        </defs>

        {/* ── SHALLOW RIVER WATER RIPPLES ── */}
        <g id="waterShallows">
          <ellipse cx="105" cy="246" rx="65" ry="9" fill={`url(#waterGrad_${uid})`} />
          {/* Subtle concentric ripple waves */}
          <ellipse cx="105" cy="246" rx="52" ry="6" stroke="#9EE6F5" strokeWidth="1.2" fill="none" opacity="0.65" />
          <ellipse cx="105" cy="246" rx="34" ry="4" stroke="#D1F5FD" strokeWidth="1.2" fill="none" opacity="0.75" />
        </g>

        {/* ── SLENDER STILT WADING LEGS ── */}
        <g id="stiltLegs">
          {/* Back Leg */}
          <path
            d="M 112 170 L 115 208 L 112 248 M 112 248 L 98 250 M 112 248 L 114 252 M 112 248 L 124 250"
            stroke="#191F24"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Back Leg Knee Joint */}
          <circle cx="115" cy="208" r="2.8" fill="#2E373F" />

          {/* Front Leg */}
          <path
            d="M 94 170 L 96 210 L 92 248 M 92 248 L 78 250 M 92 248 L 93 252 M 92 248 L 104 250"
            stroke="#191F24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Front Leg Knee Joint */}
          <circle cx="96" cy="210" r="3" fill="#2E373F" />
        </g>

        {/* ── BLUE-BLACK TAIL & SCAPULAR PLUMES ── */}
        <g id="tailPlumes">
          {/* Waterfall of ornamental frayed plumes over tail */}
          <path
            d="M 74 135 Q 40 145 32 175 Q 46 172 62 165 Q 44 182 38 195 Q 56 186 78 170 Z"
            fill={`url(#ibisPlumes_${uid})`}
          />
          {/* Plume filaments */}
          <path d="M 46 160 Q 32 175 30 192" stroke="#486073" strokeWidth="1.5" fill="none" />
          <path d="M 54 162 Q 42 180 38 200" stroke="#486073" strokeWidth="1.5" fill="none" />
          <path d="M 64 165 Q 52 184 48 204" stroke="#486073" strokeWidth="1.5" fill="none" />
        </g>

        {/* ── PRISTINE WHITE BODY & FLANK ── */}
        <g id="ibisBody">
          {/* Graceful elliptical white body */}
          <path
            d="M 88 108 Q 62 125 66 158 Q 78 178 114 172 Q 138 162 134 130 Q 128 105 106 102 Z"
            fill="#FFFFFF"
          />
          {/* Soft feather shading on lower breast */}
          <path d="M 74 150 Q 94 165 118 158" stroke="#D5E0E8" strokeWidth="2" fill="none" />
          <path d="M 84 160 Q 102 172 124 164" stroke="#D5E0E8" strokeWidth="1.8" fill="none" />
        </g>

        {/* ── FOLDED WHITE WING ── */}
        <g id="whiteWing">
          <path
            d="M 94 108 Q 68 128 62 162 Q 80 166 102 156 Q 124 140 118 112 Z"
            fill="#F6F9FA"
          />
          {/* Wing margin accent */}
          <path d="M 72 138 Q 88 150 106 142" stroke="#CBD8E0" strokeWidth="2" fill="none" />
          <path d="M 68 152 Q 82 160 98 154" stroke="#CBD8E0" strokeWidth="1.8" fill="none" />
        </g>

        {/* ── BARE BLACK S-CURVED NECK, HEAD & SICKLE BILL ── */}
        <motion.g
          id="ibisNeckAndHead"
          animate={getNeckAnimation()}
          style={{ originX: "112px", originY: "110px" }}
        >
          {/* Graceful slender bare black S-neck */}
          <path
            d="M 108 106 Q 124 88 128 65 Q 132 46 148 42 L 152 50 Q 136 54 134 72 Q 130 92 118 112 Z"
            fill={`url(#ibisBlack_${uid})`}
          />
          {/* Bare skin wrinkling texture on neck */}
          <path d="M 125 76 Q 129 78 133 76" stroke="#3E474F" strokeWidth="1.2" fill="none" />
          <path d="M 128 65 Q 132 67 136 65" stroke="#3E474F" strokeWidth="1.2" fill="none" />

          {/* Bare Black Head */}
          <path
            d="M 144 42 Q 146 32 158 32 Q 170 34 172 44 Q 168 54 154 52 Z"
            fill={`url(#ibisBlack_${uid})`}
          />

          {/* Keen Dark Eye */}
          <circle cx="160" cy="40" r="3" fill="#0A0C0E" />
          <circle cx="161" cy="39" r="0.8" fill="#FFFFFF" />

          {/* Distinctive Down-Curved Sickle Bill */}
          <path
            d="M 168 40 Q 192 46 208 72 Q 196 66 166 48 Z"
            fill="#12161A"
          />
          {/* Bill groove line */}
          <path
            d="M 168 43 Q 190 49 204 70"
            stroke="#38434D"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Three Water-Striking Drops (When summoning council) */}
          {isSummoning && (
            <g id="waterSplashes" transform="translate(196, 68)">
              <circle cx="0" cy="6" r="2" fill="#9CE5F5" opacity="0.85" />
              <circle cx="6" cy="10" r="1.5" fill="#9CE5F5" opacity="0.75" />
              <circle cx="-5" cy="11" r="1.5" fill="#9CE5F5" opacity="0.75" />
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
