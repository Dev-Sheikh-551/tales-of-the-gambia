import { Story, NarrationCue } from "@/types/story";
import boppiScene01 from "@/data/audio/cues/boppi-jerreh/scene-01.json";
import boppiScene02 from "@/data/audio/cues/boppi-jerreh/scene-02.json";
import boppiScene03 from "@/data/audio/cues/boppi-jerreh/scene-03.json";
import boppiScene04 from "@/data/audio/cues/boppi-jerreh/scene-04.json";


export const boppiJerrehStory: Story = {
  id: "story-boppi-jerreh",
  slug: "boppi-jerreh-spirits-of-dog-island",
  title: "Boppi Jerreh: The Spirits of Dog Island",
  subtitle: "The maritime legend of the River Gambia estuary and the guardians of the deep channel",
  description:
    "Where the mighty River Gambia opens into the churning Atlantic near Dog Island, the waters guard an ancient secret. When a daring young fisherman ignores the warnings of the elders and sails into the sacred channel during the equinox tide, he discovers the ancient pact between the sea spirits and the people of the river mouth.",
  category: "legend",
  contentType: "traditional",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Banjul, Barra, and Dog Island / Sita Nunku)",
    community: "Wolof and coastal Gambian fisherfolk oral tradition",
    ethnicGroup: "Wolof",
    culturalContext:
      "A revered maritime legend of the Banjul estuary, connected to Dog Island (known locally as Sita Nunku) and the dangerous deep-water shoals where the River Gambia meets the Atlantic Ocean.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 3) and Banjul maritime elders",
    sourceRef: {
      title: "Boppi Jerreh and the Coastal Spirits",
      notes: "Documented by Sukai Mbye Bojang in 'Folk Tales and Fables from The Gambia' (Vol. 3, Chapter 1) and preserved in the oral histories of Barra and Banjul fisherfolk.",
    },
    originalLanguage: "Wolof oral tradition",
    historicalPeriod: "Pre-colonial to 19th-century coastal traditions",
    adaptationNotes:
      "Structured into four atmospheric scenes detailing the island's lore, the young captain's hubris, the encounter with the guardian spirits of the channel, and the establishment of a lasting tribute.",
    authenticityStatement:
      "This legend is a genuine, foundational piece of Banjul and Barra oral folklore, documenting indigenous maritime beliefs and ancestral covenants with the estuary waters.",
  },
  narrative: {
    openingFormula:
      "Lebon... Amoon na fi! Listen to what the old captains tell by the boatyards of Barra, when the night tide rises against the pier...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever the Atlantic swells foam white over the sandbar, the fishermen dip their oars in quiet salute to Boppi Jerreh.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "The ocean has a memory older than human pride; those who navigate its depths must carry humility as their true anchor.",
    communalMoral:
      "Heed the counsel of the elders who have read the tides, for the sea forgives no boastful traveler.",
    contextualNotes: [
      "Dog Island (Sita Nunku): A historic rocky island in the River Gambia estuary near Barra, sacred in coastal oral history.",
      "Boppi Jerreh: In Wolof maritime lore, refers to the guardian spirit and historical presence associated with the deep channel near the island.",
      "Pirogue: The traditional wooden handcrafted canoe used for centuries by Senegambian seafaring fishermen.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Respect for Nature", "Maritime Heritage", "Elders' Wisdom", "Humility"],
  characters: ["Lamin the Navigator", "Elder Baboucar", "The Guardian of the Shoal"],
  coverImage: {
    src: "/images/stories/ninki-nanka.svg",
    alt: "A traditional wooden fishing boat sailing through mist past the dark silhouette of Dog Island in the River Gambia estuary",
    paletteTheme: "river",
  },
  featured: false,
  scenes: [
    {
      id: "scene-bj-1",
      sceneNumber: 1,
      title: "The Island in the Mist",
      text: "Between the sandy spit of Barra Point and the low mangrove shores of the north bank rises Dog Island—known to the elders as Sita Nunku. When the morning fog rolls off the Atlantic, the island looks like a sleeping whale resting in the amber estuary water. For generations, the master fishermen of the coast instructed their apprentices never to cast nets into the deep trench that swirls beside its eastern rocks without first offering a prayer and a gift of sour milk to the water guardians known as Boppi Jerreh.",
      narration: "A sleeping island wrapped in morning sea mist, guarded by ancient spirits of the ocean tide.",
      backgroundGradient: "from-[#081824] via-[#040E16] to-[#02060A]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["Elder Baboucar"],
      audio: {
        narrationUrl: "/audio/stories/boppi-jerreh-spirits-of-dog-island/scene-01-narration.mp3",
        narrationDurationSeconds: 37.98,
        cues: boppiScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-bj-2",
      sceneNumber: 2,
      title: "The Defiant Pirogue",
      text: "Young Lamin was the swiftest oarsman on the Barra shore. His carved pirogue cut through the surf like a flying fish, and his holds always returned brimming with barracuda and silver bonga. 'The elders speak of spirits because their arms have grown weak,' Lamin boasted to the young crewmen gathered on the beach. 'The fish at Sita Nunku belong to whoever has the courage to drop a net into the dark water.' Despite Elder Baboucar’s solemn warning that the equinox moon stirred forces no net could hold, Lamin pushed his boat out into the gathering swell.",
      narration: "A proud young captain who believed his courage could outmuscle the ancient laws of the estuary.",
      backgroundGradient: "from-[#10222E] via-[#09151C] to-[#04080C]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
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
      characters: ["Lamin the Navigator", "Elder Baboucar"],
      audio: {
        narrationUrl: "/audio/stories/boppi-jerreh-spirits-of-dog-island/scene-02-narration.mp3",
        narrationDurationSeconds: 39.2,
        cues: boppiScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-bj-3",
      sceneNumber: 3,
      title: "The Voice in the Churning Deep",
      text: "Under the shadow of the rocky island, the water turned from green to ink. Lamin cast his heavy hemp net. At once, the lines tightened with a weight so immense the wooden gunwales groaned. The surface did not ripple with thrashing fish; instead, the river grew deathly still, and from the depths rose a pale, luminescent light. A voice echoed not in their ears, but within their very chests: 'You come to take what is ours without asking, little brother of the dry shore.' The rudder snapped like dry grass, and the pirogue was pulled slowly toward the dark vortex of the channel.",
      narration: "A silence heavier than the sea fell over the boat, and from the deep trench rose a voice of pure tide.",
      backgroundGradient: "from-[#081C28] via-[#051118] to-[#020608]",
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
      characters: ["Lamin the Navigator", "The Guardian of the Shoal"],
      audio: {
        narrationUrl: "/audio/stories/boppi-jerreh-spirits-of-dog-island/scene-03-narration.mp3",
        narrationDurationSeconds: 38.17,
        cues: boppiScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-bj-4",
      sceneNumber: 4,
      title: "The Covenant of the Estuary",
      text: "Remembering the words of the elders in that terrifying hour, Lamin dropped to his knees in the bilge. He did not fight the current. Instead, he lifted his hands, poured his crew's fresh drinking water into the sea as a libation, and spoke words of humble repentance to Boppi Jerreh. The grip upon the keel relaxed. A gentle swell lifted the battered boat and carried it safely toward the shallows of Barra. From that night on, Lamin never crossed into the estuary without honoring the guardians, teaching every young sailor that courage without reverence is only folly in the eyes of the sea.",
      narration: "Hands opened in humility, the waters grew peaceful, and a lasting peace was sealed with the river mouth.",
      backgroundGradient: "from-[#122430] via-[#0B161E] to-[#04080C]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Lamin the Navigator", "Elder Baboucar"],
      audio: {
        narrationUrl: "/audio/stories/boppi-jerreh-spirits-of-dog-island/scene-04-narration.mp3",
        narrationDurationSeconds: 41.5,
        cues: boppiScene04 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
