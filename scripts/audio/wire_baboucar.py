"""
Stage 5: Wires Elder Baboucar into all 29 story TypeScript files and data/audio/cues/index.ts.

For each story:
- Adds Baboucar cue imports (e.g. hareBaboucarScene01)
- Adds "elder-baboucar": { narratorId, narrationUrl, narrationDurationSeconds, cues } to audio.narrations
- Preserves existing amara-gambia, foday-jali, and top-level V1 fields
"""

import os
import re
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

def wire_story_baboucar(slug: str):
    cfg = STORY_CONFIGS[slug]
    ts_rel_path = cfg["file"]
    ts_full_path = os.path.join(PROJECT_ROOT, ts_rel_path)
    cue_folder = cfg["cue_folder"]
    prefix = cfg["prefix"]

    with open(ts_full_path, "r", encoding="utf-8") as f:
        content = f.read()

    from generate_narration import parse_scenes_from_ts
    scenes = parse_scenes_from_ts(ts_full_path)
    n_scenes = len(scenes)

    # 1. Add Baboucar cue imports if not already present
    marker = f"{prefix}BaboucarScene01"
    if marker not in content:
        # Locate last existing cue import
        import_pattern = re.compile(rf'import\s+.*from\s+["\']@/data/audio/cues/{re.escape(cue_folder)}/.*\.json["\'];')
        matches = list(import_pattern.finditer(content))
        if matches:
            last_import = matches[-1]
            insert_pos = last_import.end()

            new_imports = "\n"
            for s in range(1, n_scenes + 1):
                cue_var = f"{prefix}BaboucarScene{s:02d}"
                new_imports += f'import {cue_var} from "@/data/audio/cues/{cue_folder}/scene-{s:02d}-baboucar.json";\n'

            content = content[:insert_pos] + new_imports + content[insert_pos:]
        else:
            print(f"  [WARNING] Could not find insertion point for Baboucar imports in {slug}")

    # 2. Add "elder-baboucar" to audio.narrations for each scene
    for sc in scenes:
        s_num = sc["sceneNumber"]
        baboucar_url = f"/audio/stories/{slug}/scene-{s_num:02d}-baboucar.mp3"
        baboucar_abs = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s_num:02d}-baboucar.mp3")
        baboucar_dur = get_audio_duration(baboucar_abs)
        baboucar_cue_var = f"{prefix}BaboucarScene{s_num:02d}"

        baboucar_entry = f"""          "elder-baboucar": {{
            narratorId: "elder-baboucar",
            narrationUrl: "{baboucar_url}",
            narrationDurationSeconds: {baboucar_dur},
            cues: {baboucar_cue_var} as NarrationCue[],
          }},"""

        # Check if elder-baboucar is already in this scene's narrations
        # Find scene block
        scene_match = re.search(rf'sceneNumber:\s*{s_num}\b.*?(narrations:\s*\{{)(.*?)(^\s*\}},)', content, re.DOTALL | re.MULTILINE)
        if scene_match:
            narrations_body = scene_match.group(2)
            if '"elder-baboucar"' not in narrations_body:
                # Insert baboucar_entry before closing brace
                insert_idx = scene_match.start(3)
                content = content[:insert_idx] + "\n" + baboucar_entry + content[insert_idx:]
        else:
            print(f"  [WARNING] Could not find narrations block for scene {s_num} in {slug}")

    with open(ts_full_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully wired Elder Baboucar into {ts_rel_path}")

def wire_all_stories_baboucar():
    print("=" * 80)
    print("WIRING ELDER BABOUCAR INTO ALL 29 STORY FILES")
    print("=" * 80)
    for slug in STORY_CONFIGS.keys():
        wire_story_baboucar(slug)
    print("\nALL 29 STORY FILES SUCCESSFULLY UPDATED WITH ELDER BABOUCAR!")

if __name__ == "__main__":
    wire_all_stories_baboucar()
