"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SceneCharacter } from "@/types/story";

interface SceneCharacterLayerProps {
  characters?: SceneCharacter[];
  isPaused?: boolean;
}

export function SceneCharacterLayer({
  characters = [],
  isPaused = false,
}: SceneCharacterLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!characters || characters.length === 0) return null;

  // Responsive character positioning:
  // On mobile (< 640px) & tablet (640-1023px): Characters are positioned in the upper canvas
  // clear above the bottom caption card, scaled appropriately.
  // On desktop (>= 1024px / lg): Characters flank the centered caption card or, if centered,
  // sit elevated above the caption.
  const getPositionClasses = (pos: SceneCharacter["position"]) => {
    switch (pos) {
      case "far-left":
        return "left-2 sm:left-4 md:left-6 lg:left-8 xl:left-14 top-14 sm:top-16 md:top-20 lg:top-auto lg:bottom-24 xl:bottom-28";
      case "left":
        return "left-3 sm:left-6 md:left-10 lg:left-14 xl:left-24 top-14 sm:top-16 md:top-20 lg:top-auto lg:bottom-24 xl:bottom-28";
      case "center":
        return "left-1/2 -translate-x-1/2 top-14 sm:top-16 md:top-20 lg:top-auto lg:bottom-80 xl:bottom-[22rem]";
      case "right":
        return "right-3 sm:right-6 md:right-10 lg:right-14 xl:right-24 top-14 sm:top-16 md:top-20 lg:top-auto lg:bottom-24 xl:bottom-28";
      case "far-right":
        return "right-2 sm:right-4 md:right-6 lg:right-8 xl:right-14 top-14 sm:top-16 md:top-20 lg:top-auto lg:bottom-24 xl:bottom-28";
      default:
        return "left-1/2 -translate-x-1/2 top-14 sm:top-16 md:top-20 lg:top-auto lg:bottom-80 xl:bottom-[22rem]";
    }
  };

  // Event-driven character choreography: one-time entrance/reaction animation that cleanly settles.
  // CRITICAL: Strictly NO repeating loops, infinite breathing, pulsing, or floating.
  const getMotionVariants = (
    motionType?: SceneCharacter["motion"],
    motionConfig?: SceneCharacter["motionConfig"]
  ) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 },
      };
    }

    const delay = motionConfig?.delay || 0;
    const duration = motionConfig?.duration || 0.55;

    switch (motionType) {
      case "enter-left":
        return {
          initial: { opacity: 0, x: -25 },
          animate: { opacity: 1, x: 0 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "enter-right":
        return {
          initial: { opacity: 0, x: 25 },
          animate: { opacity: 1, x: 0 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "rise":
        return {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: duration * 1.1,
            delay,
            ease: [0.16, 1.0, 0.3, 1.0] as [number, number, number, number],
          },
        };

      case "reveal":
        return {
          initial: { opacity: 0, scale: 0.93 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "turn":
        return {
          initial: { opacity: 0, rotateY: 35 },
          animate: { opacity: 1, rotateY: 0 },
          transition: { duration: duration * 1.1, delay, ease: "easeOut" as const },
        };

      case "look":
        return {
          initial: { opacity: 0, rotate: -4 },
          animate: { opacity: 1, rotate: 0 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "step":
        return {
          initial: { opacity: 0, y: 14, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "gesture":
        return {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: [8, -3, 0] },
          transition: { duration: duration * 1.2, delay, ease: "easeInOut" as const },
        };

      case "react":
        return {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: [0.96, 1.03, 1] },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "exit-left":
        return {
          initial: { opacity: 1, x: 0 },
          animate: { opacity: 0, x: -35 },
          transition: { duration, delay, ease: "easeIn" as const },
        };

      case "exit-right":
        return {
          initial: { opacity: 1, x: 0 },
          animate: { opacity: 0, x: 35 },
          transition: { duration, delay, ease: "easeIn" as const },
        };

      case "fade":
      case "dissolve":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration, delay, ease: "easeOut" as const },
        };

      case "still":
      case "subtle-float":
      case "breathing":
      default:
        // Calm entrance, permanent dignified stillness
        return {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: "easeOut" as const },
        };
    }
  };

  const renderSilhouetteMotif = (theme?: SceneCharacter["avatarTheme"]) => {
    switch (theme) {
      case "elephant":
        return (
          <path
            d="M20,95 Q15,60 30,45 Q40,30 65,35 Q85,38 85,60 Q85,85 75,95 L65,95 L65,80 Q55,80 50,80 L50,95 Z"
            fill="#E5DAC6"
            opacity="0.85"
          />
        );
      case "tortoise":
        return (
          <path
            d="M15,95 Q25,60 50,60 Q75,60 85,95 Z M85,85 Q95,80 92,90 Z"
            fill="#97D6A7"
            opacity="0.85"
          />
        );
      case "griot":
        return (
          <g fill="#F2C765" opacity="0.9">
            {/* Griot head & turban */}
            <circle cx="50" cy="30" r="11" />
            <path d="M42,24 Q50,16 58,24 Q50,22 42,24 Z" fill="#E0AB3A" />
            {/* Seated torso */}
            <path d="M38,42 Q50,38 62,42 L66,76 Q50,80 34,76 Z" />
            {/* Kora neck and calabash body */}
            <line x1="56" y1="20" x2="56" y2="92" stroke="#E0AB3A" strokeWidth="3" />
            <ellipse cx="56" cy="80" rx="14" ry="12" fill="#D9732B" opacity="0.9" />
          </g>
        );
      case "boatman":
        return (
          <g fill="#A8D5E5" opacity="0.9">
            {/* Boatman figure */}
            <circle cx="50" cy="32" r="10" />
            <path d="M44,43 L56,43 L58,74 L42,74 Z" />
            {/* Pirogue boat base */}
            <path d="M12,85 Q50,96 88,85 Q50,102 12,85 Z" fill="#6A8D9D" />
            {/* Paddle */}
            <line x1="62" y1="24" x2="38" y2="96" stroke="#E0AB3A" strokeWidth="2.5" />
          </g>
        );
      case "shadow":
        return (
          <g fill="#D4AF37" opacity="0.85">
            {/* Mythical guardian / spirit silhouette */}
            <circle cx="50" cy="28" r="12" />
            <path d="M36,44 Q50,38 64,44 L70,88 Q50,94 30,88 Z" />
            {/* Radiating spirit aura */}
            <path d="M50,10 L50,16 M28,20 L33,24 M72,20 L67,24" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case "spider":
        return (
          <g fill="#E29E4B" opacity="0.9">
            {/* Anansi spider body */}
            <circle cx="50" cy="46" r="9" />
            <ellipse cx="50" cy="68" rx="15" ry="17" />
            {/* Spider legs */}
            <path d="M44,45 Q22,35 18,50 M56,45 Q78,35 82,50" stroke="#E29E4B" strokeWidth="2.5" fill="none" />
            <path d="M42,52 Q18,55 16,72 M58,52 Q82,55 84,72" stroke="#E29E4B" strokeWidth="2.5" fill="none" />
            <path d="M42,62 Q20,72 24,90 M58,62 Q80,72 76,90" stroke="#E29E4B" strokeWidth="2.5" fill="none" />
          </g>
        );
      case "pangolin":
        return (
          <g fill="#D7C4A5" opacity="0.9">
            {/* Curled pangolin body */}
            <ellipse cx="50" cy="62" rx="28" ry="20" />
            <circle cx="72" cy="54" r="9" />
            {/* Curved armored tail */}
            <path d="M24,62 Q18,80 34,88 Q20,80 26,62 Z" fill="#B39D7D" />
          </g>
        );
      default:
        // Hare / Savanna Animal Motif
        return (
          <g fill="#F2C765" opacity="0.9">
            {/* Long Hare Ears */}
            <ellipse cx="42" cy="22" rx="4" ry="16" transform="rotate(-10 42 22)" />
            <ellipse cx="58" cy="22" rx="4" ry="16" transform="rotate(10 58 22)" />
            {/* Head & Body */}
            <circle cx="50" cy="45" r="14" />
            <ellipse cx="50" cy="80" rx="18" ry="24" />
          </g>
        );
    }
  };

  // Character architectural placeholder avatar
  const renderCharacterVisual = (char: SceneCharacter) => {
    return (
      <div className="flex flex-col items-center select-none">
        {/* Architectural Silhouette Container */}
        <div className="relative w-[88px] sm:w-28 md:w-32 lg:w-36 h-28 sm:h-32 md:h-36 lg:h-48 rounded-2xl bg-gradient-to-t from-black/85 via-[#261E18]/75 to-[#382B22]/65 border border-[#D9732B]/35 shadow-2xl backdrop-blur-sm p-1.5 sm:p-2 flex flex-col items-center justify-between">
          {/* Subtle character aura glow (static, non-pulsing) */}
          <div className="absolute inset-0 rounded-2xl bg-radial from-[#E0AB3A]/10 to-transparent pointer-events-none" />

          {/* Top Identity Tag (stable, no pulsing dot) */}
          <div className="w-full flex items-center justify-between px-1 text-[9px] sm:text-[10px] text-[#AB9784] font-mono">
            <span className="truncate max-w-[62px] sm:max-w-[70px]">{char.expression || "active"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0AB3A]/60" />
          </div>

          {/* Stylized Silhouette Representation */}
          <div className="flex-1 flex items-center justify-center my-1 w-full">
            <svg
              viewBox="0 0 100 120"
              className="w-12 sm:w-16 md:w-20 lg:w-24 h-full drop-shadow-md text-[#F2C765]"
              fill="currentColor"
            >
              {renderSilhouetteMotif(char.avatarTheme)}
            </svg>
          </div>

          {/* Name Tag */}
          <div className="w-full text-center px-1 py-0.5 rounded bg-black/60 border border-white/10">
            <span className="font-story-serif text-[10px] sm:text-[11px] md:text-xs font-medium text-[#F7F3EB] truncate block px-0.5 leading-tight">
              {char.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {characters.map((char) => {
        const positionClass = getPositionClasses(char.position);
        const variants = getMotionVariants(char.motion, char.motionConfig);

        if (shouldReduceMotion) {
          return (
            <div key={char.id} className={`absolute ${positionClass}`}>
              {renderCharacterVisual(char)}
            </div>
          );
        }

        return (
          <motion.div
            key={char.id}
            initial={variants.initial}
            animate={variants.animate}
            transition={variants.transition}
            className={`absolute ${positionClass}`}
          >
            {renderCharacterVisual(char)}
          </motion.div>
        );
      })}
    </div>
  );
}
