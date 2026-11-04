"""
Multi-Narrator Audio & Cue Generation Pipeline for Tales of The Gambia
Generates high-fidelity Kokoro-82M oral narration for:
- Amara of Gambia (voice: af_heart)
- Foday the Jali (voice: am_michael)

Produces:
- public/audio/stories/<slug>/scene-XX-amara.mp3 (when Amara is generated)
- public/audio/stories/<slug>/scene-XX-foday.mp3 (when Foday is generated)
- data/audio/cues/<cue_folder>/scene-XX-amara.json
- data/audio/cues/<cue_folder>/scene-XX-foday.json
"""

import os
import sys
import re
import json
import time
import hashlib
import soundfile as sf
import numpy as np
from kokoro import KPipeline
from pronunciation import preprocess_text
from generate_narration import parse_scenes_from_ts, STORIES_MAP
from produce_all_cues import extract_sentence_spans, detect_audio_boundaries

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# Complete mapping from story slug to cue folder and TS file
STORY_CONFIGS = {
    # ── 13 stories currently narrated by Amara (af_heart) ─────────────────
    "the-clever-hare-and-the-great-drought": {
        "file": "data/stories/adapted/hare-drought.ts",
        "cue_folder": "hare-drought",
        "prefix": "hare",
        "existing_voice": "af_heart",
        "amara_speed": 0.95,
        "foday_speed": 0.93,
    },
    "the-clever-hare-and-the-hyena": {
        "file": "data/stories/adapted/clever-hare-and-hyena.ts",
        "cue_folder": "clever-hare-hyena",
        "prefix": "hareHyena",
        "existing_voice": "af_heart",
        "amara_speed": 0.95,
        "foday_speed": 0.93,
    },
    "the-two-kumbas": {
        "file": "data/stories/adapted/two-kumbas.ts",
        "cue_folder": "two-kumbas",
        "prefix": "twoKumbas",
        "existing_voice": "af_heart",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "the-little-pangolin-who-counted-stars": {
        "file": "data/stories/original/little-pangolin.ts",
        "cue_folder": "little-pangolin",
        "prefix": "pangolin",
        "existing_voice": "af_heart",
        "amara_speed": 0.92,
        "foday_speed": 0.90,
    },
    "nightfall-over-janjanbureh": {
        "file": "data/stories/adapted/nightfall-janjanbureh.ts",
        "cue_folder": "nightfall-janjanbureh",
        "prefix": "nightfall",
        "existing_voice": "af_heart",
        "amara_speed": 0.90,
        "foday_speed": 0.89,
    },
    "why-the-baobab-grows-upside-down": {
        "file": "data/stories/adapted/why-the-baobab-grows-upside-down.ts",
        "cue_folder": "baobab-upside-down",
        "prefix": "baobab",
        "existing_voice": "af_heart",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "fari-queen-of-the-wild-donkeys": {
        "file": "data/stories/adapted/fari-queen-of-donkeys.ts",
        "cue_folder": "fari-queen",
        "prefix": "fari",
        "existing_voice": "af_heart",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "the-cow-the-hyena-and-the-shared-granary": {
        "file": "data/stories/adapted/cow-hyena-shared-granary.ts",
        "cue_folder": "cow-hyena-granary",
        "prefix": "cowHyenaGranary",
        "existing_voice": "af_heart",
        "amara_speed": 0.95,
        "foday_speed": 0.93,
    },
    "mais-stolen-nianyaa": {
        "file": "data/stories/adapted/mais-stolen-nianyaa.ts",
        "cue_folder": "mais-nianyaa",
        "prefix": "mai",
        "existing_voice": "af_heart",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "queen-yanmey-and-the-sovereign-river": {
        "file": "data/stories/historical/queen-yanmey.ts",
        "cue_folder": "queen-yanmey",
        "prefix": "yanmey",
        "existing_voice": "af_heart",
        "amara_speed": 0.92,
        "foday_speed": 0.90,
    },
    "the-bone-of-mor-lam": {
        "file": "data/stories/adapted/bone-of-mor-lam.ts",
        "cue_folder": "bone-of-mor-lam",
        "prefix": "morLam",
        "existing_voice": "af_heart",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "the-birds-parliament": {
        "file": "data/stories/adapted/birds-parliament.ts",
        "cue_folder": "birds-parliament",
        "prefix": "birds",
        "existing_voice": "af_heart",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "the-golden-palm-and-the-orphan-boy": {
        "file": "data/stories/adapted/golden-palm-orphan.ts",
        "cue_folder": "golden-palm-orphan",
        "prefix": "goldenPalm",
        "existing_voice": "af_heart",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },

    # ── 16 stories currently narrated by Foday (am_michael) ───────────────
    "the-whispering-waters-of-ninki-nanka": {
        "file": "data/stories/adapted/ninki-nanka.ts",
        "cue_folder": "ninki-nanka",
        "prefix": "ninki",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "the-griot-under-the-baobab": {
        "file": "data/stories/adapted/griot-baobab.ts",
        "cue_folder": "griot-baobab",
        "prefix": "griot",
        "existing_voice": "am_michael",
        "amara_speed": 0.95,
        "foday_speed": 0.93,
    },
    "the-spider-and-the-pot-of-wisdom": {
        "file": "data/stories/adapted/spider-wisdom.ts",
        "cue_folder": "spider-wisdom",
        "prefix": "spider",
        "existing_voice": "am_michael",
        "amara_speed": 0.95,
        "foday_speed": 0.94,
    },
    "the-kankurang-and-the-sacred-forest": {
        "file": "data/stories/legends/kankurang-sacred-forest.ts",
        "cue_folder": "kankurang",
        "prefix": "kankurang",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "kelefa-saane": {
        "file": "data/stories/historical/kelefa-saane.ts",
        "cue_folder": "kelefa-saane",
        "prefix": "kelefa",
        "existing_voice": "am_michael",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "the-fula-herdsman": {
        "file": "data/stories/adapted/the-fula-herdsman.ts",
        "cue_folder": "fula-herdsman",
        "prefix": "fula",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.93,
    },
    "sundiata-lion-of-old-mali": {
        "file": "data/stories/historical/sundiata-lion-of-old-mali.ts",
        "cue_folder": "sundiata",
        "prefix": "sundiata",
        "existing_voice": "am_michael",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "stone-circles-of-wassu": {
        "file": "data/stories/historical/stone-circles-of-wassu.ts",
        "cue_folder": "stone-circles",
        "prefix": "stoneCircles",
        "existing_voice": "am_michael",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "the-first-kora": {
        "file": "data/stories/legends/the-first-kora.ts",
        "cue_folder": "first-kora",
        "prefix": "firstKora",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "the-ballad-of-massaneh-ceesay": {
        "file": "data/stories/historical/massaneh-ceesay.ts",
        "cue_folder": "massaneh-ceesay",
        "prefix": "massaneh",
        "existing_voice": "am_michael",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "boppi-jerreh-spirits-of-dog-island": {
        "file": "data/stories/legends/boppi-jerreh.ts",
        "cue_folder": "boppi-jerreh",
        "prefix": "boppi",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "the-fall-of-kansala": {
        "file": "data/stories/historical/fall-of-kansala.ts",
        "cue_folder": "fall-of-kansala",
        "prefix": "kansala",
        "existing_voice": "am_michael",
        "amara_speed": 0.93,
        "foday_speed": 0.91,
    },
    "foday-kaba-and-the-stockade-of-medina": {
        "file": "data/stories/historical/foday-kaba-medina.ts",
        "cue_folder": "foday-kaba",
        "prefix": "foday",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
    "koochi-barama-and-the-river-of-truth": {
        "file": "data/stories/adapted/koochi-barama.ts",
        "cue_folder": "koochi-barama",
        "prefix": "koochi",
        "existing_voice": "am_michael",
        "amara_speed": 0.95,
        "foday_speed": 0.93,
    },
    "the-magic-calabash-of-banjul": {
        "file": "data/stories/adapted/magic-calabash.ts",
        "cue_folder": "magic-calabash",
        "prefix": "calabash",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.93,
    },
    "the-whirling-spirit-of-the-fromager": {
        "file": "data/stories/legends/whirling-spirit-kumpo.ts",
        "cue_folder": "whirling-spirit-kumpo",
        "prefix": "kumpo",
        "existing_voice": "am_michael",
        "amara_speed": 0.94,
        "foday_speed": 0.92,
    },
}

_pipeline_instance = None

def get_pipeline():
    global _pipeline_instance
    if _pipeline_instance is None:
        print("Initializing Kokoro KPipeline(lang_code='a', repo_id='hexgrad/Kokoro-82M')...")
        _pipeline_instance = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M")
    return _pipeline_instance

def generate_track_for_story(slug: str, narrator: str, overwrite: bool = False):
    """
    Generates missing audio and cue files for a story and specific narrator.
    narrator must be 'amara' or 'foday'.
    """
    if slug not in STORY_CONFIGS:
        raise ValueError(f"Unknown slug: {slug}")
    
    cfg = STORY_CONFIGS[slug]
    ts_file = os.path.join(PROJECT_ROOT, cfg["file"])
    scenes = parse_scenes_from_ts(ts_file)
    if not scenes:
        raise RuntimeError(f"Could not parse scenes from {ts_file}")

    if narrator == "amara":
        voice = "af_heart"
        speed = cfg["amara_speed"]
        tag = "amara"
        narrator_id = "amara-gambia"
    elif narrator == "foday":
        voice = "am_michael"
        speed = cfg["foday_speed"]
        tag = "foday"
        narrator_id = "foday-jali"
    elif narrator == "baboucar":
        voice = "am_adam"
        speed = 0.88
        tag = "baboucar"
        narrator_id = "elder-baboucar"
    else:
        raise ValueError(f"Unknown narrator {narrator}")

    audio_dir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug)
    cue_dir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cfg["cue_folder"])
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs(cue_dir, exist_ok=True)

    pipeline = get_pipeline()
    generated_tracks = []

    print(f"\n[{narrator.upper()} GENERATION] {slug} (Voice: {voice}, Speed: {speed})")

    for s in scenes:
        s_num = s["sceneNumber"]
        audio_filename = f"scene-{s_num:02d}-{tag}.mp3"
        audio_path = os.path.join(audio_dir, audio_filename)
        audio_rel_url = f"/audio/stories/{slug}/{audio_filename}"
        cue_filename = f"scene-{s_num:02d}-{tag}.json"
        cue_path = os.path.join(cue_dir, cue_filename)

        if not overwrite and os.path.exists(audio_path) and os.path.exists(cue_path):
            print(f"  Scene {s_num}: Audio and cues already exist. Reading duration...")
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

        # Save audio file
        sf.write(audio_path, combined, 24000, format="MP3")
        file_size = os.path.getsize(audio_path)

        # Generate sample-accurate cues using acoustic boundaries
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

        # Ensure strict monotonicity
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

if __name__ == "__main__":
    if len(sys.argv) > 1:
        slug = sys.argv[1]
        narrator = sys.argv[2]
        generate_track_for_story(slug, narrator)
    else:
        print("Usage: multi_narrator_generator.py <slug> <amara|foday>")
