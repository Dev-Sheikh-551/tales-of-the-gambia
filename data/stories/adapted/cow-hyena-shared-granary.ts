import { Story, NarrationCue } from "@/types/story";
import cowHyenaGranaryScene01 from "@/data/audio/cues/cow-hyena-granary/scene-01.json";
import cowHyenaGranaryScene02 from "@/data/audio/cues/cow-hyena-granary/scene-02.json";
import cowHyenaGranaryScene03 from "@/data/audio/cues/cow-hyena-granary/scene-03.json";
import cowHyenaGranaryScene04 from "@/data/audio/cues/cow-hyena-granary/scene-04.json";


export const cowHyenaSharedGranaryStory: Story = {
  id: "story-cow-hyena-granary",
  slug: "the-cow-the-hyena-and-the-shared-granary",
  title: "The Cow, the Hyena, and the Shared Granary",
  subtitle: "The classic Gambian animal fable of joint labor, midnight deceit, and the forensic cleverness of the Hare",
  description:
    "When a season of erratic rains threatens the animals of the savanna, Cow, Hyena, Lion, and Hare join hooves and paws to clear a communal farm and store their harvest in a guarded granary. But when sacks of groundnuts begin vanishing in the dead of night, Hare uses a bowl of wet river clay and wood ash to expose the thief before the council of beasts.",
  category: "fable",
  contentType: "traditional",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Central River Region and Upper River Region)",
    community: "Mandinka and Fula oral storytelling tradition",
    ethnicGroup: "Mandinka & Fula",
    culturalContext:
      "A foundational animal fable found in the school and fireside curriculum of The Gambia, documented by Sukai Mbye Bojang and Dembo Fanta Bojang. It teaches children and communities the vital importance of cooperative farm work (known as the 'Kafo' or communal work group) and the perils of greed.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Dembo Fanta Bojang and Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 1)",
    sourceRef: {
      title: "The Cow, Hyena, Lion and Hare Share a Home and Farm",
      notes: "Documented in Sukai Mbye Bojang and Dembo Fanta Bojang's 'Folk Tales and Fables from The Gambia' (Vol. 1). Retold in English with editorial pacing.",
    },
    originalLanguage: "Mandinka oral tradition",
    historicalPeriod: "Ancestral oral heritage",
    adaptationNotes:
      "Arranged into four scenes detailing the clearing of the collective farm, the filling of the granary, Hyena's nighttime raid, and Hare's ash-and-clay footprint trap.",
    authenticityStatement:
      "This story is an authentic, time-honored Gambian folktale published in foundational national educational readers by Dembo Fanta Bojang and Sukai Mbye Bojang.",
  },
  narrative: {
    openingFormula:
      "Kattikatoo! In the days when all four-legged creatures spoke a single tongue and shared the sweat of the hoe...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And from that day to this, Hyena only prowls in the dark, ashamed to look an honest farmer in the eye.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "A partnership built on honest sweat cannot endure when one belly seeks to eat what four pairs of hands have sown.",
    communalMoral:
      "True community thrives on fairness; deceit leaves tracks that even the morning dew cannot wash away.",
    contextualNotes: [
      "Kafo: The traditional Gambian communal age-grade labor group that helps neighbors clear, plant, and harvest fields.",
      "Benteng (Granary): An elevated woven storehouse constructed on stilts to keep harvested millet and groundnuts safe from pests and dampness.",
      "Tika (Groundnut): The staple crop of Gambian agriculture, cultivated during the rainy season.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Honesty", "Cooperation", "Justice", "Consequences of Greed"],
  characters: ["The Clever Hare", "The Greedy Hyena", "Mother Cow", "Lion the Elder"],
  coverImage: {
    src: "/images/stories/clever-hare-hyena.svg",
    alt: "A peaceful savanna farmland with a woven granary beneath a wide acacia tree, watched by four animal companions",
    paletteTheme: "earth",
  },
  featured: false,
  scenes: [
    {
      id: "scene-chg-1",
      sceneNumber: 1,
      title: "The Covenant of the Kafo",
      text: "When the dry winds of May turned the savanna grass to straw, Mother Cow gathered her forest neighbors beneath the big silk-cotton tree. 'If each of us farms alone,' she lowed gently, 'the drought will overcome us. But if we join our hooves and paws into a kafo, we can clear five fields before the first thundercloud breaks.' Lion agreed to bring his mighty strength to fell trees. Cow offered to plow the heavy furrow. Hare promised to measure the seed lines with precision, and Hyena—licking his lips with enthusiastic smiles—swore by all his ancestors to guard the gate.",
      narration: "Four unlikely neighbors joining hands to prepare the earth before the first rains swept the plain.",
      backgroundGradient: "from-[#2A1B0E] via-[#1B1008] to-[#0D0703]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 45 },
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
      characters: ["Mother Cow", "The Clever Hare", "The Greedy Hyena", "Lion the Elder"],
      audio: {
        narrationUrl: "/audio/stories/the-cow-the-hyena-and-the-shared-granary/scene-01-narration.mp3",
        narrationDurationSeconds: 35.73,
        cues: cowHyenaGranaryScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-chg-2",
      sceneNumber: 2,
      title: "The Filled Granary",
      text: "The rains fell in generous sheets, and the earth rewarded their shared toil. By October, the groundnuts were dug, the yellow maize was husked, and the pearl millet stood stacked in golden sheaves. Together, they built a tall, woven benteng raised on smooth wooden stilts, packing it to the roof with food to last through the lean months. 'No one shall touch a single grain,' Lion decreed in his rumbling voice, 'until the harmattan winds arrive and the village council approves.' They locked the wooden door with a sturdy pad of baobab bark and went home to sleep.",
      narration: "A grand granary standing proud against the sunset, filled to the eaves by the sweat of honest labor.",
      backgroundGradient: "from-[#22160C] via-[#160E07] to-[#0A0603]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Lion the Elder", "Mother Cow", "The Clever Hare"],
      audio: {
        narrationUrl: "/audio/stories/the-cow-the-hyena-and-the-shared-granary/scene-02-narration.mp3",
        narrationDurationSeconds: 33.45,
        cues: cowHyenaGranaryScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-chg-3",
      sceneNumber: 3,
      title: "The Midnight Robbery",
      text: "While Cow chewed her cud peacefully and Hare rested his twitching whiskers, Hyena tossed and turned in his den. The scent of roasted groundnuts danced in his dreams like mischievous fireflies. In the pitch black of midnight, he crept toward the granary. Rather than break the front lock, he pried open a side reed slat, stuffed his muzzle inside, and gorged himself on groundnuts until his belly bulged like a water gourd. For three successive nights, the grain level shrank by half, yet Hyena was the first each morning to wail loudly about mysterious thieves.",
      narration: "A greedy companion sneaking through the dark to rob the very granary he had sworn to protect.",
      backgroundGradient: "from-[#101018] via-[#08080E] to-[#040406]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      characters: ["The Greedy Hyena"],
      audio: {
        narrationUrl: "/audio/stories/the-cow-the-hyena-and-the-shared-granary/scene-03-narration.mp3",
        narrationDurationSeconds: 34.55,
        cues: cowHyenaGranaryScene03 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-chg-4",
      sceneNumber: 4,
      title: "The Trap of White Ash",
      text: "Hare said nothing of his suspicions. Instead, before sunset, he quietly mixed fine river clay with white wood ash from the cooking fire, spreading a smooth, invisible circle around the stilts of the benteng. When dawn came, the thieves' tracks were pressed into the clay with photographic clarity: broad, uneven pads and dragging claws that led straight across the clearing and stopped right at the front door of Hyena's sleeping hut! Confronted before the council of animals, Hyena dropped his head in disgrace and fled into the thorn thickets, leaving the honest companions to share what remained in peace.",
      narration: "A quiet ring of white ash told the truth that lying tongues could never dispute.",
      backgroundGradient: "from-[#28180A] via-[#1A0F06] to-[#0C0702]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["The Clever Hare", "The Greedy Hyena", "Mother Cow", "Lion the Elder"],
      audio: {
        narrationUrl: "/audio/stories/the-cow-the-hyena-and-the-shared-granary/scene-04-narration.mp3",
        narrationDurationSeconds: 37.08,
        cues: cowHyenaGranaryScene04 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
