import { Story, NarrationCue } from "@/types/story";
import kansalaScene01 from "@/data/audio/cues/fall-of-kansala/scene-01.json";
import kansalaScene02 from "@/data/audio/cues/fall-of-kansala/scene-02.json";
import kansalaScene03 from "@/data/audio/cues/fall-of-kansala/scene-03.json";
import kansalaScene04 from "@/data/audio/cues/fall-of-kansala/scene-04.json";
import kansalaScene05 from "@/data/audio/cues/fall-of-kansala/scene-05.json";
import kansalaScene06 from "@/data/audio/cues/fall-of-kansala/scene-06.json";


export const fallOfKansalaStory: Story = {
  id: "story-fall-of-kansala",
  slug: "the-fall-of-kansala",
  title: "The Fall of Kansala",
  subtitle: "The epic of the Kaabu Empire, Mansa Dianke Wali, and the sacred kora song of the Nyanchos",
  description:
    "In 1867, after more than six centuries of Mandinka imperial glory, the great fortified capital of Kansala stood surrounded by the allied armies of Fouta Djallon. Rather than accept subjugation, Emperor Mansa Dianke Wali Sanneh and his legendary Nyancho warriors chose an act of defiant immortality that echoed through Senegambian kora music forever.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Senegambia (Historic Kaabu Empire, Upper Casamance and River Gambia basin)",
    community: "Mandinka oral epic tradition and Jelilu kora masters",
    ethnicGroup: "Mandinka",
    culturalContext:
      "The definitive historical tragedy of the Senegambia region. The fall of Kansala in 1867 marked the end of the Kaabu Empire (a successor state of Old Mali founded by Tiramang Traore in the 13th century). The battle gave birth to the sacred kora piece 'Kansala' or 'Kelefa Ba', performed with solemn reverence by Gambian griots.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "archival-manuscript",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Alhaji Bakari Kebba (B.K.) Sidibe (Oral History and Antiquities Division / NCAC) and Gordon Innes",
    sourceRef: {
      title: "The Fall of Kaabu / The Battle of Kansala",
      notes: "Documented extensively by B.K. Sidibe across archival field recordings in The Gambia and Guinea-Bissau, and translated in 'Kaabu and Fuladu' (1974). Preserved by grand griots including Amadu Bansang Jobarteh.",
    },
    originalLanguage: "Mandinka oral epic",
    historicalPeriod: "1867 CE (19th century)",
    adaptationNotes:
      "Rendered into six epic scenes documenting the fortified capital of Kansala, the assembly of the Nyancho warriors, the eleven-day siege, the griot playing amidst battle, the climactic fire of Dianke Wali, and the eternal legacy of the Kansala kora melody.",
    authenticityStatement:
      "This epic is one of the most rigorously documented oral traditions in West Africa, archived by the National Centre for Arts and Culture (NCAC) under B.K. Sidibe.",
  },
  historicalContext: {
    era: "19th century",
    approximateDate: "May 1867",
    location: "Kansala (Imperial capital of Kaabu, historic Senegambia)",
    documentedFigures: ["Mansa Dianke Wali Sanneh", "Almamy Alpha of Timbo", "Jali Bamba Suso"],
    documentedEvents: ["The Battle of Kansala (May 1867)", "The Fall of the Kaabu Empire"],
    narrativeReconstructionNotes:
      "The historical timeline, the eleven-day siege duration, the names of the leaders, and Dianke Wali's firing of the gunpowder reserves are verified historical facts recorded by oral historians. The atmospheric dialogue and poetic transitions are composed with deep fidelity to Mandinka praise-song rhetoric.",
  },
  narrative: {
    openingFormula:
      "Bismillah... Let the 21 strings be tuned to the key of Tomora, and listen to the song of Kansala, where kings stood taller than mountains.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The walls of Kansala returned to the red earth, but the kora holds its name where no sword can ever touch it.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "Courage is not the absence of loss; it is the refusal to bow down when dignity is at stake.",
    communalMoral:
      "A civilization is not remembered by the stone of its walls, but by the honor of its people and the truth of its songs.",
    contextualNotes: [
      "Kaabu: A major Mandinka empire that dominated the Senegambia region from the 13th to the late 19th century.",
      "Nyancho: The aristocratic warrior caste of Kaabu known for supreme martial chivalry and fearlessness.",
      "Mansa: The Mandinka title for Emperor or Sovereign King.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 8,
  listeningDurationSeconds: 480,
  themes: ["Imperial History", "Honor", "Courage", "Kora Heritage", "Remembrance"],
  characters: ["Mansa Dianke Wali Sanneh", "The Royal Jali", "The Nyancho Guard"],
  coverImage: {
    src: "/images/stories/kelefa-saane.svg",
    alt: "A fortified red clay fortress standing against a dramatic amber sunset while a griot holds a kora before the gate",
    paletteTheme: "ochre",
  },
  featured: false,
  scenes: [
    {
      id: "scene-fk-1",
      sceneNumber: 1,
      title: "The Red Walls of Kansala",
      text: "For more than six hundred years, the sun had never set upon an empire as proud as Kaabu. From the banks of the River Gambia south to the highlands of Fouta Djallon, thirty-two vassal kingdoms paid tribute to Kansala. Its ramparts were built of thick, sun-baked red clay, ringed by triple moats and deep thorn palisades. Within its courtyards walked the Nyanchos—nobles who wore silk amulets, rode stallions groomed with sweet river oil, and swore never to take a single step backward in battle.",
      narration: "Six centuries of imperial glory standing tall behind the red clay ramparts of Kansala.",
      backgroundGradient: "from-[#2A1208] via-[#1B0B04] to-[#0D0502]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Mansa Dianke Wali Sanneh", "The Nyancho Guard"],
      audio: {
        narrationUrl: "/audio/stories/the-fall-of-kansala/scene-01-narration.mp3",
        narrationDurationSeconds: 37.88,
        cues: kansalaScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-fk-2",
      sceneNumber: 2,
      title: "The Gathering of the Storm",
      text: "In the dry season of 1867, dust rose on the eastern horizon like a thunderhead. The allied armies of the Fula jihad, led by Almamy Alpha of Timbo, had crossed the river with thousands of cavalry and riflemen. Inside the imperial council chamber, messengers delivered the ultimatum: surrender the fortress, tear down the ancestral shrines, and bend the knee. Mansa Dianke Wali rose from his carved ebony stool. He did not raise his voice. 'A Nyancho does not bend,' he answered. 'A Nyancho either rules, or dies where he stands.'",
      narration: "An army of thousands demanded surrender; the Emperor answered with the immortal vow of the Nyancho.",
      backgroundGradient: "from-[#24150A] via-[#180E06] to-[#0C0602]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "wind",
        intensity: "gentle",
      },
      characters: ["Mansa Dianke Wali Sanneh"],
      audio: {
        narrationUrl: "/audio/stories/the-fall-of-kansala/scene-02-narration.mp3",
        narrationDurationSeconds: 39.7,
        cues: kansalaScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-fk-3",
      sceneNumber: 3,
      title: "Eleven Days of Thunder",
      text: "The siege began with the roar of brass cannons. For eleven days and eleven nights, the red walls of Kansala shuddered under cannonades and surging infantry assaults. Wave after wave broke against the palisades, repelled by the archery and musketry of the defenders. The wells inside the fortress ran dry; the grain storehouses burned into ash, but Dianke Wali walked the ramparts each morning in white damask robes, encouraging his soldiers and speaking words of calm courage to the mothers and children gathered in the inner keep.",
      narration: "Eleven days and nights the walls trembled, held together by iron will and dry throats.",
      backgroundGradient: "from-[#2C1808] via-[#1E0F04] to-[#0E0602]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Mansa Dianke Wali Sanneh", "The Nyancho Guard"],
      audio: {
        narrationUrl: "/audio/stories/the-fall-of-kansala/scene-03-narration.mp3",
        narrationDurationSeconds: 39.25,
        cues: kansalaScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-fk-4",
      sceneNumber: 4,
      title: "The Kora Amidst the Smoke",
      text: "On the tenth night, when ammunition was nearly exhausted and the outer walls began to breach, the royal jali climbed to the highest watchtower. He carried no shield and no rifle—only his 21-stringed kora. As smoke curled past his face, his fingers found the strings. He did not play a retreat; he played the genealogy of every clan in Kaabu, singing of their ancestors who crossed the Manding mountains six hundred years before. The defenders wept not from fear, but from the unbearable beauty of their own history ringing out in the night.",
      narration: "A griot on the smoky watchtower, playing twenty-one strings of history into the gathering dark.",
      backgroundGradient: "from-[#1C141E] via-[#100C12] to-[#060408]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "fire-flicker",
        intensity: "subtle",
      },
      characters: ["The Royal Jali"],
      audio: {
        narrationUrl: "/audio/stories/the-fall-of-kansala/scene-04-narration.mp3",
        narrationDurationSeconds: 38.55,
        cues: kansalaScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-fk-5",
      sceneNumber: 5,
      title: "The Fire of Dianke Wali",
      text: "At dawn on the eleventh day, the main gate collapsed. Thousands poured into the breached courtyard, shouting victory. But Mansa Dianke Wali had already gathered the remaining royal council inside the subterranean gunpowder vaults. He looked at his commanders, nodded in solemn brotherhood, and touched a flaming torch to the iron magazines. A deafening roar shook the earth for forty miles across the savannas. When the smoke cleared, the fortress of Kansala had vanished into legend, leaving nothing for the conquerors to chain.",
      narration: "A flash of white fire lit the sky, ending an empire on its own terms with unbroken honor.",
      backgroundGradient: "from-[#281006] via-[#1A0803] to-[#0A0301]",
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
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Mansa Dianke Wali Sanneh"],
      audio: {
        narrationUrl: "/audio/stories/the-fall-of-kansala/scene-05-narration.mp3",
        narrationDurationSeconds: 37.75,
        cues: kansalaScene05 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-fk-6",
      sceneNumber: 6,
      title: "The Song That Conquered Time",
      text: "The empire of Kaabu was gone, but the griots who survived carried the memory down the River Gambia to Brikama, Janjanbureh, and Barra. They composed the melody 'Kansala'—a tune so sacred that even today, when a master jali strikes its opening notes, listeners stand in silent respect. The physical city became grass and red dust, but the spirit of Dianke Wali lives on in the calabash of every kora, reminding all who listen that true sovereignty can never be conquered.",
      narration: "The red dust settled, but the kora carried Kansala into eternity where no army could follow.",
      backgroundGradient: "from-[#1E1610] via-[#120D08] to-[#060402]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["The Royal Jali"],
      audio: {
        narrationUrl: "/audio/stories/the-fall-of-kansala/scene-06-narration.mp3",
        narrationDurationSeconds: 34.45,
        cues: kansalaScene06 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
