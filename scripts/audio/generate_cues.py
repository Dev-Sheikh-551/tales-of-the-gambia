"""
Phase 14 Cue Generation Script

After narration audio is generated, run this script to:
1. For each story/scene, launch browser audio analysis via Playwright
2. Detect silence boundaries using AudioContext
3. Map silence gaps to canonical sentence boundaries
4. Output JSON cue files ready for import

Usage:
    python generate_cues.py --slug <story-slug>
    python generate_cues.py --all

This script requires the Next.js dev server to be running on port 3002.
It orchestrates cue analysis by reading existing manifest.json files and
serving MP3 files through the running app server.
"""

import os
import sys
import re
import json
import argparse

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# All 13 new stories (slug -> canonical-text-file)
STORIES_FOR_CUES = {
    "the-griot-under-the-baobab":           "data/stories/adapted/griot-baobab.ts",
    "the-little-pangolin-who-counted-stars": "data/stories/original/little-pangolin.ts",
    "nightfall-over-janjanbureh":            "data/stories/adapted/nightfall-janjanbureh.ts",
    "the-spider-and-the-pot-of-wisdom":      "data/stories/adapted/spider-wisdom.ts",
    "the-clever-hare-and-the-hyena":         "data/stories/adapted/clever-hare-and-hyena.ts",
    "the-two-kumbas":                        "data/stories/adapted/two-kumbas.ts",
    "the-kankurang-and-the-sacred-forest":   "data/stories/legends/kankurang-sacred-forest.ts",
    "kelefa-saane":                          "data/stories/historical/kelefa-saane.ts",
    "the-fula-herdsman":                     "data/stories/adapted/the-fula-herdsman.ts",
    "sundiata-lion-of-old-mali":             "data/stories/historical/sundiata-lion-of-old-mali.ts",
    "why-the-baobab-grows-upside-down":      "data/stories/adapted/why-the-baobab-grows-upside-down.ts",
    "stone-circles-of-wassu":               "data/stories/historical/stone-circles-of-wassu.ts",
    "the-first-kora":                       "data/stories/legends/the-first-kora.ts",
}


def split_into_sentences(text: str) -> list[str]:
    """
    Split canonical scene text into sentence/phrase units for cue mapping.
    Handles paragraph breaks, sentence-ending punctuation, and short standalone lines.
    Each returned sentence corresponds to one narration cue.
    """
    # Normalize whitespace
    text = re.sub(r'[ \t]+', ' ', text.strip())
    # Split on paragraph breaks first
    paragraphs = re.split(r'\n\n+', text)
    
    sentences = []
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        # Split paragraph into sentences on '. ', '? ', '! ', '.\n'
        parts = re.split(r'(?<=[.!?])\s+', para)
        for part in parts:
            part = part.strip()
            if part:
                sentences.append(part)
    return sentences


def get_char_spans(full_text: str, sentences: list[str]) -> list[tuple[int, int]]:
    """
    For each sentence, find its start/end character positions in full_text.
    Returns list of (charStart, charEnd) tuples.
    """
    spans = []
    pos = 0
    for sent in sentences:
        # Find sentence in text (strip leading whitespace in search)
        idx = full_text.find(sent, pos)
        if idx == -1:
            # Fallback: try with normalized whitespace
            norm = re.sub(r'\s+', ' ', sent)
            idx = full_text.find(norm, pos)
        if idx == -1:
            # Last resort: track position cumulatively
            idx = pos
        end = idx + len(sent)
        spans.append((idx, end))
        pos = end
    return spans


def load_manifest(slug: str) -> dict | None:
    """Load the manifest.json for a story if it exists."""
    manifest_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, "manifest.json")
    if not os.path.exists(manifest_path):
        return None
    with open(manifest_path, "r", encoding="utf-8") as f:
        return json.load(f)


def generate_cue_js_for_scene(audio_url: str, expected_sentence_count: int) -> str:
    """
    Generate JavaScript code to run in browser via Playwright browser_run_code_unsafe
    to analyze an audio file and detect silence boundaries.
    
    Returns: JS code string that yields a JSON array of {startSeconds, endSeconds} objects,
    one per detected speech segment.
    """
    return f"""
async function analyzeAudio() {{
    const audioUrl = "{audio_url}";
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const frameSizeSamples = Math.floor(sampleRate * 0.010); // 10ms frames
    
    // Compute RMS for each frame
    const frames = [];
    for (let i = 0; i < channelData.length; i += frameSizeSamples) {{
        const end = Math.min(i + frameSizeSamples, channelData.length);
        let sum = 0;
        for (let j = i; j < end; j++) sum += channelData[j] * channelData[j];
        frames.push(Math.sqrt(sum / (end - i)));
    }}
    
    // Dynamic noise floor: 5th percentile of all RMS values
    const sorted = [...frames].sort((a, b) => a - b);
    const noiseFloor = sorted[Math.floor(sorted.length * 0.05)];
    const threshold = Math.max(noiseFloor * 3.5, 0.005);
    
    // Find silence gaps >= 150ms between speech segments
    const minSilenceFrames = Math.ceil(0.15 / 0.010); // 150ms
    const segments = [];
    let inSpeech = false;
    let segStart = 0;
    let silenceCount = 0;
    
    for (let i = 0; i < frames.length; i++) {{
        const isSpeech = frames[i] > threshold;
        if (isSpeech) {{
            if (!inSpeech) {{
                segStart = i;
                inSpeech = true;
            }}
            silenceCount = 0;
        }} else {{
            if (inSpeech) {{
                silenceCount++;
                if (silenceCount >= minSilenceFrames) {{
                    segments.push({{
                        startSeconds: +(segStart * 0.010).toFixed(3),
                        endSeconds: +((i - silenceCount + minSilenceFrames / 2) * 0.010).toFixed(3)
                    }});
                    inSpeech = false;
                    silenceCount = 0;
                }}
            }}
        }}
    }}
    
    // Handle final segment if still in speech at end
    if (inSpeech) {{
        segments.push({{
            startSeconds: +(segStart * 0.010).toFixed(3),
            endSeconds: +(audioBuffer.duration).toFixed(3)
        }});
    }}
    
    return {{
        duration: audioBuffer.duration,
        sampleRate: sampleRate,
        segments: segments,
        expectedSentences: {expected_sentence_count}
    }};
}}
return analyzeAudio();
"""


def merge_segments_to_sentences(segments: list[dict], sentences: list[str], total_duration: float) -> list[dict]:
    """
    Merge speech segments into sentence-count buckets, creating one cue per sentence.
    Uses a greedy grouping: tries to assign one segment per sentence, merging where needed.
    """
    n_sents = len(sentences)
    n_segs = len(segments)
    
    if n_segs == 0:
        # No segments detected — create even-split fallback
        duration_each = total_duration / max(n_sents, 1)
        return [
            {
                "index": i,
                "startSeconds": round(i * duration_each, 3),
                "endSeconds": round((i + 1) * duration_each, 3),
                "text": sentences[i],
            }
            for i in range(n_sents)
        ]
    
    # If more segments than sentences, merge adjacent segments
    # If fewer segments than sentences, split cues proportionally
    cues = []
    
    if n_segs >= n_sents:
        # Group segments into n_sents buckets
        # Simple approach: greedily assign segments to sentences
        bucket_size = n_segs / n_sents
        for i in range(n_sents):
            start_idx = round(i * bucket_size)
            end_idx = round((i + 1) * bucket_size)
            end_idx = min(end_idx, n_segs)
            if start_idx >= n_segs:
                start_idx = n_segs - 1
            bucket = segments[start_idx:end_idx]
            if not bucket:
                bucket = [segments[min(start_idx, n_segs - 1)]]
            cue_start = bucket[0]["startSeconds"]
            cue_end = bucket[-1]["endSeconds"]
            cues.append({
                "index": i,
                "startSeconds": cue_start,
                "endSeconds": cue_end,
                "text": sentences[i],
            })
    else:
        # Fewer segments than sentences — distribute sentences across segments
        sent_per_seg = n_sents / max(n_segs, 1)
        seg_idx = 0
        for i in range(n_sents):
            seg_idx = min(round(i / sent_per_seg), n_segs - 1)
            # Interpolate start/end within segment
            seg = segments[seg_idx]
            seg_duration = seg["endSeconds"] - seg["startSeconds"]
            local_sents_in_seg = max(1, round(sent_per_seg))
            local_idx = i - round(seg_idx * sent_per_seg)
            local_start = seg["startSeconds"] + (local_idx / local_sents_in_seg) * seg_duration
            local_end = seg["startSeconds"] + ((local_idx + 1) / local_sents_in_seg) * seg_duration
            cues.append({
                "index": i,
                "startSeconds": round(local_start, 3),
                "endSeconds": round(local_end, 3),
                "text": sentences[i],
            })
    
    # Ensure no overlapping cues
    for i in range(1, len(cues)):
        if cues[i]["startSeconds"] < cues[i-1]["endSeconds"]:
            cues[i]["startSeconds"] = cues[i-1]["endSeconds"]
    
    # Ensure last cue ends at total_duration
    if cues and cues[-1]["endSeconds"] < total_duration:
        cues[-1]["endSeconds"] = round(total_duration, 3)
    
    return cues


def write_cue_file(slug: str, scene_num: int, cues: list[dict]) -> str:
    """Write cue JSON file, return path."""
    slug_dir = slug  # e.g. "the-griot-under-the-baobab"
    cue_dir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", slug_dir)
    os.makedirs(cue_dir, exist_ok=True)
    filename = f"scene-{scene_num:02d}.json"
    filepath = os.path.join(cue_dir, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(cues, f, indent=2, ensure_ascii=False)
    print(f"  -> Wrote {filepath} ({len(cues)} cues)")
    return filepath


if __name__ == "__main__":
    print("Cue generation module. Import and use generate_cue_js_for_scene(), merge_segments_to_sentences(), write_cue_file().")
    print("This script is called by the main workflow — not run directly.")
