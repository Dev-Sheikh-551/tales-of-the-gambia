import { NarrationCue } from "./story";

export type NarratorVoiceEngine =
  | "kokoro"
  | "piper"
  | "elevenlabs"
  | "openai"
  | "human"
  | "system"
  | "custom";

export type NarratorStyle =
  | "traditional-griot"
  | "warm-elder"
  | "playful-trickster"
  | "gentle-bedtime"
  | "dramatic-epic"
  | "scholarly";

export type NarratorLanguage =
  | "en-GM" // Gambian English
  | "en-GB" // British English
  | "en-US" // Standard English
  | "wo-SN" // Wolof
  | "mnk-GM" // Mandinka
  | "ff-GM"; // Fula / Pulaar

export type NarratorGenderPresentation = "female" | "male" | "neutral";

/**
 * First-class definition of a Storyteller / Narrator in Tales of The Gambia.
 * Supports multiple voice engines, cultural styles, and languages.
 */
export interface Narrator {
  /** Unique stable slug identifier (e.g. "amara-gambia", "elder-baboucar") */
  id: string;
  /** Display name shown to the user */
  name: string;
  /** Optional cultural or honorific title (e.g. "Griot Voice", "Village Elder") */
  title?: string;
  /** Factual, culturally grounded description of the narrator's tone and background */
  description: string;
  /** Technical voice identifier within the engine (e.g. "af_heart" in Kokoro) */
  voiceId: string;
  /** Speech synthesis or recording engine */
  voiceEngine: NarratorVoiceEngine;
  /** Expressive storytelling style */
  style: NarratorStyle;
  /** Primary spoken language / dialect */
  language: NarratorLanguage;
  /** Descriptive regional accent */
  accent: string;
  /** Vocal gender presentation */
  presentation?: NarratorGenderPresentation;
  /** Whether audio tracks for this narrator are currently available in the app */
  available: boolean;
  /** Whether this narrator is the default system storyteller */
  isDefault?: boolean;
  /** Optional badge label (e.g. "Original Griot", "Coming in V2") */
  badge?: string;
  /** Slugs of stories this narrator supports. If undefined, supports all available stories */
  supportedStorySlugs?: string[];
  /** Optional portrait or avatar icon URL */
  avatarUrl?: string;
  /** Attribution or voice talent credits */
  credits?: string;
}

/**
 * A discrete narration track for a single scene rendered by a specific narrator.
 * Used in multi-narrator scene audio configurations.
 */
export interface SceneNarrationTrack {
  narratorId: string;
  narrationUrl: string;
  narrationDurationSeconds: number;
  cues?: NarrationCue[];
  waveformUrl?: string;
  fileSizeBytes?: number;
  generatedAt?: string;
}
