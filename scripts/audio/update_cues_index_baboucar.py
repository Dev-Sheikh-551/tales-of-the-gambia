"""
Updates data/audio/cues/index.ts with Elder Baboucar cue imports and registry.
Supports Amara, Foday, and Elder Baboucar.
"""

import os
import json
from multi_narrator_generator import STORY_CONFIGS

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def generate_multi_cues_index_with_baboucar():
    from generate_narration import parse_scenes_from_ts

    out_file = os.path.join(PROJECT_ROOT, "data", "audio", "cues", "index.ts")

    lines = [
        'import { NarrationCue } from "@/types/story";',
        'import { DEFAULT_NARRATOR_ID } from "@/lib/narrators/registry";',
        '',
        '// ============================================================================',
        '// Narration Cue Imports for All 29 Stories (Amara, Foday, Baboucar)',
        '// ============================================================================',
    ]

    for slug, cfg in STORY_CONFIGS.items():
        cue_folder = cfg["cue_folder"]
        prefix = cfg["prefix"]
        existing_voice = cfg["existing_voice"]
        ts_path = os.path.join(PROJECT_ROOT, cfg["file"])
        scenes = parse_scenes_from_ts(ts_path)
        n_scenes = len(scenes)

        lines.append(f"\n// --- {slug} ---")

        if existing_voice == "af_heart":
            # Primary = Amara (V1 files), Secondary = Foday, Tertiary = Baboucar
            for s in range(1, n_scenes + 1):
                lines.append(f'import {prefix}AmaraScene{s:02d} from "./{cue_folder}/scene-{s:02d}.json";')
            for s in range(1, n_scenes + 1):
                lines.append(f'import {prefix}FodayScene{s:02d} from "./{cue_folder}/scene-{s:02d}-foday.json";')
            for s in range(1, n_scenes + 1):
                lines.append(f'import {prefix}BaboucarScene{s:02d} from "./{cue_folder}/scene-{s:02d}-baboucar.json";')
        else:
            # Primary = Foday (V1 files), Secondary = Amara, Tertiary = Baboucar
            for s in range(1, n_scenes + 1):
                lines.append(f'import {prefix}FodayScene{s:02d} from "./{cue_folder}/scene-{s:02d}.json";')
            for s in range(1, n_scenes + 1):
                lines.append(f'import {prefix}AmaraScene{s:02d} from "./{cue_folder}/scene-{s:02d}-amara.json";')
            for s in range(1, n_scenes + 1):
                lines.append(f'import {prefix}BaboucarScene{s:02d} from "./{cue_folder}/scene-{s:02d}-baboucar.json";')

    lines.append('\n// ============================================================================')
    lines.append('// V1 Default Cues Registry (Backward Compatible)')
    lines.append('// ============================================================================')
    lines.append('export const CUES_REGISTRY: Record<string, Record<number, NarrationCue[]>> = {')

    for slug, cfg in STORY_CONFIGS.items():
        prefix = cfg["prefix"]
        existing_voice = cfg["existing_voice"]
        ts_path = os.path.join(PROJECT_ROOT, cfg["file"])
        scenes = parse_scenes_from_ts(ts_path)
        n_scenes = len(scenes)

        default_var = "Amara" if existing_voice == "af_heart" else "Foday"
        lines.append(f'  "{slug}": {{')
        for s in range(1, n_scenes + 1):
            lines.append(f'    {s}: {prefix}{default_var}Scene{s:02d} as NarrationCue[],')
        lines.append('  },')

    lines.append('};\n')

    lines.append('// ============================================================================')
    lines.append('// Multi-Narrator Cues Registry (Amara, Foday, Elder Baboucar)')
    lines.append('// ============================================================================')
    lines.append('export const MULTI_CUES_REGISTRY: Record<string, Record<string, Record<number, NarrationCue[]>>> = {')

    for slug, cfg in STORY_CONFIGS.items():
        prefix = cfg["prefix"]
        ts_path = os.path.join(PROJECT_ROOT, cfg["file"])
        scenes = parse_scenes_from_ts(ts_path)
        n_scenes = len(scenes)

        lines.append(f'  "{slug}": {{')
        lines.append('    "amara-gambia": {')
        for s in range(1, n_scenes + 1):
            lines.append(f'      {s}: {prefix}AmaraScene{s:02d} as NarrationCue[],')
        lines.append('    },')
        lines.append('    "foday-jali": {')
        for s in range(1, n_scenes + 1):
            lines.append(f'      {s}: {prefix}FodayScene{s:02d} as NarrationCue[],')
        lines.append('    },')
        lines.append('    "elder-baboucar": {')
        for s in range(1, n_scenes + 1):
            lines.append(f'      {s}: {prefix}BaboucarScene{s:02d} as NarrationCue[],')
        lines.append('    },')
        lines.append('  },')

    lines.append('};\n')

    # Utility functions
    lines.append('''/**
 * Retrieves narration cues for a story scene.
 * If narratorId is provided, returns cues tailored to that narrator\'s pacing.
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
''')

    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Successfully generated updated {out_file} with Elder Baboucar!")

if __name__ == "__main__":
    generate_multi_cues_index_with_baboucar()
