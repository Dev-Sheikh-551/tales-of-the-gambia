"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface MotionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  direction = "up",
  className = "",
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: yOffset };
      case "down":
        return { opacity: 0, y: -yOffset };
      case "left":
        return { opacity: 0, x: yOffset };
      case "right":
        return { opacity: 0, x: -yOffset };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

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
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
