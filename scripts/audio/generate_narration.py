"""
Kokoro-82M Narration Generation Pipeline for Tales of The Gambia.
Generates web-ready scene-by-scene MP3 narration audio assets and manifests.

Supports both quoted-string and backtick template-literal text fields in TypeScript story files.
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

# Project root is two levels up from this script (scripts/audio/ -> project root)
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


STORIES_MAP = {
    # ── Already narrated (reference) ──────────────────────────────────────
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

    # ── Phase 14: 13 new stories ───────────────────────────────────────────
    "the-griot-under-the-baobab": {
        "file": "data/stories/adapted/griot-baobab.ts",
        "default_voice": "am_michael",
        "speed": 0.93,
        "title": "The Griot Under the Baobab",
    },
    "the-little-pangolin-who-counted-stars": {
        "file": "data/stories/original/little-pangolin.ts",
        "default_voice": "af_heart",
        "speed": 0.92,
        "title": "The Little Pangolin Who Counted Stars",
    },
    "nightfall-over-janjanbureh": {
        "file": "data/stories/adapted/nightfall-janjanbureh.ts",
        "default_voice": "af_heart",
        "speed": 0.90,
        "title": "Nightfall Over Janjanbureh",
    },
    "the-spider-and-the-pot-of-wisdom": {
        "file": "data/stories/adapted/spider-wisdom.ts",
        "default_voice": "am_michael",
        "speed": 0.94,
        "title": "The Spider and the Pot of Wisdom",
    },
    "the-clever-hare-and-the-hyena": {
        "file": "data/stories/adapted/clever-hare-and-hyena.ts",
        "default_voice": "af_heart",
        "speed": 0.95,
        "title": "The Clever Hare and the Hyena",
    },
    "the-two-kumbas": {
        "file": "data/stories/adapted/two-kumbas.ts",
        "default_voice": "af_heart",
        "speed": 0.93,
        "title": "The Two Kumbas",
    },
    "the-kankurang-and-the-sacred-forest": {
        "file": "data/stories/legends/kankurang-sacred-forest.ts",
        "default_voice": "am_michael",
        "speed": 0.92,
        "title": "The Kankurang and the Sacred Forest",
    },
    "kelefa-saane": {
        "file": "data/stories/historical/kelefa-saane.ts",
        "default_voice": "am_michael",
        "speed": 0.91,
        "title": "Kelefa Saane",
    },
    "the-fula-herdsman": {
        "file": "data/stories/adapted/the-fula-herdsman.ts",
        "default_voice": "am_michael",
        "speed": 0.93,
        "title": "The Herdsman and the Stolen Cattle",
    },
    "sundiata-lion-of-old-mali": {
        "file": "data/stories/historical/sundiata-lion-of-old-mali.ts",
        "default_voice": "am_michael",
        "speed": 0.91,
        "title": "Sundiata",
    },
    "why-the-baobab-grows-upside-down": {
        "file": "data/stories/adapted/why-the-baobab-grows-upside-down.ts",
        "default_voice": "af_heart",
        "speed": 0.94,
        "title": "Why the Baobab Grows Upside Down",
    },
    "stone-circles-of-wassu": {
        "file": "data/stories/historical/stone-circles-of-wassu.ts",
        "default_voice": "am_michael",
        "speed": 0.91,
        "title": "The Stone Circles of Wassu",
    },
    "the-first-kora": {
        "file": "data/stories/legends/the-first-kora.ts",
        "default_voice": "am_michael",
        "speed": 0.92,
        "title": "The First Kora",
    },

    # ── New Stories: 14 additions ──────────────────────────────────────────
    "the-ballad-of-massaneh-ceesay": {
        "file": "data/stories/historical/massaneh-ceesay.ts",
        "default_voice": "am_michael",
        "speed": 0.91,
        "title": "The Ballad of Massaneh Ceesay",
    },
    "boppi-jerreh-spirits-of-dog-island": {
        "file": "data/stories/legends/boppi-jerreh.ts",
        "default_voice": "am_michael",
        "speed": 0.92,
        "title": "Boppi Jerreh: The Spirits of Dog Island",
    },
    "fari-queen-of-the-wild-donkeys": {
        "file": "data/stories/adapted/fari-queen-of-donkeys.ts",
        "default_voice": "af_heart",
        "speed": 0.94,
        "title": "Fari, Queen of the Wild Donkeys",
    },
    "the-cow-the-hyena-and-the-shared-granary": {
        "file": "data/stories/adapted/cow-hyena-shared-granary.ts",
        "default_voice": "af_heart",
        "speed": 0.95,
        "title": "The Cow, the Hyena, and the Shared Granary",
    },
    "mais-stolen-nianyaa": {
        "file": "data/stories/adapted/mais-stolen-nianyaa.ts",
        "default_voice": "af_heart",
        "speed": 0.93,
        "title": "Mai’s Stolen Nianyaa",
    },
    "the-fall-of-kansala": {
        "file": "data/stories/historical/fall-of-kansala.ts",
        "default_voice": "am_michael",
        "speed": 0.91,
        "title": "The Fall of Kansala",
    },
    "foday-kaba-and-the-stockade-of-medina": {
        "file": "data/stories/historical/foday-kaba-medina.ts",
        "default_voice": "am_michael",
        "speed": 0.92,
        "title": "Foday Kaba and the Stockade of Medina",
    },
    "queen-yanmey-and-the-sovereign-river": {
        "file": "data/stories/historical/queen-yanmey.ts",
        "default_voice": "af_heart",
        "speed": 0.92,
        "title": "Queen Yanmey and the Sovereign River",
    },
    "koochi-barama-and-the-river-of-truth": {
        "file": "data/stories/adapted/koochi-barama.ts",
        "default_voice": "am_michael",
        "speed": 0.93,
        "title": "Koochi Barama and the River of Truth",
    },
    "the-bone-of-mor-lam": {
        "file": "data/stories/adapted/bone-of-mor-lam.ts",
        "default_voice": "af_heart",
        "speed": 0.94,
        "title": "The Bone of Mor Lam",
    },
    "the-magic-calabash-of-banjul": {
        "file": "data/stories/adapted/magic-calabash.ts",
        "default_voice": "am_michael",
        "speed": 0.93,
        "title": "The Magic Calabash of Banjul",
    },
    "the-whirling-spirit-of-the-fromager": {
        "file": "data/stories/legends/whirling-spirit-kumpo.ts",
        "default_voice": "am_michael",
        "speed": 0.92,
        "title": "The Whirling Spirit of the Fromager",
    },
    "the-birds-parliament": {
        "file": "data/stories/adapted/birds-parliament.ts",
        "default_voice": "af_heart",
        "speed": 0.94,
        "title": "The Birds' Parliament",
    },
    "the-golden-palm-and-the-orphan-boy": {
        "file": "data/stories/adapted/golden-palm-orphan.ts",
        "default_voice": "af_heart",
        "speed": 0.93,
        "title": "The Golden Palm and the Orphan Boy",
    },
}

# Stories already narrated — skip by default in "all-new" mode
ALREADY_NARRATED = {
    "the-clever-hare-and-the-great-drought",
    "the-whispering-waters-of-ninki-nanka",
    "the-griot-under-the-baobab",
    "the-little-pangolin-who-counted-stars",
    "nightfall-over-janjanbureh",
    "the-spider-and-the-pot-of-wisdom",
    "the-clever-hare-and-the-hyena",
    "the-two-kumbas",
    "the-kankurang-and-the-sacred-forest",
    "kelefa-saane",
    "the-fula-herdsman",
    "sundiata-lion-of-old-mali",
    "why-the-baobab-grows-upside-down",
    "stone-circles-of-wassu",
    "the-first-kora",
}


def _extract_backtick_text(content: str, start_pos: int) -> tuple[str, int]:
    """
    Extract content of a backtick template literal starting at start_pos
    (which should point to the opening backtick). Returns (text, end_pos).
    Handles escaped backticks (backtick) but NOT nested template expressions ${...}.
    """
    assert content[start_pos] == '`', f"Expected backtick at {start_pos}"
    i = start_pos + 1
    chars = []
    while i < len(content):
        c = content[i]
        if c == '\\' and i + 1 < len(content) and content[i + 1] == '`':
            chars.append('`')
            i += 2
        elif c == '`':
            return ''.join(chars), i + 1
        else:
            chars.append(c)
            i += 1
    raise ValueError(f"Unterminated backtick template literal starting at {start_pos}")


def parse_scenes_from_ts(file_path: str) -> list[dict]:
    """
    Parse scene objects from a TypeScript story data file.
    Handles text fields written as:
      - Single-quoted strings:  text: 'Some text',
      - Double-quoted strings:  text: "Some text",
      - Backtick literals:      text: `Some text`,  (multi-line supported)

    Also captures sceneNumber and title for each scene block.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    scenes = []

    # Find all scene objects: locate sceneNumber declarations in order
    # Pattern: sceneNumber: <digit(s)>
    scene_num_pattern = re.compile(r'\bsceneNumber\s*:\s*(\d+)', re.DOTALL)
    title_pattern = re.compile(r'\btitle\s*:\s*(?:"([^"\\]*)"|\'([^\'\\]*)\'|`)', re.DOTALL)
    text_pattern = re.compile(r'\btext\s*:\s*(?:"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'|`)', re.DOTALL)

    # Collect all scene block start positions by sceneNumber
    num_matches = list(scene_num_pattern.finditer(content))

    for idx, num_match in enumerate(num_matches):
        scene_num = int(num_match.group(1))

        # Determine the extent of this scene block (up to the next sceneNumber or end of file)
        block_start = num_match.start()
        block_end = num_matches[idx + 1].start() if idx + 1 < len(num_matches) else len(content)
        block = content[block_start:block_end]
        block_offset = block_start  # for resolving absolute positions in content

        # --- Extract title ---
        scene_title = ""
        t_match = title_pattern.search(block)
        if t_match:
            if t_match.group(1) is not None:
                scene_title = t_match.group(1)
            elif t_match.group(2) is not None:
                scene_title = t_match.group(2)
            else:
                # backtick title — very rare but possible
                abs_pos = block_offset + t_match.end() - 1  # position of opening backtick
                bt_text, _ = _extract_backtick_text(content, abs_pos)
                scene_title = bt_text

        # --- Extract text ---
        scene_text = ""
        tx_match = text_pattern.search(block)
        if tx_match:
            if tx_match.group(1) is not None:
                # double-quoted
                raw = tx_match.group(1)
                scene_text = re.sub(r'\\(.)', r'\1', raw)
            elif tx_match.group(2) is not None:
                # single-quoted
                raw = tx_match.group(2)
                scene_text = re.sub(r'\\(.)', r'\1', raw)
            else:
                # backtick — find the opening backtick position in the original content
                # tx_match.end() - 1 gives us the char just after 'text: ' match end,
                # which includes the backtick as part of the pattern
                abs_pos = block_offset + tx_match.start()
                # re-search for exact backtick in content from abs_pos
                bt_search = re.search(r'\btext\s*:\s*`', content[abs_pos:abs_pos + 200])
                if bt_search:
                    backtick_pos = abs_pos + bt_search.end() - 1
                    bt_text, _ = _extract_backtick_text(content, backtick_pos)
                    scene_text = bt_text
                else:
                    # Fallback: try direct extraction
                    abs_end = block_offset + tx_match.end() - 1
                    if abs_end < len(content) and content[abs_end] == '`':
                        bt_text, _ = _extract_backtick_text(content, abs_end)
                        scene_text = bt_text

        if not scene_text:
            print(f"  [WARNING] Could not extract text for scene {scene_num} in {file_path}")
            continue

        # Normalize whitespace: collapse multiple spaces/newlines for TTS
        # Preserve paragraph breaks as pauses via ". " separation
        clean = scene_text.strip()
        # Convert markdown italics *text* -> text (remove asterisks for TTS)
        clean = re.sub(r'\*([^*]+)\*', r'\1', clean)
        # Normalize whitespace
        clean = re.sub(r'[ \t]+', ' ', clean)
        clean = re.sub(r'\n{3,}', '\n\n', clean)

        scenes.append({
            "id": f"scene-{scene_num:02d}",
            "sceneNumber": scene_num,
            "title": scene_title.strip(),
            "text": clean,
        })

    # Sort by scene number in case they appeared out of order
    scenes.sort(key=lambda s: s["sceneNumber"])
    return scenes


def generate_story_narration(slug, voice=None, speed=None, skip_existing=True):
    if slug not in STORIES_MAP:
        raise ValueError(f"Unknown story slug: {slug}. Available: {list(STORIES_MAP.keys())}")

    story_info = STORIES_MAP[slug]
    ts_file = os.path.join(PROJECT_ROOT, story_info["file"])
    selected_voice = voice or story_info["default_voice"]
    selected_speed = speed or story_info["speed"]

    out_dir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug)
    manifest_path = os.path.join(out_dir, "manifest.json")
    if skip_existing and os.path.exists(manifest_path):
        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                existing_manifest = json.load(f)
            if existing_manifest.get("scenes") and len(existing_manifest["scenes"]) > 0:
                print(f"[SKIP] Story '{slug}' already has complete manifest ({len(existing_manifest['scenes'])} scenes).")
                return existing_manifest
        except Exception:
            pass

    print("=" * 75)
    print(f"GENERATING NARRATION: {story_info['title']}")
    print(f"Slug: {slug} | Voice: {selected_voice} | Speed: {selected_speed}")
    print("=" * 75)

    if not os.path.exists(ts_file):
        raise FileNotFoundError(f"Story file not found: {ts_file}")

    scenes = parse_scenes_from_ts(ts_file)
    if not scenes:
        raise RuntimeError(f"No scenes parsed from {ts_file}. Check file format.")
    print(f"Parsed {len(scenes)} scenes from {story_info['file']}")

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
        preview = s["text"][:80].replace("\n", " ")
        print(f"  Source text ({len(s['text'])} chars): \"{preview}...\"")
        if subs:
            unique_subs = {sub['original']: sub['replacement'] for sub in subs}
            print(f"  Pronunciation substitutions applied ({len(unique_subs)}):")
            for orig, repl in unique_subs.items():
                print(f"    * {orig} -> {repl}")

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
    new_slugs = [s for s in STORIES_MAP.keys() if s not in ALREADY_NARRATED]

    parser = argparse.ArgumentParser(description="Generate Kokoro narration audio for Tales of The Gambia stories.")
    parser.add_argument(
        "--slug",
        choices=list(STORIES_MAP.keys()) + ["all-pilot", "all-new"],
        default="all-new",
        help="Story slug to generate audio for, 'all-pilot' (all stories), or 'all-new' (13 new stories only)",
    )
    parser.add_argument("--voice", help="Override Kokoro voice ID")
    parser.add_argument("--speed", type=float, help="Override speed multiplier")
    args = parser.parse_args()

    if args.slug == "all-pilot":
        targets = list(STORIES_MAP.keys())
    elif args.slug == "all-new":
        targets = new_slugs
    else:
        targets = [args.slug]

    print(f"Generating narration for {len(targets)} story/stories...")
    for s in targets:
        generate_story_narration(s, voice=args.voice, speed=args.speed)

    print("\nAll done.")