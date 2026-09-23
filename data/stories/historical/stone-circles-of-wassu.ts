import { Story } from "@/types/story";

/**
 * The Stone Circles of Wassu
 *
 * Category: historical
 * ContentType: historical
 *
 * Editorial note:
 * The Senegambian Stone Circles are a UNESCO World Heritage Site inscribed
 * in 2006. They consist of over 1,000 stone circles spread across 93 sites
 * in The Gambia and Senegal, concentrated along the Gambia River. The four
 * principal sites in The Gambia are: Wassu, Ker Batch, Sine Ngayène, and
 * Wanar.
 *
 * The circles were built c. 3rd century BCE to 16th century CE. Each circle
 * marks a burial site — a tumulus. The builders are believed to be ancestors
 * of populations currently living in the area.
 *
 * Archaeological work on the Senegambian stone circles:
 * - Excavations by G.E.J. Ozanne and others (1960s)
 * - Research documented by: Paul Ozanne, J.M. Davidson; ICCROM/UNESCO
 *   documentation for the 2006 World Heritage inscription
 * - UNESCO World Heritage Committee, "Senegambian Stone Circles" (2006)
 *
 * Narrative reconstruction: The stone circles are an archaeological fact.
 * Who the specific individuals buried beneath them were, what ceremonies
 * accompanied their construction, and what communities gathered for them —
 * these interior elements are editorial reconstruction clearly disclosed
 * in narrativeReconstructionNotes.
 */

export const stoneCirlcesOfWassuStory: Story = {
  id: "stone-circles-of-wassu",
  slug: "stone-circles-of-wassu",
  title: "The Stone Circles of Wassu",
  subtitle: "What the Ancestors Left Behind",
  description:
    "Along the Gambia River, over a thousand stone circles stand in the earth — some for 2,000 years. Each one marks a burial. Each one is a name we have forgotten. This is the story of what they were, and why they still matter.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "all-ages",

  origin: {
    region: "The Gambia / Senegal",
    culturalContext:
      "Senegambian megalithic tradition; ancestors of present Gambian populations (c. 3rd century BCE – 16th century CE); UNESCO World Heritage Site (2006)",
    isDemoPlaceholder: false,
    community: "Ancestors of present Gambian / Senegambian populations",
    ethnicGroup: "Pre-colonial Senegambian (multiple groups)",
  },

  provenance: {
    sourceType: "archival-manuscript",
    provenanceConfidence: "research-based",
    collectedFrom:
      "Archaeological record; UNESCO World Heritage documentation (2006); Central River Division, The Gambia",
    sourceRef: {
      title: "Senegambian Stone Circles — UNESCO World Heritage Site",
      institution: "UNESCO World Heritage Committee",
      year: 2006,
      url: "https://whc.unesco.org/en/list/1226",
      notes:
        "UNESCO inscription 2006. Archaeological research by G.E.J. Ozanne, P. Ozanne, J.M. Davidson and others (1960s onward). The four Gambian sites — Wassu, Ker Batch, Sine Ngayène, Wanar — together with Senegalese sites comprise over 1,000 stone circles across 93 sites.",
    },
    collectorOrAuthor:
      "UNESCO / archaeological record; Tales of The Gambia editorial team (narrative reconstruction)",
    originalLanguage: "Archaeological record (no written sources from builders)",
    historicalPeriod: "c. 3rd century BCE – 16th century CE",
    adaptationNotes:
      "The stone circles are a documented archaeological and UNESCO-inscribed fact. The physical form, approximate date range, and burial function are established by archaeological research. The interior narrative — the specific ceremony, the figures who built them, the community that gathered — is editorial reconstruction and is explicitly disclosed as such in narrativeReconstructionNotes. The intent is to honour an extraordinary heritage site, not to invent history.",
    authenticityStatement:
      "The Senegambian Stone Circles are a real, documented, UNESCO World Heritage Site (inscribed 2006). The archaeological facts — location, quantity, date range, burial function — are established by archaeological research. Interior scenes representing the lives and ceremonies of the builders are editorial reconstruction, clearly disclosed, informed by the archaeological record and general knowledge of Iron Age West African societies.",
  },

  narrative: {
    openingFormula:
      "Before the kingdoms. Before the empires. Before the griots had words for what they were watching — someone was building.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The names are gone. The stones remain. And the stones are asking us a question we have not yet found the words to answer.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "A civilisation that builds monuments for its dead has already understood something important about the living: that we are temporary, and that this does not make us insignificant.",
    contextualNotes: [
      "The Senegambian Stone Circles were inscribed as a UNESCO World Heritage Site in 2006, jointly for The Gambia and Senegal.",
      "There are over 1,000 individual stone circles at 93 sites across the two countries. The circles range from 4 to 7 stones and from under 1 metre to over 2.5 metres in height.",
      "Each stone circle marks a burial tumulus — an earthen mound covering the remains of one or more individuals. High-status burials often contain iron tools, jewellery, and pottery.",
      "The Wassu Stone Circles site in The Gambia's Central River Division is the most visited and best preserved of the Gambian sites.",
      "The builders are generally understood to be ancestors of populations currently living in the region. No single ethnic group exclusively claims them.",
    ],
  },

  historicalContext: {
    era: "c. 3rd century BCE – 16th century CE",
    approximateDate: "Construction spans approximately 1,800 years",
    location:
      "Wassu, Ker Batch, Sine Ngayène, Wanar — Central River Division, The Gambia; and northern Senegal",
    documentedFigures: [],
    documentedEvents: [
      "Construction of the Senegambian Stone Circles (c. 3rd century BCE – 16th century CE)",
      "UNESCO World Heritage Site inscription (2006)",
    ],
    narrativeReconstructionNotes:
      "The physical stone circles, their date range (c. 3rd century BCE – 16th century CE), and their burial function are documented by archaeological research. The individuals buried beneath them, the communities that built them, and the ceremonies that accompanied construction are not known from written records. The interior scenes in this narrative — the ceremony, the stonecutters, the community gathering — are editorial reconstructions intended to convey the human reality behind the archaeological facts. They are not historical claims about specific named individuals or events.",
    sources: [
      {
        title: "Senegambian Stone Circles — UNESCO World Heritage Site",
        institution: "UNESCO World Heritage Committee",
        year: 2006,
        url: "https://whc.unesco.org/en/list/1226",
      },
    ],
  },

  language: "English",
  availableLanguages: ["English"],
  readingTimeMinutes: 8,
  listeningDurationSeconds: 520,

  themes: [
    "ancestors",
    "heritage",
    "monuments",
    "death and memory",
    "archaeology",
    "Iron Age",
    "UNESCO World Heritage",
    "Gambian history",
    "community",
    "the unknown",
  ],

  characters: ["The Stonecutter", "The Elder", "The Dead"],

  characterProfiles: [
    {
      id: "stonecutter",
      name: "The Stonecutter",
      role: "protagonist",
      culturalSignificance:
        "A fictional representative of the thousands of unnamed builders who created the stone circles over centuries.",
      traits: ["skilled", "devoted", "community-minded"],
      avatarTheme: "elephant",
    },
  ],

  coverImage: {
    src: "/images/stories/stone-circles-wassu-cover.jpg",
    alt: "Ancient laterite stone pillars stand in a circle in the Gambian bush, golden light falling across them at dusk",
    paletteTheme: "earth",
  },

  scenes: [
    {
      id: "stones-scene-1",
      sceneNumber: 1,
      title: "Older Than the Kingdoms",
      narration:
        "The Mali Empire. The Kaabu. The Wolof states. All of them came after. The circles were already old.",
      text: `In the bush of the Central River Division of The Gambia, along a stretch of laterite plateau above the flood plain of the Gambia River, there are stones.

Not scattered stones. Arranged stones. Circles of standing laterite pillars — smooth and red, cut from the earth and raised by hands that have long since returned to the same earth.

There are over a thousand of these circles.

They spread across 93 sites in The Gambia and Senegal, clustered along the river valley, in a dense band of ancient intention.

The oldest were built approximately 2,300 years ago. The most recent perhaps 500 years ago. The builders worked across nearly 2,000 years — generation after generation, across what we now call the Iron Age and into the early modern period — laying their dead in the earth and marking each grave with a ring of standing stone.

The Kaabu Empire had not yet been imagined when some of these circles were built. The Mali Empire would not rise for another thousand years. The Mandinka had not yet arrived in the region. The Wolof kingdoms were centuries in the future.

Before all of that, someone was building.`,
      backgroundGradient: "linear-gradient(135deg, #1a0a00 0%, #3d2000 50%, #6b3800 100%)",
      characters: ["The Dead"],
      charactersData: [
        {
          id: "stonecutter",
          name: "The Stonecutter",
          position: "center",
          expression: "composed",
          motion: "subtle-float",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "earth" },
      cameraMotion: { preset: "zoom-in", intensity: "subtle", durationSeconds: 9 },
      environmentMotion: { type: "dust-particles", intensity: "subtle" },
      ambience: { type: "gentle-wind", label: "Wind in the bush" },
      durationSeconds: 90,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "stones-scene-2",
      sceneNumber: 2,
      title: "The Cutting",
      narration:
        "Laterite is a hard iron-rich stone. There were no machines. Only hands, iron tools, and a very great deal of patience.",
      text: `Imagine the work.

Laterite — the deep red iron-rich rock that underlies much of the Gambia River basin — is hard. Not impossibly hard, but the kind of hard that demands time and attention and the steady, unremarkable courage of people who know that large things are built slowly.

The stonecutters found outcrops of laterite on the plateau. They quarried the stone — using iron tools, fire, and wedges — into cylinders, some of them over two metres tall, some shorter, all of them shaped to stand upright in the earth without falling.

Each cylinder had to be moved. Dragged. Raised. Planted in a circle, at regular intervals, around a burial mound.

We do not know exactly how they did it. We know they did it. More than 1,000 times.

The effort is staggering to contemplate. Not because it is exotic or primitive — but because it is profoundly recognisable. This is what communities do when someone they love dies and they want the world to know that this person existed. They mark the place. They make it hard to forget.

Every one of the 1,000-plus stone circles is someone's way of saying: *here. This person was here.*`,
      backgroundGradient: "linear-gradient(135deg, #2d1500 0%, #5a2d00 50%, #8b4500 100%)",
      characters: ["The Stonecutter"],
      charactersData: [
        {
          id: "stonecutter",
          name: "The Stonecutter",
          position: "left",
          expression: "focused",
          motion: "breathing",
          scale: 1.0,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "ochre" },
      cameraMotion: { preset: "pan-right", intensity: "subtle", durationSeconds: 10 },
      environmentMotion: { type: "dust-particles", intensity: "gentle" },
      ambience: { type: "gentle-wind", label: "Quarry sounds" },
      durationSeconds: 100,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "stones-scene-3",
      sceneNumber: 3,
      title: "What They Left Behind",
      narration:
        "Archaeologists found iron tools. Pottery. Jewellery. And in the highest-status burials — objects that travelled a very long way to be here.",
      text: `When archaeologists excavated the tumuli beneath the stone circles, they found more than bones.

They found iron — tools and weapons, the signature of the West African Iron Age.

They found pottery, some of it local, some of it from further away.

They found jewellery — beads of stone and glass and worked metal.

In some of the high-status burials, they found objects that had clearly travelled across trade routes stretching far beyond the Gambia River valley.

This is another thing the stone circles tell us: these were not isolated communities. They were connected — to wider trade networks, to flows of goods and ideas, to a world much larger than the immediate valley.

The people buried here were not on the periphery of history. They were participants in it.

We do not know their names.

We do not know what language they spoke, what songs they sang, what they called the river that ran below their plateau settlements. We do not know the name of a single person buried beneath a single one of the 1,000-plus circles.

But we know they were here. The stones make that impossible to forget.`,
      backgroundGradient: "linear-gradient(135deg, #0d1a1a 0%, #1a3333 50%, #2d5252 100%)",
      characters: ["The Dead"],
      charactersData: [
        {
          id: "stonecutter",
          name: "The Ancestors",
          position: "center",
          expression: "still",
          motion: "still",
          scale: 1.0,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "river" },
      cameraMotion: { preset: "zoom-in", intensity: "subtle", durationSeconds: 10 },
      environmentMotion: { type: "river-ripples", intensity: "subtle" },
      ambience: { type: "river-flow", label: "River below the plateau" },
      durationSeconds: 110,
      transition: { type: "dissolve", durationSeconds: 2 },
    },

    {
      id: "stones-scene-4",
      sceneNumber: 4,
      title: "Wassu Today",
      narration:
        "Today the Wassu site is protected. School children come. Researchers come. And the stones stand exactly as they were left.",
      text: `The Wassu Stone Circles site lies in the Central River Division of The Gambia, not far from the town of Wassu on the north bank of the Gambia River.

It was inscribed as a UNESCO World Heritage Site in 2006 — jointly with the Senegalese sites — in recognition of its extraordinary cultural and historical significance.

Today, school children visit on field trips. Researchers from around the world come to study. Tourists come from Europe and North America to stand inside the circles and feel the particular quality of stillness that a very old, very intentional thing creates.

The circles have survived 2,000 years of rain, harmattan wind, heat, and growth. Roots have grown around some of the stones. Grass has carpeted the spaces between them. Termites have built their own structures nearby.

The stones do not care about any of this.

They stand, in their quiet circles, in the exact positions they were placed in by people whose names we will never know — and they invite anyone willing to stand still long enough to ask themselves a simple question:

Who were they? And what did they believe was worth building in stone?`,
      backgroundGradient: "linear-gradient(135deg, #0a1000 0%, #1a2800 50%, #2d4000 100%)",
      characters: ["The Stonecutter", "The Elder"],
      charactersData: [
        {
          id: "stonecutter",
          name: "The Stones",
          position: "center",
          expression: "still",
          motion: "still",
          scale: 1.05,
          avatarTheme: "elephant",
        },
      ],
      visual: { type: "gradient", paletteTheme: "forest" },
      cameraMotion: { preset: "drift", intensity: "subtle", durationSeconds: 12 },
      environmentMotion: { type: "wind", intensity: "subtle" },
      ambience: { type: "gentle-wind", label: "Wassu site" },
      durationSeconds: 110,
      transition: { type: "crossfade", durationSeconds: 1.5 },
    },

    {
      id: "stones-scene-5",
      sceneNumber: 5,
      title: "The Question the Stones Ask",
      narration:
        "The circles are not a mystery to be solved. They are a conversation to be joined.",
      text: `Some people come to Wassu looking for answers.

They want to know who built the circles, exactly when, exactly why. They want the story — beginning, middle, end — neatly told.

The stones do not offer that.

What the stones offer instead is something more disorienting and more useful: the sheer fact of human effort across time. Someone decided, 2,000 years ago, that the dead were worth marking. That the labour of cutting stone and moving it and raising it in a circle was a worthy expression of something — grief, love, status, belief, community — that demanded to be made permanent.

And then someone else decided the same thing. And someone else. For nearly 2,000 years.

The people of The Gambia who live near Wassu today are not the same communities who built the circles. Languages have changed, kingdoms have come and gone. But the stones are still here, and the people are still here, and between them — between the very old stones and the very living people — there is a conversation about what it means to belong to a place, to come from something, to leave something behind.

Go to Wassu.

Stand inside one of the circles.

Let the stones ask you their question.

You don't need to have an answer. You just need to hear it.`,
      backgroundGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #2d2820 100%)",
      characters: ["The Dead", "The Elder"],
      charactersData: [
        {
          id: "stonecutter",
          name: "The Ancestors",
          position: "center",
          expression: "composed",
          motion: "subtle-float",
          scale: 1.0,
          avatarTheme: "shadow",
        },
      ],
      visual: { type: "gradient", paletteTheme: "earth" },
      cameraMotion: { preset: "zoom-out", intensity: "subtle", durationSeconds: 14 },
      environmentMotion: { type: "night-stars", intensity: "subtle" },
      ambience: { type: "night-insects", label: "Gambian night" },
      durationSeconds: 130,
      transition: { type: "fade", durationSeconds: 3 },
    },
  ],
};
