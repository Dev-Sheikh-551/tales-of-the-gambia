"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASINGS } from "@/lib/motion/tokens";

export interface MotionTextRevealProps {
  text: string;
  mode?: "paragraph" | "sentence" | "phrase";
  delay?: number;
  staggerDelay?: number;
  className?: string;
  emphasisWords?: string[];
  once?: boolean;
}

export function MotionTextReveal({
  text,
  mode = "paragraph",
  delay = 0,
  staggerDelay = 0.08,
  className = "",
  emphasisWords = [],
  once = true,
}: MotionTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{text}</div>;
  }

  if (mode === "paragraph") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: "-20px" }}
        transition={{
          duration: 0.5,
          delay,
          ease: MOTION_EASINGS.enter,
        }}
        className={className}
      >
        {text}
      </motion.p>
    );
  }

  // Sentence / segment split
  // Splits on punctuation while retaining the delimiter
  const segments = mode === "sentence"
    ? text.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [text]
    : text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: MOTION_EASINGS.enter },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-20px" }}
      variants={containerVariants}
      className={`inline-block ${className}`}
    >
      {segments.map((segment, idx) => {
        const isEmphasized = emphasisWords.some((w) =>
          segment.toLowerCase().includes(w.toLowerCase())
        );

        return (
          <motion.span
            key={idx}
            variants={itemVariants}
            className={`inline-block mr-1.5 transition-colors ${
              isEmphasized ? "text-[#F2C765] font-semibold" : ""
            }`}
          >
            {segment}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
