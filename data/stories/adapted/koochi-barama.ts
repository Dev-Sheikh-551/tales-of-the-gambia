import { Story, NarrationCue } from "@/types/story";
import koochiScene01 from "@/data/audio/cues/koochi-barama/scene-01.json";
import koochiScene02 from "@/data/audio/cues/koochi-barama/scene-02.json";
import koochiScene03 from "@/data/audio/cues/koochi-barama/scene-03.json";
import koochiScene04 from "@/data/audio/cues/koochi-barama/scene-04.json";


export const koochiBaramaStory: Story = {
  id: "story-koochi-barama",
  slug: "koochi-barama-and-the-river-of-truth",
  title: "Koochi Barama and the River of Truth",
  subtitle: "The Jola moral fable of woven falsehoods, the sacred river crossing, and the burden of words",
  description:
    "Koochi Barama was celebrated as the most charming storyteller in Fogny, skilled at inventing harmless little falsehoods to smooth over troubles and escape chores. But when a bitter land boundary dispute between two friendly rice-farming villages hinges on his sworn testimony at the sacred river crossing, Koochi discovers that every spoken word carries a weight that the waters will not forgive.",
  category: "fable",
  contentType: "traditional",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Foni and the Fogny forest river basins)",
    community: "Jola oral folklore and ethical storytelling tradition",
    ethnicGroup: "Jola",
    culturalContext:
      "A revered moral tale documented by Sukai Mbye Bojang in her second volume of Gambian folktales. In traditional Jola culture, sacred river crossings and groves were places of divine arbitration where oaths were sworn before ancestral spirits.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 2)",
    sourceRef: {
      title: "The Story of Koochi Barama and the Consequences of Lies",
      notes: "Documented by Sukai Mbye Bojang in 'Folk Tales and Fables from The Gambia' (Vol. 2). Adapted with rich Jola cultural context and river imagery.",
    },
    originalLanguage: "Jola and Mandinka oral tradition",
    historicalPeriod: "Ancestral oral heritage",
    adaptationNotes:
      "Rendered into four compelling scenes: the boy who wove webs of words, the boundary dispute between the rice valleys, the trial at the sacred crossing, and the redemption of radical honesty.",
    authenticityStatement:
      "This story is an authentic Gambian moral fable recorded in the published educational folklore anthologies of Sukai Mbye Bojang.",
  },
  narrative: {
    openingFormula:
      "Kassumay! Listen to the rustle of the palm fronds, and hear how the sacred river washed away a mountain of clever words.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever two elders meet at a river crossing in Fogny, they speak only what is true, remembering Koochi Barama.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "A lie may run for a year like a fast deer, but the truth overtakes it in a single leap.",
    communalMoral:
      "Peace between neighbors is built on the rock of honest speech; a single false word can set a forest ablaze.",
    contextualNotes: [
      "Kassumay: The warm, universal greeting of peace among the Jola people ('Do you have peace?').",
      "Fogny: A historic Jola cultural region celebrated for its lush rice fields, palm groves, and sacred forests.",
      "Kajando: The traditional long-handled wooden spade used by Jola farmers to construct earthen dikes in flooded rice paddies.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Truth and Integrity", "Community Peace", "Reconciliation", "Honesty"],
  characters: ["Koochi Barama", "Elder Sékou", "The Village Council"],
  coverImage: {
    src: "/images/stories/spider-wisdom.svg",
    alt: "A young Jola youth standing at a sacred shallow river crossing between dense palm trees with village elders waiting on both banks",
    paletteTheme: "river",
  },
  featured: false,
  scenes: [
    {
      id: "scene-kb-1",
      sceneNumber: 1,
      title: "The Weaver of Air",
      text: "In the green heart of Fogny, where freshwater streams feed emerald rice valleys, lived Koochi Barama. Koochi possessed a tongue so smooth that people said he could convince a fish that drowning was a blessing. If he forgot to tie the family goats, he claimed a golden leopard had frightened them away. If he spilled a calabash of palm oil, he swore an invisible wind from the clouds had tipped it over. 'Words are like smoke,' Koochi laughed to his companions. 'They dance in the air, and then they disappear. Who could ever be hurt by smoke?'",
      narration: "A silver-tongued youth in Fogny who believed clever words vanished like harmless smoke in the wind.",
      backgroundGradient: "from-[#0E1E14] via-[#08140C] to-[#040A06]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Koochi Barama"],
      audio: {
        narrationUrl: "/audio/stories/koochi-barama-and-the-river-of-truth/scene-01-narration.mp3",
        narrationDurationSeconds: 34.95,
        cues: koochiScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-kb-2",
      sceneNumber: 2,
      title: "The Dispute Over the Rice Dike",
      text: "Trouble arrived when the rainy season flooded the valley between two neighboring villages that had lived in peace since their grandfathers' days. Both claimed ownership of a fertile high-ground strip where five hundred baskets of sweet rice could be harvested. To avoid armed strife with their heavy kajando spades, the elders agreed to consult the only person who had tended cattle along that ridge during the previous dry season: Koochi Barama. Knowing that both village headmen were eager to reward him, Koochi whispered conflicting promises to each, weaving two opposite webs to win favors from both sides.",
      narration: "A bitter land boundary dispute arose, and two communities placed their hopes of peace in a double-tongued witness.",
      backgroundGradient: "from-[#182014] via-[#0E140C] to-[#060A06]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["Koochi Barama", "Elder Sékou"],
      audio: {
        narrationUrl: "/audio/stories/koochi-barama-and-the-river-of-truth/scene-02-narration.mp3",
        narrationDurationSeconds: 41.62,
        cues: koochiScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-kb-3",
      sceneNumber: 3,
      title: "The Sacred River Crossing",
      text: "The village elders were not fools. They decreed that no words spoken on dry land would suffice. On the morning of the new moon, both entire villages gathered at the sacred river crossing of the Bintang tributary, where crystal water flowed over smooth black river stones. Here, ancestral law held that anyone who swore a false oath while standing ankle-deep in the current would be struck dumb and swallowed by the sinking mud. As Koochi stepped into the cool water, his knees trembled violently. The air was dead silent. Hundreds of eyes watched his lips.",
      narration: "Stepping into the sacred river of truth, where every false oath sank like an iron stone into the mud.",
      backgroundGradient: "from-[#0A1822] via-[#061016] to-[#02060A]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["Koochi Barama", "Elder Sékou", "The Village Council"],
      audio: {
        narrationUrl: "/audio/stories/koochi-barama-and-the-river-of-truth/scene-03-narration.mp3",
        narrationDurationSeconds: 37.02,
        cues: koochiScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-kb-4",
      sceneNumber: 4,
      title: "The Cleansing of the Waters",
      text: "Koochi opened his mouth to repeat his clever deception, but his voice caught like fishbones in his throat. He looked at the peaceful water around his feet, and the vanity broke inside him. He fell to his knees in the shallows, weeping openly. 'I lied to both of you!' he cried before the silent assembly. 'The ridge belongs to the eastern village; the western elders gave it in trust two seasons ago during the great rot.' A great breath of relief swept across the crowd. Instead of war, the elders embraced, dividing the harvest equally in celebration of truth. Koochi walked out of the river lighter than he had ever felt, having traded a hundred clever masks for a single clean heart.",
      narration: "The tears of honest repentance washed the river clean, trading a hundred clever masks for the peace of truth.",
      backgroundGradient: "from-[#12221A] via-[#0A1610] to-[#040A06]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Koochi Barama", "Elder Sékou"],
      audio: {
        narrationUrl: "/audio/stories/koochi-barama-and-the-river-of-truth/scene-04-narration.mp3",
        narrationDurationSeconds: 45.55,
        cues: koochiScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
