import { Story, NarrationCue } from "@/types/story";
import nightfallScene01 from "@/data/audio/cues/nightfall-janjanbureh/scene-01.json";
import nightfallScene02 from "@/data/audio/cues/nightfall-janjanbureh/scene-02.json";


export const nightfallJanjanburehStory: Story = {
  id: "story-5",
  slug: "nightfall-over-janjanbureh",
  title: "Nightfall Over Janjanbureh",
  subtitle: "A peaceful nocturnal journey along the historic island riverbanks",
  description:
    "[Curated Atmospheric Bedtime Tale] An atmospheric sensory lullaby tracing the gentle lapping of river waters, the calls of nocturnal nightjars, and the moonlit silence of historic Janjanbureh Island.",
  category: "bedtime",
  contentType: "adapted",
  ageRange: "all-ages",
  origin: {
    region: "Janjanbureh Island / Central River",
    community: "Janjanbureh Island riverbanks",
    ethnicGroup: "Central River Region ecology & culture",
    culturalContext: "Atmospheric sensory bedtime narrative celebrating Central River ecology and landmarks",
    isDemoPlaceholder: false,
  },
  editorialStatus: "published",
  provenance: {
    sourceType: "literary-adaptation",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Editorial adaptation by Tales of The Gambia",
    sourceRef: {
      notes: "Original atmospheric bedtime prose inspired by the nocturnal environment, birdlife, and geography of Janjanbureh Island on the River Gambia.",
    },
    originalLanguage: "English (contemporary literary composition)",
    historicalPeriod: "Contemporary setting on the historic 19th-century island riverbanks",
    adaptationNotes:
      "Crafted specifically with gentle, slow cadence and nature imagery for calming bedtime reading and listening.",
    authenticityStatement:
      "This bedtime narrative celebrates authentic landmarks and nocturnal wildlife of Janjanbureh Island. It is an original literary composition designed for restful reading, rather than a recorded traditional bedtime legend.",
  },
  narrative: {
    openingFormula:
      "Suto-baa dulaa... When the island lights soften and the great river turns to molten glass...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "Sleep softly now, as the gentle current carries all thoughts away to the sea.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Rest is a gift of the night. Tomorrow the sun will rise anew over the great river.",
    communalMoral:
      "Rest is a gift of the night. Tomorrow the sun will rise anew over the great river.",
    contextualNotes: [
      "Janjanbureh: A historic island town in the Gambia River, celebrated for its 19th-century history, freedom monument, and majestic river scenery.",
      "Nightjar: A nocturnal bird with a soft, melodious whistle heard across Senegambian riverbanks after dusk.",
    ],
  },
  language: "English (Original Adaptation)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Tranquility", "Night Sky", "River Currents", "Rest"],
  characters: ["The River Ferryman", "The Nightjar Bird"],
  coverImage: {
    src: "/images/stories/janjanbureh-night.svg",
    alt: "Full moon reflecting on the calm surface of the Gambia River near Janjanbureh Island",
    paletteTheme: "river",
  },
  scenes: [
    {
      id: "scene-5-1",
      sceneNumber: 1,
      title: "The Moon on Still Waters",
      text: "The wooden ferry rests moored against the weathered wooden pilings at Janjanbureh. The river flows like liquid amber under the rising harvest moon. From the tall mahogany trees on the opposite shore, a lone nightjar sings two sweet, melodious notes, signaling to all the world that it is time to rest.",
      narration: "Allow the slow, steady rhythm of the river to settle your thoughts...",
      backgroundGradient: "from-[#132228] via-[#0E171C] to-[#0A0F12]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["The River Ferryman"],
      charactersData: [
        {
          id: "ferryman",
          name: "The Ferryman",
          position: "center",
          expression: "peaceful",
          motion: "breathing",
          avatarTheme: "boatman",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/nightfall-over-janjanbureh/scene-01-narration.mp3",
        narrationDurationSeconds: 20.23,
        cues: nightfallScene01 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-5-2",
      sceneNumber: 2,
      title: "Whispers of the Mahogany Trees",
      text: "A soft breeze blows across the river channel, rustling the thick leaves of the riverbank mahoganies. The crickets in the tall reeds keep time with the slow breathing of the tide. High above, the Milky Way arches across the African sky like a pathway of silver cowrie shells.",
      narration: "Breathe in the calm evening air, cool and fragrant with the river mist...",
      backgroundGradient: "from-[#0F1C20] via-[#0A1316] to-[#060C0E]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      characters: ["The River Ferryman"],
      charactersData: [
        {
          id: "ferryman",
          name: "The Ferryman",
          position: "center",
          expression: "serene",
          motion: "breathing",
          avatarTheme: "boatman",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/nightfall-over-janjanbureh/scene-02-narration.mp3",
        narrationDurationSeconds: 18.45,
        cues: nightfallScene02 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
