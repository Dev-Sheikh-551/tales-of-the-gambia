"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CameraMotion, CameraPreset } from "@/types/story";
import { CameraAnimationEvent } from "@/types/engine";
import { useDeviceMotionQuality } from "@/lib/motion/deviceTier";

interface SceneCameraContainerProps {
  children: React.ReactNode;
  cameraMotion?: CameraMotion;
  activeCameraEvent?: CameraAnimationEvent | null;
  isPaused?: boolean;
  sceneId: string;
}

export function SceneCameraContainer({
  children,
  cameraMotion,
  activeCameraEvent,
  isPaused = false,
  sceneId,
}: SceneCameraContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const quality = useDeviceMotionQuality();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 640);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const preset: CameraPreset = activeCameraEvent?.preset || cameraMotion?.preset || "slow-push";
  const duration = activeCameraEvent?.durationSeconds || cameraMotion?.durationSeconds || 15;
  const intensity = activeCameraEvent?.intensity || cameraMotion?.intensity || "medium";

  // Tier multipliers: keep camera motion expressive on high and balanced
  const tierMultiplier = quality === "high" ? 1.0 : quality === "balanced" ? 0.75 : 0.2;

  // Intensity multipliers: clear, visible, story-driven camera moves
  const intensityMultiplier =
    intensity === "dramatic" ? 1.4 : intensity === "medium" ? 1.0 : 0.75;

  const factor = tierMultiplier * intensityMultiplier * (isMobile ? 0.75 : 1.0);

  if (shouldReduceMotion || preset === "still" || quality === "low") {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    );
  }

  const getCameraVariants = () => {
    // Generous, genuinely cinematic transforms:
    // Visible push-ins (1.14 - 1.24x)
    // Substantial pans (6 - 12%)
    const pushScale = 1 + 0.14 * factor;
    const dramaticPushScale = 1 + 0.22 * factor;
    const panDistance = (isMobile ? 5.5 : 9.5) * factor;
    const vertDistance = (isMobile ? 4.5 : 7.0) * factor;

    switch (preset) {
      case "slow-push":
      case "zoom-in":
        return {
          initial: { scale: 1.0, x: 0, y: 0 },
          animate: {
            scale: pushScale,
            x: 0,
            y: 0,
            transition: { duration, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
          },
        };

      case "slow-pull":
      case "zoom-out":
        return {
          initial: { scale: pushScale, x: 0, y: 0 },
          animate: {
            scale: 1.0,
            x: 0,
            y: 0,
            transition: { duration, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
          },
        };

      case "dramatic-push":
        return {
          initial: { scale: 1.0, x: 0, y: 0 },
          animate: {
            scale: dramaticPushScale,
            x: 0,
            y: `${vertDistance * 0.4}%`,
            transition: { duration: duration * 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          },
        };

      case "horizontal-pan-left":
      case "pan-left":
        return {
          initial: { scale: 1.08, x: `${panDistance}%`, y: 0 },
          animate: {
            scale: 1.08,
            x: `-${panDistance}%`,
            y: 0,
            transition: { duration, ease: "linear" as const },
          },
        };

      case "horizontal-pan-right":
      case "pan-right":
        return {
          initial: { scale: 1.08, x: `-${panDistance}%`, y: 0 },
          animate: {
            scale: 1.08,
            x: `${panDistance}%`,
            y: 0,
            transition: { duration, ease: "linear" as const },
          },
        };

      case "vertical-reveal":
        return {
          initial: { scale: 1.08, x: 0, y: `${vertDistance}%` },
          animate: {
            scale: 1.08,
            x: 0,
            y: `-${vertDistance}%`,
            transition: { duration, ease: "easeInOut" as const },
          },
        };

      case "diagonal-drift":
      case "drift":
        return {
          initial: {
            scale: 1.05,
            x: `-${panDistance * 0.5}%`,
            y: `${vertDistance * 0.4}%`,
          },
          animate: {
            scale: 1.14,
            x: `${panDistance * 0.5}%`,
            y: `-${vertDistance * 0.4}%`,
            transition: { duration, ease: "easeInOut" as const },
          },
        };

      case "wide-establishing":
        return {
          initial: { scale: 1.16, x: `-${panDistance * 0.4}%`, y: `${vertDistance * 0.3}%` },
          animate: {
            scale: 1.02,
            x: 0,
            y: 0,
            transition: { duration: duration * 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          },
        };

      case "character-reveal":
        return {
          initial: { scale: 1.18, x: `${panDistance * 0.6}%`, y: 0 },
          animate: {
            scale: 1.08,
            x: 0,
            y: 0,
            transition: { duration: duration * 0.8, ease: "easeOut" as const },
          },
        };

      case "environment-reveal":
        return {
          initial: { scale: 1.0, y: `${vertDistance * 0.8}%` },
          animate: {
            scale: 1.08,
            y: 0,
            transition: { duration, ease: "easeOut" as const },
          },
        };

      case "focus-shift":
        return {
          initial: { scale: 1.12, x: `-${panDistance * 0.6}%` },
          animate: {
            scale: 1.12,
            x: `${panDistance * 0.6}%`,
            transition: { duration: duration * 0.7, ease: "easeInOut" as const },
          },
        };

      default:
        return {
          initial: { scale: 1.0, x: 0, y: 0 },
          animate: {
            scale: pushScale,
            x: 0,
            y: 0,
            transition: { duration, ease: "linear" as const },
          },
        };
    }
  };

  const variants = getCameraVariants();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        key={`${sceneId}-${preset}`}
        initial={variants.initial}
        animate={isPaused ? undefined : variants.animate}
        className="relative w-full h-full will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
