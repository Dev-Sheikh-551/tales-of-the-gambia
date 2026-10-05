"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { MOTION_EASINGS, MOTION_STAGGER } from "@/lib/motion/tokens";

export type StaggerChildVariant = "slide-up" | "fade" | "scale" | "slide-left";

interface MotionStaggerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  childVariant?: StaggerChildVariant;
  once?: boolean;
  threshold?: number;
  className?: string;
}

export function MotionStagger({
  children,
  staggerDelay = MOTION_STAGGER.normal,
  delayChildren = 0.04,
  childVariant = "slide-up",
  once = true,
  threshold = 0.1,
  className = "",
  ...props
}: MotionStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: StaggerChildVariant;
  className?: string;
}

export function MotionStaggerItem({
  children,
  variant = "slide-up",
  className = "",
  ...props
}: MotionStaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getItemVariants = () => {
    switch (variant) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.35, ease: MOTION_EASINGS.standard },
          },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: MOTION_EASINGS.organic },
          },
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: MOTION_EASINGS.enter },
          },
        };
      case "slide-up":
      default:
        return {
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: MOTION_EASINGS.enter },
          },
        };
    }
  };

  return (
    <motion.div variants={getItemVariants()} className={className} {...props}>
      {children}
    </motion.div>
  );
}
