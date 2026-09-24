import { Story, NarrationCue } from "@/types/story";
import pangolinScene01 from "@/data/audio/cues/little-pangolin/scene-01.json";
import pangolinScene02 from "@/data/audio/cues/little-pangolin/scene-02.json";


export const littlePangolinStory: Story = {
  id: "story-4",
  slug: "the-little-pangolin-who-counted-stars",
  title: "The Little Pangolin Who Counted Stars",
  subtitle: "A gentle bedtime fable about wonder and finding one's place",
  description:
    "[Contemporary Original Fiction] When dusk blankets the woodlands of Abuko, Little Pangolin climbs to the highest termite mound to count the stars shining over the river canopy. A soothing children's tale designed for calm evenings.",
  category: "children",
  contentType: "original-fiction",
  ageRange: "children",
  origin: {
    region: "Abuko Nature Reserve",
    community: "Abuko Nature Reserve",
    ethnicGroup: "Contemporary children's fiction",
    culturalContext: "Original contemporary wildlife bedtime fiction inspired by Gambian fauna",
    isDemoPlaceholder: false,
  },
  editorialStatus: "published",
  provenance: {
    sourceType: "contemporary-fiction",
    provenanceConfidence: "original-fiction",
    collectorOrAuthor: "Original fiction by Tales of The Gambia",
    sourceRef: {
      notes: "Original children's narrative inspired by Gambian conservation ecology at Abuko Nature Reserve.",
    },
    originalLanguage: "English",
    historicalPeriod: "Modern contemporary setting",
    adaptationNotes:
      "Original story written to introduce young readers to the endangered African pangolin and Gambian nature sanctuaries.",
    authenticityStatement:
      "This story is explicitly an original contemporary fiction. It does not claim ancient folkloric origin, but is inspired by the native wildlife of The Gambia's Abuko Nature Reserve.",
  },
  narrative: {
    openingFormula:
      "Once upon a quiet twilight, where the mahogany trees touch the sky...",
    openingFormulaSource: "original",
    closingFormula:
      "Curled up like a golden pinecone, Little Pangolin closed his eyes and drifted into dreamland.",
    closingFormulaSource: "original",
    culturalMoral:
      "Every small creature has an important place beneath the great sky of the world.",
    communalMoral:
      "Every small creature has an important place beneath the great sky of the world.",
    contextualNotes: [
      "Abuko Nature Reserve: The Gambia's oldest protected nature sanctuary, located near Lamin, famous for its lush gallery forest and diverse wildlife.",
      "Pangolin: A gentle, nocturnal mammal covered in protective keratin scales, native to tropical African woodlands.",
    ],
  },
  language: "English (Original)",
  availableLanguages: ["en"],
  readingTimeMinutes: 5,
  listeningDurationSeconds: 300,
  themes: ["Wonder", "Nighttime", "Friendship", "Patience"],
  characters: ["Little Pangolin", "Mama Pangolin", "The Friendly Bushbaby"],
  characterProfiles: [
    {
      id: "little-pangolin",
      name: "Little Pangolin",
      role: "protagonist",
      culturalSignificance:
        "Symbolizes youthful curiosity, wonder, and the sweetness of evening peace.",
      traits: ["Curious", "Gentle", "Sleepy"],
      avatarTheme: "pangolin",
    },
  ],
  coverImage: {
    src: "/images/stories/little-pangolin.svg",
    alt: "Cute little pangolin resting peacefully on a branch beneath bright African night stars",
    paletteTheme: "forest",
  },
  scenes: [
    {
      id: "scene-4-1",
      sceneNumber: 1,
      title: "When the Crickets Begin to Hum",
      text: "One by one, the birds tucked their heads beneath their wings in the branches of Abuko. The great mahogany trees sighed in the cool breeze that drifted from the sea. Little Pangolin uncurled his shiny golden scales, blinked his dark eyes, and looked up at the first evening star sparkling through the leaves.",
      narration: "A soft hush descends upon the forest canopy...",
      backgroundGradient: "from-[#162B1D] via-[#101E15] to-[#0C150F]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 40 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 12,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Little Pangolin", "Mama Pangolin"],
      charactersData: [
        {
          id: "little-pangolin",
          name: "Little Pangolin",
          position: "center",
          expression: "curious",
          motion: "subtle-float",
          avatarTheme: "pangolin",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-little-pangolin-who-counted-stars/scene-01-narration.mp3",
        narrationDurationSeconds: 19.45,
        cues: pangolinScene01 as NarrationCue[],
      },
      durationSeconds: 12,
    },
    {
      id: "scene-4-2",
      sceneNumber: 2,
      title: "One, Two, Sleepy Eyes",
      text: "'One star for the baobab,' Little Pangolin whispered, 'two stars for the sleeping river, three stars for Mama's warm embrace.' With a tiny yawn, he curled into a neat, safe ball, cradled by the soft earth until morning.",
      narration: "Breathe in slowly... and let the quiet night cradle your dreams.",
      backgroundGradient: "from-[#112318] via-[#0D1A12] to-[#0A130E]",
      visual: {
        type: "illustration",
        paletteTheme: "forest",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 13,
      },
      environmentMotion: {
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Little Pangolin"],
      charactersData: [
        {
          id: "little-pangolin",
          name: "Little Pangolin",
          position: "center",
          expression: "sleepy",
          motion: "breathing",
          avatarTheme: "pangolin",
        },
      ],
      audio: {
        narrationUrl: "/audio/stories/the-little-pangolin-who-counted-stars/scene-02-narration.mp3",
        narrationDurationSeconds: 14.7,
        cues: pangolinScene02 as NarrationCue[],
      },
      durationSeconds: 13,
    },
  ],
};
