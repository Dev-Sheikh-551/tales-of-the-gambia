"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Scene, NarrationCue } from "@/types/story";
import { CinematicTransitionType } from "@/types/motion";
import { MOTION_EASINGS } from "@/lib/motion/tokens";
import { useDeviceMotionQuality } from "@/lib/motion/deviceTier";
import { getSceneDepthConfig } from "@/lib/motion/depth";
import { MotionParallaxContainer, MotionParallaxLayer } from "@/components/motion/MotionParallax";
import { SceneCameraContainer } from "./SceneCameraContainer";
import { AnimatedEnvironmentCanvas } from "./environment/AnimatedEnvironmentCanvas";
import { SceneCharacterRenderer } from "./characters/SceneCharacterRenderer";
import { SceneForeground } from "./SceneForeground";
import { SceneCaption } from "./SceneCaption";
import { useSceneTimeline } from "@/lib/motion/useSceneTimeline";
import { getStorySceneCues } from "@/data/audio/cues";
import { useSceneSwipe } from "@/hooks/useSceneSwipe";

interface StorySceneViewportProps {
  scene: Scene;
  totalScenes: number;
  isPaused: boolean;
  storySlug?: string;
  currentTime?: number;
  hasAudio?: boolean;
  transitionType?: CinematicTransitionType;
  cues?: NarrationCue[];
  onNext?: () => void;
  onPrevious?: () => void;
}

/**
 * Resolves the transition personality based on explicit scene config, prop, or environment
 */
function resolveTransitionStyle(
  sceneTransition?: string,
  explicitProp?: CinematicTransitionType,
  envType?: string
): CinematicTransitionType {
  if (sceneTransition && (sceneTransition as CinematicTransitionType)) {
    return sceneTransition as CinematicTransitionType;
  }
  if (explicitProp) return explicitProp;
  if (envType === "river-ripples") return "river";
  if (envType === "night-stars") return "nightfall";
  if (envType === "wind") return "wind";
  if (envType === "dust-particles") return "dust";
  if (envType === "fire-flicker") return "light";
  if (envType === "heat-shimmer") return "cinematic-fade";
  return "dissolve";
}

export function StorySceneViewport({
  scene,
  totalScenes,
  isPaused,
  storySlug,
  currentTime = 0,
  hasAudio,
  transitionType,
  cues: explicitCues,
  onNext,
  onPrevious,
}: StorySceneViewportProps) {
  const shouldReduceMotion = useReducedMotion();
  const quality = useDeviceMotionQuality();
  const depthConfig = getSceneDepthConfig(quality, Boolean(shouldReduceMotion));

  // Retrieve cues for timeline & narration synchronization
  const cues = explicitCues || (storySlug ? getStorySceneCues(storySlug, scene.sceneNumber) : scene.audio?.cues);
  const timelineState = useSceneTimeline(scene, currentTime, cues, isPaused);

  // Standardized touch gesture swipe hook for horizontal scene navigation
  const swipeHandlers = useSceneSwipe({
    onNext: onNext,
    onPrevious: onPrevious,
    canNext: Boolean(onNext && scene.sceneNumber < totalScenes),
    canPrevious: Boolean(onPrevious && scene.sceneNumber > 1),
  });

  const activeTransition = resolveTransitionStyle(
    scene.transition?.type,
    transitionType,
    scene.environmentMotion?.type
  );

  const getTransitionVariants = () => {
    if (shouldReduceMotion || quality === "low") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      };
    }

    switch (activeTransition) {
      case "river":
        return {
          initial: { opacity: 0, y: 15 },
          animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: MOTION_EASINGS.enter },
          },
          exit: {
            opacity: 0,
            y: -15,
            transition: { duration: 0.4, ease: MOTION_EASINGS.exit },
          },
        };

      case "wind":
        return {
          initial: { opacity: 0, x: 24 },
          animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.65, ease: MOTION_EASINGS.organic },
          },
          exit: {
            opacity: 0,
            x: -24,
            transition: { duration: 0.45, ease: MOTION_EASINGS.exit },
          },
        };

      case "dust":
        return {
          initial: { opacity: 0, filter: "sepia(0.2) brightness(0.9)" },
          animate: {
            opacity: 1,
            filter: "sepia(0) brightness(1)",
            transition: { duration: 0.6, ease: MOTION_EASINGS.standard },
          },
          exit: {
            opacity: 0,
            filter: "sepia(0.2) brightness(0.85)",
            transition: { duration: 0.4, ease: MOTION_EASINGS.exit },
          },
        };

      case "light":
        return {
          initial: { opacity: 0, filter: "brightness(1.15)" },
          animate: {
            opacity: 1,
            filter: "brightness(1)",
            transition: { duration: 0.65, ease: MOTION_EASINGS.enter },
          },
          exit: {
            opacity: 0,
            filter: "brightness(0.9)",
            transition: { duration: 0.4, ease: MOTION_EASINGS.exit },
          },
        };

      case "nightfall":
        return {
          initial: { opacity: 0, filter: "brightness(0.55)" },
          animate: {
            opacity: 1,
            filter: "brightness(1)",
            transition: { duration: 0.75, ease: MOTION_EASINGS.cinematic },
          },
          exit: {
            opacity: 0,
            filter: "brightness(0.45)",
            transition: { duration: 0.45, ease: MOTION_EASINGS.exit },
          },
        };

      case "cinematic-fade":
        return {
          initial: { opacity: 0, scale: 1.025 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.65, ease: MOTION_EASINGS.cinematic },
          },
          exit: {
            opacity: 0,
            scale: 0.985,
            transition: { duration: 0.4, ease: MOTION_EASINGS.exit },
          },
        };

      case "curtain":
        return {
          initial: { opacity: 0, y: "3%" },
          animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: MOTION_EASINGS.enter },
          },
          exit: {
            opacity: 0,
            y: "-3%",
            transition: { duration: 0.4, ease: MOTION_EASINGS.exit },
          },
        };

      case "directional":
        return {
          initial: { opacity: 0, x: 20 },
          animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.55, ease: MOTION_EASINGS.standard },
          },
          exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.4, ease: MOTION_EASINGS.exit },
          },
        };

      case "fade":
      case "crossfade":
      case "dissolve":
      default:
        return {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: { duration: 0.5, ease: MOTION_EASINGS.standard },
          },
          exit: {
            opacity: 0,
            transition: { duration: 0.35, ease: MOTION_EASINGS.standard },
          },
        };
    }
  };

  const variants = getTransitionVariants();

  return (
    <div
      {...swipeHandlers}
      className="relative w-full h-full flex-1 flex flex-col justify-between overflow-hidden bg-[#0A0807] touch-pan-y"
    >
      {/* Visual Camera & Multi-Layer Parallax Viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            className="w-full h-full"
          >
            <MotionParallaxContainer className="w-full h-full">
              <SceneCameraContainer
                sceneId={scene.id}
                cameraMotion={scene.cameraMotion}
                activeCameraEvent={timelineState.activeCameraEvent}
                isPaused={isPaused}
              >
                {/* Layer 1 & 2: Living Animated Scenery & Atmosphere (Sky, Sun/Moon, Bantaba, Water, Wind) */}
                <MotionParallaxLayer
                  depth={depthConfig.background}
                  className="absolute inset-0 z-0"
                >
                  <AnimatedEnvironmentCanvas
                    visual={scene.visual}
                    environmentMotion={scene.environmentMotion}
                    isPaused={isPaused}
                    qualityTier={quality}
                  />
                </MotionParallaxLayer>

                {/* Layer 3: Living Illustrated Character Stage (Rigged Figures with Event-Driven Actions) */}
                <MotionParallaxLayer
                  depth={depthConfig.character}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  <SceneCharacterRenderer
                    characters={scene.charactersData}
                    overrideActions={timelineState.characterActionOverrides}
                    isPaused={isPaused}
                  />
                </MotionParallaxLayer>

                {/* Layer 4: Living Foreground Elements (Acacia leaves dipping, harmattan dust drift) */}
                {scene.foregroundMotion?.enabled && (
                  <MotionParallaxLayer
                    depth={depthConfig.foreground}
                    className="absolute inset-0 z-[25] pointer-events-none"
                  >
                    <SceneForeground
                      foregroundMotion={scene.foregroundMotion}
                      isPaused={isPaused}
                    />
                  </MotionParallaxLayer>
                )}
              </SceneCameraContainer>
            </MotionParallaxContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Layer 5: Floating Narrative Caption Card (z-30, high-contrast, strictly above visuals) */}
      <SceneCaption
        sceneId={scene.id}
        title={scene.title}
        text={scene.text}
        narration={scene.narration}
        sceneNumber={scene.sceneNumber}
        totalScenes={totalScenes}
        storySlug={storySlug}
        currentTime={currentTime}
        hasAudio={hasAudio}
        isPaused={isPaused}
        cues={cues}
      />
    </div>
  );
}
