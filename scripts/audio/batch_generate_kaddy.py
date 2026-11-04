"""
Phase 12B: Batch Generation for Kaddy of Brikama (voice: af_bella)
Narrates all 29 stories (133 canonical scenes).
Preserves existing Amara, Foday, and Elder Baboucar assets with zero overwriting.
"""

import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))

# Patch multi_narrator_generator to support 'kaddy' narrator
import multi_narrator_generator as mng

# Add 'kaddy' support to generate_track_for_story by monkey-patching
_original_generate = mng.generate_track_for_story

def generate_with_kaddy(slug, narrator, overwrite=False):
    if narrator == "kaddy":
        import json
        import numpy as np
        import soundfile as sf
        from kokoro import KPipeline
        from pronunciation import preprocess_text
        from generate_narration import parse_scenes_from_ts
        from produce_all_cues import extract_sentence_spans, detect_audio_boundaries

        PROJECT_ROOT = mng.PROJECT_ROOT
        cfg = mng.STORY_CONFIGS[slug]
        ts_file = os.path.join(PROJECT_ROOT, cfg["file"])
        scenes = parse_scenes_from_ts(ts_file)

        voice = "af_bella"
        speed = 0.90   # Lively but clear for fable teller
        tag = "kaddy"

        audio_dir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug)
        cue_dir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cfg["cue_folder"])
        os.makedirs(audio_dir, exist_ok=True)
        os.makedirs(cue_dir, exist_ok=True)

        pipeline = mng.get_pipeline()
        generated_tracks = []

        print(f"\n[KADDY GENERATION] {slug} (Voice: {voice}, Speed: {speed})")

        for s in scenes:
            s_num = s["sceneNumber"]
            audio_filename = f"scene-{s_num:02d}-{tag}.mp3"
            audio_path = os.path.join(audio_dir, audio_filename)
            audio_rel_url = f"/audio/stories/{slug}/{audio_filename}"
            cue_filename = f"scene-{s_num:02d}-{tag}.json"
            cue_path = os.path.join(cue_dir, cue_filename)

            if not overwrite and os.path.exists(audio_path) and os.path.exists(cue_path):
                print(f"  Scene {s_num}: Already exists. Skipping.")
                data, sr = sf.read(audio_path)
                dur = round(len(data) / sr, 2)
                with open(cue_path, "r", encoding="utf-8") as cf:
                    cues = json.load(cf)
                generated_tracks.append({
                    "sceneNumber": s_num,
                    "audioUrl": audio_rel_url,
                    "duration": dur,
                    "cueFile": cue_path,
                    "cuesCount": len(cues),
                })
                continue

            raw_text = s["text"]
            processed_text, subs = preprocess_text(raw_text)

            t0 = time.time()
            audio_segments = []
            generator = pipeline(processed_text, voice=voice, speed=speed, split_pattern=r"\n+")
            for _, _, audio in generator:
                audio_segments.append(audio)

            if not audio_segments:
                raise RuntimeError(f"Audio generation failed for {slug} scene {s_num}")

            combined = np.concatenate(audio_segments)
            duration = len(combined) / 24000.0
            elapsed = time.time() - t0

            sf.write(audio_path, combined, 24000, format="MP3")
            file_size = os.path.getsize(audio_path)

            spans = extract_sentence_spans(raw_text)
            n = len(spans)
            if n == 0:
                spans = [(0, len(raw_text), raw_text)]
                n = 1

            total_chars = sum(len(sp[2]) for sp in spans)
            cum_chars = 0
            expected_times = []
            for start, end, sent in spans[:-1]:
                cum_chars += len(sent)
                expected_times.append(duration * (cum_chars / total_chars))

            boundaries, _ = detect_audio_boundaries(audio_path, n - 1, expected_times)
            all_times = [0.0] + [round(t, 2) for t in boundaries] + [round(duration, 2)]

            for k in range(len(all_times) - 1):
                if all_times[k + 1] <= all_times[k]:
                    all_times[k + 1] = round(all_times[k] + 0.1, 2)
            all_times[-1] = round(duration, 2)

            cues = []
            for i in range(n):
                cue_obj = {
                    "index": i,
                    "startSeconds": all_times[i],
                    "endSeconds": all_times[i + 1],
                    "text": spans[i][2],
                    "charStart": spans[i][0],
                    "charEnd": spans[i][1],
                }
                cues.append(cue_obj)

            with open(cue_path, "w", encoding="utf-8") as f:
                json.dump(cues, f, indent=2, ensure_ascii=False)

            print(f"  Scene {s_num}: Wrote {audio_filename} ({duration:.2f}s, {file_size/1024:.1f} KB) + {cue_filename} ({len(cues)} cues) in {elapsed:.2f}s")

            generated_tracks.append({
                "sceneNumber": s_num,
                "audioUrl": audio_rel_url,
                "duration": round(duration, 2),
                "cueFile": cue_path,
                "cuesCount": len(cues),
            })

        return generated_tracks
    else:
        return _original_generate(slug, narrator, overwrite)

mng.generate_track_for_story = generate_with_kaddy

from multi_narrator_generator import STORY_CONFIGS

def run_batch_kaddy():
    t_start = time.time()
    print("=" * 80)
    print("PHASE 12B: BATCH GENERATION FOR KADDY OF BRIKAMA (Kokoro-82M af_bella)")
    print("=" * 80)

    slugs = list(STORY_CONFIGS.keys())
    print(f"Total stories to process: {len(slugs)}")

    for idx, slug in enumerate(slugs, 1):
        print(f"\n--- [{idx}/{len(slugs)}] Kaddy: {slug} ---")
        generate_with_kaddy(slug, "kaddy", overwrite=False)

    elapsed_total = time.time() - t_start
    print("\n" + "=" * 80)
    print(f"KADDY OF BRIKAMA BATCH GENERATION COMPLETE in {elapsed_total / 60:.1f} minutes!")
    print("=" * 80)

if __name__ == "__main__":
    run_batch_kaddy()
