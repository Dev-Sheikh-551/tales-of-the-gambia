import { Story, StoryCategory, ContentType, ProvenanceConfidence } from "@/types/story";

export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
}

export interface StoryValidationReport {
  storySlug: string;
  storyTitle: string;
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface CollectionValidationReport {
  totalStories: number;
  validStories: number;
  hasErrors: boolean;
  reports: StoryValidationReport[];
  collectionErrors: ValidationError[];
}

const VALID_CATEGORIES: StoryCategory[] = [
  "folktale",
  "fable",
  "legend",
  "historical",
  "children",
  "bedtime",
];

const VALID_CONTENT_TYPES: ContentType[] = [
  "traditional",
  "historical",
  "adapted",
  "original-fiction",
];

/**
 * Validates a single story object for content completeness, cultural integrity,
 * scene structure, and playback compatibility.
 */
export function validateStory(story: Story): StoryValidationReport {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  const addError = (field: string, message: string) =>
    errors.push({ field, message, severity: "error" });

  const addWarning = (field: string, message: string) =>
    warnings.push({ field, message, severity: "warning" });

  // 1. Core Identifiers
  if (!story.id || story.id.trim() === "") {
    addError("id", "Story ID is missing or empty.");
  }

  if (!story.slug || story.slug.trim() === "") {
    addError("slug", "Story slug is missing or empty.");
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(story.slug)) {
    addError("slug", `Slug "${story.slug}" is not a valid kebab-case string.`);
  }

  if (!story.title || story.title.trim() === "") {
    addError("title", "Story title is missing or empty.");
  }

  if (!story.description || story.description.trim() === "") {
    addError("description", "Story description is missing or empty.");
  }

  // 2. Classification Checks
  if (!VALID_CATEGORIES.includes(story.category)) {
    addError("category", `Invalid category: "${story.category}". Must be one of: ${VALID_CATEGORIES.join(", ")}.`);
  }

  if (!VALID_CONTENT_TYPES.includes(story.contentType)) {
    addError("contentType", `Invalid contentType: "${story.contentType}". Must be one of: ${VALID_CONTENT_TYPES.join(", ")}.`);
  }

  // 3. Cultural Integrity Rules & Provenance Guards
  if (story.contentType === "original-fiction") {
    if (story.provenance?.sourceType === "oral-tradition" || story.provenance?.sourceType === "archival-manuscript") {
      addError(
        "provenance.sourceType",
        'Original fiction must not claim "oral-tradition" or "archival-manuscript" source types (Rule A & B).'
      );
    }
    if (story.provenance?.provenanceConfidence === "documented") {
      addError(
        "provenance.provenanceConfidence",
        'Original fiction must not claim "documented" provenance confidence.'
      );
    }
  }

  if (story.contentType === "traditional" || story.contentType === "historical") {
    if (!story.provenance) {
      addError(
        "provenance",
        `Stories classified as "${story.contentType}" must have a populated provenance declaration.`
      );
    } else {
      if (!story.provenance.authenticityStatement || story.provenance.authenticityStatement.trim() === "") {
        addError(
          "provenance.authenticityStatement",
          "An explicit cultural authenticityStatement is mandatory."
        );
      }
    }
  }

  if (story.contentType === "historical") {
    if (!story.historicalContext) {
      addWarning(
        "historicalContext",
        "Historical stories should provide historicalContext to clearly separate documented facts from narrative dramatization (Rule E)."
      );
    } else if (!story.historicalContext.narrativeReconstructionNotes) {
      addWarning(
        "historicalContext.narrativeReconstructionNotes",
        "Historical stories should provide narrativeReconstructionNotes to explain which dialogue/scenes are creative reconstructions."
      );
    }
  }

  if (story.contentType === "adapted") {
    if (!story.provenance?.adaptationNotes && !story.provenance?.authenticityStatement) {
      addWarning(
        "provenance.adaptationNotes",
        "Adapted stories should provide adaptationNotes disclosing what was changed from the traditional motif (Rule D)."
      );
    }
  }

  // 4. Scene Architecture & Playback Compatibility
  if (!story.scenes || !Array.isArray(story.scenes) || story.scenes.length === 0) {
    addError("scenes", "Story must contain at least one scene.");
  } else {
    const seenSceneIds = new Set<string>();
    const seenSceneNumbers = new Set<number>();
    let totalCalculatedDuration = 0;

    story.scenes.forEach((scene, index) => {
      const sceneLabel = `scenes[${index}] (Scene ${scene.sceneNumber || index + 1})`;

      // Duplicate IDs
      if (!scene.id || scene.id.trim() === "") {
        addError(`${sceneLabel}.id`, "Scene ID is missing or empty.");
      } else if (seenSceneIds.has(scene.id)) {
        addError(`${sceneLabel}.id`, `Duplicate scene ID: "${scene.id}".`);
      } else {
        seenSceneIds.add(scene.id);
      }

      // Duplicate Scene Numbers
      if (typeof scene.sceneNumber !== "number") {
        addError(`${sceneLabel}.sceneNumber`, "Scene number must be a valid number.");
      } else if (seenSceneNumbers.has(scene.sceneNumber)) {
        addError(`${sceneLabel}.sceneNumber`, `Duplicate sceneNumber: ${scene.sceneNumber}.`);
      } else {
        seenSceneNumbers.add(scene.sceneNumber);
      }

      // Narrative Content
      if (!scene.title || scene.title.trim() === "") {
        addError(`${sceneLabel}.title`, "Scene title is missing or empty.");
      }

      if (!scene.text || scene.text.trim() === "") {
        addError(`${sceneLabel}.text`, "Scene narrative text is missing or empty.");
      } else if (scene.text.trim().length < 25) {
        addWarning(`${sceneLabel}.text`, "Scene narrative text appears unusually short (< 25 characters).");
      }

      // Playback Durations
      if (typeof scene.durationSeconds !== "number" || scene.durationSeconds <= 0) {
        addError(`${sceneLabel}.durationSeconds`, `Invalid duration: ${scene.durationSeconds}. Must be > 0.`);
      } else {
        totalCalculatedDuration += scene.durationSeconds;
      }
    });

    // Cross-check total listening duration against sum of scene durations
    if (story.listeningDurationSeconds && Math.abs(story.listeningDurationSeconds - totalCalculatedDuration) > 5) {
      addWarning(
        "listeningDurationSeconds",
        `Story listeningDurationSeconds (${story.listeningDurationSeconds}s) differs from sum of scene durations (${totalCalculatedDuration}s).`
      );
    }
  }

  // 5. Themes and Characters
  if (!story.themes || story.themes.length === 0) {
    addWarning("themes", "Story has no themes assigned; search discovery may be reduced.");
  }

  if (!story.characters || story.characters.length === 0) {
    addWarning("characters", "Story has no characters listed.");
  }

  return {
    storySlug: story.slug || "unknown",
    storyTitle: story.title || "Untitled",
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates an entire collection of stories for internal consistency,
 * ensuring no duplicate slugs or identifiers exist across the catalog.
 */
export function validateStoryCollection(stories: Story[]): CollectionValidationReport {
  const collectionErrors: ValidationError[] = [];
  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();

  stories.forEach((story, idx) => {
    if (story.slug) {
      if (seenSlugs.has(story.slug)) {
        collectionErrors.push({
          field: `stories[${idx}].slug`,
          message: `Duplicate story slug in collection: "${story.slug}".`,
          severity: "error",
        });
      } else {
        seenSlugs.add(story.slug);
      }
    }

    if (story.id) {
      if (seenIds.has(story.id)) {
        collectionErrors.push({
          field: `stories[${idx}].id`,
          message: `Duplicate story ID in collection: "${story.id}".`,
          severity: "error",
        });
      } else {
        seenIds.add(story.id);
      }
    }
  });

  const reports = stories.map(validateStory);
  const validStories = reports.filter((r) => r.isValid).length;
  const hasStoryErrors = reports.some((r) => !r.isValid);
  const hasErrors = hasStoryErrors || collectionErrors.length > 0;

  return {
    totalStories: stories.length,
    validStories,
    hasErrors,
    reports,
    collectionErrors,
  };
}

/**
 * Throws a descriptive Error if any validation errors are detected in the collection.
 * Intended for development sanity checks and build verification scripts.
 */
export function assertValidStoryCollection(stories: Story[]): void {
  const result = validateStoryCollection(stories);
  if (result.hasErrors) {
    const errorDetails = result.reports
      .filter((r) => !r.isValid)
      .map(
        (r) =>
          `[${r.storySlug}] ${r.errors.map((e) => `${e.field}: ${e.message}`).join("; ")}`
      )
      .concat(result.collectionErrors.map((e) => `[Collection] ${e.field}: ${e.message}`))
      .join("\n");

    throw new Error(`Story Collection Validation Failed (${result.totalStories - result.validStories} invalid stories):\n${errorDetails}`);
  }
}
