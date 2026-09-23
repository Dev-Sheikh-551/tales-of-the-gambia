# Tales of The Gambia — Content Ingestion & Editorial Standard

This directory contains the modular story archive for **Tales of The Gambia**. This document defines the editorial standards, content integrity rules, classification boundaries, and validation workflow required when adding new stories to the platform.

---

## 1. Directory Structure

Stories are organized in modular files by content type and category:

```text
data/stories/
├── traditional/       # Verifiable oral tradition recordings and documented field collections
├── historical/        # Documented historical narratives with historicalContext scaffolding
├── legends/           # Culturally transmitted legendary lore and mythic narratives
├── adapted/           # Retellings/reconstructions of traditional motifs, fables, and epics
├── children/          # Stories specifically paced and adapted for young listeners
├── bedtime/           # Atmospheric, tranquil lullaby narratives for evening reading
├── original/          # Transparently declared contemporary original fiction
├── index.ts           # Central registry exporting STORIES, helper selectors, and validation
├── validateStory.ts   # Development-time content integrity validation helper
└── README.md          # This documentation file
```

---

## 2. Content Ingestion Process

When ingesting a researched story into the platform, follow this sequential workflow:

```text
1. Research & Document
       ↓
2. Identify Oral Tradition / Motif
       ↓
3. Determine Content Type & Category
       ↓
4. Faithfully Reconstruct Narrative Beats
       ↓
5. Disclose Adaptation / Reconstruction Notes
       ↓
6. Structure into Natural Scenes
       ↓
7. Populate Provenance & Metadata
       ↓
8. Validate with validateStory()
       ↓
9. Register in data/stories/index.ts
       ↓
10. Test Route, Reader, Search & Story Mode
```

---

## 3. Story Metadata Schema

Every production story file must export a single typed `Story` object adhering to `types/story.ts`.

### Core Fields (Mandatory)
- **`id`**: Unique string identifier (e.g., `"story-hare-hyena"`).
- **`slug`**: Kebab-case URL slug matching the filename (e.g., `"the-clever-hare-and-the-hyena"`).
- **`title`**: Full primary title.
- **`subtitle`**: Poetic or narrative subtitle.
- **`description`**: 2–3 sentence catalog summary.
- **`category`**: One of the six canonical categories:
  - `"folktale"` | `"fable"` | `"legend"` | `"historical"` | `"children"` | `"bedtime"`
- **`contentType`**: Explicit ethical classification:
  - `"traditional"` | `"historical"` | `"adapted"` | `"original-fiction"`
- **`editorialStatus`**: Workflow stage:
  - `"research-needed"` → `"draft"` → `"reviewed"` → `"published"`
- **`origin.region`**: Specific Gambian region (e.g., `"North Bank"`, `"Central River"`, `"Lower River"`, `"West Coast"`, `"Greater Banjul"`) or `"Senegambia"`.
- **`origin.culturalContext`**: Explanation of cultural life and background.
- **`origin.isDemoPlaceholder`**: Must be `false` for real stories.
- **`scenes`**: Array of sequential narrative scenes (minimum 1, following natural beats).
- **`themes`**: Array of searchable theme keywords.
- **`characters`**: Array of searchable character names.
- **`language`**: Display language (e.g., `"English"` or `"English (Adapted)"`).
- **`coverImage.paletteTheme`**: One of `"earth"` | `"river"` | `"ochre"` | `"forest"` | `"gold"`.

### Cultural & Provenance Fields (Include where known — leave undefined if unknown)
- **`origin.community`**: Specific ethnic or village community (e.g., `"Mandinka"`, `"Wolof"`, `"Fula"`, `"Jola"`).
- **`provenance.sourceType`**: Source origin (`"oral-tradition"`, `"field-recording"`, `"archival-manuscript"`, `"published-anthology"`, `"literary-adaptation"`, `"contemporary-fiction"`).
- **`provenance.provenanceConfidence`**: Evidentiary certainty:
  - `"documented"`: Traceable to a named, verifiable publication or recording.
  - `"community-attributed"`: Attributed to a living oral tradition without a single text.
  - `"research-based"`: Grounded in historical documentation; narrative is a dramatization.
  - `"editorial-adaptation"`: Modern retelling of an authentic traditional motif.
  - `"original-fiction"`: Explicitly creative fiction; no folklore claimed.
- **`provenance.sourceRef`**: Structured citation (`title`, `author`, `institution`, `year`, `url`, `notes`).
- **`provenance.originalLanguage`**: Documented oral language of transmission.
- **`provenance.historicalPeriod` / `historicalEra`**: Documented period (e.g., `"19th century Kaabu continuity"`).
- **`provenance.adaptationNotes`**: Discloses what narrative elements were modified, simplified, or reconstructed.
- **`provenance.authenticityStatement`**: Clear, unambiguous statement explaining what is authentic vs. what is an editorial reconstruction.

### Historical Scaffolding (Required for `historical` stories)
- **`historicalContext.era`**: Documented historical era.
- **`historicalContext.approximateDate`**: Specific date or date range.
- **`historicalContext.location`**: Documented historical geography.
- **`historicalContext.documentedFigures`**: Names of real historical people referenced.
- **`historicalContext.documentedEvents`**: Names of real historical events referenced.
- **`historicalContext.narrativeReconstructionNotes`**: Explains which dialogue, interpersonal exchanges, or descriptive scenes are editorial dramatizations rather than historical quotations.

### Oral Narrative Framing (Optional)
- **`narrative.openingFormula`**: Oral opening phrase.
- **`narrative.openingFormulaSource`**: `"documented-oral"` | `"adapted-framing"` | `"original"`.
- **`narrative.closingFormula`**: Oral closing phrase.
- **`narrative.closingFormulaSource`**: `"documented-oral"` | `"adapted-framing"` | `"original"`.
- **`narrative.culturalMoral` / `narrative.communalMoral`**: Communal lesson taught by the narrative.
- **`narrative.contextualNotes`**: Glossary entries explaining indigenous terms (e.g., *Bantaba*, *Kora*, *Bolong*).

---

## 4. Content Classification Standards

Category and Content Type represent two independent dimensions:

### Content Types (Ethical Dimension)
1. **`traditional`**: A documented traditional oral narrative associated with a specific community or published folklore record. Never apply this label to newly written prose unless it reflects a documented recording.
2. **`historical`**: A narrative concerning documented historical figures, battles, migrations, or kingdoms. Must distinguish documented facts from dramatization.
3. **`adapted`**: An editorial retelling or literary reconstruction based on an existing traditional, legendary, or historical motif.
4. **`original-fiction`**: New creative material written for Tales of The Gambia. Must be explicitly declared as such. Never disguise original fiction as oral history or ancient folklore.

### Presentation Categories (Experience Dimension)
1. **`folktale`**: Human community tales exploring morality, wisdom, humility, and human nature.
2. **`fable`**: Animal allegories illustrating wit, resourcefulness, greed, and communal balance.
3. **`legend`**: Mythic lore, sacred river spirits, guardian entities, and sacred landmarks.
4. **`historical`**: Memories of kings, griots, migrations, and landmark Senegambian events.
5. **`children`**: Lively stories structured for young readers. (Does not automatically mean traditional).
6. **`bedtime`**: Calming, atmospheric lullaby stories set under the Gambian evening sky.

---

## 5. Natural Story Length Principle

- **No arbitrary word counts**: Do not pad short fables with unnecessary dialogue or filler description. A 600-word trickster fable should remain concise if the oral motif is concise.
- **No artificial condensation**: Long oral epics and historical narratives (1,500–2,500+ words) should be allowed their full dramatic breadth.
- **Scene counts follow narrative beats**:
  - Short folktales / fables: 3–4 scenes.
  - Medium narratives: 5–8 scenes.
  - Substantial historical epics: 8–12+ scenes.
- The cinematic playback engine dynamically adapts to any number of scenes via `story.scenes.length` and deterministic `durationSeconds`.

---

## 6. Content Integrity Rules

Every contributor and editor must uphold the following seven integrity rules:

- **Rule A — No fabricated provenance**: If we do not know who recorded, collected, translated, or published a story, write `"Undocumented"` or leave the field undefined. Never invent phantom archives or elders.
- **Rule B — No false cultural attribution**: Popularity in West Africa does not automatically make a story Gambian. If an Anansi story originates in Akan (Ghanaian) lore, declare that origin honestly.
- **Rule C — Identify traditions carefully**: Where verifiable, distinguish Mandinka, Wolof, Fula, Jola, Serer, Senegambian, or broad West African traditions. When uncertain, prefer `"Senegambian (shared motif)"` over guessing.
- **Rule D — Disclose adaptations openly**: If we reconstruct dialogue, pacing, or scene splits for digital presentation, explicitly disclose this in `adaptationNotes` and `authenticityStatement`.
- **Rule E — Separate historical fact from dramatization**: Documented historical facts (dates, battles, real kings) must never be conflated with invented dialogue or dramatized scenes. Use `historicalContext.narrativeReconstructionNotes`.
- **Rule F — Translation is not fabrication**: Translating an oral tale into accessible literary English while preserving its cultural integrity is encouraged, provided the translation is transparently noted.
- **Rule G — Conservative classification**: When in doubt between `traditional` and `adapted`, always classify as `adapted`.

---

## 7. Editorial Workflow

Stories progress through four explicit statuses:

```text
research-needed  → Content gathered; provenance, community, or language needs verification.
      ↓
    draft        → Narrative drafted and divided into scenes; metadata partially complete.
      ↓
   reviewed      → Narrative and provenance reviewed against the 7 Integrity Rules.
      ↓
  published      → Ready for live reader catalog, search indexing, and static build.
```

---

## 8. Validation Utility

A lightweight validation utility is provided at `data/stories/validateStory.ts`:

```typescript
import { validateStory, validateStoryCollection, assertValidStoryCollection } from "@/data/stories";

// Validate an individual story
const report = validateStory(myNewStory);
if (!report.isValid) {
  console.error("Story validation errors:", report.errors);
}

// Validate the entire registered collection
assertValidStoryCollection(STORIES);
```

Run type-checking and build verification anytime:
```bash
npm run typecheck
npm run build
```
