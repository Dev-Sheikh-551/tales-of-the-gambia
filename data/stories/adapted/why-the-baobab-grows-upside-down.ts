import { Story } from "@/types/story";

/**
 * Why the Baobab Grows Upside Down
 *
 * Category: folktale
 * ContentType: adapted
 *
 * Editorial note:
 * "Why the baobab grows upside down" is one of the most widely documented
 * explanatory tales across West and Central Africa, including the Senegambia
 * region. It is referenced in Birago Diop's anthologies of West African tales
 * and in general collections of Senegambian oral literature. Variants are
 * documented among the Mandinka, Wolof, Hausa, and many other communities.
 *
 * The core narrative element — that the baobab was punished by the Creator
 * for pride or ingratitude and planted upside down — is consistent across
 * documented versions. The specific framing, characters, and dialogue in
 * this retelling are editorial composition based on the documented tradition.
 *
 * The baobab (Adansonia digitata) is one of the most culturally significant
 * trees in The Gambia and across West Africa. It is a meeting place, a
 * source of food and medicine, and a symbol of permanence and community.
 *
 * References:
 * - Birago Diop, "Tales of Amadou Koumba" (Présence Africaine, 1947/1966)
 * - Harold Courlander, "A Treasury of African Folklore" (1975)
 * - General Senegambian and West African oral tradition
 */

export const baobabUpsideDownStory: Story = {
  id: "why-the-baobab-grows-upside-down",
  slug: "why-the-baobab-grows-upside-down",
  title: "Why the Baobab Grows Upside Down",
  subtitle: "A Story of Pride and Patience",
  description:
    "In the beginning, the baobab was the most beautiful tree in all of creation — and it knew it. This is the story of what the Creator did about that, and why the strangest tree in Africa grows the way it grows.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",

  origin: {
    region: "The Gambia / West Africa",
    culturalContext:
      "Pan-West African / Senegambian explanatory folktale tradition; variants documented among Mandinka, Wolof, and other Senegambian communities",
    isDemoPlaceholder: false,
    community: "Mandinka / Wolof / Senegambian (widely shared tradition)",
    ethnicGroup: "Multi-ethnic (Senegambian)",
  },

  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "community-attributed",
    collectedFrom: "West African / Senegambian oral tradition",
    sourceRef: {
      title: "Tales of Amadou Koumba",
      author: "Birago Diop",
      institution: "Présence Africaine",
      year: 1966,
      notes:
        "Also: Harold Courlander, 'A Treasury of African Folklore' (Crown, 1975). The baobab origin tale is documented as a widely shared pan-West African explanatory narrative with consistent core elements across Mandinka, Wolof, Hausa and other traditions.",
    },
    collectorOrAuthor: "Tales of The Gambia editorial team (retelling based on documented tradition)",
    originalLanguage: "Mandinka / Wolof (widely shared oral tradition)",
    historicalPeriod: "Traditional / pre-colonial",
    adaptationNotes:
      "The core narrative — that the baobab was punished for pride by the Creator and planted upside down — is consistent across documented variants of this tale. The specific characters, dialogue, and framing in this retelling are editorial composition. The story is presented as an adaptation of a documented pan-Senegambian / West African narrative, not as a transcription of any single recorded performance.",
    authenticityStatement:
      "This retelling is based on a widely documented explanatory folktale from West African and Senegambian oral tradition, with variants recorded among Mandinka, Wolof, and other communities. The cultural core is attested. The specific narrative composition is editorial. No provenance has been invented.",
  },

  narrative: {
    openingFormula:
      "Kuma bee la! — Let the story come! A story for the ears, a truth for the heart.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "Now you know why the baobab stands the way it stands. Look at it next time — really look — and you will see that it has never forgotten what it learned.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Pride that forgets gratitude invites correction. And the correction, as the baobab shows, can last a very long time.",
    communalMoral:
      "Even the most beautiful thing in creation must know its place within the whole — or discover it the hard way.",
    contextualNotes: [
      "The baobab (Adansonia digitata) can live for over 2,000 years and reach a trunk circumference of over 40 metres. It is a central symbol of permanence in Gambian and West African culture.",
      "Baobab trees serve as community meeting places, landmarks, sources of food (fruit, leaves), and medicine across the Senegambia region.",
      "Many explanatory folktales (known as 'pourquoi tales') exist across West African traditions — stories that explain why animals or natural features are the way they are.",
      "The baobab is sometimes called 'the tree of life' or 'the upside-down tree' across multiple African traditions.",
    ],
  },

  language: "English",
  availableLanguages: ["English"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 480,

  themes: [
    "pride",
    "humility",
    "creation",
    "nature",
    "baobab",
    "explanatory folktale",
    "wisdom",
    "West African tradition",
    "trees",
    "consequences",
  ],

  characters: ["The Baobab Tree", "The Creator", "The Other Trees"],

  characterProfiles: [
    {
      id: "baobab",
      name: "The Baobab Tree",
      role: "protagonist",
      culturalSignificance:
        "The baobab is one of the most culturally significant trees in West Africa — its unusual appearance has generated explanatory traditions across the region.",
      traits: ["proud", "beautiful", "ungrateful", "transformed"],
      avatarTheme: "elephant",
    },
  ],

  coverImage: {
    src: "/images/stories/baobab-upside-down-cover.jpg",
    alt: "A vast ancient baobab tree stands against an orange Gambian sky, its bare branches reaching toward the earth like roots",
    paletteTheme: "ochre",
  },

  scenes: [
    {
      id: "baobab-scene-1",
      sceneNumber: 1,
      title: "In the Beginning",
      narration:
        "When the world was new, every tree was given beauty. But none was given more than the baobab.",
      text: `In the time before memory, when the world was still learning what it was, the Creator made the trees.

Each tree was given a form, a purpose, and a place in the order of things.

The palm tree was given height and grace, and told to provide shade and fruit and fibre.

The silk-cotton tree was given size and power, and told to be a home for birds and a shelter for the creatures of the forest.

The mango was given sweetness, and told to be generous.

The acacia was given thorns, and told to be strong without being cruel.

And then the Creator made the baobab.

Oh, but the baobab.

The baobab was given everything. A trunk like a palace. Bark smooth as ceremony. Leaves of bright, delicate green. Fruit full of goodness. Flowers white as cloud. It was, without question, the most magnificent tree in all of creation.

And the baobab knew it.`,
      backgroundGradient: "linear-gradient(135deg, #1a0800 0%, #4d2000 50%, #8b3a00 100%)",
      characters: ["The Baobab Tree"],
      charactersData: [
        {
          id: "baobab",
          name: "The Baobab",
          position: "center",
          expression: "proud",
          motion: "subtle-float",
          scale: 1.1,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "ochre" },
      cameraMotion: { preset: "zoom-in", intensity: "subtle", durationSeconds: 8 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      ambience: { type: "gentle-wind", label: "Morning breeze" },
      durationSeconds: 80,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "baobab-scene-2",
      sceneNumber: 2,
      title: "The Complaints",
      narration:
        "It was not enough to be magnificent. The baobab felt the need to say so. Constantly.",
      text: `The baobab began to complain.

*Why am I planted here?* it said. *This ground is too dry. I should be by the river, where my roots can drink properly.*

The Creator said nothing.

*Why do the other trees grow so tall when I am so much more beautiful?* the baobab continued. *The palm is ugly. The acacia is barely worth looking at. I should be at the centre of everything — where everyone can see me properly.*

The Creator remained patient.

*And these fruits,* the baobab went on. *I produce such extraordinary fruit and the animals just eat it and go away without so much as appreciating it. They eat the mango as if it is equal to mine. It is not equal. Nothing is equal to mine.*

The Creator, who had made everything from the silence of the world and knew the particular vanity of beautiful things, listened to this for a long time.

And then decided the baobab had been beautiful for long enough in its current configuration.`,
      backgroundGradient: "linear-gradient(135deg, #2d1500 0%, #6b3000 50%, #9b4500 100%)",
      characters: ["The Baobab Tree"],
      charactersData: [
        {
          id: "baobab",
          name: "The Baobab",
          position: "left",
          expression: "haughty",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "earth" },
      cameraMotion: { preset: "pan-right", intensity: "subtle", durationSeconds: 9 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      ambience: { type: "gentle-wind", label: "Afternoon wind" },
      durationSeconds: 90,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "baobab-scene-3",
      sceneNumber: 3,
      title: "The Correction",
      narration:
        "The Creator reached down. The baobab felt the earth shift beneath it. Then — nothing was where it had been.",
      text: `One morning — and the baobab would remember this morning for the rest of its very long life — the Creator reached down from the sky and pulled the baobab out of the ground.

The baobab was surprised. No tree had ever been pulled out of the ground before.

*What—* it began.

The Creator turned it upside down.

And planted it again.

Roots in the air. Branches in the earth.

*There,* said the Creator. *Let us see how you feel about your appearance now.*

The baobab stood — if standing is the right word for what it was now doing — in stunned silence.

Its roots, which had previously done the useful work of drinking water and holding the earth, now stretched up into the sky like the frantic arms of someone who has just remembered something urgent. Its branches, which had previously held leaves and flowers and fruit for all to admire, were buried underground, pressing into the dark.

It was, without any question at all, the strangest-looking thing in the world.

And the baobab had no one to blame but itself.`,
      backgroundGradient: "linear-gradient(135deg, #0d1a0d 0%, #1a3d1a 50%, #2d6b2d 100%)",
      characters: ["The Baobab Tree"],
      charactersData: [
        {
          id: "baobab",
          name: "The Baobab",
          position: "center",
          expression: "stunned",
          motion: "still",
          scale: 1.1,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "forest" },
      cameraMotion: { preset: "zoom-out", intensity: "medium", durationSeconds: 10 },
      environmentMotion: { type: "wind", intensity: "gentle" },
      ambience: { type: "gentle-wind", label: "Sudden quiet" },
      durationSeconds: 100,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "baobab-scene-4",
      sceneNumber: 4,
      title: "What the Baobab Learned",
      narration:
        "In time, a strange thing happened. The baobab, transformed and humbled, became more useful than it had ever been before.",
      text: `The baobab stood upside down, and sulked.

For a season — perhaps more — it refused to do anything. What was the point of producing fruit if no one could see how beautiful you were? What was the point of flowering if your flowers bloomed underground?

But time is a patient teacher.

Slowly, the baobab began to understand something it had never noticed before: it was not alone.

Birds came to nest in its strange upside-down branches — the roots now held above the earth like a palace of tangled wood. Animals sheltered in the deep crevices of its enormous trunk, out of the rain and the heat. People came to collect its fruit (which still tasted excellent, even upside down). Healers found medicine in its bark.

The baobab, in its absurd new form, had become a gathering place.

Children climbed it. Elders held meetings beneath it. Travellers rested in its shade. The village of animals and people reorganised itself around the strange, proud, humbled tree.

And the baobab, for the first time, felt something it had never felt when it was merely beautiful.

It felt necessary.`,
      backgroundGradient: "linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #6b4800 100%)",
      characters: ["The Baobab Tree", "The Other Trees"],
      charactersData: [
        {
          id: "baobab",
          name: "The Baobab",
          position: "center",
          expression: "thoughtful",
          motion: "subtle-float",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "earth" },
      cameraMotion: { preset: "pan-left", intensity: "subtle", durationSeconds: 11 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      ambience: { type: "gentle-wind", label: "Village sounds" },
      durationSeconds: 100,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "baobab-scene-5",
      sceneNumber: 5,
      title: "The Tree That Remembers",
      narration:
        "Some baobabs are two thousand years old. They were old before written history in this part of the world. They remember everything.",
      text: `The baobab lives for a very long time.

Some baobabs alive in The Gambia today were already ancient when the Mali Empire rose and fell. They stood, roots in the air, when Kelefa Saane crossed the river. They stood when the first griots began to sing. They will stand — rooted upside down, strange and magnificent and quietly knowing — long after everyone alive today has become an ancestor.

The other trees do not complain in the baobab's presence.

They have noticed that the Creator's sense of humour, while not cruel, is very, very thorough.

And the baobab?

The baobab stands in its strange posture — roots reaching up like arms, branches buried in the earth — and it does not say a word about the palm tree, or the acacia, or any tree's relative position or attractiveness. It simply grows. It houses birds and bats. It feeds children with its fruit. It shelters elders who hold their meetings in its shade.

It is no longer the most beautiful tree.

But it is, without question, the most interesting one.

And some say — though this is not official doctrine — that on very still nights, you can hear the baobab doing something it almost certainly never did in its days of perfect beauty.

Laughing, softly, at itself.`,
      backgroundGradient: "linear-gradient(135deg, #0a0500 0%, #1a1000 50%, #3d2200 100%)",
      characters: ["The Baobab Tree"],
      charactersData: [
        {
          id: "baobab",
          name: "The Baobab",
          position: "center",
          expression: "content",
          motion: "breathing",
          scale: 1.05,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "gold" },
      cameraMotion: { preset: "zoom-out", intensity: "subtle", durationSeconds: 14 },
      environmentMotion: { type: "night-stars", intensity: "subtle" },
      ambience: { type: "night-insects", label: "Night" },
      durationSeconds: 110,
      transition: { type: "fade", durationSeconds: 3 },
    },
  ],
};
