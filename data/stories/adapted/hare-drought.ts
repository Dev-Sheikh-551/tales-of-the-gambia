import { Story, NarrationCue } from "@/types/story";
import hareCues01 from "@/data/audio/cues/hare-drought/scene-01.json";
import hareCues02 from "@/data/audio/cues/hare-drought/scene-02.json";
import hareCues03 from "@/data/audio/cues/hare-drought/scene-03.json";
import hareCues04 from "@/data/audio/cues/hare-drought/scene-04.json";
import hareCues05 from "@/data/audio/cues/hare-drought/scene-05.json";
import hareCues06 from "@/data/audio/cues/hare-drought/scene-06.json";

export const hareDroughtStory: Story = {
  id: "story-1",
  slug: "the-clever-hare-and-the-great-drought",
  title: "The Clever Hare and the Great Drought",
  subtitle: "A fable of collective effort, patience, and sharp wit",
  description:
    "[Curated Traditional Fable] When rain deserted the grasslands of the North Bank, the animals gathered under the ancient silk cotton tree to dig a community well. Only the cunning hare claimed he was too delicate to dig — but water tastes sweetest to those whose paws know labor.",
  category: "fable",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "North Bank / Lower River Region",
    community: "North Bank savanna communities",
    ethnicGroup: "Senegambian (Mandinka / Wolof oral motif)",
    culturalContext: "Adapted from traditional Senegambian animal trickster and community water-sharing fables",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Editorial adaptation by Tales of The Gambia",
    sourceRef: {
      notes: "Based on the widespread Senegambian and West African trickster fable motif of animals digging a communal well during drought. The specific text, dialogue, and pacing are modern editorial reconstructions for digital storybook presentation.",
    },
    originalLanguage: "Mandinka / Wolof oral motif",
    historicalPeriod: "Ancestral oral folklore",
    adaptationNotes:
      "Structured into six distinct narrative beats for digital reading and 2D cinematic presentation. The core conflict and communal moral are drawn from oral tradition, while the dialogue and atmospheric scene directions are modern literary adaptations.",
    authenticityStatement:
      "This story is an editorial adaptation inspired by traditional Senegambian animal trickster lore. While the motif of digging the dry well is an authentic West African folk theme, this specific text is an editorial reconstruction and not a direct transcription of a single historical informant or elder.",
  },
  narrative: {
    openingFormula:
      "Taal bu daan... Once in the dry season of our ancestors, when the red dust blew from the desert...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "Te yen la taal bi daan doore... And so the story returns to the warm ashes of the village fire.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Sweet water cannot be stolen from the toil of others. Community strength is measured by the paws that dig, not the advice offered from the shade.",
    communalMoral:
      "Community strength is measured by the paws that dig, not the advice offered from the shade.",
    contextualNotes: [
      "Silk Cotton Tree (Bantaba tree): A traditional village gathering place where elders resolve communal disputes and tell stories.",
      "Calabash: A dried and hollowed gourd used throughout Senegambia as a water vessel, bowl, and the resonant body of the kora.",
      "Framing Note: 'Taal bu daan' is a Wolof storytelling formula used here as adapted digital framing honoring the oral idiom.",
    ],
  },
  language: "English (Adapted from Oral Tradition)",
  narrator: "Kokoro synthetic voice (af_heart)",
  narrationLanguage: "en",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 143,
  themes: ["Wisdom", "Community Solidarity", "Humility", "The Wild"],
  characters: ["Cunning Hare", "Wise Elephant", "Elder Tortoise", "The Baboon Chorus"],
  characterProfiles: [
    {
      id: "elephant",
      name: "Wise Elephant",
      role: "elder",
      culturalSignificance:
        "In Senegambian lore, the Elephant represents collective patience, leadership, and ancestral memory.",
      traits: ["Dignified", "Patient", "Community-minded"],
      avatarTheme: "elephant",
    },
    {
      id: "hare",
      name: "Cunning Hare",
      role: "trickster",
      culturalSignificance:
        "Kanku the Hare is the quintessential West African trickster, relying on wit, audacity, and charm rather than brute strength.",
      traits: ["Cunning", "Vanity", "Sharp-tongued"],
      avatarTheme: "hare",
    },
    {
      id: "tortoise",
      name: "Elder Tortoise",
      role: "guardian",
      culturalSignificance:
        "The Tortoise represents silent perseverance and the enduring value of steady, humble labor.",
      traits: ["Perseverant", "Quiet", "Honest"],
      avatarTheme: "tortoise",
    },
  ],
  coverImage: {
    src: "/images/stories/hare-drought.svg",
    alt: "Silhouette of animals gathering beneath an ancient tree under an amber dusk sky",
    paletteTheme: "ochre",
  },
  featured: true,
  scenes: [
    {
      id: "scene-1-1",
      sceneNumber: 1,
      title: "The Parched Red Earth",
      text: "The sun hung like a polished copper calabash in the dry midday sky. For three whole moons, not a single drop of rain had touched the red dust of the grasslands. Leaves curled into brittle whispers, and the savanna grass turned the color of dry thatch. In the distance, the ancient silk cotton tree stood against the copper horizon.",
      narration: "Listen: The dry harmattan breeze sweeps across the plains, whispering through brittle savanna grass...",
      backgroundGradient: "from-[#2A170C] via-[#1C120B] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
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
      characters: ["Savanna Wildlife"],
      audio: {
        narrationUrl: "/audio/stories/the-clever-hare-and-the-great-drought/scene-01-narration.mp3",
        narrationDurationSeconds: 21.2,
        cues: hareCues01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-1-2",
      sceneNumber: 2,
      title: "The Council Under the Silk Cotton Tree",
      text: "Beneath the spreading canopy, the beasts of the savanna gathered in solemn council. Wise Elephant raised her broad ears and spoke with the measured cadence of an elder: 'Brothers and sisters, lamenting will not bring clouds to our sky. Deep within the riverbed sleeps sweet water. If every creature gives paw, tusk, or claw, we shall drink before twilight.' Beside her, the Hare smoothed his whiskers, looking sideways with quiet cunning.",
      narration: "Wise Elephant raised her voice over the restless murmurs of the thirsty assembly.",
      backgroundGradient: "from-[#351F12] via-[#22160E] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 55 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Wise Elephant", "Cunning Hare"],
      charactersData: [
        {
          id: "elephant",
          name: "Wise Elephant",
          position: "left",
          expression: "solemn",
          motion: "breathing",
          avatarTheme: "elephant",
        },
        {
          id: "hare",
          name: "Cunning Hare",
          position: "right",
          expression: "cunning",
          motion: "subtle-float",
          avatarTheme: "hare",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-clever-hare-and-the-great-drought/scene-02-narration.mp3",
        narrationDurationSeconds: 26.0,
        cues: hareCues02 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-1-3",
      sceneNumber: 3,
      title: "The Labor of Paws and Claws",
      text: "The work began before the sun reached its zenith. Baboons rolled heavy river pebbles; warthogs plowed through the sunbaked crust; elder tortoises carried damp silt away, shell by shell. Only the Hare reclined comfortably on a fallen mahogany trunk, fanning his brow with a wild palm frond and claiming that his delicate paws would blister in the sun.",
      narration: "Paw by paw, claw by tusk, the dry riverbed began to yield beneath collective toil.",
      backgroundGradient: "from-[#3A2616] via-[#24170E] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 45, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["Elder Tortoise", "Cunning Hare"],
      charactersData: [
        {
          id: "tortoise",
          name: "Elder Tortoise",
          position: "left",
          expression: "determined",
          motion: "breathing",
          avatarTheme: "tortoise",
        },
        {
          id: "hare",
          name: "Cunning Hare",
          position: "far-right",
          expression: "leisurely",
          motion: "subtle-float",
          avatarTheme: "hare",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-clever-hare-and-the-great-drought/scene-03-narration.mp3",
        narrationDurationSeconds: 22.3,
        cues: hareCues03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-1-4",
      sceneNumber: 4,
      title: "The Shadows of Doubt",
      text: "By mid-afternoon, the heat rose in shimmering waves off the cracked clay. 'You will find only bones down there!' the Hare called out mockingly from his shade. 'Why sweat like oxen when tomorrow the sky may weep rain on its own?' But the animals did not pause. In their silence lived the ancient truth: community is built not with advice from the shade, but with blistered hands in the sun.",
      narration: "The Hare called out in mockery, but the rhythm of the digging never faltered.",
      backgroundGradient: "from-[#2E1A11] via-[#1D120C] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 60, y: 45 },
      },
      cameraMotion: {
        preset: "pan-left",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Cunning Hare"],
      charactersData: [
        {
          id: "hare",
          name: "Cunning Hare",
          position: "center",
          expression: "mocking",
          motion: "breathing",
          avatarTheme: "hare",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-clever-hare-and-the-great-drought/scene-04-narration.mp3",
        narrationDurationSeconds: 23.35,
        cues: hareCues04 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-1-5",
      sceneNumber: 5,
      title: "The Silver Spring Rises",
      text: "Just as the evening sun touched the tops of the baobabs, a damp thud echoed from the bottom of the well. Then came a sound sweeter than twenty-one kora strings — the unmistakable rush of living water. Cool, crystal-clear liquid gushed upward through the white river sand, splashing over tired paws and thirsty snouts. The animals cheered in a chorus of joyous trumpets, barks, and songs.",
      narration: "A crystalline roar rose from the deep earth — living water had returned to the North Bank!",
      backgroundGradient: "from-[#172D33] via-[#122126] to-[#0E181A]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "gentle",
      },
      characters: ["Wise Elephant", "Elder Tortoise"],
      charactersData: [
        {
          id: "elephant",
          name: "Wise Elephant",
          position: "left",
          expression: "triumphant",
          motion: "breathing",
          avatarTheme: "elephant",
        },
        {
          id: "tortoise",
          name: "Elder Tortoise",
          position: "right",
          expression: "joyful",
          motion: "subtle-float",
          avatarTheme: "tortoise",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-clever-hare-and-the-great-drought/scene-05-narration.mp3",
        narrationDurationSeconds: 24.6,
        cues: hareCues05 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-1-6",
      sceneNumber: 6,
      title: "The Lesson of the Night Well",
      text: "When twilight settled into deep Senegambian indigo and the first stars appeared above the silk cotton tree, the animals gathered to drink their fill. The Hare crept near with an empty calabash, his throat parched, but the council stood firm. Water belonged to those who dug. And so the Hare departed into the cool night, carrying the bitter seed of wisdom: that true belonging cannot be stolen from the toil of others.",
      narration: "Under the tranquil canopy of night stars, the savanna rested in communal harmony.",
      backgroundGradient: "from-[#111A24] via-[#0D131A] to-[#0A0D12]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
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
      characters: ["Wise Elephant", "Cunning Hare"],
      charactersData: [
        {
          id: "hare",
          name: "Cunning Hare",
          position: "far-left",
          expression: "humble",
          motion: "subtle-float",
          avatarTheme: "hare",
        },
        {
          id: "elephant",
          name: "Wise Elephant",
          position: "center",
          expression: "peaceful",
          motion: "breathing",
          avatarTheme: "elephant",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-clever-hare-and-the-great-drought/scene-06-narration.mp3",
        narrationDurationSeconds: 25.27,
        cues: hareCues06 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
