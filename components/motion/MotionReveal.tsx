"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { MotionRevealVariant } from "@/types/motion";
import { MOTION_EASINGS } from "@/lib/motion/tokens";

export interface MotionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Modern V2 variant type */
  variant?: MotionRevealVariant;
  /** Legacy V1 direction prop for backwards compatibility */
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  /** Distance in pixels for translation variants (default 24) */
  distance?: number;
  /** Legacy yOffset prop */
  yOffset?: number;
  /** Whether the animation triggers once when entering the viewport */
  once?: boolean;
  /** Intersection threshold or viewport margin */
  threshold?: number;
  viewportMargin?: string;
  className?: string;
}

export function MotionReveal({
  children,
  variant,
  direction,
  delay = 0,
  duration = 0.5,
  distance,
  yOffset,
  once = true,
  threshold = 0.1,
  viewportMargin = "-30px",
  className = "",
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const effectiveDist = distance ?? yOffset ?? 24;

  // Resolve initial and animated properties
  const resolveAnimation = () => {
    // If explicit variant is provided, use it
    if (variant) {
      switch (variant) {
        case "fade":
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          };
        case "slide-up":
          return {
            initial: { opacity: 0, y: effectiveDist },
            animate: { opacity: 1, y: 0 },
          };
        case "slide-down":
          return {
            initial: { opacity: 0, y: -effectiveDist },
            animate: { opacity: 1, y: 0 },
          };
        case "slide-left":
          return {
            initial: { opacity: 0, x: effectiveDist },
            animate: { opacity: 1, x: 0 },
          };
        case "slide-right":
          return {
            initial: { opacity: 0, x: -effectiveDist },
            animate: { opacity: 1, x: 0 },
          };
        case "scale":
          return {
            initial: { opacity: 0, scale: 0.94 },
            animate: { opacity: 1, scale: 1 },
          };
        case "blur":
          return {
            initial: { opacity: 0, filter: "blur(6px)" },
            animate: { opacity: 1, filter: "blur(0px)" },
          };
        case "clip":
          return {
            initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
            animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
          };
        default:
          return {
            initial: { opacity: 0, y: effectiveDist },
            animate: { opacity: 1, y: 0 },
          };
      }
    }

    // Fallback to legacy direction prop
    switch (direction) {
      case "up":
        return { initial: { opacity: 0, y: effectiveDist }, animate: { opacity: 1, y: 0 } };
      case "down":
        return { initial: { opacity: 0, y: -effectiveDist }, animate: { opacity: 1, y: 0 } };
      case "left":
        return { initial: { opacity: 0, x: effectiveDist }, animate: { opacity: 1, x: 0 } };
      case "right":
        return { initial: { opacity: 0, x: -effectiveDist }, animate: { opacity: 1, x: 0 } };
      case "none":
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
      default:
        return { initial: { opacity: 0, y: effectiveDist }, animate: { opacity: 1, y: 0 } };
    }
  };

  const anim = resolveAnimation();

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.animate}
      viewport={{ once, margin: viewportMargin, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: MOTION_EASINGS.enter,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Backward-compatible exports for StaggerContainer & StaggerItem
// ---------------------------------------------------------------------------

export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0.05,
  className = "",
}: {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: MOTION_EASINGS.enter,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
