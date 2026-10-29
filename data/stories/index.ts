import { Story } from "@/types/story";
import { hareDroughtStory } from "./adapted/hare-drought";
import { spiderWisdomStory } from "./adapted/spider-wisdom";
import { griotBaobabStory } from "./adapted/griot-baobab";
import { ninkiNankaStory } from "./adapted/ninki-nanka";
import { nightfallJanjanburehStory } from "./adapted/nightfall-janjanbureh";
import { littlePangolinStory } from "./original/little-pangolin";
import { cleverHareAndHyenaStory } from "./adapted/clever-hare-and-hyena";
import { twoKumbasStory } from "./adapted/two-kumbas";
import { kankurangSacredForestStory } from "./legends/kankurang-sacred-forest";
import { kelafeaSaaneStory } from "./historical/kelefa-saane";
import { theFullaHerdsmanStory } from "./adapted/the-fula-herdsman";
import { sundiataStory } from "./historical/sundiata-lion-of-old-mali";
import { baobabUpsideDownStory } from "./adapted/why-the-baobab-grows-upside-down";
import { stoneCirlcesOfWassuStory } from "./historical/stone-circles-of-wassu";
import { theFirstKoraStory } from "./legends/the-first-kora";
import { massanehCeesayStory } from "./historical/massaneh-ceesay";
import { boppiJerrehStory } from "./legends/boppi-jerreh";
import { fariQueenOfDonkeysStory } from "./adapted/fari-queen-of-donkeys";
import { cowHyenaSharedGranaryStory } from "./adapted/cow-hyena-shared-granary";
import { maisStolenNianyaaStory } from "./adapted/mais-stolen-nianyaa";
import { fallOfKansalaStory } from "./historical/fall-of-kansala";
import { fodayKabaMedinaStory } from "./historical/foday-kaba-medina";
import { queenYanmeyStory } from "./historical/queen-yanmey";
import { koochiBaramaStory } from "./adapted/koochi-barama";
import { boneOfMorLamStory } from "./adapted/bone-of-mor-lam";
import { magicCalabashStory } from "./adapted/magic-calabash";
import { whirlingSpiritKumpoStory } from "./legends/whirling-spirit-kumpo";
import { birdsParliamentStory } from "./adapted/birds-parliament";
import { goldenPalmOrphanStory } from "./adapted/golden-palm-orphan";
import { burrNjaiTakesAnotherWifeStory } from "./traditional/burr-njai-takes-another-wife";
import { howTheGriotCameToBeStory } from "./traditional/how-the-griot-came-to-be";
import { obstinateFarmerOfNjaiyen } from "./traditional/obstinate-farmer-of-njaiyen";
import { lollyTheWitchStory } from "./traditional/lolly-the-witch";
import { sambaBecomesfriendsWithGaindehNjieStory } from "./traditional/samba-becomes-friends-with-gaindeh-njie";
import { gorguiAndHisFourWivesStory } from "./traditional/gorgui-and-his-four-wives";
import { hyenaAndTheHareStory } from "./traditional/hyena-and-the-hare";
import { threeMenOfTanganaStory } from "./traditional/three-men-of-tangana";
import { twoHalfSistersStory } from "./traditional/two-half-sisters";
import { sicketStartsAJourneyToMeccaStory } from "./traditional/sicket-starts-a-journey-to-mecca";
import { hassanHalfBrothersStory } from "./traditional/hassan-half-brothers";
import { childlessWomansPrayersStory } from "./traditional/childless-womans-prayers";
import { hyenaAndHareGoOutInSearchForFoodStory } from "./traditional/hyena-and-hare-go-out-in-search-for-food";
import { manWhoWantedToBeAPolicemanStory } from "./traditional/man-who-wanted-to-be-a-policeman";
import { cowHyenaLionAndHareShareAHomeStory } from "./traditional/cow-hyena-lion-and-hare-share-a-home";
import { catReturnsFromPilgrimageToMeccaStory } from "./traditional/cat-returns-from-pilgrimage-to-mecca";
import { soloWinsThePrizedBullStory } from "./traditional/solo-wins-the-prized-bull";
import { hatabAndTheStrangeHeadStory } from "./traditional/hatab-and-the-strange-head";

export const STORIES: Story[] = [
  hareDroughtStory,
  ninkiNankaStory,
  griotBaobabStory,
  littlePangolinStory,
  nightfallJanjanburehStory,
  spiderWisdomStory,
  cleverHareAndHyenaStory,
  twoKumbasStory,
  kankurangSacredForestStory,
  kelafeaSaaneStory,
  theFullaHerdsmanStory,
  sundiataStory,
  baobabUpsideDownStory,
  stoneCirlcesOfWassuStory,
  theFirstKoraStory,
  massanehCeesayStory,
  boppiJerrehStory,
  fariQueenOfDonkeysStory,
  cowHyenaSharedGranaryStory,
  maisStolenNianyaaStory,
  fallOfKansalaStory,
  fodayKabaMedinaStory,
  queenYanmeyStory,
  koochiBaramaStory,
  boneOfMorLamStory,
  magicCalabashStory,
  whirlingSpiritKumpoStory,
  birdsParliamentStory,
  goldenPalmOrphanStory,
  burrNjaiTakesAnotherWifeStory,
  howTheGriotCameToBeStory,
  obstinateFarmerOfNjaiyen,
  lollyTheWitchStory,
  sambaBecomesfriendsWithGaindehNjieStory,
  gorguiAndHisFourWivesStory,
  hyenaAndTheHareStory,
  threeMenOfTanganaStory,
  twoHalfSistersStory,
  sicketStartsAJourneyToMeccaStory,
  hassanHalfBrothersStory,
  childlessWomansPrayersStory,
  hyenaAndHareGoOutInSearchForFoodStory,
  manWhoWantedToBeAPolicemanStory,
  cowHyenaLionAndHareShareAHomeStory,
  catReturnsFromPilgrimageToMeccaStory,
  soloWinsThePrizedBullStory,
  hatabAndTheStrangeHeadStory,
];

/** Backward-compatible alias */
export const MOCK_STORIES: Story[] = STORIES;

export function getStoryBySlug(slug: string): Story | undefined {
  return MOCK_STORIES.find((s) => s.slug === slug);
}

export function getFeaturedStory(): Story {
  return MOCK_STORIES.find((s) => s.featured) || MOCK_STORIES[0];
}

export function getStoriesByCategory(category: Story["category"]): Story[] {
  return MOCK_STORIES.filter((s) => s.category === category);
}

export function getStoriesByContentType(type: Story["contentType"]): Story[] {
  return MOCK_STORIES.filter((s) => s.contentType === type);
}

export * from "./validateStory";

