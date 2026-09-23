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

  // Horizontal position styles for desktop and mobile
  const getPositionClasses = (pos: SceneCharacter["position"]) => {
    switch (pos) {
      case "far-left":
        return "left-4 sm:left-8 md:left-12 bottom-32 sm:bottom-36 md:bottom-40";
      case "left":
        return "left-10 sm:left-20 md:left-28 bottom-32 sm:bottom-36 md:bottom-40";
      case "center":
        return "left-1/2 -translate-x-1/2 bottom-32 sm:bottom-36 md:bottom-40";
      case "right":
        return "right-10 sm:right-20 md:right-28 bottom-32 sm:bottom-36 md:bottom-40";
      case "far-right":
        return "right-4 sm:right-8 md:right-12 bottom-32 sm:bottom-36 md:bottom-40";
      default:
        return "left-1/2 -translate-x-1/2 bottom-32 sm:bottom-36 md:bottom-40";
    }
  };

  // Character architectural placeholder avatar
  const renderCharacterVisual = (char: SceneCharacter) => {
    return (
      <div className="flex flex-col items-center group select-none">
        {/* Architectural Placeholder Silhouette Container */}
        <div className="relative w-20 sm:w-28 md:w-36 h-28 sm:h-36 md:h-48 rounded-2xl bg-gradient-to-t from-black/80 via-[#261E18]/70 to-[#382B22]/60 border border-[#D9732B]/30 shadow-2xl backdrop-blur-sm p-2 flex flex-col items-center justify-between">
          {/* Subtle character aura glow */}
          <div className="absolute inset-0 rounded-2xl bg-radial from-[#E0AB3A]/10 to-transparent pointer-events-none" />

          {/* Top Identity Tag */}
          <div className="w-full flex items-center justify-between px-1 text-[9px] sm:text-[10px] text-[#AB9784] font-mono">
            <span className="truncate max-w-[60px]">{char.expression || "active"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0AB3A] animate-pulse" />
          </div>

          {/* Stylized Silhouette Representation */}
          <div className="flex-1 flex items-center justify-center my-1">
            <svg
              viewBox="0 0 100 120"
              className="w-14 sm:w-20 md:w-24 h-full drop-shadow-md text-[#F2C765]"
              fill="currentColor"
            >
              {char.avatarTheme === "elephant" ? (
                // Elephant Silhouette Motif
                <path
                  d="M20,95 Q15,60 30,45 Q40,30 65,35 Q85,38 85,60 Q85,85 75,95 L65,95 L65,80 Q55,80 50,80 L50,95 Z"
                  fill="#E5DAC6"
                  opacity="0.85"
                />
              ) : char.avatarTheme === "tortoise" ? (
                // Tortoise Silhouette Motif
                <path
                  d="M15,95 Q25,60 50,60 Q75,60 85,95 Z M85,85 Q95,80 92,90 Z"
                  fill="#97D6A7"
                  opacity="0.85"
                />
              ) : (
                // Hare / Savanna Animal Motif
                <g fill="#F2C765" opacity="0.9">
                  {/* Long Hare Ears */}
                  <ellipse cx="42" cy="22" rx="4" ry="16" transform="rotate(-10 42 22)" />
                  <ellipse cx="58" cy="22" rx="4" ry="16" transform="rotate(10 58 22)" />
                  {/* Head & Body */}
                  <circle cx="50" cy="45" r="14" />
                  <ellipse cx="50" cy="80" rx="18" ry="24" />
                </g>
              )}
            </svg>
          </div>

          {/* Name Tag */}
          <div className="w-full text-center px-1 py-0.5 rounded bg-black/60 border border-white/10">
            <span className="font-story-serif text-[11px] sm:text-xs font-medium text-[#F7F3EB] truncate block">
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

        if (shouldReduceMotion) {
          return (
            <div key={char.id} className={`absolute ${positionClass}`}>
              {renderCharacterVisual(char)}
            </div>
          );
        }

        // Subtle idle breathing or float animation
        return (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 15 }}
            animate={
              isPaused
                ? { opacity: 1, y: 0 }
                : {
                    opacity: 1,
                    y: char.motion === "subtle-float" ? [-2, 2, -2] : [0, -3, 0],
                  }
            }
            transition={
              isPaused
                ? { duration: 0.3 }
                : {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className={`absolute ${positionClass}`}
          >
            {renderCharacterVisual(char)}
          </motion.div>
        );
      })}
    </div>
  );
}
