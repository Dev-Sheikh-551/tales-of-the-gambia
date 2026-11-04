"""
Phase 12A: Batch Generation for Elder Baboucar (voice: am_adam)
Narrates all 29 stories (133 canonical scenes).
Preserves existing Amara and Foday assets with zero overwriting.
"""

import os
import sys
import time
from multi_narrator_generator import generate_track_for_story, STORY_CONFIGS

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def run_batch_baboucar():
    t_start = time.time()
    print("=" * 80)
    print("PHASE 12A: BATCH GENERATION FOR ELDER BABOUCAR (Kokoro-82M am_adam)")
    print("=" * 80)

    slugs = list(STORY_CONFIGS.keys())
    print(f"Total stories to process: {len(slugs)}")

    for idx, slug in enumerate(slugs, 1):
        print(f"\n--- [{idx}/{len(slugs)}] Elder Baboucar: {slug} ---")
        generate_track_for_story(slug, "baboucar", overwrite=False)

    elapsed_total = time.time() - t_start
    print("\n" + "=" * 80)
    print(f"ELDER BABOUCAR BATCH GENERATION COMPLETE in {elapsed_total / 60:.1f} minutes!")
    print("=" * 80)

if __name__ == "__main__":
    run_batch_baboucar()
