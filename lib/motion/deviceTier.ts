"use client";

import { useEffect, useState } from "react";
import { DeviceMotionQuality, DeviceQualityTier } from "@/types/motion";
export type { DeviceQualityTier };
import { checkPrefersReducedMotion } from "./reducedMotion";
import { isMobileDevice } from "../mobile/runtime";

/**
 * Detects the recommended device motion quality tier.
 * Runs on the client; returns "balanced" as a safe SSR fallback.
 */
export function detectDeviceMotionQuality(): DeviceMotionQuality {
  if (typeof window === "undefined") return "balanced";

  // If reduced motion is explicitly selected, force low
  if (checkPrefersReducedMotion()) return "low";

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check device memory in GB (if available in Chromium)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (navigator as any).deviceMemory || 4;

  // Check network/save-data mode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connection = (navigator as any).connection;
  const isSaveData = connection?.saveData;

  if (isSaveData || cores <= 2 || memory <= 2) {
    return "low";
  }

  // Flagships / Desktops
  if (!isMobileDevice() || (cores >= 6 && memory >= 4)) {
    return "high";
  }

  return "balanced";
}

/**
 * React hook to observe and query device motion quality tier.
 */
export function useDeviceMotionQuality(): DeviceMotionQuality {
  const [tier, setTier] = useState<DeviceMotionQuality>("balanced");

  useEffect(() => {
    setTier(detectDeviceMotionQuality());
  }, []);

  return tier;
}

/**
 * Configuration parameters adjusted dynamically per quality tier
 */
export interface TierAnimationConfig {
  particleCount: number;
  enableBlur: boolean;
  enableParallax: boolean;
  enableLottieCelebration: boolean;
  enableForeground: boolean;
  transitionDurationMultiplier: number;
}

export const TIER_CONFIGS: Record<DeviceMotionQuality, TierAnimationConfig> = {
  high: {
    particleCount: 16,
    enableBlur: true,
    enableParallax: true,
    enableLottieCelebration: true,
    enableForeground: true,
    transitionDurationMultiplier: 1.0,
  },
  balanced: {
    particleCount: 8,
    enableBlur: true,
    enableParallax: true,
    enableLottieCelebration: true,
    enableForeground: true,
    transitionDurationMultiplier: 0.85,
  },
  low: {
    particleCount: 3,
    enableBlur: false,
    enableParallax: false,
    enableLottieCelebration: false,
    enableForeground: false,
    transitionDurationMultiplier: 0.7,
  },
};
