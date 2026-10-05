import { MotionTokens, MotionDurationTier, MotionPresetConfig } from "@/types/motion";

/**
 * Standard duration values in seconds
 */
export const MOTION_DURATIONS: Record<MotionDurationTier, number> = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  smooth: 0.5,
  cinematic: 0.8,
  panoramic: 1.5,
  ambient: 3.5,
};

/**
 * Mathematically calibrated cubic-bezier easing curves.
 * Compatible with both Framer Motion and CSS transition-timing-function.
 */
export const MOTION_EASINGS = {
  /** Standard snappy ease-out for interactive UI elements (buttons, menus) */
  standard: [0.2, 0.0, 0.0, 1.0] as [number, number, number, number],
  /** Gentle deceleration for entering elements (modals, scene captions) */
  enter: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  /** Quick acceleration for exiting elements */
  exit: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
  /** Natural organic curve for character scene arrivals */
  organic: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  /** Luxurious, high-inertia deceleration for cinematic camera moves */
  cinematic: [0.16, 1.0, 0.3, 1.0] as [number, number, number, number],
};

/**
 * Framer Motion physics-based spring presets
 */
export const MOTION_SPRINGS = {
  gentle: { stiffness: 120, damping: 20, mass: 1 },
  snappy: { stiffness: 300, damping: 30, mass: 0.8 },
  bouncy: { stiffness: 400, damping: 25, mass: 0.5 },
};

/**
 * Stagger offsets in seconds for sequential list or character reveals
 */
export const MOTION_STAGGER = {
  tight: 0.04,
  normal: 0.08,
  deliberate: 0.14,
};

/**
 * Standard spatial translation distances in pixels
 */
export const MOTION_DISTANCES = {
  micro: 4,
  sm: 8,
  md: 16,
  lg: 32,
  cinematic: 64,
};

/**
 * Complete motion tokens dictionary
 */
export const MOTION_TOKENS: MotionTokens = {
  durations: MOTION_DURATIONS,
  easings: MOTION_EASINGS,
  springs: MOTION_SPRINGS,
  stagger: MOTION_STAGGER,
  distances: MOTION_DISTANCES,
};

/**
 * Pre-configured motion presets for common storytelling moments
 */
export const MOTION_PRESETS: Record<string, MotionPresetConfig> = {
  sceneCaptionReveal: {
    durationSeconds: MOTION_DURATIONS.normal,
    ease: MOTION_EASINGS.enter,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "standard",
  },
  characterSceneEntrance: {
    durationSeconds: MOTION_DURATIONS.smooth,
    ease: MOTION_EASINGS.organic,
    reducedMotionFallback: "still",
    tech: "framer",
    intensity: "standard",
  },
  cameraPanOrZoom: {
    durationSeconds: MOTION_DURATIONS.panoramic,
    ease: MOTION_EASINGS.cinematic,
    reducedMotionFallback: "still",
    tech: "framer",
    intensity: "cinematic",
  },
  dialogueBadgePulse: {
    durationSeconds: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.standard,
    reducedMotionFallback: "none",
    tech: "framer",
    intensity: "subtle",
  },
  atmosphericWindStreak: {
    durationSeconds: MOTION_DURATIONS.ambient,
    ease: "linear",
    reducedMotionFallback: "none",
    tech: "css",
    intensity: "subtle",
  },
  // Cinematic Scene Transitions 2.0
  cinematicDissolve: {
    durationSeconds: MOTION_DURATIONS.smooth,
    ease: MOTION_EASINGS.standard,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "standard",
  },
  cinematicFade: {
    durationSeconds: MOTION_DURATIONS.smooth,
    ease: MOTION_EASINGS.cinematic,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "cinematic",
  },
  cinematicCurtain: {
    durationSeconds: MOTION_DURATIONS.cinematic,
    ease: MOTION_EASINGS.cinematic,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "cinematic",
  },
  cinematicWindTransition: {
    durationSeconds: MOTION_DURATIONS.cinematic,
    ease: MOTION_EASINGS.organic,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "expressive",
  },
  cinematicRiverTransition: {
    durationSeconds: MOTION_DURATIONS.cinematic,
    ease: MOTION_EASINGS.enter,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "expressive",
  },
  cinematicDustTransition: {
    durationSeconds: MOTION_DURATIONS.smooth,
    ease: MOTION_EASINGS.organic,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "expressive",
  },
  cinematicLightTransition: {
    durationSeconds: MOTION_DURATIONS.smooth,
    ease: MOTION_EASINGS.standard,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "expressive",
  },
  cinematicNightfallTransition: {
    durationSeconds: MOTION_DURATIONS.cinematic,
    ease: MOTION_EASINGS.cinematic,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "cinematic",
  },
  // Interactive & Micro-interactions
  storyCardEntrance: {
    durationSeconds: MOTION_DURATIONS.normal,
    ease: MOTION_EASINGS.enter,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "standard",
  },
  favoriteBookmarkBurst: {
    durationSeconds: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.standard,
    reducedMotionFallback: "none",
    tech: "framer",
    intensity: "expressive",
  },
  storyCompletionEnter: {
    durationSeconds: MOTION_DURATIONS.cinematic,
    ease: MOTION_EASINGS.cinematic,
    reducedMotionFallback: "crossfade",
    tech: "framer",
    intensity: "cinematic",
  },
};
