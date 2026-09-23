# Tales of The Gambia — Ambience Audio System

This document describes the environmental ambience layer added in Phase 10.

---

## Overview

The ambience system layers subtle environmental audio **underneath** the story narrator.
It is designed to feel cinematic and contextual — not like generic background music.

The architecture follows these principles:

- Narration is always the primary audio signal (100% of user-selected volume)
- Ambience plays at 10–25% relative volume (`ambienceVolume` default: 0.2)
- Ambience **loops seamlessly** per scene
- Ambience **crossfades** between scenes (800 ms)
- Ambience can be toggled on/off at any time by the user (setting is persisted)
- Stories without ambience data simply get no ambience — no errors, no fallback noise

---

## Dual-Element Architecture

`hooks/useStoryAudio.ts` creates **two** `HTMLAudioElement`s on mount — one for narration,
one for ambience. Both are created once and reused across scene changes; only their `src` is
swapped.

```
narrationRef  →  narration/<scene>.mp3   (volume = narrationVolume, no loop)
ambienceRef   →  ambience/<scene>.mp3    (volume = ambienceVolume,  loop = true)
```

The elements are destroyed (and their sources released) when the hook unmounts.

---

## Scene Transitions (Crossfade)

When `ambienceSrc` changes (e.g. the user advances to the next scene):

1. If the ambience element is **currently playing**, fade its volume to 0 over **800 ms**,
   then pause it, swap the src, and fade back in to `ambienceVolume` over **800 ms**.
2. If the ambience element is **paused** (narration not yet started), simply update the src
   silently — no crossfade needed.

This creates a natural environmental continuity rather than a hard cut.

---

## Volume Model

| Signal | Default | Range | Control |
|--------|---------|-------|---------|
| Narration | 0.8 (80%) | 0–1 | `narrationVolume` slider |
| Ambience  | 0.2 (20%) | 0–1 | `ambienceVolume` slider |

Both settings are persisted to `localStorage` via `lib/storyStorage.ts`.

The ambience slider is **disabled** (greyed out, cursor: not-allowed) when ambience is toggled off.

---

## Ambience Toggle

The user can enable/disable ambience at any time using:

- **Normal Reader**: The clickable pill in the `AudioNarrationBar` status row (shows the scene
  environment label, e.g. "Harmattan wind, dry earth"; click to toggle off / back on)
- **Cinematic Mode**: The `Wind` icon button in `StoryPlaybackControls` right-side controls

Toggle state is persisted to `localStorage` as `ambienceEnabled` inside the `audioSettings` object.

**Enable behaviour:** If narration is currently playing when the user re-enables ambience,
ambience fades in from 0 to `ambienceVolume` over 600 ms.

**Disable behaviour:** Ambience fades out over 400 ms and pauses. The src is not cleared,
so re-enabling resumes from the correct position.

---

## File Naming Convention

```
public/audio/stories/<story-slug>/ambience/scene-<NN>.mp3
```

Where `<NN>` is a zero-padded scene number (01, 02, …).

### Story slugs in use

| Story | Slug |
|-------|------|
| The Clever Hare and the Great Drought | `the-clever-hare-and-the-great-drought` |
| The Whispering Waters of Ninki Nanka | `the-whispering-waters-of-ninki-nanka` |

---

## Story Data Schema

Ambience is configured per-scene in `data/stories/adapted/<story-file>.ts`:

```ts
audio: {
  narrationUrl: "/audio/stories/<slug>/narration/scene-01.mp3",
  narrationDurationSeconds: 42,
  ambienceUrl: "/audio/stories/<slug>/ambience/scene-01.mp3",
  ambienceLoop: true,
},
ambience: {
  label: "Harmattan wind, dry earth",
},
```

The `ambience.label` field is used in the UI to describe the soundscape to the user.

---

## Fallback Behaviour

- If `ambienceUrl` is absent or undefined → no ambience element plays for that scene, silently.
- If the ambience file returns a network error → the `HTMLAudioElement` emits an error event,
  which is not surfaced to the user (ambience errors are non-critical).
- Stories with no ambience data at all → no UI changes; the ambience toggle does not appear.

---

## Adding Ambience for a New Story

1. Generate MP3 files using `scripts/audio/generate_ambience.py` (or provide real recordings
   with a documented CC0/Apache-2.0 license).
2. Place files at `public/audio/stories/<story-slug>/ambience/scene-<NN>.mp3`.
3. Add entries to `data/audio/ambience-manifest.json`.
4. Update `docs/audio-licenses.md` with file paths and license details.
5. Edit the story data file: for each `SceneAudio` object add `ambienceUrl` and `ambienceLoop: true`.
6. Add `ambience: { label: "..." }` to each `Scene` object (visible in UI).
7. Run `npm run typecheck` and `npm run build` to verify.

---

## Asset Generation Pipeline

All current ambience assets are **procedurally synthesised** via Python DSP.
See `scripts/audio/generate_ambience.py` for the full pipeline.

Dependencies: `numpy`, `soundfile` (both CC0-compatible; no ffmpeg required).

The script generates 16-second seamlessly looping 24 kHz mono MP3 files.
Run time: ~5 seconds for all 9 tracks.

Machine-readable manifests with SHA-256 hashes: `data/audio/ambience-manifest.json`.
