# Audio Asset Licenses — Tales of The Gambia

All audio assets used in Tales of The Gambia are documented below.
This file is the canonical record for legal and attribution purposes.

---

## Narration Assets

| File | Story | Scene | Provider | License |
|------|-------|-------|----------|---------|
| `public/audio/stories/the-clever-hare-and-the-great-drought/narration/scene-01.mp3` | The Clever Hare and the Great Drought | 1 | Kokoro TTS (kokoro-v0_19, voice: af_sarah) | CC0 — generated from original in-house text |
| `public/audio/stories/the-clever-hare-and-the-great-drought/narration/scene-02.mp3` | The Clever Hare and the Great Drought | 2 | Kokoro TTS | CC0 |
| `public/audio/stories/the-clever-hare-and-the-great-drought/narration/scene-03.mp3` | The Clever Hare and the Great Drought | 3 | Kokoro TTS | CC0 |
| `public/audio/stories/the-clever-hare-and-the-great-drought/narration/scene-04.mp3` | The Clever Hare and the Great Drought | 4 | Kokoro TTS | CC0 |
| `public/audio/stories/the-clever-hare-and-the-great-drought/narration/scene-05.mp3` | The Clever Hare and the Great Drought | 5 | Kokoro TTS | CC0 |
| `public/audio/stories/the-clever-hare-and-the-great-drought/narration/scene-06.mp3` | The Clever Hare and the Great Drought | 6 | Kokoro TTS | CC0 |
| `public/audio/stories/the-whispering-waters-of-ninki-nanka/narration/scene-01.mp3` | The Whispering Waters of Ninki Nanka | 1 | Kokoro TTS | CC0 |
| `public/audio/stories/the-whispering-waters-of-ninki-nanka/narration/scene-02.mp3` | The Whispering Waters of Ninki Nanka | 2 | Kokoro TTS | CC0 |
| `public/audio/stories/the-whispering-waters-of-ninki-nanka/narration/scene-03.mp3` | The Whispering Waters of Ninki Nanka | 3 | Kokoro TTS | CC0 |

**Narration generation details:**
- Model: `kokoro-v0_19`
- Voice: `af_sarah`
- TTS library: [Kokoro](https://github.com/hexgrad/kokoro) (Apache 2.0)
- Generation date: September 2026
- Text: Original story text by Tales of The Gambia editorial team

---

## Ambience Assets

All ambience tracks were **procedurally synthesised** using Python DSP (`numpy` + `soundfile`).
They are **not** recordings of third-party audio; they are original works created exclusively
for Tales of The Gambia using mathematical waveform generation.

**Creator:** Tales of The Gambia Audio Synthesis Lab  
**Method:** `scripts/audio/generate_ambience.py` — deterministic DSP pipeline  
**License:** [CC0 1.0 Universal — Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/)

> These files are dedicated to the public domain. No attribution is required.
> You can copy, modify, distribute and perform the work, even for commercial purposes,
> all without asking permission.

### The Clever Hare and the Great Drought

| File | Environment Label | Duration | Loop |
|------|------------------|----------|------|
| `public/audio/stories/the-clever-hare-and-the-great-drought/ambience/scene-01.mp3` | Harmattan wind, dry earth | 16 s | yes |
| `public/audio/stories/the-clever-hare-and-the-great-drought/ambience/scene-02.mp3` | Council murmurs, rustling trees | 16 s | yes |
| `public/audio/stories/the-clever-hare-and-the-great-drought/ambience/scene-03.mp3` | Digging earth, stone and clay | 16 s | yes |
| `public/audio/stories/the-clever-hare-and-the-great-drought/ambience/scene-04.mp3` | Tense heat, distant thunder | 16 s | yes |
| `public/audio/stories/the-clever-hare-and-the-great-drought/ambience/scene-05.mp3` | Living water, flowing stream | 16 s | yes |
| `public/audio/stories/the-clever-hare-and-the-great-drought/ambience/scene-06.mp3` | Night cicadas, cool breeze | 16 s | yes |

### The Whispering Waters of Ninki Nanka

| File | Environment Label | Duration | Loop |
|------|------------------|----------|------|
| `public/audio/stories/the-whispering-waters-of-ninki-nanka/ambience/scene-01.mp3` | Mangrove bolong at dawn | 16 s | yes |
| `public/audio/stories/the-whispering-waters-of-ninki-nanka/ambience/scene-02.mp3` | Deep water, slow swell | 16 s | yes |
| `public/audio/stories/the-whispering-waters-of-ninki-nanka/ambience/scene-03.mp3` | Moonlit sanctuary, night frogs | 16 s | yes |

---

## Manifest Reference

Machine-readable records including SHA-256 hashes are maintained in
[`data/audio/ambience-manifest.json`](../data/audio/ambience-manifest.json).

---

## Policy

- **No copyrighted audio** will be included in this project without explicit written license.
- **CC-BY-NC** and similar non-commercial-only licenses are **not acceptable**.
- **CC0** and **Apache 2.0** are the preferred licenses for all audio assets.
- All new audio assets **must** be documented in this file before merging.
