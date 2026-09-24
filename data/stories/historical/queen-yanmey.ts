import { Story, NarrationCue } from "@/types/story";
import yanmeyScene01 from "@/data/audio/cues/queen-yanmey/scene-01.json";
import yanmeyScene02 from "@/data/audio/cues/queen-yanmey/scene-02.json";
import yanmeyScene03 from "@/data/audio/cues/queen-yanmey/scene-03.json";
import yanmeyScene04 from "@/data/audio/cues/queen-yanmey/scene-04.json";
import yanmeyScene05 from "@/data/audio/cues/queen-yanmey/scene-05.json";


export const queenYanmeyStory: Story = {
  id: "story-queen-yanmey",
  slug: "queen-yanmey-and-the-sovereign-river",
  title: "Queen Yanmey and the Sovereign River",
  subtitle: "The 19th-century royal matriarch of Nuimi who defended African maritime sovereignty at Barra Point",
  description:
    "At the mouth of the River Gambia, where merchant schooners entered the continent, the royal matriarchs of Nuimi held the keys to the kingdom. When European trading captains attempted to evade the traditional river customs taxes at Barra Point, Queen Yanmey mobilized coastal war-canoes and diplomatic statecraft, forcing foreign empires to honor African law on African waters.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Barra Point, Kingdom of Nuimi, and the estuary)",
    community: "Coastal Mandinka royal lineage and oral traditions of Nuimi",
    ethnicGroup: "Mandinka",
    culturalContext:
      "A proud and essential history documenting female statecraft and naval power in pre-colonial and early 19th-century Gambia. The Kingdom of Nuimi commanded the northern entrance of the River Gambia, collecting customs (known as 'commercio' or river dues) from all incoming European vessels.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "archival-manuscript",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Dr. Florence Mahoney (Stories of Senegambia) and Hassoum Ceesay (Gambian Women: An Introductory History)",
    sourceRef: {
      title: "The Royal Matriarchs of Nuimi and the Barra Wars",
      notes: "Documented in historical scholarship by Dr. Florence Mahoney (first Gambian woman to earn a PhD in history) and Hassoum Ceesay (Director of NCAC). Recorded in colonial administrative papers and Nuimi oral lineages.",
    },
    originalLanguage: "Mandinka oral tradition and historical archives",
    historicalPeriod: "Early 19th century (c. 1815–1835)",
    adaptationNotes:
      "Arranged into five dynamic scenes: the sentinel at Barra Point, the defying foreign merchant, the royal war council of Nuimi women, the blockade of the estuary narrows, and the triumph of diplomatic sovereignty.",
    authenticityStatement:
      "This story is an authentic, historically verified account of Gambian female leadership and anti-colonial trade defense in the Kingdom of Nuimi.",
  },
  historicalContext: {
    era: "Early 19th century",
    approximateDate: "c. 1820–1831",
    location: "Barra Point, Kingdom of Nuimi, Mouth of the River Gambia",
    documentedFigures: ["Queen Yanmey", "Mansa Burungai Sonko", "Governor Charles MacCarthy"],
    documentedEvents: ["The Nuimi Customs Disputes", "The Prelude to the Barra War (1831)"],
    narrativeReconstructionNotes:
      "The legal framework of river customs, Nuimi's naval fleet of 80-oared war-canoes, and the diplomatic standoff over Barra Point are documented historical realities. Speeches and scene textures are reconstructed in harmony with Mandinka royal council traditions.",
  },
  narrative: {
    openingFormula:
      "Bismillah... Turn your gaze toward the salt spray of Barra Point, where the queens of Nuimi stood like iron lighthouses against the tide.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The waves roll onto the sands of Barra, still whispering the name of Yanmey, who proved that the river yields only to those who guard its honor.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Sovereignty is not maintained by polite requests; it is defended by unity, legal clarity, and fearless resolve.",
    communalMoral:
      "Honor the women who built and defended our nations, for their courage was the foundation of our independence.",
    contextualNotes: [
      "Nuimi: One of the oldest Mandinka kingdoms along the River Gambia, controlling maritime trade routes from the 14th century onward.",
      "Customs Dues: Traditional taxes collected by Senegambian sovereigns from foreign trading vessels seeking safe passage upriver.",
      "Kankurang: While a sacred masquerade, in coastal Nuimi it also represented the fierce protective spirit of the ancestral forest.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Female Leadership", "Sovereignty", "Diplomacy", "Maritime History"],
  characters: ["Queen Yanmey", "Mansa Burungai Sonko", "Captain Hawkins", "The Nuimi Fleet Commander"],
  coverImage: {
    src: "/images/stories/griot-baobab.svg",
    alt: "A commanding African queen draped in indigo and gold cloth standing atop the coastal dunes of Barra watching sailing ships in the river mouth",
    paletteTheme: "river",
  },
  featured: false,
  scenes: [
    {
      id: "scene-qy-1",
      sceneNumber: 1,
      title: "The Sentinel of the Narrows",
      text: "At the narrow mouth of the River Gambia, where the opposite shore of Bathurst was barely three miles away, stood the royal watchtower of Barra Point. Every brig, brigantine, and schooner arriving from the Atlantic had to drop anchor and send an officer ashore. For centuries, the Kingdom of Nuimi had levied customary transit dues on all foreign commerce. At the head of the royal customs court sat Queen Yanmey—a woman of the royal Sonko lineage whose piercing gaze and mastery of international commerce made even the haughtiest sea captains lower their hats.",
      narration: "At the gate of the great river, Queen Yanmey commanded the tides and the terms of international trade.",
      backgroundGradient: "from-[#0A1A24] via-[#061018] to-[#02060A]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["Queen Yanmey"],
      audio: {
        narrationUrl: "/audio/stories/queen-yanmey-and-the-sovereign-river/scene-01-narration.mp3",
        narrationDurationSeconds: 37.5,
        cues: yanmeyScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-qy-2",
      sceneNumber: 2,
      title: "The Merchant's Defiance",
      text: "One blustery October morning, a heavily armed merchant brig from Liverpool ignored the warning flags hoisted at Barra Point. Relying on favorable winds and a low tide, its captain fired a mock salute and steered directly past the sandbar without paying the mandated bars of iron and sacks of salt. When royal harbor runners paddled out to demand compliance, the British captain laughed from the quarterdeck: 'The river is free to the Crown; we pay no tribute to local sovereigns!' He ordered all sails unfurled and vanished upriver toward the trading factories.",
      narration: "A foreign brig slipped past the warning flags, boasting that European cannon made river laws obsolete.",
      backgroundGradient: "from-[#10202A] via-[#0A141A] to-[#04080E]",
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
        type: "wind",
        intensity: "gentle",
      },
      characters: ["Queen Yanmey", "Captain Hawkins"],
      audio: {
        narrationUrl: "/audio/stories/queen-yanmey-and-the-sovereign-river/scene-02-narration.mp3",
        narrationDurationSeconds: 34.48,
        cues: yanmeyScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-qy-3",
      sceneNumber: 3,
      title: "The Council of Barra Point",
      text: "Inside the royal court, some counselors urged caution, fearing retaliation from the newly constructed garrison across the water. Queen Yanmey stood before the assembly, her indigo shawl pinned with heavy silver rosettes. 'If we allow one ship to break our law today,' she spoke with calm authority, 'tomorrow twenty ships will sail through our living rooms and call it their highway. Nuimi has ruled these waters since the days of Sundiata. We do not ask for gifts; we collect the legitimate toll of our ancestors' soil.'",
      narration: "A royal council in Barra, where Queen Yanmey rallied the kingdom to defend its ancestral river rights.",
      backgroundGradient: "from-[#22160C] via-[#160E06] to-[#0A0602]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "subtle",
      },
      characters: ["Queen Yanmey", "Mansa Burungai Sonko"],
      audio: {
        narrationUrl: "/audio/stories/queen-yanmey-and-the-sovereign-river/scene-03-narration.mp3",
        narrationDurationSeconds: 32.58,
        cues: yanmeyScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-qy-4",
      sceneNumber: 4,
      title: "The Blockade of War-Canoes",
      text: "Two weeks later, the merchant brig returned downriver, laden with beeswax, ivory, and groundnuts. But as it approached the Barra narrows, the crew stopped dead in their tracks. Spanning the entire channel from Barra Point to the shoals were thirty massive Nuimi royal war-canoes, each manned by forty seasoned oarsmen and armed riflemen. Drums sounded from both shores in thunderous unison. Queen Yanmey herself stood at the prow of the flagship canoe, holding aloft the royal staff of Nuimi. The ship’s sails were dropped within minutes.",
      narration: "Thirty royal war-canoes stretched across the estuary channel, forming an unyielding wall of African naval power.",
      backgroundGradient: "from-[#081820] via-[#040E14] to-[#020608]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["Queen Yanmey", "Captain Hawkins", "The Nuimi Fleet Commander"],
      audio: {
        narrationUrl: "/audio/stories/queen-yanmey-and-the-sovereign-river/scene-04-narration.mp3",
        narrationDurationSeconds: 33.42,
        cues: yanmeyScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-qy-5",
      sceneNumber: 5,
      title: "Tribute to the Crown of Nuimi",
      text: "The British captain was escorted ashore to the shaded veranda of Barra court. He did not laugh now. Before Queen Yanmey and the assembled elders, he paid every iron bar of the overdue customs, doubled by a penalty fine of silver thalers, and signed an official pledge of future compliance. When the brig finally sailed out into the Atlantic, it dipped its ensign three times in salute to the queen. On the sands of Barra Point, Queen Yanmey watched the sails shrink into the horizon, having proved that true sovereignty belongs to those who stand firm in defense of their heritage.",
      narration: "Full tribute was paid in silver and respect, establishing African naval authority on the great river.",
      backgroundGradient: "from-[#142028] via-[#0C141A] to-[#05080C]",
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
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Queen Yanmey", "Captain Hawkins"],
      audio: {
        narrationUrl: "/audio/stories/queen-yanmey-and-the-sovereign-river/scene-05-narration.mp3",
        narrationDurationSeconds: 37.27,
        cues: yanmeyScene05 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
