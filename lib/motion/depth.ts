import { DeviceMotionQuality, SceneDepthConfig } from "@/types/motion";

/**
 * Explicit, predictable z-index stack for the cinematic storytelling scene.
 * Guarantees captions, narration text, and controls are strictly above all visual and foreground layers.
 */
export const CINEMATIC_Z_INDEX = {
  background: 0,
  midground: 10,   // SceneAtmosphere (environmental weather, particles, stars)
  character: 20,   // SceneCharacterLayer (character silhouettes & motifs)
  foreground: 25,  // SceneForeground (peripheral grass, branches, reeds)
  caption: 30,     // SceneCaption (editorial narrative text, cue highlights)
  controls: 40,    // Transport & playback controls (play/pause, timeline scrubber)
  modal: 50,       // Full-screen overlays (resume prompt, search dialog)
} as const;

/**
 * Centralized depth scale factors per device quality tier.
 * Tuned per Phase 3.1 specifications:
 * - background: least movement (~0.02)
 * - midground: moderate movement (~0.05)
 * - character: stronger movement (~0.09)
 * - foreground: strongest movement (~0.15)
 */
export const CINEMATIC_DEPTH_FACTORS: Record<DeviceMotionQuality, SceneDepthConfig> = {
  high: {
    background: 0.02,
    midground: 0.05,
    character: 0.09,
    foreground: 0.15,
  },
  balanced: {
    background: 0.015,
    midground: 0.035,
    character: 0.06,
    foreground: 0.10,
  },
  low: {
    background: 0,
    midground: 0,
    character: 0,
    foreground: 0,
  },
};

/**
 * Calibrated viewport parallax tilt/translation sensitivity in pixels.
 * - Mobile (375x667, 390x844): 4px (subtle, ensures stability & legibility on small screens)
 * - Tablet (768x1024, 820x1180): 10px (moderate depth separation)
 * - Desktop (1280x720, 1440x900): 18px (strongest cinematic depth)
 */
export function getViewportParallaxIntensity(viewportWidth: number): number {
  if (viewportWidth < 640) {
    return 4; // Mobile
  }
  if (viewportWidth < 1024) {
    return 10; // Tablet
  }
  return 18; // Desktop
}

/**
 * Returns the effective scene depth configuration for a given device tier and reduced-motion state.
 */
export function getSceneDepthConfig(
  quality: DeviceMotionQuality = "balanced",
  reducedMotion: boolean = false
): SceneDepthConfig {
  if (reducedMotion) {
    return CINEMATIC_DEPTH_FACTORS.low;
  }
  return CINEMATIC_DEPTH_FACTORS[quality] || CINEMATIC_DEPTH_FACTORS.balanced;
}
