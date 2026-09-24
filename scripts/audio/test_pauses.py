import soundfile as sf
import numpy as np

import os
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
audio_path = os.path.join(PROJECT_ROOT, 'public/audio/stories/the-griot-under-the-baobab/scene-01-narration.mp3')
audio, sr = sf.read(audio_path)
duration = len(audio) / sr

frame_len = int(sr * 0.02)
frames = [np.sqrt(np.mean(audio[i:i+frame_len]**2)) for i in range(0, len(audio), frame_len)]
frames = np.array(frames)
threshold = max(np.percentile(frames, 5) * 3.5, 0.005)

silences = []
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
            dur = (s_end - s_start) * 0.02
            mid = (s_start + s_end) * 0.01
            if mid > 1.0 and mid < duration - 1.0 and dur >= 0.2:
                silences.append({'start': s_start * 0.02, 'end': s_end * 0.02, 'dur': dur, 'mid': mid})
            in_silence = False

print(f"Total candidate pauses: {len(silences)}")
for s in sorted(silences, key=lambda x: x['dur'], reverse=True):
    print(f"  Pause dur={s['dur']:.2f}s at mid={s['mid']:.2f}s ({s['start']:.2f} - {s['end']:.2f})")
