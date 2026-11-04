import { NarrationCue } from "@/types/story";
import { DEFAULT_NARRATOR_ID } from "@/lib/narrators/registry";

// ============================================================================
// Narration Cue Imports for All 29 Stories (Amara, Foday, Baboucar, Kaddy)
// ============================================================================

// --- the-clever-hare-and-the-great-drought ---
import hareAmaraScene01 from "./hare-drought/scene-01.json";
import hareAmaraScene02 from "./hare-drought/scene-02.json";
import hareAmaraScene03 from "./hare-drought/scene-03.json";
import hareAmaraScene04 from "./hare-drought/scene-04.json";
import hareAmaraScene05 from "./hare-drought/scene-05.json";
import hareAmaraScene06 from "./hare-drought/scene-06.json";
import hareFodayScene01 from "./hare-drought/scene-01-foday.json";
import hareFodayScene02 from "./hare-drought/scene-02-foday.json";
import hareFodayScene03 from "./hare-drought/scene-03-foday.json";
import hareFodayScene04 from "./hare-drought/scene-04-foday.json";
import hareFodayScene05 from "./hare-drought/scene-05-foday.json";
import hareFodayScene06 from "./hare-drought/scene-06-foday.json";
import hareBaboucarScene01 from "./hare-drought/scene-01-baboucar.json";
import hareBaboucarScene02 from "./hare-drought/scene-02-baboucar.json";
import hareBaboucarScene03 from "./hare-drought/scene-03-baboucar.json";
import hareBaboucarScene04 from "./hare-drought/scene-04-baboucar.json";
import hareBaboucarScene05 from "./hare-drought/scene-05-baboucar.json";
import hareBaboucarScene06 from "./hare-drought/scene-06-baboucar.json";
import hareKaddyScene01 from "./hare-drought/scene-01-kaddy.json";
import hareKaddyScene02 from "./hare-drought/scene-02-kaddy.json";
import hareKaddyScene03 from "./hare-drought/scene-03-kaddy.json";
import hareKaddyScene04 from "./hare-drought/scene-04-kaddy.json";
import hareKaddyScene05 from "./hare-drought/scene-05-kaddy.json";
import hareKaddyScene06 from "./hare-drought/scene-06-kaddy.json";

// --- the-clever-hare-and-the-hyena ---
import hareHyenaAmaraScene01 from "./clever-hare-hyena/scene-01.json";
import hareHyenaAmaraScene02 from "./clever-hare-hyena/scene-02.json";
import hareHyenaAmaraScene03 from "./clever-hare-hyena/scene-03.json";
import hareHyenaAmaraScene04 from "./clever-hare-hyena/scene-04.json";
import hareHyenaAmaraScene05 from "./clever-hare-hyena/scene-05.json";
import hareHyenaAmaraScene06 from "./clever-hare-hyena/scene-06.json";
import hareHyenaFodayScene01 from "./clever-hare-hyena/scene-01-foday.json";
import hareHyenaFodayScene02 from "./clever-hare-hyena/scene-02-foday.json";
import hareHyenaFodayScene03 from "./clever-hare-hyena/scene-03-foday.json";
import hareHyenaFodayScene04 from "./clever-hare-hyena/scene-04-foday.json";
import hareHyenaFodayScene05 from "./clever-hare-hyena/scene-05-foday.json";
import hareHyenaFodayScene06 from "./clever-hare-hyena/scene-06-foday.json";
import hareHyenaBaboucarScene01 from "./clever-hare-hyena/scene-01-baboucar.json";
import hareHyenaBaboucarScene02 from "./clever-hare-hyena/scene-02-baboucar.json";
import hareHyenaBaboucarScene03 from "./clever-hare-hyena/scene-03-baboucar.json";
import hareHyenaBaboucarScene04 from "./clever-hare-hyena/scene-04-baboucar.json";
import hareHyenaBaboucarScene05 from "./clever-hare-hyena/scene-05-baboucar.json";
import hareHyenaBaboucarScene06 from "./clever-hare-hyena/scene-06-baboucar.json";
import hareHyenaKaddyScene01 from "./clever-hare-hyena/scene-01-kaddy.json";
import hareHyenaKaddyScene02 from "./clever-hare-hyena/scene-02-kaddy.json";
import hareHyenaKaddyScene03 from "./clever-hare-hyena/scene-03-kaddy.json";
import hareHyenaKaddyScene04 from "./clever-hare-hyena/scene-04-kaddy.json";
import hareHyenaKaddyScene05 from "./clever-hare-hyena/scene-05-kaddy.json";
import hareHyenaKaddyScene06 from "./clever-hare-hyena/scene-06-kaddy.json";

// --- the-two-kumbas ---
import twoKumbasAmaraScene01 from "./two-kumbas/scene-01.json";
import twoKumbasAmaraScene02 from "./two-kumbas/scene-02.json";
import twoKumbasAmaraScene03 from "./two-kumbas/scene-03.json";
import twoKumbasAmaraScene04 from "./two-kumbas/scene-04.json";
import twoKumbasAmaraScene05 from "./two-kumbas/scene-05.json";
import twoKumbasAmaraScene06 from "./two-kumbas/scene-06.json";
import twoKumbasFodayScene01 from "./two-kumbas/scene-01-foday.json";
import twoKumbasFodayScene02 from "./two-kumbas/scene-02-foday.json";
import twoKumbasFodayScene03 from "./two-kumbas/scene-03-foday.json";
import twoKumbasFodayScene04 from "./two-kumbas/scene-04-foday.json";
import twoKumbasFodayScene05 from "./two-kumbas/scene-05-foday.json";
import twoKumbasFodayScene06 from "./two-kumbas/scene-06-foday.json";
import twoKumbasBaboucarScene01 from "./two-kumbas/scene-01-baboucar.json";
import twoKumbasBaboucarScene02 from "./two-kumbas/scene-02-baboucar.json";
import twoKumbasBaboucarScene03 from "./two-kumbas/scene-03-baboucar.json";
import twoKumbasBaboucarScene04 from "./two-kumbas/scene-04-baboucar.json";
import twoKumbasBaboucarScene05 from "./two-kumbas/scene-05-baboucar.json";
import twoKumbasBaboucarScene06 from "./two-kumbas/scene-06-baboucar.json";
import twoKumbasKaddyScene01 from "./two-kumbas/scene-01-kaddy.json";
import twoKumbasKaddyScene02 from "./two-kumbas/scene-02-kaddy.json";
import twoKumbasKaddyScene03 from "./two-kumbas/scene-03-kaddy.json";
import twoKumbasKaddyScene04 from "./two-kumbas/scene-04-kaddy.json";
import twoKumbasKaddyScene05 from "./two-kumbas/scene-05-kaddy.json";
import twoKumbasKaddyScene06 from "./two-kumbas/scene-06-kaddy.json";

// --- the-little-pangolin-who-counted-stars ---
import pangolinAmaraScene01 from "./little-pangolin/scene-01.json";
import pangolinAmaraScene02 from "./little-pangolin/scene-02.json";
import pangolinFodayScene01 from "./little-pangolin/scene-01-foday.json";
import pangolinFodayScene02 from "./little-pangolin/scene-02-foday.json";
import pangolinBaboucarScene01 from "./little-pangolin/scene-01-baboucar.json";
import pangolinBaboucarScene02 from "./little-pangolin/scene-02-baboucar.json";
import pangolinKaddyScene01 from "./little-pangolin/scene-01-kaddy.json";
import pangolinKaddyScene02 from "./little-pangolin/scene-02-kaddy.json";

// --- nightfall-over-janjanbureh ---
import nightfallAmaraScene01 from "./nightfall-janjanbureh/scene-01.json";
import nightfallAmaraScene02 from "./nightfall-janjanbureh/scene-02.json";
import nightfallFodayScene01 from "./nightfall-janjanbureh/scene-01-foday.json";
import nightfallFodayScene02 from "./nightfall-janjanbureh/scene-02-foday.json";
import nightfallBaboucarScene01 from "./nightfall-janjanbureh/scene-01-baboucar.json";
import nightfallBaboucarScene02 from "./nightfall-janjanbureh/scene-02-baboucar.json";
import nightfallKaddyScene01 from "./nightfall-janjanbureh/scene-01-kaddy.json";
import nightfallKaddyScene02 from "./nightfall-janjanbureh/scene-02-kaddy.json";

// --- why-the-baobab-grows-upside-down ---
import baobabAmaraScene01 from "./baobab-upside-down/scene-01.json";
import baobabAmaraScene02 from "./baobab-upside-down/scene-02.json";
import baobabAmaraScene03 from "./baobab-upside-down/scene-03.json";
import baobabAmaraScene04 from "./baobab-upside-down/scene-04.json";
import baobabAmaraScene05 from "./baobab-upside-down/scene-05.json";
import baobabFodayScene01 from "./baobab-upside-down/scene-01-foday.json";
import baobabFodayScene02 from "./baobab-upside-down/scene-02-foday.json";
import baobabFodayScene03 from "./baobab-upside-down/scene-03-foday.json";
import baobabFodayScene04 from "./baobab-upside-down/scene-04-foday.json";
import baobabFodayScene05 from "./baobab-upside-down/scene-05-foday.json";
import baobabBaboucarScene01 from "./baobab-upside-down/scene-01-baboucar.json";
import baobabBaboucarScene02 from "./baobab-upside-down/scene-02-baboucar.json";
import baobabBaboucarScene03 from "./baobab-upside-down/scene-03-baboucar.json";
import baobabBaboucarScene04 from "./baobab-upside-down/scene-04-baboucar.json";
import baobabBaboucarScene05 from "./baobab-upside-down/scene-05-baboucar.json";
import baobabKaddyScene01 from "./baobab-upside-down/scene-01-kaddy.json";
import baobabKaddyScene02 from "./baobab-upside-down/scene-02-kaddy.json";
import baobabKaddyScene03 from "./baobab-upside-down/scene-03-kaddy.json";
import baobabKaddyScene04 from "./baobab-upside-down/scene-04-kaddy.json";
import baobabKaddyScene05 from "./baobab-upside-down/scene-05-kaddy.json";

// --- fari-queen-of-the-wild-donkeys ---
import fariAmaraScene01 from "./fari-queen/scene-01.json";
import fariAmaraScene02 from "./fari-queen/scene-02.json";
import fariAmaraScene03 from "./fari-queen/scene-03.json";
import fariAmaraScene04 from "./fari-queen/scene-04.json";
import fariAmaraScene05 from "./fari-queen/scene-05.json";
import fariFodayScene01 from "./fari-queen/scene-01-foday.json";
import fariFodayScene02 from "./fari-queen/scene-02-foday.json";
import fariFodayScene03 from "./fari-queen/scene-03-foday.json";
import fariFodayScene04 from "./fari-queen/scene-04-foday.json";
import fariFodayScene05 from "./fari-queen/scene-05-foday.json";
import fariBaboucarScene01 from "./fari-queen/scene-01-baboucar.json";
import fariBaboucarScene02 from "./fari-queen/scene-02-baboucar.json";
import fariBaboucarScene03 from "./fari-queen/scene-03-baboucar.json";
import fariBaboucarScene04 from "./fari-queen/scene-04-baboucar.json";
import fariBaboucarScene05 from "./fari-queen/scene-05-baboucar.json";
import fariKaddyScene01 from "./fari-queen/scene-01-kaddy.json";
import fariKaddyScene02 from "./fari-queen/scene-02-kaddy.json";
import fariKaddyScene03 from "./fari-queen/scene-03-kaddy.json";
import fariKaddyScene04 from "./fari-queen/scene-04-kaddy.json";
import fariKaddyScene05 from "./fari-queen/scene-05-kaddy.json";

// --- the-cow-the-hyena-and-the-shared-granary ---
import cowHyenaGranaryAmaraScene01 from "./cow-hyena-granary/scene-01.json";
import cowHyenaGranaryAmaraScene02 from "./cow-hyena-granary/scene-02.json";
import cowHyenaGranaryAmaraScene03 from "./cow-hyena-granary/scene-03.json";
import cowHyenaGranaryAmaraScene04 from "./cow-hyena-granary/scene-04.json";
import cowHyenaGranaryFodayScene01 from "./cow-hyena-granary/scene-01-foday.json";
import cowHyenaGranaryFodayScene02 from "./cow-hyena-granary/scene-02-foday.json";
import cowHyenaGranaryFodayScene03 from "./cow-hyena-granary/scene-03-foday.json";
import cowHyenaGranaryFodayScene04 from "./cow-hyena-granary/scene-04-foday.json";
import cowHyenaGranaryBaboucarScene01 from "./cow-hyena-granary/scene-01-baboucar.json";
import cowHyenaGranaryBaboucarScene02 from "./cow-hyena-granary/scene-02-baboucar.json";
import cowHyenaGranaryBaboucarScene03 from "./cow-hyena-granary/scene-03-baboucar.json";
import cowHyenaGranaryBaboucarScene04 from "./cow-hyena-granary/scene-04-baboucar.json";
import cowHyenaGranaryKaddyScene01 from "./cow-hyena-granary/scene-01-kaddy.json";
import cowHyenaGranaryKaddyScene02 from "./cow-hyena-granary/scene-02-kaddy.json";
import cowHyenaGranaryKaddyScene03 from "./cow-hyena-granary/scene-03-kaddy.json";
import cowHyenaGranaryKaddyScene04 from "./cow-hyena-granary/scene-04-kaddy.json";

// --- mais-stolen-nianyaa ---
import maiAmaraScene01 from "./mais-nianyaa/scene-01.json";
import maiAmaraScene02 from "./mais-nianyaa/scene-02.json";
import maiAmaraScene03 from "./mais-nianyaa/scene-03.json";
import maiAmaraScene04 from "./mais-nianyaa/scene-04.json";
import maiFodayScene01 from "./mais-nianyaa/scene-01-foday.json";
import maiFodayScene02 from "./mais-nianyaa/scene-02-foday.json";
import maiFodayScene03 from "./mais-nianyaa/scene-03-foday.json";
import maiFodayScene04 from "./mais-nianyaa/scene-04-foday.json";
import maiBaboucarScene01 from "./mais-nianyaa/scene-01-baboucar.json";
import maiBaboucarScene02 from "./mais-nianyaa/scene-02-baboucar.json";
import maiBaboucarScene03 from "./mais-nianyaa/scene-03-baboucar.json";
import maiBaboucarScene04 from "./mais-nianyaa/scene-04-baboucar.json";
import maiKaddyScene01 from "./mais-nianyaa/scene-01-kaddy.json";
import maiKaddyScene02 from "./mais-nianyaa/scene-02-kaddy.json";
import maiKaddyScene03 from "./mais-nianyaa/scene-03-kaddy.json";
import maiKaddyScene04 from "./mais-nianyaa/scene-04-kaddy.json";

// --- queen-yanmey-and-the-sovereign-river ---
import yanmeyAmaraScene01 from "./queen-yanmey/scene-01.json";
import yanmeyAmaraScene02 from "./queen-yanmey/scene-02.json";
import yanmeyAmaraScene03 from "./queen-yanmey/scene-03.json";
import yanmeyAmaraScene04 from "./queen-yanmey/scene-04.json";
import yanmeyAmaraScene05 from "./queen-yanmey/scene-05.json";
import yanmeyFodayScene01 from "./queen-yanmey/scene-01-foday.json";
import yanmeyFodayScene02 from "./queen-yanmey/scene-02-foday.json";
import yanmeyFodayScene03 from "./queen-yanmey/scene-03-foday.json";
import yanmeyFodayScene04 from "./queen-yanmey/scene-04-foday.json";
import yanmeyFodayScene05 from "./queen-yanmey/scene-05-foday.json";
import yanmeyBaboucarScene01 from "./queen-yanmey/scene-01-baboucar.json";
import yanmeyBaboucarScene02 from "./queen-yanmey/scene-02-baboucar.json";
import yanmeyBaboucarScene03 from "./queen-yanmey/scene-03-baboucar.json";
import yanmeyBaboucarScene04 from "./queen-yanmey/scene-04-baboucar.json";
import yanmeyBaboucarScene05 from "./queen-yanmey/scene-05-baboucar.json";
import yanmeyKaddyScene01 from "./queen-yanmey/scene-01-kaddy.json";
import yanmeyKaddyScene02 from "./queen-yanmey/scene-02-kaddy.json";
import yanmeyKaddyScene03 from "./queen-yanmey/scene-03-kaddy.json";
import yanmeyKaddyScene04 from "./queen-yanmey/scene-04-kaddy.json";
import yanmeyKaddyScene05 from "./queen-yanmey/scene-05-kaddy.json";

// --- the-bone-of-mor-lam ---
import morLamAmaraScene01 from "./bone-of-mor-lam/scene-01.json";
import morLamAmaraScene02 from "./bone-of-mor-lam/scene-02.json";
import morLamAmaraScene03 from "./bone-of-mor-lam/scene-03.json";
import morLamAmaraScene04 from "./bone-of-mor-lam/scene-04.json";
import morLamAmaraScene05 from "./bone-of-mor-lam/scene-05.json";
import morLamFodayScene01 from "./bone-of-mor-lam/scene-01-foday.json";
import morLamFodayScene02 from "./bone-of-mor-lam/scene-02-foday.json";
import morLamFodayScene03 from "./bone-of-mor-lam/scene-03-foday.json";
import morLamFodayScene04 from "./bone-of-mor-lam/scene-04-foday.json";
import morLamFodayScene05 from "./bone-of-mor-lam/scene-05-foday.json";
import morLamBaboucarScene01 from "./bone-of-mor-lam/scene-01-baboucar.json";
import morLamBaboucarScene02 from "./bone-of-mor-lam/scene-02-baboucar.json";
import morLamBaboucarScene03 from "./bone-of-mor-lam/scene-03-baboucar.json";
import morLamBaboucarScene04 from "./bone-of-mor-lam/scene-04-baboucar.json";
import morLamBaboucarScene05 from "./bone-of-mor-lam/scene-05-baboucar.json";
import morLamKaddyScene01 from "./bone-of-mor-lam/scene-01-kaddy.json";
import morLamKaddyScene02 from "./bone-of-mor-lam/scene-02-kaddy.json";
import morLamKaddyScene03 from "./bone-of-mor-lam/scene-03-kaddy.json";
import morLamKaddyScene04 from "./bone-of-mor-lam/scene-04-kaddy.json";
import morLamKaddyScene05 from "./bone-of-mor-lam/scene-05-kaddy.json";

// --- the-birds-parliament ---
import birdsAmaraScene01 from "./birds-parliament/scene-01.json";
import birdsAmaraScene02 from "./birds-parliament/scene-02.json";
import birdsAmaraScene03 from "./birds-parliament/scene-03.json";
import birdsAmaraScene04 from "./birds-parliament/scene-04.json";
import birdsFodayScene01 from "./birds-parliament/scene-01-foday.json";
import birdsFodayScene02 from "./birds-parliament/scene-02-foday.json";
import birdsFodayScene03 from "./birds-parliament/scene-03-foday.json";
import birdsFodayScene04 from "./birds-parliament/scene-04-foday.json";
import birdsBaboucarScene01 from "./birds-parliament/scene-01-baboucar.json";
import birdsBaboucarScene02 from "./birds-parliament/scene-02-baboucar.json";
import birdsBaboucarScene03 from "./birds-parliament/scene-03-baboucar.json";
import birdsBaboucarScene04 from "./birds-parliament/scene-04-baboucar.json";
import birdsKaddyScene01 from "./birds-parliament/scene-01-kaddy.json";
import birdsKaddyScene02 from "./birds-parliament/scene-02-kaddy.json";
import birdsKaddyScene03 from "./birds-parliament/scene-03-kaddy.json";
import birdsKaddyScene04 from "./birds-parliament/scene-04-kaddy.json";

// --- the-golden-palm-and-the-orphan-boy ---
import goldenPalmAmaraScene01 from "./golden-palm-orphan/scene-01.json";
import goldenPalmAmaraScene02 from "./golden-palm-orphan/scene-02.json";
import goldenPalmAmaraScene03 from "./golden-palm-orphan/scene-03.json";
import goldenPalmAmaraScene04 from "./golden-palm-orphan/scene-04.json";
import goldenPalmFodayScene01 from "./golden-palm-orphan/scene-01-foday.json";
import goldenPalmFodayScene02 from "./golden-palm-orphan/scene-02-foday.json";
import goldenPalmFodayScene03 from "./golden-palm-orphan/scene-03-foday.json";
import goldenPalmFodayScene04 from "./golden-palm-orphan/scene-04-foday.json";
import goldenPalmBaboucarScene01 from "./golden-palm-orphan/scene-01-baboucar.json";
import goldenPalmBaboucarScene02 from "./golden-palm-orphan/scene-02-baboucar.json";
import goldenPalmBaboucarScene03 from "./golden-palm-orphan/scene-03-baboucar.json";
import goldenPalmBaboucarScene04 from "./golden-palm-orphan/scene-04-baboucar.json";
import goldenPalmKaddyScene01 from "./golden-palm-orphan/scene-01-kaddy.json";
import goldenPalmKaddyScene02 from "./golden-palm-orphan/scene-02-kaddy.json";
import goldenPalmKaddyScene03 from "./golden-palm-orphan/scene-03-kaddy.json";
import goldenPalmKaddyScene04 from "./golden-palm-orphan/scene-04-kaddy.json";

// --- the-whispering-waters-of-ninki-nanka ---
import ninkiFodayScene01 from "./ninki-nanka/scene-01.json";
import ninkiFodayScene02 from "./ninki-nanka/scene-02.json";
import ninkiFodayScene03 from "./ninki-nanka/scene-03.json";
import ninkiAmaraScene01 from "./ninki-nanka/scene-01-amara.json";
import ninkiAmaraScene02 from "./ninki-nanka/scene-02-amara.json";
import ninkiAmaraScene03 from "./ninki-nanka/scene-03-amara.json";
import ninkiBaboucarScene01 from "./ninki-nanka/scene-01-baboucar.json";
import ninkiBaboucarScene02 from "./ninki-nanka/scene-02-baboucar.json";
import ninkiBaboucarScene03 from "./ninki-nanka/scene-03-baboucar.json";
import ninkiKaddyScene01 from "./ninki-nanka/scene-01-kaddy.json";
import ninkiKaddyScene02 from "./ninki-nanka/scene-02-kaddy.json";
import ninkiKaddyScene03 from "./ninki-nanka/scene-03-kaddy.json";

// --- the-griot-under-the-baobab ---
import griotFodayScene01 from "./griot-baobab/scene-01.json";
import griotFodayScene02 from "./griot-baobab/scene-02.json";
import griotFodayScene03 from "./griot-baobab/scene-03.json";
import griotAmaraScene01 from "./griot-baobab/scene-01-amara.json";
import griotAmaraScene02 from "./griot-baobab/scene-02-amara.json";
import griotAmaraScene03 from "./griot-baobab/scene-03-amara.json";
import griotBaboucarScene01 from "./griot-baobab/scene-01-baboucar.json";
import griotBaboucarScene02 from "./griot-baobab/scene-02-baboucar.json";
import griotBaboucarScene03 from "./griot-baobab/scene-03-baboucar.json";
import griotKaddyScene01 from "./griot-baobab/scene-01-kaddy.json";
import griotKaddyScene02 from "./griot-baobab/scene-02-kaddy.json";
import griotKaddyScene03 from "./griot-baobab/scene-03-kaddy.json";

// --- the-spider-and-the-pot-of-wisdom ---
import spiderFodayScene01 from "./spider-wisdom/scene-01.json";
import spiderFodayScene02 from "./spider-wisdom/scene-02.json";
import spiderFodayScene03 from "./spider-wisdom/scene-03.json";
import spiderAmaraScene01 from "./spider-wisdom/scene-01-amara.json";
import spiderAmaraScene02 from "./spider-wisdom/scene-02-amara.json";
import spiderAmaraScene03 from "./spider-wisdom/scene-03-amara.json";
import spiderBaboucarScene01 from "./spider-wisdom/scene-01-baboucar.json";
import spiderBaboucarScene02 from "./spider-wisdom/scene-02-baboucar.json";
import spiderBaboucarScene03 from "./spider-wisdom/scene-03-baboucar.json";
import spiderKaddyScene01 from "./spider-wisdom/scene-01-kaddy.json";
import spiderKaddyScene02 from "./spider-wisdom/scene-02-kaddy.json";
import spiderKaddyScene03 from "./spider-wisdom/scene-03-kaddy.json";

// --- the-kankurang-and-the-sacred-forest ---
import kankurangFodayScene01 from "./kankurang/scene-01.json";
import kankurangFodayScene02 from "./kankurang/scene-02.json";
import kankurangFodayScene03 from "./kankurang/scene-03.json";
import kankurangFodayScene04 from "./kankurang/scene-04.json";
import kankurangFodayScene05 from "./kankurang/scene-05.json";
import kankurangAmaraScene01 from "./kankurang/scene-01-amara.json";
import kankurangAmaraScene02 from "./kankurang/scene-02-amara.json";
import kankurangAmaraScene03 from "./kankurang/scene-03-amara.json";
import kankurangAmaraScene04 from "./kankurang/scene-04-amara.json";
import kankurangAmaraScene05 from "./kankurang/scene-05-amara.json";
import kankurangBaboucarScene01 from "./kankurang/scene-01-baboucar.json";
import kankurangBaboucarScene02 from "./kankurang/scene-02-baboucar.json";
import kankurangBaboucarScene03 from "./kankurang/scene-03-baboucar.json";
import kankurangBaboucarScene04 from "./kankurang/scene-04-baboucar.json";
import kankurangBaboucarScene05 from "./kankurang/scene-05-baboucar.json";
import kankurangKaddyScene01 from "./kankurang/scene-01-kaddy.json";
import kankurangKaddyScene02 from "./kankurang/scene-02-kaddy.json";
import kankurangKaddyScene03 from "./kankurang/scene-03-kaddy.json";
import kankurangKaddyScene04 from "./kankurang/scene-04-kaddy.json";
import kankurangKaddyScene05 from "./kankurang/scene-05-kaddy.json";

// --- kelefa-saane ---
import kelefaFodayScene01 from "./kelefa-saane/scene-01.json";
import kelefaFodayScene02 from "./kelefa-saane/scene-02.json";
import kelefaFodayScene03 from "./kelefa-saane/scene-03.json";
import kelefaFodayScene04 from "./kelefa-saane/scene-04.json";
import kelefaFodayScene05 from "./kelefa-saane/scene-05.json";
import kelefaFodayScene06 from "./kelefa-saane/scene-06.json";
import kelefaAmaraScene01 from "./kelefa-saane/scene-01-amara.json";
import kelefaAmaraScene02 from "./kelefa-saane/scene-02-amara.json";
import kelefaAmaraScene03 from "./kelefa-saane/scene-03-amara.json";
import kelefaAmaraScene04 from "./kelefa-saane/scene-04-amara.json";
import kelefaAmaraScene05 from "./kelefa-saane/scene-05-amara.json";
import kelefaAmaraScene06 from "./kelefa-saane/scene-06-amara.json";
import kelefaBaboucarScene01 from "./kelefa-saane/scene-01-baboucar.json";
import kelefaBaboucarScene02 from "./kelefa-saane/scene-02-baboucar.json";
import kelefaBaboucarScene03 from "./kelefa-saane/scene-03-baboucar.json";
import kelefaBaboucarScene04 from "./kelefa-saane/scene-04-baboucar.json";
import kelefaBaboucarScene05 from "./kelefa-saane/scene-05-baboucar.json";
import kelefaBaboucarScene06 from "./kelefa-saane/scene-06-baboucar.json";
import kelefaKaddyScene01 from "./kelefa-saane/scene-01-kaddy.json";
import kelefaKaddyScene02 from "./kelefa-saane/scene-02-kaddy.json";
import kelefaKaddyScene03 from "./kelefa-saane/scene-03-kaddy.json";
import kelefaKaddyScene04 from "./kelefa-saane/scene-04-kaddy.json";
import kelefaKaddyScene05 from "./kelefa-saane/scene-05-kaddy.json";
import kelefaKaddyScene06 from "./kelefa-saane/scene-06-kaddy.json";

// --- the-fula-herdsman ---
import fulaFodayScene01 from "./fula-herdsman/scene-01.json";
import fulaFodayScene02 from "./fula-herdsman/scene-02.json";
import fulaFodayScene03 from "./fula-herdsman/scene-03.json";
import fulaFodayScene04 from "./fula-herdsman/scene-04.json";
import fulaFodayScene05 from "./fula-herdsman/scene-05.json";
import fulaFodayScene06 from "./fula-herdsman/scene-06.json";
import fulaAmaraScene01 from "./fula-herdsman/scene-01-amara.json";
import fulaAmaraScene02 from "./fula-herdsman/scene-02-amara.json";
import fulaAmaraScene03 from "./fula-herdsman/scene-03-amara.json";
import fulaAmaraScene04 from "./fula-herdsman/scene-04-amara.json";
import fulaAmaraScene05 from "./fula-herdsman/scene-05-amara.json";
import fulaAmaraScene06 from "./fula-herdsman/scene-06-amara.json";
import fulaBaboucarScene01 from "./fula-herdsman/scene-01-baboucar.json";
import fulaBaboucarScene02 from "./fula-herdsman/scene-02-baboucar.json";
import fulaBaboucarScene03 from "./fula-herdsman/scene-03-baboucar.json";
import fulaBaboucarScene04 from "./fula-herdsman/scene-04-baboucar.json";
import fulaBaboucarScene05 from "./fula-herdsman/scene-05-baboucar.json";
import fulaBaboucarScene06 from "./fula-herdsman/scene-06-baboucar.json";
import fulaKaddyScene01 from "./fula-herdsman/scene-01-kaddy.json";
import fulaKaddyScene02 from "./fula-herdsman/scene-02-kaddy.json";
import fulaKaddyScene03 from "./fula-herdsman/scene-03-kaddy.json";
import fulaKaddyScene04 from "./fula-herdsman/scene-04-kaddy.json";
import fulaKaddyScene05 from "./fula-herdsman/scene-05-kaddy.json";
import fulaKaddyScene06 from "./fula-herdsman/scene-06-kaddy.json";

// --- sundiata-lion-of-old-mali ---
import sundiataFodayScene01 from "./sundiata/scene-01.json";
import sundiataFodayScene02 from "./sundiata/scene-02.json";
import sundiataFodayScene03 from "./sundiata/scene-03.json";
import sundiataFodayScene04 from "./sundiata/scene-04.json";
import sundiataFodayScene05 from "./sundiata/scene-05.json";
import sundiataFodayScene06 from "./sundiata/scene-06.json";
import sundiataAmaraScene01 from "./sundiata/scene-01-amara.json";
import sundiataAmaraScene02 from "./sundiata/scene-02-amara.json";
import sundiataAmaraScene03 from "./sundiata/scene-03-amara.json";
import sundiataAmaraScene04 from "./sundiata/scene-04-amara.json";
import sundiataAmaraScene05 from "./sundiata/scene-05-amara.json";
import sundiataAmaraScene06 from "./sundiata/scene-06-amara.json";
import sundiataBaboucarScene01 from "./sundiata/scene-01-baboucar.json";
import sundiataBaboucarScene02 from "./sundiata/scene-02-baboucar.json";
import sundiataBaboucarScene03 from "./sundiata/scene-03-baboucar.json";
import sundiataBaboucarScene04 from "./sundiata/scene-04-baboucar.json";
import sundiataBaboucarScene05 from "./sundiata/scene-05-baboucar.json";
import sundiataBaboucarScene06 from "./sundiata/scene-06-baboucar.json";
import sundiataKaddyScene01 from "./sundiata/scene-01-kaddy.json";
import sundiataKaddyScene02 from "./sundiata/scene-02-kaddy.json";
import sundiataKaddyScene03 from "./sundiata/scene-03-kaddy.json";
import sundiataKaddyScene04 from "./sundiata/scene-04-kaddy.json";
import sundiataKaddyScene05 from "./sundiata/scene-05-kaddy.json";
import sundiataKaddyScene06 from "./sundiata/scene-06-kaddy.json";

// --- stone-circles-of-wassu ---
import stoneCirclesFodayScene01 from "./stone-circles/scene-01.json";
import stoneCirclesFodayScene02 from "./stone-circles/scene-02.json";
import stoneCirclesFodayScene03 from "./stone-circles/scene-03.json";
import stoneCirclesFodayScene04 from "./stone-circles/scene-04.json";
import stoneCirclesFodayScene05 from "./stone-circles/scene-05.json";
import stoneCirclesAmaraScene01 from "./stone-circles/scene-01-amara.json";
import stoneCirclesAmaraScene02 from "./stone-circles/scene-02-amara.json";
import stoneCirclesAmaraScene03 from "./stone-circles/scene-03-amara.json";
import stoneCirclesAmaraScene04 from "./stone-circles/scene-04-amara.json";
import stoneCirclesAmaraScene05 from "./stone-circles/scene-05-amara.json";
import stoneCirclesBaboucarScene01 from "./stone-circles/scene-01-baboucar.json";
import stoneCirclesBaboucarScene02 from "./stone-circles/scene-02-baboucar.json";
import stoneCirclesBaboucarScene03 from "./stone-circles/scene-03-baboucar.json";
import stoneCirclesBaboucarScene04 from "./stone-circles/scene-04-baboucar.json";
import stoneCirclesBaboucarScene05 from "./stone-circles/scene-05-baboucar.json";
import stoneCirclesKaddyScene01 from "./stone-circles/scene-01-kaddy.json";
import stoneCirclesKaddyScene02 from "./stone-circles/scene-02-kaddy.json";
import stoneCirclesKaddyScene03 from "./stone-circles/scene-03-kaddy.json";
import stoneCirclesKaddyScene04 from "./stone-circles/scene-04-kaddy.json";
import stoneCirclesKaddyScene05 from "./stone-circles/scene-05-kaddy.json";

// --- the-first-kora ---
import firstKoraFodayScene01 from "./first-kora/scene-01.json";
import firstKoraFodayScene02 from "./first-kora/scene-02.json";
import firstKoraFodayScene03 from "./first-kora/scene-03.json";
import firstKoraFodayScene04 from "./first-kora/scene-04.json";
import firstKoraFodayScene05 from "./first-kora/scene-05.json";
import firstKoraAmaraScene01 from "./first-kora/scene-01-amara.json";
import firstKoraAmaraScene02 from "./first-kora/scene-02-amara.json";
import firstKoraAmaraScene03 from "./first-kora/scene-03-amara.json";
import firstKoraAmaraScene04 from "./first-kora/scene-04-amara.json";
import firstKoraAmaraScene05 from "./first-kora/scene-05-amara.json";
import firstKoraBaboucarScene01 from "./first-kora/scene-01-baboucar.json";
import firstKoraBaboucarScene02 from "./first-kora/scene-02-baboucar.json";
import firstKoraBaboucarScene03 from "./first-kora/scene-03-baboucar.json";
import firstKoraBaboucarScene04 from "./first-kora/scene-04-baboucar.json";
import firstKoraBaboucarScene05 from "./first-kora/scene-05-baboucar.json";
import firstKoraKaddyScene01 from "./first-kora/scene-01-kaddy.json";
import firstKoraKaddyScene02 from "./first-kora/scene-02-kaddy.json";
import firstKoraKaddyScene03 from "./first-kora/scene-03-kaddy.json";
import firstKoraKaddyScene04 from "./first-kora/scene-04-kaddy.json";
import firstKoraKaddyScene05 from "./first-kora/scene-05-kaddy.json";

// --- the-ballad-of-massaneh-ceesay ---
import massanehFodayScene01 from "./massaneh-ceesay/scene-01.json";
import massanehFodayScene02 from "./massaneh-ceesay/scene-02.json";
import massanehFodayScene03 from "./massaneh-ceesay/scene-03.json";
import massanehFodayScene04 from "./massaneh-ceesay/scene-04.json";
import massanehFodayScene05 from "./massaneh-ceesay/scene-05.json";
import massanehAmaraScene01 from "./massaneh-ceesay/scene-01-amara.json";
import massanehAmaraScene02 from "./massaneh-ceesay/scene-02-amara.json";
import massanehAmaraScene03 from "./massaneh-ceesay/scene-03-amara.json";
import massanehAmaraScene04 from "./massaneh-ceesay/scene-04-amara.json";
import massanehAmaraScene05 from "./massaneh-ceesay/scene-05-amara.json";
import massanehBaboucarScene01 from "./massaneh-ceesay/scene-01-baboucar.json";
import massanehBaboucarScene02 from "./massaneh-ceesay/scene-02-baboucar.json";
import massanehBaboucarScene03 from "./massaneh-ceesay/scene-03-baboucar.json";
import massanehBaboucarScene04 from "./massaneh-ceesay/scene-04-baboucar.json";
import massanehBaboucarScene05 from "./massaneh-ceesay/scene-05-baboucar.json";
import massanehKaddyScene01 from "./massaneh-ceesay/scene-01-kaddy.json";
import massanehKaddyScene02 from "./massaneh-ceesay/scene-02-kaddy.json";
import massanehKaddyScene03 from "./massaneh-ceesay/scene-03-kaddy.json";
import massanehKaddyScene04 from "./massaneh-ceesay/scene-04-kaddy.json";
import massanehKaddyScene05 from "./massaneh-ceesay/scene-05-kaddy.json";

// --- boppi-jerreh-spirits-of-dog-island ---
import boppiFodayScene01 from "./boppi-jerreh/scene-01.json";
import boppiFodayScene02 from "./boppi-jerreh/scene-02.json";
import boppiFodayScene03 from "./boppi-jerreh/scene-03.json";
import boppiFodayScene04 from "./boppi-jerreh/scene-04.json";
import boppiAmaraScene01 from "./boppi-jerreh/scene-01-amara.json";
import boppiAmaraScene02 from "./boppi-jerreh/scene-02-amara.json";
import boppiAmaraScene03 from "./boppi-jerreh/scene-03-amara.json";
import boppiAmaraScene04 from "./boppi-jerreh/scene-04-amara.json";
import boppiBaboucarScene01 from "./boppi-jerreh/scene-01-baboucar.json";
import boppiBaboucarScene02 from "./boppi-jerreh/scene-02-baboucar.json";
import boppiBaboucarScene03 from "./boppi-jerreh/scene-03-baboucar.json";
import boppiBaboucarScene04 from "./boppi-jerreh/scene-04-baboucar.json";
import boppiKaddyScene01 from "./boppi-jerreh/scene-01-kaddy.json";
import boppiKaddyScene02 from "./boppi-jerreh/scene-02-kaddy.json";
import boppiKaddyScene03 from "./boppi-jerreh/scene-03-kaddy.json";
import boppiKaddyScene04 from "./boppi-jerreh/scene-04-kaddy.json";

// --- the-fall-of-kansala ---
import kansalaFodayScene01 from "./fall-of-kansala/scene-01.json";
import kansalaFodayScene02 from "./fall-of-kansala/scene-02.json";
import kansalaFodayScene03 from "./fall-of-kansala/scene-03.json";
import kansalaFodayScene04 from "./fall-of-kansala/scene-04.json";
import kansalaFodayScene05 from "./fall-of-kansala/scene-05.json";
import kansalaFodayScene06 from "./fall-of-kansala/scene-06.json";
import kansalaAmaraScene01 from "./fall-of-kansala/scene-01-amara.json";
import kansalaAmaraScene02 from "./fall-of-kansala/scene-02-amara.json";
import kansalaAmaraScene03 from "./fall-of-kansala/scene-03-amara.json";
import kansalaAmaraScene04 from "./fall-of-kansala/scene-04-amara.json";
import kansalaAmaraScene05 from "./fall-of-kansala/scene-05-amara.json";
import kansalaAmaraScene06 from "./fall-of-kansala/scene-06-amara.json";
import kansalaBaboucarScene01 from "./fall-of-kansala/scene-01-baboucar.json";
import kansalaBaboucarScene02 from "./fall-of-kansala/scene-02-baboucar.json";
import kansalaBaboucarScene03 from "./fall-of-kansala/scene-03-baboucar.json";
import kansalaBaboucarScene04 from "./fall-of-kansala/scene-04-baboucar.json";
import kansalaBaboucarScene05 from "./fall-of-kansala/scene-05-baboucar.json";
import kansalaBaboucarScene06 from "./fall-of-kansala/scene-06-baboucar.json";
import kansalaKaddyScene01 from "./fall-of-kansala/scene-01-kaddy.json";
import kansalaKaddyScene02 from "./fall-of-kansala/scene-02-kaddy.json";
import kansalaKaddyScene03 from "./fall-of-kansala/scene-03-kaddy.json";
import kansalaKaddyScene04 from "./fall-of-kansala/scene-04-kaddy.json";
import kansalaKaddyScene05 from "./fall-of-kansala/scene-05-kaddy.json";
import kansalaKaddyScene06 from "./fall-of-kansala/scene-06-kaddy.json";

// --- foday-kaba-and-the-stockade-of-medina ---
import fodayFodayScene01 from "./foday-kaba/scene-01.json";
import fodayFodayScene02 from "./foday-kaba/scene-02.json";
import fodayFodayScene03 from "./foday-kaba/scene-03.json";
import fodayFodayScene04 from "./foday-kaba/scene-04.json";
import fodayFodayScene05 from "./foday-kaba/scene-05.json";
import fodayAmaraScene01 from "./foday-kaba/scene-01-amara.json";
import fodayAmaraScene02 from "./foday-kaba/scene-02-amara.json";
import fodayAmaraScene03 from "./foday-kaba/scene-03-amara.json";
import fodayAmaraScene04 from "./foday-kaba/scene-04-amara.json";
import fodayAmaraScene05 from "./foday-kaba/scene-05-amara.json";
import fodayBaboucarScene01 from "./foday-kaba/scene-01-baboucar.json";
import fodayBaboucarScene02 from "./foday-kaba/scene-02-baboucar.json";
import fodayBaboucarScene03 from "./foday-kaba/scene-03-baboucar.json";
import fodayBaboucarScene04 from "./foday-kaba/scene-04-baboucar.json";
import fodayBaboucarScene05 from "./foday-kaba/scene-05-baboucar.json";
import fodayKaddyScene01 from "./foday-kaba/scene-01-kaddy.json";
import fodayKaddyScene02 from "./foday-kaba/scene-02-kaddy.json";
import fodayKaddyScene03 from "./foday-kaba/scene-03-kaddy.json";
import fodayKaddyScene04 from "./foday-kaba/scene-04-kaddy.json";
import fodayKaddyScene05 from "./foday-kaba/scene-05-kaddy.json";

// --- koochi-barama-and-the-river-of-truth ---
import koochiFodayScene01 from "./koochi-barama/scene-01.json";
import koochiFodayScene02 from "./koochi-barama/scene-02.json";
import koochiFodayScene03 from "./koochi-barama/scene-03.json";
import koochiFodayScene04 from "./koochi-barama/scene-04.json";
import koochiAmaraScene01 from "./koochi-barama/scene-01-amara.json";
import koochiAmaraScene02 from "./koochi-barama/scene-02-amara.json";
import koochiAmaraScene03 from "./koochi-barama/scene-03-amara.json";
import koochiAmaraScene04 from "./koochi-barama/scene-04-amara.json";
import koochiBaboucarScene01 from "./koochi-barama/scene-01-baboucar.json";
import koochiBaboucarScene02 from "./koochi-barama/scene-02-baboucar.json";
import koochiBaboucarScene03 from "./koochi-barama/scene-03-baboucar.json";
import koochiBaboucarScene04 from "./koochi-barama/scene-04-baboucar.json";
import koochiKaddyScene01 from "./koochi-barama/scene-01-kaddy.json";
import koochiKaddyScene02 from "./koochi-barama/scene-02-kaddy.json";
import koochiKaddyScene03 from "./koochi-barama/scene-03-kaddy.json";
import koochiKaddyScene04 from "./koochi-barama/scene-04-kaddy.json";

// --- the-magic-calabash-of-banjul ---
import calabashFodayScene01 from "./magic-calabash/scene-01.json";
import calabashFodayScene02 from "./magic-calabash/scene-02.json";
import calabashFodayScene03 from "./magic-calabash/scene-03.json";
import calabashFodayScene04 from "./magic-calabash/scene-04.json";
import calabashFodayScene05 from "./magic-calabash/scene-05.json";
import calabashAmaraScene01 from "./magic-calabash/scene-01-amara.json";
import calabashAmaraScene02 from "./magic-calabash/scene-02-amara.json";
import calabashAmaraScene03 from "./magic-calabash/scene-03-amara.json";
import calabashAmaraScene04 from "./magic-calabash/scene-04-amara.json";
import calabashAmaraScene05 from "./magic-calabash/scene-05-amara.json";
import calabashBaboucarScene01 from "./magic-calabash/scene-01-baboucar.json";
import calabashBaboucarScene02 from "./magic-calabash/scene-02-baboucar.json";
import calabashBaboucarScene03 from "./magic-calabash/scene-03-baboucar.json";
import calabashBaboucarScene04 from "./magic-calabash/scene-04-baboucar.json";
import calabashBaboucarScene05 from "./magic-calabash/scene-05-baboucar.json";
import calabashKaddyScene01 from "./magic-calabash/scene-01-kaddy.json";
import calabashKaddyScene02 from "./magic-calabash/scene-02-kaddy.json";
import calabashKaddyScene03 from "./magic-calabash/scene-03-kaddy.json";
import calabashKaddyScene04 from "./magic-calabash/scene-04-kaddy.json";
import calabashKaddyScene05 from "./magic-calabash/scene-05-kaddy.json";

// --- the-whirling-spirit-of-the-fromager ---
import kumpoFodayScene01 from "./whirling-spirit-kumpo/scene-01.json";
import kumpoFodayScene02 from "./whirling-spirit-kumpo/scene-02.json";
import kumpoFodayScene03 from "./whirling-spirit-kumpo/scene-03.json";
import kumpoFodayScene04 from "./whirling-spirit-kumpo/scene-04.json";
import kumpoAmaraScene01 from "./whirling-spirit-kumpo/scene-01-amara.json";
import kumpoAmaraScene02 from "./whirling-spirit-kumpo/scene-02-amara.json";
import kumpoAmaraScene03 from "./whirling-spirit-kumpo/scene-03-amara.json";
import kumpoAmaraScene04 from "./whirling-spirit-kumpo/scene-04-amara.json";
import kumpoBaboucarScene01 from "./whirling-spirit-kumpo/scene-01-baboucar.json";
import kumpoBaboucarScene02 from "./whirling-spirit-kumpo/scene-02-baboucar.json";
import kumpoBaboucarScene03 from "./whirling-spirit-kumpo/scene-03-baboucar.json";
import kumpoBaboucarScene04 from "./whirling-spirit-kumpo/scene-04-baboucar.json";
import kumpoKaddyScene01 from "./whirling-spirit-kumpo/scene-01-kaddy.json";
import kumpoKaddyScene02 from "./whirling-spirit-kumpo/scene-02-kaddy.json";
import kumpoKaddyScene03 from "./whirling-spirit-kumpo/scene-03-kaddy.json";
import kumpoKaddyScene04 from "./whirling-spirit-kumpo/scene-04-kaddy.json";

// ============================================================================
// V1 Default Cues Registry (Backward Compatible)
// ============================================================================
export const CUES_REGISTRY: Record<string, Record<number, NarrationCue[]>> = {
  "the-clever-hare-and-the-great-drought": {
    1: hareAmaraScene01 as NarrationCue[],
    2: hareAmaraScene02 as NarrationCue[],
    3: hareAmaraScene03 as NarrationCue[],
    4: hareAmaraScene04 as NarrationCue[],
    5: hareAmaraScene05 as NarrationCue[],
    6: hareAmaraScene06 as NarrationCue[],
  },
  "the-clever-hare-and-the-hyena": {
    1: hareHyenaAmaraScene01 as NarrationCue[],
    2: hareHyenaAmaraScene02 as NarrationCue[],
    3: hareHyenaAmaraScene03 as NarrationCue[],
    4: hareHyenaAmaraScene04 as NarrationCue[],
    5: hareHyenaAmaraScene05 as NarrationCue[],
    6: hareHyenaAmaraScene06 as NarrationCue[],
  },
  "the-two-kumbas": {
    1: twoKumbasAmaraScene01 as NarrationCue[],
    2: twoKumbasAmaraScene02 as NarrationCue[],
    3: twoKumbasAmaraScene03 as NarrationCue[],
    4: twoKumbasAmaraScene04 as NarrationCue[],
    5: twoKumbasAmaraScene05 as NarrationCue[],
    6: twoKumbasAmaraScene06 as NarrationCue[],
  },
  "the-little-pangolin-who-counted-stars": {
    1: pangolinAmaraScene01 as NarrationCue[],
    2: pangolinAmaraScene02 as NarrationCue[],
  },
  "nightfall-over-janjanbureh": {
    1: nightfallAmaraScene01 as NarrationCue[],
    2: nightfallAmaraScene02 as NarrationCue[],
  },
  "why-the-baobab-grows-upside-down": {
    1: baobabAmaraScene01 as NarrationCue[],
    2: baobabAmaraScene02 as NarrationCue[],
    3: baobabAmaraScene03 as NarrationCue[],
    4: baobabAmaraScene04 as NarrationCue[],
    5: baobabAmaraScene05 as NarrationCue[],
  },
  "fari-queen-of-the-wild-donkeys": {
    1: fariAmaraScene01 as NarrationCue[],
    2: fariAmaraScene02 as NarrationCue[],
    3: fariAmaraScene03 as NarrationCue[],
    4: fariAmaraScene04 as NarrationCue[],
    5: fariAmaraScene05 as NarrationCue[],
  },
  "the-cow-the-hyena-and-the-shared-granary": {
    1: cowHyenaGranaryAmaraScene01 as NarrationCue[],
    2: cowHyenaGranaryAmaraScene02 as NarrationCue[],
    3: cowHyenaGranaryAmaraScene03 as NarrationCue[],
    4: cowHyenaGranaryAmaraScene04 as NarrationCue[],
  },
  "mais-stolen-nianyaa": {
    1: maiAmaraScene01 as NarrationCue[],
    2: maiAmaraScene02 as NarrationCue[],
    3: maiAmaraScene03 as NarrationCue[],
    4: maiAmaraScene04 as NarrationCue[],
  },
  "queen-yanmey-and-the-sovereign-river": {
    1: yanmeyAmaraScene01 as NarrationCue[],
    2: yanmeyAmaraScene02 as NarrationCue[],
    3: yanmeyAmaraScene03 as NarrationCue[],
    4: yanmeyAmaraScene04 as NarrationCue[],
    5: yanmeyAmaraScene05 as NarrationCue[],
  },
  "the-bone-of-mor-lam": {
    1: morLamAmaraScene01 as NarrationCue[],
    2: morLamAmaraScene02 as NarrationCue[],
    3: morLamAmaraScene03 as NarrationCue[],
    4: morLamAmaraScene04 as NarrationCue[],
    5: morLamAmaraScene05 as NarrationCue[],
  },
  "the-birds-parliament": {
    1: birdsAmaraScene01 as NarrationCue[],
    2: birdsAmaraScene02 as NarrationCue[],
    3: birdsAmaraScene03 as NarrationCue[],
    4: birdsAmaraScene04 as NarrationCue[],
  },
  "the-golden-palm-and-the-orphan-boy": {
    1: goldenPalmAmaraScene01 as NarrationCue[],
    2: goldenPalmAmaraScene02 as NarrationCue[],
    3: goldenPalmAmaraScene03 as NarrationCue[],
    4: goldenPalmAmaraScene04 as NarrationCue[],
  },
  "the-whispering-waters-of-ninki-nanka": {
    1: ninkiFodayScene01 as NarrationCue[],
    2: ninkiFodayScene02 as NarrationCue[],
    3: ninkiFodayScene03 as NarrationCue[],
  },
  "the-griot-under-the-baobab": {
    1: griotFodayScene01 as NarrationCue[],
    2: griotFodayScene02 as NarrationCue[],
    3: griotFodayScene03 as NarrationCue[],
  },
  "the-spider-and-the-pot-of-wisdom": {
    1: spiderFodayScene01 as NarrationCue[],
    2: spiderFodayScene02 as NarrationCue[],
    3: spiderFodayScene03 as NarrationCue[],
  },
  "the-kankurang-and-the-sacred-forest": {
    1: kankurangFodayScene01 as NarrationCue[],
    2: kankurangFodayScene02 as NarrationCue[],
    3: kankurangFodayScene03 as NarrationCue[],
    4: kankurangFodayScene04 as NarrationCue[],
    5: kankurangFodayScene05 as NarrationCue[],
  },
  "kelefa-saane": {
    1: kelefaFodayScene01 as NarrationCue[],
    2: kelefaFodayScene02 as NarrationCue[],
    3: kelefaFodayScene03 as NarrationCue[],
    4: kelefaFodayScene04 as NarrationCue[],
    5: kelefaFodayScene05 as NarrationCue[],
    6: kelefaFodayScene06 as NarrationCue[],
  },
  "the-fula-herdsman": {
    1: fulaFodayScene01 as NarrationCue[],
    2: fulaFodayScene02 as NarrationCue[],
    3: fulaFodayScene03 as NarrationCue[],
    4: fulaFodayScene04 as NarrationCue[],
    5: fulaFodayScene05 as NarrationCue[],
    6: fulaFodayScene06 as NarrationCue[],
  },
  "sundiata-lion-of-old-mali": {
    1: sundiataFodayScene01 as NarrationCue[],
    2: sundiataFodayScene02 as NarrationCue[],
    3: sundiataFodayScene03 as NarrationCue[],
    4: sundiataFodayScene04 as NarrationCue[],
    5: sundiataFodayScene05 as NarrationCue[],
    6: sundiataFodayScene06 as NarrationCue[],
  },
  "stone-circles-of-wassu": {
    1: stoneCirclesFodayScene01 as NarrationCue[],
    2: stoneCirclesFodayScene02 as NarrationCue[],
    3: stoneCirclesFodayScene03 as NarrationCue[],
    4: stoneCirclesFodayScene04 as NarrationCue[],
    5: stoneCirclesFodayScene05 as NarrationCue[],
  },
  "the-first-kora": {
    1: firstKoraFodayScene01 as NarrationCue[],
    2: firstKoraFodayScene02 as NarrationCue[],
    3: firstKoraFodayScene03 as NarrationCue[],
    4: firstKoraFodayScene04 as NarrationCue[],
    5: firstKoraFodayScene05 as NarrationCue[],
  },
  "the-ballad-of-massaneh-ceesay": {
    1: massanehFodayScene01 as NarrationCue[],
    2: massanehFodayScene02 as NarrationCue[],
    3: massanehFodayScene03 as NarrationCue[],
    4: massanehFodayScene04 as NarrationCue[],
    5: massanehFodayScene05 as NarrationCue[],
  },
  "boppi-jerreh-spirits-of-dog-island": {
    1: boppiFodayScene01 as NarrationCue[],
    2: boppiFodayScene02 as NarrationCue[],
    3: boppiFodayScene03 as NarrationCue[],
    4: boppiFodayScene04 as NarrationCue[],
  },
  "the-fall-of-kansala": {
    1: kansalaFodayScene01 as NarrationCue[],
    2: kansalaFodayScene02 as NarrationCue[],
    3: kansalaFodayScene03 as NarrationCue[],
    4: kansalaFodayScene04 as NarrationCue[],
    5: kansalaFodayScene05 as NarrationCue[],
    6: kansalaFodayScene06 as NarrationCue[],
  },
  "foday-kaba-and-the-stockade-of-medina": {
    1: fodayFodayScene01 as NarrationCue[],
    2: fodayFodayScene02 as NarrationCue[],
    3: fodayFodayScene03 as NarrationCue[],
    4: fodayFodayScene04 as NarrationCue[],
    5: fodayFodayScene05 as NarrationCue[],
  },
  "koochi-barama-and-the-river-of-truth": {
    1: koochiFodayScene01 as NarrationCue[],
    2: koochiFodayScene02 as NarrationCue[],
    3: koochiFodayScene03 as NarrationCue[],
    4: koochiFodayScene04 as NarrationCue[],
  },
  "the-magic-calabash-of-banjul": {
    1: calabashFodayScene01 as NarrationCue[],
    2: calabashFodayScene02 as NarrationCue[],
    3: calabashFodayScene03 as NarrationCue[],
    4: calabashFodayScene04 as NarrationCue[],
    5: calabashFodayScene05 as NarrationCue[],
  },
  "the-whirling-spirit-of-the-fromager": {
    1: kumpoFodayScene01 as NarrationCue[],
    2: kumpoFodayScene02 as NarrationCue[],
    3: kumpoFodayScene03 as NarrationCue[],
    4: kumpoFodayScene04 as NarrationCue[],
  },
};

// ============================================================================
// Multi-Narrator Cues Registry (Amara, Foday, Elder Baboucar, Kaddy)
// ============================================================================
export const MULTI_CUES_REGISTRY: Record<string, Record<string, Record<number, NarrationCue[]>>> = {
  "the-clever-hare-and-the-great-drought": {
    "amara-gambia": {
      1: hareAmaraScene01 as NarrationCue[],
      2: hareAmaraScene02 as NarrationCue[],
      3: hareAmaraScene03 as NarrationCue[],
      4: hareAmaraScene04 as NarrationCue[],
      5: hareAmaraScene05 as NarrationCue[],
      6: hareAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: hareFodayScene01 as NarrationCue[],
      2: hareFodayScene02 as NarrationCue[],
      3: hareFodayScene03 as NarrationCue[],
      4: hareFodayScene04 as NarrationCue[],
      5: hareFodayScene05 as NarrationCue[],
      6: hareFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: hareBaboucarScene01 as NarrationCue[],
      2: hareBaboucarScene02 as NarrationCue[],
      3: hareBaboucarScene03 as NarrationCue[],
      4: hareBaboucarScene04 as NarrationCue[],
      5: hareBaboucarScene05 as NarrationCue[],
      6: hareBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: hareKaddyScene01 as NarrationCue[],
      2: hareKaddyScene02 as NarrationCue[],
      3: hareKaddyScene03 as NarrationCue[],
      4: hareKaddyScene04 as NarrationCue[],
      5: hareKaddyScene05 as NarrationCue[],
      6: hareKaddyScene06 as NarrationCue[],
    },
  },
  "the-clever-hare-and-the-hyena": {
    "amara-gambia": {
      1: hareHyenaAmaraScene01 as NarrationCue[],
      2: hareHyenaAmaraScene02 as NarrationCue[],
      3: hareHyenaAmaraScene03 as NarrationCue[],
      4: hareHyenaAmaraScene04 as NarrationCue[],
      5: hareHyenaAmaraScene05 as NarrationCue[],
      6: hareHyenaAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: hareHyenaFodayScene01 as NarrationCue[],
      2: hareHyenaFodayScene02 as NarrationCue[],
      3: hareHyenaFodayScene03 as NarrationCue[],
      4: hareHyenaFodayScene04 as NarrationCue[],
      5: hareHyenaFodayScene05 as NarrationCue[],
      6: hareHyenaFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: hareHyenaBaboucarScene01 as NarrationCue[],
      2: hareHyenaBaboucarScene02 as NarrationCue[],
      3: hareHyenaBaboucarScene03 as NarrationCue[],
      4: hareHyenaBaboucarScene04 as NarrationCue[],
      5: hareHyenaBaboucarScene05 as NarrationCue[],
      6: hareHyenaBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: hareHyenaKaddyScene01 as NarrationCue[],
      2: hareHyenaKaddyScene02 as NarrationCue[],
      3: hareHyenaKaddyScene03 as NarrationCue[],
      4: hareHyenaKaddyScene04 as NarrationCue[],
      5: hareHyenaKaddyScene05 as NarrationCue[],
      6: hareHyenaKaddyScene06 as NarrationCue[],
    },
  },
  "the-two-kumbas": {
    "amara-gambia": {
      1: twoKumbasAmaraScene01 as NarrationCue[],
      2: twoKumbasAmaraScene02 as NarrationCue[],
      3: twoKumbasAmaraScene03 as NarrationCue[],
      4: twoKumbasAmaraScene04 as NarrationCue[],
      5: twoKumbasAmaraScene05 as NarrationCue[],
      6: twoKumbasAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: twoKumbasFodayScene01 as NarrationCue[],
      2: twoKumbasFodayScene02 as NarrationCue[],
      3: twoKumbasFodayScene03 as NarrationCue[],
      4: twoKumbasFodayScene04 as NarrationCue[],
      5: twoKumbasFodayScene05 as NarrationCue[],
      6: twoKumbasFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: twoKumbasBaboucarScene01 as NarrationCue[],
      2: twoKumbasBaboucarScene02 as NarrationCue[],
      3: twoKumbasBaboucarScene03 as NarrationCue[],
      4: twoKumbasBaboucarScene04 as NarrationCue[],
      5: twoKumbasBaboucarScene05 as NarrationCue[],
      6: twoKumbasBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: twoKumbasKaddyScene01 as NarrationCue[],
      2: twoKumbasKaddyScene02 as NarrationCue[],
      3: twoKumbasKaddyScene03 as NarrationCue[],
      4: twoKumbasKaddyScene04 as NarrationCue[],
      5: twoKumbasKaddyScene05 as NarrationCue[],
      6: twoKumbasKaddyScene06 as NarrationCue[],
    },
  },
  "the-little-pangolin-who-counted-stars": {
    "amara-gambia": {
      1: pangolinAmaraScene01 as NarrationCue[],
      2: pangolinAmaraScene02 as NarrationCue[],
    },
    "foday-jali": {
      1: pangolinFodayScene01 as NarrationCue[],
      2: pangolinFodayScene02 as NarrationCue[],
    },
    "elder-baboucar": {
      1: pangolinBaboucarScene01 as NarrationCue[],
      2: pangolinBaboucarScene02 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: pangolinKaddyScene01 as NarrationCue[],
      2: pangolinKaddyScene02 as NarrationCue[],
    },
  },
  "nightfall-over-janjanbureh": {
    "amara-gambia": {
      1: nightfallAmaraScene01 as NarrationCue[],
      2: nightfallAmaraScene02 as NarrationCue[],
    },
    "foday-jali": {
      1: nightfallFodayScene01 as NarrationCue[],
      2: nightfallFodayScene02 as NarrationCue[],
    },
    "elder-baboucar": {
      1: nightfallBaboucarScene01 as NarrationCue[],
      2: nightfallBaboucarScene02 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: nightfallKaddyScene01 as NarrationCue[],
      2: nightfallKaddyScene02 as NarrationCue[],
    },
  },
  "why-the-baobab-grows-upside-down": {
    "amara-gambia": {
      1: baobabAmaraScene01 as NarrationCue[],
      2: baobabAmaraScene02 as NarrationCue[],
      3: baobabAmaraScene03 as NarrationCue[],
      4: baobabAmaraScene04 as NarrationCue[],
      5: baobabAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: baobabFodayScene01 as NarrationCue[],
      2: baobabFodayScene02 as NarrationCue[],
      3: baobabFodayScene03 as NarrationCue[],
      4: baobabFodayScene04 as NarrationCue[],
      5: baobabFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: baobabBaboucarScene01 as NarrationCue[],
      2: baobabBaboucarScene02 as NarrationCue[],
      3: baobabBaboucarScene03 as NarrationCue[],
      4: baobabBaboucarScene04 as NarrationCue[],
      5: baobabBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: baobabKaddyScene01 as NarrationCue[],
      2: baobabKaddyScene02 as NarrationCue[],
      3: baobabKaddyScene03 as NarrationCue[],
      4: baobabKaddyScene04 as NarrationCue[],
      5: baobabKaddyScene05 as NarrationCue[],
    },
  },
  "fari-queen-of-the-wild-donkeys": {
    "amara-gambia": {
      1: fariAmaraScene01 as NarrationCue[],
      2: fariAmaraScene02 as NarrationCue[],
      3: fariAmaraScene03 as NarrationCue[],
      4: fariAmaraScene04 as NarrationCue[],
      5: fariAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: fariFodayScene01 as NarrationCue[],
      2: fariFodayScene02 as NarrationCue[],
      3: fariFodayScene03 as NarrationCue[],
      4: fariFodayScene04 as NarrationCue[],
      5: fariFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: fariBaboucarScene01 as NarrationCue[],
      2: fariBaboucarScene02 as NarrationCue[],
      3: fariBaboucarScene03 as NarrationCue[],
      4: fariBaboucarScene04 as NarrationCue[],
      5: fariBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: fariKaddyScene01 as NarrationCue[],
      2: fariKaddyScene02 as NarrationCue[],
      3: fariKaddyScene03 as NarrationCue[],
      4: fariKaddyScene04 as NarrationCue[],
      5: fariKaddyScene05 as NarrationCue[],
    },
  },
  "the-cow-the-hyena-and-the-shared-granary": {
    "amara-gambia": {
      1: cowHyenaGranaryAmaraScene01 as NarrationCue[],
      2: cowHyenaGranaryAmaraScene02 as NarrationCue[],
      3: cowHyenaGranaryAmaraScene03 as NarrationCue[],
      4: cowHyenaGranaryAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: cowHyenaGranaryFodayScene01 as NarrationCue[],
      2: cowHyenaGranaryFodayScene02 as NarrationCue[],
      3: cowHyenaGranaryFodayScene03 as NarrationCue[],
      4: cowHyenaGranaryFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: cowHyenaGranaryBaboucarScene01 as NarrationCue[],
      2: cowHyenaGranaryBaboucarScene02 as NarrationCue[],
      3: cowHyenaGranaryBaboucarScene03 as NarrationCue[],
      4: cowHyenaGranaryBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: cowHyenaGranaryKaddyScene01 as NarrationCue[],
      2: cowHyenaGranaryKaddyScene02 as NarrationCue[],
      3: cowHyenaGranaryKaddyScene03 as NarrationCue[],
      4: cowHyenaGranaryKaddyScene04 as NarrationCue[],
    },
  },
  "mais-stolen-nianyaa": {
    "amara-gambia": {
      1: maiAmaraScene01 as NarrationCue[],
      2: maiAmaraScene02 as NarrationCue[],
      3: maiAmaraScene03 as NarrationCue[],
      4: maiAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: maiFodayScene01 as NarrationCue[],
      2: maiFodayScene02 as NarrationCue[],
      3: maiFodayScene03 as NarrationCue[],
      4: maiFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: maiBaboucarScene01 as NarrationCue[],
      2: maiBaboucarScene02 as NarrationCue[],
      3: maiBaboucarScene03 as NarrationCue[],
      4: maiBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: maiKaddyScene01 as NarrationCue[],
      2: maiKaddyScene02 as NarrationCue[],
      3: maiKaddyScene03 as NarrationCue[],
      4: maiKaddyScene04 as NarrationCue[],
    },
  },
  "queen-yanmey-and-the-sovereign-river": {
    "amara-gambia": {
      1: yanmeyAmaraScene01 as NarrationCue[],
      2: yanmeyAmaraScene02 as NarrationCue[],
      3: yanmeyAmaraScene03 as NarrationCue[],
      4: yanmeyAmaraScene04 as NarrationCue[],
      5: yanmeyAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: yanmeyFodayScene01 as NarrationCue[],
      2: yanmeyFodayScene02 as NarrationCue[],
      3: yanmeyFodayScene03 as NarrationCue[],
      4: yanmeyFodayScene04 as NarrationCue[],
      5: yanmeyFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: yanmeyBaboucarScene01 as NarrationCue[],
      2: yanmeyBaboucarScene02 as NarrationCue[],
      3: yanmeyBaboucarScene03 as NarrationCue[],
      4: yanmeyBaboucarScene04 as NarrationCue[],
      5: yanmeyBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: yanmeyKaddyScene01 as NarrationCue[],
      2: yanmeyKaddyScene02 as NarrationCue[],
      3: yanmeyKaddyScene03 as NarrationCue[],
      4: yanmeyKaddyScene04 as NarrationCue[],
      5: yanmeyKaddyScene05 as NarrationCue[],
    },
  },
  "the-bone-of-mor-lam": {
    "amara-gambia": {
      1: morLamAmaraScene01 as NarrationCue[],
      2: morLamAmaraScene02 as NarrationCue[],
      3: morLamAmaraScene03 as NarrationCue[],
      4: morLamAmaraScene04 as NarrationCue[],
      5: morLamAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: morLamFodayScene01 as NarrationCue[],
      2: morLamFodayScene02 as NarrationCue[],
      3: morLamFodayScene03 as NarrationCue[],
      4: morLamFodayScene04 as NarrationCue[],
      5: morLamFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: morLamBaboucarScene01 as NarrationCue[],
      2: morLamBaboucarScene02 as NarrationCue[],
      3: morLamBaboucarScene03 as NarrationCue[],
      4: morLamBaboucarScene04 as NarrationCue[],
      5: morLamBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: morLamKaddyScene01 as NarrationCue[],
      2: morLamKaddyScene02 as NarrationCue[],
      3: morLamKaddyScene03 as NarrationCue[],
      4: morLamKaddyScene04 as NarrationCue[],
      5: morLamKaddyScene05 as NarrationCue[],
    },
  },
  "the-birds-parliament": {
    "amara-gambia": {
      1: birdsAmaraScene01 as NarrationCue[],
      2: birdsAmaraScene02 as NarrationCue[],
      3: birdsAmaraScene03 as NarrationCue[],
      4: birdsAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: birdsFodayScene01 as NarrationCue[],
      2: birdsFodayScene02 as NarrationCue[],
      3: birdsFodayScene03 as NarrationCue[],
      4: birdsFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: birdsBaboucarScene01 as NarrationCue[],
      2: birdsBaboucarScene02 as NarrationCue[],
      3: birdsBaboucarScene03 as NarrationCue[],
      4: birdsBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: birdsKaddyScene01 as NarrationCue[],
      2: birdsKaddyScene02 as NarrationCue[],
      3: birdsKaddyScene03 as NarrationCue[],
      4: birdsKaddyScene04 as NarrationCue[],
    },
  },
  "the-golden-palm-and-the-orphan-boy": {
    "amara-gambia": {
      1: goldenPalmAmaraScene01 as NarrationCue[],
      2: goldenPalmAmaraScene02 as NarrationCue[],
      3: goldenPalmAmaraScene03 as NarrationCue[],
      4: goldenPalmAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: goldenPalmFodayScene01 as NarrationCue[],
      2: goldenPalmFodayScene02 as NarrationCue[],
      3: goldenPalmFodayScene03 as NarrationCue[],
      4: goldenPalmFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: goldenPalmBaboucarScene01 as NarrationCue[],
      2: goldenPalmBaboucarScene02 as NarrationCue[],
      3: goldenPalmBaboucarScene03 as NarrationCue[],
      4: goldenPalmBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: goldenPalmKaddyScene01 as NarrationCue[],
      2: goldenPalmKaddyScene02 as NarrationCue[],
      3: goldenPalmKaddyScene03 as NarrationCue[],
      4: goldenPalmKaddyScene04 as NarrationCue[],
    },
  },
  "the-whispering-waters-of-ninki-nanka": {
    "amara-gambia": {
      1: ninkiAmaraScene01 as NarrationCue[],
      2: ninkiAmaraScene02 as NarrationCue[],
      3: ninkiAmaraScene03 as NarrationCue[],
    },
    "foday-jali": {
      1: ninkiFodayScene01 as NarrationCue[],
      2: ninkiFodayScene02 as NarrationCue[],
      3: ninkiFodayScene03 as NarrationCue[],
    },
    "elder-baboucar": {
      1: ninkiBaboucarScene01 as NarrationCue[],
      2: ninkiBaboucarScene02 as NarrationCue[],
      3: ninkiBaboucarScene03 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: ninkiKaddyScene01 as NarrationCue[],
      2: ninkiKaddyScene02 as NarrationCue[],
      3: ninkiKaddyScene03 as NarrationCue[],
    },
  },
  "the-griot-under-the-baobab": {
    "amara-gambia": {
      1: griotAmaraScene01 as NarrationCue[],
      2: griotAmaraScene02 as NarrationCue[],
      3: griotAmaraScene03 as NarrationCue[],
    },
    "foday-jali": {
      1: griotFodayScene01 as NarrationCue[],
      2: griotFodayScene02 as NarrationCue[],
      3: griotFodayScene03 as NarrationCue[],
    },
    "elder-baboucar": {
      1: griotBaboucarScene01 as NarrationCue[],
      2: griotBaboucarScene02 as NarrationCue[],
      3: griotBaboucarScene03 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: griotKaddyScene01 as NarrationCue[],
      2: griotKaddyScene02 as NarrationCue[],
      3: griotKaddyScene03 as NarrationCue[],
    },
  },
  "the-spider-and-the-pot-of-wisdom": {
    "amara-gambia": {
      1: spiderAmaraScene01 as NarrationCue[],
      2: spiderAmaraScene02 as NarrationCue[],
      3: spiderAmaraScene03 as NarrationCue[],
    },
    "foday-jali": {
      1: spiderFodayScene01 as NarrationCue[],
      2: spiderFodayScene02 as NarrationCue[],
      3: spiderFodayScene03 as NarrationCue[],
    },
    "elder-baboucar": {
      1: spiderBaboucarScene01 as NarrationCue[],
      2: spiderBaboucarScene02 as NarrationCue[],
      3: spiderBaboucarScene03 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: spiderKaddyScene01 as NarrationCue[],
      2: spiderKaddyScene02 as NarrationCue[],
      3: spiderKaddyScene03 as NarrationCue[],
    },
  },
  "the-kankurang-and-the-sacred-forest": {
    "amara-gambia": {
      1: kankurangAmaraScene01 as NarrationCue[],
      2: kankurangAmaraScene02 as NarrationCue[],
      3: kankurangAmaraScene03 as NarrationCue[],
      4: kankurangAmaraScene04 as NarrationCue[],
      5: kankurangAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: kankurangFodayScene01 as NarrationCue[],
      2: kankurangFodayScene02 as NarrationCue[],
      3: kankurangFodayScene03 as NarrationCue[],
      4: kankurangFodayScene04 as NarrationCue[],
      5: kankurangFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: kankurangBaboucarScene01 as NarrationCue[],
      2: kankurangBaboucarScene02 as NarrationCue[],
      3: kankurangBaboucarScene03 as NarrationCue[],
      4: kankurangBaboucarScene04 as NarrationCue[],
      5: kankurangBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: kankurangKaddyScene01 as NarrationCue[],
      2: kankurangKaddyScene02 as NarrationCue[],
      3: kankurangKaddyScene03 as NarrationCue[],
      4: kankurangKaddyScene04 as NarrationCue[],
      5: kankurangKaddyScene05 as NarrationCue[],
    },
  },
  "kelefa-saane": {
    "amara-gambia": {
      1: kelefaAmaraScene01 as NarrationCue[],
      2: kelefaAmaraScene02 as NarrationCue[],
      3: kelefaAmaraScene03 as NarrationCue[],
      4: kelefaAmaraScene04 as NarrationCue[],
      5: kelefaAmaraScene05 as NarrationCue[],
      6: kelefaAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: kelefaFodayScene01 as NarrationCue[],
      2: kelefaFodayScene02 as NarrationCue[],
      3: kelefaFodayScene03 as NarrationCue[],
      4: kelefaFodayScene04 as NarrationCue[],
      5: kelefaFodayScene05 as NarrationCue[],
      6: kelefaFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: kelefaBaboucarScene01 as NarrationCue[],
      2: kelefaBaboucarScene02 as NarrationCue[],
      3: kelefaBaboucarScene03 as NarrationCue[],
      4: kelefaBaboucarScene04 as NarrationCue[],
      5: kelefaBaboucarScene05 as NarrationCue[],
      6: kelefaBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: kelefaKaddyScene01 as NarrationCue[],
      2: kelefaKaddyScene02 as NarrationCue[],
      3: kelefaKaddyScene03 as NarrationCue[],
      4: kelefaKaddyScene04 as NarrationCue[],
      5: kelefaKaddyScene05 as NarrationCue[],
      6: kelefaKaddyScene06 as NarrationCue[],
    },
  },
  "the-fula-herdsman": {
    "amara-gambia": {
      1: fulaAmaraScene01 as NarrationCue[],
      2: fulaAmaraScene02 as NarrationCue[],
      3: fulaAmaraScene03 as NarrationCue[],
      4: fulaAmaraScene04 as NarrationCue[],
      5: fulaAmaraScene05 as NarrationCue[],
      6: fulaAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: fulaFodayScene01 as NarrationCue[],
      2: fulaFodayScene02 as NarrationCue[],
      3: fulaFodayScene03 as NarrationCue[],
      4: fulaFodayScene04 as NarrationCue[],
      5: fulaFodayScene05 as NarrationCue[],
      6: fulaFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: fulaBaboucarScene01 as NarrationCue[],
      2: fulaBaboucarScene02 as NarrationCue[],
      3: fulaBaboucarScene03 as NarrationCue[],
      4: fulaBaboucarScene04 as NarrationCue[],
      5: fulaBaboucarScene05 as NarrationCue[],
      6: fulaBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: fulaKaddyScene01 as NarrationCue[],
      2: fulaKaddyScene02 as NarrationCue[],
      3: fulaKaddyScene03 as NarrationCue[],
      4: fulaKaddyScene04 as NarrationCue[],
      5: fulaKaddyScene05 as NarrationCue[],
      6: fulaKaddyScene06 as NarrationCue[],
    },
  },
  "sundiata-lion-of-old-mali": {
    "amara-gambia": {
      1: sundiataAmaraScene01 as NarrationCue[],
      2: sundiataAmaraScene02 as NarrationCue[],
      3: sundiataAmaraScene03 as NarrationCue[],
      4: sundiataAmaraScene04 as NarrationCue[],
      5: sundiataAmaraScene05 as NarrationCue[],
      6: sundiataAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: sundiataFodayScene01 as NarrationCue[],
      2: sundiataFodayScene02 as NarrationCue[],
      3: sundiataFodayScene03 as NarrationCue[],
      4: sundiataFodayScene04 as NarrationCue[],
      5: sundiataFodayScene05 as NarrationCue[],
      6: sundiataFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: sundiataBaboucarScene01 as NarrationCue[],
      2: sundiataBaboucarScene02 as NarrationCue[],
      3: sundiataBaboucarScene03 as NarrationCue[],
      4: sundiataBaboucarScene04 as NarrationCue[],
      5: sundiataBaboucarScene05 as NarrationCue[],
      6: sundiataBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: sundiataKaddyScene01 as NarrationCue[],
      2: sundiataKaddyScene02 as NarrationCue[],
      3: sundiataKaddyScene03 as NarrationCue[],
      4: sundiataKaddyScene04 as NarrationCue[],
      5: sundiataKaddyScene05 as NarrationCue[],
      6: sundiataKaddyScene06 as NarrationCue[],
    },
  },
  "stone-circles-of-wassu": {
    "amara-gambia": {
      1: stoneCirclesAmaraScene01 as NarrationCue[],
      2: stoneCirclesAmaraScene02 as NarrationCue[],
      3: stoneCirclesAmaraScene03 as NarrationCue[],
      4: stoneCirclesAmaraScene04 as NarrationCue[],
      5: stoneCirclesAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: stoneCirclesFodayScene01 as NarrationCue[],
      2: stoneCirclesFodayScene02 as NarrationCue[],
      3: stoneCirclesFodayScene03 as NarrationCue[],
      4: stoneCirclesFodayScene04 as NarrationCue[],
      5: stoneCirclesFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: stoneCirclesBaboucarScene01 as NarrationCue[],
      2: stoneCirclesBaboucarScene02 as NarrationCue[],
      3: stoneCirclesBaboucarScene03 as NarrationCue[],
      4: stoneCirclesBaboucarScene04 as NarrationCue[],
      5: stoneCirclesBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: stoneCirclesKaddyScene01 as NarrationCue[],
      2: stoneCirclesKaddyScene02 as NarrationCue[],
      3: stoneCirclesKaddyScene03 as NarrationCue[],
      4: stoneCirclesKaddyScene04 as NarrationCue[],
      5: stoneCirclesKaddyScene05 as NarrationCue[],
    },
  },
  "the-first-kora": {
    "amara-gambia": {
      1: firstKoraAmaraScene01 as NarrationCue[],
      2: firstKoraAmaraScene02 as NarrationCue[],
      3: firstKoraAmaraScene03 as NarrationCue[],
      4: firstKoraAmaraScene04 as NarrationCue[],
      5: firstKoraAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: firstKoraFodayScene01 as NarrationCue[],
      2: firstKoraFodayScene02 as NarrationCue[],
      3: firstKoraFodayScene03 as NarrationCue[],
      4: firstKoraFodayScene04 as NarrationCue[],
      5: firstKoraFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: firstKoraBaboucarScene01 as NarrationCue[],
      2: firstKoraBaboucarScene02 as NarrationCue[],
      3: firstKoraBaboucarScene03 as NarrationCue[],
      4: firstKoraBaboucarScene04 as NarrationCue[],
      5: firstKoraBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: firstKoraKaddyScene01 as NarrationCue[],
      2: firstKoraKaddyScene02 as NarrationCue[],
      3: firstKoraKaddyScene03 as NarrationCue[],
      4: firstKoraKaddyScene04 as NarrationCue[],
      5: firstKoraKaddyScene05 as NarrationCue[],
    },
  },
  "the-ballad-of-massaneh-ceesay": {
    "amara-gambia": {
      1: massanehAmaraScene01 as NarrationCue[],
      2: massanehAmaraScene02 as NarrationCue[],
      3: massanehAmaraScene03 as NarrationCue[],
      4: massanehAmaraScene04 as NarrationCue[],
      5: massanehAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: massanehFodayScene01 as NarrationCue[],
      2: massanehFodayScene02 as NarrationCue[],
      3: massanehFodayScene03 as NarrationCue[],
      4: massanehFodayScene04 as NarrationCue[],
      5: massanehFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: massanehBaboucarScene01 as NarrationCue[],
      2: massanehBaboucarScene02 as NarrationCue[],
      3: massanehBaboucarScene03 as NarrationCue[],
      4: massanehBaboucarScene04 as NarrationCue[],
      5: massanehBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: massanehKaddyScene01 as NarrationCue[],
      2: massanehKaddyScene02 as NarrationCue[],
      3: massanehKaddyScene03 as NarrationCue[],
      4: massanehKaddyScene04 as NarrationCue[],
      5: massanehKaddyScene05 as NarrationCue[],
    },
  },
  "boppi-jerreh-spirits-of-dog-island": {
    "amara-gambia": {
      1: boppiAmaraScene01 as NarrationCue[],
      2: boppiAmaraScene02 as NarrationCue[],
      3: boppiAmaraScene03 as NarrationCue[],
      4: boppiAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: boppiFodayScene01 as NarrationCue[],
      2: boppiFodayScene02 as NarrationCue[],
      3: boppiFodayScene03 as NarrationCue[],
      4: boppiFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: boppiBaboucarScene01 as NarrationCue[],
      2: boppiBaboucarScene02 as NarrationCue[],
      3: boppiBaboucarScene03 as NarrationCue[],
      4: boppiBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: boppiKaddyScene01 as NarrationCue[],
      2: boppiKaddyScene02 as NarrationCue[],
      3: boppiKaddyScene03 as NarrationCue[],
      4: boppiKaddyScene04 as NarrationCue[],
    },
  },
  "the-fall-of-kansala": {
    "amara-gambia": {
      1: kansalaAmaraScene01 as NarrationCue[],
      2: kansalaAmaraScene02 as NarrationCue[],
      3: kansalaAmaraScene03 as NarrationCue[],
      4: kansalaAmaraScene04 as NarrationCue[],
      5: kansalaAmaraScene05 as NarrationCue[],
      6: kansalaAmaraScene06 as NarrationCue[],
    },
    "foday-jali": {
      1: kansalaFodayScene01 as NarrationCue[],
      2: kansalaFodayScene02 as NarrationCue[],
      3: kansalaFodayScene03 as NarrationCue[],
      4: kansalaFodayScene04 as NarrationCue[],
      5: kansalaFodayScene05 as NarrationCue[],
      6: kansalaFodayScene06 as NarrationCue[],
    },
    "elder-baboucar": {
      1: kansalaBaboucarScene01 as NarrationCue[],
      2: kansalaBaboucarScene02 as NarrationCue[],
      3: kansalaBaboucarScene03 as NarrationCue[],
      4: kansalaBaboucarScene04 as NarrationCue[],
      5: kansalaBaboucarScene05 as NarrationCue[],
      6: kansalaBaboucarScene06 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: kansalaKaddyScene01 as NarrationCue[],
      2: kansalaKaddyScene02 as NarrationCue[],
      3: kansalaKaddyScene03 as NarrationCue[],
      4: kansalaKaddyScene04 as NarrationCue[],
      5: kansalaKaddyScene05 as NarrationCue[],
      6: kansalaKaddyScene06 as NarrationCue[],
    },
  },
  "foday-kaba-and-the-stockade-of-medina": {
    "amara-gambia": {
      1: fodayAmaraScene01 as NarrationCue[],
      2: fodayAmaraScene02 as NarrationCue[],
      3: fodayAmaraScene03 as NarrationCue[],
      4: fodayAmaraScene04 as NarrationCue[],
      5: fodayAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: fodayFodayScene01 as NarrationCue[],
      2: fodayFodayScene02 as NarrationCue[],
      3: fodayFodayScene03 as NarrationCue[],
      4: fodayFodayScene04 as NarrationCue[],
      5: fodayFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: fodayBaboucarScene01 as NarrationCue[],
      2: fodayBaboucarScene02 as NarrationCue[],
      3: fodayBaboucarScene03 as NarrationCue[],
      4: fodayBaboucarScene04 as NarrationCue[],
      5: fodayBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: fodayKaddyScene01 as NarrationCue[],
      2: fodayKaddyScene02 as NarrationCue[],
      3: fodayKaddyScene03 as NarrationCue[],
      4: fodayKaddyScene04 as NarrationCue[],
      5: fodayKaddyScene05 as NarrationCue[],
    },
  },
  "koochi-barama-and-the-river-of-truth": {
    "amara-gambia": {
      1: koochiAmaraScene01 as NarrationCue[],
      2: koochiAmaraScene02 as NarrationCue[],
      3: koochiAmaraScene03 as NarrationCue[],
      4: koochiAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: koochiFodayScene01 as NarrationCue[],
      2: koochiFodayScene02 as NarrationCue[],
      3: koochiFodayScene03 as NarrationCue[],
      4: koochiFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: koochiBaboucarScene01 as NarrationCue[],
      2: koochiBaboucarScene02 as NarrationCue[],
      3: koochiBaboucarScene03 as NarrationCue[],
      4: koochiBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: koochiKaddyScene01 as NarrationCue[],
      2: koochiKaddyScene02 as NarrationCue[],
      3: koochiKaddyScene03 as NarrationCue[],
      4: koochiKaddyScene04 as NarrationCue[],
    },
  },
  "the-magic-calabash-of-banjul": {
    "amara-gambia": {
      1: calabashAmaraScene01 as NarrationCue[],
      2: calabashAmaraScene02 as NarrationCue[],
      3: calabashAmaraScene03 as NarrationCue[],
      4: calabashAmaraScene04 as NarrationCue[],
      5: calabashAmaraScene05 as NarrationCue[],
    },
    "foday-jali": {
      1: calabashFodayScene01 as NarrationCue[],
      2: calabashFodayScene02 as NarrationCue[],
      3: calabashFodayScene03 as NarrationCue[],
      4: calabashFodayScene04 as NarrationCue[],
      5: calabashFodayScene05 as NarrationCue[],
    },
    "elder-baboucar": {
      1: calabashBaboucarScene01 as NarrationCue[],
      2: calabashBaboucarScene02 as NarrationCue[],
      3: calabashBaboucarScene03 as NarrationCue[],
      4: calabashBaboucarScene04 as NarrationCue[],
      5: calabashBaboucarScene05 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: calabashKaddyScene01 as NarrationCue[],
      2: calabashKaddyScene02 as NarrationCue[],
      3: calabashKaddyScene03 as NarrationCue[],
      4: calabashKaddyScene04 as NarrationCue[],
      5: calabashKaddyScene05 as NarrationCue[],
    },
  },
  "the-whirling-spirit-of-the-fromager": {
    "amara-gambia": {
      1: kumpoAmaraScene01 as NarrationCue[],
      2: kumpoAmaraScene02 as NarrationCue[],
      3: kumpoAmaraScene03 as NarrationCue[],
      4: kumpoAmaraScene04 as NarrationCue[],
    },
    "foday-jali": {
      1: kumpoFodayScene01 as NarrationCue[],
      2: kumpoFodayScene02 as NarrationCue[],
      3: kumpoFodayScene03 as NarrationCue[],
      4: kumpoFodayScene04 as NarrationCue[],
    },
    "elder-baboucar": {
      1: kumpoBaboucarScene01 as NarrationCue[],
      2: kumpoBaboucarScene02 as NarrationCue[],
      3: kumpoBaboucarScene03 as NarrationCue[],
      4: kumpoBaboucarScene04 as NarrationCue[],
    },
    "kaddy-brikama": {
      1: kumpoKaddyScene01 as NarrationCue[],
      2: kumpoKaddyScene02 as NarrationCue[],
      3: kumpoKaddyScene03 as NarrationCue[],
      4: kumpoKaddyScene04 as NarrationCue[],
    },
  },
};

/**
 * Retrieves narration cues for a story scene.
 * If narratorId is provided, returns cues tailored to that narrator's pacing.
 * Otherwise returns default cues for backward compatibility.
 */
export function getStorySceneCues(
  storySlug: string,
  sceneNumber: number,
  narratorId: string = DEFAULT_NARRATOR_ID
): NarrationCue[] | undefined {
  if (narratorId && MULTI_CUES_REGISTRY[storySlug]?.[narratorId]?.[sceneNumber]) {
    return MULTI_CUES_REGISTRY[storySlug][narratorId][sceneNumber];
  }
  return CUES_REGISTRY[storySlug]?.[sceneNumber];
}

/**
 * Efficient binary-search lookup for active cue index given audio currentTime.
 * Returns -1 if no cue is active (e.g., before first cue or after last cue).
 */
export function findActiveCueIndex(
  cues: NarrationCue[] | undefined,
  time: number
): number {
  if (!cues || cues.length === 0 || time < 0) return -1;

  let low = 0;
  let high = cues.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const cue = cues[mid];
    if (time >= cue.startSeconds && time < cue.endSeconds) {
      return mid;
    }
    if (time < cue.startSeconds) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // If time is past the end of the last cue (e.g. final pause before ended event),
  // leave the final cue active as specified in spec.
  const lastCue = cues[cues.length - 1];
  if (time >= lastCue.startSeconds && time <= lastCue.endSeconds + 1.5) {
    return cues.length - 1;
  }

  return -1;
}
