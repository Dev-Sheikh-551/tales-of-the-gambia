"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface HareFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  activeProps?: string[];
  isPaused?: boolean;
  className?: string;
}

export function HareFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  activeProps = [],
  isPaused = false,
  className = "",
}: HareFigureProps) {
  const isFlipped = facing === "left";
  const hasCalabash = activeProps.includes("calabash") || action === "retreat";
  const hasPalmFrond = activeProps.includes("palm-frond") || action === "recline" || action === "fanning";

  // Action-specific motion configurations
  const getAnimation = () => {
    switch (action) {
      case "walk":
      case "approach":
        return {
          y: [0, -18, 0, -12, 0],
          x: isFlipped ? [20, -15] : [-20, 15],
          transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
        };
      case "recline":
      case "fanning":
        return {
          rotate: isFlipped ? -25 : 25,
          y: 20,
          transition: { duration: 0.8, ease: "easeOut" as const },
        };
      case "cunning-look":
        return {
          rotate: isFlipped ? 6 : -6,
          y: -4,
          transition: { duration: 0.6, ease: "easeOut" as const },
        };
      case "mock":
      case "point":
        return {
          y: [0, -8, 0, -6, 0],
          rotate: isFlipped ? [-3, 3, -3] : [3, -3, 3],
          transition: { duration: 0.9, repeat: 2, ease: "easeInOut" as const },
        };
      case "retreat":
      case "exit-left":
        return {
          x: isFlipped ? -80 : 80,
          opacity: [1, 1, 0.4],
          transition: { duration: 2.2, ease: "easeIn" as const },
        };
      case "jump":
        return {
          y: [0, -45, 0],
          scale: [1, 1.08, 0.95, 1],
          transition: { duration: 0.7, ease: "easeOut" as const },
        };
      case "stand":
      default:
        return {
          y: 0,
          scale: 1,
          transition: { duration: 0.4 },
        };
    }
  };

  return (
    <motion.div
      animate={isPaused ? undefined : getAnimation()}
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] ${className}`}
    >
      <svg
        viewBox="0 0 160 220"
        className="w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64 overflow-visible"
      >
        <defs>
          <linearGradient id="hareFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#E5A93C" />
            <stop offset="100%" stopColor="#C47D1C" />
          </linearGradient>
          <linearGradient id="hareInnerEar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9A8A8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D9732B" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Back Leg & Foot */}
        <motion.ellipse
          cx="52"
          cy="185"
          rx="24"
          ry="14"
          fill="#B56E14"
          animate={action === "walk" ? { rotate: [-10, 15, -10] } : {}}
          transition={{ duration: 0.6, repeat: Infinity }}
        />

        {/* Fluffy Tail */}
        <motion.circle
          cx="30"
          cy="158"
          r="13"
          fill="#FFF3D6"
          animate={action === "cunning-look" || action === "mock" ? { x: [-2, 3, -2] } : {}}
          transition={{ duration: 0.3, repeat: 4 }}
        />

        {/* Main Body */}
        <ellipse cx="78" cy="148" rx="38" ry="46" fill="url(#hareFur)" />
        {/* Lighter Belly */}
        <ellipse cx="88" cy="150" rx="20" ry="32" fill="#FFF3D6" opacity="0.85" />

        {/* Reclining Log (when in recline pose) */}
        {action === "recline" && (
          <path
            d="M-20,195 Q80,185 180,195 L175,215 Q80,205 -20,215 Z"
            fill="#4A2E1B"
            stroke="#2B180D"
            strokeWidth="3"
          />
        )}

        {/* Head Group */}
        <motion.g
          animate={
            action === "cunning-look"
              ? { rotate: [-4, 6, -4] }
              : action === "mock"
              ? { rotate: [4, -4, 4] }
              : {}
          }
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ transformOrigin: "80px 85px" }}
        >
          {/* Back Ear */}
          <motion.g
            animate={action === "cunning-look" ? { rotate: [-12, 5, -12] } : { rotate: [-5, 5, -5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "68px 55px" }}
          >
            <path
              d="M68,55 C60,20 50,-10 64,-20 C76,-10 76,20 72,55 Z"
              fill="#D48624"
            />
            <path
              d="M66,45 C62,20 56,0 65,-10 C70,0 72,20 70,45 Z"
              fill="url(#hareInnerEar)"
            />
          </motion.g>

          {/* Front Ear */}
          <motion.g
            animate={
              action === "retreat"
                ? { rotate: 45, y: 15 } // drooped in disappointment
                : action === "cunning-look"
                ? { rotate: [10, -5, 10] }
                : { rotate: [5, -5, 5] }
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "90px 52px" }}
          >
            <path
              d="M88,52 C84,18 80,-15 96,-25 C108,-12 102,18 96,52 Z"
              fill="url(#hareFur)"
            />
            <path
              d="M90,42 C88,18 86,-5 96,-15 C102,-5 100,18 96,42 Z"
              fill="url(#hareInnerEar)"
            />
          </motion.g>

          {/* Head Base */}
          <circle cx="86" cy="80" r="28" fill="url(#hareFur)" />
          {/* Cheeks */}
          <ellipse cx="100" cy="90" rx="14" ry="11" fill="#FFF3D6" opacity="0.9" />

          {/* Eye */}
          <ellipse cx="92" cy="74" rx="5.5" ry="7" fill="#241406" />
          <circle cx="94" cy="72" r="2.2" fill="#FFFFFF" />
          {/* Cunning Eyebrow */}
          <path
            d={action === "cunning-look" || action === "mock" ? "M84,65 Q92,62 100,67" : "M85,67 Q92,63 98,66"}
            stroke="#4A2606"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Nose & Whiskers */}
          <polygon points="108,86 114,84 112,90" fill="#994D14" />
          {/* Upper Whiskers */}
          <path d="M106,87 Q130,82 142,85" stroke="#FFF7E6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M106,90 Q128,93 140,99" stroke="#FFF7E6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Smug Smile */}
          <path
            d={action === "mock" || action === "cunning-look" ? "M102,94 Q108,102 114,95" : "M104,95 Q108,98 112,95"}
            stroke="#4A2606"
            strokeWidth="2"
            fill="none"
          />
        </motion.g>

        {/* Front Paw / Arm */}
        <motion.g
          animate={
            hasPalmFrond
              ? { rotate: [-18, 18, -18] } // fanning motion
              : action === "mock" || action === "point"
              ? { rotate: [-20, 5, -20] }
              : {}
          }
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "90px 130px" }}
        >
          <path
            d="M92,126 Q115,135 125,142 Q118,150 102,142 Q92,138 90,132 Z"
            fill="url(#hareFur)"
          />

          {/* Palm Frond Prop */}
          {hasPalmFrond && (
            <g transform="translate(118, 110) rotate(-25)">
              <line x1="0" y1="30" x2="35" y2="-15" stroke="#7A9A3C" strokeWidth="3" />
              <path
                d="M10,20 Q35,-5 50,-20 Q40,10 20,25 Z"
                fill="#8CB344"
                opacity="0.9"
              />
            </g>
          )}

          {/* Empty Calabash Prop (Scene 6) */}
          {hasCalabash && (
            <g transform="translate(105, 140)">
              <ellipse cx="14" cy="18" rx="14" ry="16" fill="#B3621B" stroke="#66340B" strokeWidth="2" />
              <path d="M6,6 Q14,0 22,6 L20,12 L8,12 Z" fill="#944D12" />
            </g>
          )}
        </motion.g>

        {/* Front Foot */}
        <ellipse cx="106" cy="195" rx="20" ry="11" fill="url(#hareFur)" />
      </svg>
    </motion.div>
  );
}
