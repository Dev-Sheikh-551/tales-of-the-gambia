"""
Voice benchmark testing script for Kokoro-82M English voices.
Evaluates storytelling warmth, pacing, pronunciation of Gambian terms,
and dialogue naturalness.
"""

import os
import sys
import time
import soundfile as sf
import numpy as np
from kokoro import KPipeline
from pronunciation import preprocess_text

# Benchmark passage containing narrative, dialogue, Gambian names, and atmospheric tone
BENCHMARK_PASSAGE = (
    "Beneath the ancient baobab, the river elders spoke in measured cadences. "
    "Wise Elephant raised her voice: 'Brothers and sisters, water sleeps deep within the dry bolong, "
    "but it yields only to patience.' Near the winding creeks of Kiang West, young Samba listened "
    "for the whispering breath of Ninki Nanka upon the Gambia River."
)

CANDIDATE_VOICES = [
    ("af_heart", "American Female - Heart (Warm, balanced, calm)"),
    ("af_bella", "American Female - Bella (Expressive, lyrical)"),
    ("am_adam", "American Male - Adam (Steady, narrative)"),
    ("am_michael", "American Male - Michael (Rich, baritone, resonant)"),
    ("bf_alice", "British Female - Alice (Clear, classic storytelling)"),
    ("bm_george", "British Male - George (Deep, solemn, elder cadence)"),
]

def run_benchmark():
    out_dir = os.path.join(os.path.dirname(__file__), "output_test")
    os.makedirs(out_dir, exist_ok=True)

    print("=" * 70)
    print("KOKORO-82M VOICE BENCHMARK — TALES OF THE GAMBIA")
    print("=" * 70)
    print(f"Benchmark Passage:\n\"{BENCHMARK_PASSAGE}\"\n")

    processed_text, substitutions = preprocess_text(BENCHMARK_PASSAGE)
    print("Phonetic Preprocessing Substitutions:")
    for s in substitutions:
        print(f"  - {s['original']} -> {s['replacement']}")
    print()

    print("Initializing Kokoro pipeline (lang_code='a' for American, 'b' for British)...")
    pipe_a = KPipeline(lang_code='a')
    pipe_b = KPipeline(lang_code='b')

    results = []

    for voice_id, description in CANDIDATE_VOICES:
        print(f"Testing voice: {voice_id} ({description})...")
        pipeline = pipe_b if voice_id.startswith('b') else pipe_a

        t0 = time.time()
        audio_segments = []
        generator = pipeline(processed_text, voice=voice_id, speed=0.92, split_pattern=r'\n+')
        for _, _, audio in generator:
            audio_segments.append(audio)

        elapsed = time.time() - t0
        if audio_segments:
            combined = np.concatenate(audio_segments)
            duration = len(combined) / 24000.0
            out_file = os.path.join(out_dir, f"test_{voice_id}.mp3")
            sf.write(out_file, combined, 24000, format='MP3')
            file_size_kb = os.path.getsize(out_file) / 1024.0

            results.append({
                "voice": voice_id,
                "description": description,
                "duration": duration,
                "gen_time": elapsed,
                "file_size_kb": file_size_kb,
                "file_path": out_file
            })
            print(f"  -> Generated {out_file} ({duration:.1f}s, {file_size_kb:.1f}KB in {elapsed:.2f}s)")
        else:
            print(f"  -> Failed to generate audio for {voice_id}")

    print("\n" + "=" * 70)
    print("BENCHMARK SUMMARY")
    print("=" * 70)
    print(f"{'Voice':<12} | {'Duration':<10} | {'Gen Time':<10} | {'Size':<10} | {'Notes'}")
    print("-" * 70)
    for r in results:
        print(f"{r['voice']:<12} | {r['duration']:<6.1f}s    | {r['gen_time']:<6.2f}s    | {r['file_size_kb']:<6.1f}KB   | {r['description']}")
    print("=" * 70)

if __name__ == '__main__':
    run_benchmark()