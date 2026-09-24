import { Story, NarrationCue } from "@/types/story";
import fariScene01 from "@/data/audio/cues/fari-queen/scene-01.json";
import fariScene02 from "@/data/audio/cues/fari-queen/scene-02.json";
import fariScene03 from "@/data/audio/cues/fari-queen/scene-03.json";
import fariScene04 from "@/data/audio/cues/fari-queen/scene-04.json";
import fariScene05 from "@/data/audio/cues/fari-queen/scene-05.json";


export const fariQueenOfDonkeysStory: Story = {
  id: "story-fari-queen-of-donkeys",
  slug: "fari-queen-of-the-wild-donkeys",
  title: "Fari, Queen of the Wild Donkeys",
  subtitle: "The witty Senegambian fable of shape-shifting, courtly vanity, and the call of true nature",
  description:
    "Tired of bearing heavy water jars and baskets of groundnuts under the hot sun, Fari, Queen of the wild donkeys, leads her loyal herd to magically shed their gray coats and transform into exquisite courtly maidens. In the grand palace of the king, they live as royalty—until the irresistible taste of rock salt and the wild rhythm of traditional sabar drums test their secret.",
  category: "folktale",
  contentType: "adapted",
  editorialStatus: "published",
  ageRange: "all-ages",
  origin: {
    region: "Senegambia (Walo and River Gambia savannas)",
    community: "Wolof oral tradition",
    ethnicGroup: "Wolof",
    culturalContext:
      "A cherished comedic and moral folktale in the Senegambian storytelling repertoire, documented both in oral folklore collected by Sukai Mbye Bojang and the classic stories of Birago Diop. It uses humor to examine vanity and identity.",
    isDemoPlaceholder: false,
  },
  provenance: {
    sourceType: "oral-tradition",
    provenanceConfidence: "editorial-adaptation",
    collectorOrAuthor: "Sukai Mbye Bojang (Folk Tales and Fables from The Gambia, Vol. 1) and Birago Diop (Tales of Amadou Koumba)",
    sourceRef: {
      title: "Fari M'baye and the Donkey Transformation",
      notes: "Referenced in Sukai Mbye Bojang's collection of animal fables and celebrated in Birago Diop's 'Fari la reine des ânesses'. Adapted into English for digital reading.",
    },
    originalLanguage: "Wolof oral tradition",
    historicalPeriod: "Timeless Sahelian folktale",
    adaptationNotes:
      "Structured into five lively narrative scenes following the donkeys' strike, the magic transformation, the feast in the king's palace, the salt temptation, and the humorous stampede back to the savanna.",
    authenticityStatement:
      "This story is an authentic, beloved Senegambian Wolof fable celebrated for its warmth, musicality, and satirical look at human and animal pride.",
  },
  narrative: {
    openingFormula:
      "Taal bu daan... Pull your stools close to the cooking pot, for tonight we tell of Fari, whose ears were long, but whose wits were sharper still!",
    openingFormulaSource: "adapted-framing",
    closingFormula:
      "And whenever a donkey brays at the sound of distant drums, remember Queen Fari and smile at what cannot be hidden.",
    closingFormulaSource: "adapted-framing",
    culturalMoral:
      "You may dress a donkey in gold and silver, but the true spirit will always answer the call of its own kind.",
    communalMoral:
      "True nobility lies in accepting who you are with joy, rather than wearing the masks of others for hollow praise.",
    contextualNotes: [
      "Sabar: The traditional vibrant Wolof drum played with one bare hand and a flexible wooden stick.",
      "Kinkeliba: A comforting West African herbal tea brewed in compounds across The Gambia and Senegal.",
      "Fari: In Wolof folk tradition, a legendary queen or matriarch who embodies wit and rebellious leadership.",
    ],
  },
  language: "English (Adapted)",
  availableLanguages: ["en"],
  readingTimeMinutes: 7,
  listeningDurationSeconds: 420,
  themes: ["Identity", "Humor", "Vanity", "Self-Acceptance"],
  characters: ["Queen Fari", "The King", "The Royal Griot", "The Donkey Council"],
  coverImage: {
    src: "/images/stories/clever-hare.svg",
    alt: "A graceful queen in flowing gold damask garments looking back toward a peaceful herd of wild donkeys in the savanna",
    paletteTheme: "gold",
  },
  featured: false,
  scenes: [
    {
      id: "scene-fq-1",
      sceneNumber: 1,
      title: "The Rebellion in the Scrubland",
      text: "Under the shade of an enormous baobab at the edge of the thorny scrub, Queen Fari called her subjects together. They were donkeys—gray donkeys, brown donkeys, patient donkeys with soft brown eyes and calloused hooves. 'For three hundred dry seasons,' Fari brayed indignantly, flicking her long ears, 'we have carried water for the villagers, hauled sacks of groundnuts, and walked behind stubborn carts, while the people in the king's court do nothing but sip sweet kinkeliba tea and dress in embroidered silk! Are we not as clever as they are? Are we not as handsome?' A chorus of eager brays shook the dry dust in agreement.",
      narration: "A council of long-eared rebels in the savanna, tired of bearing burdens while humans drank sweet tea.",
      backgroundGradient: "from-[#2C1E10] via-[#1C120A] to-[#0E0905]",
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
      characters: ["Queen Fari", "The Donkey Council"],
      audio: {
        narrationUrl: "/audio/stories/fari-queen-of-the-wild-donkeys/scene-01-narration.mp3",
        narrationDurationSeconds: 36.42,
        cues: fariScene01 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-fq-2",
      sceneNumber: 2,
      title: "The Shedding of the Hides",
      text: "Fari knew an old song whispered to her grandmother by the spirits of the termite mounds. In the silver glow of the new moon, she turned three times around an ant hill, stamped her left hoof, and sang three magical words. In an instant, the coarse gray hide split like a ripe melon. Fari stepped forth as a tall, radiant maiden with teeth as white as cowrie shells and eyes that sparkled like the river. Her sisters followed, shedding their bridles to become a court of breathtaking young women, adorned in indigo wrappers and jingling silver anklets.",
      narration: "Under the silver crescent moon, rough hides fell away like dry husks to reveal radiant maidens.",
      backgroundGradient: "from-[#181828] via-[#0E0E18] to-[#06060C]",
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
        type: "night-stars",
        intensity: "subtle",
      },
      characters: ["Queen Fari"],
      audio: {
        narrationUrl: "/audio/stories/fari-queen-of-the-wild-donkeys/scene-02-narration.mp3",
        narrationDurationSeconds: 34.38,
        cues: fariScene02 as NarrationCue[],
      },
      durationSeconds: 14,
    },
    {
      id: "scene-fq-3",
      sceneNumber: 3,
      title: "Maidens in the King's Palace",
      text: "When Fari and her entourage arrived at the gates of the capital, the palace guards nearly dropped their spears. The king, seeing Fari's poise and graceful carriage, declared that a royal delegation of noble foreign princesses had arrived. For days, the newcomers were treated to sumptuous platters of spiced benachin rice, sweet roasted groundnuts, and mangoes dripping with juice. Fari smiled sweetly, nodding with royal elegance, while her companions giggled behind their veils, nudging each other with knees that still remembered the habit of kicking.",
      narration: "Honored guests in the high palace, feasting on sweet rice while hiding the instincts of the bush.",
      backgroundGradient: "from-[#2A180C] via-[#1C0F08] to-[#0E0704]",
      visual: {
        type: "illustration",
        paletteTheme: "gold",
        focalPoint: { x: 50, y: 45 },
      },
      cameraMotion: {
        preset: "zoom-out",
        intensity: "medium",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "subtle",
      },
      characters: ["Queen Fari", "The King"],
      audio: {
        narrationUrl: "/audio/stories/fari-queen-of-the-wild-donkeys/scene-03-narration.mp3",
        narrationDurationSeconds: 35.35,
        cues: fariScene03 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-fq-4",
      sceneNumber: 4,
      title: "The Scent of the Salt Lick",
      text: "All would have gone smoothly had the king's head cook not received a fresh shipment of white rock salt from the coastal pans of the river mouth. The sacks were piled high in the courtyard just below the guest quarters. As the evening breeze carried the sharp, delicious aroma of mineral salt upstairs, Fari's nostrils began to twitch. In the royal salon, her eyes dilated with wild craving. One by one, the refined princesses began pacing the rugs with sudden, choppy steps, sniffing the air with uncontrollable enthusiasm.",
      narration: "A sudden whiff of coastal rock salt drifting through the courtyard windows tested their composure to the limit.",
      backgroundGradient: "from-[#201A10] via-[#14100A] to-[#0A0805]",
      visual: {
        type: "illustration",
        paletteTheme: "earth",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "drift",
        intensity: "subtle",
        durationSeconds: 15,
      },
      environmentMotion: {
        type: "wind",
        intensity: "gentle",
      },
      characters: ["Queen Fari"],
      audio: {
        narrationUrl: "/audio/stories/fari-queen-of-the-wild-donkeys/scene-04-narration.mp3",
        narrationDurationSeconds: 33.98,
        cues: fariScene04 as NarrationCue[],
      },
      durationSeconds: 15,
    },
    {
      id: "scene-fq-5",
      sceneNumber: 5,
      title: "The Rhythm That Broke the Spell",
      text: "To celebrate the visit, the palace drummers took up their sabar drums in the main square. The rhythm started slow, then accelerated into a wild, galloping beat. It was too much for Fari. Her ears—unseen under her turban—began to twitch in time with the percussion. She opened her mouth to sing a sweet courtly ballad, but what burst forth was a colossal, window-rattling 'HEE-HAW!' Her companions erupted in chorus, kicked their slippers into the chandeliers, snatched mouthfuls of salt, and galloped on all fours out the palace gates back to the savanna, laughing all the way home to their beloved wild grass.",
      narration: "The drumbeat struck, the secret burst forth, and a glorious chorus of freedom galloped back to the wild plains.",
      backgroundGradient: "from-[#241208] via-[#160A05] to-[#0A0502]",
      visual: {
        type: "illustration",
        paletteTheme: "ochre",
        focalPoint: { x: 50, y: 50 },
      },
      cameraMotion: {
        preset: "zoom-in",
        intensity: "medium",
        durationSeconds: 16,
      },
      environmentMotion: {
        type: "dust-particles",
        intensity: "gentle",
      },
      characters: ["Queen Fari", "The King", "The Royal Griot"],
      audio: {
        narrationUrl: "/audio/stories/fari-queen-of-the-wild-donkeys/scene-05-narration.mp3",
        narrationDurationSeconds: 38.55,
        cues: fariScene05 as NarrationCue[],
      },
      durationSeconds: 16,
    },
  ],
};
