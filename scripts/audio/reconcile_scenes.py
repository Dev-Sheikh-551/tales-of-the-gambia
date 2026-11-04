import os
import sys
import json

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, os.path.join(PROJECT_ROOT, "scripts", "audio"))

from multi_narrator_generator import STORY_CONFIGS
from generate_narration import parse_scenes_from_ts

early_15_slugs = [
    'the-clever-hare-and-the-great-drought',
    'the-whispering-waters-of-ninki-nanka',
    'the-griot-under-the-baobab',
    'the-little-pangolin-who-counted-stars',
    'nightfall-over-janjanbureh',
    'the-spider-and-the-pot-of-wisdom',
    'the-clever-hare-and-the-hyena',
    'the-two-kumbas',
    'the-kankurang-and-the-sacred-forest',
    'kelefa-saane',
    'the-fula-herdsman',
    'sundiata-lion-of-old-mali',
    'why-the-baobab-grows-upside-down',
    'stone-circles-of-wassu',
    'the-first-kora'
]

print("=" * 80)
print("RECONCILIATION: 69-SCENE QA AUDIT vs 133-SCENE COMPLETE CANONICAL INVENTORY")
print("=" * 80)

total_scenes = 0
early_scenes = 0
later_scenes = 0

story_data = []

for slug, cfg in STORY_CONFIGS.items():
    ts_file = os.path.join(PROJECT_ROOT, cfg['file'])
    scenes = parse_scenes_from_ts(ts_file)
    n = len(scenes)
    total_scenes += n
    is_early = slug in early_15_slugs
    if is_early:
        early_scenes += n
    else:
        later_scenes += n
    story_data.append((slug, n, cfg['existing_voice'], is_early))

print(f"1. Early Wave (15 Stories from Phase 15 QA Audit): {early_scenes} scenes")
print(f"2. Later Wave (14 Stories added in Phase 10/14):    {later_scenes} scenes")
print(f"3. Full Canonical Story Corpus (All 29 Stories):    {total_scenes} scenes")
print(f"4. Expected Narrator Tracks (Amara + Foday):       {total_scenes * 2} tracks ({total_scenes} Amara, {total_scenes} Foday)")
print("=" * 80)

print(f"\n{'STORY SLUG':<45} | {'SCENES':<6} | {'EXISTING VOICE':<15} | {'ORIGINAL AUDIT GROUP'}")
print("-" * 88)
for s, n, v, early in sorted(story_data, key=lambda x: x[0]):
    group = "Early 15 (69 scenes)" if early else "Later 14 (64 scenes)"
    voice_label = "Amara (af_heart)" if v == "af_heart" else "Foday (am_michael)"
    print(f"{s:<45} | {n:<6} | {voice_label:<15} | {group}")

print("-" * 88)
print(f"{'TOTALS':<45} | {total_scenes:<6} | 29 Stories | 69 early + 64 later = 133 scenes")
