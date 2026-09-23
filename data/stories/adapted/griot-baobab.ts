import { Story } from "@/types/story";

export const griotBaobabStory: Story = {
  id: "story-3",
  slug: "the-griot-under-the-baobab",
  title: "The Griot Under the Baobab",
  subtitle: "The stringed memory of the 21-string Kora",
  description:
    "[Curated Historical Narrative] An elder Jali tunes his kora as the village fire crackles under a five-hundred-year-old baobab. He shares how memory is kept not on fragile paper, but in the singing hands and hearts of the people.",
  category: "historical",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Central River / Janjanbureh",
    community: "Janjanbureh & Niani historic traditions",
    ethnicGroup: "Mandinka Jali (Griot) heritage",
    culturalContext: "Narrative dramatization grounded in the documented traditions of the Senegambian Jali institution",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "research-based",
    collectorOrAuthor: "Editorial adaptation by Tales of The Gambia",
    sourceRef: {
      notes: "Informed by scholarship and documented ethnomusicology on the 21-string Senegambian kora, the Kaabu Empire oral traditions, and the hereditary Jali system of the Gambia River basin.",
    },
    originalLanguage: "Mandinka (cultural idiom); narrated in English",
    historicalPeriod: "Post-Kaabu cultural heritage (19th–20th century oral continuity)",
    adaptationNotes:
      "Arranged into three narrative scenes dramatizing the oral apprenticeship between a master Jali and his student. The historical traditions of kora construction and genealogical singing are factual; the individual characters (Jali Alieu and Kaddy) are fictional dramatizations.",
    authenticityStatement:
      "Documented Fact vs. Narrative Dramatization: The historical institutions described in this story — including the 21 strings of the kora, apprentice lineage, and oral preservation of Kaabu memory — are authentic, documented Senegambian traditions. The specific characters, personal names, and dialogues are creative dramatizations designed to bring the heritage to life.",
  },
  historicalContext: {
    era: "Kaabu Empire lineage continuity into the 19th–20th centuries",
    approximateDate: "Traditional post-Kaabu era (19th century onwards)",
    location: "Janjanbureh (Central River Region), The Gambia",
    documentedFigures: ["Hereditary Jali lineages of Senegambia (Kuyateh, Suso, Jobarteh, Diabate)"],
    documentedEvents: ["Oral transmission of Kaabu Empire epic history via 21-string kora"],
    narrativeReconstructionNotes:
      "The characters Jali Alieu and Kaddy are fictional composites representing the real master-apprentice pedagogy of the Jali community. Dialogue is an original narrative reconstruction, not historical quotation.",
    sources: [
      {
        title: "Ethnomusicological documentation of the Senegambian kora tradition",
        notes: "Historical background on the 21-string Mandinka kora, Kaabu royal history, and hereditary oral pedagogy.",
      },
    ],
  },
  narrative: {
    openingFormula:
      "Jali-baa ka kumoo la... When the master bard strokes the cowrie-studded wood, centuries awaken.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The strings grow quiet, but their resonance flows down the River Gambia to the ocean.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "A civilization is only as enduring as its memory. Books may crumble or burn, but what is sung from the heart survives every storm.",
    communalMoral:
      "A civilization is only as enduring as its memory. What is sung from the heart survives every storm.",
    contextualNotes: [
      "Jali (or Griot): Hereditary oral historian, genealogist, poet, and master musician across Senegambia.",
      "Kora: 21-string harp-lute made from a large calabash, cowhide, hardwood neck, and two parallel rows of strings.",
      "Kaabu Empire: Historical Mandinka kingdom spanning modern The Gambia, southern Senegal, and Guinea-Bissau (13th to 19th centuries).",
      "Dramatization Disclosure: Characters and spoken dialogue are original creative reconstructions.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 8,
  listeningDurationSeconds: 480,
  themes: ["Oral Heritage", "Griot Lineage", "The Kora", "Ancestral Memory"],
  characters: ["Jali Alieu", "Kaddy the Apprentice", "The Village Elders"],
  characterProfiles: [
    {
      id: "jali-alieu",
      name: "Jali Alieu",
      role: "elder",
      culturalSignificance:
        "Represents the unbroken hereditary chain of master musicians safeguarding communal history.",
      traits: ["Venerable", "Wise", "Artistic"],
      avatarTheme: "griot",
    },
    {
      id: "kaddy",
      name: "Kaddy the Apprentice",
      role: "protagonist",
      culturalSignificance:
        "Represents the rising generation learning to carry oral heritage forward into the modern world.",
      traits: ["Eager", "Respectful", "Attentive"],
    },
  ],
  coverImage: {
    src: "/images/stories/griot-baobab.svg",
    alt: "Elder griot seated beneath a massive baobab playing a calabash kora",
    paletteTheme: "earth",
  },
  scenes: [
    {
      id: "scene-3-1",
      sceneNumber: 1,
      title: "Tuning the Cowrie-Studded Bridge",
      text: "The calabash of the kora was smoothed by seventy years of palm oil and warm hands. With his thumbs and index fingers, Jali Alieu plucked the nyanyero strings. A crystalline chord drifted upward into the dense boughs of the baobab tree, where storks rested after a long flight from the river.",
      narration: "A cascade of resonant kora notes opens the night's story...",
      backgroundGradient: "from-[#2F1F17] via-[#211611] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["Jali Alieu", "Kaddy"],
      charactersData: [
        {
          id: "jali-alieu",
          name: "Jali Alieu",
          position: "center",
          expression: "focused",
          motion: "breathing",
          avatarTheme: "griot",
        },
      ],
      ambience: {
        type: "kora-strings",
        label: "Acoustic kora resonance in open air",
      },
      durationSeconds: 15,
    },
    {
      id: "scene-3-2",
      sceneNumber: 2,
      title: "A Library in the Blood",
      text: "'A book can burn, my daughter,' Jali Alieu spoke softly over the gentle vibration of the strings. 'A wall can crumble, and iron can turn to rust. But when a story lives in your breath, no drought or storm can ever steal your ancestors away.' Kaddy watched his fingers dance across the two rows of eleven and ten strings, committing every inflection to her memory.",
      narration: "His voice carried the weight and tenderness of seven generations.",
      backgroundGradient: "from-[#2A1D16] via-[#1C140F] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["Jali Alieu"],
      charactersData: [
        {
          id: "jali-alieu",
          name: "Jali Alieu",
          position: "center",
          expression: "speaking",
          motion: "breathing",
          avatarTheme: "griot",
        },
      ],
      ambience: {
        type: "village-fire",
        label: "Campfire embers snapping gently",
      },
      durationSeconds: 16,
    },
    {
      id: "scene-3-3",
      sceneNumber: 3,
      title: "Echoes on the River",
      text: "As midnight descended upon Janjanbureh, the elders bowed their heads in silent honor of the names sung into the dark. The music faded into the murmur of the Gambia River below the bluff. In Kaddy's hands, the kora felt lighter, as though the ancestors themselves were now steadying her grip.",
      narration: "The song ends, but the memory flows forever down the river.",
      backgroundGradient: "from-[#1F1712] via-[#16110D] to-[#0E0B09]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Jali Alieu", "Kaddy"],
      charactersData: [
        {
          id: "jali-alieu",
          name: "Jali Alieu",
          position: "center",
          expression: "peaceful",
          motion: "breathing",
          avatarTheme: "griot",
        },
      ],
      ambience: {
        type: "river-flow",
        label: "Quiet river currents under night sky",
      },
      durationSeconds: 15,
    },
  ],
};
