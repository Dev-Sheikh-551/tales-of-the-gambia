"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface ChildFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * ChildFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Golden Palm and the Orphan Boy" (young Alieu)
 * and future Gambian folktales featuring children and young herders.
 *
 * Visual & Anatomical features:
 *   - Youthful child proportions (larger head-to-body ratio, slender herder limbs)
 *   - Earthy Gambian savanna attire: ochre/terracotta herder's tunic with warm trim
 *   - Carries a traditional polished water calabash gourd slung at his hip
 *   - Expressive youthful face with soft curls, warm eyes, and gentle hopeful expression
 *   - Responsive actions: standing/breathing, walking, offering water/gesturing, sad slump, joyful upright
 *   - Respects `isPaused` and `useReducedMotion()`
 */
export function ChildFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: ChildFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";
  const uid = React.useId().replace(/:/g, "_");

  // Pose classification
  const isWalking =
    action === "walk" ||
    action === "step" ||
    action === "approach" ||
    action === "enter-left" ||
    action === "enter-right";

  const isOffering =
    action === "gesture" ||
    action === "reach" ||
    action === "point" ||
    action === "wave";

  const isSad =
    action === "concern" ||
    action === "fear" ||
    action === "sadness" ||
    action === "crouch";

  const isJoyful =
    action === "joy" ||
    action === "triumphant" ||
    action === "surprise";

  // Body respiratory / movement animation
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        y: [0, -5, 0],
        rotate: [-1.5, 1.5, -1.5],
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isOffering) {
      return {
        y: [0, -2, 0],
        rotate: [0, -1, 0],
        transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Idle gentle breathing
    return {
      y: [0, -3, 0],
      transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // Arm offering / holding animation
  const getArmAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isOffering) {
      return {
        rotate: [-4, 6, -4],
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    if (isWalking) {
      return {
        rotate: [-12, 12, -12],
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-1, 2, -1],
      transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] ${className}`}
    >
      {/*
        ViewBox: 180 wide × 230 tall
        Child height is naturally more compact than adult silhouettes (~260px)
      */}
      <svg
        viewBox="0 0 180 230"
        className="w-40 h-52 sm:w-48 sm:h-60 md:w-56 md:h-72 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Skin tones */}
          <linearGradient id={`childSkin_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C532B" />
            <stop offset="60%" stopColor="#6E3E1C" />
            <stop offset="100%" stopColor="#522C11" />
          </linearGradient>

          {/* Tunic fabric gradient */}
          <linearGradient id={`childTunic_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D98236" />
            <stop offset="50%" stopColor="#B86622" />
            <stop offset="100%" stopColor="#8C4610" />
          </linearGradient>

          {/* Calabash canteen gradient */}
          <radialGradient id={`calabashGrad_${uid}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#F5D078" />
            <stop offset="50%" stopColor="#C99136" />
            <stop offset="100%" stopColor="#7A5016" />
          </radialGradient>

          {/* Golden blessing glow for joyful/offering state */}
          <filter id={`childGlow_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── GROUND CONTACT SHADOW ── */}
        <ellipse cx="90" cy="222" rx="42" ry="7" fill="#000000" opacity="0.45" />

        {/* ── BACK LEG (Right) ── */}
        <g id="backLeg">
          <path
            d="M 98 165 L 102 210 L 114 213 C 114 216 100 219 96 217 L 93 165 Z"
            fill={`url(#childSkin_${uid})`}
          />
        </g>

        {/* ── FRONT LEG (Left) ── */}
        <g id="frontLeg">
          <path
            d="M 76 165 L 74 212 L 87 215 C 87 218 72 221 68 219 L 71 165 Z"
            fill={`url(#childSkin_${uid})`}
          />
        </g>

        {/* ── HERDER TUNIC & BODY ── */}
        <g id="tunicBody">
          {/* Main sleeveless/short-sleeve tunic flared at hem */}
          <path
            d="M 68 85 Q 52 110 54 165 L 118 165 Q 120 110 106 85 Q 90 92 68 85 Z"
            fill={`url(#childTunic_${uid})`}
          />
          {/* Tunic hem decorative trim */}
          <path
            d="M 54 162 Q 86 167 118 162 L 118 166 Q 86 171 54 166 Z"
            fill="#F2C265"
            opacity="0.85"
          />
          {/* Tunic neckline split */}
          <path
            d="M 87 88 L 87 112"
            stroke="#522C11"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Woven braided waist cord */}
          <path
            d="M 58 135 Q 86 140 114 135"
            stroke="#F2C265"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Waist cord hanging tassel */}
          <path
            d="M 78 138 Q 76 150 74 156"
            stroke="#E0A340"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ── POLISHED WATER CALABASH (Sling Canteen) ── */}
        <g id="waterCalabash" transform="translate(62, 130) rotate(-12)">
          {/* Leather sling strap */}
          <path
            d="M -6 -48 Q 2 -10 12 10"
            stroke="#5C3317"
            strokeWidth="2"
            fill="none"
          />
          {/* Calabash bulbous bottom */}
          <ellipse cx="14" cy="16" rx="14" ry="16" fill={`url(#calabashGrad_${uid})`} />
          {/* Calabash neck */}
          <path
            d="M 10 2 Q 14 -4 18 2 L 16 7 L 12 7 Z"
            fill={`url(#calabashGrad_${uid})`}
          />
          {/* Wooden stopper plug */}
          <rect x="12" y="-4" width="4" height="6" rx="1.5" fill="#3D1D09" />
          {/* Polished gourd sheen */}
          <ellipse cx="11" cy="13" rx="4" ry="7" fill="#FFFFFF" opacity="0.35" />
        </g>

        {/* ── CHILD HEAD & HAIR ── */}
        <g id="childHead" transform={isSad ? "translate(0, 4) rotate(4 87 55)" : "rotate(-1 87 55)"}>
          {/* Slender neck */}
          <path
            d="M 80 75 L 80 88 Q 87 91 94 88 L 94 75 Z"
            fill={`url(#childSkin_${uid})`}
          />

          {/* Head & Jaw (Youthful curved jawline) */}
          <path
            d="M 68 55 C 68 36 104 36 106 55 C 107 72 96 82 87 82 C 78 82 68 72 68 55 Z"
            fill={`url(#childSkin_${uid})`}
          />

          {/* Child soft curled hair cap */}
          <path
            d="M 66 52 C 65 32 75 22 92 22 C 108 22 110 32 109 48 C 105 45 98 44 92 46 C 84 45 76 47 70 52 Z"
            fill="#1E140C"
          />
          {/* Hair texture curls */}
          <circle cx="76" cy="27" r="3.5" fill="#2E1C0F" />
          <circle cx="84" cy="24" r="3.5" fill="#2E1C0F" />
          <circle cx="93" cy="24" r="3.5" fill="#2E1C0F" />
          <circle cx="101" cy="28" r="3.5" fill="#2E1C0F" />
          <circle cx="71" cy="33" r="3" fill="#2E1C0F" />
          <circle cx="106" cy="35" r="3" fill="#2E1C0F" />

          {/* Left ear */}
          <ellipse cx="68" cy="56" rx="4.5" ry="6.5" fill={`url(#childSkin_${uid})`} />
          <path d="M 67 54 Q 69 56 67 58" stroke="#4A250D" strokeWidth="1.2" fill="none" />

          {/* Facial features (facing right-profile angled) */}
          {/* Brow line */}
          <path d="M 86 48 Q 94 47 98 50" stroke="#2B1608" strokeWidth="1.8" fill="none" />

          {/* Warm, hopeful eye */}
          <ellipse cx="93" cy="53" rx="3.5" ry="3" fill="#FFFFFF" />
          <circle cx="94" cy="53" r="2" fill="#3D1D09" />
          <circle cx="94.5" cy="52" r="0.8" fill="#FFFFFF" />

          {/* Gentle nose bridge */}
          <path
            d="M 98 52 Q 102 57 100 61 Q 97 61 96 61"
            stroke="#522C11"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Gentle mouth */}
          {isSad ? (
            <path d="M 93 69 Q 97 66 100 68" stroke="#421C06" strokeWidth="1.8" fill="none" />
          ) : isJoyful ? (
            <path d="M 92 67 Q 96 72 101 68" stroke="#421C06" strokeWidth="2" fill="none" />
          ) : (
            <path d="M 93 68 Q 97 70 100 68" stroke="#421C06" strokeWidth="1.6" fill="none" />
          )}
        </g>

        {/* ── ARMS & HANDS ── */}
        {/* Back Arm */}
        <g id="backArm">
          <path
            d="M 72 88 L 62 120 L 70 135 L 75 130 L 70 118 L 78 90 Z"
            fill={`url(#childSkin_${uid})`}
            opacity="0.85"
          />
        </g>

        {/* Front Offering Arm */}
        <motion.g id="frontArm" animate={getArmAnimation()} style={{ originX: "98px", originY: "88px" }}>
          {isOffering ? (
            /* Arm extended forward, palm open offering water */
            <g>
              {/* Upper arm forward */}
              <path
                d="M 98 88 L 126 104 L 146 108 L 148 114 L 122 113 L 94 96 Z"
                fill={`url(#childSkin_${uid})`}
              />
              {/* Cup/spoon of water in palm */}
              <ellipse cx="148" cy="107" rx="7" ry="4" fill="#C99136" />
              <ellipse cx="148" cy="106" rx="5.5" ry="2.5" fill="#75C7E6" opacity="0.85" />
              {/* Water droplet shine */}
              <circle cx="147" cy="105.5" r="1.2" fill="#FFFFFF" />
            </g>
          ) : (
            /* Arm resting naturally alongside tunic holding carved reed flute */
            <g>
              <path
                d="M 98 88 L 108 122 L 105 146 L 98 145 L 101 122 L 94 94 Z"
                fill={`url(#childSkin_${uid})`}
              />
              {/* Carved wooden herder flute */}
              <rect
                x="99"
                y="130"
                width="4"
                height="32"
                rx="1.5"
                transform="rotate(18 101 146)"
                fill="#C48E44"
              />
              {/* Flute sound holes */}
              <circle cx="106" cy="142" r="0.9" fill="#3D1D09" />
              <circle cx="108" cy="148" r="0.9" fill="#3D1D09" />
              <circle cx="110" cy="154" r="0.9" fill="#3D1D09" />
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
