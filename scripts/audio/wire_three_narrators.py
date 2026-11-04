"""
Unified Multi-Narrator Wiring Script for Tales of The Gambia
Wires all 3 narrators into all 29 stories:
1. Amara of Gambia (voice: af_heart)
2. Foday the Jali (voice: am_michael)
3. Elder Baboucar (voice: am_adam)

Preserves backward compatibility:
- Top-level narrationUrl, narrationDurationSeconds, cues are maintained
- audio.narrations contains all 3 registered narrators with precise URLs, durations, and cues
"""

import os
import re
import sys
import soundfile as sf

sys.path.insert(0, "scripts/audio")
from multi_narrator_generator import STORY_CONFIGS
from generate_narration import parse_scenes_from_ts

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def get_audio_duration(file_path: str) -> float:
    try:
        data, sr = sf.read(file_path)
        return round(len(data) / sr, 2)
    except Exception as e:
        print(f"Error reading duration for {file_path}: {e}")
        return 0.0

def replace_audio_block(content: str, scene_num: int, new_audio_str: str) -> str:
    # Find sceneNumber: scene_num
    sn_pattern = re.compile(rf'sceneNumber:\s*{scene_num}\b')
    sn_match = sn_pattern.search(content)
    if not sn_match:
        raise ValueError(f"Could not find sceneNumber: {scene_num}")
    
    # From sn_match.start(), find "audio:"
    audio_idx = content.find("audio:", sn_match.start())
    if audio_idx == -1:
        raise ValueError(f"Could not find 'audio:' for sceneNumber: {scene_num}")
    
    # Find the opening brace of audio: {
    open_brace_idx = content.find("{", audio_idx)
    depth = 0
    close_brace_idx = -1
    for i in range(open_brace_idx, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                close_brace_idx = i
                break
    if close_brace_idx == -1:
        raise ValueError(f"Could not find closing brace of audio block for sceneNumber: {scene_num}")
    
    # Check if there is a trailing comma
    end_idx = close_brace_idx + 1
    if end_idx < len(content) and content[end_idx] == ',':
        end_idx += 1
    
    return content[:audio_idx] + new_audio_str + content[end_idx:]

def wire_all_three_narrators(slug: str):
    cfg = STORY_CONFIGS[slug]
    ts_rel_path = cfg["file"]
    ts_full_path = os.path.join(PROJECT_ROOT, ts_rel_path)
    cue_folder = cfg["cue_folder"]
    prefix = cfg["prefix"]
    existing_voice = cfg["existing_voice"]

    with open(ts_full_path, "r", encoding="utf-8") as f:
        content = f.read()

    scenes = parse_scenes_from_ts(ts_full_path)
    n_scenes = len(scenes)

    # 1. Cue Imports
    # Determine variable naming convention for primary cues
    # Find import for scene-01.json
    import_m = re.search(rf'import\s+(\w+)\s+from\s+["\']@/data/audio/cues/{re.escape(cue_folder)}/scene-01\.json["\'];', content)
    if import_m:
        primary_base = import_m.group(1).replace("01", "")
    else:
        primary_base = f"{prefix}Scene"

    # Define variables and paths based on existing_voice
    if existing_voice == "af_heart":
        # Primary is Amara
        def get_amara_var(s): return f"{primary_base}{s:02d}"
        def get_foday_var(s): return f"{prefix}FodayScene{s:02d}"
        def get_baboucar_var(s): return f"{prefix}BaboucarScene{s:02d}"

        def get_amara_url(s): return f"/audio/stories/{slug}/scene-{s:02d}-narration.mp3"
        def get_foday_url(s): return f"/audio/stories/{slug}/scene-{s:02d}-foday.mp3"
        def get_baboucar_url(s): return f"/audio/stories/{slug}/scene-{s:02d}-baboucar.mp3"

        def get_amara_abs(s): return os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s:02d}-narration.mp3")
        def get_foday_abs(s): return os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s:02d}-foday.mp3")
        def get_baboucar_abs(s): return os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s:02d}-baboucar.mp3")

        sec_imports = [
            (f"{prefix}FodayScene{s:02d}", f"@/data/audio/cues/{cue_folder}/scene-{s:02d}-foday.json")
            for s in range(1, n_scenes + 1)
        ]
    else:
        # Primary is Foday
        def get_amara_var(s): return f"{prefix}AmaraScene{s:02d}"
        def get_foday_var(s): return f"{primary_base}{s:02d}"
        def get_baboucar_var(s): return f"{prefix}BaboucarScene{s:02d}"

        def get_amara_url(s): return f"/audio/stories/{slug}/scene-{s:02d}-amara.mp3"
        def get_foday_url(s): return f"/audio/stories/{slug}/scene-{s:02d}-narration.mp3"
        def get_baboucar_url(s): return f"/audio/stories/{slug}/scene-{s:02d}-baboucar.mp3"

        def get_amara_abs(s): return os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s:02d}-amara.mp3")
        def get_foday_abs(s): return os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s:02d}-narration.mp3")
        def get_baboucar_abs(s): return os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, f"scene-{s:02d}-baboucar.mp3")

        sec_imports = [
            (f"{prefix}AmaraScene{s:02d}", f"@/data/audio/cues/{cue_folder}/scene-{s:02d}-amara.json")
            for s in range(1, n_scenes + 1)
        ]

    baboucar_imports = [
        (f"{prefix}BaboucarScene{s:02d}", f"@/data/audio/cues/{cue_folder}/scene-{s:02d}-baboucar.json")
        for s in range(1, n_scenes + 1)
    ]

    all_extra_imports = sec_imports + baboucar_imports
    # Check what needs to be added
    imports_to_add = []
    for var_name, import_path in all_extra_imports:
        if var_name not in content:
            imports_to_add.append(f'import {var_name} from "{import_path}";')

    if imports_to_add:
        # Find where to insert them (after the last existing cue import)
        cue_import_pattern = re.compile(rf'import\s+.*from\s+["\']@/data/audio/cues/{re.escape(cue_folder)}/.*\.json["\'];')
        matches = list(cue_import_pattern.finditer(content))
        if matches:
            insert_pos = matches[-1].end()
            content = content[:insert_pos] + "\n" + "\n".join(imports_to_add) + content[insert_pos:]
        else:
            print(f"  [WARNING] Could not find insertion point for imports in {slug}")

    # 2. Scene audio blocks
    for sc in scenes:
        s_num = sc["sceneNumber"]
        amara_u = get_amara_url(s_num)
        foday_u = get_foday_url(s_num)
        baboucar_u = get_baboucar_url(s_num)

        amara_dur = get_audio_duration(get_amara_abs(s_num))
        foday_dur = get_audio_duration(get_foday_abs(s_num))
        baboucar_dur = get_audio_duration(get_baboucar_abs(s_num))

        amara_c = get_amara_var(s_num)
        foday_c = get_foday_var(s_num)
        baboucar_c = get_baboucar_var(s_num)

        # Default top-level fields (Amara is the application default)
        default_u = amara_u
        default_dur = amara_dur
        default_c = amara_c

        new_audio_str = f"""audio: {{
        narrationUrl: "{default_u}",
        narrationDurationSeconds: {default_dur},
        cues: {default_c} as NarrationCue[],
        narratorId: "amara-gambia",
        narrations: {{
          "amara-gambia": {{
            narratorId: "amara-gambia",
            narrationUrl: "{amara_u}",
            narrationDurationSeconds: {amara_dur},
            cues: {amara_c} as NarrationCue[],
          }},
          "foday-jali": {{
            narratorId: "foday-jali",
            narrationUrl: "{foday_u}",
            narrationDurationSeconds: {foday_dur},
            cues: {foday_c} as NarrationCue[],
          }},
          "elder-baboucar": {{
            narratorId: "elder-baboucar",
            narrationUrl: "{baboucar_u}",
            narrationDurationSeconds: {baboucar_dur},
            cues: {baboucar_c} as NarrationCue[],
          }},
        }},
      }},"""

        content = replace_audio_block(content, s_num, new_audio_str)

    with open(ts_full_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully wired Amara, Foday, and Elder Baboucar into {ts_rel_path}")

def wire_all():
    print("=" * 80)
    print("UNIFIED WIRING: AMARA, FODAY, AND ELDER BABOUCAR (ALL 29 STORIES)")
    print("=" * 80)
    for slug in sorted(STORY_CONFIGS.keys()):
        wire_all_three_narrators(slug)
    print("\nALL 29 STORY FILES SUCCESSFULLY WIRED WITH ALL THREE NARRATORS!")

if __name__ == "__main__":
    wire_all()
