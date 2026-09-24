import { Story, NarrationCue } from "@/types/story";
import morLamScene01 from "@/data/audio/cues/bone-of-mor-lam/scene-01.json";
import morLamScene02 from "@/data/audio/cues/bone-of-mor-lam/scene-02.json";
import morLamScene03 from "@/data/audio/cues/bone-of-mor-lam/scene-03.json";
import morLamScene04 from "@/data/audio/cues/bone-of-mor-lam/scene-04.json";
import morLamScene05 from "@/data/audio/cues/bone-of-mor-lam/scene-05.json";


export const boneOfMorLamStory: Story = {
  id: "story-bone-of-mor-lam",
  slug: "the-bone-of-mor-lam",
  title: "The Bone of Mor Lam",
  subtitle: "The satirical Senegambian comedy of stubborn greed, fake funerals, and extreme hospitality",
  description:
    "Mor Lam has acquired a magnificent, marrow-filled beef bone that promises the stew of a lifetime. But when his lifelong companion Moussa arrives at the compound gate—and traditional hospitality demands sharing every morsel—Mor Lam decides to fake a fatal illness, then a coma, and finally his own funeral, clinging to his deceit all the way to the village cemetery!",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Senegambia (Wolof communities across The Gambia and Senegal)",
    community: "Wolof oral comedic fireside tradition",
    ethnicGroup: "Wolof",
    culturalContext:
      "A masterpiece of Senegambian satire celebrated in the Wolof fireside repertoire and immortalized in Birago Diop's 'Les Contes d'Amadou Koumba'. It uses farcical comedy to mock pathological stinginess and the comic extremes of the sacred tradition of 'Teranga' (hospitality).",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Birago Diop (Tales of Amadou Koumba) and traditional Senegambian storytellers",
    sourceRef: {
      title: "L'Os de Mor Lam (The Bone of Mor Lam)",
      notes: "Transcribed from oral Wolof performances by Birago Diop and retold across Gambian radio and school drama troupes. Adapted into English with theatrical dialogue.",
    },
    originalLanguage: "Wolof oral tradition",
    historicalPeriod: "Timeless traditional village comedy",
    adaptationNotes:
      "Structured into five comedic scenes: the simmering bone, the visitor at the compound door, the dramatic feigned illness, the funeral procession to the graveyard, and the unforgettable conclusion on the kitchen hearth.",
    authenticityStatement:
      "This story is an authentic, universally recognized classic of the Senegambian oral comedic tradition.",
  },
  narrative: {
    openingFormula:
      "Taal bu daan! Clear your throats and prepare your ribs to ache, for tonight we speak of Mor Lam, whose belly was as stubborn as an iron anvil!",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever a neighbor drops by just as your pot begins to boil, smile, fetch an extra bowl, and remember poor Mor Lam.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "He who refuses to share a single spoonful of marrow with a friend will end up losing the entire pot to the dust.",
    communalMoral:
      "Hospitality (Teranga) is the soul of our community; greed turns a man into a laughingstock before living and dead alike.",
    contextualNotes: [
      "Teranga: The sacred Wolof philosophy of hospitality, generosity, and sharing food with every guest who darkens your threshold.",
      "Kadd: An indigenous acacia tree whose dense wood provides sweet-burning charcoal for slow-simmering village stews.",
      "Moussa: The archetypal persistent friend who knows his cultural rights to a share of any meal.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Satire", "Hospitality", "Greed", "Humor", "Friendship"],
  characters: ["Mor Lam", "Moussa his Friend", "Awa his Wife", "The Village Elders"],
  coverImage: {
    src: "/images/stories/clever-hare-hyena.svg",
    alt: "A man peeking frantically out from under a woven sleeping mat while a steaming clay pot bubbles on the hearth",
    paletteTheme: "earth",
  },
  featured: false,
  scenes: [
    {
      id: "scene-bml-1",
      sceneNumber: 1,
      title: "The Treasure in the Clay Pot",
      text: "Never in the history of the district had an ox yielded a bone quite like this. It was thick as a warrior’s forearm, glistening with pearls of white fat and packed to the marrow with rich, fragrant juices. Mor Lam had traded three baskets of dry fish and his favorite hunting knife for it at the weekly lumo market. As the pot bubbled over the slow kadd coals, filling the compound with an aroma that made the village dogs howl in longing, Mor Lam rubbed his round belly with reverent anticipation.",
      narration: "A beef bone so magnificent it made the village dogs howl in envy, bubbling gently over sweet kadd coals.",
      backgroundGradient: "from-[#2A180A] via-[#1B0F06] to-[#0D0703]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
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
      characters: ["Mor Lam", "Awa his Wife"],
      audio: {
        narrationUrl: "/audio/stories/the-bone-of-mor-lam/scene-01-narration.mp3",
        narrationDurationSeconds: 29.18,
        cues: morLamScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-bml-2",
      sceneNumber: 2,
      title: "A Shadow at the Threshold",
      text: "Just as Awa was reaching for the wooden ladle, a cheerful cough sounded at the compound gate. It was Moussa—Mor Lam's inseparable childhood friend, who possessed an uncanny sixth sense for boiling pots. By the sacred laws of Teranga, no guest could be turned away without an overflowing bowl. Mor Lam froze, horror dawning upon his face. 'If Moussa enters,' he hissed to his wife, 'half of my marrow is gone! Tell him I have fallen terribly ill! Tell him my soul is hovering near the threshold!'",
      narration: "The dread cough of a cheerful neighbor at dinner time—the ultimate test of African hospitality.",
      backgroundGradient: "from-[#22160C] via-[#160E07] to-[#0A0603]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 45 },
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
      characters: ["Mor Lam", "Moussa his Friend", "Awa his Wife"],
      audio: {
        narrationUrl: "/audio/stories/the-bone-of-mor-lam/scene-02-narration.mp3",
        narrationDurationSeconds: 29.3,
        cues: morLamScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-bml-3",
      sceneNumber: 3,
      title: "The Dying Man of the Compound",
      text: "Mor Lam leapt onto his sleeping platform, pulled a coarse indigo blanket over his chin, and began groaning with theatrical agony. Moussa rushed to his friend’s side, eyes wide with distress. 'Ah, my beloved brother!' Moussa wept, pulling up a low stool. 'I shall not leave your side for a single second until health returns to your limbs!' When hours passed and Moussa showed no signs of departure, Mor Lam closed his eyes, held his breath, and feigned a profound and sudden demise.",
      narration: "A groan worthy of a royal tragedy, all to keep a spoonful of marrow from a lifelong companion.",
      backgroundGradient: "from-[#181210] via-[#100C0A] to-[#060404]",
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
      characters: ["Mor Lam", "Moussa his Friend"],
      audio: {
        narrationUrl: "/audio/stories/the-bone-of-mor-lam/scene-03-narration.mp3",
        narrationDurationSeconds: 28.4,
        cues: morLamScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-bml-4",
      sceneNumber: 4,
      title: "The Funeral Procession",
      text: "Word spread that poor Mor Lam had passed away. The village elders arrived; the women wailed in ritual grief, and four strong cousins lifted the woven bier to carry him to the sandy cemetery. Beneath his shroud, Mor Lam's eyes were tightly shut, his jaw clamped tight. 'Moussa will surely go home now,' he told himself desperately. 'Once they lower the bier, I will leap up and race back to my pot!' But faithful Moussa walked at the very front of the procession, holding the chief mourner's staff.",
      narration: "Carried through the village on a woven bier, refusing to open his eyes lest he be forced to share his stew.",
      backgroundGradient: "from-[#24150A] via-[#180E06] to-[#0C0602]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
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
      characters: ["Mor Lam", "Moussa his Friend", "The Village Elders"],
      audio: {
        narrationUrl: "/audio/stories/the-bone-of-mor-lam/scene-04-narration.mp3",
        narrationDurationSeconds: 28.8,
        cues: morLamScene04 as NarrationCue[],
      },
      durationSeconds: 16,
    },
    {
      id: "scene-bml-5",
      sceneNumber: 5,
      title: "The Banquet of the Living",
      text: "At the open grave, as the imam raised his hands in final prayer, Mor Lam realized with stark terror that his stubborn pride had outsmarted his common sense. Meanwhile, back at the compound, Awa looked at the cooling pot of marrow. Convinced that grief required sustenance, she ladled the rich, golden stew into bowls for the mourning neighbors. By the time Mor Lam finally broke his trance and scrambled out of the cemetery, Moussa was sitting happily on his veranda, wiping a clean bone with a warm smile: 'Ah, Mor Lam! Even in your passing, your hospitality feeds the village!'",
      narration: "A lesson written in marrow and laughter: the food was shared, and the miser learned the true price of his greed.",
      backgroundGradient: "from-[#28180A] via-[#1A0F06] to-[#0A0502]",
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
        type: "fire-flicker",
        intensity: "subtle",
      },
      characters: ["Mor Lam", "Moussa his Friend", "Awa his Wife"],
      audio: {
        narrationUrl: "/audio/stories/the-bone-of-mor-lam/scene-05-narration.mp3",
        narrationDurationSeconds: 37.95,
        cues: morLamScene05 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
