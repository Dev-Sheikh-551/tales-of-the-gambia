"""
Batch generation script for all remaining multi-narrator tracks in Tales of The Gambia.
Skips existing files by default so it is completely idempotent.
"""

import os
import sys
import time
from multi_narrator_generator import generate_track_for_story, STORY_CONFIGS

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def run_batch():
    t_start = time.time()
    print("=" * 80)
    print("STARTING BATCH GENERATION OF MULTI-NARRATOR TRACKS")
    print("=" * 80)

    # 1. Generate Foday (am_michael) for stories that currently only have Amara (af_heart)
    foday_stories = [
        slug for slug, cfg in STORY_CONFIGS.items()
        if cfg["existing_voice"] == "af_heart"
    ]
    print(f"\n[PHASE 1] Generating Foday the Jali tracks ({len(foday_stories)} stories)...")
    for idx, slug in enumerate(foday_stories, 1):
        print(f"\n--- [{idx}/{len(foday_stories)}] Foday: {slug} ---")
        generate_track_for_story(slug, "foday", overwrite=False)

    # 2. Generate Amara (af_heart) for stories that currently only have Foday (am_michael)
    amara_stories = [
        slug for slug, cfg in STORY_CONFIGS.items()
        if cfg["existing_voice"] == "am_michael"
    ]
    print(f"\n[PHASE 2] Generating Amara of Gambia tracks ({len(amara_stories)} stories)...")
    for idx, slug in enumerate(amara_stories, 1):
        print(f"\n--- [{idx}/{len(amara_stories)}] Amara: {slug} ---")
        generate_track_for_story(slug, "amara", overwrite=False)

    elapsed_total = time.time() - t_start
    print("\n" + "=" * 80)
    print(f"BATCH GENERATION COMPLETE in {elapsed_total / 60:.1f} minutes!")
    print("=" * 80)

if __name__ == "__main__":
    run_batch()
