import { Story, NarrationCue } from "@/types/story";
import kelefaScene01 from "@/data/audio/cues/kelefa-saane/scene-01.json";
import kelefaScene02 from "@/data/audio/cues/kelefa-saane/scene-02.json";
import kelefaScene03 from "@/data/audio/cues/kelefa-saane/scene-03.json";
import kelefaScene04 from "@/data/audio/cues/kelefa-saane/scene-04.json";
import kelefaScene05 from "@/data/audio/cues/kelefa-saane/scene-05.json";
import kelefaScene06 from "@/data/audio/cues/kelefa-saane/scene-06.json";


/**
 * Kelefa Saane — The Warrior of Kaabu
 *
 * Category: historical
 * ContentType: historical
 *
 * Editorial note:
 * Kelefa Saane is a documented historical figure of the Kaabu Empire
 * (a Mandinka successor state to the Mali Empire, spanning modern-day
 * Guinea-Bissau and The Gambia). His epic, known as the *Kelefaba* or
 * *Kelefa Saane*, is a living oral tradition performed by Mandinka griots
 * (jalolu) on the kora. The foundational scholarly documentation is
 * Gordon Innes' "Kaabu and Fuladu: Historical Narratives of the Gambian
 * Mandinka" (1976) and "Kelefa Saane: His Career Recounted by Two Mandinka
 * Bards" (1978), SOAS University of London.
 *
 * The battle in which Kelefa died (North Bank of the Gambia River, mid-19th
 * century) is referenced consistently across oral accounts. The interior
 * scenes of this narrative are editorial reconstructions consistent with
 * the documented oral tradition — they are NOT presented as documented fact.
 * The narrativeReconstructionNotes field makes this explicit.
 */

export const kelafeaSaaneStory: Story = {
  id: "kelefa-saane",
  slug: "kelefa-saane",
  title: "Kelefa Saane",
  subtitle: "The Warrior of Kaabu",
  description:
    "The epic of Kelefa Saane — warrior-prince of the Kaabu Empire, whose life and death became one of the great kora songs of the Mandinka people. This is his story as the griots have kept it.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "adult",

  origin: {
    region: "The Gambia / Guinea-Bissau",
    culturalContext:
      "Mandinka oral tradition; Kaabu Empire (13th–19th century CE)",
    isDemoPlaceholder: false,
    community: "Mandinka (Mandingo)",
    ethnicGroup: "Mandinka",
  },

  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "research-based",
    collectedFrom: "Mandinka oral tradition, Senegambia",
    sourceRef: {
      title:
        "Kelefa Saane: His Career Recounted by Two Mandinka Bards",
      author: "Gordon Innes",
      institution: "SOAS, University of London",
      year: 1978,
      notes:
        "Transcription, translation, and analysis of two full kora performances of the Kelefaba epic. Also: 'Kaabu and Fuladu: Historical Narratives of the Gambian Mandinka' (Innes, 1976). These are the primary scholarly anchors for this narrative.",
    },
    collectorOrAuthor: "Gordon Innes (documentation); Tales of The Gambia editorial team (reconstruction)",
    originalLanguage: "Mandinka",
    historicalPeriod: "Mid-19th century; Kaabu Empire (13th–19th century CE)",
    adaptationNotes:
      "The documented facts — Kelefa's identity as a Kaabu warrior-prince, his reputation for fearlessness, and his death in battle on the North Bank of the Gambia River — are drawn from Gordon Innes' scholarship on the Kelefaba. The interior scenes, dialogue, and emotional reconstruction are editorial interpretation consistent with but not identical to any single performance of the epic. This narrative is a companion to, not a replacement for, the oral tradition.",
    authenticityStatement:
      "This narrative is based on the documented Mandinka oral epic of Kelefa Saane as recorded by scholar Gordon Innes (SOAS, 1976/1978). The historical core — the figure of Kelefa, the Kaabu Empire, and the circumstances of his death — is attested in the scholarly record. Interior scenes and emotional detail are editorial reconstructions clearly disclosed as such. No provenance has been invented.",
  },

  narrative: {
    openingFormula: "I ko Kelefa, I ko Kelefa — they say Kelefa, they say Kelefa.",
    openingFormulaSource: "documented-oral",
    closingFormula:
      "The kora remembers what the earth has forgotten. Listen, and Kelefa lives again.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "A warrior's true greatness is measured not in victories, but in how gracefully he accepts his fate.",
    contextualNotes: [
      "The Kaabu Empire was a powerful Mandinka state that dominated the Senegambia region for centuries, a successor to the Mali Empire.",
      "Griots (jalolu) are hereditary oral historians, musicians, and praise-singers. The Kelefaba is one of the most performed pieces in the kora repertoire.",
      "Kelefa Saane is believed to have lived and died in the mid-19th century, during a period of increasing conflict between the Mandinka states and Fula confederacies.",
      "The kora is a 21-string bridge-harp unique to West African griot traditions. It is the instrument through which the Kelefaba is most commonly performed.",
    ],
  },

  historicalContext: {
    era: "Mid-19th century CE",
    approximateDate: "c. 1850–1867",
    location:
      "Kaabu Empire (modern-day Guinea-Bissau and eastern Senegal); North Bank of the Gambia River",
    documentedFigures: ["Kelefa Saane"],
    documentedEvents: [
      "The decline and eventual fall of the Kaabu Empire",
      "Conflict between Mandinka states and Fula confederacies in the Senegambia region",
    ],
    narrativeReconstructionNotes:
      "The historical core of this narrative — Kelefa Saane's existence as a warrior-prince of the Kaabu Empire, his extraordinary reputation in the oral tradition, and his death in battle on the North Bank of the Gambia River — is documented in Gordon Innes' scholarship (1976, 1978). The specific scenes of childhood, his mother's farewell, his approach to the river, and his final words are editorial reconstructions informed by the spirit of the kora epic, not verbatim translations of any single recorded performance. These interior elements are presented as narrative, not as documented historical fact.",
    sources: [
      {
        title: "Kelefa Saane: His Career Recounted by Two Mandinka Bards",
        author: "Gordon Innes",
        institution: "SOAS, University of London",
        year: 1978,
      },
      {
        title: "Kaabu and Fuladu: Historical Narratives of the Gambian Mandinka",
        author: "Gordon Innes",
        institution: "SOAS, University of London",
        year: 1976,
      },
    ],
  },

  language: "English",
  availableLanguages: ["English"],
  readingTimeMinutes: 10,
  listeningDurationSeconds: 660,

  themes: [
    "courage",
    "fate",
    "warrior tradition",
    "epic oral tradition",
    "Kaabu Empire",
    "kora music",
    "Mandinka culture",
    "griots",
    "death and legacy",
    "identity",
  ],

  characters: ["Kelefa Saane", "The Griot", "Kelefa's Mother"],

  characterProfiles: [
    {
      id: "kelefa",
      name: "Kelefa Saane",
      role: "protagonist",
      culturalSignificance:
        "Warrior-prince of the Kaabu Empire; subject of one of the most celebrated kora epics in the Mandinka oral tradition.",
      traits: ["fearless", "destined", "honourable", "fatalistic"],
      avatarTheme: "shadow",
    },
    {
      id: "griot",
      name: "The Griot",
      role: "chorus",
      culturalSignificance:
        "The hereditary oral historian whose kora performance keeps Kelefa's memory alive.",
      traits: ["keeper-of-memory", "truthteller"],
      avatarTheme: "griot",
    },
  ],

  coverImage: {
    src: "/images/stories/kelefa-saane-cover.jpg",
    alt: "A lone warrior stands at the edge of the Gambia River at dusk, kora strings vibrating in the distance",
    paletteTheme: "ochre",
  },

  scenes: [
    {
      id: "kelefa-scene-1",
      sceneNumber: 1,
      title: "What the Kora Remembers",
      narration:
        "Before the story begins, the griot tunes his kora. Every note is a name. Every silence is a battlefield.",
      text: `Before there were written pages, there was the kora.

And before the kora, there was the voice of the griot — the *jali* — the keeper of every name, every lineage, every act of courage or cowardice that a kingdom had ever produced.

It is the griot who kept Kelefa Saane alive.

Not in a book. Not in a monument. But in the curve of twenty-one strings, in the vibration of a gourd resonator, in the memory of a family that has been singing this name — *Kelefa, Kelefa, Kelefa* — for generations.

The Kaabu Empire once stretched across what is now The Gambia, Guinea-Bissau, and Casamance. It was a Mandinka state of great power, a successor to the glory of the Mali Empire. Its warriors were celebrated. Its griots were feared. And its princes were expected to die well.

Kelefa Saane was one such prince.

This is his story, as best as it can be told.`,
      backgroundGradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #6b3a00 100%)",
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
      visual: {
        type: "gradient",
        paletteTheme: "ochre",
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 8,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      audio: {
        narrationUrl: "/audio/stories/kelefa-saane/scene-01-narration.mp3",
        narrationDurationSeconds: 68.0,
        cues: kelefaScene01 as NarrationCue[],
      },
      durationSeconds: 90,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "kelefa-scene-2",
      sceneNumber: 2,
      title: "A Son of Kaabu",
      narration:
        "He was born in a time when empires still breathed. When a warrior's name could outlast a kingdom.",
      text: `Kelefa Saane was born into the warrior nobility of the Kaabu Empire.

The griots say he was unlike other young men. Where others hesitated, Kelefa moved. Where others weighed the risk of battle, Kelefa weighed only his honour. His name, the bards tell us, means something close to *the one who does not turn back*.

And he never did.

He grew up in a world already beginning to shake. The great Mandinka kingdoms of the Senegambia were under pressure — from within, from old rivalries between ruling houses, and from without, from the growing power of the Fula confederacies to the north and east.

But Kelefa did not concern himself with politics.

He concerned himself with courage.

His mother, they say, loved him fiercely. And she feared for him just as fiercely — because she knew, as mothers of warriors always know, that the qualities she admired in her son were the same qualities that would one day take him from her.`,
      backgroundGradient: "linear-gradient(135deg, #2d1500 0%, #5a2d00 50%, #8b4500 100%)",
      characters: ["Kelefa Saane", "Kelefa's Mother"],
      charactersData: [
        {
          id: "kelefa",
          name: "Kelefa Saane",
          position: "right",
          expression: "proud",
          motion: "breathing",
          scale: 1.1,
          avatarTheme: "shadow",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "earth",
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 10,
      },
      environmentMotion: {
        type: "wind",
        intensity: "subtle",
      },
      audio: {
        narrationUrl: "/audio/stories/kelefa-saane/scene-02-narration.mp3",
        narrationDurationSeconds: 71.08,
        cues: kelefaScene02 as NarrationCue[],
      },
      durationSeconds: 100,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "kelefa-scene-3",
      sceneNumber: 3,
      title: "The Farewell",
      narration:
        "His mother knew. She had always known. She held him and said nothing, because everything had already been said.",
      text: `The morning Kelefa left for the North Bank, his mother prepared his food herself.

This is what the griot tells us — that she cooked for him, served him, and watched him eat. And when he was done, she did not weep. She did not beg him to stay. She simply placed her hand on his chest, felt his heart beating beneath her palm, and nodded.

*Go*, she said. *Go and be what you are.*

Because she understood something that the young and the comfortable do not always understand: that some people are made by fate as much as by choice. That there are lives which have a shape to them — a trajectory — and that fighting the shape of your life is its own kind of dishonour.

Kelefa Saane had a shape.

He was a warrior-prince of the Kaabu Empire, and somewhere across the wide Gambia River, there was a battle waiting for him.

He crossed the river.

He did not come back.`,
      backgroundGradient: "linear-gradient(135deg, #0d1a2d 0%, #1a3352 50%, #2d5280 100%)",
      characters: ["Kelefa Saane", "Kelefa's Mother"],
      charactersData: [
        {
          id: "kelefa",
          name: "Kelefa Saane",
          position: "left",
          expression: "resolute",
          motion: "still",
          scale: 1.05,
          avatarTheme: "shadow",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "river",
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 10,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "gentle",
      },
      audio: {
        narrationUrl: "/audio/stories/kelefa-saane/scene-03-narration.mp3",
        narrationDurationSeconds: 62.0,
        cues: kelefaScene03 as NarrationCue[],
      },
      durationSeconds: 110,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "kelefa-scene-4",
      sceneNumber: 4,
      title: "The North Bank",
      narration:
        "History does not always record how a man died. But the griots always remember who he was.",
      text: `The scholars who have studied the Kelefaba — the great kora epic — tell us that Kelefa Saane died in battle on the North Bank of the Gambia River.

The exact date is uncertain. The mid-19th century. A period of great turbulence for the Mandinka states. The Kaabu Empire itself would fall definitively in 1867.

But the griots are not interested in dates.

The griots are interested in *how a man carried himself*.

And what they tell us — across every performance of this epic, whether recorded in Bansang or Brikama, whether sung by Bamba Suso or Dembo Kanute — is that Kelefa Saane carried himself like a man who had made peace with his fate long before the battle began.

He did not run. He did not beg. He did not make deals with his enemies.

He stood in the place where he was meant to stand and he fought and he fell.

And because he did that, the griots remembered him.`,
      backgroundGradient: "linear-gradient(135deg, #1a0a00 0%, #4d1500 50%, #6b2000 100%)",
      characters: ["Kelefa Saane"],
      charactersData: [
        {
          id: "kelefa",
          name: "Kelefa Saane",
          position: "center",
          expression: "defiant",
          motion: "still",
          scale: 1.2,
          avatarTheme: "shadow",
        },
      ],
      visual: {
        type: "gradient",
        paletteTheme: "ochre",
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "medium",
        durationSeconds: 12,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      audio: {
        narrationUrl: "/audio/stories/kelefa-saane/scene-04-narration.mp3",
        narrationDurationSeconds: 70.22,
        cues: kelefaScene04 as NarrationCue[],
      },
      durationSeconds: 110,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "kelefa-scene-5",
      sceneNumber: 5,
      title: "What the Griots Keep",
      narration:
        "Empires fall. Kingdoms crumble. But a name held in the memory of a griot does not die.",
      text: `The Kaabu Empire is gone.

Its capitals are ruins in the bush of Guinea-Bissau. Its warriors are dust. Its royal lineages are dispersed across West Africa, known now only to those who have kept the genealogies.

But Kelefa Saane is not gone.

Every time a kora is tuned, every time a jali opens his throat and begins — *I ko Kelefa, I ko Kelefa* — the warrior-prince of Kaabu is alive again. In the vibration of the strings. In the silence between the notes. In the listening.

This is what the oral tradition does that no archive can replicate.

It does not preserve information. It preserves *presence*.

Gordon Innes, the scholar who spent years recording and translating the Kelefaba in the 1970s, understood this. He wrote that the griots were not merely entertainers or historians — they were the living memory of a people, and their performances were acts of resurrection.

Every night a griot performs the Kelefaba, Kelefa crosses the river again.

And in crossing it, he reminds us what it means to live without flinching.`,
      backgroundGradient: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3d 50%, #2d2d6b 100%)",
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
      visual: {
        type: "gradient",
        paletteTheme: "river",
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 12,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      audio: {
        narrationUrl: "/audio/stories/kelefa-saane/scene-05-narration.mp3",
        narrationDurationSeconds: 81.85,
        cues: kelefaScene05 as NarrationCue[],
      },
      durationSeconds: 120,
      transition: { type: "fade", durationSeconds: 2.5 },
    },

    {
      id: "kelefa-scene-6",
      sceneNumber: 6,
      title: "Listen",
      narration:
        "The kora is still playing. The story is not finished. It will not be finished for as long as there are griots.",
      text: `The Mandinka say: *A taa ko kelen te kelen ye.*
What is spoken once is not spoken only once.

Kelefa Saane has been spoken ten thousand times. In Banjul and Ziguinchor. In London and Dakar. On stages and by firesides. On recordings and in living rooms where someone plays a kora for the first time and feels, without knowing why, that something important is happening.

His story is not complete.

It is not complete because the griots are still singing it. Because scholars are still studying it. Because children in the Gambia still hear his name and know — the way you know certain things in your bones before you understand them in your mind — that this was someone who mattered.

The Kaabu Empire is history.

Kelefa Saane is memory.

And memory, as any jali will tell you, is the thing that time cannot touch.

*I ko Kelefa. They say Kelefa.*

They always will.`,
      backgroundGradient: "linear-gradient(135deg, #0a0500 0%, #1a0f00 50%, #2d1a00 100%)",
      characters: ["The Griot"],
      charactersData: [
        {
          id: "griot",
          name: "The Griot",
          position: "center",
          expression: "composed",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "griot",
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
        type: "night-stars",
        intensity: "subtle",
      },
      audio: {
        narrationUrl: "/audio/stories/kelefa-saane/scene-06-narration.mp3",
        narrationDurationSeconds: 69.67,
        cues: kelefaScene06 as NarrationCue[],
      },
      durationSeconds: 130,
      transition: { type: "fade", durationSeconds: 3 },
    },
  ],
};
