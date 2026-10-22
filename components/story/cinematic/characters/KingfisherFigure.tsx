"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface KingfisherFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * KingfisherFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Birds' Parliament" (The Little Pied Kingfisher)
 *
 * Species & Anatomical traits:
 *   - Gambian riverine Pied Kingfisher (Ceryle rudis)
 *   - Distinctive shaggy spiky black-and-white crest
 *   - Long, sharp, formidable black dagger-like bill
 *   - High-contrast black and white plumage with checkered wing coverts
 *   - Prominent black double-band across the white chest
 *   - Perched upright on a green river reed stalk
 *   - Actions: alert upright perching, head cocking/speech gesture, wing flutter, hovering
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function KingfisherFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: KingfisherFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  const isSpeaking =
    action === "gesture" ||
    action === "singing" ||
    action === "react" ||
    action === "approach" ||
    action === "point";

  const isHovering =
    action === "walk" ||
    action === "jump" ||
    action === "reach";

  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isHovering) {
      return {
        y: [-10, 4, -10],
        rotate: [-4, 4, -4],
        transition: { duration: 1.0, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isSpeaking) {
      return {
        y: [0, -3, 0],
        rotate: [-1, 2, -1],
        transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      y: [0, -2, 0],
      transition: { duration: 3.0, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  const getHeadAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isSpeaking) {
      return {
        rotate: [-4, 6, -4],
        transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const },
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
      className={`relative inline-block select-none filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.52)] ${className}`}
    >
      {/*
        ViewBox: 180 wide × 180 tall
        Slender upright river kingfisher profile
      */}
      <svg
        viewBox="0 0 180 180"
        className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`reedGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E7837" />
            <stop offset="100%" stopColor="#2D4A1E" />
          </linearGradient>

          <linearGradient id={`billGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E353B" />
            <stop offset="100%" stopColor="#101417" />
          </linearGradient>

          <linearGradient id={`wingBlack_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A3036" />
            <stop offset="100%" stopColor="#12161A" />
          </linearGradient>
        </defs>

        {/* ── RIVER REED PERCH ── */}
        <g id="riverReed">
          {/* Main vertical river reed stalk */}
          <path
            d="M 52 175 Q 54 130 58 85 Q 60 40 62 10"
            stroke={`url(#reedGrad_${uid})`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Reed leaves */}
          <path
            d="M 56 120 Q 30 115 15 125"
            stroke="#4A7532"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 58 75 Q 85 68 100 80"
            stroke="#4A7532"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ── TAIL ── */}
        <g id="tailFeathers">
          <path
            d="M 64 125 L 56 160 L 64 163 L 74 130 Z"
            fill="#1A1F24"
          />
          {/* White tail feather margins */}
          <path d="M 58 140 L 57 158" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M 62 142 L 63 161" stroke="#FFFFFF" strokeWidth="1.8" />
        </g>

        {/* ── BODY & CHEST ── */}
        <g id="kingfisherBody">
          {/* Pristine white belly and flanks */}
          <path
            d="M 66 82 Q 58 105 68 130 Q 86 138 98 122 Q 106 100 96 82 Z"
            fill="#F4F7F9"
          />

          {/* Stark Pied Black Breast Band (Iconic Pied Kingfisher identifier) */}
          <path
            d="M 72 90 Q 86 94 96 90 Q 94 100 84 102 Q 74 100 72 90 Z"
            fill="#14181C"
          />
          {/* Second broken lower chest band */}
          <path
            d="M 75 106 Q 84 109 91 106 Q 88 111 82 112 Q 77 110 75 106 Z"
            fill="#14181C"
          />
        </g>

        {/* ── FEET CLASPING REED ── */}
        <g id="feet">
          <path
            d="M 60 118 L 54 116 M 60 120 L 52 121 M 60 122 L 55 125"
            stroke="#1E2328"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* ── FOLDED WING (Pied Checkered Pattern) ── */}
        <g id="piedWing">
          {/* Main wing shell */}
          <path
            d="M 74 84 Q 60 102 54 128 Q 72 134 84 120 Q 94 102 88 84 Z"
            fill={`url(#wingBlack_${uid})`}
          />
          {/* White checkered wing covert bars */}
          <ellipse cx="70" cy="94" rx="3.5" ry="2" fill="#FFFFFF" transform="rotate(-15 70 94)" />
          <ellipse cx="78" cy="95" rx="3.5" ry="2" fill="#FFFFFF" transform="rotate(-15 78 95)" />
          <ellipse cx="65" cy="103" rx="3.5" ry="2" fill="#FFFFFF" transform="rotate(-20 65 103)" />
          <ellipse cx="73" cy="105" rx="3.5" ry="2" fill="#FFFFFF" transform="rotate(-20 73 105)" />
          <ellipse cx="62" cy="113" rx="3" ry="1.8" fill="#FFFFFF" transform="rotate(-25 62 113)" />
          <ellipse cx="69" cy="115" rx="3" ry="1.8" fill="#FFFFFF" transform="rotate(-25 69 115)" />
        </g>

        {/* ── HEAD, SHAGGY CREST & DAGGER BILL ── */}
        <motion.g
          id="kingfisherHead"
          animate={getHeadAnimation()}
          style={{ originX: "78px", originY: "80px" }}
        >
          {/* White throat and collar */}
          <path
            d="M 70 70 Q 64 82 72 88 Q 86 90 94 84 Q 96 74 88 68 Z"
            fill="#FFFFFF"
          />

          {/* Black Crown & Shaggy Nape Crest */}
          <path
            d="M 68 56 Q 78 44 94 46 Q 102 50 104 60 L 98 68 Q 80 66 70 66 Z"
            fill="#14181C"
          />
          {/* Spiky Crest Feathers at Nape */}
          <path d="M 70 55 L 56 46 L 68 58 L 52 53 L 67 62 L 58 64 L 70 68" fill="#14181C" />
          <path d="M 66 52 L 57 48" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 65 58 L 55 56" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

          {/* Stark White Supercilium (Eyebrow stripe) */}
          <path
            d="M 82 56 Q 94 53 102 58"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Black Eye-Stripe */}
          <path
            d="M 88 61 L 114 62"
            stroke="#14181C"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Keen Dark Avian Eye */}
          <circle cx="96" cy="60" r="3.2" fill="#FFFFFF" />
          <circle cx="96" cy="60" r="2.2" fill="#0A0C0E" />
          <circle cx="97" cy="59" r="0.8" fill="#FFFFFF" />

          {/* Formidable Long Dagger Bill */}
          {isSpeaking ? (
            /* Open bill delivering wise treaty */
            <g id="speakingBill">
              <path
                d="M 102 58 L 158 55 L 104 64 Z"
                fill={`url(#billGrad_${uid})`}
              />
              <path
                d="M 104 65 L 152 70 L 102 69 Z"
                fill={`url(#billGrad_${uid})`}
              />
            </g>
          ) : (
            /* Closed straight heavy dagger bill */
            <path
              d="M 102 58 L 160 63 L 102 67 Z"
              fill={`url(#billGrad_${uid})`}
            />
          )}
          {/* Bill central ridge line */}
          <path d="M 104 62 L 155 62.5" stroke="#48535C" strokeWidth="1" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
