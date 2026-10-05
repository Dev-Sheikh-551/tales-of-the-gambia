"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SceneCharacter } from "@/types/story";
import { CharacterActionType } from "@/types/engine";
import { HareFigure } from "./HareFigure";
import { ElephantFigure } from "./ElephantFigure";
import { TortoiseFigure } from "./TortoiseFigure";
import { BoatmanFigure } from "./BoatmanFigure";
import { NinkiNankaFigure } from "./NinkiNankaFigure";
import { GriotFigure } from "./GriotFigure";
import { KelefaSaaneFigure } from "./KelefaSaaneFigure";

interface SceneCharacterRendererProps {
  characters?: SceneCharacter[];
  overrideActions?: Record<string, CharacterActionType>;
  isPaused?: boolean;
}

export function SceneCharacterRenderer({
  characters = [],
  overrideActions = {},
  isPaused = false,
}: SceneCharacterRendererProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!characters || characters.length === 0) return null;

  // Responsive character stage positioning:
  // Characters sit directly on the stage ground (bottom-aligned relative to midground horizon)
  // Flanking or centering without being covered by caption cards.
  const getStagePositionClasses = (pos: SceneCharacter["position"]) => {
    switch (pos) {
      case "far-left":
        return "left-2 sm:left-6 md:left-12 lg:left-16 bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-40";
      case "left":
        return "left-4 sm:left-12 md:left-24 lg:left-32 bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-40";
      case "center":
        return "left-1/2 -translate-x-1/2 bottom-32 sm:bottom-36 md:bottom-40 lg:bottom-44";
      case "right":
        return "right-4 sm:right-12 md:right-24 lg:right-32 bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-40";
      case "far-right":
        return "right-2 sm:right-6 md:right-12 lg:right-16 bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-40";
      default:
        return "left-1/2 -translate-x-1/2 bottom-32 sm:bottom-36 md:bottom-40 lg:bottom-44";
    }
  };

  const renderFigure = (char: SceneCharacter, currentAction: CharacterActionType) => {
    const facing: "left" | "right" =
      char.position === "right" || char.position === "far-right" ? "left" : "right";

    switch (char.avatarTheme) {
      case "hare":
        return (
          <HareFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "elephant":
        return (
          <ElephantFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "tortoise":
        return (
          <TortoiseFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "boatman":
        return (
          <BoatmanFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "shadow":
        return (
          <NinkiNankaFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "griot":
        return (
          <GriotFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "kelefa":
        return (
          <KelefaSaaneFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "ninki-nanka":
        return (
          <NinkiNankaFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "samba":
        return (
          <BoatmanFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      default:
        // Check if character name or ID matches Kelefa
        if (char.id.includes("kelefa") || char.name.toLowerCase().includes("kelefa")) {
          return (
            <KelefaSaaneFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        if (char.id.includes("ninki") || char.name.toLowerCase().includes("ninki")) {
          return (
            <NinkiNankaFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        if (char.id.includes("samba") || char.name.toLowerCase().includes("samba")) {
          return (
            <BoatmanFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Fallback to Hare or Griot
        return (
          <HareFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {characters.map((char) => {
        const currentAction: CharacterActionType =
          overrideActions[char.id] ||
          (char.motion as CharacterActionType) ||
          "stand";

        const positionClasses = getStagePositionClasses(char.position);

        return (
          <motion.div
            key={char.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute z-20 ${positionClasses}`}
          >
            {/* The Actual Illustrated Character */}
            {renderFigure(char, currentAction)}

            {/* Subtle, elegant character name label underneath feet without heavy card background */}
            <div className="text-center mt-1 select-none pointer-events-none">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 font-story-sans text-[10px] sm:text-xs text-[#F7F3EB]/90 tracking-wide">
                {char.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
