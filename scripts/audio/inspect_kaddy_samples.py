import soundfile as sf
import json

samples = [
    ('Animal Fable', 'the-clever-hare-and-the-great-drought', 1, 'public/audio/stories/the-clever-hare-and-the-great-drought/scene-01-kaddy.mp3', 'data/audio/cues/hare-drought/scene-01-kaddy.json'),
    ('Trickster Tale', 'the-spider-and-the-pot-of-wisdom', 1, 'public/audio/stories/the-spider-and-the-pot-of-wisdom/scene-01-kaddy.mp3', 'data/audio/cues/spider-wisdom/scene-01-kaddy.json'),
    ('Historical Epic', 'kelefa-saane', 1, 'public/audio/stories/kelefa-saane/scene-01-kaddy.mp3', 'data/audio/cues/kelefa-saane/scene-01-kaddy.json'),
    ('Myth & Legend', 'why-the-baobab-grows-upside-down', 1, 'public/audio/stories/why-the-baobab-grows-upside-down/scene-01-kaddy.mp3', 'data/audio/cues/baobab-upside-down/scene-01-kaddy.json'),
    ('Bedtime / Original', 'the-little-pangolin-who-counted-stars', 1, 'public/audio/stories/the-little-pangolin-who-counted-stars/scene-01-kaddy.mp3', 'data/audio/cues/little-pangolin/scene-01-kaddy.json'),
]

for category, slug, scene_num, audio_p, cue_p in samples:
    data, sr = sf.read(audio_p)
    dur = len(data) / sr
    with open(cue_p, 'r', encoding='utf-8') as f:
        cues = json.load(f)
    print(f"=== Category: {category} ({slug} S{scene_num}) ===")
    print(f"Audio: dur={dur:.2f}s, sr={sr}Hz, cues={len(cues)}")
    print(f"First cue: {cues[0]['startSeconds']}s -> {cues[0]['endSeconds']}s: {cues[0]['text']}")
    print(f"Last cue:  {cues[-1]['startSeconds']}s -> {cues[-1]['endSeconds']}s: {cues[-1]['text']}")
    print()
