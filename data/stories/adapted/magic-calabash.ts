import { Story, NarrationCue } from "@/types/story";
import calabashScene01 from "@/data/audio/cues/magic-calabash/scene-01.json";
import calabashScene02 from "@/data/audio/cues/magic-calabash/scene-02.json";
import calabashScene03 from "@/data/audio/cues/magic-calabash/scene-03.json";
import calabashScene04 from "@/data/audio/cues/magic-calabash/scene-04.json";
import calabashScene05 from "@/data/audio/cues/magic-calabash/scene-05.json";


export const magicCalabashStory: Story = {
  id: "story-magic-calabash",
  slug: "the-magic-calabash-of-banjul",
  title: "The Magic Calabash of Banjul",
  subtitle: "A contemporary Gambian tale of hard work, a mysterious coastal gift, and the sacred limits of desire",
  description:
    "Erubami, an honest but struggling cart-pusher in the bustling alleys of Albert Market, unearths an ancient carved calabash beneath the roots of a coastal silk-cotton tree. The mystical vessel grants just enough grain and silver for his family's daily needs—under one unbreakable rule: it must never be opened after the midnight bell, nor used to parade wealth before envious eyes.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Banjul Island, Albert Market, and Half-Die)",
    community: "Akù and urban Gambian storytelling tradition",
    ethnicGroup: "Akù & Cosmopolitan Banjul",
    culturalContext:
      "A classic modern Gambian folktale inspired by Nana Grey-Johnson's renowned novel 'The Magic Calabash' (1998) and ancient Senegambian folklore concerning mystical vessels (kalan-golu). It bridges traditional fireside magic with the bustling economic realities of Old Banjul.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "literary-adaptation",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Inspired by Nana Grey-Johnson (The Magic Calabash, 1998) and urban Banjul oral motifs",
    sourceRef: {
      title: "The Magic Calabash and the Urban Lore of Banjul",
      notes: "Adapts traditional Senegambian folk motifs of the enchanted calabash into an evocative narrative set against the historic architecture and vibrant market life of colonial-era Banjul.",
    },
    originalLanguage: "Gambian Krio / English / Wolof oral idioms",
    historicalPeriod: "20th-century Old Banjul",
    adaptationNotes:
      "Rendered into five scenes detailing the labor of Albert Market, the discovery beneath the roots, the quiet blessings of daily bread, the whisper of temptation, and the wisdom of contentment.",
    authenticityStatement:
      "This story honors both the literary heritage of Nana Grey-Johnson and the rich oral traditions of magical vessels in Gambian culture.",
  },
  narrative: {
    openingFormula:
      "Listen to the rhythm of the handcarts on Russell Street, and hear the story of a humble man who found the secret of true wealth.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever you see a merchant sharing his bread at the close of day, remember the calabash that fed the generous heart.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Wealth is not measured by what one hoards, but by the peace that fills an honest home when the day is done.",
    communalMoral:
      "Guard the gifts of providence with quiet humility; greed breaks the vessel that contentment would keep full forever.",
    contextualNotes: [
      "Albert Market: The historic street market in Banjul established in the mid-19th century, known for vibrant fabrics, spices, and craftwork.",
      "Kalan-golu: In Mandinka and Senegambian folklore, a sacred carved calabash imbued with spiritual or ancestral blessings.",
      "Half-Die: A historic residential district of Banjul near the harbor.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Contentment", "Humility", "Urban Folklore", "Temptation", "Integrity"],
  characters: ["Erubami the Carter", "Modupeh his Wife", "The Old Water-Carrier"],
  coverImage: {
    src: "/images/stories/spider-wisdom.svg",
    alt: "A smooth carved calabash glowing with gentle golden light on an old wooden table in a lantern-lit Banjul room",
    paletteTheme: "gold",
  },
  featured: false,
  scenes: [
    {
      id: "scene-mc-b-1",
      sceneNumber: 1,
      title: "The Handcart of Russell Street",
      text: "From sunrise until the evening steamer horns echoed across the estuary, Erubami pushed his heavy wooden handcart through the narrow streets of Banjul. He hauled sacks of groundnuts, crates of salted fish, and bolts of Dutch wax prints for the merchants of Albert Market. His muscles were corded like mangrove roots, and his smile never faltered, though his pocket held scarcely enough copper coins each evening to buy a bowl of coos and smoked bonga for his family in Half-Die.",
      narration: "A weary handcart rattling through the dust of Albert Market, driven by honest sweat and a patient smile.",
      backgroundGradient: "from-[#22160C] via-[#160E07] to-[#0A0603]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Erubami the Carter"],
      audio: {
        narrationUrl: "/audio/stories/the-magic-calabash-of-banjul/scene-01-narration.mp3",
        narrationDurationSeconds: 31.6,
        cues: calabashScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-mc-b-2",
      sceneNumber: 2,
      title: "The Gift Beneath the Roots",
      text: "One rainy afternoon, as a sudden squall lashed the Banjul foreshore, Erubami sought shelter beneath the gnarled roots of a towering silk-cotton tree near the shoreline. In a hollow washed clean by the receding tide, his fingers touched something smooth and round. He pulled free an ancient calabash, polished like dark amber and etched with geometric spirals that seemed to hum with silent warmth. When he turned it over, three grains of golden rice fell into his palm, expanding instantly into a warm, fragrant loaf of bread.",
      narration: "Under the roots of a coastal silk-cotton tree lay a vessel of ancient amber, humming with quiet magic.",
      backgroundGradient: "from-[#0E1A16] via-[#08120E] to-[#040806]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
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
      characters: ["Erubami the Carter"],
      audio: {
        narrationUrl: "/audio/stories/the-magic-calabash-of-banjul/scene-02-narration.mp3",
        narrationDurationSeconds: 37.92,
        cues: calabashScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-mc-b-3",
      sceneNumber: 3,
      title: "The Quiet Hearth",
      text: "In the quiet of his humble room, Erubami shared the discovery with his wife Modupeh. The calabash asked for no incantations—only clean hands and an honest heart. Each morning, it produced three shining silver coins and enough fresh rice to fill their clay cooking pot and feed their elderly neighbors. But an elder who saw the bowl in a dream had delivered one strict covenant: 'Take only what your hands can carry for today. Never open it after the midnight bell, and never boast of its presence to the street.'",
      narration: "A quiet home blessed by providence, bound by the sacred covenant of daily bread and secret humility.",
      backgroundGradient: "from-[#2A180E] via-[#1B0F08] to-[#0E0704]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "subtle",
      },
      characters: ["Erubami the Carter", "Modupeh his Wife"],
      audio: {
        narrationUrl: "/audio/stories/the-magic-calabash-of-banjul/scene-03-narration.mp3",
        narrationDurationSeconds: 35.85,
        cues: calabashScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-mc-b-4",
      sceneNumber: 4,
      title: "The Midnight Whisper",
      text: "Months passed, and the peace of the household flourished. But human eyes are sharp. Market merchants noticed that Erubami no longer took loans at high interest, and neighbors saw meat in his soup pot every evening. Envy began to knock at the compound door. One midnight, as rain drummed against the corrugated tin roof, a voice of doubt crept into Erubami's thoughts: 'Why live on three coins a day when you could open the bowl in the dark and take a chest of gold to buy your own merchant ship?' His hand reached toward the cloth.",
      narration: "A stormy midnight in Half-Die, where the voice of ambition whispered against the quiet law of contentment.",
      backgroundGradient: "from-[#10141C] via-[#0A0D12] to-[#040608]",
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
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Erubami the Carter"],
      audio: {
        narrationUrl: "/audio/stories/the-magic-calabash-of-banjul/scene-04-narration.mp3",
        narrationDurationSeconds: 34.83,
        cues: calabashScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-mc-b-5",
      sceneNumber: 5,
      title: "The Contented Heart",
      text: "As the town hall clock struck the twelfth chime, Erubami paused. He looked at his sleeping wife, his healthy children, and the peaceful warmth of his home. He pulled his hand back, knelt beside the table, and whispered a prayer of thanksgiving. The calabash glowed with a deep, approving amber light. When morning arrived, the vessel remained as generous as ever. Erubami returned to his handcart on Russell Street with a singing heart, knowing that the greatest magic on earth is not the gold that fills a purse, but the gratitude that satisfies the soul.",
      narration: "The midnight bell faded, the temptation was conquered, and true wealth remained forever in a grateful heart.",
      backgroundGradient: "from-[#201A10] via-[#141008] to-[#0A0804]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Erubami the Carter", "Modupeh his Wife"],
      audio: {
        narrationUrl: "/audio/stories/the-magic-calabash-of-banjul/scene-05-narration.mp3",
        narrationDurationSeconds: 39.27,
        cues: calabashScene05 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
