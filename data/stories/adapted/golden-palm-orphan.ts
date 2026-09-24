import { Story, NarrationCue } from "@/types/story";
import goldenPalmScene01 from "@/data/audio/cues/golden-palm-orphan/scene-01.json";
import goldenPalmScene02 from "@/data/audio/cues/golden-palm-orphan/scene-02.json";
import goldenPalmScene03 from "@/data/audio/cues/golden-palm-orphan/scene-03.json";
import goldenPalmScene04 from "@/data/audio/cues/golden-palm-orphan/scene-04.json";


export const goldenPalmOrphanStory: Story = {
  id: "story-golden-palm",
  slug: "the-golden-palm-and-the-orphan-boy",
  title: "The Golden Palm and the Orphan Boy",
  subtitle: "The Serahule and Mandinka tale of an outcast herder, three tests of charity, and the secret grove of fortune",
  description:
    "Cast out by his selfish uncle to herd goats across the blazing dry-season savanna, young Alieu shares his only calabash of water with a parched weaver bird, a wounded sand lizard, and an exhausted traveler. In return, they lead him to the mythical grove of the Golden Palm, where kindness is weighed in scales of pure blessing.",
  category: "folktale",
  contentType: "traditional",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Upper River Region and the eastern borderlands)",
    community: "Serahule and Mandinka oral folklore",
    ethnicGroup: "Serahule & Mandinka",
    culturalContext:
      "A cherished moral quest narrative collected by Dembo Fanta Bojang and Sukai Mbye Bojang in their fourth volume of Gambian folktales. The story embodies the core West African cultural virtue that hospitality and compassion shown to the vulnerable or to animals carries divine spiritual rewards.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Dembo Fanta Bojang and Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 4)",
    sourceRef: {
      title: "The Orphan Boy and the Miraculous Palm",
      notes: "Documented in Sukai Mbye Bojang and Dembo Fanta Bojang's collection of Gambian folktales. Adapted into an evocative English narrative honoring Serahule pastoral imagery.",
    },
    originalLanguage: "Serahule and Mandinka oral tradition",
    historicalPeriod: "Ancestral oral heritage",
    adaptationNotes:
      "Structured into four poignant scenes: the harsh savanna exile, the three tests of selflessness, the discovery of the Golden Palm, and the poetic justice of the homecoming.",
    authenticityStatement:
      "This story is an authentic, culturally foundational Gambian moral folktale published in national curriculum readers by Dembo Fanta Bojang and Sukai Mbye Bojang.",
  },
  narrative: {
    openingFormula:
      "Kattikatoo! In the days when kindness walked in rags and blessings rode upon the dry wind...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever a traveler asks for water in the heat of midday, give freely, for the golden palm grows only where generosity waters the earth.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "He who shares his last drop with the thirsty will find his well filled by the hands of destiny.",
    communalMoral:
      "Protect and cherish the orphan and the stranger, for blessing enters a compound through the door of compassion.",
    contextualNotes: [
      "Serahule: A prominent Gambian ethnic group known historically for long-distance commerce, farming, and deep Islamic scholarship.",
      "Kola Gourd: A hollowed-out fruit used as a canteen by herdsmen to keep water cool during long treks across the savanna.",
      "Basse: A major historical trading center on the south bank of the Upper River Region.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Compassion", "Integrity", "Perseverance", "Divine Justice"],
  characters: ["Young Alieu", "The Selfish Uncle", "The Old Wayfarer", "The Golden Weaver Bird"],
  coverImage: {
    src: "/images/stories/spider-wisdom.svg",
    alt: "A young boy carrying a herder's staff beneath a majestic glowing golden palm tree surrounded by gentle savanna creatures",
    paletteTheme: "gold",
  },
  featured: false,
  scenes: [
    {
      id: "scene-gp-1",
      sceneNumber: 1,
      title: "The Outcast of the Compound",
      text: "In a wealthy compound near the eastern river bluffs, young Alieu was treated as an unwanted burden by his uncle, who had claimed the boy’s inherited cattle after his father’s death. While his cousins slept in airy rooms and ate bowls of buttery couscous, Alieu was sent out each dawn into the thornbush with a flock of stubborn goats. His only possession was a small, polished water calabash and a wooden herder’s flute he had carved from river reed.",
      narration: "A lonely boy herding goats through the thornbush, carrying an empty belly and an uncorrupted heart.",
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
      characters: ["Young Alieu", "The Selfish Uncle"],
      audio: {
        narrationUrl: "/audio/stories/the-golden-palm-and-the-orphan-boy/scene-01-narration.mp3",
        narrationDurationSeconds: 27.55,
        cues: goldenPalmScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-gp-2",
      sceneNumber: 2,
      title: "The Three Sips of Water",
      text: "At noon, when the sun stood directly overhead and the red earth shimmered like hot iron, Alieu sat beneath an acacia to drink his meager water. Just then, a tiny golden weaver bird fell from a branch, panting with dry throat. Alieu poured a spoonful into his palm for the bird to drink. Next, a gray sand lizard dragged itself across the dust; Alieu wet a leaf for the creature. Finally, an old blind wayfarer stumbled down the path, whispering for moisture. Without hesitating, Alieu pressed the remainder of his gourd into the old man’s trembling hands, keeping not a single drop for himself.",
      narration: "Three sips of life given away under the blazing midday heat, leaving nothing for himself but peace.",
      backgroundGradient: "from-[#2A1A0C] via-[#1C1006] to-[#0E0803]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Young Alieu", "The Golden Weaver Bird", "The Old Wayfarer"],
      audio: {
        narrationUrl: "/audio/stories/the-golden-palm-and-the-orphan-boy/scene-02-narration.mp3",
        narrationDurationSeconds: 37.45,
        cues: goldenPalmScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-gp-3",
      sceneNumber: 3,
      title: "The Grove of the Golden Palm",
      text: "The old traveler straightened his back, his cloudy eyes clearing to reveal eyes like deep river pools. 'Your heart is a living well, child,' the elder smiled. The golden weaver bird fluttered ahead, singing a crystal melody that parted the thickest thorn thickets. Following the flight, Alieu was led into a hidden valley where a single magnificent palm tree stood, its fronds spun of shimmering golden threads and its dates glowing like amber lamps. The elder instructed Alieu to gather three fallen golden dates and return in peace.",
      narration: "A hidden valley revealed by gratitude, where a golden palm tree bore fruits of pure blessing.",
      backgroundGradient: "from-[#1A180E] via-[#100E08] to-[#060503]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Young Alieu", "The Old Wayfarer", "The Golden Weaver Bird"],
      audio: {
        narrationUrl: "/audio/stories/the-golden-palm-and-the-orphan-boy/scene-03-narration.mp3",
        narrationDurationSeconds: 33.88,
        cues: goldenPalmScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-gp-4",
      sceneNumber: 4,
      title: "The Harvest of Justice",
      text: "When Alieu placed the three dates upon his compound threshold, they transformed into three magnificent herds of healthy cattle, their bells chiming across the valley. The greedy uncle rushed out to demand his share, but when he attempted to journey into the bush with an empty heart to find the tree, the thorns closed tightly against him. Alieu grew to become the most generous patron of the district, building wells in every dry village and ensuring that no orphan in the river basin ever walked through the heat alone.",
      narration: "True fortune rewarded a generous spirit, and wells of fresh water blessed the land for generations.",
      backgroundGradient: "from-[#22160C] via-[#160E07] to-[#0A0603]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
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
      characters: ["Young Alieu", "The Selfish Uncle"],
      audio: {
        narrationUrl: "/audio/stories/the-golden-palm-and-the-orphan-boy/scene-04-narration.mp3",
        narrationDurationSeconds: 32.45,
        cues: goldenPalmScene04 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
