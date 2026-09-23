"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CameraMotion } from "@/types/story";

interface SceneCameraContainerProps {
  children: React.ReactNode;
  cameraMotion?: CameraMotion;
  isPaused?: boolean;
  sceneId: string;
}

export function SceneCameraContainer({
  children,
  cameraMotion,
  isPaused = false,
  sceneId,
}: SceneCameraContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const preset = cameraMotion?.preset || "zoom-in";
  const duration = cameraMotion?.durationSeconds || 15;

  if (shouldReduceMotion || preset === "still") {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    );
  }

  const getCameraVariants = () => {
    switch (preset) {
      case "zoom-in":
        return {
          initial: { scale: 1.0, x: 0, y: 0 },
          animate: {
            scale: 1.06,
            x: 0,
            y: 0,
            transition: { duration, ease: "linear" },
          },
        };
      case "zoom-out":
        return {
          initial: { scale: 1.06, x: 0, y: 0 },
          animate: {
            scale: 1.0,
            x: 0,
            y: 0,
            transition: { duration, ease: "linear" },
          },
        };
      case "pan-left":
        return {
          initial: { scale: 1.04, x: "1.5%", y: 0 },
          animate: {
            scale: 1.04,
            x: "-1.5%",
            y: 0,
            transition: { duration, ease: "linear" },
          },
        };
      case "pan-right":
        return {
          initial: { scale: 1.04, x: "-1.5%", y: 0 },
          animate: {
            scale: 1.04,
            x: "1.5%",
            y: 0,
            transition: { duration, ease: "linear" },
          },
        };
      case "drift":
        return {
          initial: { scale: 1.02, x: "-1%", y: "1%" },
          animate: {
            scale: 1.05,
            x: "1%",
            y: "-1%",
            transition: { duration, ease: "linear" },
          },
        };
      default:
        return {
          initial: { scale: 1.0 },
          animate: { scale: 1.0 },
        };
    }
  };

  const variants = getCameraVariants();

  return (
    <motion.div
      key={sceneId}
      initial={variants.initial}
      animate={isPaused ? variants.initial : variants.animate}
      className="relative w-full h-full overflow-hidden will-change-transform"
    >
      {children}
    </motion.div>
  );
}
