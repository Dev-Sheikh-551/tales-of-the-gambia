import { Story, NarrationCue } from "@/types/story";
import kankurangScene01 from "@/data/audio/cues/kankurang/scene-01.json";
import kankurangScene02 from "@/data/audio/cues/kankurang/scene-02.json";
import kankurangScene03 from "@/data/audio/cues/kankurang/scene-03.json";
import kankurangScene04 from "@/data/audio/cues/kankurang/scene-04.json";
import kankurangScene05 from "@/data/audio/cues/kankurang/scene-05.json";


export const kankurangSacredForestStory: Story = {
  id: "story-kankurang-sacred-forest",
  slug: "the-kankurang-and-the-sacred-forest",
  title: "The Kankurang and the Sacred Forest",
  subtitle: "A Mandinka legend of the red bark guardian of Janjanbureh",
  description:
    "When nocturnal shadows and selfish greed threatened the sacred groves of Janjanbureh, the elders summoned the Kankurang — the ancient guardian draped in fibrous red mahogany bark — to instill communal discipline, protect the young initiates, and preserve the harmony of the river woodlands.",
  category: "legend",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Central River Region (Janjanbureh / MacCarthy Island)",
    community: "Mandinka communities of the Gambia River basin",
    ethnicGroup: "Mandinka traditional initiation society",
    culturalContext:
      "The Kankurang is an ancient Mandinka masquerade tradition inscribed by UNESCO on the Representative List of the Intangible Cultural Heritage of Humanity (2008). Janjanbureh is celebrated as its historical heartland.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "community-attributed",
    collectorOrAuthor: "Adapted by Tales of The Gambia Editorial Guild",
    sourceRef: {
      title: "UNESCO Representative List: Kankurang, Manding Initiatory Rite (The Gambia & Senegal)",
      year: 2008,
      notes: "Documented cultural tradition of the Mandinka initiation societies, preserving the ecological code and community order under the sacred red bark masquerade.",
    },
    originalLanguage: "Mandinka oral tradition",
    historicalPeriod: "Centuries-old living initiatory tradition",
    adaptationNotes:
      "Arranged into five narrative scenes illustrating the role of the Kankurang as a community protector, ecological guardian, and mentor of initiates. The narrative dramatizes the cultural values of order and environmental reverence.",
    authenticityStatement:
      "The Kankurang is a genuine, protected cultural tradition of profound spiritual and communal importance in The Gambia and Senegal. This narrative is an educational adaptation honoring its role as an enforcer of community ethics and protector of youth during traditional rites of passage.",
  },
  narrative: {
    openingFormula:
      "Ni kamo be kesso kono... When the deep drums speak from the forest edge, the village stills its breath.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The red leaves rustle, the two blades strike once in warning, and the peace of the river remains unbroken.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "True authority exists not to intimidate, but to safeguard the innocent, enforce communal justice, and protect the living forest.",
    communalMoral:
      "The law of the community and the sanctity of nature are shielded by those who honor ancestral responsibility.",
    contextualNotes: [
      "Kankurang: The mythical masked figure covered in shredded red bark and mahogany leaves, wielding two machetes that he clangs together in warning.",
      "Faraa: The fibrous red inner bark of the camel foot tree (Piliostigma thonningii) or mahogany, used to fashion the sacred costume.",
      "Kuyang-Manso: The traditional retreat camp in the forest where young boys undergo initiation into adult community life and learn ancestral lore.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Cultural Heritage", "Protection", "Ecological Balance", "Initiation"],
  characters: ["The Initiates", "Elder Bakary", "The Spirit of the Kankurang"],
  coverImage: {
    src: "/images/stories/griot-baobab.svg",
    alt: "The silhouette of the masked Kankurang draped in red fibers against a deep sunset by the Gambia River",
    paletteTheme: "ochre",
  },
  featured: false,
  scenes: [
    {
      id: "scene-ksf-1",
      sceneNumber: 1,
      title: "The Whispers at Twilight",
      text: "At the onset of the harvest season, when the rains had ceased and the evening skies over Janjanbureh turned the deep crimson of crushed mahogany bark, the village gathered in hushed reverence. The young boys of the settlement had entered the sacred forest for their rites of passage, stepping away from childhood to learn the enduring laws of the ancestors. But as night crept over the mangrove creeks, strange winds stirred the dust, and whispers spread that reckless woodcutters were creeping into the protected sacred groves to fell the ancient medicinal trees.",
      narration: "When sacred boundaries are threatened, the elders do not summon soldiers; they awaken the spirit of the law.",
      backgroundGradient: "from-[#2A150D] via-[#1B0F09] to-[#110A06]",
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
        intensity: "gentle",
      },
      characters: ["Elder Bakary"],
      audio: {
        narrationUrl: "/audio/stories/the-kankurang-and-the-sacred-forest/scene-01-narration.mp3",
        narrationDurationSeconds: 39.4,
        cues: kankurangScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-ksf-2",
      sceneNumber: 2,
      title: "The Stripping of the Red Bark",
      text: "Deep within the secluded grove, under the supervision of the venerable elders, the sacred red bark was gathered. No single man wore the disguise as himself; the individual disappeared beneath coils of beaten fiber and green leaves so that only the office of the ancestral guardian remained. As the sun dipped beneath the horizon, a piercing, unearthly cry tore through the canopy — a cry neither human nor beast, but the ancestral call of the Kankurang signaling that the forest was under sovereign protection.",
      narration: "He who enters the bark leaves his name behind; the spirit that walks belongs to the whole community.",
      backgroundGradient: "from-[#33180D] via-[#211009] to-[#120A06]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "pan-left",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["The Spirit of the Kankurang"],
      audio: {
        narrationUrl: "/audio/stories/the-kankurang-and-the-sacred-forest/scene-02-narration.mp3",
        narrationDurationSeconds: 38.42,
        cues: kankurangScene02 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-ksf-3",
      sceneNumber: 3,
      title: "The Clang of the Twin Blades",
      text: "Through the village lanes and along the boundary paths of the farmland, the Kankurang surged with breathtaking speed. His red fibers trailed like living flames, and in each hand he gripped a heavy iron cutlass. As he leapt into the moonlit square, he struck the two blades together — CLANG! — sending bright sparks showering into the dust. Children scurried indoors, women ceased their chatter, and any who harbored deceit in their thoughts felt a cold shiver down their spines. The clanging iron proclaimed that peace, order, and absolute restraint now governed the settlement.",
      narration: "Sparks in the dark night — not of war, but of unbending vigilance.",
      backgroundGradient: "from-[#2A100B] via-[#1B0B07] to-[#0F0704]",
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
        intensity: "subtle",
      },
      characters: ["The Spirit of the Kankurang"],
      audio: {
        narrationUrl: "/audio/stories/the-kankurang-and-the-sacred-forest/scene-03-narration.mp3",
        narrationDurationSeconds: 39.2,
        cues: kankurangScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-ksf-4",
      sceneNumber: 4,
      title: "The Shield of the Initiates",
      text: "Beyond the village edge, near the Kuyang-Manso camp where the young initiates rested around their fire, a band of intruders approached with axes in hand, intending to strip the rare rosewood trees. Suddenly, the shadows parted. Out of the darkness bounded the Kankurang, his red coat rustling like dry grass in a gale. He did not wound them; with a thunderous strike of his blades and an ancestral roar, he disarmed their axes and drove them fleeing into the night. The young boys watched from the safety of their palisade, learning in that single moment what it truly meant to protect one's homeland.",
      narration: "Courage without justice is violence; strength without duty is folly.",
      backgroundGradient: "from-[#172522] via-[#0F1A18] to-[#0A100F]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["The Initiates", "The Spirit of the Kankurang"],
      audio: {
        narrationUrl: "/audio/stories/the-kankurang-and-the-sacred-forest/scene-04-narration.mp3",
        narrationDurationSeconds: 41.8,
        cues: kankurangScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-ksf-5",
      sceneNumber: 5,
      title: "The Dawn of Manhood",
      text: "When morning broke over the broad waters of the River Gambia, the boys emerged from the sacred grove, their heads held high and their hearts fortified with wisdom. The Kankurang stood atop the high red bank, silent as an ancient monument. As the boys sang the songs of completion and returned to their rejoicing families, the red figure dissolved quietly back into the deep woods. For centuries upon centuries, the tradition remains unbroken: so long as the river flows and the mahogany bears bark, the guardian will rise whenever the people need to remember who they are.",
      narration: "The ceremony ends, but the lesson written upon young hearts endures for a lifetime.",
      backgroundGradient: "from-[#2C1E12] via-[#1D140C] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "gentle",
      },
      characters: ["The Initiates"],
      audio: {
        narrationUrl: "/audio/stories/the-kankurang-and-the-sacred-forest/scene-05-narration.mp3",
        narrationDurationSeconds: 41.48,
        cues: kankurangScene05 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
