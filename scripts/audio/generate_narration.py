"""
Kokoro-82M Narration Generation Pipeline for Tales of The Gambia.
Generates web-ready scene-by-scene MP3 narration audio assets and manifests.
"""

import os
import sys
import re
import json
import time
import hashlib
import argparse
import soundfile as sf
import numpy as np
from datetime import datetime, timezone
from kokoro import KPipeline
from pronunciation import preprocess_text

STORIES_MAP = {
    "the-clever-hare-and-the-great-drought": {
        "file": "data/stories/adapted/hare-drought.ts",
        "default_voice": "af_heart",
        "speed": 0.95,
        "title": "The Clever Hare and the Great Drought",
    },
    "the-whispering-waters-of-ninki-nanka": {
        "file": "data/stories/adapted/ninki-nanka.ts",
        "default_voice": "am_michael",
        "speed": 0.92,
        "title": "The Whispering Waters of Ninki Nanka",
    },
}

def parse_scenes_from_ts(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    scenes = []
    scene_blocks = re.findall(r"\{\s*id:\s*[\"']([^\"']+)[\"'].*?sceneNumber:\s*(\d+).*?title:\s*[\"']([^\"']+)[\"'].*?text:\s*[\"'](.*?)[\"']\s*,", content, re.DOTALL)

    for sid, snum, stitle, stext in scene_blocks:
        clean_text = re.sub(r"\s+", " ", stext).strip()
        scenes.append({
            "id": sid,
            "sceneNumber": int(snum),
            "title": stitle,
            "text": clean_text
        })

    return scenes

def generate_story_narration(slug, voice=None, speed=None):
    if slug not in STORIES_MAP:
        raise ValueError(f"Unknown story slug: {slug}. Available: {list(STORIES_MAP.keys())}")

    story_info = STORIES_MAP[slug]
    ts_file = os.path.join(os.getcwd(), story_info["file"])
    selected_voice = voice or story_info["default_voice"]
    selected_speed = speed or story_info["speed"]

    print("=" * 75)
    print(f"GENERATING NARRATION: {story_info['title']}")
    print(f"Slug: {slug} | Voice: {selected_voice} | Speed: {selected_speed}")
    print("=" * 75)

    scenes = parse_scenes_from_ts(ts_file)
    print(f"Parsed {len(scenes)} scenes from {story_info['file']}")

    out_dir = os.path.join(os.getcwd(), "public", "audio", "stories", slug)
    os.makedirs(out_dir, exist_ok=True)

    lang_code = 'b' if selected_voice.startswith('b') else 'a'
    print(f"Initializing Kokoro KPipeline(lang_code='{lang_code}', repo_id='hexgrad/Kokoro-82M')...")
    pipeline = KPipeline(lang_code=lang_code, repo_id="hexgrad/Kokoro-82M")

    manifest_scenes = []
    total_audio_bytes = 0
    total_duration_sec = 0.0

    for s in scenes:
        scene_num = s["sceneNumber"]
        filename = f"scene-{scene_num:02d}-narration.mp3"
        out_path = os.path.join(out_dir, filename)

        processed_text, subs = preprocess_text(s["text"])
        text_hash = hashlib.sha256(s["text"].encode("utf-8")).hexdigest()[:12]

        print(f"\n[Scene {scene_num}/{len(scenes)}: {s['title']}]")
        print(f"  Source text ({len(s['text'])} chars): \"{s['text'][:60]}...\"")
        if subs:
            print(f"  Pronunciation substitutions applied ({len(subs)}):")
            for sub in subs:
                print(f"    * {sub['original']} -> {sub['replacement']}")

        t0 = time.time()
        audio_segments = []
        generator = pipeline(processed_text, voice=selected_voice, speed=selected_speed, split_pattern=r"\n+")
        for _, _, audio in generator:
            audio_segments.append(audio)

        if not audio_segments:
            raise RuntimeError(f"Failed to generate audio for scene {scene_num}")

        combined = np.concatenate(audio_segments)
        duration = len(combined) / 24000.0
        elapsed = time.time() - t0

        sf.write(out_path, combined, 24000, format="MP3")
        file_size = os.path.getsize(out_path)
        total_audio_bytes += file_size
        total_duration_sec += duration

        print(f"  -> Wrote {filename} | {duration:.2f}s | {file_size / 1024.0:.1f} KB (Generated in {elapsed:.2f}s)")

        manifest_scenes.append({
            "sceneNumber": scene_num,
            "title": s["title"],
            "sourceTextHash": text_hash,
            "audioFile": f"/audio/stories/{slug}/{filename}",
            "durationSeconds": round(duration, 2),
            "fileSizeBytes": file_size,
            "substitutions": subs,
            "reviewStatus": "approved"
        })

    manifest = {
        "storySlug": slug,
        "title": story_info["title"],
        "engine": "Kokoro-82M",
        "voice": selected_voice,
        "speed": selected_speed,
        "language": "en",
        "status": "production-pilot",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalScenes": len(scenes),
        "totalDurationSeconds": round(total_duration_sec, 2),
        "totalFileSizeBytes": total_audio_bytes,
        "scenes": manifest_scenes
    }

    manifest_path = os.path.join(out_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print("\n" + "=" * 75)
    print(f"SUCCESS: Generated {len(scenes)} scene audio files for {slug}")
    print(f"Total Duration: {total_duration_sec:.2f}s | Total Size: {total_audio_bytes / 1024.0:.1f} KB")
    print(f"Manifest written to: {manifest_path}")
    print("=" * 75)

    return manifest

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Kokoro narration audio for Tales of The Gambia stories.")
    parser.add_argument("--slug", choices=list(STORIES_MAP.keys()) + ["all-pilot"], default="all-pilot",
                        help="Story slug to generate audio for (or 'all-pilot')")
    parser.add_argument("--voice", help="Override Kokoro voice ID")
    parser.add_argument("--speed", type=float, help="Override speed multiplier")
    args = parser.parse_args()

    if args.slug == "all-pilot":
        for s in STORIES_MAP.keys():
            generate_story_narration(s, voice=args.voice, speed=args.speed)
    else:
        generate_story_narration(args.slug, voice=args.voice, speed=args.speed)