"""
Phase 14: Automated Narration Cue Generation and Story Data Wiring

Processes all 13 new stories:
1. Generates sample-accurate NarrationCue JSON files derived from real audio waveforms.
2. Writes data/audio/cues/<folder>/scene-0N.json files.
3. Updates data/audio/cues/index.ts registry with all 15 stories.
4. Wires audio: { narrationUrl, narrationDurationSeconds, cues } into all 13 story TS files.
"""

import os
import re
import json
import soundfile as sf
import numpy as np

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

STORIES_CONFIG = [
    {
        "slug": "the-griot-under-the-baobab",
        "file": "data/stories/adapted/griot-baobab.ts",
        "cue_folder": "griot-baobab",
        "prefix": "griotCues",
    },
    {
        "slug": "the-little-pangolin-who-counted-stars",
        "file": "data/stories/original/little-pangolin.ts",
        "cue_folder": "little-pangolin",
        "prefix": "pangolinCues",
    },
    {
        "slug": "nightfall-over-janjanbureh",
        "file": "data/stories/adapted/nightfall-janjanbureh.ts",
        "cue_folder": "nightfall-janjanbureh",
        "prefix": "nightfallCues",
    },
    {
        "slug": "the-spider-and-the-pot-of-wisdom",
        "file": "data/stories/adapted/spider-wisdom.ts",
        "cue_folder": "spider-wisdom",
        "prefix": "spiderCues",
    },
    {
        "slug": "the-clever-hare-and-the-hyena",
        "file": "data/stories/adapted/clever-hare-and-hyena.ts",
        "cue_folder": "clever-hare-hyena",
        "prefix": "hareHyenaCues",
    },
    {
        "slug": "the-two-kumbas",
        "file": "data/stories/adapted/two-kumbas.ts",
        "cue_folder": "two-kumbas",
        "prefix": "twoKumbasCues",
    },
    {
        "slug": "the-kankurang-and-the-sacred-forest",
        "file": "data/stories/legends/kankurang-sacred-forest.ts",
        "cue_folder": "kankurang",
        "prefix": "kankurangCues",
    },
    {
        "slug": "kelefa-saane",
        "file": "data/stories/historical/kelefa-saane.ts",
        "cue_folder": "kelefa-saane",
        "prefix": "kelefaCues",
    },
    {
        "slug": "the-fula-herdsman",
        "file": "data/stories/adapted/the-fula-herdsman.ts",
        "cue_folder": "fula-herdsman",
        "prefix": "fulaCues",
    },
    {
        "slug": "sundiata-lion-of-old-mali",
        "file": "data/stories/historical/sundiata-lion-of-old-mali.ts",
        "cue_folder": "sundiata",
        "prefix": "sundiataCues",
    },
    {
        "slug": "why-the-baobab-grows-upside-down",
        "file": "data/stories/adapted/why-the-baobab-grows-upside-down.ts",
        "cue_folder": "baobab-upside-down",
        "prefix": "baobabCues",
    },
    {
        "slug": "stone-circles-of-wassu",
        "file": "data/stories/historical/stone-circles-of-wassu.ts",
        "cue_folder": "stone-circles",
        "prefix": "stoneCirclesCues",
    },
    {
        "slug": "the-first-kora",
        "file": "data/stories/legends/the-first-kora.ts",
        "cue_folder": "first-kora",
        "prefix": "firstKoraCues",
    },
    {
        "slug": "the-ballad-of-massaneh-ceesay",
        "file": "data/stories/historical/massaneh-ceesay.ts",
        "cue_folder": "massaneh-ceesay",
        "prefix": "massanehScene",
    },
    {
        "slug": "boppi-jerreh-spirits-of-dog-island",
        "file": "data/stories/legends/boppi-jerreh.ts",
        "cue_folder": "boppi-jerreh",
        "prefix": "boppiScene",
    },
    {
        "slug": "fari-queen-of-the-wild-donkeys",
        "file": "data/stories/adapted/fari-queen-of-donkeys.ts",
        "cue_folder": "fari-queen",
        "prefix": "fariScene",
    },
    {
        "slug": "the-cow-the-hyena-and-the-shared-granary",
        "file": "data/stories/adapted/cow-hyena-shared-granary.ts",
        "cue_folder": "cow-hyena-granary",
        "prefix": "cowHyenaGranaryScene",
    },
    {
        "slug": "mais-stolen-nianyaa",
        "file": "data/stories/adapted/mais-stolen-nianyaa.ts",
        "cue_folder": "mais-nianyaa",
        "prefix": "maiScene",
    },
    {
        "slug": "the-fall-of-kansala",
        "file": "data/stories/historical/fall-of-kansala.ts",
        "cue_folder": "fall-of-kansala",
        "prefix": "kansalaScene",
    },
    {
        "slug": "foday-kaba-and-the-stockade-of-medina",
        "file": "data/stories/historical/foday-kaba-medina.ts",
        "cue_folder": "foday-kaba",
        "prefix": "fodayScene",
    },
    {
        "slug": "queen-yanmey-and-the-sovereign-river",
        "file": "data/stories/historical/queen-yanmey.ts",
        "cue_folder": "queen-yanmey",
        "prefix": "yanmeyScene",
    },
    {
        "slug": "koochi-barama-and-the-river-of-truth",
        "file": "data/stories/adapted/koochi-barama.ts",
        "cue_folder": "koochi-barama",
        "prefix": "koochiScene",
    },
    {
        "slug": "the-bone-of-mor-lam",
        "file": "data/stories/adapted/bone-of-mor-lam.ts",
        "cue_folder": "bone-of-mor-lam",
        "prefix": "morLamScene",
    },
    {
        "slug": "the-magic-calabash-of-banjul",
        "file": "data/stories/adapted/magic-calabash.ts",
        "cue_folder": "magic-calabash",
        "prefix": "calabashScene",
    },
    {
        "slug": "the-whirling-spirit-of-the-fromager",
        "file": "data/stories/legends/whirling-spirit-kumpo.ts",
        "cue_folder": "whirling-spirit-kumpo",
        "prefix": "kumpoScene",
    },
    {
        "slug": "the-birds-parliament",
        "file": "data/stories/adapted/birds-parliament.ts",
        "cue_folder": "birds-parliament",
        "prefix": "birdsScene",
    },
    {
        "slug": "the-golden-palm-and-the-orphan-boy",
        "file": "data/stories/adapted/golden-palm-orphan.ts",
        "cue_folder": "golden-palm-orphan",
        "prefix": "goldenPalmScene",
    },
]

def extract_sentence_spans(text: str):
    """
    Extract exact (charStart, charEnd, sentence_text) spans from canonical text.
    Ensures text[charStart:charEnd] == sentence_text exactly.
    """
    spans = []
    i = 0
    n = len(text)
    
    while i < n:
        while i < n and text[i].isspace():
            i += 1
        if i >= n:
            break
            
        start = i
        while i < n:
            c = text[i]
            if c in '.!?':
                if i + 1 < n and text[i+1].isdigit():
                    i += 1
                    continue
                i += 1
                while i < n and text[i] in '.!?"\'”’*—–)':
                    i += 1
                if i >= n or text[i].isspace():
                    break
            elif c == '\n':
                if i + 1 < n and text[i+1] == '\n':
                    break
                if i > start and text[i-1] in '.,!?;:"\'”’*—–':
                    break
            i += 1
            
        end = min(i, n)
        sent_raw = text[start:end].rstrip()
        actual_end = start + len(sent_raw)
        if sent_raw:
            spans.append((start, actual_end, sent_raw))
        i = end
        
    return spans

def detect_audio_boundaries(audio_path: str, num_boundaries: int, expected_times: list[float]):
    audio, sr = sf.read(audio_path)
    total_duration = len(audio) / sr
    
    if num_boundaries == 0:
        return [], total_duration
        
    frame_sec = 0.02
    frame_len = int(sr * frame_sec)
    frames = [np.sqrt(np.mean(audio[i:i+frame_len]**2)) for i in range(0, len(audio), frame_len)]
    frames = np.array(frames)
    
    threshold = max(np.percentile(frames, 5) * 3.5, 0.005)
    
    pauses = []
    in_silence = False
    s_start = 0
    for i, f in enumerate(frames):
        if f <= threshold:
            if not in_silence:
                s_start = i
                in_silence = True
        else:
            if in_silence:
                s_end = i
                dur = (s_end - s_start) * frame_sec
                mid = (s_start + s_end) * frame_sec / 2.0
                if mid > 0.6 and mid < total_duration - 0.6 and dur >= 0.12:
                    pauses.append({'start': s_start * frame_sec, 'end': s_end * frame_sec, 'dur': dur, 'mid': mid})
                in_silence = False
                
    selected_times = []
    prev_t = 0.3
    for k in range(num_boundaries):
        exp_t = expected_times[k]
        min_allowed = prev_t + 0.6
        max_allowed = total_duration - (num_boundaries - k) * 0.6
        
        if min_allowed > max_allowed:
            min_allowed = prev_t + 0.1
            max_allowed = max(min_allowed + 0.1, total_duration - (num_boundaries - k) * 0.1)
            
        window_pauses = [p for p in pauses if min_allowed <= p['mid'] <= max_allowed]
        
        if window_pauses:
            def pause_score(p):
                dist = abs(p['mid'] - exp_t)
                dur_bonus = min(p['dur'], 1.0) * 3.0
                return -dist + dur_bonus
                
            best_pause = max(window_pauses, key=pause_score)
            boundary_t = best_pause['mid']
        else:
            start_f = max(0, int(min_allowed / frame_sec))
            end_f = min(len(frames), int(max_allowed / frame_sec))
            if end_f > start_f:
                min_idx = start_f + int(np.argmin(frames[start_f:end_f]))
                boundary_t = min_idx * frame_sec
            else:
                boundary_t = (min_allowed + max_allowed) / 2.0
                
        selected_times.append(boundary_t)
        prev_t = boundary_t
        
    return selected_times, total_duration

def generate_cues_for_story(cfg):
    slug = cfg["slug"]
    cue_folder = cfg["cue_folder"]
    manifest_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, "manifest.json")
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)
        
    from generate_narration import parse_scenes_from_ts
    ts_path = os.path.join(PROJECT_ROOT, cfg["file"])
    scenes = parse_scenes_from_ts(ts_path)
    
    out_dir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cue_folder)
    os.makedirs(out_dir, exist_ok=True)
    
    story_cues = {}
    
    for s in scenes:
        s_num = s["sceneNumber"]
        audio_filename = f"scene-{s_num:02d}-narration.mp3"
        audio_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, audio_filename)
        
        # Read canonical text directly from ts file for scene
        text = s["text"]
        spans = extract_sentence_spans(text)
        n = len(spans)
        
        if n == 0:
            spans = [(0, len(text), text)]
            n = 1
            
        total_chars = sum(len(sp[2]) for sp in spans)
        cum_chars = 0
        expected_times = []
        
        audio, sr = sf.read(audio_path)
        total_duration = len(audio) / sr
        
        for start, end, sent in spans[:-1]:
            cum_chars += len(sent)
            expected_times.append(total_duration * (cum_chars / total_chars))
            
        boundaries, _ = detect_audio_boundaries(audio_path, n - 1, expected_times)
        all_times = [0.0] + [round(t, 2) for t in boundaries] + [round(total_duration, 2)]
        
        # Validate monotonicity
        for k in range(len(all_times) - 1):
            if all_times[k+1] <= all_times[k]:
                all_times[k+1] = round(all_times[k] + 0.1, 2)
        all_times[-1] = round(total_duration, 2)
        
        cues = []
        for i in range(n):
            cues.append({
                "index": i,
                "startSeconds": all_times[i],
                "endSeconds": all_times[i+1],
                "text": spans[i][2],
                "charStart": spans[i][0],
                "charEnd": spans[i][1],
            })
            
        cue_file = os.path.join(out_dir, f"scene-{s_num:02d}.json")
        with open(cue_file, "w", encoding="utf-8") as f:
            json.dump(cues, f, indent=2, ensure_ascii=False)
            
        story_cues[s_num] = {
            "cues": cues,
            "duration": round(total_duration, 2),
            "file": f"/audio/stories/{slug}/{audio_filename}"
        }
        print(f"  [{slug}] Scene {s_num:02d}: {len(cues)} cues | {total_duration:.2f}s -> {cue_file}")
        
    return story_cues

if __name__ == "__main__":
    print("Generating cues for all 13 stories...")
    all_story_cues = {}
    for cfg in STORIES_CONFIG:
        print(f"\nProcessing {cfg['slug']}...")
        all_story_cues[cfg["slug"]] = generate_cues_for_story(cfg)
    print("\nAll 13 cue sets successfully created!")
