import { Story, NarrationCue } from "@/types/story";
import massanehScene01 from "@/data/audio/cues/massaneh-ceesay/scene-01.json";
import massanehScene02 from "@/data/audio/cues/massaneh-ceesay/scene-02.json";
import massanehScene03 from "@/data/audio/cues/massaneh-ceesay/scene-03.json";
import massanehScene04 from "@/data/audio/cues/massaneh-ceesay/scene-04.json";
import massanehScene05 from "@/data/audio/cues/massaneh-ceesay/scene-05.json";


export const massanehCeesayStory: Story = {
  id: "story-massaneh-ceesay",
  slug: "the-ballad-of-massaneh-ceesay",
  title: "The Ballad of Massaneh Ceesay",
  subtitle: "The legendary tragedy of wealth, pride, and destiny along the Bintang Bolong",
  description:
    "Massaneh Ceesay was the wealthiest merchant of Foni, boasting that his silver and gold could buy anything under the sun. But when he used his riches to claim a bride promised to a humble river fisherman, the ancient laws of destiny answered with a lesson immortalized in kora songs for generations.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Foni Bondali and Bintang Bolong basin)",
    community: "Mandinka oral tradition and Jelilu kora canon",
    ethnicGroup: "Mandinka",
    culturalContext:
      "One of the most famous moral tragedies in Gambian culture, celebrated across Senegambia in traditional Mandinka folklore and kora compositions. It explores the conflict between material wealth and sacred communal covenants.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 2) and traditional Gambian griots",
    sourceRef: {
      title: "The Legend of Massaneh Ceesay and Bakary Niuminko",
      notes: "Documented by Sukai Mbye Bojang in 'Folk Tales and Fables from The Gambia' (Vol. 2) and preserved in the oral repertoire of Gambian kora players. Retold in English with editorial reverence.",
    },
    originalLanguage: "Mandinka oral tradition",
    historicalPeriod: "19th century Senegambia",
    adaptationNotes:
      "Dramatized into five scenes following Massaneh's rise, his courtship along the Bintang Bolong, the fisherman's grievance, the griot's prophetic warning, and the fateful wedding morning.",
    authenticityStatement:
      "This story is an authentic, deeply revered piece of Gambian cultural lore, documented in the scholarly works of Sukai Mbye Bojang and performed continuously by Gambian jelilu (griots).",
  },
  historicalContext: {
    era: "19th century",
    approximateDate: "c. 1850–1880",
    location: "Foni Bondali along the Bintang Bolong",
    narrativeReconstructionNotes:
      "The core historical elements—Massaneh's immense fortune, the rivalry over the bride of a Foni fisherman, the lavish wedding gifts, and his sudden demise on the wedding day—are consistent across oral accounts. Specific dialogue and scene pacing are reconstructed for literary flow.",
  },
  narrative: {
    openingFormula:
      "Bismillah... Gather close as the kora strings sound, and listen to the tale of Massaneh Ceesay, whose gold could buy kingdoms, but could not purchase tomorrow.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And so the kora plays the melody of Massaneh, reminding every traveler that a good name outlives all the silver of the world.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Wealth cannot bend destiny, and riches acquired to trample the humble will vanish like morning mist over the bolong.",
    communalMoral:
      "Honor sacred promises, for divine justice listens to the quiet tears of the wronged.",
    contextualNotes: [
      "Bintang Bolong: The largest tributary of the River Gambia, historically a vibrant trade route for groundnuts, wax, and river commerce.",
      "Jali (Griot): The hereditary oral historian and musician who serves as the moral conscience of the community.",
      "Kora: The 21-stringed West African harp-lute central to Mandinka storytelling.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Pride and Humility", "Destiny", "Integrity", "Sacred Vows"],
  characters: ["Massaneh Ceesay", "Bakary Niuminko", "Fatou", "The Village Jali"],
  coverImage: {
    src: "/images/stories/stone-circles.svg",
    alt: "A wealthy merchant draped in fine embroidered robes standing beside the winding waters of the Bintang Bolong",
    paletteTheme: "ochre",
  },
  featured: false,
  scenes: [
    {
      id: "scene-mc-1",
      sceneNumber: 1,
      title: "The Merchant of Bintang Bolong",
      text: "Along the winding banks of the Bintang Bolong, where trading pirogues carried wax, salt, and groundnuts toward the great river, no name rang louder than that of Massaneh Ceesay. He rode horses draped in crimson cloth. His robes were stitched with heavy gold thread from Bamako, and his compound in Foni Bondali held granaries so full that laborers sang his praises from sunrise to dusk. Massaneh believed there was no door in Senegambia that his silver could not unlock, and no heart that his riches could not sway.",
      narration: "Massaneh Ceesay rode like a prince, convinced that gold could purchase all things under heaven.",
      backgroundGradient: "from-[#2A1808] via-[#1C1005] to-[#0F0803]",
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
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Massaneh Ceesay"],
      audio: {
        narrationUrl: "/audio/stories/the-ballad-of-massaneh-ceesay/scene-01-narration.mp3",
        narrationDurationSeconds: 38.77,
        cues: massanehScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-mc-2",
      sceneNumber: 2,
      title: "The Vow by the Water's Edge",
      text: "In the same river village lived Bakary Niuminko, a young fisherman whose wealth consisted only of his dugout canoe, his cast net, and his upright word. For years, Bakary had courted Fatou, a woman whose grace was spoken of across the district. Their families had shared the ceremonial kola nuts, sealing a sacred betrothal before the village elders. Though Bakary brought only the fresh harvest of the tides, Fatou's mother had accepted the pledge, knowing that an honest man's labor is a house that does not crumble.",
      narration: "A simple fisherman and a cherished maiden, bound together by sacred kola nuts and ancient promises.",
      backgroundGradient: "from-[#102028] via-[#0A141A] to-[#050A0E]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
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
      characters: ["Bakary Niuminko", "Fatou"],
      audio: {
        narrationUrl: "/audio/stories/the-ballad-of-massaneh-ceesay/scene-02-narration.mp3",
        narrationDurationSeconds: 38.25,
        cues: massanehScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-mc-3",
      sceneNumber: 3,
      title: "The Caravan of Temptation",
      text: "When Massaneh Ceesay laid eyes upon Fatou at the weekly market, his pride refused to accept that she belonged to another. 'A fisherman gives fish that spoil in a day,' Massaneh declared. 'I shall give gold that endures for generations.' The next morning, a train of pack-donkeys arrived at Fatou's family compound, bearing bolts of velvet, sacks of white rice, and cowrie shells by the thousands. Dazzled by the mountain of wealth, Fatou's kin broke their solemn word to Bakary, declaring that the wedding of the century would belong to Massaneh Ceesay.",
      narration: "A mountain of silver arrived at the compound gate, blinding hearts to the sacred weight of their promise.",
      backgroundGradient: "from-[#2C1A0C] via-[#1D1006] to-[#0E0803]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Massaneh Ceesay", "Fatou"],
      audio: {
        narrationUrl: "/audio/stories/the-ballad-of-massaneh-ceesay/scene-03-narration.mp3",
        narrationDurationSeconds: 40.27,
        cues: massanehScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-mc-4",
      sceneNumber: 4,
      title: "The Griot's Warning",
      text: "On the eve of the great feast, the village jali took his kora and sat before Massaneh's veranda. His fingers swept across the calabash strings, but the melody he struck was heavy and mournful. 'Hear me, Massaneh,' the elder sang into the twilight. 'You have counted your gold coins, but who has counted your days? The tears of the wronged fisherman have reached the listening waters of the bolong. Death does not take bribes of silver, and destiny bows to no merchant.' Massaneh only laughed, tossing a handful of copper coins to the musician and ordering the feast fires lit.",
      narration: "The kora sounded a solemn lament, warning that death accepts no bribes and destiny bows to no king.",
      backgroundGradient: "from-[#201018] via-[#150A10] to-[#0A0508]",
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
        intensity: "subtle",
      },
      characters: ["Massaneh Ceesay", "The Village Jali"],
      audio: {
        narrationUrl: "/audio/stories/the-ballad-of-massaneh-ceesay/scene-04-narration.mp3",
        narrationDurationSeconds: 39.48,
        cues: massanehScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-mc-5",
      sceneNumber: 5,
      title: "The Morning of Destiny",
      text: "Dawn broke over Foni Bondali in hues of violet and gold. The wedding drums began their thunderous beat, and guests arrived from every village along the river. But inside his bedchamber, Massaneh did not rise. When his brothers entered to drape him in his wedding damask, they found him still and cold, claimed peacefully in his sleep before the first ray touched his face. The wedding turned to weeping, the bride returned to her home, and by sunset the jali began the song that would echo across Senegambia forever: Massaneh Ceesay had all the gold of the earth, but not a single second to spend it.",
      narration: "The drums fell silent, the gold remained untouched, and the kora began the song that time would never forget.",
      backgroundGradient: "from-[#18121E] via-[#0E0A12] to-[#050406]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
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
      characters: ["The Village Jali"],
      audio: {
        narrationUrl: "/audio/stories/the-ballad-of-massaneh-ceesay/scene-05-narration.mp3",
        narrationDurationSeconds: 44.2,
        cues: massanehScene05 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
