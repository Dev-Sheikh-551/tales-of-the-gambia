"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EnvironmentMotion } from "@/types/story";
import { useDeviceMotionQuality, TIER_CONFIGS } from "@/lib/motion/deviceTier";

interface SceneAtmosphereProps {
  environmentMotion?: EnvironmentMotion;
  isPaused?: boolean;
}

export function SceneAtmosphere({
  environmentMotion,
  isPaused = false,
}: SceneAtmosphereProps) {
  const shouldReduceMotion = useReducedMotion();
  const quality = useDeviceMotionQuality();
  const tierConfig = TIER_CONFIGS[quality];

  if (shouldReduceMotion || !environmentMotion || environmentMotion.type === "none") {
    return null;
  }

  const {
    type,
    intensity = "standard",
    density = "normal",
    direction = "right",
    speed = "normal",
    opacity: customOpacity,
  } = environmentMotion;

  const isLowTier = quality === "low";
  const speedSec = speed === "fast" ? 0.7 : speed === "slow" ? 1.4 : 1.0;
  const intensityAlpha =
    customOpacity !== undefined
      ? customOpacity
      : intensity === "expressive"
      ? 1.2
      : intensity === "gentle"
      ? 0.8
      : intensity === "subtle"
      ? 0.6
      : 1.0;

  return (
    <div
      aria-hidden="true"
      style={{ opacity: Math.min(1.0, intensityAlpha) }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none"
    >
      {/* ──────────────── Wind / Harmattan Breeze ──────────────── */}
      {type === "wind" && (
        <div className="absolute inset-0">
          {/* Subtle horizontal Harmattan wind streaks */}
          <div
            className={`absolute top-1/4 -left-20 w-[120%] h-1 bg-gradient-to-r from-transparent via-[#E0AB3A]/15 to-transparent blur-[1px] transform -rotate-2 ${
              isPaused ? "opacity-30" : "animate-pulse"
            }`}
            style={{ animationDuration: "4s" }}
          />
          <div
            className={`absolute top-1/2 -left-10 w-[110%] h-1.5 bg-gradient-to-r from-transparent via-[#D9732B]/12 to-transparent blur-[1px] transform -rotate-1 ${
              isPaused ? "opacity-20" : "animate-pulse"
            }`}
            style={{ animationDuration: "5s" }}
          />

          {!isLowTier && (
            <>
              {/* Drifting grass / leaf SVG silhouette drifting horizontally */}
              <motion.div
                initial={{ x: "-10%", y: 0, opacity: 0 }}
                animate={
                  isPaused
                    ? { opacity: 0.2 }
                    : {
                        x: ["-10%", "110%"],
                        y: [0, 15, -10, 5],
                        opacity: [0, 0.4, 0.4, 0],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: isPaused ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/3 left-0 w-4 h-4 text-[#C69224]/30"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.5 0-4.5-2-4.5-4.5S10.5 7.5 13 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5z" opacity="0.5"/>
                </svg>
              </motion.div>
            </>
          )}
        </div>
      )}

      {/* ──────────────── Water / River Ripples ──────────────── */}
      {type === "river-ripples" && (
        <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden">
          {/* Base river water reflection gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#204953]/25 via-[#2E606A]/10 to-transparent ${
              isPaused ? "opacity-40" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.5s" }}
          />

          {/* Water caustic ripples */}
          <div className="absolute bottom-6 left-0 right-0 h-16 flex items-center justify-around opacity-40">
            <div
              className={`w-3/5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#87C3CE]/30 to-transparent ${
                isPaused ? "" : "animate-pulse"
              }`}
              style={{ animationDuration: "2.8s" }}
            />
            <div
              className={`w-2/5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#A8DCE5]/25 to-transparent ${
                isPaused ? "" : "animate-pulse"
              }`}
              style={{ animationDuration: "3.8s" }}
            />
          </div>

          {!isLowTier && (
            <motion.div
              animate={
                isPaused
                  ? { opacity: 0.1 }
                  : { opacity: [0.1, 0.3, 0.1], scaleY: [1, 1.2, 1] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-2 left-1/4 right-1/4 h-1 bg-[#87C3CE]/20 blur-sm rounded-full"
            />
          )}
        </div>
      )}

      {/* ──────────────── Fire / Hearth Flicker ──────────────── */}
      {type === "fire-flicker" && (
        <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none">
          {/* Main hearth radial warm aura */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-t from-[#D9732B]/20 via-[#C69224]/8 to-transparent blur-3xl ${
              isPaused ? "opacity-30" : "animate-pulse"
            }`}
            style={{ animationDuration: "2.2s" }}
          />

          {/* Rising ember particles (high/balanced tiers) */}
          {!isLowTier && (
            <div className="absolute bottom-8 left-1/3 w-28 h-40 overflow-hidden">
              <motion.div
                animate={
                  isPaused
                    ? { opacity: 0 }
                    : {
                        y: [40, -30],
                        x: [0, 8, -4, 4],
                        opacity: [0, 0.8, 0],
                        scale: [0.8, 1.2, 0.6],
                      }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute left-4 bottom-2 w-1.5 h-1.5 rounded-full bg-[#F2C765] shadow-sm shadow-[#D9732B]"
              />
              <motion.div
                animate={
                  isPaused
                    ? { opacity: 0 }
                    : {
                        y: [40, -40],
                        x: [4, -6, 2],
                        opacity: [0, 0.7, 0],
                      }
                }
                transition={{ duration: 3.1, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                className="absolute left-10 bottom-4 w-1 h-1 rounded-full bg-[#E0AB3A]"
              />
            </div>
          )}
        </div>
      )}

      {/* ──────────────── Night Stars & Moon Glow ──────────────── */}
      {type === "night-stars" && (
        <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden">
          {/* Lunar ambient haze */}
          <div className="absolute top-2 right-1/4 w-48 h-48 rounded-full bg-[#E8F4F8]/5 blur-3xl" />

          {/* Calibrated West African night constellations */}
          <div
            className={`absolute top-6 left-[18%] w-1.5 h-1.5 rounded-full bg-[#FEF9E7] shadow-sm shadow-[#FEF9E7] ${
              isPaused ? "opacity-70" : "animate-ping"
            }`}
            style={{ animationDuration: "4s" }}
          />
          <div
            className={`absolute top-12 left-[42%] w-1 h-1 rounded-full bg-[#FEF9E7] ${
              isPaused ? "opacity-60" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.2s" }}
          />
          <div
            className={`absolute top-8 right-[24%] w-1.5 h-1.5 rounded-full bg-[#FEF9E7] shadow-sm shadow-[#FEF9E7] ${
              isPaused ? "opacity-80" : "animate-ping"
            }`}
            style={{ animationDuration: "5s" }}
          />
          <div
            className={`absolute top-16 right-[38%] w-1 h-1 rounded-full bg-[#E8F4F8] ${
              isPaused ? "opacity-50" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.8s" }}
          />

          {!isLowTier && (
            <>
              <div
                className={`absolute top-24 left-[28%] w-1 h-1 rounded-full bg-[#FEF9E7]/80 ${
                  isPaused ? "opacity-40" : "animate-pulse"
                }`}
                style={{ animationDuration: "4.5s" }}
              />
              <div
                className={`absolute top-20 right-[15%] w-1 h-1 rounded-full bg-[#D9EAF0]/90 ${
                  isPaused ? "opacity-50" : "animate-ping"
                }`}
                style={{ animationDuration: "6s" }}
              />
            </>
          )}
        </div>
      )}

      {/* ──────────────── Heat Shimmer & Savanna Haze ──────────────── */}
      {type === "heat-shimmer" && (
        <div className="absolute inset-0">
          {/* Golden savanna horizon glow */}
          <div
            className={`absolute bottom-1/3 left-0 right-0 h-40 bg-gradient-to-t from-[#E0AB3A]/10 via-[#D9732B]/5 to-transparent blur-2xl ${
              isPaused ? "opacity-30" : "animate-pulse"
            }`}
            style={{ animationDuration: "3s" }}
          />
          {/* Shimmer wave effect */}
          {!isLowTier && (
            <motion.div
              animate={
                isPaused
                  ? { opacity: 0.1 }
                  : { opacity: [0.1, 0.25, 0.1], y: [0, -4, 0] }
              }
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#F2C765]/10 to-transparent blur-md transform -skew-y-1"
            />
          )}
        </div>
      )}

      {/* ──────────────── Rain & Atmospheric Droplets ──────────────── */}
      {type === "rain" && (
        <div className="absolute inset-0">
          {/* Rainy season atmospheric blue haze */}
          <div className="absolute inset-0 bg-[#16232B]/15" />

          {/* Diagonal rain streaks */}
          <div className="absolute inset-0 opacity-25">
            <div
              className={`w-full h-full bg-[radial-gradient(#87C3CE_1px,transparent_1px)] [background-size:24px_24px] ${
                isPaused ? "" : "animate-pulse"
              }`}
              style={{ animationDuration: "1.8s" }}
            />
          </div>

          {!isLowTier && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-around opacity-30">
              <div
                className={`w-6 h-1 rounded-full border border-[#87C3CE] ${
                  isPaused ? "hidden" : "animate-ping"
                }`}
                style={{ animationDuration: "2s" }}
              />
              <div
                className={`w-8 h-1 rounded-full border border-[#87C3CE] ${
                  isPaused ? "hidden" : "animate-ping"
                }`}
                style={{ animationDuration: "2.5s", animationDelay: "0.7s" }}
              />
            </div>
          )}
        </div>
      )}

      {/* ──────────────── Dust Particles ──────────────── */}
      {type === "dust-particles" && (
        <div className="absolute inset-0">
          <div
            className={`absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#E0AB3A]/30 ${
              isPaused ? "opacity-30" : "animate-pulse"
            }`}
            style={{ animationDuration: "2.5s" }}
          />
          <div
            className={`absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#D9732B]/25 ${
              isPaused ? "opacity-20" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.5s" }}
          />
          {!isLowTier && (
            <div
              className={`absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#F2C765]/25 ${
                isPaused ? "opacity-20" : "animate-pulse"
              }`}
              style={{ animationDuration: "4s" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
