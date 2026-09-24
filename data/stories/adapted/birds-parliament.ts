import { Story, NarrationCue } from "@/types/story";
import birdsScene01 from "@/data/audio/cues/birds-parliament/scene-01.json";
import birdsScene02 from "@/data/audio/cues/birds-parliament/scene-02.json";
import birdsScene03 from "@/data/audio/cues/birds-parliament/scene-03.json";
import birdsScene04 from "@/data/audio/cues/birds-parliament/scene-04.json";


export const birdsParliamentStory: Story = {
  id: "story-birds-parliament",
  slug: "the-birds-parliament",
  title: "The Birds' Parliament",
  subtitle: "The Gambian ecological fable of seasonal drought, the great river migration, and the wisdom of the small",
  description:
    "When the fierce dry harmattan wind shrinks the waters of the River Gambia into shallow pools, the feathered inhabitants of the wetlands gather on a sandbank near Janjanbureh. As the mighty Fish Eagle and the haughty Marabou Stork demand the lion's share of the remaining fish, a tiny Pied Kingfisher steps forth with an ingenious treaty that preserves life for the entire river delta.",
  category: "fable",
  contentType: "traditional",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "The Gambia (Central River Region wetlands, Janjanbureh, and Baobolong reserve)",
    community: "Riverine Gambian oral and ecological storytelling",
    ethnicGroup: "Pan-Gambian Riverine tradition",
    culturalContext:
      "Documented by Sukai Mbye Bojang in 'Folk Tales and Fables from The Gambia' (Vol. 3, Chapter 2: 'The Birds Migrate'). The River Gambia is one of the most vital bird sanctuaries in West Africa, hosting hundreds of migratory species. This fable reflects traditional ecological knowledge and wetland resource sharing.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "documented",
    collectorOrAuthor: "Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 3)",
    sourceRef: {
      title: "The Birds Migrate / The Council of Feathers",
      notes: "Documented in Sukai Mbye Bojang's collection of Gambian folktales. Adapted into an ecological dialogue on shared resources and wildlife preservation.",
    },
    originalLanguage: "Mandinka and Wolof oral fables",
    historicalPeriod: "Timeless ecological fable",
    adaptationNotes:
      "Structured into four atmospheric scenes: the arrival of the dry harmattan, the gathering of the birds upon the sandbank, the debate over the fish pools, and the harmonious treaty of the river banks.",
    authenticityStatement:
      "This story is an authentic Gambian wildlife fable rooted in the living biodiversity and oral traditions of the River Gambia basin.",
  },
  narrative: {
    openingFormula:
      "Look up toward the acacia branches when the dry wind sings, and listen to the parliament of wings upon the river...",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever you see the kingfisher dive with a silver splash, remember that the river has enough for every beak that drinks in peace.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "The river belongs to no single creature; survival during drought requires sharing the shallows, not claiming the deep.",
    communalMoral:
      "In times of scarcity, wisdom and fairness protect a community far better than claws and sharp talons.",
    contextualNotes: [
      "Harmattan: The dry, dusty trade wind that blows from the Sahara over West Africa between November and March.",
      "Fish Eagle: The apex avian predator along the River Gambia, known for its piercing cry and dramatic dives.",
      "Janjanbureh: A historic island town in the middle reaches of the River Gambia surrounded by rich wetland ecosystems.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 6,
  listeningDurationSeconds: 360,
  themes: ["Ecology", "Fairness", "Dialogue", "Coexistence", "Wisdom"],
  characters: ["The Little Kingfisher", "The Great Fish Eagle", "The Sacred Ibis", "The Marabou Stork"],
  coverImage: {
    src: "/images/stories/ninki-nanka.svg",
    alt: "A diverse flock of colorful river birds perched along a sunlit sandbank in the River Gambia while an eagle circles above",
    paletteTheme: "river",
  },
  featured: false,
  scenes: [
    {
      id: "scene-bp-1",
      sceneNumber: 1,
      title: "The Breath of the Harmattan",
      text: "The November winds arrived out of the north, veiled in fine Saharan dust that turned the afternoon sun into a pale copper disk. Day by day, the great River Gambia pulled back from the grassy floodplains, leaving behind scattered, isolated lagoons where silver minnows and mudfish swarmed in shrinking water. From Senegal, Guinea, and distant northern marshes, flocks of birds arrived by the tens of thousands, their wings beating a steady rhythm against the hazy sky.",
      narration: "The northern wind brought the harmattan veil, shrinking the great river into pools of glistening survival.",
      backgroundGradient: "from-[#20180E] via-[#140F08] to-[#0A0704]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
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
      characters: ["The Little Kingfisher", "The Great Fish Eagle"],
      audio: {
        narrationUrl: "/audio/stories/the-birds-parliament/scene-01-narration.mp3",
        narrationDurationSeconds: 29.45,
        cues: birdsScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-bp-2",
      sceneNumber: 2,
      title: "The Assembly on the White Sandbank",
      text: "Near Janjanbureh, where the river splits around the historic island, a broad white sandbank emerged from the shallows. The Sacred Ibis—venerated for her solemn step and curved beak—struck the water three times to summon the feathered parliament. The Great Fish Eagle took his seat on a stranded driftwood trunk, flexing talons that could snap an oar. Beside him stood the Marabou Stork, hunched in his gray coat like an impatient judge, while thousands of herons, egrets, and tiny sandpipers crowded the muddy edges.",
      narration: "A grand council of feathers upon the white sandbank, called to decide the fate of the remaining fish.",
      backgroundGradient: "from-[#18201C] via-[#0E1410] to-[#060A08]",
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
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["The Sacred Ibis", "The Great Fish Eagle", "The Marabou Stork"],
      audio: {
        narrationUrl: "/audio/stories/the-birds-parliament/scene-02-narration.mp3",
        narrationDurationSeconds: 33.23,
        cues: birdsScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-bp-3",
      sceneNumber: 3,
      title: "The Claim of the Talons",
      text: "The Fish Eagle opened his wings, casting a dark shadow over the assembly. 'The water is low, and meat is scarce,' he shrieked. 'By the law of the sky, the largest wings must have the first and deepest pools! The small birds may pick what falls upon the mud once our bellies are filled.' The Marabou Stork clattered his massive bill in greedy approval, stepping forward to claim the deepest fishing pool where the prized catfish had gathered.",
      narration: "The strong asserted their claim over the deep water, threatening war where thirst was already king.",
      backgroundGradient: "from-[#22140A] via-[#160C05] to-[#0A0602]",
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
        type: "wind",
        intensity: "gentle",
      },
      characters: ["The Great Fish Eagle", "The Marabou Stork"],
      audio: {
        narrationUrl: "/audio/stories/the-birds-parliament/scene-03-narration.mp3",
        narrationDurationSeconds: 26.05,
        cues: birdsScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-bp-4",
      sceneNumber: 4,
      title: "The Treaty of the River Banks",
      text: "Before fear could silence the smaller creatures, the Pied Kingfisher fluttered onto a reed right before the eagle’s eyes. 'Great King of the sky,' the little bird chirped fearlessly. 'If your talons drive us away from the shallows, who will watch the river reeds to warn you when the crocodile rises? Who will disturb the weed beds so the large fish swim up into your view? A river where only the strong eat will soon become a river where the strong starve alone.' The truth struck like an arrow. The Eagle bowed his white-crowned head. The birds divided the pools by hours—some by dawn, some by dusk—and the river sustained every wing until the rains returned.",
      narration: "A fearless little kingfisher taught the eagle that community and shared waters are the true shield against famine.",
      backgroundGradient: "from-[#0E1E24] via-[#081216] to-[#04080A]",
      visual: {
        type: "illustration",
        paletteTheme: "river",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "subtle",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "river-ripples",
        intensity: "subtle",
      },
      characters: ["The Little Kingfisher", "The Great Fish Eagle"],
      audio: {
        narrationUrl: "/audio/stories/the-birds-parliament/scene-04-narration.mp3",
        narrationDurationSeconds: 38.62,
        cues: birdsScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
