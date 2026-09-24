import { Story, NarrationCue } from "@/types/story";
import sundiataScene01 from "@/data/audio/cues/sundiata/scene-01.json";
import sundiataScene02 from "@/data/audio/cues/sundiata/scene-02.json";
import sundiataScene03 from "@/data/audio/cues/sundiata/scene-03.json";
import sundiataScene04 from "@/data/audio/cues/sundiata/scene-04.json";
import sundiataScene05 from "@/data/audio/cues/sundiata/scene-05.json";
import sundiataScene06 from "@/data/audio/cues/sundiata/scene-06.json";




/**
 * Sundiata — The Lion Child of Niani
 *
 * Category: historical
 * ContentType: historical
 *
 * Editorial note:
 * The Sunjata (Sundiata) epic is one of the most extensively documented oral
 * epics in the world. Sundiata Keita (~1217–1255 CE) was the historical founder
 * of the Mali Empire. His story is preserved by Mande griots (jelilu) and has
 * been performed continuously for approximately 800 years.
 *
 * Primary scholarly sources:
 * - D.T. Niane, "Sundiata: An Epic of Old Mali" (Longmans, 1965) — transcribed
 *   from the performance of Djeli Mamoudou Kouyaté, Guinea
 * - Gordon Innes, "Sunjata: Three Mandinka Versions" (SOAS, 1974) — three
 *   full Gambian Mandinka performances transcribed and translated
 * - Nehemia Levtzion, "Ancient Ghana and Mali" (1973) — historical context
 *
 * Relevance to The Gambia: The Mandinka people — the largest ethnic group in
 * The Gambia (~34% of population) — are direct cultural descendants of the Mali
 * Empire. The Sunjata epic is the foundational narrative of Mandinka identity
 * and is performed by Gambian griots to this day.
 *
 * Narrative reconstruction: The historical core — Sundiata's childhood
 * disability, his mother Sogolon Condé, his exile, the Battle of Kirina (c.1235)
 * against Soumaoro Kanté — is documented. Interior scenes, dialogue, and
 * emotional detail are editorial reconstruction explicitly disclosed in
 * narrativeReconstructionNotes.
 */

export const sundiataStory: Story = {
  id: "sundiata-lion-of-old-mali",
  slug: "sundiata-lion-of-old-mali",
  title: "Sundiata",
  subtitle: "The Lion Child of Niani",
  description:
    "Before the age of seven, Sundiata Keita could not walk. The court laughed at the crippled son of the king. But his mother, Sogolon, never stopped believing — and neither did the griots. Eight hundred years later, they are still singing his name.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "all-ages",

  origin: {
    region: "Mali Empire (West Africa); Gambian Mandinka tradition",
    culturalContext:
      "Mande / Mandinka oral epic tradition; the Sunjata epic (*Sunjata Fasa*), foundational narrative of the Mali Empire",
    isDemoPlaceholder: false,
    community: "Mandinka (Mandingo); Mande peoples broadly",
    ethnicGroup: "Mandinka",
  },

  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "research-based",
    collectedFrom: "Mande / Mandinka oral tradition; documented in Guinea and The Gambia",
    sourceRef: {
      title: "Sundiata: An Epic of Old Mali",
      author: "D.T. Niane (from the performance of Djeli Mamoudou Kouyaté)",
      institution: "Longmans",
      year: 1965,
      notes:
        "Also: Gordon Innes, 'Sunjata: Three Mandinka Versions' (SOAS, 1974) — three full Gambian Mandinka griot performances; Nehemia Levtzion, 'Ancient Ghana and Mali' (1973) for historical context.",
    },
    collectorOrAuthor:
      "D.T. Niane (primary documentation); Gordon Innes (Gambian versions); Tales of The Gambia editorial team (reconstruction)",
    originalLanguage: "Mandinka / Mande",
    historicalPeriod: "13th century CE; Mali Empire (~1235 CE)",
    adaptationNotes:
      "The historical core — Sundiata's childhood, his disability, his exile with his mother Sogolon, the defeat of Soumaoro Kanté at the Battle of Kirina (c. 1235 CE), and the founding of the Mali Empire — is documented in multiple scholarly sources and hundreds of recorded griot performances. Interior scenes and dialogue in this retelling are editorial reconstruction consistent with the epic tradition but not a verbatim translation of any single performance.",
    authenticityStatement:
      "Sundiata Keita is a documented historical figure. His epic is one of the most extensively studied oral narratives in the world, with scholarly documentation from D.T. Niane (1965), Gordon Innes (1974), and many others. The core narrative events are historically attested. This retelling is an editorial reconstruction — interior scenes and dialogue are clearly disclosed as such and are not presented as literal historical record.",
  },

  narrative: {
    openingFormula:
      "Nare Maghan Sundiata! The griots say: listen, for what is past is not dead — it is merely waiting to be heard.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "So the lion rose. And the world was never the same.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Destiny does not announce itself with ease — it arrives through difficulty, patience, and the love of someone who never stops believing in you.",
    communalMoral:
      "A child who cannot walk may yet found an empire. Do not judge the seed by how long it takes to break through the earth.",
    contextualNotes: [
      "The Mandinka people — the largest ethnic group in The Gambia (~34% of population) — are cultural descendants of the Mali Empire and consider the Sunjata epic foundational to their identity.",
      "Griots (jalolu/jelilu) have maintained the Sunjata epic through unbroken oral performance for approximately 800 years. It is performed at naming ceremonies, weddings, state events, and cultural festivals across West Africa.",
      "The Battle of Kirina (c. 1235 CE) marks the defeat of the Sosso king Soumaoro Kanté and the founding of the Mali Empire — one of the wealthiest empires in history.",
      "Sogolon Condé, Sundiata's mother, is as central to the epic as Sundiata himself. Her name is carried in his honorific: 'Sogolon's child' — *Sogolon Jata* → *Sunjata*.",
      "The Mali Empire at its peak encompassed modern-day Gambia, Senegal, Guinea, Mali, Mauritania, and Burkina Faso.",
    ],
  },

  historicalContext: {
    era: "13th century CE",
    approximateDate: "c. 1217–1255 CE",
    location:
      "Niani (modern Guinea/Mali border); Mali Empire (encompassing modern West Africa including The Gambia)",
    documentedFigures: ["Sundiata Keita", "Sogolon Condé", "Soumaoro Kanté", "Djeli Mamoudou Kouyaté"],
    documentedEvents: [
      "The founding of the Mali Empire (c. 1235 CE)",
      "The Battle of Kirina — defeat of the Sosso king Soumaoro Kanté",
      "Sundiata's period of exile",
    ],
    narrativeReconstructionNotes:
      "The historical core — Sundiata's childhood disability, his mother Sogolon, his exile, and his eventual triumph at the Battle of Kirina (~1235 CE) — is documented in D.T. Niane's 1965 transcription and Gordon Innes' 1974 Gambian Mandinka versions, as well as historical scholarship (Levtzion, 1973). The specific scenes in this retelling — the humiliation in the court, Sogolon's private words to her son, the moment Sundiata stood — are editorial reconstructions drawn from the spirit of the documented epic. They are not verbatim translations of any single griot performance and should not be treated as literal historical record.",
    sources: [
      {
        title: "Sundiata: An Epic of Old Mali",
        author: "D.T. Niane",
        institution: "Longmans",
        year: 1965,
      },
      {
        title: "Sunjata: Three Mandinka Versions",
        author: "Gordon Innes",
        institution: "SOAS, University of London",
        year: 1974,
      },
      {
        title: "Ancient Ghana and Mali",
        author: "Nehemia Levtzion",
        year: 1973,
      },
    ],
  },

  language: "English",
  availableLanguages: ["English"],
  readingTimeMinutes: 10,
  listeningDurationSeconds: 660,

  themes: [
    "overcoming adversity",
    "destiny",
    "motherhood",
    "empire",
    "oral tradition",
    "Mali Empire",
    "Mandinka culture",
    "griots",
    "resilience",
    "childhood",
  ],

  characters: ["Sundiata Keita", "Sogolon Condé", "The Griot", "Soumaoro Kanté"],

  characterProfiles: [
    {
      id: "sundiata",
      name: "Sundiata Keita",
      role: "protagonist",
      culturalSignificance:
        "Historical founder of the Mali Empire; central figure in the most widely performed oral epic in West Africa.",
      traits: ["destined", "patient", "powerful", "humble-origins"],
      avatarTheme: "shadow",
    },
    {
      id: "sogolon",
      name: "Sogolon Condé",
      role: "elder",
      culturalSignificance:
        "Sundiata's mother; equal protagonist of the epic; her belief in her son is what enables his destiny.",
      traits: ["steadfast", "devoted", "dignified", "visionary"],
      avatarTheme: "griot",
    },
  ],

  coverImage: {
    src: "/images/stories/sundiata-cover.jpg",
    alt: "A young boy rises to his feet beneath the vast sky of the Mali savanna, a kora playing in the distance",
    paletteTheme: "gold",
  },

  scenes: [
    {
      id: "sundiata-scene-1",
      sceneNumber: 1,
      title: "A Name Written Before He Was Born",
      narration:
        "The griot says: I am the memory of humanity. What I do not speak, the world forgets. So listen.",
      text: `My name is Djeli.

I am a griot. My father was a griot before me, and his father before him, and before him, and before him — all the way back to the time when the first words were spoken over the first fire, and someone had to remember them.

I am here to tell you about Sundiata Keita.

You may have heard his name. Sogolon's child. The Lion of Mali. The king who could not walk until the day he decided to stand up — and when he stood, the world shook.

This story is 800 years old.

But I tell it as if it happened this morning, because that is what griots do. Time is not a line for us. It is a circle. And every time the Sunjata epic is sung, Sundiata lives again — walks again — wins again.

So.

Let us begin at the beginning.

At the royal court of Niani, in the kingdom of the Mandinka, a king received a prophecy.`,
      backgroundGradient: "linear-gradient(135deg, #1a0f00 0%, #3d2500 50%, #6b4200 100%)",
      characters: ["The Griot"],
      charactersData: [
        {
          id: "griot",
          name: "The Griot",
          position: "center",
          expression: "composed",
          motion: "subtle-float",
          scale: 1.0,
          avatarTheme: "griot",
        },
      ],
      visual: { type: "gradient", paletteTheme: "gold" },
      cameraMotion: { preset: "zoom-in", intensity: "subtle", durationSeconds: 8 },
      environmentMotion: { type: "dust-particles", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/sundiata-lion-of-old-mali/scene-01-narration.mp3",
        narrationDurationSeconds: 65.42,
        cues: sundiataScene01 as NarrationCue[],
      },
      durationSeconds: 90,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "sundiata-scene-2",
      sceneNumber: 2,
      title: "The Child Who Could Not Walk",
      narration:
        "He was seven years old and had never stood on his own feet. The court had given up on him long ago.",
      text: `The king of Niani had many sons. But one, born of a woman named Sogolon Condé, could not walk.

His name was Sundiata.

He crawled. He dragged himself across the palace floors. The other princes walked past him without looking down. The court women covered their mouths when they saw him. The king's other wives found reasons to mention it — always gently, always cruelly — whenever Sogolon was nearby.

*Your son,* they would say. *How is your son today?*

Sogolon bore this. She was not a woman who bent easily. But even she, on certain nights, when the palace was quiet and her boy slept and she sat alone, would feel the weight of it.

She had been promised, by a hunter's prophecy, that her son would be great. That he would rule an empire the size of the sky.

Looking at him in the dust of the courtyard floor, it was very hard to believe.

But she believed it.

She always believed it.`,
      backgroundGradient: "linear-gradient(135deg, #2d1500 0%, #5a2d00 50%, #8b4500 100%)",
      characters: ["Sundiata Keita", "Sogolon Condé"],
      charactersData: [
        {
          id: "sogolon",
          name: "Sogolon Condé",
          position: "center",
          expression: "resolute",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "griot",
        },
      ],
      visual: { type: "gradient", paletteTheme: "earth" },
      cameraMotion: { preset: "pan-right", intensity: "subtle", durationSeconds: 10 },
      environmentMotion: { type: "dust-particles", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/sundiata-lion-of-old-mali/scene-02-narration.mp3",
        narrationDurationSeconds: 68.7,
        cues: sundiataScene02 as NarrationCue[],
      },
      durationSeconds: 100,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "sundiata-scene-3",
      sceneNumber: 3,
      title: "The Day He Stood",
      narration:
        "He asked for an iron rod. No one understood why. Then he placed it against the earth and pushed.",
      text: `The story of how Sundiata rose to his feet has been told a thousand different ways.

In some versions, his mother is humiliated in the market over baobab leaves — leaves she needed for cooking, leaves the other queen had taken just to spite her. In others, he overhears someone mocking him. In the versions told by Gambian griots, what matters is not the precise trigger, but the decision.

Something broke open inside Sundiata.

He asked for an iron rod — the kind used for heavy work, the kind a blacksmith might use. The griot says that when Sundiata grasped it and placed it against the ground, the earth seemed to hold its breath.

He pushed.

His arms shook. His legs — the legs that had never borne his weight — trembled with an effort no one in that court had ever witnessed. And then, slowly, grinding like a baobab tree pushing up from the ground, he rose.

He stood.

The rod bent from the force of him.

The griot says: *The whole of Mali stood with him.*`,
      backgroundGradient: "linear-gradient(135deg, #1a0a00 0%, #4d2000 50%, #8b4000 100%)",
      characters: ["Sundiata Keita", "Sogolon Condé"],
      charactersData: [
        {
          id: "sundiata",
          name: "Sundiata",
          position: "center",
          expression: "straining",
          motion: "still",
          scale: 1.2,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "ochre" },
      cameraMotion: { preset: "zoom-in", intensity: "medium", durationSeconds: 10 },
      environmentMotion: { type: "dust-particles", intensity: "gentle" },
      audio: {
        narrationUrl: "/audio/stories/sundiata-lion-of-old-mali/scene-03-narration.mp3",
        narrationDurationSeconds: 74.85,
        cues: sundiataScene03 as NarrationCue[],
      },
      durationSeconds: 100,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "sundiata-scene-4",
      sceneNumber: 4,
      title: "Exile",
      narration:
        "Rising was not enough. There were those in the court who feared what he had become. His family had to leave.",
      text: `Standing was not the end of Sundiata's struggle. It was the beginning.

The queen mother of Niani — the mother of the king's other sons — understood what Sundiata's rise meant. If this boy who had once crawled in the dust could stand, what else might he do? What throne might he reach? Her own sons' futures depended on Sundiata's disappearance.

And so the pressure built. The whispers grew. The threats came — quietly, in the language that courts use when they want to be rid of someone without the messiness of an open confrontation.

Sogolon read the signs. She had not survived this long by being slow to understand danger.

She took her children — Sundiata and his siblings — and she left.

They wandered from kingdom to kingdom across the Mande world: Djedeba, Tabon, Mema. Everywhere they went, Sogolon held her family together. Everywhere they went, Sundiata grew — in height, in strength, in the particular quality that would one day make kings kneel before him.

He was learning the world from the outside. And that, the griots say, was part of the plan.`,
      backgroundGradient: "linear-gradient(135deg, #0d1a2d 0%, #1a3352 50%, #2d5280 100%)",
      characters: ["Sundiata Keita", "Sogolon Condé"],
      charactersData: [
        {
          id: "sundiata",
          name: "Sundiata",
          position: "right",
          expression: "watchful",
          motion: "breathing",
          scale: 1.1,
          avatarTheme: "shadow",
        },
        {
          id: "sogolon",
          name: "Sogolon",
          position: "left",
          expression: "determined",
          motion: "still",
          scale: 0.95,
          avatarTheme: "griot",
        },
      ],
      visual: { type: "gradient", paletteTheme: "river" },
      cameraMotion: { preset: "pan-left", intensity: "subtle", durationSeconds: 12 },
      environmentMotion: { type: "wind", intensity: "gentle" },
      audio: {
        narrationUrl: "/audio/stories/sundiata-lion-of-old-mali/scene-04-narration.mp3",
        narrationDurationSeconds: 78.7,
        cues: sundiataScene04 as NarrationCue[],
      },
      durationSeconds: 110,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "sundiata-scene-5",
      sceneNumber: 5,
      title: "The Battle of Kirina",
      narration:
        "Soumaoro Kanté had conquered everything. He was a sorcerer-king who seemed impossible to defeat. But there is always something a tyrant cannot see coming.",
      text: `The man who had destroyed Niani and subjugated the Mandinka was named Soumaoro Kanté.

He was the king of the Sosso. His power was said to be supernatural — that he could transform himself, that iron weapons could not harm him, that he had made himself invincible through knowledge of the darkest forms of the old science.

He had ruled through terror for so long that many people had forgotten what it felt like not to be afraid.

Sundiata came home.

He had not been idle in exile. He had built alliances. He had found warriors. He had learned — from his mother, from the griots who travelled with them, from the kings who sheltered them — what it meant to lead people who had no reason left to believe.

At the Battle of Kirina, approximately 1235 CE, the armies met.

The details of how Soumaoro's power was finally broken are told differently in different performances of the epic — but the outcome is consistent across all of them: Soumaoro fell. The Sosso were broken. And from the rubble of everything that had been lost, Sundiata Keita began to build the Mali Empire.`,
      backgroundGradient: "linear-gradient(135deg, #1a0a00 0%, #4d1500 50%, #8b2800 100%)",
      characters: ["Sundiata Keita"],
      charactersData: [
        {
          id: "sundiata",
          name: "Sundiata",
          position: "center",
          expression: "commanding",
          motion: "still",
          scale: 1.2,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "ochre" },
      cameraMotion: { preset: "zoom-out", intensity: "medium", durationSeconds: 14 },
      environmentMotion: { type: "dust-particles", intensity: "gentle" },
      audio: {
        narrationUrl: "/audio/stories/sundiata-lion-of-old-mali/scene-05-narration.mp3",
        narrationDurationSeconds: 81.17,
        cues: sundiataScene05 as NarrationCue[],
      },
      durationSeconds: 120,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "sundiata-scene-6",
      sceneNumber: 6,
      title: "Eight Hundred Years",
      narration:
        "The Mali Empire is gone. But the name of the boy who could not walk is still being sung — by Gambian griots, this very day.",
      text: `The Mali Empire at its height was one of the largest and wealthiest states in the world.

It encompassed what is now The Gambia, Senegal, Guinea, Mali, Mauritania, and Burkina Faso. Its cities — Niani, Timbuktu, Djenné — were centres of learning, trade, and culture. It endured for more than two centuries after Sundiata's death.

And then, as all empires do, it changed. It shrank. Other powers rose. The Songhai Empire, the Kaabu Empire, the Wolof kingdoms — all drew from what the Mali Empire had built, and built again on its foundations.

But Sundiata Keita was not forgotten.

He was remembered by the griots — the professional rememberers, the jalolu — whose duty it was to hold every name, every act, every failure and triumph in the chain of their memory and pass it down, generation to generation, without interruption.

Today, in The Gambia, Mandinka griots perform the Sunjata epic. Not as museum piece. As living tradition. The same story, reborn in each performance, as immediate and present as the day it happened.

The boy who could not walk.

The woman who never stopped believing.

The empire that began with a single iron rod driven into the earth.

*Sogolon Jata. Sundiata. The lion of Old Mali.*`,
      backgroundGradient: "linear-gradient(135deg, #0a0800 0%, #1a1400 50%, #2d2200 100%)",
      characters: ["The Griot"],
      charactersData: [
        {
          id: "griot",
          name: "The Griot",
          position: "center",
          expression: "reverent",
          motion: "subtle-float",
          scale: 1.0,
          avatarTheme: "griot",
        },
      ],
      visual: { type: "gradient", paletteTheme: "gold" },
      cameraMotion: { preset: "drift", intensity: "subtle", durationSeconds: 14 },
      environmentMotion: { type: "night-stars", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/sundiata-lion-of-old-mali/scene-06-narration.mp3",
        narrationDurationSeconds: 97.7,
        cues: sundiataScene06 as NarrationCue[],
      },
      durationSeconds: 140,
      transition: { type: "fade", durationSeconds: 3 },
    },
  ],
};
