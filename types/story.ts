import type { SceneNarrationTrack } from "./narrator";
import type { SceneTimeline } from "./engine";

export type StoryCategory =
  | "folktale"
  | "fable"
  | "legend"
  | "historical"
  | "children"
  | "bedtime";

export type ContentType =
  | "traditional"
  | "historical"
  | "adapted"
  | "original-fiction";

/**
 * How confidently the provenance of this story can be asserted.
 *
 * - documented          — traceable to a named, verifiable source
 * - community-attributed — attributed to a community oral tradition; no specific text identified
 * - research-based      — informed by documented background; narrative is editorial reconstruction
 * - editorial-adaptation — editorial interpretation of real cultural material; creative elements present
 * - original-fiction    — explicitly creative; no folkloric or historical claim made
 */
export type ProvenanceConfidence =
  | "documented"
  | "community-attributed"
  | "research-based"
  | "editorial-adaptation"
  | "original-fiction";

/**
 * Editorial workflow status. All existing stories default to "published" if omitted.
 */
export type EditorialStatus =
  | "published"
  | "draft"
  | "research-needed"
  | "reviewed";

/**
 * Marks the origin of an oral formula.
 * - documented-oral  — sourced from a named, verified oral tradition record
 * - adapted-framing  — editorially constructed framing inspired by traditional style
 * - original         — purely original; no traditional basis claimed
 */
export type FormulaSource =
  | "documented-oral"
  | "adapted-framing"
  | "original";

/**
 * Structured source reference.
 * Prefer honest omission over invented detail — do not populate unless the information
 * has actually been verified.
 */
export interface SourceReference {
  title?: string;
  author?: string;
  institution?: string;
  year?: number | string;
  /** Only include a URL if it has been verified and is publicly accessible. */
  url?: string;
  notes?: string;
}

export interface SceneVisual {
  type?: "illustration" | "image" | "video" | "gradient";
  paletteTheme?: "ochre" | "river" | "earth" | "forest" | "gold";
  source?: string;
  focalPoint?: {
    x: number; // 0 to 100 percentage
    y: number; // 0 to 100 percentage
  };
}

export type CameraPreset =
  | "still"
  | "slow-push"
  | "slow-pull"
  | "horizontal-pan-left"
  | "horizontal-pan-right"
  | "vertical-reveal"
  | "diagonal-drift"
  | "dramatic-push"
  | "wide-establishing"
  | "character-reveal"
  | "environment-reveal"
  | "focus-shift"
  | "zoom-in"
  | "zoom-out"
  | "pan-left"
  | "pan-right"
  | "drift";

export interface CameraMotion {
  preset: CameraPreset;
  intensity?: "subtle" | "medium" | "dramatic";
  durationSeconds?: number;
  origin?: "center" | "top" | "bottom" | "left" | "right";
  direction?: "left" | "right" | "up" | "down";
  depth?: "shallow" | "medium" | "deep";
  focusTarget?: "character" | "environment" | "center";
}

export type CharacterMotionPreset =
  | "enter-left"
  | "enter-right"
  | "rise"
  | "reveal"
  | "turn"
  | "look"
  | "step"
  | "gesture"
  | "react"
  | "exit-left"
  | "exit-right"
  | "fade"
  | "dissolve"
  | "still"
  | "subtle-float"
  | "breathing"
  // Extended action vocabulary (used by animated storybook engine)
  | "stand"
  | "walk"
  | "run"
  | "approach"
  | "retreat"
  | "jump"
  | "fall"
  | "sit"
  | "crouch"
  | "kneel"
  | "lean"
  | "recline"
  | "look-left"
  | "look-right"
  | "look-up"
  | "look-down"
  | "focus"
  | "point"
  | "wave"
  | "raise-hand"
  | "reach"
  | "embrace"
  | "push"
  | "pull"
  | "paddle"
  | "pluck-kora"
  | "singing"
  | "fanning"
  | "labor"
  | "surprise"
  | "fear"
  | "concern"
  | "joy"
  | "triumphant"
  | "sadness"
  | "anger"
  | "curiosity"
  | "relief"
  | "determination"
  | "cunning-look"
  | "mock"
  | "disappear";

export interface CharacterMotionConfig {
  preset: CharacterMotionPreset;
  delay?: number;
  duration?: number;
}

export interface SceneCharacter {
  id: string;
  name: string;
  position: "far-left" | "left" | "center" | "right" | "far-right";
  expression?: string;
  motion?: CharacterMotionPreset;
  motionConfig?: CharacterMotionConfig;
  scale?: number;
  avatarTheme?:
    | "hare"
    | "elephant"
    | "tortoise"
    | "griot"
    | "boatman"
    | "shadow"
    | "pangolin"
    | "spider"
    | "kelefa"
    | "ninki-nanka"
    | "samba";
}

export interface EnvironmentMotion {
  type: "wind" | "river-ripples" | "fire-flicker" | "night-stars" | "dust-particles" | "heat-shimmer" | "rain" | "none";
  intensity?: "subtle" | "gentle" | "standard" | "expressive";
  density?: "sparse" | "normal" | "dense";
  direction?: "left" | "right" | "up" | "down";
  speed?: "slow" | "normal" | "fast";
  opacity?: number;
  depth?: "shallow" | "midground" | "deep";
}

export type ForegroundMotionType =
  | "grass-silhouettes"
  | "branches"
  | "reeds"
  | "leaves"
  | "soft-light"
  | "dust-drift"
  | "none";

export interface ForegroundMotion {
  enabled?: boolean;
  type?: ForegroundMotionType;
  intensity?: "subtle" | "standard";
}

export interface NarrationCue {
  /** 0-indexed cue position within the scene */
  index: number;
  /** Precise start offset in seconds relative to the scene narration audio */
  startSeconds: number;
  /** Precise end offset in seconds relative to the scene narration audio */
  endSeconds: number;
  /** The clean text matching the spoken audio */
  text: string;
  /** Character offset range into the scene text for fast DOM mapping */
  charStart?: number;
  charEnd?: number;
  /** Optional speaker tag for dialogues within the scene */
  speaker?: string;
}

export interface SceneAudio {
  narrationUrl?: string;
  /** Actual duration in seconds (from audio file metadata, not estimated). */
  narrationDurationSeconds?: number;
  /** Optional array of word/phrase/sentence cues ordered chronologically */
  cues?: NarrationCue[];
  /**
   * @deprecated Use narrationDurationSeconds. Kept for backward compat with scene-level fallback.
   */
  durationSeconds?: number;
  /**
   * Optional active narrator identifier for this track (e.g. "amara-gambia").
   * Defaults to DEFAULT_NARRATOR_ID if omitted.
   */
  narratorId?: string;
  /**
   * Multi-narrator track registry for this scene.
   * Maps narratorId -> SceneNarrationTrack.
   * Backward-compatible: if omitted or narratorId not found, the top-level
   * narrationUrl/cues are used directly.
   */
  narrations?: Record<string, SceneNarrationTrack>;
}

export interface SceneTransition {
  type:
    | "crossfade"
    | "dissolve"
    | "fade"
    | "cinematic-fade"
    | "wind"
    | "river"
    | "dust"
    | "light"
    | "nightfall"
    | "directional"
    | "curtain";
  durationSeconds?: number;
}

export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  narration?: string;
  text: string;
  backgroundGradient: string;
  characters: string[];
  charactersData?: SceneCharacter[];
  visual?: SceneVisual;
  cameraMotion?: CameraMotion;
  environmentMotion?: EnvironmentMotion;
  audio?: SceneAudio;
  transition?: SceneTransition;
  durationSeconds: number;
  foregroundMotion?: ForegroundMotion;
  timeline?: SceneTimeline;
}

// --- Cultural Provenance Model ---
export type ProvenanceSourceType =
  | "oral-tradition"
  | "field-recording"
  | "archival-manuscript"
  | "published-anthology"
  | "literary-adaptation"
  | "contemporary-fiction";

export interface StoryProvenance {
  sourceType: ProvenanceSourceType;
  /** Required: explicit confidence level for the provenance claim. */
  provenanceConfidence: ProvenanceConfidence;
  collectedFrom?: string;
  /**
   * @deprecated Use sourceRef (structured) instead. Kept for backward compatibility.
   */
  sourceReference?: string;
  /** Structured source reference — prefer over the legacy sourceReference string. */
  sourceRef?: SourceReference;
  collectorOrAuthor?: string;
  originalLanguage?: string;
  historicalPeriod?: string;
  /** Alias for historicalPeriod */
  historicalEra?: string;
  community?: string;
  adaptationNotes?: string;
  /** Required: an explicit cultural authenticity declaration for every story. */
  authenticityStatement: string;
}

// --- Extended Narrative Structure ---
export interface NarrativeFraming {
  openingFormula?: string;
  /** Documents whether the opening formula is from a verified source or editorially constructed. */
  openingFormulaSource?: FormulaSource;
  closingFormula?: string;
  /** Documents whether the closing formula is from a verified source or editorially constructed. */
  closingFormulaSource?: FormulaSource;
  culturalMoral?: string;
  /** Alias: communal framing of the moral for completion screen */
  communalMoral?: string;
  contextualNotes?: string[];
}

// --- Historical Context ---
export interface HistoricalContext {
  /** Broad historical period, e.g. "13th–19th century" */
  era?: string;
  /** Specific date or range where documented, e.g. "1867" or "c. 1750–1800" */
  approximateDate?: string;
  /** Geographic location relevant to the historical events */
  location?: string;
  /** Names of documented historical figures referenced in the narrative */
  documentedFigures?: string[];
  /** Names of documented historical events referenced */
  documentedEvents?: string[];
  /**
   * Required for historical stories: explains which narrative elements are
   * editorial reconstructions rather than documented fact.
   */
  narrativeReconstructionNotes?: string;
  /** Structured sources supporting the historical claims */
  sources?: SourceReference[];
}

// --- Extended Character Model ---
export interface CharacterProfile {
  id: string;
  name: string;
  role: "protagonist" | "antagonist" | "trickster" | "elder" | "guardian" | "chorus";
  culturalSignificance?: string;
  traits?: string[];
  avatarTheme?:
    | "hare"
    | "elephant"
    | "tortoise"
    | "griot"
    | "boatman"
    | "shadow"
    | "pangolin"
    | "spider"
    | "kelefa"
    | "ninki-nanka"
    | "samba";
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: StoryCategory;
  contentType: ContentType;
  /** Lightweight editorial workflow status. Defaults to "published" if omitted. */
  editorialStatus?: EditorialStatus;
  ageRange?: "all-ages" | "children" | "young-adult" | "adult";
  origin: {
    region: string;
    culturalContext: string;
    isDemoPlaceholder: boolean;
    community?: string;
    ethnicGroup?: string;
  };
  provenance?: StoryProvenance;
  narrative?: NarrativeFraming;
  /** Structured historical context — populate only for stories making historical claims. */
  historicalContext?: HistoricalContext;
  language: string;
  availableLanguages?: string[];
  readingTimeMinutes: number;
  listeningDurationSeconds: number;
  themes: string[];
  characters: string[];
  characterProfiles?: CharacterProfile[];
  coverImage: {
    src: string;
    alt: string;
    paletteTheme: "earth" | "river" | "ochre" | "forest" | "gold";
  };
  featured?: boolean;
  scenes: Scene[];
  /** Optional: name of narrator (human or AI provider label). Provider-agnostic. */
  narrator?: string;
  /** Optional: BCP-47 language tag for narration audio, e.g. "en-GM", "man-GM". */
  narrationLanguage?: string;
}

export interface StoryProgress {
  storySlug: string;
  currentSceneNumber: number;
  totalScenes: number;
  percentComplete: number;
  lastReadTimestamp: number;
  /** Audio seek position in seconds at the time of the last save. Optional — only set when narration audio was active. */
  audioPositionSeconds?: number;
}

/**
 * Persisted audio preferences stored under `totg_audio_settings`.
 * These survive page reloads and apply to every story.
 */
export interface AudioSettings {
  /** Narration volume, 0–1. Default: 1. */
  narrationVolume: number;
  /** Playback rate multiplier. Default: 1. */
  playbackRate: number;
}

export interface ReadingSettings {
  fontSize: "sm" | "base" | "lg" | "xl";
  theme: "midnight" | "parchment" | "river-dusk";
  lineHeight: "normal" | "relaxed" | "loose";
  reducedMotion: boolean;
}

export interface RecentStory {
  storyId: string;
  slug: string;
  timestamp: number;
}


