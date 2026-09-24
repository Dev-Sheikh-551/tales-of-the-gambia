import { Story, NarrationCue } from "@/types/story";
import kumpoScene01 from "@/data/audio/cues/whirling-spirit-kumpo/scene-01.json";
import kumpoScene02 from "@/data/audio/cues/whirling-spirit-kumpo/scene-02.json";
import kumpoScene03 from "@/data/audio/cues/whirling-spirit-kumpo/scene-03.json";
import kumpoScene04 from "@/data/audio/cues/whirling-spirit-kumpo/scene-04.json";


export const whirlingSpiritKumpoStory: Story = {
  id: "story-kumpo-spirit",
  slug: "the-whirling-spirit-of-the-fromager",
  title: "The Whirling Spirit of the Fromager",
  subtitle: "The Jola cultural legend of the sacred palm-leaf masquerade and the guardianship of communal harmony",
  description:
    "Beneath the towering silk-cotton trees of Foni, the peace of the village rice harvests is safeguarded by the Kumpo—a mysterious being clothed from crown to foot in dry palm fronds, wielding an ironwood stick. When a skeptical young man returned from the city challenges the ancient authority of the masquerade, he experiences the whirlwind of ancestral discipline and discovers that the spirit is the living conscience of the community.",
  category: "legend",
  contentType: "traditional",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Foni Brefet, Foni Kansala, and the Casamance borderlands)",
    community: "Jola cultural society and sacred masquerade tradition",
    ethnicGroup: "Jola",
    culturalContext:
      "The Kumpo is one of the most iconic and sacred masquerade traditions of the Jola people in The Gambia and Casamance. Clothed entirely in shredded dried palm fronds with a single pointed stick protruding from its crown, the Kumpo is an enforcer of community discipline, guardian of social cohesion, and center of communal harvest festivals.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Cornelius Gomez (Gambian Cultural Traditions and Heritage) and Jola village elders",
    sourceRef: {
      title: "The Kumpo Tradition of Foni and Jola Social Organization",
      notes: "Documented by Cornelius Gomez and archived in the National Centre for Arts and Culture masquerade monographs. Retold in English with deep fidelity to Jola community ethics.",
    },
    originalLanguage: "Jola oral tradition",
    historicalPeriod: "Ancient ancestral traditions practiced to the present day",
    adaptationNotes:
      "Organized into four vivid scenes: the dusk gathering beneath the silk-cotton tree, the arrival of the rustling fronds, the test of discipline in the dancing ring, and the blessing of the communal harvest.",
    authenticityStatement:
      "This story is an authentic, respectful cultural narrative celebrating the enduring Jola Kumpo tradition as a pillar of Gambian intangible cultural heritage.",
  },
  narrative: {
    openingFormula:
      "Kassumay! When the evening drums of Foni begin their rolling heartbeat, look toward the sacred grove where the palm fronds awake...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And as long as the silk-cotton tree stands tall against the sky, the Kumpo will dance to protect the peace of the village.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Community strength lies in mutual respect; he who mocks the customs of his elders will find himself swept away by the wind.",
    communalMoral:
      "Shared labor and shared discipline are the twin pillars that hold up the roof of the village.",
    contextualNotes: [
      "Kumpo: A revered Jola masquerade covered entirely in palm leaves, known for rapid acrobatic spins planted on its head-stick.",
      "Fromager: The giant silk-cotton tree (Ceiba pentandra), traditionally considered a sacred sanctuary of nature spirits.",
      "Kassumay: The traditional Jola greeting of peace.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Cultural Heritage", "Communal Harmony", "Discipline", "Respect for Elders"],
  characters: ["Elder Arfang", "Young Bakary", "The Kumpo Guardian"],
  coverImage: {
    src: "/images/stories/kankurang.svg",
    alt: "A dramatic whirling masquerade clothed entirely in dry golden palm fronds spinning on a central pole beneath a giant silk-cotton tree",
    paletteTheme: "forest",
  },
  featured: false,
  scenes: [
    {
      id: "scene-kp-1",
      sceneNumber: 1,
      title: "The Shadows of the Silk-Cotton Grove",
      text: "At the edge of the village of Brefet rose the ancient fromager—a silk-cotton tree so massive that ten men joining hands could not encircle its trunk. As the sun sank below the palm canopy, painting the clouds in crimson and ash, the village youth gathered to repair the communal rice dikes before the heavy rains. But young Bakary, newly returned from years in the coastal city, scoffed at the work. 'Why should we work for the community for free?' Bakary laughed. 'In the city, every man looks after his own pocket.'",
      narration: "Under the towering silk-cotton tree, the ancient rhythm of community work clashed with the selfishness of the city.",
      backgroundGradient: "from-[#101C12] via-[#0A120B] to-[#040804]",
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
      characters: ["Elder Arfang", "Young Bakary"],
      audio: {
        narrationUrl: "/audio/stories/the-whirling-spirit-of-the-fromager/scene-01-narration.mp3",
        narrationDurationSeconds: 35.77,
        cues: kumpoScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-kp-2",
      sceneNumber: 2,
      title: "The Rustle of the Palm Fronds",
      text: "Elder Arfang did not argue. He walked to the edge of the sacred grove and struck three measured beats upon the hollow slit-drum. A sudden silence fell over the compound. From the deep twilight of the forest came a sound like dry grass rushing before a bushfire: the rustle of a thousand dried palm leaves moving as one. Out stepped the Kumpo. It had no face, no eyes, and no limbs visible—only a dome of whispering golden fronds crowned by a single pointed ironwood staff that pierced the sky.",
      narration: "A dry whispering sound broke from the dark forest, and the spirit of woven palm fronds entered the dancing circle.",
      backgroundGradient: "from-[#161E14] via-[#0C120C] to-[#040804]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "wind",
        intensity: "gentle",
      },
      characters: ["Elder Arfang", "The Kumpo Guardian"],
      audio: {
        narrationUrl: "/audio/stories/the-whirling-spirit-of-the-fromager/scene-02-narration.mp3",
        narrationDurationSeconds: 33.48,
        cues: kumpoScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-kp-3",
      sceneNumber: 3,
      title: "The Whirlwind in the Sand",
      text: "The drums erupted into an exhilarating, accelerating rhythm. The Kumpo planted its central staff into the sand, lifted its fronds entirely off the ground, and began to spin. Faster and faster it whirled, generating a localized whirlwind of amber dust that swept through the dancing circle. It approached Bakary, spinning within inches of his chest. As the wind whipped his face, Bakary felt the collective weight of centuries—the realization that this dance was not entertainment, but the living law of communal solidarity that had kept his people alive through famine, war, and drought.",
      narration: "An acrobatic whirlwind of golden leaves spinning upon a single staff, blowing away arrogance with the force of an ancestral storm.",
      backgroundGradient: "from-[#22180C] via-[#140E06] to-[#0A0602]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Young Bakary", "The Kumpo Guardian"],
      audio: {
        narrationUrl: "/audio/stories/the-whirling-spirit-of-the-fromager/scene-03-narration.mp3",
        narrationDurationSeconds: 42.98,
        cues: kumpoScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-kp-4",
      sceneNumber: 4,
      title: "The Blessing of the Kafo",
      text: "The Kumpo suddenly halted, bowing low before the assembled elders. With trembling hands, Bakary picked up a wooden kajando spade and stepped into line beside his village brothers. The Kumpo tapped the earth three times before him with its staff, leaving a circle of white river sand as a mark of reconciliation and blessing. By dawn, the rice dikes were built, water flowed peacefully to the fields, and the spirit vanished back into the leafy shadows of the fromager, leaving a united village singing in the morning dew.",
      narration: "A spade lifted in brotherhood, an ancestral blessing sealed, and the community stood whole beneath the morning sky.",
      backgroundGradient: "from-[#122216] via-[#0A160E] to-[#040A06]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Young Bakary", "Elder Arfang"],
      audio: {
        narrationUrl: "/audio/stories/the-whirling-spirit-of-the-fromager/scene-04-narration.mp3",
        narrationDurationSeconds: 38.23,
        cues: kumpoScene04 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
