import { Story } from "@/types/story";

export const twoKumbasStory: Story = {
  id: "story-two-kumbas",
  slug: "the-two-kumbas",
  title: "The Two Kumbas",
  subtitle: "The Senegambian moral tale of Kumba Am Ndey and Kumba Amul Ndey",
  description:
    "When a motherless girl is sent to scrub an enchanted calabash in the mystical waters of Daayaan, her humble courtesy toward speaking trees and river elders transforms her destiny, while her arrogant stepsister discovers the bitter price of pride.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Senegambia (Saloum and River Gambia basin)",
    community: "Wolof and Senegambian oral tradition",
    ethnicGroup: "Wolof oral folklore",
    culturalContext:
      "One of the most beloved and foundational moral folktales in Senegambia, widely recognized as the classic Wolof sister tale. It contrasts humility, respect for elders, and kindness with entitlement and pride.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Adapted by Tales of The Gambia Editorial Guild",
    sourceRef: {
      title: "Kumba Am Ndey and Kumba Amul Ndey oral cycle",
      notes: "Documented across Senegambian folklore scholarship (including Birago Diop's 'Les Contes d'Amadou Koumba'). Retold in English for digital storytelling.",
    },
    originalLanguage: "Wolof oral tradition",
    historicalPeriod: "Ancestral oral heritage",
    adaptationNotes:
      "Structured into six distinct narrative scenes following Kumba Amul Ndey's journey to the river, her respectful encounters with the enchanted creatures of the bush, and the moral consequence faced by her stepsister.",
    authenticityStatement:
      "This story is an authentic, deeply cherished Senegambian folktale originating in the Wolof storytelling canon. This digital version is an editorial English adaptation preserving the traditional motifs of the talking baobab, the test of courtesy, and the eggs of fortune.",
  },
  narrative: {
    openingFormula:
      "Taal bu daan... Listen to what the grandmothers tell by the warm embers of the compound fire...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And so the story flows down the bolong and returns to the hearts of those who honor humility.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "A sweet tongue and a respectful heart open gates that all the gold in the world cannot unlock.",
    communalMoral:
      "Respect for elders and kindness to strangers are the true adornments of a noble heart.",
    contextualNotes: [
      "Kumba Am Ndey: In Wolof, literally 'Kumba who has a mother', representing the favored and indulged child.",
      "Kumba Amul Ndey: In Wolof, literally 'Kumba who has no mother' (the orphan), representing quiet endurance and moral integrity.",
      "Daayaan: In Senegambian lore, the mythical mystical waters where the spiritual realm intersects with human journey.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 8,
  listeningDurationSeconds: 480,
  themes: ["Humility", "Kindness", "Respect for Elders", "Justice"],
  characters: ["Kumba the Gentle", "The Stepmother", "The Old Woman of the Bush", "The Talking Baobab"],
  coverImage: {
    src: "/images/stories/spider-wisdom.svg",
    alt: "A young girl carrying an earthenware vessel through a sunlit baobab grove toward a shimmering river",
    paletteTheme: "gold",
  },
  featured: false,
  scenes: [
    {
      id: "scene-tk-1",
      sceneNumber: 1,
      title: "The Two Daughters of the Compound",
      text: "In a quiet village near the great river lived two girls who shared the same father and the same name: Kumba. But their lives were as different as the sun and the dry dust. Kumba Am Ndey, whose mother ruled the household, slept on soft woven mats and wore necklaces of polished amber. But Kumba Amul Ndey, whose mother had passed into the realm of the ancestors, rose before the first rooster crowed to pound millet, sweep the compound, and fetch river water with bruised hands.",
      narration: "Two sisters bearing the same name, but walking paths carved by cruelty and patience.",
      backgroundGradient: "from-[#2A1E14] via-[#1C140D] to-[#12100E]",
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
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Kumba the Gentle"],
      ambience: {
        type: "village-fire",
        label: "Distant rhythm of morning pestle and mortar",
      },
      durationSeconds: 14,
    },
    {
      id: "scene-tk-2",
      sceneNumber: 2,
      title: "The Impossible Errand",
      text: "One scorching afternoon, an old carved calabash slipped from Kumba's tired hands into the river mud. When her stepmother saw the smudge, she flew into a rage. 'Take this calabash,' the stepmother hissed, 'and walk until you find the mythical Sea of Daayaan! Do not show your face in this village again until the waters have washed it as pure as milk.' With a heavy heart but without a word of anger, gentle Kumba tied her headwrap, took the bowl, and walked out into the vast, shimmering savanna.",
      narration: "Cast out into the wilderness, she carried nothing but her humility and an empty calabash.",
      backgroundGradient: "from-[#331E12] via-[#22140C] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Kumba the Gentle", "The Stepmother"],
      ambience: {
        type: "gentle-wind",
        label: "Dry harmattan wind whispering through thorns",
      },
      durationSeconds: 15,
    },
    {
      id: "scene-tk-3",
      sceneNumber: 3,
      title: "The Voices of the Bush",
      text: "As she walked through the heat, an ancient baobab tree bent its thick branches and groaned in the wind: 'Young traveler, my bark is choked with dry parasite vines. Will you free me?' Most travelers would have hurried past, but Kumba climbed the trunk and patiently stripped the choking vines away. 'May your steps be blessed,' the baobab whispered, showering sweet white fruit into her apron. Further along, a small herd of gazelles was trapped in thorny brambles; Kumba gently parted the thorns, accepting nothing but their grateful eyes before continuing her lonely trek.",
      narration: "Kindness is never wasted on the creatures of the earth; the bush remembers every gentle touch.",
      backgroundGradient: "from-[#22301D] via-[#162113] to-[#0E150D]",
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
        type: "wind",
        intensity: "gentle",
      },
      characters: ["Kumba the Gentle", "The Talking Baobab"],
      ambience: {
        type: "gentle-wind",
        label: "Rustling baobab leaves and birdsong",
      },
      durationSeconds: 16,
    },
    {
      id: "scene-tk-4",
      sceneNumber: 4,
      title: "The Old Mother by the Shimmering Waters",
      text: "At sunset, she reached the crystal waters of Daayaan. Beside the reeds sat a frail old woman whose back was bent with centuries of age. 'Daughter,' the elder croaked with a parched voice, 'my head aches and my hair is tangled with dust. Will you comb it for me?' Kumba knelt in the sand with deep reverence. She washed the elder's hair with cool river water, spoke words of comfort, and prepared a simple porridge with her dried baobab fruit, offering the first bite to the grandmother.",
      narration: "In the presence of elders, true nobility bows its head and serves with joy.",
      backgroundGradient: "from-[#142B31] via-[#0E1E22] to-[#091316]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 55 },
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
      characters: ["Kumba the Gentle", "The Old Woman of the Bush"],
      ambience: {
        type: "river-flow",
        label: "Lapping of clear enchanted waters",
      },
      durationSeconds: 16,
    },
    {
      id: "scene-tk-5",
      sceneNumber: 5,
      title: "The Gift of the Singing Eggs",
      text: "The old woman smiled, and her eyes sparkled like stars in the evening tide. She dipped Kumba's calabash into the water, and it emerged gleaming like polished ivory. Then she offered Kumba three small eggs from beneath her shawl: 'Take these, child of peace. Break the first when you enter the deep forest; break the second outside your village; and break the third inside your room.' When Kumba broke the eggs, they did not crack with yolk — they opened with herds of healthy cattle, bolts of indigo cloth, and shining gold ornaments.",
      narration: "What the pure heart gives in kindness, the ancestors return a hundredfold.",
      backgroundGradient: "from-[#2A2312] via-[#1B160B] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["Kumba the Gentle"],
      ambience: {
        type: "village-fire",
        label: "Gentle shimmering mystical resonance",
      },
      durationSeconds: 16,
    },
    {
      id: "scene-tk-6",
      sceneNumber: 6,
      title: "The Mirror of Character",
      text: "Seeing Kumba's fortune, the greedy stepmother hastily dispatched her own daughter, Kumba Am Ndey, along the same path. But when the baobab asked for help, the proud girl mocked it. When the old woman asked for comfort, she sneered and kicked the river sand. The eggs she demanded yielded only swarms of stinging wasps and bitter thorns. From that day on, the compound elders taught all their children: two people may walk the exact same road, but the world answers only to the spirit you carry within.",
      narration: "The river flows on, teaching every generation that the mirror of life reflects only what we give.",
      backgroundGradient: "from-[#1F1913] via-[#15110D] to-[#0E0B09]",
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
      characters: ["Kumba the Gentle"],
      ambience: {
        type: "night-insects",
        label: "Peaceful evening village soundscape",
      },
      durationSeconds: 16,
    },
  ],
};
