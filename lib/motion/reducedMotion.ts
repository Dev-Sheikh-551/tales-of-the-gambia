/**
 * Check if the active browser/runtime prefers reduced motion.
 * Safe for server-side rendering (returns false if window is undefined).
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns either the full expressive motion variant or an accessible reduced-motion fallback.
 */
export function getSafeMotionVariant<T>(
  fullVariant: T,
  reducedFallback: T,
  shouldReduceMotion: boolean
): T {
  return shouldReduceMotion ? reducedFallback : fullVariant;
}

/**
 * Common accessible fallback animation variants for Framer Motion
 */
export const REDUCED_MOTION_FALLBACKS = {
  /** Replaces spatial translation with a gentle, non-disorienting opacity fade */
  fadeOnly: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 },
  },
  /** Completely static, zero-duration appearance for characters or camera containers */
  instant: {
    initial: { opacity: 1, scale: 1, x: 0, y: 0 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 1 },
    transition: { duration: 0 },
  },
};
