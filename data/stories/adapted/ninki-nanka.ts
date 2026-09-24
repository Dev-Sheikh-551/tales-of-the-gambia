import { Story, NarrationCue } from "@/types/story";
import ninkiCues01 from "@/data/audio/cues/ninki-nanka/scene-01.json";
import ninkiCues02 from "@/data/audio/cues/ninki-nanka/scene-02.json";
import ninkiCues03 from "@/data/audio/cues/ninki-nanka/scene-03.json";

export const ninkiNankaStory: Story = {
  id: "story-2",
  slug: "the-whispering-waters-of-ninki-nanka",
  title: "The Whispering Waters of Ninki Nanka",
  subtitle: "A river guardian's lesson in respect for living currents",
  description:
    "[Curated Folkloric Adaptation] Along the winding mangrove creeks of Kiang West, old fishermen tell of the great serpent guardian who protects the river's balance. A young boatman seeks sacred shells but discovers that greed stirs dangerous depths.",
  category: "legend",
  contentType: "adapted",
  ageRange: "all-ages",
  origin: {
    region: "River Gambia / Kiang West Mangroves",
    community: "Kiang West fishing communities along the bolongs",
    ethnicGroup: "Mandinka / Jola river folklore",
    culturalContext: "Literary adaptation of traditional Gambian river dragon / guardian folklore",
    isDemoPlaceholder: false,
  },
  editorialStatus: "published",
  provenance: {
    sourceType: "literary-adaptation",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Editorial adaptation by Tales of The Gambia",
    sourceRef: {
      notes: "Based on living Gambian folklore regarding Ninki Nanka, the mythical dragon-serpent guardian of the river swamplands and bolongs. Narrative and dialogue are original literary compositions.",
    },
    originalLanguage: "Mandinka folklore motif; written in English",
    historicalPeriod: "Living oral folkloric tradition",
    adaptationNotes:
      "Modern literary adaptation focusing on ecological respect and the legendary river guardian. Written into three visual scenes for digital storybook presentation.",
    authenticityStatement:
      "Ninki Nanka is a genuine, deeply rooted mythical river guardian in Gambian oral belief. This story is an original literary adaptation drawing on those cultural beliefs to explore themes of environmental reverence and restraint.",
  },
  narrative: {
    openingFormula:
      "Mansa-baa baa kono... The river does not merely flow past our villages; it breathes and listens.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The ripples smoothed, and the green bolong kept its secret safe once more.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "The river gives life to those who take with reverence, but closes its gates to those driven by boundless greed.",
    communalMoral:
      "The river gives life to those who take with reverence, but closes its gates to those driven by boundless greed.",
    contextualNotes: [
      "Bolong: The Mandinka term for the winding tidal creeks and mangrove tributaries branching from the main Gambia River.",
      "Ninki Nanka: A legendary dragon-like serpent spirit of Gambian folklore believed to dwell in deep swamplands and protect hidden waters.",
    ],
  },
  language: "English (Adapted)",
  narrator: "Kokoro synthetic voice (am_michael)",
  narrationLanguage: "en",
  availableLanguages: ["en"],
  readingTimeMinutes: 9,
  listeningDurationSeconds: 75,
  themes: ["Reverence for Nature", "The Sacred River", "Restraint"],
  characters: ["Samba the Boatman", "The Mangrove Elder", "The River Shadow"],
  characterProfiles: [
    {
      id: "samba",
      name: "Samba the Boatman",
      role: "protagonist",
      culturalSignificance:
        "Represents humanity's ambition and the necessary learning of humility when encountering nature's majestic balance.",
      traits: ["Daring", "Skilled", "Chastened"],
      avatarTheme: "boatman",
    },
    {
      id: "river-shadow",
      name: "The River Shadow",
      role: "guardian",
      culturalSignificance:
        "The primordial spirit of the river maintaining ecological justice and balance.",
      traits: ["Majestic", "Mysterious", "Ancient"],
      avatarTheme: "shadow",
    },
  ],
  coverImage: {
    src: "/images/stories/river-ninki.svg",
    alt: "Canoe gently gliding across mist-covered mangrove channels at twilight",
    paletteTheme: "river",
  },
  scenes: [
    {
      id: "scene-2-1",
      sceneNumber: 1,
      title: "Mist on the Kiang Creeks",
      text: "The Gambia River does not merely flow; it breathes. At twilight, when the tide turns and the green roots of the mangrove stand revealed like the ribcages of ancient giants, mist rises in silver coils. Samba dipped his wooden paddle into the dark current without making a single ripple, heading deep into the sacred bolong where few dared to fish.",
      narration: "The wooden dugout cuts through tranquil brackish waters...",
      backgroundGradient: "from-[#122A2E] via-[#101F22] to-[#0D1618]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "gentle",
      },
      characters: ["Samba the Boatman"],
      charactersData: [
        {
          id: "samba",
          name: "Samba the Boatman",
          position: "center",
          expression: "determined",
          motion: "subtle-float",
          avatarTheme: "boatman",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-whispering-waters-of-ninki-nanka/scene-01-narration.mp3",
        narrationDurationSeconds: 25.18,
        cues: ninkiCues01 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-2-2",
      sceneNumber: 2,
      title: "The Ripple in the Deep",
      text: "Legend warned that taking more than one needs wakes the dragon-serpent Ninki Nanka. Beneath Samba's canoe, the water darkened into bottomless emerald. Waves gathered without any wind. Two glowing jade reflections peered from the mirror-like deep, holding Samba's gaze until he gently released the glistening fish back into the sanctuary.",
      narration: "A low hum reverberated from the bed of the great river.",
      backgroundGradient: "from-[#1B3439] via-[#122327] to-[#0B1517]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 60 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "medium",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "gentle",
      },
      characters: ["Samba the Boatman", "The River Shadow"],
      charactersData: [
        {
          id: "samba",
          name: "Samba the Boatman",
          position: "left",
          expression: "awe",
          motion: "breathing",
          avatarTheme: "boatman",
        },
        {
          id: "shadow",
          name: "The River Shadow",
          position: "right",
          expression: "imposing",
          motion: "subtle-float",
          avatarTheme: "shadow",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-whispering-waters-of-ninki-nanka/scene-02-narration.mp3",
        narrationDurationSeconds: 24.98,
        cues: ninkiCues02 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-2-3",
      sceneNumber: 3,
      title: "Sanctuary Restored",
      text: "As the fish splashed beneath the mangrove roots, the violent swell subsided into glass. Samba bowed his head toward the deep, whispering words of gratitude. When he paddled back into the main river channel beneath the rising harvest moon, he carried no silver scales in his net — but he carried the peace of a river whose balance remained whole.",
      narration: "The moonlit waters returned to perfect stillness.",
      backgroundGradient: "from-[#0E1E21] via-[#0B1517] to-[#070D0E]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Samba the Boatman"],
      charactersData: [
        {
          id: "samba",
          name: "Samba the Boatman",
          position: "center",
          expression: "peaceful",
          motion: "breathing",
          avatarTheme: "boatman",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-whispering-waters-of-ninki-nanka/scene-03-narration.mp3",
        narrationDurationSeconds: 24.57,
        cues: ninkiCues03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
