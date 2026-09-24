import { Story, NarrationCue } from "@/types/story";
import maiScene01 from "@/data/audio/cues/mais-nianyaa/scene-01.json";
import maiScene02 from "@/data/audio/cues/mais-nianyaa/scene-02.json";
import maiScene03 from "@/data/audio/cues/mais-nianyaa/scene-03.json";
import maiScene04 from "@/data/audio/cues/mais-nianyaa/scene-04.json";


export const maisStolenNianyaaStory: Story = {
  id: "story-mais-stolen-nianyaa",
  slug: "mais-stolen-nianyaa",
  title: "Mai’s Stolen Nianyaa",
  subtitle: "The Wolof tale of bridal finery, sisterly envy, and the wisdom of the village matriarchs",
  description:
    "On the eve of Mai’s wedding, her treasured nianyaa—a chest of ancestral amber beads, silver filigree pendants, and coral waistbands—vanishes into thin air. With her jealous half-sister under suspicion and the wedding drums already sounding, the village grandmother uses an ancient riddle of conscience to heal the family without breaking their bonds.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Senegambia (Saloum and Niumi river valleys)",
    community: "Wolof oral tradition",
    ethnicGroup: "Wolof",
    culturalContext:
      "A touching moral and familial tale centered on the traditional cultural practice of 'Nianyaa' (bridal jewelry, gold ornaments, and heirloom adornments worn during Wolof wedding ceremonies), documented by Sukai Mbye Bojang in her third volume of Gambian folktales.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 3, Chapter 4)",
    sourceRef: {
      title: "Mai's Nianyaa Get Stolen",
      notes: "Collected and documented by Sukai Mbye Bojang in 'Folk Tales and Fables from The Gambia' (Vol. 3). Adapted with restorative justice themes for modern readers.",
    },
    originalLanguage: "Wolof oral tradition",
    historicalPeriod: "Traditional Senegambian village life",
    adaptationNotes:
      "Structured into four intimate scenes: the presentation of the bridal beads, the morning of shock, the grandmother's wise circle of silence, and the restoration of family honor.",
    authenticityStatement:
      "This story is an authentic, culturally accurate reflection of traditional Wolof bridal practices, family disputes, and elder-led dispute resolution.",
  },
  narrative: {
    openingFormula:
      "Lebon! Amoon na fi, daan na am... Come sit around the glowing charcoal, and hear how the grandmother's wisdom was worth more than a thousand silver beads.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever a bride puts on her wedding amber, she remembers that peace among sisters is the brightest ornament of all.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Jewels can be remade by the smith, but a wounded family bond can only be healed by truth and forgiveness.",
    communalMoral:
      "Wisdom does not crush the wrongdoer with public shame; it builds a bridge for them to walk back into the light.",
    contextualNotes: [
      "Nianyaa: Traditional Senegambian wedding adornments including amber necklaces, gold pendants, braided hair ornaments, and aromatic waist beads.",
      "Kola Nuts: Shared during wedding ceremonies as a symbol of peace, fertility, and formal blessing.",
      "Bantaba: The open gathering platform beneath a village shade tree where elders deliberate and resolve disputes.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Family Reconciliation", "Honesty", "Wisdom of Elders", "Forgiveness"],
  characters: ["Mai the Bride", "Binta her Sister", "Grandmother Awa", "The Goldsmith"],
  coverImage: {
    src: "/images/stories/griot-baobab.svg",
    alt: "A beautifully carved wooden jewelry box holding glistening amber beads and filigree silver beside traditional woven cloths",
    paletteTheme: "gold",
  },
  featured: false,
  scenes: [
    {
      id: "scene-mn-1",
      sceneNumber: 1,
      title: "The Box of Ancestral Amber",
      text: "In the warm shade of the family veranda, Grandmother Awa unlocked the heavy teakwood chest with an iron key worn smooth by fifty rainy seasons. Inside lay Mai's nianyaa: long ropes of honey-colored amber beads from the northern trade routes, silver earrings shaped like the crescent moon, and crimson coral beads that smelled faintly of clove and sandalwood. Tomorrow, Mai would wear them before the entire village as she walked to her husband's compound. Beside her stood her half-sister Binta, her fingers tightening around her apron as she stared at the glowing silver.",
      narration: "A teakwood chest opened to reveal ancestral amber and silver, stirring secret longing in a quiet heart.",
      backgroundGradient: "from-[#2A150A] via-[#1B0D06] to-[#0D0603]",
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
        type: "fire-flicker",
        intensity: "subtle",
      },
      characters: ["Grandmother Awa", "Mai the Bride", "Binta her Sister"],
      audio: {
        narrationUrl: "/audio/stories/mais-stolen-nianyaa/scene-01-narration.mp3",
        narrationDurationSeconds: 35.8,
        cues: maiScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-mn-2",
      sceneNumber: 2,
      title: "The Cry at First Light",
      text: "Before the morning call to prayer, a wail of despair pierced the quiet mist of the compound. The lock on the bridal hut had been slid back; the velvet cloth was crumpled on the earth floor, and the carved chest stood empty. Word spread like wildfire through the compound. The women stopped their pounding of coos; the men stood in uneasy silence by the bantaba. Mai sat weeping upon her woven mat, while whispers began to circle Binta, who stood in the corner of the courtyard with eyes fixed firmly on the ground.",
      narration: "A morning wail shattered the dawn as the bridal chest was found empty and cold.",
      backgroundGradient: "from-[#18121A] via-[#0E0B10] to-[#060408]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
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
      characters: ["Mai the Bride", "Binta her Sister"],
      audio: {
        narrationUrl: "/audio/stories/mais-stolen-nianyaa/scene-02-narration.mp3",
        narrationDurationSeconds: 32.27,
        cues: maiScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-mn-3",
      sceneNumber: 3,
      title: "The Circle of the Water Pot",
      text: "Rather than summon the village guards to search the huts, Grandmother Awa held up her hand. She placed a large earthenware water pot in the center of the dark storeroom, covered it with a white sheet, and called all the daughters and cousins into the room. 'The spirits of our ancestors do not tolerate deceit,' the grandmother said quietly. 'Let each daughter enter this room alone in the dark, place her right hand into the covered jar, and leave. If her heart is clean, the water will smell of sweet mint. If the jewelry is returned into the pot before the candle burns down, no name will ever be spoken in shame.'",
      narration: "An earthenware water pot in the quiet dark, offering a bridge of grace where shame could have reigned.",
      backgroundGradient: "from-[#1C1820] via-[#100E14] to-[#08060A]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
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
      characters: ["Grandmother Awa"],
      audio: {
        narrationUrl: "/audio/stories/mais-stolen-nianyaa/scene-03-narration.mp3",
        narrationDurationSeconds: 35.65,
        cues: maiScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-mn-4",
      sceneNumber: 4,
      title: "The Sisters' Embrace",
      text: "One by one, the young women entered the darkened room and emerged into the courtyard. When Grandmother Awa stepped inside and lifted the cloth, the heavy strands of amber and silver lay resting safely at the bottom of the dry jar. She brought them out into the sunlight without uttering a single accusation. Binta broke into tears, falling at Mai's feet in silent remorse. Mai reached down, took her sister by the hand, and fastened one of the silver moon earrings onto Binta's own ear. When the wedding procession danced through the village at sunset, both sisters walked side by side, bound together by a grace that outshone the finest gold.",
      narration: "A sister's embrace washed away envy, and the wedding procession danced in the beauty of restored peace.",
      backgroundGradient: "from-[#2A180E] via-[#1C0F08] to-[#0E0704]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "subtle",
      },
      characters: ["Mai the Bride", "Binta her Sister", "Grandmother Awa"],
      audio: {
        narrationUrl: "/audio/stories/mais-stolen-nianyaa/scene-04-narration.mp3",
        narrationDurationSeconds: 38.75,
        cues: maiScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
