import os
import json
import soundfile as sf
import numpy as np
from pronunciation import preprocess_text
from generate_narration import parse_scenes_from_ts

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

STORIES_TO_INSPECT = [
    ("the-whispering-waters-of-ninki-nanka", "data/stories/adapted/ninki-nanka.ts", "ninki-nanka", "Legends"),
    ("the-clever-hare-and-the-great-drought", "data/stories/adapted/hare-drought.ts", "hare-drought", "Fables"),
    ("sundiata-lion-of-old-mali", "data/stories/historical/sundiata-lion-of-old-mali.ts", "sundiata", "Historical / Epic"),
    ("nightfall-over-janjanbureh", "data/stories/adapted/nightfall-janjanbureh.ts", "nightfall-janjanbureh", "Bedtime / Children"),
]

def analyze_track(audio_path, cue_path, canonical_text):
    data, sr = sf.read(audio_path)
    dur = len(data) / sr
    peak = float(np.max(np.abs(data)))
    rms = float(np.sqrt(np.mean(data**2)))
    
    # Check leading silence (first 100ms)
    leading_100ms = data[:int(sr * 0.1)]
    leading_silent = np.max(np.abs(leading_100ms)) < 0.2
    
    # Check trailing silence / gentle fade (last 200ms)
    trailing_200ms = data[-int(sr * 0.2):]
    trailing_peak = float(np.max(np.abs(trailing_200ms)))
    no_abrupt_cutoff = trailing_peak < 0.35
    
    with open(cue_path, "r", encoding="utf-8") as f:
        cues = json.load(f)
        
    num_words = len(canonical_text.split())
    wpm = (num_words / dur) * 60.0
    
    # Pronunciation check
    _, subs = preprocess_text(canonical_text)
    
    return {
        "duration": round(dur, 2),
        "peak": round(peak, 3),
        "rms": round(rms, 4),
        "wpm": round(wpm, 1),
        "cues_count": len(cues),
        "cue_last_end": cues[-1]["endSeconds"],
        "no_abrupt_cutoff": no_abrupt_cutoff,
        "substitutions": [s["original"] for s in subs],
    }

print("=" * 80)
print("RUNTIME ACCEPTANCE: REPRESENTATIVE AUDIO & PRONUNCIATION ANALYSIS")
print("=" * 80)

for slug, ts_rel, cue_folder, cat in STORIES_TO_INSPECT:
    print(f"\n[{cat.upper()}] Story: {slug}")
    ts_path = os.path.join(PROJECT_ROOT, ts_rel)
    scenes = parse_scenes_from_ts(ts_path)
    s1 = scenes[0]
    
    # Check Amara
    sdir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug)
    cdir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cue_folder)
    
    # Determine which file is amara and foday
    amara_a = os.path.join(sdir, "scene-01-amara.mp3") if os.path.exists(os.path.join(sdir, "scene-01-amara.mp3")) else os.path.join(sdir, "scene-01-narration.mp3")
    amara_c = os.path.join(cdir, "scene-01-amara.json") if os.path.exists(os.path.join(cdir, "scene-01-amara.json")) else os.path.join(cdir, "scene-01.json")
    
    foday_a = os.path.join(sdir, "scene-01-foday.mp3") if os.path.exists(os.path.join(sdir, "scene-01-foday.mp3")) else os.path.join(sdir, "scene-01-narration.mp3")
    foday_c = os.path.join(cdir, "scene-01-foday.json") if os.path.exists(os.path.join(cdir, "scene-01-foday.json")) else os.path.join(cdir, "scene-01.json")
    
    res_amara = analyze_track(amara_a, amara_c, s1["text"])
    res_foday = analyze_track(foday_a, foday_c, s1["text"])
    
    print(f"  Scene 1 Text Sample ({len(s1['text'].split())} words): \"{s1['text'][:60]}...\"")
    if res_amara["substitutions"]:
        print(f"  Phonetic Cultural Substitutions: {list(set(res_amara['substitutions']))}")
        
    print(f"  AMARA (af_heart):  {res_amara['duration']}s | {res_amara['wpm']} WPM | Peak: {res_amara['peak']} | RMS: {res_amara['rms']} | Cutoff Clean: {res_amara['no_abrupt_cutoff']} | Cues: {res_amara['cues_count']}")
    print(f"  FODAY (am_michael): {res_foday['duration']}s | {res_foday['wpm']} WPM | Peak: {res_foday['peak']} | RMS: {res_foday['rms']} | Cutoff Clean: {res_foday['no_abrupt_cutoff']} | Cues: {res_foday['cues_count']}")
