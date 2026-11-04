"""
Phase 12B QA Audit for Kaddy of Brikama (Kokoro-82M af_bella).
Inspects all 133 scene audio files and all 133 dedicated cue JSON files.
"""

import os
import sys
import json
import soundfile as sf
import numpy as np

sys.path.insert(0, os.path.dirname(__file__))
from multi_narrator_generator import STORY_CONFIGS
from generate_narration import parse_scenes_from_ts

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def run_kaddy_qa():
    print("=" * 80)
    print("PHASE 12B: KADDY OF BRIKAMA QA AUDIT (ALL 29 STORIES / 133 SCENES)")
    print("=" * 80)

    total_scenes = 0
    total_audio_valid = 0
    total_cues_valid = 0
    failures = []

    for slug, cfg in sorted(STORY_CONFIGS.items(), key=lambda x: x[0]):
        ts_path = os.path.join(PROJECT_ROOT, cfg["file"])
        scenes = parse_scenes_from_ts(ts_path)
        n = len(scenes)
        total_scenes += n

        sdir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug)
        cdir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cfg["cue_folder"])

        for sc in scenes:
            s_num = sc["sceneNumber"]
            audio_path = os.path.join(sdir, f"scene-{s_num:02d}-kaddy.mp3")
            cue_path = os.path.join(cdir, f"scene-{s_num:02d}-kaddy.json")

            if not os.path.exists(audio_path):
                failures.append(f"Missing audio: {audio_path}")
                continue
            if not os.path.exists(cue_path):
                failures.append(f"Missing cue: {cue_path}")
                continue

            try:
                data, sr = sf.read(audio_path)
                dur = len(data) / sr
                peak = float(np.max(np.abs(data)))
                rms = float(np.sqrt(np.mean(data**2)))

                if peak >= 0.999:
                    failures.append(f"Clipping in {audio_path}: peak={peak:.4f}")
                if peak < 0.05 or rms < 0.005:
                    failures.append(f"Low signal in {audio_path}: peak={peak:.4f}, rms={rms:.4f}")

                total_audio_valid += 1

                with open(cue_path, "r", encoding="utf-8") as cf:
                    cues = json.load(cf)

                if not cues:
                    failures.append(f"Empty cues in {cue_path}")
                    continue

                if cues[0]["startSeconds"] != 0.0:
                    failures.append(f"First cue not at 0.0 in {cue_path}")

                last_end = cues[-1]["endSeconds"]
                if abs(last_end - dur) > 0.25:
                    failures.append(f"Duration mismatch {audio_path}: audio={dur:.2f}s, cue_end={last_end:.2f}s")

                for i in range(len(cues) - 1):
                    if cues[i + 1]["startSeconds"] < cues[i]["startSeconds"]:
                        failures.append(f"Non-monotonic cue {i} in {cue_path}")

                total_cues_valid += 1

            except Exception as e:
                failures.append(f"Exception auditing {slug} scene {s_num}: {e}")

    print(f"Total Canonical Scenes: {total_scenes}")
    print(f"Valid Audio Files:      {total_audio_valid}/{total_scenes}")
    print(f"Valid Cue Files:        {total_cues_valid}/{total_scenes}")
    print(f"Total Failures:         {len(failures)}")

    if failures:
        print("\nFailures found:")
        for f in failures[:20]:
            print(f"  * {f}")
        return False
    else:
        print("\nALL 133 KADDY AUDIO FILES AND 133 CUE FILES PASSED QA WITH 100% SUCCESS!")
        return True

if __name__ == "__main__":
    success = run_kaddy_qa()
    sys.exit(0 if success else 1)
