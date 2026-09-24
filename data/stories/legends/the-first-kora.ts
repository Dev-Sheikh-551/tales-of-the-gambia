import { Story, NarrationCue } from "@/types/story";
import firstKoraScene01 from "@/data/audio/cues/first-kora/scene-01.json";
import firstKoraScene02 from "@/data/audio/cues/first-kora/scene-02.json";
import firstKoraScene03 from "@/data/audio/cues/first-kora/scene-03.json";
import firstKoraScene04 from "@/data/audio/cues/first-kora/scene-04.json";
import firstKoraScene05 from "@/data/audio/cues/first-kora/scene-05.json";


/**
 * The First Kora
 *
 * Category: legend
 * ContentType: adapted
 *
 * Editorial note:
 * The kora is a 21-string bridge-harp unique to the griot traditions of West
 * Africa, particularly the Mande and Mandinka peoples. Its origin is
 * attributed in griot oral tradition to a female spirit (djinn or ancestral
 * spirit) and a hunter named Koriang — ancestor of the Kouyaté jali lineage.
 *
 * Primary documentation:
 * - Lucy Durán: extensive ethnomusicological research on the kora and its
 *   origins, documented in "Jelimusow: The Superwomen of Malian Music" and
 *   related publications (SOAS, 1990s–2000s)
 * - Sory Camara: "Gens de la parole" (1976) — foundational text on griot
 *   culture and identity
 * - Eric Charry: "Mande Music" (University of Chicago Press, 2000) —
 *   comprehensive study of Mande instruments including the kora
 *
 * The specific origin legend (hunter + spirit + gourd) is community-
 * attributed within the griot tradition. Multiple variants exist. The
 * version here draws on the documented consensus elements of the tradition.
 */

export const theFirstKoraStory: Story = {
  id: "the-first-kora",
  slug: "the-first-kora",
  title: "The First Kora",
  subtitle: "How the Instrument of Griots Came to Be",
  description:
    "A Mandinka hunter crossed the river and heard music no human had ever made. When he returned, he brought the sound with him — carved into a gourd, strung with twenty-one strings. This is the legend of how the kora came into the world.",
  category: "legend",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",

  origin: {
    region: "The Gambia / Senegambia / Mande heartland",
    culturalContext:
      "Mandinka / Mande griot (jali) oral tradition; kora origin legend attributed within the Kouyaté jali lineage",
    isDemoPlaceholder: false,
    community: "Mandinka (Mandingo); Mande griot tradition",
    ethnicGroup: "Mandinka / Mande",
  },

  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "community-attributed",
    collectedFrom: "Mandinka / Mande griot oral tradition, Senegambia",
    sourceRef: {
      title: "Mande Music: Traditional and Modern Music of the Maninka and Mandinka of Western Africa",
      author: "Eric Charry",
      institution: "University of Chicago Press",
      year: 2000,
      notes:
        "Also: Lucy Durán (SOAS) — ethnomusicological research on kora origins and griot tradition; Sory Camara, 'Gens de la parole' (Mouton, 1976). The kora origin legend is community-attributed within the Kouyaté jali lineage; specific narrative variants differ across communities.",
    },
    collectorOrAuthor:
      "Tales of The Gambia editorial team (retelling based on community-attributed tradition)",
    originalLanguage: "Mandinka",
    historicalPeriod: "Traditional / pre-colonial (legendary time)",
    adaptationNotes:
      "The core elements of the kora origin legend — a hunter, a forest encounter with a spirit or ancestral figure, a gourd resonator, and the emergence of an instrument that becomes the voice of the griots — are community-attributed across the Mande griot tradition. The specific dialogue, emotional texture, and narrative shape of this retelling are editorial composition. No single documented performance is being transcribed.",
    authenticityStatement:
      "This retelling is based on a community-attributed legend within the Mandinka / Mande griot tradition, documented in ethnomusicological scholarship (Charry, 2000; Durán; Camara). The cultural core — the kora's origin in a forest encounter, its connection to the griot lineage — is attested as community-held belief. The specific narrative composition is editorial and is not presented as a verbatim account of any documented performance.",
  },

  narrative: {
    openingFormula:
      "Before the kora, there was silence. And then a hunter walked into the forest and silence became song.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "Twenty-one strings. One gourd. One bridge. One voice. And the world has never been quiet since.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "The most transformative gifts are not made — they are found, in the places we dare to go alone.",
    communalMoral:
      "The kora belongs to everyone who hears it. But it came from one man's willingness to follow an unfamiliar sound into the dark.",
    contextualNotes: [
      "The kora has 21 strings — 11 on one side and 10 on the other — strung over a bridge on a gourd resonator covered with cow skin. It is unique to the Mande and Mandinka griot traditions.",
      "The instrument is associated with the Kouyaté and Diabaté jali lineages, among others. The right to play it is traditionally hereditary.",
      "The kora is used to perform the great epics — the Sunjata, the Kelefaba — and also praise songs, love songs, and contemporary music. Gambian kora masters include Suso, Kouyaté, and Jobarteh family lineages.",
      "In Mandinka tradition, the kora is sometimes called a 'voice' rather than an instrument, because the music it produces is understood as speech — a direct form of language.",
    ],
  },

  language: "English",
  availableLanguages: ["English"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 480,

  themes: [
    "kora",
    "music",
    "griots",
    "origin legend",
    "forest spirits",
    "Mandinka culture",
    "instrument",
    "tradition",
    "gifts",
    "transformation",
  ],

  characters: ["Koriang the Hunter", "The Forest Spirit", "The Griot"],

  characterProfiles: [
    {
      id: "koriang",
      name: "Koriang the Hunter",
      role: "protagonist",
      culturalSignificance:
        "Legendary ancestor of the Kouyaté jali lineage; credited in griot tradition with discovering or receiving the first kora.",
      traits: ["brave", "curious", "receptive", "destined"],
      avatarTheme: "shadow",
    },
    {
      id: "spirit",
      name: "The Forest Spirit",
      role: "guardian",
      culturalSignificance:
        "Representative of the ancestral or spiritual source from which the kora's knowledge came.",
      traits: ["mysterious", "musical", "testing"],
      avatarTheme: "shadow",
    },
  ],

  coverImage: {
    src: "/images/stories/the-first-kora-cover.jpg",
    alt: "A man sits at the edge of a forest, a kora across his knees, firelight reflecting off twenty-one strings",
    paletteTheme: "gold",
  },

  scenes: [
    {
      id: "kora-scene-1",
      sceneNumber: 1,
      title: "Before the Kora",
      narration:
        "Every instrument has a first moment. A first breath, a first vibration, a first time the silence broke and did not come back.",
      text: `Before the kora, there was the kora.

That is what the griots say: the kora always existed. It was waiting. It existed the way music exists before anyone has played it — in potential, in silence, in the space between what is and what could be.

But there was a moment when it crossed into the world.

And the man who brought it across was named Koriang.

He was a hunter — the griots are consistent about this. A Mandinka man from the Senegambia region, before kingdoms had taken their final shapes, in the time when the forest was deeper and the border between the visible world and the world behind it was not as fixed as it has since become.

He was a good hunter. He moved quietly. He observed well. He knew when to be still.

These qualities — the griots note — were also what made him capable of receiving what the forest was about to give him.`,
      backgroundGradient: "linear-gradient(135deg, #0a0f00 0%, #1a2800 50%, #2d4500 100%)",
      characters: ["Koriang the Hunter"],
      charactersData: [
        {
          id: "koriang",
          name: "Koriang",
          position: "center",
          expression: "watchful",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "forest" },
      cameraMotion: { preset: "zoom-in", intensity: "subtle", durationSeconds: 8 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/the-first-kora/scene-01-narration.mp3",
        narrationDurationSeconds: 62.83,
        cues: firstKoraScene01 as NarrationCue[],
      },
      durationSeconds: 80,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "kora-scene-2",
      sceneNumber: 2,
      title: "The Sound in the Forest",
      narration:
        "He had never heard anything like it. Not in the market. Not at any ceremony. Not anywhere a human hand had ever reached.",
      text: `One night, deep in the forest — the kind of deep where the trees are old enough to remember things that human beings have forgotten — Koriang heard a sound.

He stopped.

He was a hunter. He knew the sounds of the forest: the particular rustle of a bush rat, the night call of the nightjar, the distant percussion of a water source. He had catalogued these sounds over years of careful listening.

This was none of them.

It was a sound made of vibrating strings — but richer, more complex, more resonant than any instrument he had encountered at any ceremony in any village. It seemed to come from everywhere and nowhere. It seemed to speak in a language just beyond the edge of understanding.

He followed it.

He walked deeper into the forest, moving toward the sound the way you move toward light — not thinking, just following — until he came to a clearing.

In the clearing, someone was playing.

The player was not quite human in the way that daylight makes things human. But Koriang was not afraid. He sat down, at the edge of the clearing, and he listened. He listened for what the griots say was a very long time.

And when the playing stopped, the player turned and saw him.`,
      backgroundGradient: "linear-gradient(135deg, #0a1a0a 0%, #0d2b0d 50%, #142b14 100%)",
      characters: ["Koriang the Hunter", "The Forest Spirit"],
      charactersData: [
        {
          id: "spirit",
          name: "The Spirit",
          position: "left",
          expression: "still",
          motion: "subtle-float",
          scale: 1.1,
          avatarTheme: "shadow",
        },
        {
          id: "koriang",
          name: "Koriang",
          position: "right",
          expression: "awed",
          motion: "still",
          scale: 0.95,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "forest" },
      cameraMotion: { preset: "pan-left", intensity: "subtle", durationSeconds: 10 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/the-first-kora/scene-02-narration.mp3",
        narrationDurationSeconds: 86.7,
        cues: firstKoraScene02 as NarrationCue[],
      },
      durationSeconds: 100,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "kora-scene-3",
      sceneNumber: 3,
      title: "The Teaching",
      narration:
        "The spirit did not turn him away. It said: you came. That is enough. Now I will show you.",
      text: `*You have been listening,* the spirit said.

*Yes,* said Koriang, because there was no point in lying.

*Most men hear something they don't understand and they walk away from it or try to destroy it,* the spirit said. *You sat down and listened. That is why I'll teach you.*

The spirit showed Koriang the instrument.

A gourd — large, resonant, with the quality of something that wants to amplify rather than contain. Cow skin stretched across one face of it. A long hardwood neck. And strings — twenty-one strings — running over a bridge set at the centre of the skin, dividing the instrument into registers.

The spirit showed Koriang how to hold it. How to pluck the strings with his thumbs and forefingers while his fingers wrapped around the neck. How the instrument wanted to be played — not forced, not struck, but coaxed, addressed, spoken to.

*It is not an instrument,* the spirit said. *It is a voice. You must learn to speak with it.*

Koriang sat with the spirit in that clearing until dawn. And when the light began to come through the trees, the spirit placed the kora in Koriang's hands and said:

*Take this home. Teach your children. They will teach theirs. And this voice will speak for your people for as long as your people have memory.*`,
      backgroundGradient: "linear-gradient(135deg, #0a0800 0%, #1a1400 50%, #2d2200 100%)",
      characters: ["Koriang the Hunter", "The Forest Spirit"],
      charactersData: [
        {
          id: "spirit",
          name: "The Spirit",
          position: "left",
          expression: "teaching",
          motion: "subtle-float",
          scale: 1.05,
          avatarTheme: "shadow",
        },
        {
          id: "koriang",
          name: "Koriang",
          position: "right",
          expression: "receptive",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "gold" },
      cameraMotion: { preset: "still", intensity: "subtle", durationSeconds: 11 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/the-first-kora/scene-03-narration.mp3",
        narrationDurationSeconds: 88.22,
        cues: firstKoraScene03 as NarrationCue[],
      },
      durationSeconds: 120,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "kora-scene-4",
      sceneNumber: 4,
      title: "The Griots Receive It",
      narration:
        "Koriang brought the kora out of the forest. The griots heard it and understood immediately what it was for.",
      text: `Koriang returned to his village with the kora.

The griots — the jalolu, the professional rememberers and praise-singers who were already the keepers of the community's history — heard him play.

They recognised it at once.

Not because they had heard anything like it before. They hadn't. But because they understood immediately that this was the instrument they had been waiting for without knowing they were waiting. An instrument complex enough to hold the full weight of an epic. Rich enough to carry emotion and narrative simultaneously. Intimate enough to speak directly to a single person. Powerful enough to fill a gathering of thousands.

The kora was, they understood, a voice. Their voice. The voice that the griots had been born to carry.

The Kouyaté lineage — descendants of Koriang — became its primary custodians. The knowledge of how to build it, how to tune it, how to play it in the old way, was passed from father to son and teacher to student, uninterrupted, down the centuries.

In The Gambia today, the Suso, Kouyaté, Jobarteh, and Diabaté families are among the kora's great lineages. They are still teaching. Still playing. Still carrying the voice that came out of the forest at dawn.`,
      backgroundGradient: "linear-gradient(135deg, #1a0f00 0%, #3d2500 50%, #6b4200 100%)",
      characters: ["The Griot", "Koriang the Hunter"],
      charactersData: [
        {
          id: "griot",
          name: "The Griot",
          position: "center",
          expression: "reverent",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "griot",
        },
      ],
      visual: { type: "gradient", paletteTheme: "ochre" },
      cameraMotion: { preset: "zoom-in", intensity: "subtle", durationSeconds: 10 },
      environmentMotion: { type: "dust-particles", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/the-first-kora/scene-04-narration.mp3",
        narrationDurationSeconds: 86.33,
        cues: firstKoraScene04 as NarrationCue[],
      },
      durationSeconds: 110,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "kora-scene-5",
      sceneNumber: 5,
      title: "Twenty-One Strings",
      narration:
        "Why twenty-one strings? The griots do not always explain. Some things are simply the right number.",
      text: `The kora has twenty-one strings.

Eleven on one side. Ten on the other. Arranged so that when a skilled jali plays, the two hands move in different registers, weaving together — melody and rhythm and harmony all at once — in a way that no other instrument quite replicates.

It is built from a large gourd, a cow skin, a hardwood neck, and leather tuning rings. It is, in its materials, entirely of West Africa. Every part of it grows here, belongs here.

In the hands of a master jali, it can sustain a performance for hours — holding an entire audience in a single sustained emotional landscape, moving from joy to grief to reverence to laughter without a single break in the conversation between player and listener.

Gambian kora masters — Alhaji Papa Susso, Dembo Konte, Malamini Jobarteh — have carried the instrument across the world. It has been heard in concert halls in London and Tokyo. It has been played alongside jazz and classical music and electronic music and every other tradition it has encountered.

And each time it is played, the twenty-one strings vibrate and the gourd resonates and somewhere, at the edge of hearing, there is the memory of a clearing in a forest where a hunter sat down instead of walking away — and everything that followed from that.

Listen.

You can still hear it.`,
      backgroundGradient: "linear-gradient(135deg, #0a0800 0%, #1a1400 50%, #3d3000 100%)",
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
      cameraMotion: { preset: "zoom-out", intensity: "subtle", durationSeconds: 14 },
      environmentMotion: { type: "night-stars", intensity: "subtle" },
      audio: {
        narrationUrl: "/audio/stories/the-first-kora/scene-05-narration.mp3",
        narrationDurationSeconds: 98.0,
        cues: firstKoraScene05 as NarrationCue[],
      },
      durationSeconds: 130,
      transition: { type: "fade", durationSeconds: 3 },
    },
  ],
};
