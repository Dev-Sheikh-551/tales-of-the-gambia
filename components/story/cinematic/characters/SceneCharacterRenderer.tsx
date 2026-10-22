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
import { HyenaFigure } from "./HyenaFigure";
import { PangolinFigure } from "./PangolinFigure";
import { SpiderFigure } from "./SpiderFigure";
import { CowFigure } from "./CowFigure";
import { LionFigure } from "./LionFigure";
import { HumanSilhouetteFigure } from "./HumanSilhouetteFigure";
import { ChildFigure } from "./ChildFigure";
import { WeaverBirdFigure } from "./WeaverBirdFigure";
import { KingfisherFigure } from "./KingfisherFigure";
import { FishEagleFigure } from "./FishEagleFigure";
import { IbisFigure } from "./IbisFigure";
import { StorkFigure } from "./StorkFigure";
import { DonkeyFigure } from "./DonkeyFigure";

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
        return "left-[8%] -translate-x-1/2 bottom-3 sm:bottom-5";
      case "left":
        return "left-[26%] -translate-x-1/2 bottom-3 sm:bottom-5";
      case "center":
        return "left-1/2 -translate-x-1/2 bottom-3 sm:bottom-5";
      case "right":
        return "left-[74%] -translate-x-1/2 bottom-3 sm:bottom-5";
      case "far-right":
        return "left-[88%] -translate-x-1/2 bottom-3 sm:bottom-5";
      default:
        return "left-1/2 -translate-x-1/2 bottom-3 sm:bottom-5";
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
        // Preserve Ninki Nanka if character name or ID matches the mythical river guardian
        if (
          char.id.includes("ninki") ||
          char.id.includes("river-shadow") ||
          char.name.toLowerCase().includes("ninki")
        ) {
          return (
            <NinkiNankaFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Sundiata warrior shadow
        if (
          char.id.includes("sundiata") ||
          char.name.toLowerCase().includes("sundiata")
        ) {
          return (
            <HumanSilhouetteFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
              variant="warrior"
            />
          );
        }
        // Hunter shadow (e.g. Koriang)
        if (
          char.id.includes("koriang") ||
          char.id.includes("hunter") ||
          char.name.toLowerCase().includes("hunter") ||
          char.name.toLowerCase().includes("koriang")
        ) {
          return (
            <HumanSilhouetteFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
              variant="hunter"
            />
          );
        }
        // Spiritual / Ancestor shadow
        if (
          char.id.includes("spirit") ||
          char.name.toLowerCase().includes("spirit") ||
          char.id.includes("ancestor") ||
          char.name.toLowerCase().includes("ancestor")
        ) {
          return (
            <HumanSilhouetteFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
              variant="spirit"
            />
          );
        }
        // Default shadow maps to dignified human silhouette
        return (
          <HumanSilhouetteFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
            variant="default"
          />
        );
      case "human":
        return (
          <HumanSilhouetteFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
            variant="default"
          />
        );
      case "warrior":
        return (
          <HumanSilhouetteFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
            variant="warrior"
          />
        );
      case "hunter":
        return (
          <HumanSilhouetteFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
            variant="hunter"
          />
        );
      case "spirit":
        return (
          <HumanSilhouetteFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
            variant="spirit"
          />
        );
      case "ancestor":
        return (
          <HumanSilhouetteFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
            variant="ancestor"
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
      case "hyena":
        return (
          <HyenaFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "cow":
        return (
          <CowFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "lion":
        return (
          <LionFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "pangolin":
        return (
          <PangolinFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "spider":
        return (
          <SpiderFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "child":
        return (
          <ChildFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "weaver-bird":
        return (
          <WeaverBirdFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "kingfisher":
        return (
          <KingfisherFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "fish-eagle":
        return (
          <FishEagleFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "ibis":
        return (
          <IbisFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "stork":
        return (
          <StorkFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      case "donkey":
        return (
          <DonkeyFigure
            action={currentAction}
            facing={facing}
            scale={char.scale || 1}
            isPaused={isPaused}
          />
        );
      default:
        // Check if character name or ID matches Hyena / Bouki
        if (
          char.id.includes("hyena") ||
          char.id.includes("bouki") ||
          char.name.toLowerCase().includes("hyena") ||
          char.name.toLowerCase().includes("bouki")
        ) {
          return (
            <HyenaFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
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
        // Check if character name or ID matches Sundiata (Warrior)
        if (char.id.includes("sundiata") || char.name.toLowerCase().includes("sundiata")) {
          return (
            <HumanSilhouetteFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
              variant="warrior"
            />
          );
        }
        // Check if character name or ID matches Koriang / Hunter
        if (
          char.id.includes("koriang") ||
          char.id.includes("hunter") ||
          char.name.toLowerCase().includes("hunter") ||
          char.name.toLowerCase().includes("koriang")
        ) {
          return (
            <HumanSilhouetteFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
              variant="hunter"
            />
          );
        }
        // Check if character name or ID matches Spirit or Ancestor
        if (
          char.id.includes("spirit") ||
          char.name.toLowerCase().includes("spirit") ||
          char.id.includes("ancestor") ||
          char.name.toLowerCase().includes("ancestor")
        ) {
          return (
            <HumanSilhouetteFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
              variant="spirit"
            />
          );
        }
        // Check for Child / Alieu
        if (
          char.id.includes("child") ||
          char.id.includes("alieu") ||
          char.name.toLowerCase().includes("child") ||
          char.name.toLowerCase().includes("alieu")
        ) {
          return (
            <ChildFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Check for Weaver bird
        if (char.id.includes("weaver") || char.name.toLowerCase().includes("weaver")) {
          return (
            <WeaverBirdFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Check for Kingfisher
        if (char.id.includes("kingfisher") || char.name.toLowerCase().includes("kingfisher")) {
          return (
            <KingfisherFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Check for Fish Eagle
        if (char.id.includes("eagle") || char.name.toLowerCase().includes("eagle")) {
          return (
            <FishEagleFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Check for Ibis
        if (char.id.includes("ibis") || char.name.toLowerCase().includes("ibis")) {
          return (
            <IbisFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Check for Stork
        if (char.id.includes("stork") || char.name.toLowerCase().includes("stork")) {
          return (
            <StorkFigure
              action={currentAction}
              facing={facing}
              scale={char.scale || 1}
              isPaused={isPaused}
            />
          );
        }
        // Check for Donkey / Fari
        if (
          char.id.includes("donkey") ||
          char.id.includes("fari") ||
          char.name.toLowerCase().includes("donkey")
        ) {
          return (
            <DonkeyFigure
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
          </motion.div>
        );
      })}
    </div>
  );
}
