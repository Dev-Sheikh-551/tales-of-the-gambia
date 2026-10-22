"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface SpiderFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * SpiderFigure — illustrated SVG character for
 * "The Spider and the Pot of Wisdom" (Anansi).
 *
 * Recognisable features:
 *   - Eight clearly distinguishable legs in four symmetric pairs
 *   - Distinct cephalothorax (head+chest) + abdomen body sections
 *   - Bold, readable silhouette against fire/dust backgrounds
 *   - Subtle web-silk filaments under the feet
 *
 * Action mapping (CharacterActionType):
 *   stand / still                → idle pulsing abdomen, legs at rest
 *   walk / approach / step       → alternating leg stride animation
 *   cunning-look / mock          → forward-lean, front legs raised
 *   anger / surprise             → rapid leg-splaying startle
 *   fall / dissolve              → downward drift with opacity fade
 *   reach / grab / point         → front pair of legs extend forward
 *   recline / sit                → legs folded inward, crouched
 *   all other actions            → stand (graceful fallback)
 */
export function SpiderFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: SpiderFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";

  // Derived pose flags
  const isWalking =
    action === "walk" ||
    action === "approach" ||
    action === "step" ||
    action === "enter-left" ||
    action === "enter-right";

  const isCunning =
    action === "cunning-look" ||
    action === "mock" ||
    action === "gesture" ||
    action === "point" ||
    action === "reach";

  const isStartled =
    action === "anger" ||
    action === "surprise" ||
    action === "fear";

  const isCrouched =
    action === "recline" ||
    action === "sit" ||
    action === "crouch";

  const isFalling =
    action === "fall" ||
    action === "dissolve" ||
    action === "exit-left" ||
    action === "exit-right";

  // ── Whole-body container animation ──────────────────────────────────
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        y: [0, -12, 0, -8, 0],
        x: isFlipped ? [16, -12] : [-16, 12],
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isFalling) {
      return {
        y: [0, 60],
        opacity: [1, 0.2],
        transition: { duration: 1.8, ease: "easeIn" as const },
      };
    }
    if (isStartled) {
      return {
        scale: [1, 1.12, 0.95, 1.05, 1],
        rotate: isFlipped ? [-5, 5, -3, 0] : [5, -5, 3, 0],
        transition: { duration: 0.5, ease: "easeOut" as const },
      };
    }
    // Idle — subtle pulsing of abdomen (breathing)
    return {
      y: [0, -3, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Front leg pair animation (legs 1–2, closest to viewer) ──────────
  const getFrontLegAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        rotate: [-20, 30, -20],
        transition: { duration: 0.45, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isCunning) {
      return {
        rotate: -35,
        y: -8,
        transition: { duration: 0.5, ease: "easeOut" as const },
      };
    }
    if (isCrouched) {
      return {
        rotate: 40,
        transition: { duration: 0.6, ease: "easeOut" as const },
      };
    }
    // Idle gentle tap
    return {
      rotate: [-5, 8, -5],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Second leg pair ───────────────────────────────────────────────────
  const getSecondLegAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        rotate: [20, -25, 20],
        transition: { duration: 0.45, delay: 0.225, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-3, 5, -3],
      transition: { duration: 3.1, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Back leg pair animation ───────────────────────────────────────────
  const getBackLegAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        rotate: [-15, 22, -15],
        transition: { duration: 0.45, delay: 0.11, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [4, -6, 4],
      transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Abdomen pulse ─────────────────────────────────────────────────────
  const getAbdomenAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    return {
      scale: [1, 1.04, 1],
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
      className={`relative inline-block select-none filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg
        viewBox="0 0 220 200"
        className="w-40 h-36 sm:w-48 sm:h-44 md:w-56 md:h-52 overflow-visible"
      >
        <defs>
          <radialGradient id="spiderAbdomen" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3D2B10" />
            <stop offset="50%" stopColor="#1F1508" />
            <stop offset="100%" stopColor="#0D0A05" />
          </radialGradient>
          <radialGradient id="spiderCephalo" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#4A3318" />
            <stop offset="100%" stopColor="#1A1008" />
          </radialGradient>
          <linearGradient id="spiderLeg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2A1C0A" />
            <stop offset="100%" stopColor="#1A1008" />
          </linearGradient>
          <radialGradient id="wisdomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2C765" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E58929" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Silk threads from feet to ground ── */}
        <line x1="50" y1="155" x2="50" y2="185" stroke="#C4A47C" strokeWidth="0.8" opacity="0.4" />
        <line x1="80" y1="160" x2="80" y2="188" stroke="#C4A47C" strokeWidth="0.8" opacity="0.4" />
        <line x1="140" y1="160" x2="140" y2="188" stroke="#C4A47C" strokeWidth="0.8" opacity="0.4" />
        <line x1="170" y1="155" x2="170" y2="185" stroke="#C4A47C" strokeWidth="0.8" opacity="0.4" />

        {/* ── Ground shadow ── */}
        <ellipse cx="110" cy="186" rx="68" ry="10" fill="rgba(0,0,0,0.35)" />

        {/* ══════════════════════════════════════════════
            BACK LEGS (outermost pair, rendered first)
            ══════════════════════════════════════════════ */}
        {/* Back left — pair 4 */}
        <motion.g
          animate={getBackLegAnimation()}
          style={{ transformOrigin: "95px 125px" }}
        >
          {/* Upper segment */}
          <line x1="95" y1="125" x2="58" y2="102" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          {/* Lower segment */}
          <line x1="58" y1="102" x2="28" y2="148" stroke="url(#spiderLeg)" strokeWidth="5" strokeLinecap="round" />
          {/* Foot */}
          <circle cx="28" cy="150" r="4" fill="#1A1008" />
        </motion.g>
        {/* Back right — pair 4 */}
        <motion.g
          animate={getBackLegAnimation()}
          style={{ transformOrigin: "125px 125px" }}
        >
          <line x1="125" y1="125" x2="162" y2="102" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <line x1="162" y1="102" x2="192" y2="148" stroke="url(#spiderLeg)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="192" cy="150" r="4" fill="#1A1008" />
        </motion.g>

        {/* ── Pair 3 (second from back) ── */}
        <motion.g
          animate={getSecondLegAnimation()}
          style={{ transformOrigin: "98px 118px" }}
        >
          <line x1="98" y1="118" x2="64" y2="90" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <line x1="64" y1="90" x2="44" y2="135" stroke="url(#spiderLeg)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="137" r="4" fill="#1A1008" />
        </motion.g>
        <motion.g
          animate={getSecondLegAnimation()}
          style={{ transformOrigin: "122px 118px" }}
        >
          <line x1="122" y1="118" x2="156" y2="90" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <line x1="156" y1="90" x2="176" y2="135" stroke="url(#spiderLeg)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="176" cy="137" r="4" fill="#1A1008" />
        </motion.g>

        {/* ══════════════════════════════════════════════
            LARGE ABDOMEN (main body mass, darker)
            ══════════════════════════════════════════════ */}
        <motion.g
          animate={getAbdomenAnimation()}
          style={{ transformOrigin: "110px 128px" }}
        >
          <ellipse cx="110" cy="130" rx="45" ry="38" fill="url(#spiderAbdomen)" />
          {/* Characteristic orange hourglass / decorative mark */}
          <path
            d="M96,118 Q110,108 124,118 Q118,128 110,130 Q102,128 96,118 Z"
            fill="#E58929"
            opacity="0.7"
          />
          <path
            d="M98,132 Q110,130 122,132 Q118,142 110,145 Q102,142 98,132 Z"
            fill="#E58929"
            opacity="0.5"
          />
        </motion.g>

        {/* ══════════════════════════════════════════════
            CEPHALOTHORAX (head + thorax section)
            ══════════════════════════════════════════════ */}
        <ellipse cx="110" cy="98" rx="30" ry="25" fill="url(#spiderCephalo)" />

        {/* ── FRONT LEG PAIRS (rendered over body) ── */}
        {/* Pair 2 (second from front) */}
        <motion.g
          animate={getSecondLegAnimation()}
          style={{ transformOrigin: "100px 106px" }}
        >
          <line x1="100" y1="106" x2="70" y2="78" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <line x1="70" y1="78" x2="55" y2="118" stroke="url(#spiderLeg)" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="55" cy="120" r="4" fill="#1A1008" />
        </motion.g>
        <motion.g
          animate={getSecondLegAnimation()}
          style={{ transformOrigin: "120px 106px" }}
        >
          <line x1="120" y1="106" x2="150" y2="78" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <line x1="150" y1="78" x2="165" y2="118" stroke="url(#spiderLeg)" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="165" cy="120" r="4" fill="#1A1008" />
        </motion.g>

        {/* Pair 1 (front-most, most animated) */}
        <motion.g
          animate={getFrontLegAnimation()}
          style={{ transformOrigin: "102px 96px" }}
        >
          <line x1="102" y1="96" x2="72" y2="65" stroke="url(#spiderLeg)" strokeWidth="6.5" strokeLinecap="round" />
          <line x1="72" y1="65" x2="50" y2="98" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="100" r="4.5" fill="#1A1008" />
        </motion.g>
        <motion.g
          animate={getFrontLegAnimation()}
          style={{ transformOrigin: "118px 96px" }}
        >
          <line x1="118" y1="96" x2="148" y2="65" stroke="url(#spiderLeg)" strokeWidth="6.5" strokeLinecap="round" />
          <line x1="148" y1="65" x2="170" y2="98" stroke="url(#spiderLeg)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="170" cy="100" r="4.5" fill="#1A1008" />
        </motion.g>

        {/* ══════════════════════════════════════════════
            HEAD — two eye clusters (simple, expressive)
            ══════════════════════════════════════════════ */}
        {/* Main forward-facing eyes (large pair) */}
        <circle cx="100" cy="88" r="7" fill="#0A0602" />
        <circle cx="100" cy="88" r="5.5" fill="#1F3A10" />
        <circle cx="101" cy="87" r="2.5" fill="#FFFFFF" />
        <circle cx="101.5" cy="86.5" r="1" fill="#F2C765" opacity="0.9" />

        <circle cx="120" cy="88" r="7" fill="#0A0602" />
        <circle cx="120" cy="88" r="5.5" fill="#1F3A10" />
        <circle cx="121" cy="87" r="2.5" fill="#FFFFFF" />
        <circle cx="121.5" cy="86.5" r="1" fill="#F2C765" opacity="0.9" />

        {/* Secondary eye row (smaller) */}
        <circle cx="93" cy="82" r="4" fill="#0D0804" />
        <circle cx="93" cy="82" r="2.5" fill="#142808" />
        <circle cx="94" cy="81" r="1" fill="#FFFFFF" opacity="0.7" />

        <circle cx="127" cy="82" r="4" fill="#0D0804" />
        <circle cx="127" cy="82" r="2.5" fill="#142808" />
        <circle cx="128" cy="81" r="1" fill="#FFFFFF" opacity="0.7" />

        {/* Chelicerae / fangs */}
        <path
          d={isCunning
            ? "M104,100 Q110,108 116,100 L114,105 Q110,112 106,105 Z"
            : "M105,99 Q110,105 115,99 L113,103 Q110,108 107,103 Z"}
          fill="#1A0E04"
        />

        {/* Cunning wisdom-glow aura (for cunning-look / mock actions) */}
        {isCunning && !isPaused && (
          <motion.ellipse
            cx="110"
            cy="100"
            rx="50"
            ry="40"
            fill="url(#wisdomGlow)"
            animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Pedipalps (small front feelers) */}
        <path
          d="M100,100 Q88,92 82,96"
          stroke="#2A1C0A"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M120,100 Q132,92 138,96"
          stroke="#2A1C0A"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
