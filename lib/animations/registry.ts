/**
 * Tales of The Gambia — Central Animation Asset Registry
 *
 * Provides typed resolution of locally-bundled Lottie and vector animation assets.
 * No hardcoded paths in visual components. Respects offline-first constraints and device tiers.
 */

import { DeviceQualityTier } from "@/lib/motion/deviceTier";

export type AnimationAssetId =
  | "cultural-sparkle"
  | "water-ripple"
  | "fire-flames"
  | "birds-flight"
  | "night-stars"
  | "dust-swirl"
  | "magic-aura";

export interface AnimationAssetDefinition {
  id: AnimationAssetId;
  name: string;
  src: string;
  category: "celebration" | "storytelling" | "environment" | "fx";
  defaultLoop: boolean;
  defaultSpeed: number;
  minTier: DeviceQualityTier;
  ariaLabel: string;
}

export const ANIMATION_REGISTRY: Record<AnimationAssetId, AnimationAssetDefinition> = {
  "cultural-sparkle": {
    id: "cultural-sparkle",
    name: "Cultural Sparkle",
    src: "/animations/celebration/cultural-sparkle.json",
    category: "celebration",
    defaultLoop: false,
    defaultSpeed: 1,
    minTier: "low",
    ariaLabel: "Golden Mandinka decorative celebration sparkle",
  },
  "water-ripple": {
    id: "water-ripple",
    name: "Water Ripple",
    src: "/animations/storytelling/water-ripple.json",
    category: "storytelling",
    defaultLoop: true,
    defaultSpeed: 0.85,
    minTier: "balanced",
    ariaLabel: "Gently expanding river ripples",
  },
  "fire-flames": {
    id: "fire-flames",
    name: "Fire Flames",
    src: "/animations/storytelling/fire-flames.json",
    category: "storytelling",
    defaultLoop: true,
    defaultSpeed: 1,
    minTier: "balanced",
    ariaLabel: "Dancing fire flames with rising embers",
  },
  "birds-flight": {
    id: "birds-flight",
    name: "Birds Flight",
    src: "/animations/storytelling/birds-flight.json",
    category: "environment",
    defaultLoop: true,
    defaultSpeed: 0.75,
    minTier: "balanced",
    ariaLabel: "Savanna birds gliding across the sky",
  },
  "night-stars": {
    id: "night-stars",
    name: "Night Stars",
    src: "/animations/storytelling/night-stars.json",
    category: "environment",
    defaultLoop: true,
    defaultSpeed: 0.6,
    minTier: "low",
    ariaLabel: "Twinkling night sky stars",
  },
  "dust-swirl": {
    id: "dust-swirl",
    name: "Dust Swirl",
    src: "/animations/storytelling/dust-swirl.json",
    category: "environment",
    defaultLoop: true,
    defaultSpeed: 0.9,
    minTier: "balanced",
    ariaLabel: "Swirling harmattan desert dust",
  },
  "magic-aura": {
    id: "magic-aura",
    name: "Magic Aura",
    src: "/animations/storytelling/magic-aura.json",
    category: "fx",
    defaultLoop: true,
    defaultSpeed: 0.8,
    minTier: "balanced",
    ariaLabel: "Mystical river guardian luminescence",
  },
};

/**
 * Resolves an animation asset by ID, checking against device tier eligibility
 */
export function resolveAnimationAsset(
  id: AnimationAssetId,
  currentTier: DeviceQualityTier = "high"
): AnimationAssetDefinition | null {
  const asset = ANIMATION_REGISTRY[id];
  if (!asset) return null;

  // On low tier, skip balanced/high only effects if needed, but allow low
  if (currentTier === "low" && asset.minTier !== "low") {
    return null;
  }

  return asset;
}
