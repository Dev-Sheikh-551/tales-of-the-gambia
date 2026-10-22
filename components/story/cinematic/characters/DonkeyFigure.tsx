"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface DonkeyFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * DonkeyFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "Fari, Queen of the Wild Donkeys" (Queen Fari & The Donkey Council)
 * and future Gambian fables featuring donkeys.
 *
 * Species & Anatomical traits:
 *   - West African savanna donkey (Equus africanus asinus)
 *   - Long, expressive upright ears with dark tips and soft inner shading
 *   - Pale white/cream muzzle with dark nostrils and mouth
 *   - Warm gray-dun coat with pale underbelly and inner legs
 *   - Characteristic dark dorsal cross stripe across the withers
 *   - Short, stiff upright black mane along the crest of the neck
 *   - Rope-like tail ending in a dark bristly switch/tuft
 *   - Actions: patient idle breathing & ear twitch, purposeful trot/walk, joyful braying ("HEE-HAW!"), galloping kick
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function DonkeyFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: DonkeyFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  // Pose classification
  const isWalking =
    action === "walk" ||
    action === "approach" ||
    action === "step" ||
    action === "enter-left" ||
    action === "enter-right";

  const isBraying =
    action === "gesture" ||
    action === "singing" ||
    action === "mock" ||
    action === "react";

  const isKicking =
    action === "jump" ||
    action === "run" ||
    action === "triumphant";

  // Body animation
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isKicking) {
      return {
        y: [0, -8, 0],
        rotate: [-3, 4, -3],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isWalking) {
      return {
        y: [0, -4, 0],
        rotate: [-1.2, 1.2, -1.2],
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isBraying) {
      return {
        y: [0, -3, 0],
        rotate: [0, -2, 0],
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Patient gentle idle breathing
    return {
      y: [0, -2, 0],
      transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Ear twitch animation
  const getEarAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isBraying) {
      return {
        rotate: [-8, 6, -8],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-2, 4, -2],
      transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Tail switch animation
  const getTailAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isKicking || isWalking) {
      return {
        rotate: [-12, 16, -12],
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-4, 8, -4],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
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
        ViewBox: 250 wide × 220 tall
        Facing right by default
      */}
      <svg
        viewBox="0 0 250 220"
        className="w-48 h-44 sm:w-60 sm:h-52 md:w-76 md:h-64 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Main Donkey Gray Dun Coat */}
          <linearGradient id={`donkeyCoat_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A89E94" />
            <stop offset="50%" stopColor="#8C8176" />
            <stop offset="100%" stopColor="#6E645A" />
          </linearGradient>

          {/* Pale Belly & Muzzle */}
          <linearGradient id={`donkeyBelly_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE6DE" />
            <stop offset="100%" stopColor="#D5CCC2" />
          </linearGradient>

          {/* Muzzle Flesh Pink */}
          <linearGradient id={`donkeyMuzzle_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5ECE4" />
            <stop offset="60%" stopColor="#EAD8CE" />
            <stop offset="100%" stopColor="#D1B8AC" />
          </linearGradient>
        </defs>

        {/* ── GROUND CONTACT SHADOW ── */}
        <ellipse cx="120" cy="208" rx="68" ry="8" fill="#000000" opacity="0.45" />

        {/* ── BACK LEGS ── */}
        {/* Back-Right Leg (Behind) */}
        <g id="backLegFar">
          <path
            d="M 62 120 L 52 165 L 56 200 L 46 203 L 45 208 L 62 208 L 65 165 L 75 125 Z"
            fill="#5E554C"
          />
          {/* Dark Hoof */}
          <rect x="45" y="202" width="17" height="6" rx="1.5" fill="#24201C" />
        </g>

        {/* Front-Right Leg (Behind) */}
        <g id="frontLegFar">
          <path
            d="M 160 120 L 165 165 L 163 200 L 155 203 L 154 208 L 170 208 L 172 165 L 175 120 Z"
            fill="#5E554C"
          />
          <rect x="154" y="202" width="16" height="6" rx="1.5" fill="#24201C" />
        </g>

        {/* ── TAIL ── */}
        <motion.g
          id="tail"
          animate={getTailAnimation()}
          style={{ originX: "52px", originY: "98px" }}
        >
          {/* Rope tail */}
          <path
            d="M 52 98 Q 32 122 36 155"
            stroke="#6E645A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Dark bristly tail tuft */}
          <path
            d="M 36 150 Q 28 172 32 186 Q 42 176 38 152 Z"
            fill="#1E1A16"
          />
          <path d="M 33 162 L 27 182" stroke="#1E1A16" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 37 165 L 35 186" stroke="#1E1A16" strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>

        {/* ── STURDY BODY & DORSAL CROSS ── */}
        <g id="donkeyTorso">
          {/* Main barrel body */}
          <path
            d="M 52 96 Q 50 135 68 142 Q 120 148 172 135 Q 185 110 178 92 Q 130 84 76 86 Q 58 88 52 96 Z"
            fill={`url(#donkeyCoat_${uid})`}
          />

          {/* Pale creamy underbelly */}
          <path
            d="M 68 128 Q 118 144 168 128 Q 164 136 148 140 Q 98 146 68 135 Z"
            fill={`url(#donkeyBelly_${uid})`}
          />

          {/* Iconic Donkey Dorsal Stripe & Shoulder Cross (Dark charcoal mark) */}
          {/* Spine stripe */}
          <path
            d="M 56 94 Q 112 88 174 92"
            stroke="#2B2621"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          {/* Shoulder cross band */}
          <path
            d="M 148 88 Q 150 108 154 126"
            stroke="#2B2621"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* ── FOREGROUND LEGS ── */}
        {/* Back-Left Leg (Foreground) */}
        <g id="backLegNear">
          <path
            d="M 72 108 Q 78 135 74 165 L 70 200 L 60 203 L 59 208 L 78 208 L 82 165 Q 86 135 84 112 Z"
            fill={`url(#donkeyCoat_${uid})`}
          />
          {/* Pale inner leg feathering */}
          <path d="M 72 118 Q 75 145 74 162" stroke="#EDE6DE" strokeWidth="2" fill="none" opacity="0.6" />
          {/* Dark Hoof */}
          <rect x="59" y="202" width="19" height="6" rx="1.5" fill="#24201C" />
          <path d="M 59 202 L 78 202" stroke="#423C36" strokeWidth="1" />
        </g>

        {/* Front-Left Leg (Foreground) */}
        <g id="frontLegNear">
          <path
            d="M 166 108 Q 168 135 170 165 L 168 200 L 158 203 L 157 208 L 176 208 L 178 165 Q 180 135 178 110 Z"
            fill={`url(#donkeyCoat_${uid})`}
          />
          {/* Pale inner leg highlight */}
          <path d="M 170 118 Q 172 145 171 162" stroke="#EDE6DE" strokeWidth="2" fill="none" opacity="0.6" />
          {/* Dark Hoof */}
          <rect x="157" y="202" width="19" height="6" rx="1.5" fill="#24201C" />
          <path d="M 157 202 L 176 202" stroke="#423C36" strokeWidth="1" />
        </g>

        {/* ── NECK & SHORT BRISTLY MANE ── */}
        <g id="donkeyNeck">
          {/* Neck base */}
          <path
            d="M 160 102 L 186 64 L 206 72 L 182 114 Z"
            fill={`url(#donkeyCoat_${uid})`}
          />
          {/* Short upright black mane along the neck crest */}
          <path
            d="M 160 100 L 164 90 L 170 94 L 174 80 L 180 84 L 184 70 L 190 74 L 194 60 L 186 64 Z"
            fill="#1E1A16"
          />
        </g>

        {/* ── HEAD, LONG EARS & EXPRESSIVE MUZZLE ── */}
        <g
          id="donkeyHead"
          transform={isBraying ? "rotate(-8 186 64)" : "rotate(0 186 64)"}
        >
          {/* LONG EARS (Iconic Donkey Feature) */}
          <motion.g id="longEars" animate={getEarAnimation()} style={{ originX: "188px", originY: "46px" }}>
            {/* Back Ear */}
            <path
              d="M 178 48 Q 166 18 162 4 Q 174 8 184 32 Z"
              fill="#5E554C"
            />
            {/* Back ear tip dark */}
            <path d="M 162 4 Q 168 5 174 12 L 166 14 Z" fill="#24201C" />

            {/* Front Ear (Large, expressive) */}
            <path
              d="M 188 46 Q 182 14 180 2 Q 196 6 204 30 Z"
              fill={`url(#donkeyCoat_${uid})`}
            />
            {/* Front ear dark tip */}
            <path d="M 180 2 Q 188 3 194 10 L 186 12 Z" fill="#24201C" />
            {/* Front ear soft inner cream hair */}
            <path
              d="M 186 40 Q 184 18 183 10 Q 192 14 196 32 Z"
              fill="#EDE6DE"
              opacity="0.85"
            />
          </motion.g>

          {/* Head & Jowl */}
          <path
            d="M 180 50 Q 174 74 190 82 Q 212 84 218 72 L 210 50 Q 196 46 180 50 Z"
            fill={`url(#donkeyCoat_${uid})`}
          />

          {/* Forelock hair between ears */}
          <path d="M 186 46 L 190 38 L 194 45 L 198 39 L 200 46" stroke="#1E1A16" strokeWidth="2.5" strokeLinecap="round" />

          {/* Gentle, Large Dark Eye with White Eye Ring */}
          <ellipse cx="196" cy="58" rx="6.5" ry="5.5" fill="#EDE6DE" />
          <circle cx="197" cy="58" r="4" fill="#1C1814" />
          <circle cx="198" cy="57" r="1.2" fill="#FFFFFF" />

          {/* Pale Muzzle & Nostrils */}
          {isBraying ? (
            /* Open mouth braying "HEE-HAW!" */
            <g id="brayingMuzzle">
              <path
                d="M 210 52 L 236 58 Q 242 66 238 74 L 214 74 Z"
                fill={`url(#donkeyMuzzle_${uid})`}
              />
              {/* Open mouth cavity */}
              <path d="M 226 68 L 244 68 L 234 76 Z" fill="#3D1414" />
              {/* White donkey teeth */}
              <rect x="232" y="66" width="8" height="2.5" fill="#FFFFFF" />
              {/* Nostril flared */}
              <ellipse cx="234" cy="62" rx="3" ry="2" fill="#1F1A16" transform="rotate(-15 234 62)" />
              {/* Braying sound wave vibration marks */}
              <path d="M 246 58 Q 252 64 246 72" stroke="#8C8176" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 250 54 Q 258 64 250 76" stroke="#8C8176" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            /* Gentle closed white muzzle */
            <g id="closedMuzzle">
              <path
                d="M 210 52 L 234 58 Q 242 66 236 74 L 214 74 Z"
                fill={`url(#donkeyMuzzle_${uid})`}
              />
              {/* Dark soft nostril */}
              <ellipse cx="231" cy="63" rx="2.8" ry="1.8" fill="#241E1A" transform="rotate(-15 231 63)" />
              {/* Soft mouth line */}
              <path d="M 224 72 Q 232 73 236 71" stroke="#3D342C" strokeWidth="1.5" fill="none" />
            </g>
          )}
        </g>
      </svg>
    </motion.div>
  );
}
