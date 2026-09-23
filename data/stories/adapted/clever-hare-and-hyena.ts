import { Story } from "@/types/story";

export const cleverHareAndHyenaStory: Story = {
  id: "story-hare-hyena",
  slug: "the-clever-hare-and-the-hyena",
  title: "The Clever Hare and the Hyena",
  subtitle: "The classic Senegambian fable of Leuk and Bouki",
  description:
    "When hunger pressed upon the savanna, Leuk the Hare and Bouki the Hyena agreed to clear a groundnut field together. But where greedy Bouki sought to feast without toil, Leuk proved that sharp wit outruns heavy paws.",
  category: "fable",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Senegambia (North Bank / Saloum grasslands)",
    community: "Wolof and Mandinka oral storytelling traditions",
    ethnicGroup: "Wolof (Leuk & Bouki cycle) / Mandinka (Kanku & Suluo)",
    culturalContext:
      "The quintessential trickster duo of Senegambian folklore: Leuk the Hare (embodying resourcefulness and wit) and Bouki the Hyena (embodying gluttony, impatience, and brute appetite).",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Adapted by Tales of The Gambia Editorial Guild",
    sourceRef: {
      title: "Senegambian Leuk and Bouki oral cycle",
      notes: "Based on the traditional Wolof oral cycle documented in regional folklore studies (including the classic anthologies of Birago Diop). Reconstructed into sequential narrative scenes for digital reading.",
    },
    originalLanguage: "Wolof / Mandinka oral transmission",
    historicalPeriod: "Ancestral oral folklore",
    adaptationNotes:
      "Structured into six narrative beats for digital reading and cinematic presentation. Preserves the traditional moral tension between shared labor, greed, and clever outwitting.",
    authenticityStatement:
      "This story is an editorial adaptation of the authentic Senegambian trickster cycle of Leuk the Hare and Bouki the Hyena. The characters and core dilemma are genuine oral folklore motifs shared across Senegal and The Gambia.",
  },
  narrative: {
    openingFormula:
      "Taal bu daan... Long ago, when animals walked upright and spoke with human tongues...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And so Bouki learned that an empty head and an open belly make poor companions for the harvest.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Greed blinds the eye before it empties the bowl. True wealth is gathered through honest labor and quiet wisdom.",
    communalMoral:
      "Greed blinds the eye before it empties the bowl. Wit and honesty outlive gluttony.",
    contextualNotes: [
      "Leuk: The Wolof name for the trickster hare, celebrated across West African oral literature for overcoming strength with cunning.",
      "Bouki: The Wolof name for the hyena, universally depicted in Senegambian fables as greedy, gullible, and easily swayed by his stomach.",
      "Groundnuts (Tiga): The staple agricultural crop of rural Senegambia, dried in high mounds after the rainy season.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Wit vs Strength", "Greed", "Communal Labor", "Fairness"],
  characters: ["Leuk the Hare", "Bouki the Hyena"],
  characterProfiles: [
    {
      id: "leuk-hare",
      name: "Leuk the Hare",
      role: "trickster",
      culturalSignificance:
        "Leuk represents the triumph of intellect and strategy over sheer physical power in West African oral tales.",
      traits: ["Quick-witted", "Observant", "Resourceful"],
      avatarTheme: "hare",
    },
    {
      id: "bouki-hyena",
      name: "Bouki the Hyena",
      role: "antagonist",
      culturalSignificance:
        "Bouki represents the destructive foolishness of gluttony, impatience, and underestimating one's neighbors.",
      traits: ["Gluttonous", "Impatient", "Boastful"],
    },
  ],
  coverImage: {
    src: "/images/stories/hare-drought.svg",
    alt: "Leuk the Hare looking thoughtfully at a sprawling groundnut field while Bouki rests in the distance",
    paletteTheme: "ochre",
  },
  featured: false,
  scenes: [
    {
      id: "scene-hh-1",
      sceneNumber: 1,
      title: "A Pact at the Edge of the Bush",
      text: "The rains had washed over the red ridges of Saloum, leaving the soil soft and sweet with the smell of young green shoots. Leuk the Hare sat upon a fallen termite mound, his long ears twitching in the cool morning air. Up the sandy trail came Bouki the Hyena, his shoulders slumped and his belly rumbling like distant thunder. 'Brother Leuk,' Bouki wheezed, licking his dry chops, 'hunger is gnawing at my ribs. If we do not farm this season, we shall have only dust to chew when the dry harmattan winds return.' Leuk stroked his whiskers thoughtfully. 'Let us clear the fertile bottomland by the baobab tree together,' he proposed. 'Half the labor, half the harvest.'",
      narration: "A partnership was struck beneath the morning sun — but an empty stomach makes promises a greedy heart cannot keep.",
      backgroundGradient: "from-[#2C190D] via-[#1E120A] to-[#12100E]",
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
        type: "wind",
        intensity: "subtle",
      },
      characters: ["Leuk the Hare", "Bouki the Hyena"],
      charactersData: [
        {
          id: "leuk-hare",
          name: "Leuk",
          position: "left",
          expression: "clever",
          motion: "subtle-float",
          avatarTheme: "hare",
        },
      ],
      ambience: {
        type: "gentle-wind",
        label: "Morning breeze over open grasslands",
      },
      durationSeconds: 14,
    },
    {
      id: "scene-hh-2",
      sceneNumber: 2,
      title: "The Hoe and the Shade",
      text: "By midday, the heat climbed into the sky like flame off dry wood. Leuk swung his short-handled hoe with rhythmic precision, turning over the rich earth furrow by furrow. But Bouki leaned against his hoe, mopping his forehead with a leafy branch. 'Ah, Leuk,' Bouki groaned, clutching his side with exaggerated sorrow, 'a sudden fever has seized my bones! My head spins like a top. I must rest under the shade of the baobab for just a little while, or I shall surely perish.' Leuk smiled knowingly, his paws never pausing. 'Rest well, Brother Bouki,' he replied. 'The hoe does not ask who watches, only who digs.'",
      narration: "While one brother sweated under the noon sun, the other slept in the cool blue shadow.",
      backgroundGradient: "from-[#382212] via-[#24160C] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
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
      characters: ["Leuk the Hare", "Bouki the Hyena"],
      charactersData: [
        {
          id: "leuk-hare",
          name: "Leuk",
          position: "center",
          expression: "focused",
          motion: "breathing",
          avatarTheme: "hare",
        },
      ],
      ambience: {
        type: "gentle-wind",
        label: "Cicadas calling in the midday heat",
      },
      durationSeconds: 15,
    },
    {
      id: "scene-hh-3",
      sceneNumber: 3,
      title: "The Golden Harvest",
      text: "Moons passed, and the green leaves withered into the gold of harvest time. Beneath the earth, the groundnuts had swelled into crisp, rich pods. When Leuk began to pull the vines from the dry loam, Bouki miraculously recovered his strength. He bounded into the clearing with two enormous woven baskets strapped to his sides, his eyes glistening. 'Behold our bountiful crop, partner!' Bouki shouted, rubbing his paws. 'Since I am larger and have a larger household to sustain, it is only proper that I take the pods from the tall rows, and you may have the roots and empty shells from the edges.'",
      narration: "When the work was done, the one who slept was the first to arrive with open baskets.",
      backgroundGradient: "from-[#352713] via-[#221A0C] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 45, y: 55 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Leuk the Hare", "Bouki the Hyena"],
      ambience: {
        type: "gentle-wind",
        label: "Rustle of dried groundnut leaves",
      },
      durationSeconds: 14,
    },
    {
      id: "scene-hh-4",
      sceneNumber: 4,
      title: "The Night Feast Trap",
      text: "Leuk nodded agreeably. 'Of course, Brother Bouki. But we must let the mounds dry overnight in the center of the field before we divide them. The night air sweetens the oils.' That night, unable to contain his greed, Bouki crept into the darkened field under the crescent moon to feast upon the mounds before Leuk could return. But Leuk had prepared for his partner's hunger. He had placed a large hollow clay pot coated with sticky sap right at the center of the largest mound, draping it with fresh vines.",
      narration: "Greed cannot wait for dawn, and darkness hides the snare from eager eyes.",
      backgroundGradient: "from-[#111A24] via-[#0D131C] to-[#0A0E14]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 50 },
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
      characters: ["Bouki the Hyena"],
      ambience: {
        type: "night-insects",
        label: "Nocturnal savanna insects and night breeze",
      },
      durationSeconds: 15,
    },
    {
      id: "scene-hh-5",
      sceneNumber: 5,
      title: "Stuck in the Clay",
      text: "Bouki lunged into the pile with both paws. Instantly, the sticky tree sap seized his fur. 'Who dares hold Bouki?' he snarled, kicking with his hind leg. That leg stuck fast too. He struck with his snout, and his jaws sealed shut against the pot. By the time the golden light of dawn filtered through the leaves of the baobab, Bouki was curled around the jar like a tangled calabash, howling in muffled embarrassment as the village birds gathered above to sing of his folly.",
      narration: "The trap was not made of iron or rope, but of Bouki's own hasty appetite.",
      backgroundGradient: "from-[#2A1810] via-[#1B110B] to-[#12100E]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Bouki the Hyena"],
      ambience: {
        type: "gentle-wind",
        label: "Morning birds chirping over the field",
      },
      durationSeconds: 16,
    },
    {
      id: "scene-hh-6",
      sceneNumber: 6,
      title: "The Measure of Labor",
      text: "Leuk arrived with the rising sun, stepping lightly between the furrows with his woven baskets. He freed Bouki with a bowl of warm groundnut oil, but sent him away with empty paws. 'You sought to eat from sweat you never shed,' Leuk said gently as the shame-faced hyena slunk into the tall savanna grass. And from that day forward, the animals of the grasslands remembered: in the community field, the seeds are planted by patience, but the harvest is reaped by truth.",
      narration: "The savanna fell quiet once more, peaceful in the restoration of fair labor.",
      backgroundGradient: "from-[#2E1E12] via-[#1D140D] to-[#12100E]",
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
        type: "fire-flicker",
        intensity: "gentle",
      },
      characters: ["Leuk the Hare"],
      charactersData: [
        {
          id: "leuk-hare",
          name: "Leuk the Hare",
          position: "center",
          expression: "peaceful",
          motion: "breathing",
          avatarTheme: "hare",
        },
      ],
      ambience: {
        type: "gentle-wind",
        label: "Warm afternoon savanna breeze",
      },
      durationSeconds: 16,
    },
  ],
};
