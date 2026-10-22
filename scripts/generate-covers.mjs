import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const OUTPUT_DIR = path.resolve('public/images/stories');

const stories = [
  {
    slug: 'the-clever-hare-and-the-great-drought',
    prompt: '2D animated storybook illustration West African fable golden savanna dusk clever hare community well baobab tree'
  },
  {
    slug: 'the-whispering-waters-of-ninki-nanka',
    prompt: '2D animated storybook illustration Gambian river legend Ninki Nanka serpent guardian canoe mangrove creek'
  },
  {
    slug: 'the-griot-under-the-baobab',
    prompt: '2D animated storybook illustration elder griot playing 21-string kora under ancient baobab campfire starry night'
  },
  {
    slug: 'the-little-pangolin-who-counted-stars',
    prompt: '2D animated storybook illustration gentle pangolin counting stars on termite mound Abuko forest moonlit canopy'
  },
  {
    slug: 'the-spider-and-the-pot-of-wisdom',
    prompt: '2D animated storybook illustration trickster spider climbing oil palm clay pot cracking golden wisdom sparks swirling'
  },
  {
    slug: 'the-clever-hare-and-the-hyena',
    prompt: '2D animated storybook illustration Leuk the clever African hare on tilled soil with farming hoe Bouki spotted hyena lurking'
  },
  {
    slug: 'nightfall-over-janjanbureh',
    prompt: '2D animated storybook illustration peaceful nightfall River Gambia Janjanbureh Island full moon river ferry boat reeds'
  },
  {
    slug: 'fari-queen-of-the-wild-donkeys',
    prompt: '2D animated storybook illustration wild donkey mare Fari rearing on rocky ridge herd galloping golden savanna baobab sunset'
  },
  {
    slug: 'the-cow-the-hyena-and-the-shared-granary',
    prompt: '2D animated storybook illustration gentle cow sly hyena wise lion standing before round mud granary village'
  },
  {
    slug: 'why-the-baobab-grows-upside-down',
    prompt: '2D animated storybook illustration West African origin myth ancient baobab tree growing upside down gnarled roots reaching skyward ancestral spirit swirling violet gold sunset sky'
  },
  {
    slug: 'the-two-kumbas',
    prompt: '2D animated storybook illustration West African folktale two Gambian boys in village clearing one humble one proud wise grandmother thatched huts mango trees warm golden sunlight'
  },
  {
    slug: 'the-fula-herdsman',
    prompt: '2D animated storybook illustration proud Fula herdsman in traditional boubou robe leather hat shepherd staff leading long-horned Zebu cattle herd across golden savanna sunset'
  },
  {
    slug: 'mais-stolen-nianyaa',
    prompt: '2D animated storybook illustration young Gambian girl kneeling in village compound reaching for glowing traditional gold beaded nianyaa necklace held by trickster spirit mango trees'
  },
  {
    slug: 'koochi-barama-and-the-river-of-truth',
    prompt: '2D animated storybook illustration wise elder Koochi Barama standing at edge of shimmering sacred river at dawn glowing turquoise golden water rippling with mystical energy mangrove roots'
  },
  {
    slug: 'the-bone-of-mor-lam',
    prompt: '2D animated storybook illustration masterful Gambian griot Mor Lam playing kora beside campfire under baobab glowing ancestral bone pulsing with golden light starry night sky'
  },
  {
    slug: 'the-magic-calabash-of-banjul',
    prompt: '2D animated storybook illustration ornate carved calabash gourd glowing from within with golden amber beams in coastal Banjul market traders watching in awe estuary sunset'
  },
  {
    slug: 'the-birds-parliament',
    prompt: '2D animated storybook illustration great assembly of African birds in ancient riverbank tree African fish eagle pied kingfisher sacred ibis marabou stork in lively parliament debate river reflections'
  },
  {
    slug: 'the-golden-palm-and-the-orphan-boy',
    prompt: '2D animated storybook illustration barefoot orphan boy in ochre tunic looking up at towering golden oil palm tree with glowing fronds yellow weaver bird singing falling golden palm nut'
  },
  {
    slug: 'the-kankurang-and-the-sacred-forest',
    prompt: '2D animated storybook illustration majestic Kankurang spirit guardian wrapped in vibrant red fara bark fibers wielding two broad machetes emerging from sacred forest sunbeams canopy'
  },
  {
    slug: 'the-first-kora',
    prompt: '2D animated storybook illustration young hunter Koriang discovering magical 21-string calabash kora hanging from ancient forest tree glowing with golden light ethereal forest spirits floating'
  },
  {
    slug: 'boppi-jerreh-spirits-of-dog-island',
    prompt: '2D animated storybook illustration wooden dugout canoe approaching mysterious mist-shrouded Dog Island in River Gambia eerie blue-green glow among mangrove roots ghostly spirits'
  },
  {
    slug: 'the-whirling-spirit-of-the-fromager',
    prompt: '2D animated storybook illustration colossal silk-cotton fromager tree with massive buttress roots whirling Kumpo masquerade spirit covered in palm leaves dancing in vortex of leaves'
  },
  {
    slug: 'stone-circles-of-wassu',
    prompt: '2D animated storybook illustration ancient megalithic stone circles of Wassu on open savanna tall laterite standing stones casting long shadows stonemason touching sacred stone spirit ancestors'
  },
  {
    slug: 'sundiata-lion-of-old-mali',
    prompt: '2D animated storybook illustration young Sundiata Keita standing triumphant holding great bent iron rod rising on his own feet mother Sogolon weeping with joy ancient Mali mud-brick city sunrise'
  },
  {
    slug: 'the-ballad-of-massaneh-ceesay',
    prompt: '2D animated storybook illustration gallant warrior hero Massaneh Ceesay standing resolute with raised sword and shield before village at golden dusk Mandinka warrior robes dramatic sky'
  },
  {
    slug: 'the-fall-of-kansala',
    prompt: '2D animated storybook illustration final stand at fortress of Kansala Gabu stockade walls glowing with fire King Janke Wali standing defiant atop citadel battle smoke torchlight blood-orange sky'
  },
  {
    slug: 'foday-kaba-and-the-stockade-of-medina',
    prompt: '2D animated storybook illustration wooden stockade gates of fortified town of Medina at pale dawn leader Foday Kaba Dumbuya in white robes holding sword and manuscript defenders around him'
  },
  {
    slug: 'queen-yanmey-and-the-sovereign-river',
    prompt: '2D animated storybook illustration majestic Queen Yanmey standing on high riverbank arms outstretched commanding shimmering River Gambia golden crown regal robes river swirling with light'
  },
  {
    slug: 'kelefa-saane',
    prompt: '2D animated storybook illustration legendary warrior Kelefa Saane on savanna battlefield holding ornate sword aloft braided hair layered battle tunic praising griots with koras wide golden horizon'
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timeStr() {
  return new Date().toISOString().substring(11, 19);
}

async function downloadStory(story, index, total) {
  const fileName = `${story.slug}.jpg`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size > 20000) {
      console.log(`[${timeStr()}] [${index + 1}/${total}] SKIP: ${fileName} (${(stats.size / 1024).toFixed(1)} KB)`);
      return true;
    }
  }

  const encodedPrompt = encodeURIComponent(`${story.prompt}, gouache painterly storybook West African art style, portrait 2x3, no text, no logo, no watermark`);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1152&nologo=true&nofeed=true&model=sana`;

  const maxAttempts = 15;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`[${timeStr()}] [${index + 1}/${total}] Attempt ${attempt}/${maxAttempts} -> ${fileName}...`);
    
    const tempFile = path.join(OUTPUT_DIR, `${story.slug}.tmp`);
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);

    try {
      execFileSync('curl.exe', [
        '-s', '-S', '-L',
        '--max-time', '90',
        url,
        '-o', tempFile
      ], { stdio: 'pipe' });

      if (fs.existsSync(tempFile)) {
        const stats = fs.statSync(tempFile);
        if (stats.size > 20000) {
          fs.renameSync(tempFile, filePath);
          console.log(`[${timeStr()}] [${index + 1}/${total}] SUCCESS: ${fileName} saved (${(stats.size / 1024).toFixed(1)} KB)`);
          
          console.log(`[${timeStr()}] Waiting 48s cooldown before next story...`);
          await sleep(48000);
          return true;
        }

        // Small file, read contents to check error
        const text = fs.readFileSync(tempFile, 'utf8');
        fs.unlinkSync(tempFile);

        const match = text.match(/Retry after (\d+)s/i);
        const waitSec = Math.max(match ? parseInt(match[1], 10) + 5 : 48, 48);
        console.log(`[${timeStr()}] Rate limited (402). Waiting ${waitSec}s full cooldown before retrying...`);
        await sleep(waitSec * 1000);
      } else {
        console.log(`[${timeStr()}] Temp file not found. Waiting 15s...`);
        await sleep(15000);
      }
    } catch (err) {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      console.log(`[${timeStr()}] Curl error: ${err.message}. Waiting 20s...`);
      await sleep(20000);
    }
  }

  console.error(`[${timeStr()}] FAILED to download ${fileName} after ${maxAttempts} attempts.`);
  return false;
}

async function main() {
  console.log(`=== Tales of The Gambia Cover Batch Downloader (curl engine) ===`);
  console.log(`Total stories in catalog: ${stories.length}`);
  console.log(`Output folder: ${OUTPUT_DIR}\n`);

  let succeeded = 0;
  for (let i = 0; i < stories.length; i++) {
    const ok = await downloadStory(stories[i], i, stories.length);
    if (ok) succeeded++;
  }

  console.log(`\n=== Batch Finished: ${succeeded}/${stories.length} stories ready ===`);
}

main().catch(err => console.error('Fatal error:', err));
