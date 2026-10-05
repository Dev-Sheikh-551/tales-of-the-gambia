import { SceneAudio, NarrationCue } from "@/types/story";
import { DEFAULT_NARRATOR_ID } from "./registry";

export type ResolvedNarrationStatus =
  | "available"   // Requested narrator track is present and validated
  | "fallback"    // Requested narrator not found; fell back to default narrator track
  | "unavailable" // Requested narrator not found and no fallback track available
  | "missing";    // Scene has no audio configured

export interface CueValidationResult {
  isValid: boolean;
  reason?: string;
  sanitizedCues?: NarrationCue[];
}

/**
 * Validates narration cues against timing monotonicity, duration bounds,
 * and valid character offsets.
 */
export function validateNarrationCues(
  cues: NarrationCue[] | undefined,
  durationSeconds?: number
): CueValidationResult {
  if (!cues || !Array.isArray(cues) || cues.length === 0) {
    return { isValid: false, reason: "No cues provided" };
  }

  const sanitized: NarrationCue[] = [];

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    if (
      typeof cue.startSeconds !== "number" ||
      typeof cue.endSeconds !== "number" ||
      isNaN(cue.startSeconds) ||
      isNaN(cue.endSeconds)
    ) {
      return {
        isValid: false,
        reason: `Cue ${i} missing valid start/end numeric timestamps`,
      };
    }

    if (cue.startSeconds >= cue.endSeconds) {
      return {
        isValid: false,
        reason: `Cue ${i} timing inverted (start: ${cue.startSeconds}s, end: ${cue.endSeconds}s)`,
      };
    }

    if (i > 0 && cue.startSeconds < sanitized[i - 1].startSeconds) {
      return {
        isValid: false,
        reason: `Cue ${i} start precedes cue ${i - 1} start (non-monotonic)`,
      };
    }

    if (durationSeconds && durationSeconds > 0 && cue.startSeconds > durationSeconds + 2) {
      return {
        isValid: false,
        reason: `Cue ${i} starts at ${cue.startSeconds}s, exceeding audio duration ${durationSeconds}s`,
      };
    }

    if (
      cue.charStart !== undefined &&
      cue.charEnd !== undefined &&
      cue.charStart > cue.charEnd
    ) {
      return {
        isValid: false,
        reason: `Cue ${i} char offsets inverted (${cue.charStart} > ${cue.charEnd})`,
      };
    }

    sanitized.push(cue);
  }

  return { isValid: true, sanitizedCues: sanitized };
}

export interface ResolvedSceneNarration {
  /** Resolved audio stream URL */
  narrationUrl?: string;
  /** Actual audio duration in seconds */
  narrationDurationSeconds?: number;
  /** Chronologically ordered word/sentence synchronization cues */
  cues?: NarrationCue[];
  /** Identifier of the narrator whose track was actually resolved */
  narratorId: string;
  /** Identifier of the narrator that was requested */
  requestedNarratorId: string;
  /** Whether the requested narrator was matched directly */
  isRequestedNarrator: boolean;
  /** Whether a fallback narrator track was used */
  fallbackUsed: boolean;
  /** True if audio actually exists and is ready for playback */
  hasAudio: boolean;
  /** Explicit status classification */
  status: ResolvedNarrationStatus;
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
      requestedNarratorId: targetNarratorId,
      isRequestedNarrator: false,
      fallbackUsed: false,
      hasAudio: false,
      status: "missing",
    };
  }

  // 1. Check multi-narrator dictionary if present
  if (audio.narrations) {
    const specificTrack = audio.narrations[targetNarratorId];
    if (specificTrack && specificTrack.narrationUrl) {
      const cueValidation = validateNarrationCues(
        specificTrack.cues,
        specificTrack.narrationDurationSeconds
      );
      return {
        narrationUrl: specificTrack.narrationUrl,
        narrationDurationSeconds: specificTrack.narrationDurationSeconds,
        cues: cueValidation.isValid ? cueValidation.sanitizedCues : specificTrack.cues,
        narratorId: specificTrack.narratorId,
        requestedNarratorId: targetNarratorId,
        isRequestedNarrator: true,
        fallbackUsed: false,
        hasAudio: Boolean(specificTrack.narrationUrl),
        status: "available",
      };
    }

    // Fallback to default narrator track in dictionary
    const defaultTrack = audio.narrations[DEFAULT_NARRATOR_ID];
    if (defaultTrack && defaultTrack.narrationUrl) {
      const cueValidation = validateNarrationCues(
        defaultTrack.cues,
        defaultTrack.narrationDurationSeconds
      );
      const isRequested = targetNarratorId === DEFAULT_NARRATOR_ID;
      return {
        narrationUrl: defaultTrack.narrationUrl,
        narrationDurationSeconds: defaultTrack.narrationDurationSeconds,
        cues: cueValidation.isValid ? cueValidation.sanitizedCues : defaultTrack.cues,
        narratorId: defaultTrack.narratorId,
        requestedNarratorId: targetNarratorId,
        isRequestedNarrator: isRequested,
        fallbackUsed: !isRequested,
        hasAudio: Boolean(defaultTrack.narrationUrl),
        status: isRequested ? "available" : "fallback",
      };
    }
  }

  // 2. Seamless fallback to V1 top-level narration track (Amara Gambia)
  const topLevelUrl = audio.narrationUrl;
  const topLevelDuration = audio.narrationDurationSeconds ?? audio.durationSeconds;
  const topLevelCues = audio.cues;
  const cueValidation = validateNarrationCues(topLevelCues, topLevelDuration);
  const validatedCues = cueValidation.isValid ? cueValidation.sanitizedCues : topLevelCues;

  const actualNarratorId = audio.narratorId || DEFAULT_NARRATOR_ID;
  const hasAudio = Boolean(topLevelUrl && topLevelUrl.trim().length > 0);

  if (!hasAudio) {
    return {
      narratorId: actualNarratorId,
      requestedNarratorId: targetNarratorId,
      isRequestedNarrator: false,
      fallbackUsed: false,
      hasAudio: false,
      status: "missing",
    };
  }

  const isDirectMatch = targetNarratorId === actualNarratorId;

  return {
    narrationUrl: topLevelUrl,
    narrationDurationSeconds: topLevelDuration,
    cues: validatedCues,
    narratorId: actualNarratorId,
    requestedNarratorId: targetNarratorId,
    isRequestedNarrator: isDirectMatch,
    fallbackUsed: !isDirectMatch,
    hasAudio: true,
    status: isDirectMatch ? "available" : "fallback",
  };
}
