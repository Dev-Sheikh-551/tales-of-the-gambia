import { SceneAudio, NarrationCue } from "@/types/story";
import { DEFAULT_NARRATOR_ID } from "./registry";

export interface ResolvedSceneNarration {
  /** Resolved audio stream URL */
  narrationUrl?: string;
  /** Actual audio duration in seconds */
  narrationDurationSeconds?: number;
  /** Chronologically ordered word/sentence synchronization cues */
  cues?: NarrationCue[];
  /** Identifier of the narrator whose track was selected */
  narratorId: string;
  /** True if audio actually exists and is ready for playback */
  hasAudio: boolean;
}

/**
 * Resolves the audio narration track for a scene given an optional target narratorId.
 * Guarantees 100% backward compatibility with all V1 single-track scenes:
 *
 * 1. If multi-narrator dictionary `audio.narrations` has the requested narrator, uses that track.
 * 2. If requested narrator is not found in `audio.narrations`, checks for DEFAULT_NARRATOR_ID.
 * 3. Falls back seamlessly to the top-level V1 properties: `audio.narrationUrl`,
 *    `audio.narrationDurationSeconds`, and `audio.cues`.
 */
export function resolveSceneNarration(
  audio?: SceneAudio,
  requestedNarratorId?: string
): ResolvedSceneNarration {
  const targetNarratorId = requestedNarratorId || audio?.narratorId || DEFAULT_NARRATOR_ID;

  if (!audio) {
    return {
      narratorId: targetNarratorId,
      hasAudio: false,
    };
  }

  // 1. Check multi-narrator dictionary if present
  if (audio.narrations) {
    const specificTrack = audio.narrations[targetNarratorId];
    if (specificTrack && specificTrack.narrationUrl) {
      return {
        narrationUrl: specificTrack.narrationUrl,
        narrationDurationSeconds: specificTrack.narrationDurationSeconds,
        cues: specificTrack.cues,
        narratorId: specificTrack.narratorId,
        hasAudio: Boolean(specificTrack.narrationUrl),
      };
    }

    // Fallback to default narrator track in dictionary
    const defaultTrack = audio.narrations[DEFAULT_NARRATOR_ID];
    if (defaultTrack && defaultTrack.narrationUrl) {
      return {
        narrationUrl: defaultTrack.narrationUrl,
        narrationDurationSeconds: defaultTrack.narrationDurationSeconds,
        cues: defaultTrack.cues,
        narratorId: defaultTrack.narratorId,
        hasAudio: Boolean(defaultTrack.narrationUrl),
      };
    }
  }

  // 2. Seamless fallback to V1 top-level narration track
  const topLevelUrl = audio.narrationUrl;
  const topLevelDuration = audio.narrationDurationSeconds ?? audio.durationSeconds;
  const topLevelCues = audio.cues;

  return {
    narrationUrl: topLevelUrl,
    narrationDurationSeconds: topLevelDuration,
    cues: topLevelCues,
    narratorId: audio.narratorId || DEFAULT_NARRATOR_ID,
    hasAudio: Boolean(topLevelUrl && topLevelUrl.trim().length > 0),
  };
}
