import os
import re
import json
import soundfile as sf
import numpy as np

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def extract_sentence_spans(text: str):
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
                while i < n and text[i] in '.!?"\'”’)':
                    i += 1
                if i >= n or text[i].isspace():
                    break
            elif c == '\n':
                if i + 1 < n and text[i+1] == '\n':
                    break
                if i > start and text[i-1] in '.,!?;:"\'”’':
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
        return []
        
    # 20ms frames
    frame_sec = 0.02
    frame_len = int(sr * frame_sec)
    frames = [np.sqrt(np.mean(audio[i:i+frame_len]**2)) for i in range(0, len(audio), frame_len)]
    frames = np.array(frames)
    
    threshold = max(np.percentile(frames, 5) * 3.5, 0.005)
    
    # Collect candidate pauses
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
                if mid > 0.8 and mid < total_duration - 0.8 and dur >= 0.15:
                    pauses.append({'start': s_start * frame_sec, 'end': s_end * frame_sec, 'dur': dur, 'mid': mid})
                in_silence = False
                
    # If not enough long pauses, add local minima
    selected_times = []
    prev_t = 0.5
    for k in range(num_boundaries):
        exp_t = expected_times[k]
        # Search window around expected time [prev_t + 0.5, total_duration - (num_boundaries - k) * 0.5]
        min_allowed = prev_t + 0.8
        max_allowed = total_duration - (num_boundaries - k) * 0.8
        
        # Filter candidate pauses within reasonable window
        window_pauses = [p for p in pauses if min_allowed <= p['mid'] <= max_allowed]
        
        if window_pauses:
            # Score pauses by: proximity to expected_t + bonus for duration
            def pause_score(p):
                dist = abs(p['mid'] - exp_t)
                dur_bonus = min(p['dur'], 0.8) * 4.0
                return -dist + dur_bonus
                
            best_pause = max(window_pauses, key=pause_score)
            boundary_t = best_pause['mid']
        else:
            # Fallback to minimum energy frame in window
            start_f = int(min_allowed / frame_sec)
            end_f = int(max_allowed / frame_sec)
            if end_f > start_f:
                min_idx = start_f + int(np.argmin(frames[start_f:end_f]))
                boundary_t = min_idx * frame_sec
            else:
                boundary_t = (min_allowed + max_allowed) / 2.0
                
        selected_times.append(boundary_t)
        prev_t = boundary_t
        
    return selected_times, total_duration

def generate_scene_cues(canonical_text: str, audio_path: str):
    spans = extract_sentence_spans(canonical_text)
    n = len(spans)
    if n == 0:
        return []
        
    total_chars = sum(len(s[2]) for s in spans)
    cum_chars = 0
    expected_times = []
    
    audio, sr = sf.read(audio_path)
    total_duration = len(audio) / sr
    
    for start, end, sent in spans[:-1]:
        cum_chars += len(sent)
        expected_times.append(total_duration * (cum_chars / total_chars))
        
    boundaries, _ = detect_audio_boundaries(audio_path, n - 1, expected_times)
    
    all_times = [0.0] + [round(t, 2) for t in boundaries] + [round(total_duration, 2)]
    
    cues = []
    for i in range(n):
        cues.append({
            "index": i,
            "startSeconds": all_times[i],
            "endSeconds": all_times[i + 1],
            "text": spans[i][2],
            "charStart": spans[i][0],
            "charEnd": spans[i][1],
        })
    return cues

# Test on griot-baobab scene 1
text1 = "The calabash of the kora was smoothed by seventy years of palm oil and warm hands. With his thumbs and index fingers, Jali Alieu plucked the nyanyero strings. A crystalline chord drifted upward into the dense boughs of the baobab tree, where storks rested after a long flight from the river."
path1 = os.path.join(PROJECT_ROOT, "public/audio/stories/the-griot-under-the-baobab/scene-01-narration.mp3")
cues1 = generate_scene_cues(text1, path1)
print(json.dumps(cues1, indent=2))
