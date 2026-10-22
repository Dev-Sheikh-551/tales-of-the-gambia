"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

export type HumanSilhouetteVariant = "default" | "warrior" | "hunter" | "spirit" | "ancestor";

interface HumanSilhouetteFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
  variant?: HumanSilhouetteVariant;
}

export function HumanSilhouetteFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
  variant = "default",
}: HumanSilhouetteFigureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFlipped = facing === "left";

  const isWalking = action === "walk" || action === "step" || action === "approach";
  const isReaching = action === "reach" || action === "gesture" || action === "point";
  const isRising = action === "rise";
  const isSpirit = variant === "spirit" || variant === "ancestor";
  const isWarrior = variant === "warrior";
  const isHunter = variant === "hunter";

  // Unique SVG element IDs to avoid collision
  const uid = React.useId().replace(/:/g, "_");

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter ${
        isSpirit
          ? "drop-shadow-[0_0_24px_rgba(235,190,90,0.6)]"
          : "drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
      } ${className}`}
    >
      <svg
        viewBox="0 0 220 260"
        className="w-48 h-56 sm:w-56 sm:h-68 md:w-68 md:h-80 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Main body tone - rich Senegambian earth / midnight silhouette */}
          <linearGradient id={`humanTone_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#382415" />
            <stop offset="50%" stopColor="#24160D" />
            <stop offset="100%" stopColor="#140C07" />
          </linearGradient>

          {/* Garment / Robe Gradient */}
          <linearGradient id={`garmentGrad_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            {isWarrior ? (
              <>
                <stop offset="0%" stopColor="#733816" />
                <stop offset="50%" stopColor="#4A210A" />
                <stop offset="100%" stopColor="#240E04" />
              </>
            ) : isHunter ? (
              <>
                <stop offset="0%" stopColor="#3D4B26" />
                <stop offset="50%" stopColor="#263116" />
                <stop offset="100%" stopColor="#131B0A" />
              </>
            ) : isSpirit ? (
              <>
                <stop offset="0%" stopColor="#9E782F" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#4A3B18" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#1A180E" stopOpacity="0.6" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#4E331E" />
                <stop offset="50%" stopColor="#301F12" />
                <stop offset="100%" stopColor="#1A1009" />
              </>
            )}
          </linearGradient>

          {/* Gold rim lighting accent */}
          <linearGradient id={`rimGold_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5C065" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E5A93C" stopOpacity="0" />
          </linearGradient>

          {/* Ethereal Spirit Aura */}
          {isSpirit && (
            <radialGradient id={`spiritGlow_${uid}`} cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#F5D77F" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#E5A93C" stopOpacity="0.3" />
              <stop offset="80%" stopColor="#B37C18" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          )}
        </defs>

        {/* Spirit / Ancestral Glow Aura */}
        {isSpirit && (
          <motion.g
            animate={
              isPaused || shouldReduceMotion
                ? {}
                : { scale: [0.96, 1.05, 0.96], opacity: [0.75, 1, 0.75] }
            }
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 120px" }}
          >
            <circle cx="110" cy="115" r="95" fill={`url(#spiritGlow_${uid})`} />
            <circle
              cx="110"
              cy="65"
              r="34"
              stroke="#FBE29D"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.6"
            />
          </motion.g>
        )}

        {/* Main Body Hierarchy */}
        <motion.g
          animate={
            isPaused || shouldReduceMotion
              ? {}
              : isSpirit
              ? { y: [-3, 3, -3] }
              : isRising
              ? { y: [8, 0], scaleY: [0.94, 1] }
              : { y: [-1.2, 1.2, -1.2] }
          }
          transition={{
            duration: isSpirit ? 4.2 : isRising ? 1.4 : 3.0,
            repeat: isRising ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "110px 240px" }}
        >
          {/* Back Leg */}
          <motion.g
            animate={
              isWalking && !isPaused && !shouldReduceMotion
                ? { rotate: [-12, 14, -12] }
                : {}
            }
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "125px 175px" }}
          >
            <path
              d="M120,175 L128,245 L118,248 L114,175 Z"
              fill={`url(#humanTone_${uid})`}
              opacity="0.85"
            />
            {/* Foot */}
            <path d="M116,244 L138,247 L136,252 L114,250 Z" fill="#140C07" />
          </motion.g>

          {/* Front Leg */}
          <motion.g
            animate={
              isWalking && !isPaused && !shouldReduceMotion
                ? { rotate: [14, -12, 14] }
                : {}
            }
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "95px 175px" }}
          >
            <path
              d="M90,175 L98,245 L88,248 L84,175 Z"
              fill={`url(#humanTone_${uid})`}
            />
            {/* Foot */}
            <path d="M86,244 L108,247 L106,252 L84,250 Z" fill="#140C07" />
          </motion.g>

          {/* Torso & Robe Silhouette */}
          <g>
            {/* Base Tunic / Robe Body */}
            <path
              d="M72,90 L148,90 L140,195 Q110,202 80,195 Z"
              fill={`url(#garmentGrad_${uid})`}
              stroke="#140C07"
              strokeWidth="1.5"
            />

            {/* Left Rim Light Edge Highlight */}
            <path
              d="M72,90 L79,195 Q90,198 80,195 L72,90 Z"
              fill={`url(#rimGold_${uid})`}
              opacity="0.8"
            />

            {/* Cultural Chest / Neck Embroidery or Sash */}
            {isWarrior ? (
              // Warrior Chest Sash & Amulet
              <g>
                <path
                  d="M80,90 L135,170 L125,175 L74,95 Z"
                  fill="#D9732B"
                  opacity="0.9"
                />
                <circle cx="106" cy="130" r="5" fill="#E5A93C" stroke="#7A3D0E" strokeWidth="1" />
              </g>
            ) : isHunter ? (
              // Hunter Strap / Quiver cross-body
              <g>
                <path
                  d="M136,92 L78,168 L72,164 L130,88 Z"
                  fill="#7A5222"
                  opacity="0.85"
                />
                {/* Slung shoulder horn / charm */}
                <ellipse cx="78" cy="166" rx="4" ry="7" fill="#C4924A" />
              </g>
            ) : isSpirit ? (
              // Mystic Chest Luminous Pattern
              <g>
                <path
                  d="M95,100 Q110,120 125,100 L110,135 Z"
                  fill="#F5D77F"
                  opacity="0.5"
                />
              </g>
            ) : (
              // Traditional Mandinka / Wolof Tunic Collar Fold
              <path
                d="M96,90 Q110,112 124,90 L120,120 Q110,130 100,120 Z"
                fill="#24160D"
                stroke="#E5A93C"
                strokeWidth="1"
              />
            )}
          </g>

          {/* Neck & Head */}
          <g>
            {/* Neck */}
            <rect
              x="103"
              y="74"
              width="14"
              height="20"
              rx="4"
              fill={`url(#humanTone_${uid})`}
            />

            {/* Head & Noble Silhouette Profile */}
            <motion.g
              animate={
                action === "look-up"
                  ? { rotate: -10, y: -2 }
                  : action === "react"
                  ? { rotate: 5, y: -1 }
                  : {}
              }
              style={{ transformOrigin: "110px 80px" }}
            >
              {/* Head Base */}
              <ellipse
                cx="110"
                cy="62"
                rx="15"
                ry="18"
                fill={`url(#humanTone_${uid})`}
              />

              {/* Headwrap / Cap / Crown */}
              {isWarrior ? (
                // Warrior Bound Headwrap / Band
                <path
                  d="M94,54 Q110,40 126,54 L125,62 Q110,50 95,62 Z"
                  fill="#D9732B"
                  stroke="#7A3D0E"
                  strokeWidth="1"
                />
              ) : isHunter ? (
                // Hunter Leather Cap
                <path
                  d="M95,56 Q110,42 125,56 L124,64 Q110,54 96,64 Z"
                  fill="#543A18"
                />
              ) : isSpirit ? (
                // Ethereal crown of soft light
                <ellipse
                  cx="110"
                  cy="46"
                  rx="14"
                  ry="4"
                  fill="#FBE29D"
                  opacity="0.8"
                />
              ) : (
                // Traditional Kofia / Folded Cap
                <path
                  d="M96,56 Q110,46 124,56 L123,63 Q110,55 97,63 Z"
                  fill="#1C1008"
                  stroke="#E5A93C"
                  strokeWidth="0.8"
                />
              )}

              {/* Dignified Facial Profile Details */}
              <ellipse cx="119" cy="61" rx="2.2" ry="1.8" fill="#140C07" />
              <circle cx="120" cy="60.5" r="0.7" fill="#FFFFFF" opacity="0.9" />
              {/* Brow */}
              <path
                d="M115,57 Q120,55 124,57"
                stroke="#140C07"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Jaw & Chin Line */}
              <path
                d="M116,72 Q122,74 125,68"
                stroke="#140C07"
                strokeWidth="1.2"
                fill="none"
              />
            </motion.g>
          </g>

          {/* Left / Back Arm */}
          <motion.g
            animate={
              isWalking && !isPaused && !shouldReduceMotion
                ? { rotate: [12, -10, 12] }
                : {}
            }
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "80px 98px" }}
          >
            <path
              d="M76,96 L68,142 L77,144 L84,98 Z"
              fill={`url(#humanTone_${uid})`}
              opacity="0.75"
            />
          </motion.g>

          {/* Right / Front Arm (Expressive & Action Responsive) */}
          <motion.g
            animate={
              isReaching
                ? { rotate: -42, x: 8, y: -10 }
                : isWalking && !isPaused && !shouldReduceMotion
                ? { rotate: [-14, 12, -14] }
                : { rotate: [0, 2, 0] }
            }
            transition={{
              duration: isReaching ? 0.8 : 1.1,
              repeat: isReaching ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "140px 98px" }}
          >
            {/* Upper Arm & Forearm */}
            <path
              d="M138,96 L148,142 L139,144 L130,98 Z"
              fill={`url(#humanTone_${uid})`}
            />
            {/* Hand */}
            <path
              d="M144,142 Q152,154 148,158 Q140,158 139,144 Z"
              fill={`url(#humanTone_${uid})`}
            />

            {/* Hunter Bow / Staff Silhouette when Hunter */}
            {isHunter && (
              <path
                d="M148,70 Q155,130 146,190"
                stroke="#6B4423"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </motion.g>
        </motion.g>
      </svg>
    </motion.div>
  );
}
