"use client";

import React from "react";
import { motion } from "framer-motion";
import { CharacterActionType } from "@/types/engine";

interface KelefaSaaneFigureProps {
  action?: CharacterActionType;
  facing?: "left" | "right";
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export function KelefaSaaneFigure({
  action = "stand",
  facing = "right",
  scale = 1,
  isPaused = false,
  className = "",
}: KelefaSaaneFigureProps) {
  const isFlipped = facing === "left";

  return (
    <motion.div
      style={{
        transform: `scale(${scale}) ${isFlipped ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      className={`relative inline-block select-none filter drop-shadow-[0_14px_30px_rgba(0,0,0,0.65)] ${className}`}
    >
      <svg
        viewBox="0 0 220 260"
        className="w-48 h-56 sm:w-56 sm:h-68 md:w-68 md:h-80 overflow-visible"
      >
        <defs>
          <linearGradient id="kelefaIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2A4A" />
            <stop offset="50%" stopColor="#141B33" />
            <stop offset="100%" stopColor="#0B0F1C" />
          </linearGradient>
          <linearGradient id="shieldLeather" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E4424" />
            <stop offset="50%" stopColor="#9C6235" />
            <stop offset="100%" stopColor="#4A2E18" />
          </linearGradient>
          <linearGradient id="spearIron" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9E2E8" />
            <stop offset="100%" stopColor="#7E8B94" />
          </linearGradient>
        </defs>

        {/* Legs & Leather War Boots */}
        <rect x="75" y="180" width="22" height="65" rx="6" fill="#141B33" />
        <rect x="72" y="235" width="28" height="15" rx="5" fill="#543315" />

        <rect x="115" y="180" width="22" height="65" rx="6" fill="#141B33" />
        <rect x="112" y="235" width="28" height="15" rx="5" fill="#543315" />

        {/* Flowing War Sash (Wind-reactive) */}
        <motion.path
          d="M85,150 Q50,170 30,195 Q55,185 85,160 Z"
          fill="#D9732B"
          animate={isPaused ? {} : { rotate: [-4, 8, -4], scaleX: [1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "85px 150px" }}
        />

        {/* Warrior Torso & Indigo War Tunic */}
        <path
          d="M60,95 L150,95 L145,185 L65,185 Z"
          fill="url(#kelefaIndigo)"
          stroke="#0B0F1C"
          strokeWidth="2"
        />

        {/* Cowrie Shell War Ornamentation */}
        <g fill="#FFFDF5" stroke="#CFC3A5" strokeWidth="1">
          <ellipse cx="80" cy="115" rx="3.5" ry="5" />
          <ellipse cx="105" cy="115" rx="3.5" ry="5" />
          <ellipse cx="130" cy="115" rx="3.5" ry="5" />
          <ellipse cx="92" cy="135" rx="3.5" ry="5" />
          <ellipse cx="118" cy="135" rx="3.5" ry="5" />
          <ellipse cx="105" cy="155" rx="3.5" ry="5" />
        </g>

        {/* Griot Amulet Charm (Safay) */}
        <rect x="98" y="100" width="14" height="18" rx="3" fill="#A83224" stroke="#D9732B" strokeWidth="1.5" />

        {/* Warrior Head & Plumed Battle Cap */}
        <g transform="translate(105, 55)">
          {/* Neck */}
          <rect x="-10" y="15" width="20" height="25" fill="#6B3B1B" />
          {/* Head */}
          <ellipse cx="0" cy="10" rx="16" ry="18" fill="#6B3B1B" />
          {/* Resolute Facial Features */}
          <ellipse cx="7" cy="8" rx="3" ry="2" fill="#1A0D05" />
          <circle cx="8" cy="7.5" r="1" fill="#FFFFFF" />
          <path d="M2,4 Q8,1 14,4" stroke="#1A0D05" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M5,17 Q10,19 14,17" stroke="#3D210F" strokeWidth="2" fill="none" />

          {/* Kaabu Warrior Helmet / Cap */}
          <path d="M-18,6 Q0,-16 18,6 L16,-4 Q0,-22 -16,-4 Z" fill="#241B12" stroke="#543315" strokeWidth="1.5" />
          {/* Crimson Warrior Feather */}
          <motion.path
            d="M0,-16 Q-12,-42 -22,-36 Q-10,-30 0,-16"
            fill="#D9381E"
            animate={isPaused ? {} : { rotate: [-5, 6, -5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px -16px" }}
          />
        </g>

        {/* Curved Buffalo-Hide Shield (Held in Off-Hand) */}
        <g transform="translate(42, 105)">
          <ellipse cx="12" cy="45" rx="22" ry="55" fill="url(#shieldLeather)" stroke="#2B180D" strokeWidth="2.5" />
          {/* Shield Tribal Boss & Stitching */}
          <ellipse cx="12" cy="45" rx="8" ry="15" fill="#3D210F" />
          <line x1="12" y1="-5" x2="12" y2="95" stroke="#D9732B" strokeWidth="2" strokeDasharray="4,4" />
        </g>

        {/* Iron-Tipped Spear (Held in Main Hand) */}
        <motion.g
          animate={
            isPaused
              ? {}
              : action === "raise-hand"
              ? { y: [-15, 0, -15], rotate: [-4, 2, -4] }
              : { y: [-2, 2, -2] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "155px 140px" }}
        >
          {/* Hardwood Spear Shaft */}
          <line x1="155" y1="-25" x2="155" y2="245" stroke="#5C3617" strokeWidth="5" strokeLinecap="round" />
          {/* Iron Spearhead */}
          <polygon points="155,-55 145,-20 155,-25 165,-20" fill="url(#spearIron)" stroke="#4A5660" strokeWidth="1.5" />
          {/* Grip Hand */}
          <ellipse cx="155" cy="135" rx="7" ry="8" fill="#6B3B1B" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
