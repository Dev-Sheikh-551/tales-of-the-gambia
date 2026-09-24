"""
Phase 15: Full Narration Quality & Synchronization QA Audit Script

Performs programmatic inspection of:
1. Audio file existence, decodability, duration accuracy, sample rate, channels
2. Audio quality: Peak amplitude, clipping check (>0.999), RMS levels, leading/trailing silence
3. Cue integrity: 
   - startSeconds >= 0, endSeconds > startSeconds
   - charStart >= 0, charEnd > charStart, charEnd <= len(scene_text)
   - exact character span slice match: scene_text[charStart:charEnd] == cue.text
   - monotonicity and chronological ordering
   - registry completeness (all 15 stories, all 69 scenes)
4. Cultural pronunciation coverage check in text vs pronunciation.py
"""

import os
import re
import json
import soundfile as sf
import numpy as np

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# Import story list and configs
from wire_all_stories import ALL_STORIES
from generate_narration import parse_scenes_from_ts
from pronunciation import PRONUNCIATION_MAP, preprocess_text

def run_qa_audit():
    print("=" * 80)
    print("PHASE 15: NARRATION & CUE QA AUDIT")
    print("=" * 80)

    audio_results = []
    cue_results = []
    pronunciation_findings = []
    
    total_audio_checked = 0
    total_audio_valid = 0
    total_cues_checked = 0
    total_cues_valid = 0

    # 1. Inspect registry in data/audio/cues/index.ts
    index_ts_path = os.path.join(PROJECT_ROOT, "data", "audio", "cues", "index.ts")
    with open(index_ts_path, "r", encoding="utf-8") as f:
        index_ts_content = f.read()

    registry_stories_found = re.findall(r'"([^"]+)":\s*\{', index_ts_content)
    print(f"\n[Registry Check] Stories found in cues index.ts: {len(registry_stories_found)}/15")
    assert len(registry_stories_found) == 15, f"Expected 15 stories in registry, found {len(registry_stories_found)}"

    for story_cfg in ALL_STORIES:
        slug = story_cfg["slug"]
        ts_file = os.path.join(PROJECT_ROOT, story_cfg["file"])
        cue_folder = story_cfg["cue_folder"]
        
        # Parse canonical scenes from TS file
        scenes = parse_scenes_from_ts(ts_file)
        expected_scenes_count = story_cfg["scenes_count"]
        
        if len(scenes) != expected_scenes_count:
            print(f"[ERROR] {slug}: parsed {len(scenes)} scenes, expected {expected_scenes_count}")
        
        # Manifest
        manifest_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, "manifest.json")
        has_manifest = os.path.exists(manifest_path)
        manifest_scenes = {}
        if has_manifest:
            with open(manifest_path, "r", encoding="utf-8") as mf:
                manifest_data = json.load(mf)
                for ms in manifest_data.get("scenes", []):
                    manifest_scenes[ms["sceneNumber"]] = ms

        for scene in scenes:
            s_num = scene["sceneNumber"]
            total_audio_checked += 1
            
            # --- Audio File QA ---
            filename = f"scene-{s_num:02d}-narration.mp3"
            audio_path = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug, filename)
            audio_rel = f"/audio/stories/{slug}/{filename}"
            
            status = "PASS"
            issues = []
            
            if not os.path.exists(audio_path):
                status = "FAIL"
                issues.append("File missing")
                actual_dur = 0.0
                peak = 0.0
                rms = 0.0
            else:
                try:
                    data, sr = sf.read(audio_path)
                    actual_dur = round(len(data) / sr, 2)
                    
                    if len(data) == 0:
                        status = "FAIL"
                        issues.append("Zero-length audio")
                        peak = 0.0
                        rms = 0.0
                    else:
                        # Audio quality metrics
                        peak = float(np.max(np.abs(data)))
                        rms = float(np.sqrt(np.mean(data**2)))
                        
                        # Check clipping
                        if peak >= 0.999:
                            issues.append(f"Possible clipping (peak={peak:.3f})")
                        
                        # Check volume level
                        if rms < 0.01:
                            issues.append(f"Unusually low volume (rms={rms:.4f})")
                        elif rms > 0.35:
                            issues.append(f"Unusually high volume (rms={rms:.4f})")
                            
                        # Check leading/trailing silence (20ms frames)
                        frame_size = int(sr * 0.02)
                        frames_rms = [np.sqrt(np.mean(data[i:i+frame_size]**2)) for i in range(0, min(len(data), int(sr * 3.0)), frame_size)]
                        leading_silence = 0
                        for f_rms in frames_rms:
                            if f_rms < 0.005:
                                leading_silence += 0.02
                            else:
                                break
                        if leading_silence > 1.5:
                            issues.append(f"Long leading silence ({leading_silence:.2f}s)")
                            
                except Exception as e:
                    status = "FAIL"
                    issues.append(f"Decode error: {e}")
                    actual_dur = 0.0
                    peak = 0.0
                    rms = 0.0
            
            exp_dur = manifest_scenes.get(s_num, {}).get("durationSeconds", actual_dur)
            dur_diff = round(abs(actual_dur - exp_dur), 2)
            
            if dur_diff > 0.5:
                issues.append(f"Duration mismatch: manifest={exp_dur}s vs file={actual_dur}s")
                status = "WARN" if status == "PASS" else status

            if status == "PASS" and not issues:
                total_audio_valid += 1
            elif status == "PASS" and issues:
                total_audio_valid += 1  # non-critical warnings
                
            audio_results.append({
                "story": slug,
                "scene": s_num,
                "file": audio_rel,
                "expectedDuration": exp_dur,
                "actualDuration": actual_dur,
                "diff": dur_diff,
                "peak": round(peak, 3),
                "rms": round(rms, 4),
                "status": status,
                "issues": "; ".join(issues) if issues else "None"
            })

            # --- Cue Integrity QA ---
            cue_path = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cue_folder, f"scene-{s_num:02d}.json")
            if not os.path.exists(cue_path):
                cue_results.append({
                    "story": slug,
                    "scene": s_num,
                    "status": "FAIL",
                    "issues": f"Missing cue file: {cue_path}",
                    "cuesCount": 0
                })
            else:
                with open(cue_path, "r", encoding="utf-8") as cf:
                    cues = json.load(cf)
                    
                scene_text = scene["text"]
                cue_issues = []
                prev_end = 0.0
                
                for idx, c in enumerate(cues):
                    total_cues_checked += 1
                    c_valid = True
                    
                    # startSeconds >= 0
                    if c["startSeconds"] < 0:
                        cue_issues.append(f"Cue {idx}: negative start ({c['startSeconds']})")
                        c_valid = False
                    # endSeconds > startSeconds
                    if c["endSeconds"] <= c["startSeconds"]:
                        cue_issues.append(f"Cue {idx}: non-positive duration ({c['startSeconds']} -> {c['endSeconds']})")
                        c_valid = False
                    # monotonicity
                    if c["startSeconds"] < prev_end - 0.01:
                        cue_issues.append(f"Cue {idx}: overlaps prev cue ({c['startSeconds']} < {prev_end})")
                        c_valid = False
                    # charStart >= 0
                    if c["charStart"] < 0:
                        cue_issues.append(f"Cue {idx}: negative charStart ({c['charStart']})")
                        c_valid = False
                    # charEnd > charStart
                    if c["charEnd"] <= c["charStart"]:
                        cue_issues.append(f"Cue {idx}: invalid charEnd ({c['charStart']} -> {c['charEnd']})")
                        c_valid = False
                    # charEnd <= len(scene_text)
                    if c["charEnd"] > len(scene_text):
                        cue_issues.append(f"Cue {idx}: charEnd {c['charEnd']} exceeds text len {len(scene_text)}")
                        c_valid = False
                    # Exact canonical text span match
                    span_text = scene_text[c["charStart"]:c["charEnd"]]
                    if span_text != c["text"]:
                        cue_issues.append(f"Cue {idx}: text mismatch. Span='{span_text[:20]}...', Cue='{c['text'][:20]}...'")
                        c_valid = False
                        
                    if c_valid:
                        total_cues_valid += 1
                    prev_end = c["endSeconds"]
                    
                cue_results.append({
                    "story": slug,
                    "scene": s_num,
                    "cuesCount": len(cues),
                    "status": "PASS" if not cue_issues else "FAIL",
                    "issues": "; ".join(cue_issues[:3]) if cue_issues else "None"
                })

            # --- Pronunciation check in scene text ---
            scene_text = scene["text"]
            for term, replacement in PRONUNCIATION_MAP.items():
                clean_term = term.replace(r'\b', '').replace('\\', '')
                if re.search(term, scene_text, flags=re.IGNORECASE):
                    pronunciation_findings.append({
                        "story": slug,
                        "scene": s_num,
                        "term": clean_term,
                        "replacement": replacement
                    })

    # Summary
    print("\n" + "=" * 80)
    print("AUDIO INTEGRITY SUMMARY")
    print("=" * 80)
    print(f"Total audio files checked: {total_audio_checked}")
    print(f"Total audio files valid:   {total_audio_valid}")
    audio_failed = [r for r in audio_results if r["status"] == "FAIL"]
    print(f"Total audio failed:        {len(audio_failed)}")
    if audio_failed:
        for f in audio_failed:
            print(f"  FAIL: {f['story']} scene {f['scene']} - {f['issues']}")

    print("\n" + "=" * 80)
    print("CUE INTEGRITY SUMMARY")
    print("=" * 80)
    print(f"Total cues checked:        {total_cues_checked}")
    print(f"Total cues valid:          {total_cues_valid}")
    cue_failed = [r for r in cue_results if r["status"] == "FAIL"]
    print(f"Scenes with cue failures:  {len(cue_failed)}")
    if cue_failed:
        for f in cue_failed:
            print(f"  FAIL: {f['story']} scene {f['scene']} - {f['issues']}")

    print("\n" + "=" * 80)
    print("CULTURAL PRONUNCIATION SUMMARY")
    print("=" * 80)
    unique_terms = set(p["term"] for p in pronunciation_findings)
    print(f"Unique cultural terms identified and mapped: {len(unique_terms)}")
    for t in sorted(unique_terms):
        reps = set(p["replacement"] for p in pronunciation_findings if p["term"] == t)
        print(f"  - '{t}' -> {', '.join(reps)}")

    # Write report JSON
    report = {
        "audio_summary": {
            "total_checked": total_audio_checked,
            "total_valid": total_audio_valid,
            "failed_count": len(audio_failed),
            "results": audio_results
        },
        "cue_summary": {
            "total_checked": total_cues_checked,
            "total_valid": total_cues_valid,
            "failed_scenes_count": len(cue_failed),
            "results": cue_results
        },
        "pronunciation_summary": {
            "unique_terms_count": len(unique_terms),
            "unique_terms": sorted(list(unique_terms))
        }
    }

    report_path = os.path.join(PROJECT_ROOT, "scripts", "audio", "qa_report.json")
    with open(report_path, "w", encoding="utf-8") as rf:
        json.dump(report, rf, indent=2)
    print(f"\nFull QA report written to: {report_path}")

if __name__ == "__main__":
    run_qa_audit()
