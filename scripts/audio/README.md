# Audio Narration Generation Toolkit
## Tales of The Gambia

This directory contains the local, development-time text-to-speech (TTS) pipeline for generating scene-by-scene oral narration assets.

### Architecture & Isolation
- **No Browser Runtime**: This pipeline is strictly a local developer content-generation tool. Kokoro model weights, torch, and Python are never included in the Next.js bundle or loaded by client browsers.
- **Output Destination**: Output MP3 files are written directly to public/audio/stories/<story-slug>/scene-XX-narration.mp3.
- **Manifest**: Each story gets a manifest.json tracking generation voice, parameters, source text hash, and measured duration.

### Setup
Using uv:
`ash
uv venv .venv --python 3.12
uv pip install -r requirements.txt
`

### Tools
1. **Voice Testing**:
   `ash
   python test_voices.py
   `
   Generates short benchmark audio across candidate voices to evaluate warmth, clarity, and pacing.

2. **Narration Generator**:
   `ash
   python generate_narration.py --slug the-clever-hare-and-the-great-drought --voice <voice_id>
   python generate_narration.py --slug the-whispering-waters-of-ninki-nanka --voice <voice_id>
   `
