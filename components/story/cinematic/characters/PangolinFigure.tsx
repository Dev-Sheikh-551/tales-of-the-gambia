"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface PangolinFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * PangolinFigure — illustrated SVG character for
 * "The Little Pangolin Who Counted Stars".
 *
 * Recognisable features:
 *   - Overlapping protective keratin scales on back and tail
 *   - Elongated, tapered snout
 *   - Compact body with short sturdy legs
 *   - Long, downward-curving tail
 *   - Curled defensive posture for sleep/recline actions
 *
 * Action mapping (CharacterActionType):
 *   stand / look-up / curiosity  → upright, gentle breathing sway
 *   recline / still / sit        → fully curled ball silhouette
 *   walk / approach / step       → gentle waddling locomotion
 *   look-left / look-right       → head turn
 *   fear / surprise              → tight curl + subtle shake
 *   all other actions            → stand (graceful fallback)
 */
export function PangolinFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: PangolinFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";

  // Determine pose category
  const isCurled =
    action === "recline" ||
    action === "still" ||
    action === "sit" ||
    action === "fear" ||
    action === "sadness" ||
    (action as string) === "breathing";

  const isWalking =
    action === "walk" ||
    action === "approach" ||
    action === "step" ||
    action === "enter-left" ||
    action === "enter-right";

  const isLookingUp =
    action === "look-up" ||
    action === "curiosity" ||
    action === "focus" ||
    action === "surprise";

  // Outer container animation — whole-body movement
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isCurled) {
      // Gentle slow breathing pulse when curled up (sleeping)
      return {
        scale: [1, 1.02, 1],
        transition: { duration: 4.0, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isWalking) {
      return {
        y: [0, -10, 0, -7, 0],
        x: isFlipped ? [18, -14] : [-18, 14],
        transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Default idle — very soft rise-and-fall to suggest breathing
    return {
      y: [0, -5, 0],
      transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Head / snout animation
  const getHeadAnimation = () => {
    if (shouldReduceMotion || isPaused || isCurled) return {};
    if (isLookingUp) {
      return {
        rotate: isFlipped ? -15 : 15,
        y: -6,
        transition: { duration: 0.7, ease: "easeOut" as const },
      };
    }
    if (action === "look-left") {
      return { rotate: -10, transition: { duration: 0.5, ease: "easeOut" as const } };
    }
    if (action === "look-right") {
      return { rotate: 10, transition: { duration: 0.5, ease: "easeOut" as const } };
    }
    // Gentle periodic head-bob for idle stand
    return {
      rotate: [-2, 3, -2],
      transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Tail sway
  const getTailAnimation = () => {
    if (shouldReduceMotion || isPaused || isCurled) return {};
    return {
      rotate: [-4, 6, -4],
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
      className={`relative inline-block select-none filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)] ${className}`}
    >
      {isCurled ? (
        /* ============================================================
           CURLED BALL POSE — sleep / recline / fear
           The pangolin's most distinctive silhouette.
           ============================================================ */
        <svg
          viewBox="0 0 180 160"
          className="w-36 h-32 sm:w-44 sm:h-40 md:w-52 md:h-48 overflow-visible"
        >
          <defs>
            <linearGradient id="pangolinScaleCurl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A843" />
              <stop offset="40%" stopColor="#B8892E" />
              <stop offset="100%" stopColor="#8A6020" />
            </linearGradient>
            <radialGradient id="pangolinBellyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5D98A" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#C49030" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft ground shadow */}
          <ellipse cx="90" cy="148" rx="65" ry="10" fill="rgba(0,0,0,0.3)" />

          {/* Outer tail curl — wraps around the ball */}
          <path
            d="M155,80 Q170,55 160,35 Q148,18 132,25 Q118,32 115,50 Q112,68 120,82 Q128,95 142,100 Q158,105 162,118 Q165,132 150,140 Q135,148 118,142"
            stroke="#9A7025"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Scale pattern on tail */}
          <path
            d="M152,74 Q165,52 157,33 Q145,18 130,27"
            stroke="#B8892E"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Main curled body — golden-brown sphere */}
          <circle cx="88" cy="95" r="52" fill="url(#pangolinScaleCurl)" />

          {/* Overlapping scale rows on curled back */}
          {/* Row 1 — outermost */}
          <path d="M44,72 Q60,58 76,65 Q66,78 50,80 Z" fill="#9A7025" opacity="0.85" />
          <path d="M70,58 Q86,46 102,53 Q92,66 76,68 Z" fill="#9A7025" opacity="0.85" />
          <path d="M96,52 Q112,43 126,52 Q116,64 102,64 Z" fill="#9A7025" opacity="0.85" />
          {/* Row 2 */}
          <path d="M40,90 Q56,77 72,85 Q62,98 46,98 Z" fill="#8A6020" opacity="0.75" />
          <path d="M66,80 Q82,68 98,76 Q88,90 72,90 Z" fill="#8A6020" opacity="0.75" />
          <path d="M92,74 Q108,64 122,73 Q112,87 98,86 Z" fill="#8A6020" opacity="0.75" />
          <path d="M118,72 Q132,62 144,73 Q134,85 120,84 Z" fill="#8A6020" opacity="0.75" />
          {/* Row 3 */}
          <path d="M42,110 Q58,98 72,107 Q62,120 48,118 Z" fill="#7A5418" opacity="0.65" />
          <path d="M68,102 Q84,90 98,100 Q88,113 74,111 Z" fill="#7A5418" opacity="0.65" />
          <path d="M94,98 Q110,88 122,98 Q112,111 98,109 Z" fill="#7A5418" opacity="0.65" />

          {/* Soft belly visible at curl edge */}
          <path
            d="M55,130 Q88,120 118,132 Q105,145 72,143 Z"
            fill="#F5E0B0"
            opacity="0.85"
          />
          <ellipse cx="88" cy="130" rx="20" ry="8" fill="url(#pangolinBellyGlow)" />

          {/* Tiny snout tip peeking out */}
          <path
            d="M50,108 Q36,105 28,112 Q34,120 50,118 Z"
            fill="#C49030"
          />
          {/* Nostril */}
          <ellipse cx="30" cy="113" rx="3" ry="2" fill="#4A2A08" />

          {/* Small visible eye */}
          <circle cx="44" cy="105" r="4.5" fill="#1A0E04" />
          <circle cx="45.5" cy="103.5" r="1.5" fill="#FFFFFF" />

          {/* Tiny curled claws at base */}
          <path d="M112,142 Q118,148 124,144" stroke="#7A5418" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M118,145 Q124,151 130,147" stroke="#7A5418" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      ) : (
        /* ============================================================
           UPRIGHT / WALKING POSE — stand, walk, look-up, etc.
           Pangolin standing alert with long tail behind.
           ============================================================ */
        <svg
          viewBox="0 0 160 240"
          className="w-28 h-44 sm:w-36 sm:h-56 md:w-44 md:h-64 overflow-visible"
        >
          <defs>
            <linearGradient id="pangolinBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A843" />
              <stop offset="45%" stopColor="#B8892E" />
              <stop offset="100%" stopColor="#8A6020" />
            </linearGradient>
            <linearGradient id="pangolinBelly" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E0B0" />
              <stop offset="100%" stopColor="#DCC080" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="80" cy="232" rx="40" ry="8" fill="rgba(0,0,0,0.3)" />

          {/* Long curved tail extending behind and downward */}
          <motion.path
            d="M52,155 Q30,170 20,190 Q14,208 25,222 Q38,235 55,228 Q68,220 62,205 Q56,190 65,178"
            stroke="#9A7025"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            animate={getTailAnimation()}
            style={{ transformOrigin: "52px 155px" }}
          />
          {/* Scale ridge on tail */}
          <motion.path
            d="M50,158 Q28,174 18,194 Q12,210 24,224"
            stroke="#B8892E"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
            animate={getTailAnimation()}
            style={{ transformOrigin: "50px 158px" }}
          />

          {/* Back left leg */}
          <rect x="48" y="180" width="13" height="38" rx="5" fill="#9A7025" />
          <ellipse cx="55" cy="220" rx="9" ry="5" fill="#7A5418" />
          {/* Claws back */}
          <path d="M48,218 Q44,224 42,220" stroke="#5A3A10" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M55,221 Q53,228 50,224" stroke="#5A3A10" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Front left leg */}
          <rect x="62" y="165" width="12" height="36" rx="5" fill="#B8892E" />
          <ellipse cx="68" cy="202" rx="8" ry="5" fill="#9A7025" />
          {/* Claws front */}
          <path d="M62,200 Q58,207 56,203" stroke="#5A3A10" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Main body — compact egg shape */}
          <ellipse cx="80" cy="148" rx="36" ry="46" fill="url(#pangolinBodyGrad)" />
          {/* Belly — soft cream underside */}
          <ellipse cx="90" cy="155" rx="18" ry="32" fill="url(#pangolinBelly)" opacity="0.9" />

          {/* Overlapping back scales — 3 rows */}
          {/* Row 1 (top) */}
          <path d="M55,112 Q72,102 88,110 Q80,124 64,122 Z" fill="#9A7025" opacity="0.85" />
          <path d="M80,106 Q96,97 110,107 Q102,120 88,118 Z" fill="#9A7025" opacity="0.85" />
          {/* Row 2 (mid) */}
          <path d="M48,130 Q64,120 80,128 Q72,142 58,140 Z" fill="#8A6020" opacity="0.75" />
          <path d="M74,124 Q90,115 104,125 Q96,138 82,136 Z" fill="#8A6020" opacity="0.75" />
          <path d="M98,122 Q112,114 122,124 Q114,136 102,134 Z" fill="#8A6020" opacity="0.75" />
          {/* Row 3 (lower) */}
          <path d="M44,150 Q60,140 76,148 Q68,162 54,160 Z" fill="#7A5418" opacity="0.65" />
          <path d="M70,144 Q86,135 100,145 Q92,158 78,156 Z" fill="#7A5418" opacity="0.65" />
          <path d="M96,142 Q110,133 120,143 Q112,156 100,154 Z" fill="#7A5418" opacity="0.65" />

          {/* Right back leg */}
          <rect x="95" y="180" width="13" height="38" rx="5" fill="#9A7025" />
          <ellipse cx="102" cy="220" rx="9" ry="5" fill="#7A5418" />
          <path d="M98,218 Q100,225 104,221" stroke="#5A3A10" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Right front leg */}
          <rect x="84" y="165" width="12" height="36" rx="5" fill="#B8892E" />
          <ellipse cx="90" cy="202" rx="8" ry="5" fill="#9A7025" />
          <path d="M88,200 Q92,207 96,203" stroke="#5A3A10" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Neck */}
          <path d="M65,105 Q80,88 100,105 L96,115 Q80,108 68,115 Z" fill="#B8892E" />

          {/* Head group — animated separately */}
          <motion.g
            animate={getHeadAnimation()}
            style={{ transformOrigin: "80px 80px" }}
          >
            {/* Elongated tapered snout */}
            <path
              d="M105,85 Q124,82 138,90 Q130,100 112,96 Z"
              fill="#B8892E"
            />
            {/* Snout tip — darker */}
            <ellipse cx="137" cy="90" rx="5" ry="4" fill="#7A5418" />
            {/* Nostril */}
            <ellipse cx="138" cy="91" rx="2" ry="1.5" fill="#2A1408" />

            {/* Main head — compact oval */}
            <ellipse cx="88" cy="82" rx="26" ry="22" fill="url(#pangolinBodyGrad)" />

            {/* Scale on forehead */}
            <path d="M68,72 Q80,62 92,70 Q84,80 72,78 Z" fill="#9A7025" opacity="0.8" />
            <path d="M86,66 Q98,57 108,66 Q100,76 90,74 Z" fill="#8A6020" opacity="0.7" />

            {/* Small round eye — glistening night eye */}
            <circle cx="98" cy="80" r="5.5" fill="#1A0E04" />
            <circle cx="99.5" cy="78.5" r="2" fill="#FFFFFF" />
            {/* Gentle starlight eye-glint (night environment) */}
            <circle cx="100.5" cy="78" r="0.8" fill="#F2E0A0" opacity="0.9" />

            {/* Tiny ear nub */}
            <ellipse cx="74" cy="68" rx="6" ry="4" fill="#9A7025" />
          </motion.g>
        </svg>
      )}
    </motion.div>
  );
}
