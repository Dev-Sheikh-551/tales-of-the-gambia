/**
 * Semantic intensity scale for animations in Tales of The Gambia V2.
 * Allows UI and cinematic layers to adapt dynamically based on context or device capability.
 */
export type MotionIntensity = "subtle" | "standard" | "expressive" | "cinematic";

/**
 * Underlying implementation technology selected per motion requirement
 */
export type AnimationTechnology =
  | "framer"   // Framer Motion (gesture, UI transitions, layout, scene orchestration)
  | "lottie"   // Lottie / dotLottie (expressive cultural moments, loading, celebration)
  | "css"      // Hardware-accelerated CSS (lightweight particles, shimmer, gradients)
  | "canvas";  // WebGL / 2D Canvas (dense atmospheric particles on high-end devices)

/**
 * Semantic duration tiers
 */
export type MotionDurationTier =
  | "instant"    // 0.1s - micro-interactions, haptic feedback sync
  | "fast"       // 0.2s - button taps, tooltips, toggles
  | "normal"     // 0.35s - modals, drawer reveals, standard scene caption fades
  | "smooth"     // 0.5s - page transitions, layout shifts
  | "cinematic"  // 0.8s - camera zoom adjustments, dramatic scene reveals
  | "panoramic"  // 1.5s - Ken Burns scene pans, epic atmosphere sweeps
  | "ambient";   // 3.0s+ - slow night star drifting, river shimmer

/**
 * Semantic category of animation
 */
export type MotionCategory =
  | "scene-transition"
  | "camera"
  | "character-entrance"
  | "atmosphere"
  | "ui-feedback"
  | "celebration"
  | "page-transition"
  | "audio-interaction";

/**
 * Device performance profile to adjust animation density
 */
export type DeviceMotionTier = "tier-1-flagship" | "tier-2-midrange" | "tier-3-budget";

/**
 * Centralized motion preset configuration contract
 */
export interface MotionPresetConfig {
  durationSeconds: number;
  ease: [number, number, number, number] | string;
  reducedMotionFallback: "still" | "crossfade" | "none";
  tech: AnimationTechnology;
  intensity: MotionIntensity;
}

/**
 * Motion token dictionary interface
 */
export interface MotionTokens {
  durations: Record<MotionDurationTier, number>;
  easings: {
    standard: [number, number, number, number];
    enter: [number, number, number, number];
    exit: [number, number, number, number];
    organic: [number, number, number, number];
    cinematic: [number, number, number, number];
  };
  springs: {
    gentle: { stiffness: number; damping: number; mass: number };
    snappy: { stiffness: number; damping: number; mass: number };
    bouncy: { stiffness: number; damping: number; mass: number };
  };
  stagger: {
    tight: number;
    normal: number;
    deliberate: number;
  };
  distances: {
    micro: number;
    sm: number;
    md: number;
    lg: number;
    cinematic: number;
  };
}
