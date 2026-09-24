import { Story, NarrationCue } from "@/types/story";
import fodayScene01 from "@/data/audio/cues/foday-kaba/scene-01.json";
import fodayScene02 from "@/data/audio/cues/foday-kaba/scene-02.json";
import fodayScene03 from "@/data/audio/cues/foday-kaba/scene-03.json";
import fodayScene04 from "@/data/audio/cues/foday-kaba/scene-04.json";
import fodayScene05 from "@/data/audio/cues/foday-kaba/scene-05.json";


export const fodayKabaMedinaStory: Story = {
  id: "story-foday-kaba",
  slug: "foday-kaba-and-the-stockade-of-medina",
  title: "Foday Kaba and the Stockade of Medina",
  subtitle: "The legendary resistance leader of Kiang and Foni during the Soninke-Marabout Wars",
  description:
    "For more than twenty years, Foday Kaba Dumbuya stood as an unyielding fortress along the south bank of the River Gambia. Hidden behind impenetrable mahogany palisades and tangled mangrove waterways at Medina, he outmaneuvered colonial gunboats and rival warlords, forging a legend of defiant independence that transformed the history of the Fonis.",
  category: "historical",
  contentType: "historical",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Kiang, Foni, and the South Bank waterways)",
    community: "Mandinka oral traditions and colonial frontier history",
    ethnicGroup: "Mandinka",
    culturalContext:
      "A monumental chapter of 19th-century Gambian history during the Soninke-Marabout Wars (c. 1850–1901). Foday Kaba Dumbuya was one of the most formidable anti-colonial resistance leaders on the south bank of the River Gambia, known for his defensive fortress (tata) architecture at Medina.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "archival-manuscript",
    provenanceConfidence: "documented",
    collectorOrAuthor: "B.K. Sidibe and Hassoum Ceesay (National Centre for Arts and Culture, The Gambia)",
    sourceRef: {
      title: "Foday Kaba Dumbuya and the Resistance of Medina",
      notes: "Documented in Hassoum Ceesay's historical essays and B.K. Sidibe's oral recordings on the 19th-century Soninke-Marabout conflicts in Kiang and Foni.",
    },
    originalLanguage: "Mandinka oral accounts and British colonial archives",
    historicalPeriod: "Late 19th century (c. 1875–1901)",
    adaptationNotes:
      "Structured into five dramatic scenes depicting the construction of the forest stockade, the arrival of British river steamers, the night battle among the mangrove creeks, the council of Kiang elders, and the lasting legend of Foday Kaba.",
    authenticityStatement:
      "This story is an authentic, thoroughly documented historical narrative grounded in the archives of the National Centre for Arts and Culture (NCAC) in Banjul.",
  },
  historicalContext: {
    era: "Late 19th century",
    approximateDate: "c. 1877–1901",
    location: "Medina, Kiang and Foni districts, South Bank of The Gambia",
    documentedFigures: ["Foday Kaba Dumbuya", "Commissioner F.C. Sitwell", "Mansakunda of Kiang"],
    documentedEvents: ["The Soninke-Marabout Wars", "The Siege of Medina (1901)"],
    narrativeReconstructionNotes:
      "The architectural details of the tata (double mahogany log palisades, subterranean trenches), the chronology of colonial expeditions, and the leader's final stand are historically verified. Dialogue is reconstructed to convey the martial and spiritual rhetoric of the era.",
  },
  narrative: {
    openingFormula:
      "Bismillah... Listen to the memory of the south bank, where the mangrove roots run deep and the ironwood palisades kept foreign kings at bay.",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "The forest reclaim the old trenches, but the courage of the south bank remains rooted like the ancient baobab.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "He who knows his homeland’s creeks and soil can stand firm against the strongest storms of the world.",
    communalMoral:
      "Freedom is not a gift granted by strangers; it is maintained by unwavering vigilance and unity.",
    contextualNotes: [
      "Tata: A traditional West African fortified citadel constructed of dense hardwood tree trunks, earth ramparts, and firing loopholes.",
      "Bolong: The Mandinka word for a creek, estuary tributary, or tidal channel branching from the River Gambia.",
      "Marabout: A Muslim scholar, teacher, and in 19th-century Gambian history, often a political and military leader.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Resistance", "Tactical Genius", "Landscape Mastery", "Sovereignty"],
  characters: ["Foday Kaba Dumbuya", "Commander Sanneh", "The Kiang Scout"],
  coverImage: {
    src: "/images/stories/stone-circles.svg",
    alt: "A fortified wooden stockade constructed from heavy timber palisades surrounded by thick green mangrove waterways",
    paletteTheme: "forest",
  },
  featured: false,
  scenes: [
    {
      id: "scene-fk-m-1",
      sceneNumber: 1,
      title: "The Stockade in the Ironwood",
      text: "Deep in the dense forests between Kiang and the Casamance border, where foreign maps showed only green wilderness, rose the fortified citadel of Medina. Foday Kaba Dumbuya did not build with soft mud that washed away in the August rains. He felled thousands of massive mahogany and ironwood trees, driving them two fathoms into the earth in double parallel palisades packed with red clay and broken river rock. Behind these walls lived blacksmiths forging muskets, scholars teaching the Quran, and cavalrymen who could ride through mangrove mud without leaving a trace.",
      narration: "A wooden fortress of ironwood and red clay, built deep where no foreign map could follow.",
      backgroundGradient: "from-[#101E10] via-[#0A140A] to-[#040804]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 40 },
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
      characters: ["Foday Kaba Dumbuya"],
      audio: {
        narrationUrl: "/audio/stories/foday-kaba-and-the-stockade-of-medina/scene-01-narration.mp3",
        narrationDurationSeconds: 41.6,
        cues: fodayScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-fk-m-2",
      sceneNumber: 2,
      title: "The Steamers on the River",
      text: "From the British garrison in Bathurst, armored paddle-steamers churned up the brown river, their brass guns glinting in the midday sun. Colonial dispatches described Foday Kaba as an outlaw who refused customs taxes, tore down boundary stones, and gave sanctuary to runaway captives from neighboring territories. When British envoys arrived at the mouth of the creek bearing treaties printed on parchment, Foday Kaba received them under the shade of a silk-cotton tree. 'You brought paper across the sea,' he told them calmly. 'We hold this soil by the bones of our fathers. Paper does not grow in Kiang.'",
      narration: "Colonial steamers steamed up the river with parchment treaties; the warrior replied with the ancient claim of the soil.",
      backgroundGradient: "from-[#141C1A] via-[#0C1210] to-[#060806]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "pan-right",
        intensity: "subtle",
        durationSeconds: 14,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["Foday Kaba Dumbuya"],
      audio: {
        narrationUrl: "/audio/stories/foday-kaba-and-the-stockade-of-medina/scene-02-narration.mp3",
        narrationDurationSeconds: 42.0,
        cues: fodayScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-fk-m-3",
      sceneNumber: 3,
      title: "The Labyrinth of the Bolongs",
      text: "When naval expeditions attempted to march into the interior, they found the land itself had become a fortress. Foday Kaba’s scouts felled gigantic baobabs across the narrow creeks, blocking gunboats in the shallows. In the swampy labyrinth where mosquitoes swarmed like smoke, every bend in the mangrove concealed riflemen standing chest-deep in water. Troops marched in circles for days, baffled by paths that vanished at high tide and reappeared at dusk, while Foday Kaba’s cavalry slipped silently from village to village along secret sand ridges.",
      narration: "The winding tidal bolongs became a defensive maze where foreign troops marched in helpless circles.",
      backgroundGradient: "from-[#0E1A16] via-[#08120E] to-[#040806]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["The Kiang Scout", "Commander Sanneh"],
      audio: {
        narrationUrl: "/audio/stories/foday-kaba-and-the-stockade-of-medina/scene-03-narration.mp3",
        narrationDurationSeconds: 39.75,
        cues: fodayScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-fk-m-4",
      sceneNumber: 4,
      title: "The Defiance of Medina",
      text: "For more than two decades, while kingdoms across West Africa fell to European partition, Medina remained an unconquered island of African autonomy. Merchants from as far as Mali and Guinea brought gold and horses to trade in safety behind its palisades. Foday Kaba governed with an iron discipline, establishing courts of Islamic law and protecting the rural farmers from slave raiders. When foreign artillery finally laid siege to the fortress in 1901 with joint British and French regiments, the old lion refused every offer of exile, fighting beside his captains until the last timber fell.",
      narration: "Twenty years of sovereignty carved out of the wilderness, standing as an island of African independence.",
      backgroundGradient: "from-[#20150A] via-[#140E06] to-[#080502]",
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
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Foday Kaba Dumbuya", "Commander Sanneh"],
      audio: {
        narrationUrl: "/audio/stories/foday-kaba-and-the-stockade-of-medina/scene-04-narration.mp3",
        narrationDurationSeconds: 45.0,
        cues: fodayScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-fk-m-5",
      sceneNumber: 5,
      title: "The Legacy of the South Bank",
      text: "Today, tall elephant grass grows over the ancient ramparts of Medina, and the ironwood posts have dissolved into the fertile soil. But throughout Kiang and Foni, the elders still recount the courage of the man who refused to sell his homeland for promises of brass coin. His name is remembered in the songs of the jelilu and the proud traditions of the south bank—a reminder that courage in defense of freedom leaves an imprint that no empire can ever erase.",
      narration: "The palisades have dissolved into the rich earth, but the unyielding spirit of Medina lives on in Gambian memory.",
      backgroundGradient: "from-[#121A12] via-[#0A100A] to-[#040604]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 45 },
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
      characters: ["Foday Kaba Dumbuya"],
      audio: {
        narrationUrl: "/audio/stories/foday-kaba-and-the-stockade-of-medina/scene-05-narration.mp3",
        narrationDurationSeconds: 31.62,
        cues: fodayScene05 as NarrationCue[],
      },
      durationSeconds: 15,
    },
  ],
};
