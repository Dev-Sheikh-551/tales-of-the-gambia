"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface CowFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

/**
 * CowFigure — illustrated SVG character for the Tales of The Gambia
 * cinematic storybook engine.
 *
 * Designed for: "The Cow, the Hyena, and the Shared Granary" (Mother Cow)
 * and any future story requiring a West African domestic bovine figure.
 *
 * Recognisable features:
 *   - Broad, rounded bovine head with distinct muzzle pad
 *   - Two gracefully curved horns (lyrate silhouette common in N'Dama/Zebu)
 *   - Large expressive eye with highlight
 *   - Sturdy rectangular body with gentle coat-gradient
 *   - Four stocky, pillar-like legs with small hooves
 *   - Natural dark-and-cream coat patches (piebald markings)
 *   - Long tail with animated tuft sway
 *   - Idle breathing bob, walk animation, and reaction poses
 *
 * Action mapping (CharacterActionType):
 *   stand / still / focus      → upright idle with gentle breathing sway
 *   walk / approach / step     → rocking locomotion
 *   look-left / look-right     → head turn
 *   gesture / react / surprise → subtle head-raise with tail flick
 *   fear / concern             → low head, tucked posture
 *   joy / triumphant           → raised head, energised tail sway
 *   all other actions          → graceful stand fallback
 */
export function CowFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: CowFigureProps) {
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
    action === "sit";

  const isAlert =
    action === "joy" ||
    action === "triumphant" ||
    action === "surprise" ||
    action === "react" ||
    action === "gesture";

  const isLookingLeft = action === "look-left";
  const isLookingRight = action === "look-right";

  // ── Body (whole-figure) animation ──────────────────────────────────────────
  const getBodyAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isWalking) {
      return {
        y: [0, -8, 0, -6, 0],
        x: isFlipped ? [14, -10] : [-14, 10],
        transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    // Default idle — slow breathing rise-and-fall
    return {
      y: [0, -5, 0],
      transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Head animation ─────────────────────────────────────────────────────────
  const getHeadAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isLowered) {
      return {
        rotate: isFlipped ? 12 : -12,
        y: 8,
        transition: { duration: 0.7, ease: "easeOut" as const },
      };
    }
    if (isAlert) {
      return {
        rotate: isFlipped ? -10 : 10,
        y: -8,
        transition: { duration: 0.6, ease: "easeOut" as const },
      };
    }
    if (isLookingLeft) {
      return { rotate: -14, transition: { duration: 0.5, ease: "easeOut" as const } };
    }
    if (isLookingRight) {
      return { rotate: 14, transition: { duration: 0.5, ease: "easeOut" as const } };
    }
    // Gentle idle head-bob
    return {
      rotate: [-2, 2, -2],
      y: [0, -3, 0],
      transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  };

  // ── Tail animation ─────────────────────────────────────────────────────────
  const getTailAnimation = () => {
    if (shouldReduceMotion || isPaused) return {};
    if (isAlert || isWalking) {
      return {
        rotate: [-8, 12, -8],
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
      };
    }
    return {
      rotate: [-4, 7, -4],
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
        Viewbox: 260 wide × 240 tall
        The cow faces right by default. `isFlipped` mirrors the whole SVG
        for the "left"-facing variant.
      */}
      <svg
        viewBox="0 0 260 240"
        className="w-52 h-48 sm:w-64 sm:h-60 md:w-80 md:h-72 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Main coat: warm cream-white */}
          <linearGradient id="cowCoat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE3CE" />
            <stop offset="50%" stopColor="#D9C9A8" />
            <stop offset="100%" stopColor="#C2B08A" />
          </linearGradient>

          {/* Dark patch colour (piebald) */}
          <linearGradient id="cowPatch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A3520" />
            <stop offset="100%" stopColor="#2E1F0E" />
          </linearGradient>

          {/* Muzzle / underbelly: softer pink-cream */}
          <linearGradient id="cowMuzzle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D9B8" />
            <stop offset="100%" stopColor="#E0B888" />
          </linearGradient>

          {/* Horn gradient: warm ivory */}
          <linearGradient id="cowHorn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0E6C0" />
            <stop offset="100%" stopColor="#C8AA60" />
          </linearGradient>

          {/* Hoof: dark */}
          <linearGradient id="cowHoof" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3A2A1A" />
            <stop offset="100%" stopColor="#1E1208" />
          </linearGradient>
        </defs>

        {/* ── Ground shadow ─────────────────────────────────────────────── */}
        <ellipse cx="122" cy="232" rx="90" ry="10" fill="rgba(0,0,0,0.35)" />

        {/* ── Back legs (drawn behind body) ─────────────────────────────── */}
        {/* Back-right (far) leg — slightly darker for depth */}
        <rect x="154" y="148" width="24" height="76" rx="8" fill="#A08858" />
        <rect x="152" y="216" width="28" height="14" rx="5" fill="url(#cowHoof)" />

        {/* Back-left (near) leg */}
        <rect x="68" y="148" width="24" height="76" rx="8" fill="#B89A6A" />
        <rect x="66" y="216" width="28" height="14" rx="5" fill="url(#cowHoof)" />

        {/* ── Tail (animated) ────────────────────────────────────────────── */}
        <motion.g
          animate={getTailAnimation()}
          style={{ transformOrigin: "50px 150px" }}
        >
          {/* Tail rope */}
          <path
            d="M50,150 Q28,172 22,200 Q18,220 28,230"
            stroke="#8A7050"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tuft at tip */}
          <ellipse cx="28" cy="232" rx="10" ry="6" fill="#4A3520" />
          <path
            d="M18,230 Q24,240 30,236 Q36,240 38,232"
            stroke="#4A3520"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* ── Main body ─────────────────────────────────────────────────── */}
        {/* Large rounded torso */}
        <path
          d="M50,155 C40,115 70,80 130,80 C185,80 215,115 215,158 C215,195 195,215 130,215 C68,215 55,195 50,155 Z"
          fill="url(#cowCoat)"
        />

        {/* Piebald patch — large dark marking on back/flank */}
        <path
          d="M95,88 C115,78 148,82 162,100 C172,114 168,135 148,138 C128,142 102,130 92,112 C84,98 86,90 95,88 Z"
          fill="url(#cowPatch)"
          opacity="0.88"
        />

        {/* Smaller patch on hip */}
        <path
          d="M162,150 C170,142 188,148 192,162 C195,174 183,184 172,180 C160,176 156,160 162,150 Z"
          fill="url(#cowPatch)"
          opacity="0.75"
        />

        {/* Underbelly — lighter cream */}
        <ellipse cx="130" cy="200" rx="60" ry="22" fill="#DDD0B0" opacity="0.7" />

        {/* Udder — small rounded shape under belly */}
        <ellipse cx="118" cy="212" rx="20" ry="10" fill="#F0CCAA" opacity="0.85" />
        {/* Teats */}
        <rect x="108" y="218" width="6" height="10" rx="3" fill="#E0A880" opacity="0.9" />
        <rect x="120" y="218" width="6" height="10" rx="3" fill="#E0A880" opacity="0.9" />

        {/* ── Front legs ────────────────────────────────────────────────── */}
        {/* Front-right (far) leg */}
        <rect x="158" y="155" width="24" height="72" rx="8" fill="#A08858" />
        <rect x="156" y="218" width="28" height="14" rx="5" fill="url(#cowHoof)" />

        {/* Front-left (near) leg */}
        <rect x="76" y="155" width="24" height="72" rx="8" fill="#C2A870" />
        <rect x="74" y="218" width="28" height="14" rx="5" fill="url(#cowHoof)" />

        {/* ── Neck ──────────────────────────────────────────────────────── */}
        <path
          d="M170,90 Q188,72 204,82 L198,104 Q182,100 172,112 Z"
          fill="url(#cowCoat)"
        />
        {/* Dewlap — loose throat skin typical of West African cattle */}
        <path
          d="M172,112 Q162,124 168,138 Q178,144 188,136 Q194,120 190,108 Z"
          fill="#D4C298"
          opacity="0.85"
        />

        {/* ── Head group (animated) ─────────────────────────────────────── */}
        <motion.g
          animate={getHeadAnimation()}
          style={{ transformOrigin: "200px 80px" }}
        >
          {/* Main head — broad, rounded bovine skull */}
          <ellipse cx="212" cy="72" rx="38" ry="34" fill="url(#cowCoat)" />

          {/* Forehead dark patch */}
          <ellipse cx="210" cy="56" rx="22" ry="14" fill="url(#cowPatch)" opacity="0.6" />

          {/* Left horn (further) — sweeps up and outward */}
          <path
            d="M192,44 Q185,20 200,10 Q210,6 208,22 Q204,36 196,44 Z"
            fill="url(#cowHorn)"
            stroke="#C8AA60"
            strokeWidth="1"
          />
          {/* Right horn (near) — mirrored arc */}
          <path
            d="M228,42 Q238,18 225,8 Q215,4 218,20 Q220,34 228,42 Z"
            fill="url(#cowHorn)"
            stroke="#C8AA60"
            strokeWidth="1"
          />

          {/* Ear — large, drooping typical of N'Dama cattle */}
          <ellipse
            cx="184"
            cy="72"
            rx="10"
            ry="18"
            fill="#C8A86A"
            transform="rotate(-20 184 72)"
          />
          {/* Inner ear */}
          <ellipse
            cx="184"
            cy="72"
            rx="5"
            ry="11"
            fill="#E8C898"
            opacity="0.7"
            transform="rotate(-20 184 72)"
          />

          {/* Muzzle — broad, prominent pad */}
          <ellipse cx="248" cy="78" rx="22" ry="18" fill="url(#cowMuzzle)" />
          {/* Muzzle highlight */}
          <ellipse cx="248" cy="76" rx="14" ry="10" fill="#F8E8CC" opacity="0.5" />
          {/* Nostrils */}
          <ellipse cx="241" cy="82" rx="5" ry="3.5" fill="#8A5A3A" opacity="0.9" />
          <ellipse cx="255" cy="82" rx="5" ry="3.5" fill="#8A5A3A" opacity="0.9" />

          {/* Mouth line */}
          <path
            d="M238,88 Q248,92 258,88"
            stroke="#8A5A3A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Eye — large, expressive bovine eye */}
          <ellipse cx="222" cy="70" rx="9" ry="8" fill="#1A0E04" />
          {/* Iris */}
          <ellipse cx="222" cy="70" rx="6" ry="5.5" fill="#5C3A18" />
          {/* Pupil */}
          <ellipse cx="222" cy="70" rx="3.5" ry="4" fill="#0A0602" />
          {/* Eye highlight */}
          <circle cx="219" cy="67" r="2.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="218" cy="66" r="1" fill="#F8E8CC" opacity="0.6" />

          {/* Eyelashes / brow line */}
          <path
            d="M214,63 Q222,59 230,63"
            stroke="#3A2A12"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
