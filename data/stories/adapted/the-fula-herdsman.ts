import { Story } from "@/types/story";

/**
 * The Fula Herdsman and the Stolen Cattle
 *
 * Category: folktale
 * ContentType: adapted
 *
 * Editorial note:
 * The Fula (Fulani, Peul) people constitute approximately 24% of The Gambia's
 * population and are among the largest ethnic groups in West Africa. Their
 * pastoral oral tradition is rich with stories about cattle, wisdom,
 * patience, and the ethical code known as *Pulaaku* — broadly meaning
 * "Fulaness": the practice of patience (munyal), self-control (semteende),
 * and dignity (neddaaku).
 *
 * This story is an editorial adaptation constructed around the documented
 * Pulaaku value system and the pastoral worldview of the Gambian Fula
 * community. It is NOT presented as a specific documented tale from a named
 * source; it is an original composition grounded in documented cultural values.
 *
 * Primary cultural references:
 * - Christiane Seydou: scholarship on Fula epic and oral poetry
 * - Paul Riesman: "Freedom in Fulani Social Life" (1977), University of
 *   Chicago Press — ethnographic documentation of Pulaaku
 * - Amadou Hampâté Bâ: Fula oral tradition (general corpus)
 */

export const theFullaHerdsmanStory: Story = {
  id: "the-fula-herdsman",
  slug: "the-fula-herdsman",
  title: "The Herdsman and the Stolen Cattle",
  subtitle: "A Tale of Pulaaku",
  description:
    "Demba has tended his cattle all his life. When a neighbouring man steals three of his finest animals, everyone expects him to act with fury. But Pulaaku — the ancient Fula code — teaches something harder than anger. This is a story about the most difficult thing a person can do: wait, with dignity.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",

  origin: {
    region: "The Gambia",
    culturalContext:
      "Fula (Fulani/Peul) pastoral oral tradition; Pulaaku ethical code",
    isDemoPlaceholder: false,
    community: "Fula (Fulani/Peul)",
    ethnicGroup: "Fula",
  },

  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectedFrom: "Fula oral tradition, Senegambia / West Africa",
    sourceRef: {
      title: "Freedom in Fulani Social Life",
      author: "Paul Riesman",
      institution: "University of Chicago Press",
      year: 1977,
      notes:
        "Foundational ethnographic documentation of Pulaaku — the Fula code of patience, self-control, and dignity. Also informed by: Christiane Seydou's scholarship on Fula epic oral poetry; and the broader corpus of Amadou Hampâté Bâ on West African Fula oral tradition.",
    },
    collectorOrAuthor:
      "Tales of The Gambia editorial team (original composition grounded in documented cultural values)",
    originalLanguage: "Fula (Pulaar)",
    historicalPeriod: "Pre-colonial and early colonial Senegambia",
    adaptationNotes:
      "This story is not a transcription of any single documented Fula tale. It is an original composition built around the well-documented Pulaaku ethical code and the pastoral worldview of the Gambian Fula community. The characters, plot, and specific dialogue are editorial creations. The cultural values — patience, dignity, and the long view — are documented features of Fula oral and ethical tradition.",
    authenticityStatement:
      "This is an original editorial composition grounded in the documented Fula (Fulani/Peul) value system of Pulaaku and the pastoral culture of the Gambian Fula community. The cultural values depicted are drawn from ethnographic scholarship (Riesman, 1977; Seydou; Hampâté Bâ). The specific story, characters, and plot are original creations and are not presented as a documented oral tale.",
  },

  narrative: {
    openingFormula:
      "Ko haala gonɗum — this is a story that is true, and a story that is told.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "Munyal ko dow fuu — patience is above everything. The cattle know this. Now, perhaps, you do too.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "True strength is not in striking back quickly — it is in knowing when not to strike, and waiting for the right moment with your dignity intact.",
    communalMoral:
      "Pulaaku teaches us that patience is not weakness. It is the hardest and most honourable form of courage.",
    contextualNotes: [
      "Pulaaku is the ethical code of the Fula people — a set of values including munyal (patience), semteende (self-control and modesty), and neddaaku (dignity or personhood). It shapes how a Fula person is expected to behave in all situations.",
      "Cattle are not merely livestock in Fula culture — they are a form of identity, spiritual connection, and wealth. To lose cattle is a serious matter.",
      "The Fula are one of the largest ethnic groups in West Africa, with a population of 35–40 million across the region. In The Gambia, they make up approximately 24% of the population.",
      "The Fula language is called Pulaar (in Gambia and Senegal) or Fulfulde (in other regions).",
    ],
  },

  language: "English",
  availableLanguages: ["English"],
  readingTimeMinutes: 8,
  listeningDurationSeconds: 540,

  themes: [
    "patience",
    "dignity",
    "justice",
    "cattle",
    "pastoral life",
    "Pulaaku",
    "Fula culture",
    "wisdom",
    "restraint",
    "community",
  ],

  characters: ["Demba", "The Elder", "The Thief", "The Village"],

  characterProfiles: [
    {
      id: "demba",
      name: "Demba",
      role: "protagonist",
      culturalSignificance:
        "A Fula herdsman embodying the tension between natural anger and the demands of Pulaaku.",
      traits: ["patient", "dignified", "proud", "honourable"],
      avatarTheme: "elephant",
    },
    {
      id: "elder",
      name: "The Elder",
      role: "elder",
      culturalSignificance:
        "The keeper of Pulaaku knowledge; the voice of the community's deepest values.",
      traits: ["wise", "calm", "long-sighted"],
      avatarTheme: "griot",
    },
  ],

  coverImage: {
    src: "/images/stories/fula-herdsman-cover.jpg",
    alt: "A Fula herdsman stands among his cattle at dusk, the Gambia River shimmering in the distance",
    paletteTheme: "earth",
  },

  scenes: [
    {
      id: "fula-scene-1",
      sceneNumber: 1,
      title: "A Man and His Cattle",
      narration:
        "There are men who own things. And then there are men whose things are part of them. Demba was the second kind.",
      text: `In the village of Keba Kunda, on the south bank of the Gambia River, there lived a Fula herdsman named Demba.

Demba had tended cattle since he was old enough to walk behind them. He knew each animal by name — not the short names that strangers give to livestock, but the long names, the names that describe a particular way of holding the head, or a preferred patch of grazing ground, or the memory of a calf born in the rain.

He had forty-three cattle.

To a stranger, this might sound like property. But to a Fula herdsman, cattle are something closer to family. They carry your dignity. They carry your history. When a man's herd is large and well-kept, people look at him and see a man who knows how to be patient — who rises before dawn and does not complain and provides for what depends on him.

Cattle, in the Fula world, are the physical form of Pulaaku.

And Demba's cattle were the finest in three villages.`,
      backgroundGradient:
        "linear-gradient(135deg, #1a0f00 0%, #3d2000 50%, #6b3d00 100%)",
      characters: ["Demba"],
      charactersData: [
        {
          id: "demba",
          name: "Demba",
          position: "center",
          expression: "proud",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "earth",
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 8,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      ambience: {
        type: "gentle-wind",
        label: "Harmattan wind",
      },
      durationSeconds: 90,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "fula-scene-2",
      sceneNumber: 2,
      title: "Three Animals Gone",
      narration:
        "He counted them at dawn. He counted them again. The number did not change.",
      text: `One morning, Demba rose before the sun and went to count his herd.

Forty cattle. Not forty-three.

He counted again. Still forty.

His three finest animals — a large bull and two young cows — were gone.

Demba stood in the field for a long moment. The sky was the colour of old iron. The remaining cattle stood quietly, breathing in the cold morning air. Around him, the village was still sleeping.

He asked questions. He tracked footprints. By midday, he knew: the animals had been taken by Musa, a man from the neighbouring village, who had long coveted Demba's bull.

Everyone in the village knew it. The footprints led to Musa's compound. Musa's compound had three new animals. The math, as they say, was not difficult.

Now every eye in the village turned to Demba.

What would he do?`,
      backgroundGradient:
        "linear-gradient(135deg, #0d0a00 0%, #2d2000 50%, #4d3800 100%)",
      characters: ["Demba"],
      charactersData: [
        {
          id: "demba",
          name: "Demba",
          position: "left",
          expression: "still",
          motion: "still",
          scale: 1.05,
          avatarTheme: "elephant",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "earth",
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 9,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      ambience: {
        type: "gentle-wind",
        label: "Morning wind",
      },
      durationSeconds: 90,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "fula-scene-3",
      sceneNumber: 3,
      title: "What Pulaaku Requires",
      narration:
        "His blood said: go. Every young man in the village expected him to go. But Demba sat down.",
      text: `His neighbours were angry on his behalf.

Young men volunteered to accompany him to Musa's compound. They spoke the language of justice, but their eyes held the heat of excitement — the particular brightness of men who want to see a confrontation.

Demba listened to all of them.

Then he went to find the eldest man in the village.

The old man was sitting under a tamarind tree, shelling groundnuts with slow, methodical hands. He did not look up when Demba sat beside him.

"You already know," Demba said.

"The whole village knows," the old man said. "I am waiting to see what kind of man you are."

"My cattle are in Musa's compound."

"Yes."

"My blood says to go and take them back."

The old man looked up then. His eyes were the colour of dry ground in the harmattan season — pale and deep at the same time. "And what does Pulaaku say?"

Demba was quiet for a long time.

"Pulaaku says wait."

The old man nodded slowly. "Then you already know what to do."`,
      backgroundGradient:
        "linear-gradient(135deg, #0a1500 0%, #1a3000 50%, #2d5200 100%)",
      characters: ["Demba", "The Elder"],
      charactersData: [
        {
          id: "demba",
          name: "Demba",
          position: "right",
          expression: "conflicted",
          motion: "still",
          scale: 1.0,
          avatarTheme: "elephant",
        },
        {
          id: "elder",
          name: "The Elder",
          position: "left",
          expression: "patient",
          motion: "breathing",
          scale: 0.95,
          avatarTheme: "griot",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "forest",
      },
      cameraMotion: {
        preset: "still",
        intensity: "subtle",
        durationSeconds: 10,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      ambience: {
        type: "village-fire",
        label: "Village sounds",
      },
      durationSeconds: 120,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "fula-scene-4",
      sceneNumber: 4,
      title: "The Waiting",
      narration:
        "He waited. Everyone thought he was afraid. He was doing something far harder than fighting.",
      text: `Demba waited.

He tended his remaining forty cattle with the same care as before — rising before dawn, walking them to the best grazing land, counting them at dusk. He said nothing about Musa. He did not appear angry. He did not avoid Musa in the market.

The village watched and could not understand.

"Demba has lost his spine," some said.

"Demba is waiting for something," others said.

The old man under the tamarind tree said nothing at all.

And Musa — in the neighbouring village — grew more and more uncomfortable. He had expected a confrontation. He had expected rage. He had expected Demba to arrive at his compound with hard words and a crowd, so that Musa could stand his ground in front of witnesses and make the whole thing messy.

But there was no confrontation. No rage. No crowd.

Just Demba, calmly tending his forty cattle.

And that — that stillness, that patience, that refusal to be provoked — was more frightening than any anger could have been.`,
      backgroundGradient:
        "linear-gradient(135deg, #0a1a0d 0%, #1a3d20 50%, #2d6635 100%)",
      characters: ["Demba"],
      charactersData: [
        {
          id: "demba",
          name: "Demba",
          position: "center",
          expression: "composed",
          motion: "subtle-float",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "forest",
      },
      cameraMotion: {
        preset: "pan-left",
        intensity: "subtle",
        durationSeconds: 11,
      },
      environmentMotion: {
        type: "wind",
        intensity: "gentle",
      },
      ambience: {
        type: "gentle-wind",
        label: "Open grassland",
      },
      durationSeconds: 100,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "fula-scene-5",
      sceneNumber: 5,
      title: "The Return",
      narration:
        "Musa's nerve broke before Demba's patience did. That was the whole of the lesson.",
      text: `Three weeks after the theft, Musa sent a young man to Demba's compound.

The young man carried an apology. He carried a promise to return the three animals. He also carried two additional goats, offered as the payment of shame.

Demba received the young man courteously. He offered him water and food, as one does with any guest. He said only this:

"Tell Musa that I hold no anger toward him. Tell him that the cattle may come home whenever he is ready to bring them."

The three cattle were returned the following morning.

When Demba brought the news to the old man under the tamarind tree, the elder smiled for the first time in weeks.

"You see?" the old man said. "Musa expected a battle he could fight. You gave him a silence he could not survive."

Demba sat beside him and watched the village go about its business.

"It was the hardest thing I have ever done," Demba said.

"Yes," the old man agreed. "That is why Pulaaku is worth keeping."`,
      backgroundGradient:
        "linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #6b4800 100%)",
      characters: ["Demba", "The Elder"],
      charactersData: [
        {
          id: "demba",
          name: "Demba",
          position: "right",
          expression: "calm",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "elephant",
        },
        {
          id: "elder",
          name: "The Elder",
          position: "left",
          expression: "content",
          motion: "still",
          scale: 0.95,
          avatarTheme: "griot",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "earth",
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 10,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      ambience: {
        type: "village-fire",
        label: "Evening village",
      },
      durationSeconds: 110,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "fula-scene-6",
      sceneNumber: 6,
      title: "Munyal — Patience",
      narration:
        "The cattle came home. But the real thing that came home that day was something that cannot be stolen.",
      text: `Munyal. Patience.

It is the first and highest value of Pulaaku. Not courage in the sense of rushing forward — but courage in the sense of holding still when everything in you wants to move. Of maintaining your dignity when the world gives you every reason to lose it.

The Fula have a saying: *Munyal ko dow fuu.* Patience is above everything.

This is not a passive idea. A Fula herdsman who rises before dawn every morning for forty years understands that patience is a form of work. The most demanding form. Anyone can shout. Anyone can attack. But to absorb an injury, to endure, to wait — and to do all of this without bitterness, without losing your sense of who you are — this requires something deeper than ordinary courage.

Demba understood this.

He tended his forty-three cattle — back to forty-three now — as the sun went down over the Gambia River. The sky was the colour of mango skin. The animals were calm.

He counted them one by one.

Each one had a name.

He said each name aloud.

And everything was as it should be.`,
      backgroundGradient:
        "linear-gradient(135deg, #1a0d00 0%, #4d2800 60%, #8b5000 100%)",
      characters: ["Demba"],
      charactersData: [
        {
          id: "demba",
          name: "Demba",
          position: "center",
          expression: "peaceful",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "gold",
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      ambience: {
        type: "river-flow",
        label: "River at dusk",
      },
      durationSeconds: 130,
      transition: { type: "fade", durationSeconds: 3 },
    },
  ],
};
