import { Narrator } from "@/types/narrator";

/**
 * Standard default narrator identifier across Tales of The Gambia
 */
export const DEFAULT_NARRATOR_ID = "amara-gambia";

/**
 * Central registry of all narrators.
 * Single source of truth for current and planned storytelling voices.
 */
export const NARRATORS: Narrator[] = [
  {
    id: DEFAULT_NARRATOR_ID,
    name: "Amara Gambia",
    title: "Griot Voice",
    description:
      "A resonant, warm storytelling cadence inspired by Gambian oral traditions and the measured pacing of traditional jalis.",
    voiceId: "af_heart",
    voiceEngine: "kokoro",
    style: "traditional-griot",
    language: "en-GM",
    accent: "Gambian English / West African",
    presentation: "female",
    available: true,
    isDefault: true,
    badge: "Available",
    credits: "Master narration pipeline calibrated for Gambian phonemes and folkloric pacing.",
  },
  {
    id: "elder-baboucar",
    name: "Elder Baboucar",
    title: "Village Elder",
    description:
      "A deep, deliberate, rhythmic voice carrying ancestral calm, ideal for ancient myths and reflective bedtime stories.",
    voiceId: "am_adam",
    voiceEngine: "kokoro",
    style: "warm-elder",
    language: "en-GM",
    accent: "Gambian English (Elder Mandinka inflection)",
    presentation: "male",
    available: false,
    badge: "Coming Soon",
  },
  {
    id: "kaddy-brikama",
    name: "Kaddy of Brikama",
    title: "Fable Teller",
    description:
      "A lively, dynamic, animated cadence suited for animal fables, trickster tales, and quick-witted dialogue.",
    voiceId: "af_bella",
    voiceEngine: "kokoro",
    style: "playful-trickster",
    language: "en-GM",
    accent: "Gambian English (Western Division rhythm)",
    presentation: "female",
    available: false,
    badge: "Coming Soon",
  },
  {
    id: "foday-jali",
    name: "Foday the Jali",
    title: "Epic Chronicler",
    description:
      "A commanding, resonant delivery reserved for Kaabu warfare chronicles, empire foundations, and heroic deeds.",
    voiceId: "am_michael",
    voiceEngine: "kokoro",
    style: "dramatic-epic",
    language: "en-GM",
    accent: "Gambian English (Traditional Griot cadence)",
    presentation: "male",
    available: false,
    badge: "Coming Soon",
  },
];

/**
 * Get the full list of registered narrators
 */
export function getAllNarrators(): Narrator[] {
  return NARRATORS;
}

/**
 * Get only narrators that have active audio tracks available
 */
export function getAvailableNarrators(): Narrator[] {
  return NARRATORS.filter((n) => n.available);
}

/**
 * Retrieve a narrator by their unique ID
 */
export function getNarratorById(id: string): Narrator | undefined {
  return NARRATORS.find((n) => n.id === id);
}

/**
 * Retrieve the default narrator
 */
export function getDefaultNarrator(): Narrator {
  return (
    NARRATORS.find((n) => n.isDefault) ||
    NARRATORS[0]
  );
}

/**
 * Check whether a narrator is supported for a specific story slug
 */
export function isNarratorSupportedForStory(
  narratorId: string,
  storySlug: string
): boolean {
  const narrator = getNarratorById(narratorId);
  if (!narrator || !narrator.available) return false;
  if (!narrator.supportedStorySlugs) return true; // Supports all stories
  return narrator.supportedStorySlugs.includes(storySlug);
}
