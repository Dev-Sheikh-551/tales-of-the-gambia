"""
Stage 1 & 3: Wires multi-narration data into all 29 story TypeScript files
and data/audio/cues/index.ts.

For each story:
- Imports existing cue JSON files (e.g. hareScene01)
- Imports secondary narrator cue JSON files (e.g. hareFodayScene01)
- Populates audio.narrations = { "amara-gambia": {...}, "foday-jali": {...} }
- Preserves top-level narrationUrl, narrationDurationSeconds, and cues for 100% V1 backwards compatibility
"""

import os
import re
import json
import soundfile as sf
from multi_narrator_generator import STORY_CONFIGS

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def get_audio_duration(file_path: str) -> float:
    try:
        data, sr = sf.read(file_path)
        return round(len(data) / sr, 2)
    except Exception as e:
        print(f"Error reading duration for {file_path}: {e}")
        return 0.0

def wire_story_file(slug: str):
    cfg = STORY_CONFIGS[slug]
    ts_rel_path = cfg["file"]
    ts_full_path = os.path.join(PROJECT_ROOT, ts_rel_path)
    cue_folder = cfg["cue_folder"]
    prefix = cfg["prefix"]
    existing_voice = cfg["existing_voice"]

    with open(ts_full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Determine scenes count
    from generate_narration import parse_scenes_from_ts
    scenes = parse_scenes_from_ts(ts_full_path)
    n_scenes = len(scenes)

    # Secondary narrator details
    if existing_voice == "af_heart":
        primary_narrator = "amara-gambia"
        secondary_narrator = "foday-jali"
        secondary_tag = "foday"
        secondary_prefix_part = "Foday"
    else:
        primary_narrator = "foday-jali"
        secondary_narrator = "amara-gambia"
        secondary_tag = "amara"
        secondary_prefix_part = "Amara"

    # 1. Build second narrator cue imports
    # Check if second narrator cue imports already exist
    sec_import_marker = f"{prefix}{secondary_prefix_part}Scene01"
    if sec_import_marker not in content:
        # Locate last existing cue import
        import_pattern = re.compile(rf'import\s+.*from\s+["\']@/data/audio/cues/{re.escape(cue_folder)}/scene-\d+\.json["\'];')
        matches = list(import_pattern.finditer(content))
        if matches:
            last_import = matches[-1]
            insert_pos = last_import.end()

            new_imports = "\n"
            for s in range(1, n_scenes + 1):
                cue_var = f"{prefix}{secondary_prefix_part}Scene{s:02d}"
                new_imports += f'import {cue_var} from "@/data/audio/cues/{cue_folder}/scene-{s:02d}-{secondary_tag}.json";\n'

            content = content[:insert_pos] + new_imports + content[insert_pos:]
        else:
            print(f"  [WARNING] Could not find insertion point for cue imports in {slug}")

    # 2. Update each scene's audio block
    # For each scene:
    for s_idx, sc in enumerate(scenes, 1):
        s_num = sc["sceneNumber"]

        # Paths and Durations
        # Primary track (existing V1 file)
        primary_rel_url = f"/audio/stories/{slug}/scene-{s_num:02d}-narration.mp3"
        primary_abs_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s_num:02d}-narration.mp3")
        primary_dur = get_audio_duration(primary_abs_path)

        # Secondary track (new multi-narrator file)
        secondary_rel_url = f"/audio/stories/{slug}/scene-{s_num:02d}-{secondary_tag}.mp3"
        secondary_abs_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s_num:02d}-{secondary_tag}.mp3")
        secondary_dur = get_audio_duration(secondary_abs_path)

        # Cue variable names
        # Match existing cue variable name used in the file for this scene
        existing_cue_var_match = re.search(rf'cues:\s*(\w+Scene{s_num:02d}|\w+Cues{s_num:02d}|\w+{s_num:02d})\s+as\s+NarrationCue\[\]', content)
        if existing_cue_var_match:
            primary_cue_var = existing_cue_var_match.group(1)
        else:
            primary_cue_var = f"{prefix}Scene{s_num:02d}"

        secondary_cue_var = f"{prefix}{secondary_prefix_part}Scene{s_num:02d}"

        # Assign Amara and Foday values based on roles
        if primary_narrator == "amara-gambia":
            amara_url, amara_dur, amara_cue = primary_rel_url, primary_dur, primary_cue_var
            foday_url, foday_dur, foday_cue = secondary_rel_url, secondary_dur, secondary_cue_var
        else:
            amara_url, amara_dur, amara_cue = secondary_rel_url, secondary_dur, secondary_cue_var
            foday_url, foday_dur, foday_cue = primary_rel_url, primary_dur, primary_cue_var

        # Construct replacement audio block
        new_audio_block = f"""audio: {{
        narrationUrl: "{primary_rel_url}",
        narrationDurationSeconds: {primary_dur},
        cues: {primary_cue_var} as NarrationCue[],
        narratorId: "amara-gambia",
        narrations: {{
          "amara-gambia": {{
            narratorId: "amara-gambia",
            narrationUrl: "{amara_url}",
            narrationDurationSeconds: {amara_dur},
            cues: {amara_cue} as NarrationCue[],
          }},
          "foday-jali": {{
            narratorId: "foday-jali",
            narrationUrl: "{foday_url}",
            narrationDurationSeconds: {foday_dur},
            cues: {foday_cue} as NarrationCue[],
          }},
        }},
      }},"""

        # Replace existing audio block for this scene
        # Pattern matches: audio: { ... },
        # We search specifically in the block around this scene's sceneNumber
        scene_match = re.search(rf'sceneNumber:\s*{s_num}\b.*?(audio:\s*\{{.*?\}}),', content, re.DOTALL)
        if scene_match:
            old_audio_block = scene_match.group(1) + ","
            # Replace only the first occurrence in this region
            start_idx = scene_match.start(1)
            end_idx = start_idx + len(old_audio_block)
            content = content[:start_idx] + new_audio_block + content[end_idx:]
        else:
            print(f"  [WARNING] Could not match audio block for scene {s_num} in {slug}")

    with open(ts_full_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully wired multi-narration into {ts_rel_path}")

def wire_all_story_files():
    print("=" * 80)
    print("WIRING MULTI-NARRATIONS INTO ALL 29 STORY FILES")
    print("=" * 80)
    for slug in STORY_CONFIGS.keys():
        wire_story_file(slug)
    print("\nALL 29 STORY FILES SUCCESSFULLY WIRED!")

if __name__ == "__main__":
    wire_all_story_files()
