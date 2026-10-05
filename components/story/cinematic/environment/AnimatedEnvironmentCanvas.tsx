"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SceneVisual, EnvironmentMotion } from "@/types/story";
import { DeviceQualityTier } from "@/lib/motion/deviceTier";
import { LottieAnimation } from "@/components/motion/LottieAnimation";
import { resolveAnimationAsset } from "@/lib/animations/registry";

interface AnimatedEnvironmentCanvasProps {
  visual?: SceneVisual;
  environmentMotion?: EnvironmentMotion;
  isPaused?: boolean;
  qualityTier?: DeviceQualityTier;
  className?: string;
}

export function AnimatedEnvironmentCanvas({
  visual,
  environmentMotion,
  isPaused = false,
  qualityTier = "high",
  className = "",
}: AnimatedEnvironmentCanvasProps) {
  const shouldReduceMotion = useReducedMotion();
  const theme = visual?.paletteTheme || "ochre";
  const envType = environmentMotion?.type || "wind";

  const isLowTier = qualityTier === "low" || shouldReduceMotion;

  // Resolve active storytelling Lotties
  const birdsAsset = !isLowTier ? resolveAnimationAsset("birds-flight", qualityTier) : null;
  const rippleAsset = !isLowTier ? resolveAnimationAsset("water-ripple", qualityTier) : null;
  const fireAsset = !isLowTier ? resolveAnimationAsset("fire-flames", qualityTier) : null;
  const starsAsset = !isLowTier ? resolveAnimationAsset("night-stars", qualityTier) : null;
  const dustAsset = !isLowTier ? resolveAnimationAsset("dust-swirl", qualityTier) : null;
  const magicAsset = !isLowTier ? resolveAnimationAsset("magic-aura", qualityTier) : null;

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden select-none ${className}`}>
      {/* ========================================================
          1. SKY & CELESTIAL BACKGROUND LAYER
         ======================================================== */}
      {theme === "river" ? (
        // River / Bolong Night & Twilight Palette
        <div className="absolute inset-0 bg-gradient-to-b from-[#061417] via-[#0D2428] to-[#08181B]" />
      ) : theme === "gold" ? (
        // Golden Kaabu Sunset Palette
        <div className="absolute inset-0 bg-gradient-to-b from-[#240F00] via-[#5C2E05] to-[#1C120B]" />
      ) : theme === "earth" ? (
        // Deep Earth Dusk Palette
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B170B] via-[#4A2814] to-[#17100B]" />
      ) : (
        // Savanna Midday / Harmattan Scorching Sun Palette
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A1D08] via-[#8C3A12] to-[#2B1408]" />
      )}

      {/* Radiant Sun / Moon */}
      {theme === "river" ? (
        // Luminous River Moon
        <div className="absolute top-12 left-1/4 -translate-x-1/2 pointer-events-none">
          <motion.div
            animate={
              isPaused || shouldReduceMotion
                ? {}
                : { scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#9ED8DB] via-[#DCF6F7] to-[#FFFFFF] opacity-90 blur-[1px] shadow-[0_0_50px_rgba(158,216,219,0.4)]"
          />
        </div>
      ) : (
        // Scorching Copper Sun (Scene 1 & Savanna)
        <div className="absolute top-10 sm:top-14 right-1/4 translate-x-1/2 pointer-events-none">
          {/* Outer Sun Corona */}
          <motion.div
            animate={
              isPaused || shouldReduceMotion
                ? {}
                : { scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }
            }
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-[#F5A623] via-[#E29E4B] to-transparent blur-2xl"
          />
          {/* Inner Copper Calabash Sun Disc */}
          <div className="absolute inset-0 m-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#FFF5DB] via-[#F2C765] to-[#D9732B] shadow-[0_0_40px_rgba(242,199,101,0.6)]" />
        </div>
      )}

      {/* Savanna Birds Gliding Across Sky */}
      {birdsAsset && (theme === "ochre" || theme === "gold" || envType === "wind") && (
        <div className="absolute top-8 sm:top-14 left-1/3 w-36 h-20 sm:w-48 sm:h-24 pointer-events-none opacity-80">
          <LottieAnimation
            src={birdsAsset.src}
            speed={birdsAsset.defaultSpeed}
            loop={birdsAsset.defaultLoop}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Twinkling Night Stars in Nocturnal & River Scenes */}
      {starsAsset && (theme === "river" || envType === "night-stars") && (
        <div className="absolute top-6 left-12 w-40 h-28 pointer-events-none opacity-85">
          <LottieAnimation
            src={starsAsset.src}
            speed={starsAsset.defaultSpeed}
            loop={starsAsset.defaultLoop}
            className="w-full h-full"
          />
        </div>
      )}

      {/* ========================================================
          2. DISTANT ROLLING SAVANNA / MANGROVE RIDGES
         ======================================================== */}
      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        preserveAspectRatio="none"
      >
        {theme === "river" ? (
          // Mangrove shoreline ridges
          <g opacity="0.65">
            <path
              d="M0,380 Q300,340 600,370 T1200,350 L1200,600 L0,600 Z"
              fill="#061B1E"
            />
            <path
              d="M0,430 Q400,390 800,420 T1200,410 L1200,600 L0,600 Z"
              fill="#041214"
            />
          </g>
        ) : (
          // Savanna horizon hills
          <g opacity="0.6">
            <path
              d="M0,360 Q350,320 700,350 T1200,330 L1200,600 L0,600 Z"
              fill="#2A1408"
            />
            <path
              d="M0,410 Q450,370 900,400 T1200,390 L1200,600 L0,600 Z"
              fill="#1F0E05"
            />
          </g>
        )}
      </svg>

      {/* ========================================================
          3. LIVING MIDGROUND: SILK COTTON (BANTABA) TREE
         ======================================================== */}
      {theme !== "river" && (
        <div className="absolute inset-0 pointer-events-none">
          <svg
            viewBox="0 0 1000 600"
            className="absolute inset-0 w-full h-full object-cover overflow-visible"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Tree Trunk & Roots */}
            <path
              d="M320,600 L340,380 Q320,320 280,260 Q340,290 380,350 Q420,290 480,250 Q430,320 420,380 L440,600 Z"
              fill="#180C05"
            />
            {/* Spreading Buttress Roots */}
            <path
              d="M260,600 Q320,530 330,460 L350,460 Q340,540 280,600 Z"
              fill="#120904"
            />
            <path
              d="M480,600 Q430,540 425,470 L405,470 Q415,530 460,600 Z"
              fill="#120904"
            />

            {/* Swaying Foliage Crown (Harmattan wind reactive) */}
            <motion.g
              animate={
                isPaused || shouldReduceMotion
                  ? {}
                  : { rotate: [-1.5, 1.8, -1.5], x: [-3, 3, -3] }
              }
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "380px 320px" }}
            >
              {/* Massive Spreading Canopies */}
              <circle cx="280" cy="220" r="70" fill="#140A04" opacity="0.95" />
              <circle cx="380" cy="180" r="90" fill="#120904" opacity="0.98" />
              <circle cx="480" cy="210" r="75" fill="#140A04" opacity="0.95" />
              <circle cx="340" cy="240" r="60" fill="#100803" />
              <circle cx="430" cy="230" r="65" fill="#100803" />
            </motion.g>
          </svg>
        </div>
      )}

      {/* ========================================================
          4. RIVER WATER & WAVES (For River / Ninki Nanka Scenes)
         ======================================================== */}
      {theme === "river" && (
        <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 pointer-events-none overflow-hidden">
          {/* Dark Water Bed */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041012] via-[#091E22] to-transparent opacity-95" />

          {/* Animated Water Ripples (Lottie) */}
          {rippleAsset && (
            <div className="absolute bottom-10 left-1/4 w-60 h-28 opacity-75">
              <LottieAnimation
                src={rippleAsset.src}
                speed={rippleAsset.defaultSpeed}
                loop={rippleAsset.defaultLoop}
                className="w-full h-full"
              />
            </div>
          )}

          {/* Supernatural Jade Magic Aura for Ninki Nanka */}
          {magicAsset && (
            <div className="absolute bottom-12 right-1/4 w-72 h-40 opacity-80">
              <LottieAnimation
                src={magicAsset.src}
                speed={magicAsset.defaultSpeed}
                loop={magicAsset.defaultLoop}
                className="w-full h-full"
              />
            </div>
          )}

          {/* Undulating River Current Lines */}
          <svg
            viewBox="0 0 1000 120"
            className="absolute bottom-0 w-full h-24 sm:h-32 object-cover opacity-60"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,30 Q250,10 500,30 T1000,30 L1000,120 L0,120 Z"
              fill="#062024"
              animate={isPaused || shouldReduceMotion ? {} : { x: [-30, 30, -30] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,60 Q250,45 500,60 T1000,60 L1000,120 L0,120 Z"
              fill="#041619"
              animate={isPaused || shouldReduceMotion ? {} : { x: [25, -25, 25] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      )}

      {/* ========================================================
          5. CAMPFIRE FLAMES & DUST STORMS (For Fable & Epic Scenes)
         ======================================================== */}
      {fireAsset && (envType === "fire-flicker" || theme === "gold") && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-32 h-40 pointer-events-none opacity-90">
          <LottieAnimation
            src={fireAsset.src}
            speed={fireAsset.defaultSpeed}
            loop={fireAsset.defaultLoop}
            className="w-full h-full"
          />
        </div>
      )}

      {dustAsset && (envType === "dust-particles" || envType === "wind") && (
        <div className="absolute bottom-32 right-12 w-44 h-44 pointer-events-none opacity-70">
          <LottieAnimation
            src={dustAsset.src}
            speed={dustAsset.defaultSpeed}
            loop={dustAsset.defaultLoop}
            className="w-full h-full"
          />
        </div>
      )}

      {/* ========================================================
          6. LIVING FOREGROUND: SWAYING REEDS / SAVANNA GRASS
         ======================================================== */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1000 120"
          className="absolute bottom-0 w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Dense Foreground Grass Blades */}
          <motion.g
            animate={
              isPaused || shouldReduceMotion
                ? {}
                : { skewX: [-2.5, 3, -2.5], x: [-4, 4, -4] }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom center" }}
          >
            {/* Clump 1 (Left) */}
            <path
              d="M10,120 Q20,60 35,40 Q25,80 30,120 M40,120 Q55,50 75,30 Q60,75 65,120 M70,120 Q85,70 105,50 Q90,85 95,120"
              stroke="#0C0704"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Clump 2 (Center) */}
            <path
              d="M480,120 Q495,65 520,35 Q505,80 510,120 M520,120 Q540,55 565,25 Q545,75 550,120 M560,120 Q575,70 600,45 Q585,85 590,120"
              stroke="#0C0704"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Clump 3 (Right) */}
            <path
              d="M890,120 Q910,60 935,35 Q920,80 925,120 M935,120 Q955,50 975,20 Q960,70 965,120"
              stroke="#0C0704"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>
        </svg>
      </div>

      {/* Cinematic Edge Vignette to preserve caption contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
