/**
 * Tales of The Gambia — Offline Asset Resolver
 *
 * Computes the real, fetchable binary assets required to play a story offline.
 *
 * Rules:
 * 1. The canonical Story data is NOT a remote file. It is already present in-memory
 *    and serialized directly into the offline package (`embeddedStory`).
 * 2. Visual artwork is rendered via React SVG components (StoryArt, Canvas, and
 *    Framer Motion figures), so NO fake image URLs (/images/stories/...) are fetched.
 * 3. Narration cues are bundled in the TypeScript story data and serialized directly
 *    into the package scenes, so NO remote cue JSON URLs are fetched.
 * 4. Only real, existing binary assets (narration MP3 audio files in public/)
 *    and any genuinely referenced animation assets are included in the download list.
 */

import type { Story } from "@/types/story";
import type { OfflineAssetEntry } from "@/types/offline";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { DEFAULT_NARRATOR_ID } from "@/lib/narrators/registry";
import { ANIMATION_REGISTRY, AnimationAssetId } from "@/lib/animations/registry";

/** Estimated size constants */
const AUDIO_FALLBACK_BYTES = 320 * 1024; // ~320 KB per scene at 64 kbps speech
const ESTIMATED_METADATA_BYTES = 25 * 1024; // ~25 KB serialized story JSON

export interface ResolvedAssetManifest {
  assets: OfflineAssetEntry[];
  audioAssets: string[];
  imageAssets: string[];
  animationAssets: string[];
  dataAssets: string[];
  totalEstimatedBytes: number;
  hasNarrationAudio: boolean;
}

/**
 * Resolves all real binary assets needed to serve a story offline.
 */
export function resolveStoryAssets(
  story: Story,
  narratorId: string = DEFAULT_NARRATOR_ID
): ResolvedAssetManifest {
  const assets: OfflineAssetEntry[] = [];
  const audioAssets: string[] = [];
  const imageAssets: string[] = [];
  const animationAssets: string[] = [];
  const dataAssets: string[] = [];
  let totalEstimatedBytes = ESTIMATED_METADATA_BYTES;
  let hasNarrationAudio = false;

  // 1. Resolve narration audio MP3 files
  for (const scene of story.scenes) {
    const resolved = resolveSceneNarration(scene.audio, narratorId);

    if (resolved.hasAudio && resolved.narrationUrl) {
      hasNarrationAudio = true;
      const estAudioBytes =
        resolved.narrationDurationSeconds && resolved.narrationDurationSeconds > 0
          ? Math.round((resolved.narrationDurationSeconds * 64 * 1024) / 8)
          : AUDIO_FALLBACK_BYTES;

      if (!audioAssets.includes(resolved.narrationUrl)) {
        audioAssets.push(resolved.narrationUrl);
        assets.push({
          url: resolved.narrationUrl,
          type: "audio",
          required: true,
          fileSizeBytes: estAudioBytes,
        });
        totalEstimatedBytes += estAudioBytes;
      }
    }

    // 2. Check if this scene timeline explicitly references any Lottie effect
    if (scene.timeline?.events) {
      for (const event of scene.timeline.events) {
        if (event.payload.target === "effect") {
          const lottieId = (event.payload as { lottieId?: AnimationAssetId }).lottieId;
          if (lottieId && ANIMATION_REGISTRY[lottieId]) {
            const animDef = ANIMATION_REGISTRY[lottieId];
            if (!animationAssets.includes(animDef.src)) {
              animationAssets.push(animDef.src);
              assets.push({
                url: animDef.src,
                type: "animation",
                required: false,
                fileSizeBytes: 60 * 1024,
              });
              totalEstimatedBytes += 60 * 1024;
            }
          }
        }
      }
    }
  }

  return {
    assets,
    audioAssets,
    imageAssets,
    animationAssets,
    dataAssets,
    totalEstimatedBytes,
    hasNarrationAudio,
  };
}

/** Formats byte count as a human-readable string */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
