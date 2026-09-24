"""
Wire all 15 stories into data/audio/cues/index.ts and wire all 13 stories' TS files.
"""

import os
import json
import re

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# Complete 15 story list in order
ALL_STORIES = [
    {
        "slug": "the-clever-hare-and-the-great-drought",
        "file": "data/stories/adapted/hare-drought.ts",
        "cue_folder": "hare-drought",
        "prefix": "hareScene",
        "scenes_count": 6,
        "already_wired": True,
    },
    {
        "slug": "the-whispering-waters-of-ninki-nanka",
        "file": "data/stories/adapted/ninki-nanka.ts",
        "cue_folder": "ninki-nanka",
        "prefix": "ninkiScene",
        "scenes_count": 3,
        "already_wired": True,
    },
    {
        "slug": "the-griot-under-the-baobab",
        "file": "data/stories/adapted/griot-baobab.ts",
        "cue_folder": "griot-baobab",
        "prefix": "griotScene",
        "scenes_count": 3,
        "already_wired": True,
    },
    {
        "slug": "the-little-pangolin-who-counted-stars",
        "file": "data/stories/original/little-pangolin.ts",
        "cue_folder": "little-pangolin",
        "prefix": "pangolinScene",
        "scenes_count": 2,
        "already_wired": True,
    },
    {
        "slug": "nightfall-over-janjanbureh",
        "file": "data/stories/adapted/nightfall-janjanbureh.ts",
        "cue_folder": "nightfall-janjanbureh",
        "prefix": "nightfallScene",
        "scenes_count": 2,
        "already_wired": True,
    },
    {
        "slug": "the-spider-and-the-pot-of-wisdom",
        "file": "data/stories/adapted/spider-wisdom.ts",
        "cue_folder": "spider-wisdom",
        "prefix": "spiderScene",
        "scenes_count": 3,
        "already_wired": True,
    },
    {
        "slug": "the-clever-hare-and-the-hyena",
        "file": "data/stories/adapted/clever-hare-and-hyena.ts",
        "cue_folder": "clever-hare-hyena",
        "prefix": "hareHyenaScene",
        "scenes_count": 6,
        "already_wired": True,
    },
    {
        "slug": "the-two-kumbas",
        "file": "data/stories/adapted/two-kumbas.ts",
        "cue_folder": "two-kumbas",
        "prefix": "twoKumbasScene",
        "scenes_count": 6,
        "already_wired": True,
    },
    {
        "slug": "the-kankurang-and-the-sacred-forest",
        "file": "data/stories/legends/kankurang-sacred-forest.ts",
        "cue_folder": "kankurang",
        "prefix": "kankurangScene",
        "scenes_count": 5,
        "already_wired": True,
    },
    {
        "slug": "kelefa-saane",
        "file": "data/stories/historical/kelefa-saane.ts",
        "cue_folder": "kelefa-saane",
        "prefix": "kelefaScene",
        "scenes_count": 6,
        "already_wired": True,
    },
    {
        "slug": "the-fula-herdsman",
        "file": "data/stories/adapted/the-fula-herdsman.ts",
        "cue_folder": "fula-herdsman",
        "prefix": "fulaScene",
        "scenes_count": 6,
        "already_wired": True,
    },
    {
        "slug": "sundiata-lion-of-old-mali",
        "file": "data/stories/historical/sundiata-lion-of-old-mali.ts",
        "cue_folder": "sundiata",
        "prefix": "sundiataScene",
        "scenes_count": 6,
        "already_wired": True,
    },
    {
        "slug": "why-the-baobab-grows-upside-down",
        "file": "data/stories/adapted/why-the-baobab-grows-upside-down.ts",
        "cue_folder": "baobab-upside-down",
        "prefix": "baobabScene",
        "scenes_count": 5,
        "already_wired": True,
    },
    {
        "slug": "stone-circles-of-wassu",
        "file": "data/stories/historical/stone-circles-of-wassu.ts",
        "cue_folder": "stone-circles",
        "prefix": "stoneCirclesScene",
        "scenes_count": 5,
        "already_wired": True,
    },
    {
        "slug": "the-first-kora",
        "file": "data/stories/legends/the-first-kora.ts",
        "cue_folder": "first-kora",
        "prefix": "firstKoraScene",
        "scenes_count": 5,
        "already_wired": True,
    },
    # ── New Stories: 14 additions ──────────────────────────────────────────
    {
        "slug": "the-ballad-of-massaneh-ceesay",
        "file": "data/stories/historical/massaneh-ceesay.ts",
        "cue_folder": "massaneh-ceesay",
        "prefix": "massanehScene",
        "scenes_count": 5,
        "already_wired": False,
    },
    {
        "slug": "boppi-jerreh-spirits-of-dog-island",
        "file": "data/stories/legends/boppi-jerreh.ts",
        "cue_folder": "boppi-jerreh",
        "prefix": "boppiScene",
        "scenes_count": 4,
        "already_wired": False,
    },
    {
        "slug": "fari-queen-of-the-wild-donkeys",
        "file": "data/stories/adapted/fari-queen-of-donkeys.ts",
        "cue_folder": "fari-queen",
        "prefix": "fariScene",
        "scenes_count": 5,
        "already_wired": False,
    },
    {
        "slug": "the-cow-the-hyena-and-the-shared-granary",
        "file": "data/stories/adapted/cow-hyena-shared-granary.ts",
        "cue_folder": "cow-hyena-granary",
        "prefix": "cowHyenaGranaryScene",
        "scenes_count": 4,
        "already_wired": False,
    },
    {
        "slug": "mais-stolen-nianyaa",
        "file": "data/stories/adapted/mais-stolen-nianyaa.ts",
        "cue_folder": "mais-nianyaa",
        "prefix": "maiScene",
        "scenes_count": 4,
        "already_wired": False,
    },
    {
        "slug": "the-fall-of-kansala",
        "file": "data/stories/historical/fall-of-kansala.ts",
        "cue_folder": "fall-of-kansala",
        "prefix": "kansalaScene",
        "scenes_count": 6,
        "already_wired": False,
    },
    {
        "slug": "foday-kaba-and-the-stockade-of-medina",
        "file": "data/stories/historical/foday-kaba-medina.ts",
        "cue_folder": "foday-kaba",
        "prefix": "fodayScene",
        "scenes_count": 5,
        "already_wired": False,
    },
    {
        "slug": "queen-yanmey-and-the-sovereign-river",
        "file": "data/stories/historical/queen-yanmey.ts",
        "cue_folder": "queen-yanmey",
        "prefix": "yanmeyScene",
        "scenes_count": 5,
        "already_wired": False,
    },
    {
        "slug": "koochi-barama-and-the-river-of-truth",
        "file": "data/stories/adapted/koochi-barama.ts",
        "cue_folder": "koochi-barama",
        "prefix": "koochiScene",
        "scenes_count": 4,
        "already_wired": False,
    },
    {
        "slug": "the-bone-of-mor-lam",
        "file": "data/stories/adapted/bone-of-mor-lam.ts",
        "cue_folder": "bone-of-mor-lam",
        "prefix": "morLamScene",
        "scenes_count": 5,
        "already_wired": False,
    },
    {
        "slug": "the-magic-calabash-of-banjul",
        "file": "data/stories/adapted/magic-calabash.ts",
        "cue_folder": "magic-calabash",
        "prefix": "calabashScene",
        "scenes_count": 5,
        "already_wired": False,
    },
    {
        "slug": "the-whirling-spirit-of-the-fromager",
        "file": "data/stories/legends/whirling-spirit-kumpo.ts",
        "cue_folder": "whirling-spirit-kumpo",
        "prefix": "kumpoScene",
        "scenes_count": 4,
        "already_wired": False,
    },
    {
        "slug": "the-birds-parliament",
        "file": "data/stories/adapted/birds-parliament.ts",
        "cue_folder": "birds-parliament",
        "prefix": "birdsScene",
        "scenes_count": 4,
        "already_wired": False,
    },
    {
        "slug": "the-golden-palm-and-the-orphan-boy",
        "file": "data/stories/adapted/golden-palm-orphan.ts",
        "cue_folder": "golden-palm-orphan",
        "prefix": "goldenPalmScene",
        "scenes_count": 4,
        "already_wired": False,
    },
]

def generate_cues_index_ts():
    lines = [
        'import { NarrationCue } from "@/types/story";',
        '',
    ]
    
    # Imports
    for s in ALL_STORIES:
        lines.append(f'// {s["slug"]}')
        for num in range(1, s["scenes_count"] + 1):
            var_name = f'{s["prefix"]}{num:02d}'
            rel_path = f'./{s["cue_folder"]}/scene-{num:02d}.json'
            lines.append(f'import {var_name} from "{rel_path}";')
        lines.append('')
        
    lines.append('const CUES_REGISTRY: Record<string, Record<number, NarrationCue[]>> = {')
    for s in ALL_STORIES:
        lines.append(f'  "{s["slug"]}": {{')
        for num in range(1, s["scenes_count"] + 1):
            var_name = f'{s["prefix"]}{num:02d}'
            lines.append(f'    {num}: {var_name} as NarrationCue[],')
        lines.append('  },')
    lines.append('};')
    lines.append('''
/**
 * Retrieves narration cues for a story scene.
 * Returns undefined if no cues exist for the given story or scene.
 */
export function getStorySceneCues(
  storySlug: string,
  sceneNumber: number
): NarrationCue[] | undefined {
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
''')
    
    index_path = os.path.join(PROJECT_ROOT, "data", "audio", "cues", "index.ts")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Updated {index_path} with all 15 stories!")

def wire_story_ts_file(s):
    if s["already_wired"]:
        return
        
    ts_path = os.path.join(PROJECT_ROOT, s["file"])
    with open(ts_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    manifest_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", s["slug"], "manifest.json")
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)
        
    # Map sceneNumber -> durationSeconds from manifest
    durations = {}
    for sm in manifest["scenes"]:
        durations[sm["sceneNumber"]] = sm["durationSeconds"]
        
    # 1. Update import { Story } to import { Story, NarrationCue }
    if "NarrationCue" not in content:
        content = re.sub(
            r'import\s*\{\s*Story\s*\}\s*from\s*["\']@/types/story["\'];',
            'import { Story, NarrationCue } from "@/types/story";',
            content
        )
        
    # 2. Add cue JSON imports after the Story import
    cue_imports = []
    for num in range(1, s["scenes_count"] + 1):
        var_name = f'{s["prefix"]}{num:02d}'
        json_import_path = f'@/data/audio/cues/{s["cue_folder"]}/scene-{num:02d}.json'
        cue_imports.append(f'import {var_name} from "{json_import_path}";')
    cue_imports_str = "\n".join(cue_imports) + "\n"
    
    # Insert cue_imports right after the "@/types/story" import
    import_match = re.search(r'import\s*\{[^}]*\}\s*from\s*["\']@/types/story["\'];', content)
    if import_match:
        pos = import_match.end()
        content = content[:pos] + "\n" + cue_imports_str + content[pos:]
        
    # 3. For each scene, insert audio: { ... } right before the scene's top-level durationSeconds:
    # Scene blocks start at `sceneNumber:\s*(\d+)`
    scene_matches = list(re.finditer(r'\bsceneNumber\s*:\s*(\d+)', content))
    
    # We do replacements from last to first so offsets don't change
    for i in range(len(scene_matches) - 1, -1, -1):
        sm = scene_matches[i]
        scene_num = int(sm.group(1))
        dur = durations.get(scene_num, 30.0)
        var_name = f'{s["prefix"]}{scene_num:02d}'
        narration_url = f'/audio/stories/{s["slug"]}/scene-{scene_num:02d}-narration.mp3'
        
        audio_block = (
            f'      audio: {{\n'
            f'        narrationUrl: "{narration_url}",\n'
            f'        narrationDurationSeconds: {dur},\n'
            f'        cues: {var_name} as NarrationCue[],\n'
            f'      }},\n'
        )
        
        block_start = sm.start()
        block_end = scene_matches[i + 1].start() if i + 1 < len(scene_matches) else len(content)
        block = content[block_start:block_end]
        
        # Find the scene's own durationSeconds:
        # It's at the scene root indentation (typically 6 spaces: `      durationSeconds:`)
        # Avoid matching cameraMotion durationSeconds which is at 8 spaces
        dur_match = re.search(r'\n([ \t]{6})durationSeconds:\s*\d+,', block)
        if not dur_match:
            # Fallback: look for 4 spaces
            dur_match = re.search(r'\n([ \t]+)durationSeconds:\s*\d+,', block)
            
        if dur_match:
            insert_pos = block_start + dur_match.start() + 1 # right before `durationSeconds:`
            content = content[:insert_pos] + audio_block + content[insert_pos:]
        else:
            print(f"  [WARN] Could not find durationSeconds for scene {scene_num} in {s['file']}")
            
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully wired {s['file']}")

if __name__ == "__main__":
    print("Generating complete cues index.ts...")
    generate_cues_index_ts()
    
    print("\nWiring audio + cues into all 13 story TypeScript files...")
    for s in ALL_STORIES:
        wire_story_ts_file(s)
        
    print("\nAll files wired successfully!")
