"use client";

import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  motion,
  useSpring,
  useReducedMotion,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { useDeviceMotionQuality } from "@/lib/motion/deviceTier";
import { getViewportParallaxIntensity } from "@/lib/motion/depth";

interface ParallaxContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovered: boolean;
  reducedMotion: boolean;
}

const ParallaxContext = createContext<ParallaxContextType | null>(null);

export interface MotionParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Explicit tilt / translation sensitivity in pixels.
   * If omitted, dynamically calculated based on viewport width:
   * Mobile (< 640px): 4px
   * Tablet (640px-1023px): 10px
   * Desktop (>= 1024px): 18px
   */
  intensity?: number;
}

export function MotionParallaxContainer({
  children,
  className = "",
  intensity,
}: MotionParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const quality = useDeviceMotionQuality();
  const [viewportIntensity, setViewportIntensity] = useState<number>(() =>
    typeof window !== "undefined" ? getViewportParallaxIntensity(window.innerWidth) : 12
  );

  useEffect(() => {
    function handleResize() {
      setViewportIntensity(getViewportParallaxIntensity(window.innerWidth));
    }
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute effective intensity incorporating device tier & reduced motion
  const baseIntensity = intensity !== undefined ? intensity : viewportIntensity;
  const tierMultiplier = quality === "high" ? 1.0 : quality === "balanced" ? 0.75 : 0;
  const effectiveIntensity = shouldReduceMotion ? 0 : baseIntensity * tierMultiplier;

  // Smooth springs for cursor / pointer motion
  const mouseX = useSpring(0, { stiffness: 90, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 90, damping: 22 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || effectiveIntensity === 0 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    // Normalized coordinates (-0.5 to 0.5 from container center)
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normalizedX * effectiveIntensity);
    mouseY.set(normalizedY * effectiveIntensity);
  };

  const handlePointerEnter = () => setIsHovered(true);

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <ParallaxContext.Provider
      value={{
        mouseX,
        mouseY,
        isHovered,
        reducedMotion: Boolean(shouldReduceMotion) || effectiveIntensity === 0,
      }}
    >
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`relative overflow-hidden ${className}`}
      >
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

export interface MotionParallaxLayerProps {
  children: React.ReactNode;
  /**
   * Normalized depth factor.
   * Background: 0.02 (least movement)
   * Midground / Atmosphere: 0.05 (moderate movement)
   * Characters: 0.09 (stronger movement)
   * Foreground: 0.15 (strongest movement)
   */
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function MotionParallaxLayer({
  children,
  depth = 0.05,
  className = "",
  style,
}: MotionParallaxLayerProps) {
  const context = useContext(ParallaxContext);
  const fallbackMotion = useMotionValue(0);

  // Hook rules: call useTransform unconditionally
  const sourceX = context?.mouseX ?? fallbackMotion;
  const sourceY = context?.mouseY ?? fallbackMotion;

  const x = useTransform(sourceX, (val) => val * depth * 8);
  const y = useTransform(sourceY, (val) => val * depth * 8);

  if (!context || context.reducedMotion || depth === 0) {
    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={{
        x,
        y,
        scale: 1 + Math.abs(depth) * 0.02,
        ...style,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
