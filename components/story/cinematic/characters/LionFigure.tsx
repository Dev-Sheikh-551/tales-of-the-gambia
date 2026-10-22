"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface LionFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * LionFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Cow, the Hyena, and the Shared Granary" (Lion the Elder)
 * and future West African savanna tales featuring lions.
 *
 * Recognizable design motifs:
 *   - Grand, rounded radial mane silhouette with warm amber, ochre, and deep earthy brown tones
 *   - Regal, calm, dignified elder demeanor (rounded ears, noble brow, wise eyes)
 *   - Distinct feline muzzle, broad dark nose, and gentle mouth line
 *   - Sturdy muscular body with warm golden-tawny coat gradient
 *   - Four sturdy feline legs with rounded paws
 *   - Long curved tail with a plush dark tuft at the tip
 *   - Integrated Framer Motion actions: breathing idle, walking locomotion, alert/speaking head movements, dignified pose
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function LionFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: LionFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";

  // ── Pose categories ────────────────────────────────────────────────────────
  const isWalking =
    action === "walk" ||
    action === "approach" ||
    action === "step" ||
    action === "enter-left" ||
    action === "enter-right";

  const isLowered =
    action === "fear" ||
    action === "concern" ||
    action === "sadness" ||
    action === "recline" ||
    action === "sit" ||
    action === "crouch";

  const isAlert =
    action === "joy" ||
    action === "triumphant" ||
    action === "surprise" ||
    action === "react" ||
    action === "gesture" ||
    action === "focus";

  const isLookingLeft = action === "look-left";
  const isLookingRight = action === "look-right";

  // ── Whole-figure body animation ────────────────────────────────────────────
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        y: [0, -7, 0, -5, 0],
        x: isFlipped ? [12, -8] : [-12, 8],
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Dignified, steady breathing idle
    return {
      y: [0, -4, 0],
      transition: { duration: 4.6, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Head / mane animation ──────────────────────────────────────────────────
  const getHeadAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isLowered) {
      return {
        rotate: isFlipped ? 8 : -8,
        y: 6,
        transition: { duration: 0.8, ease: "easeOut" as const },
      };
    }
    if (isAlert) {
      return {
        rotate: isFlipped ? -8 : 8,
        y: -6,
        transition: { duration: 0.6, ease: "easeOut" as const },
      };
    }
    if (isLookingLeft) {
      return { rotate: -12, transition: { duration: 0.5, ease: "easeOut" as const } };
    }
    if (isLookingRight) {
      return { rotate: 12, transition: { duration: 0.5, ease: "easeOut" as const } };
    }
    // Subtle regal nodding / breathing bob
    return {
      rotate: [-1.5, 1.5, -1.5],
      y: [0, -2.5, 0],
      transition: { duration: 5.0, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Tail animation ─────────────────────────────────────────────────────────
  const getTailAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isAlert || isWalking) {
      return {
        rotate: [-6, 14, -6],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-3, 8, -3],
      transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)] ${className}`}
    >
      {/*
        Viewbox: 270 wide × 240 tall
        Facing right by default. When facing left, `isFlipped` mirrors the element.
      */}
      <svg
        viewBox="0 0 270 240"
        className="w-52 h-48 sm:w-64 sm:h-60 md:w-80 md:h-72 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Main tawny golden coat */}
          <linearGradient id="lionCoat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6A840" />
            <stop offset="50%" stopColor="#CF8E26" />
            <stop offset="100%" stopColor="#A86A18" />
          </linearGradient>

          {/* Underbelly & inner leg highlight */}
          <linearGradient id="lionBelly" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D38A" />
            <stop offset="100%" stopColor="#D9B064" />
          </linearGradient>

          {/* Majestic elder mane: warm dark amber into deep mahogany */}
          <linearGradient id="lionManeOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A4212" />
            <stop offset="50%" stopColor="#692C08" />
            <stop offset="100%" stopColor="#451804" />
          </linearGradient>

          {/* Inner mane layers for rich volume */}
          <linearGradient id="lionManeInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B35B19" />
            <stop offset="70%" stopColor="#7E330C" />
            <stop offset="100%" stopColor="#541F06" />
          </linearGradient>

          {/* Muzzle: pale cream */}
          <linearGradient id="lionMuzzle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8E6C8" />
            <stop offset="100%" stopColor="#E6C898" />
          </linearGradient>

          {/* Nose & paw pads */}
          <linearGradient id="lionNose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E2415" />
            <stop offset="100%" stopColor="#1A0D06" />
          </linearGradient>
        </defs>

        {/* ── Ground shadow ─────────────────────────────────────────────── */}
        <ellipse cx="128" cy="232" rx="95" ry="11" fill="rgba(0,0,0,0.38)" />

        {/* ── Back legs (far side, darker) ──────────────────────────────── */}
        {/* Back-right hind leg */}
        <rect x="58" y="150" width="22" height="74" rx="7" fill="#8C5414" />
        <ellipse cx="68" cy="223" rx="14" ry="8" fill="#75430D" />

        {/* Far front leg */}
        <rect x="156" y="152" width="22" height="72" rx="7" fill="#8C5414" />
        <ellipse cx="166" cy="223" rx="14" ry="8" fill="#75430D" />

        {/* ── Tail (animated) ───────────────────────────────────────────── */}
        <motion.g
          animate={getTailAnimation()}
          style={{ transformOrigin: "48px 145px" }}
        >
          {/* S-curved feline tail */}
          <path
            d="M48,145 Q20,165 16,192 Q12,216 26,224"
            stroke="#A86A18"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Distinctive dark tuft */}
          <ellipse cx="28" cy="225" rx="12" ry="8" fill="url(#lionManeOuter)" />
          <path
            d="M17,222 Q24,232 30,228 Q37,232 40,224"
            stroke="#451804"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* ── Main body ─────────────────────────────────────────────────── */}
        {/* Muscular lion torso */}
        <path
          d="M48,150 C38,110 70,82 135,82 C185,82 210,112 210,154 C210,192 190,212 135,212 C72,212 52,192 48,150 Z"
          fill="url(#lionCoat)"
        />

        {/* Underbelly soft pale fur */}
        <ellipse cx="132" cy="198" rx="55" ry="18" fill="url(#lionBelly)" opacity="0.8" />

        {/* ── Near legs (drawn in front of body) ─────────────────────────── */}
        {/* Near hind leg & muscular thigh */}
        <ellipse cx="80" cy="155" rx="26" ry="32" fill="url(#lionCoat)" />
        <rect x="74" y="160" width="24" height="64" rx="8" fill="url(#lionCoat)" />
        <ellipse cx="86" cy="223" rx="15" ry="9" fill="#B3751E" />
        {/* Paw toe dividers */}
        <circle cx="78" cy="225" r="3" fill="#8C5414" opacity="0.6" />
        <circle cx="86" cy="226" r="3" fill="#8C5414" opacity="0.6" />
        <circle cx="94" cy="225" r="3" fill="#8C5414" opacity="0.6" />

        {/* Near front leg & sturdy shoulder */}
        <ellipse cx="182" cy="150" rx="20" ry="26" fill="url(#lionCoat)" />
        <rect x="172" y="158" width="24" height="66" rx="8" fill="url(#lionCoat)" />
        <ellipse cx="184" cy="223" rx="15" ry="9" fill="#B3751E" />
        {/* Paw toe dividers */}
        <circle cx="176" cy="225" r="3" fill="#8C5414" opacity="0.6" />
        <circle cx="184" cy="226" r="3" fill="#8C5414" opacity="0.6" />
        <circle cx="192" cy="225" r="3" fill="#8C5414" opacity="0.6" />

        {/* ── Head & Mane Group (animated together) ────────────────────── */}
        <motion.g
          animate={getHeadAnimation()}
          style={{ transformOrigin: "210px 88px" }}
        >
          {/* Back Mane Tufts (voluminous outer silhouette) */}
          <path
            d="M170,85 C160,40 190,15 220,15 C255,15 285,42 278,92 C272,130 248,155 210,155 C175,155 160,125 170,85 Z"
            fill="url(#lionManeOuter)"
          />

          {/* Radial mane tuft scallops (give unmistakable lion mane silhouette) */}
          <path
            d="
              M176,55 Q160,45 174,32 Q190,20 205,25 Q220,8 240,15
              Q260,12 270,30 Q285,45 282,65 Q292,85 278,105
              Q285,125 265,138 Q250,155 230,152 Q210,165 190,150
              Q170,155 165,135 Q152,118 165,100 Q155,80 176,55 Z
            "
            fill="url(#lionManeOuter)"
          />

          {/* Middle Mane Layer (warmer amber tones) */}
          <path
            d="
              M185,65 Q178,45 195,38 Q215,28 230,35 Q250,28 260,45
              Q272,60 268,78 Q275,98 262,115 Q265,130 245,138
              Q228,148 212,138 Q195,145 185,128 Q174,110 185,92
              Q176,78 185,65 Z
            "
            fill="url(#lionManeInner)"
          />

          {/* Feline Ears (nestled naturally in mane) */}
          {/* Left / Back Ear */}
          <circle cx="198" cy="46" r="14" fill="#CF8E26" />
          <circle cx="198" cy="46" r="8" fill="url(#lionManeOuter)" />

          {/* Right / Front Ear */}
          <circle cx="246" cy="46" r="14" fill="#CF8E26" />
          <circle cx="246" cy="46" r="8" fill="url(#lionManeOuter)" />

          {/* Lion Face / Skull */}
          <ellipse cx="224" cy="84" rx="34" ry="32" fill="url(#lionCoat)" />

          {/* Dignified Elder Brow & Cheek Tufts */}
          <path
            d="M194,80 Q185,95 195,110 Q205,102 202,88 Z"
            fill="#E6A840"
          />
          <path
            d="M254,80 Q263,95 253,110 Q243,102 246,88 Z"
            fill="#CF8E26"
          />

          {/* Forward beard mane tuft cascading down chest */}
          <path
            d="M205,112 Q224,152 226,162 Q232,148 245,112 Z"
            fill="url(#lionManeOuter)"
          />

          {/* Pale Muzzle Pad */}
          <ellipse cx="224" cy="98" rx="20" ry="16" fill="url(#lionMuzzle)" />
          {/* Chin tuft */}
          <ellipse cx="224" cy="112" rx="10" ry="6" fill="#F8E6C8" />

          {/* Broad Feline Nose */}
          <polygon
            points="216,88 232,88 227,98 221,98"
            fill="url(#lionNose)"
          />
          {/* Nostril indentations */}
          <circle cx="221" cy="94" r="1.5" fill="#1A0D06" />
          <circle cx="227" cy="94" r="1.5" fill="#1A0D06" />

          {/* Mouth line & gentle smile of a wise elder */}
          <path
            d="M224,98 L224,105 Q218,108 214,104 M224,105 Q230,108 234,104"
            stroke="#3E2415"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Whisker dots */}
          <circle cx="212" cy="100" r="1.2" fill="#541F06" opacity="0.7" />
          <circle cx="215" cy="103" r="1.2" fill="#541F06" opacity="0.7" />
          <circle cx="211" cy="104" r="1.2" fill="#541F06" opacity="0.7" />
          <circle cx="236" cy="100" r="1.2" fill="#541F06" opacity="0.7" />
          <circle cx="233" cy="103" r="1.2" fill="#541F06" opacity="0.7" />
          <circle cx="237" cy="104" r="1.2" fill="#541F06" opacity="0.7" />

          {/* Eyes — calm, dignified elder gaze */}
          {/* Left Eye */}
          <ellipse cx="208" cy="76" rx="6.5" ry="5.5" fill="#2E1808" />
          <ellipse cx="208" cy="76" rx="4.5" ry="4" fill="#9C6214" />
          <circle cx="208" cy="76" r="2.5" fill="#0A0502" />
          <circle cx="206.5" cy="74.5" r="1.5" fill="#FFFFFF" opacity="0.9" />

          {/* Right Eye */}
          <ellipse cx="240" cy="76" rx="6.5" ry="5.5" fill="#2E1808" />
          <ellipse cx="240" cy="76" rx="4.5" ry="4" fill="#9C6214" />
          <circle cx="240" cy="76" r="2.5" fill="#0A0502" />
          <circle cx="238.5" cy="74.5" r="1.5" fill="#FFFFFF" opacity="0.9" />

          {/* Wise elder brow lines */}
          <path
            d="M202,70 Q208,66 215,70"
            stroke="#541F06"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M233,70 Q240,66 246,70"
            stroke="#541F06"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
