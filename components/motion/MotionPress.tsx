"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { MOTION_SPRINGS } from "@/lib/motion/tokens";

export interface MotionPressProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Scale factor during active press / tap (default 0.96) */
  pressScale?: number;
  /** Optional slight hover scale on non-touch devices (default 1.02) */
  hoverScale?: number;
  /** Whether the interactive element is currently disabled */
  disabled?: boolean;
  /** Spring preset to utilize */
  spring?: "gentle" | "snappy" | "bouncy";
  className?: string;
  as?: "div" | "button" | "span";
}

export function MotionPress({
  children,
  pressScale = 0.96,
  hoverScale = 1.02,
  disabled = false,
  spring = "snappy",
  className = "",
  as = "div",
  ...props
}: MotionPressProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || disabled) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const springConfig = MOTION_SPRINGS[spring] || MOTION_SPRINGS.snappy;

  // Use motion.div or motion.button
  const MotionComponent = as === "button" ? motion.button : as === "span" ? motion.span : motion.div;

  return (
    <MotionComponent
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: pressScale }}
      transition={{
        type: "spring",
        ...springConfig,
      }}
      className={`select-none cursor-pointer ${className}`}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </MotionComponent>
  );
}
