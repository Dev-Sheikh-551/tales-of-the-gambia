"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ForegroundMotion } from "@/types/story";
import { useDeviceMotionQuality } from "@/lib/motion/deviceTier";
import { CINEMATIC_Z_INDEX } from "@/lib/motion/depth";

interface SceneForegroundProps {
  foregroundMotion?: ForegroundMotion;
  isPaused?: boolean;
  className?: string;
}

/**
 * Architectural foreground visual layer for Cinematic Mode.
 *
 * Sits at z-index 25 (between Characters z-20 and Caption z-30).
 * Elements are strictly anchored to the periphery (corners/edges) to guarantee
 * they never obscure narrative text, captions, or transport controls.
 */
export function SceneForeground({
  foregroundMotion,
  isPaused = false,
  className = "",
}: SceneForegroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const quality = useDeviceMotionQuality();

  if (
    shouldReduceMotion ||
    !foregroundMotion?.enabled ||
    foregroundMotion.type === "none" ||
    quality === "low"
  ) {
    return null;
  }

  const { type = "grass-silhouettes" } = foregroundMotion;
  const isHighTier = quality === "high";

  return (
    <div
      aria-hidden="true"
      style={{ zIndex: CINEMATIC_Z_INDEX.foreground }}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* ──────────────── Savanna Grass Silhouettes (Bottom Corners) ──────────────── */}
      {type === "grass-silhouettes" && (
        <>
          {/* Bottom-left grass blades — strictly off-center */}
          <div className="absolute -bottom-1 -left-2 w-32 sm:w-44 md:w-56 h-28 sm:h-36 opacity-75">
            <svg
              viewBox="0 0 160 120"
              fill="none"
              className="w-full h-full text-[#140F0B]"
            >
              {/* Outer tall curved grass */}
              <path
                d="M0,120 Q20,60 15,10 Q28,50 35,120 Z"
                fill="currentColor"
              />
              <path
                d="M15,120 Q40,40 50,0 Q52,50 48,120 Z"
                fill="#1C140E"
                opacity="0.9"
              />
              <path
                d="M30,120 Q65,65 80,30 Q75,75 60,120 Z"
                fill="currentColor"
              />
              <path
                d="M50,120 Q80,80 110,60 Q95,95 80,120 Z"
                fill="#1C140E"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Bottom-right grass blades — strictly off-center */}
          <div className="absolute -bottom-1 -right-2 w-32 sm:w-44 md:w-56 h-28 sm:h-36 opacity-75">
            <svg
              viewBox="0 0 160 120"
              fill="none"
              className="w-full h-full text-[#140F0B] transform -scale-x-100"
            >
              <path
                d="M0,120 Q20,60 15,10 Q28,50 35,120 Z"
                fill="currentColor"
              />
              <path
                d="M15,120 Q40,40 50,0 Q52,50 48,120 Z"
                fill="#1C140E"
                opacity="0.9"
              />
              <path
                d="M30,120 Q65,65 80,30 Q75,75 60,120 Z"
                fill="currentColor"
              />
              <path
                d="M50,120 Q80,80 110,60 Q95,95 80,120 Z"
                fill="#1C140E"
                opacity="0.8"
              />
            </svg>
          </div>
        </>
      )}

      {/* ──────────────── Baobab / Acacia Branches (Top Corners) ──────────────── */}
      {type === "branches" && (
        <>
          {/* Top-left canopy branch */}
          <div className="absolute -top-2 -left-2 w-48 sm:w-64 md:w-80 h-32 sm:h-44 opacity-80">
            <svg
              viewBox="0 0 200 120"
              fill="none"
              className="w-full h-full text-[#120D0A]"
            >
              <path
                d="M0,0 Q60,20 120,15 Q160,25 200,8 Q150,35 90,30 Q40,40 0,25 Z"
                fill="currentColor"
              />
              <ellipse cx="140" cy="18" rx="20" ry="10" fill="currentColor" opacity="0.9" />
              <ellipse cx="175" cy="12" rx="16" ry="8" fill="currentColor" opacity="0.9" />
              <ellipse cx="85" cy="32" rx="14" ry="7" fill="currentColor" opacity="0.8" />
            </svg>
          </div>

          {/* Top-right canopy branch */}
          <div className="absolute -top-2 -right-2 w-48 sm:w-64 md:w-80 h-32 sm:h-44 opacity-80">
            <svg
              viewBox="0 0 200 120"
              fill="none"
              className="w-full h-full text-[#120D0A] transform -scale-x-100"
            >
              <path
                d="M0,0 Q60,20 120,15 Q160,25 200,8 Q150,35 90,30 Q40,40 0,25 Z"
                fill="currentColor"
              />
              <ellipse cx="140" cy="18" rx="20" ry="10" fill="currentColor" opacity="0.9" />
              <ellipse cx="175" cy="12" rx="16" ry="8" fill="currentColor" opacity="0.9" />
            </svg>
          </div>
        </>
      )}

      {/* ──────────────── Bolong River Reeds (Bottom Edges) ──────────────── */}
      {type === "reeds" && (
        <>
          {/* Left river reeds */}
          <div className="absolute -bottom-2 left-0 w-28 sm:w-36 h-40 sm:h-52 opacity-70">
            <svg viewBox="0 0 100 160" fill="none" className="w-full h-full text-[#0D181D]">
              <path d="M10,160 Q25,80 18,10 Q28,70 30,160 Z" fill="currentColor" />
              <path d="M28,160 Q45,60 60,20 Q52,90 44,160 Z" fill="#15242B" />
              <circle cx="18" cy="12" r="3" fill="#D9732B" opacity="0.6" />
              <circle cx="60" cy="22" r="2.5" fill="#E0AB3A" opacity="0.6" />
            </svg>
          </div>

          {/* Right river reeds */}
          <div className="absolute -bottom-2 right-0 w-28 sm:w-36 h-40 sm:h-52 opacity-70">
            <svg viewBox="0 0 100 160" fill="none" className="w-full h-full text-[#0D181D] transform -scale-x-100">
              <path d="M10,160 Q25,80 18,10 Q28,70 30,160 Z" fill="currentColor" />
              <path d="M28,160 Q45,60 60,20 Q52,90 44,160 Z" fill="#15242B" />
            </svg>
          </div>
        </>
      )}

      {/* ──────────────── Floating Leaves (Upper Periphery) ──────────────── */}
      {type === "leaves" && isHighTier && (
        <div className="absolute top-8 left-6 right-6 h-28 pointer-events-none">
          <motion.div
            animate={
              isPaused
                ? { opacity: 0.3 }
                : {
                    x: [0, 20, 0],
                    y: [0, 8, 0],
                    rotate: [0, 6, 0],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-2 left-10 w-4 h-2 rounded-full bg-[#E0AB3A]/25 transform rotate-12"
          />
          <motion.div
            animate={
              isPaused
                ? { opacity: 0.2 }
                : {
                    x: [0, -15, 0],
                    y: [0, 10, 0],
                    rotate: [0, -8, 0],
                  }
            }
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-8 right-16 w-5 h-2.5 rounded-full bg-[#D9732B]/20 transform -rotate-12"
          />
        </div>
      )}

      {/* ──────────────── Soft Bokeh Light Orbs ──────────────── */}
      {type === "soft-light" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-12 w-24 sm:w-36 h-24 sm:h-36 rounded-full bg-radial from-[#F2C765]/12 to-transparent blur-xl" />
          <div className="absolute top-1/3 right-10 w-28 sm:w-40 h-28 sm:h-40 rounded-full bg-radial from-[#E0AB3A]/10 to-transparent blur-2xl" />
        </div>
      )}

      {/* ──────────────── Dust Drift ──────────────── */}
      {type === "dust-drift" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#E0AB3A]/25 blur-[0.5px]" />
          <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#D9732B]/20 blur-[0.5px]" />
        </div>
      )}
    </div>
  );
}
