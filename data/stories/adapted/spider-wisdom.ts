import { Story } from "@/types/story";

export const spiderWisdomStory: Story = {
  id: "story-6",
  slug: "the-spider-and-the-pot-of-wisdom",
  title: "The Spider and the Pot of Wisdom",
  subtitle: "How wisdom was scattered for the whole world to share",
  description:
    "[Curated Traditional Folktale] Anansi believed that by collecting all the world's wisdom into a clay pot, he alone would be revered. But climbing the tallest palm tree with both arms hugging a jar proves that greed and wisdom cannot walk the same branch.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "West Africa (Akan origin, Pan-West African circulation)",
    community: "West African trickster storytelling traditions",
    ethnicGroup: "Akan origin / West African circulation",
    culturalContext: "Adaptation of the classic West African Anansi trickster tale of shared wisdom",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Editorial adaptation by Tales of The Gambia",
    sourceRef: {
      notes: "The Anansi trickster figure originates in the oral tradition of the Akan (Ashanti) people of Ghana and spread across West Africa and the Atlantic diaspora. This retelling adapts the famous 'Pot of Wisdom' motif into a digital reading presentation.",
    },
    originalLanguage: "Akan (Twi) origin; shared in English retelling",
    historicalPeriod: "Pre-colonial West African oral canon",
    adaptationNotes:
      "Adapted into three distinct narrative scenes focusing on the hubris of hoarding communal knowledge. The retelling is in contemporary literary English.",
    authenticityStatement:
      "Cultural Origin Notice: Anansi is historically rooted in the Akan oral traditions of Ghana and the wider West African diaspora. This story is an editorial adaptation included to honor shared West African storytelling themes of collective wisdom, but is explicitly identified as an adaptation rather than indigenous Gambian oral history.",
  },
  narrative: {
    openingFormula:
      "Listen closely to the ancient tale of Anansi, weaver of webs and seeker of secrets...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And from that high palm top, wisdom took wing like gold dust across every town and creek.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "No single person can possess all wisdom. Knowledge shared feeds an entire kingdom; knowledge hoarded breaks the pot.",
    communalMoral:
      "Knowledge shared feeds an entire kingdom; knowledge hoarded breaks the pot.",
    contextualNotes: [
      "Anansi (Kwaku Ananse): The famous weaver-spider trickster originating in Akan mythology, celebrated across West Africa and the Caribbean.",
      "Clay Pot (Daga): Traditional earthenware vessel used to preserve water, grains, and medicinal roots.",
      "Cultural Context: This story openly discloses its Akan heritage to maintain cultural transparency in the Senegambian archive.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Humility", "Sharing Knowledge", "Trickster Wisdom"],
  characters: ["Anansi the Spider", "His Young Son Ntikuma"],
  characterProfiles: [
    {
      id: "anansi",
      name: "Anansi the Spider",
      role: "trickster",
      culturalSignificance:
        "Anansi embodies intellect untempered by humility, reminding listeners that cleverness alone does not equal wisdom.",
      traits: ["Resourceful", "Ambitious", "Short-sighted"],
      avatarTheme: "spider",
    },
    {
      id: "ntikuma",
      name: "Young Ntikuma",
      role: "elder",
      culturalSignificance:
        "The child whose simple observation disarms the clever trickster, proving wisdom belongs to humble eyes.",
      traits: ["Observant", "Innocent", "Practical"],
    },
  ],
  coverImage: {
    src: "/images/stories/spider-wisdom.svg",
    alt: "Stylized clay pot cracking open atop an oil palm tree, scattering golden sparks",
    paletteTheme: "gold",
  },
  scenes: [
    {
      id: "scene-6-1",
      sceneNumber: 1,
      title: "Gathering Every Whispered Word",
      text: "Anansi walked from village to village with a heavy earthen jar in his eight arms. Every time an elder spoke an insightful proverb by the fire or a mother taught her child how to weave a grass mat, Anansi snatched the thought from the air and sealed it tightly beneath the clay lid. 'When all wisdom is sealed in my jar,' he boasted to himself, 'the whole world will kneel at my door.'",
      narration: "He fancied himself the sole master of all human insight...",
      backgroundGradient: "from-[#2E2413] via-[#1E180E] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["Anansi"],
      charactersData: [
        {
          id: "anansi",
          name: "Anansi",
          position: "center",
          expression: "greedy",
          motion: "subtle-float",
          avatarTheme: "spider",
        },
      ],
      ambience: {
        type: "village-fire",
        label: "Distant village storytelling echoes",
      },
      durationSeconds: 14,
    },
    {
      id: "scene-6-2",
      sceneNumber: 2,
      title: "The Climb Up the Oil Palm",
      text: "To keep the jar beyond the reach of mortals, Anansi resolved to tie it to the highest crown of the tallest oil palm. But he tied the round pot to his belly, right in front of him. With every upward heave against the rough bark, the bulging clay banged against his chest, causing his claws to slip. At the foot of the tree stood his young son Ntikuma, watching in silence.",
      narration: "Climbing with a jar in front proved awkward even for eight skilled legs.",
      backgroundGradient: "from-[#281F10] via-[#1B150A] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Anansi", "Young Ntikuma"],
      charactersData: [
        {
          id: "anansi",
          name: "Anansi",
          position: "center",
          expression: "frustrated",
          motion: "breathing",
          avatarTheme: "spider",
        },
      ],
      ambience: {
        type: "gentle-wind",
        label: "Wind blowing through high palm fronds",
      },
      durationSeconds: 15,
    },
    {
      id: "scene-6-3",
      sceneNumber: 3,
      title: "Wisdom Scattered to the Winds",
      text: "'Father!' Ntikuma called up softly. 'Would it not be easier to climb if you strapped the pot to your back?' Anansi froze. Even with all the wisdom of the earth trapped inside his jar, he had not possessed the basic sense of a child. Enraged by his own folly, he flung the clay jar down. It shattered against the river stones into a thousand shards, and wisdom drifted on the breeze into every household, free for everyone to share.",
      narration: "The clay shattered, and sparkling seeds of wisdom scattered across the entire river valley.",
      backgroundGradient: "from-[#332612] via-[#20180B] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 60 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Anansi"],
      charactersData: [
        {
          id: "anansi",
          name: "Anansi",
          position: "right",
          expression: "humbled",
          motion: "subtle-float",
          avatarTheme: "spider",
        },
      ],
      ambience: {
        type: "gentle-wind",
        label: "Harmattan breeze whispering through palm crowns",
      },
      durationSeconds: 16,
    },
  ],
};
