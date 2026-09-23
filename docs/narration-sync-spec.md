# Future Narration Synchronization Architecture Specification
## Tales of The Gambia

## 1. Overview & Rationale

In Phase 8 and Phase 9, *Tales of The Gambia* established a robust, provider-agnostic audio narration engine. Audio is synchronized at the **scene level**, ensuring that each scene corresponds directly to high-quality narration assets (e.g., Kokoro-generated audio files in `public/audio/narration/`).

A deliberate architectural decision in Phase 9 was to **avoid fake, synthetic, or timer-interpolated word highlighting**:
1. **Uncanny Valley / Cognitive Friction**: Uniform division of scene duration across words ignores natural human prosody, breath pauses, dramatic storytelling pacing, and emotional cadences essential to Gambian oral traditions.
2. **Reading Disruption**: Unsynchronized or mismatched highlighting distracts readers rather than assisting them, pulling focus away from comprehension and immersion.
3. **Preservation of Core Text Usability**: Users must retain full native control to select, copy, and highlight text without conflict from synthetic DOM manipulation.

When exact, phoneme- or word-level alignment timestamps are produced by real audio alignment pipelines, the architecture is designed to support them cleanly and non-destructively.

---

## 2. Data Contract: `NarrationCue` & `SceneAudio`

The word/segment-level synchronization schema extends `types/story.ts` in a backward-compatible manner.

### TypeScript Interfaces

```typescript
/**
 * A single timestamped word or segment in a narration track.
 */
export interface NarrationCue {
  /** 0-indexed cue position within the scene */
  index: number;
  /** Precise start offset in seconds relative to the scene narration audio */
  startSeconds: number;
  /** Precise end offset in seconds relative to the scene narration audio */
  endSeconds: number;
  /** The clean orthographic word or phrase matching the spoken audio */
  text: string;
  /** Optional character offset range into the scene text for fast DOM mapping */
  charStart?: number;
  charEnd?: number;
  /** Optional speaker tag for dialogues within the scene */
  speaker?: string;
}

/**
 * Extended SceneAudio interface supporting optional alignment cues
 */
export interface SceneAudio {
  narrationUrl?: string;
  narrationDurationSeconds?: number;
  ambienceUrl?: string;
  ambienceType?: string;
  /** Optional array of word/phrase cues ordered chronologically */
  cues?: NarrationCue[];
  /** URI to external WebVTT / JSON alignment track */
  cueTrackUrl?: string;
}
```

### Example JSON Payload (Scene 1: `the-clever-hare-and-the-great-drought`)

```json
{
  "sceneNumber": 1,
  "audio": {
    "narrationUrl": "/audio/narration/clever-hare-scene-1.mp3",
    "narrationDurationSeconds": 48.01,
    "cues": [
      { "index": 0, "startSeconds": 0.35, "endSeconds": 0.58, "text": "The", "charStart": 0, "charEnd": 3 },
      { "index": 1, "startSeconds": 0.60, "endSeconds": 1.15, "text": "sun", "charStart": 4, "charEnd": 7 },
      { "index": 2, "startSeconds": 1.18, "endSeconds": 1.48, "text": "hung", "charStart": 8, "charEnd": 12 },
      { "index": 3, "startSeconds": 1.50, "endSeconds": 1.95, "text": "merciless", "charStart": 13, "charEnd": 22 },
      { "index": 4, "startSeconds": 1.98, "endSeconds": 2.15, "text": "over", "charStart": 23, "charEnd": 27 },
      { "index": 5, "startSeconds": 2.18, "endSeconds": 2.38, "text": "the", "charStart": 28, "charEnd": 31 },
      { "index": 6, "startSeconds": 2.40, "endSeconds": 3.02, "text": "savanna.", "charStart": 32, "charEnd": 40 }
    ]
  }
}
```

---

## 3. Production Pipelines for Alignment Data

Cues must be derived from verified audio-to-text alignment, not estimated in the browser. Recommended open-source pipelines:

### 1. WhisperX (Forced Alignment via Wav2Vec2)
- **Mechanism**: Runs phoneme-level forced alignment on Whisper transcriptions against canonical story text.
- **Accuracy**: Sub-10ms precision per word.
- **Command**:
  ```bash
  whisperx scene-1.mp3 --model large-v2 --align_model WAV2VEC2_ASR_LARGE_LV60K_960H
  ```

### 2. Aeneas (Forced Alignment Engine)
- **Mechanism**: Dynamic time warping matching text fragments or word lists with synthesized audio or TTS phonetic streams.
- **Suitability**: Specifically engineered for audiobooks and synchronizing e-books (EPUB3 Media Overlays).

### 3. Gentle (Kaldi-based forced aligner)
- **Mechanism**: Robust phone-level alignment using Kaldi language and acoustic models.

### 4. TTS Model Word-Boundary Callbacks
- Certain TTS engines (e.g. Kokoro with token duration extraction, edge-tts, or Bark alignments) yield duration tokens per phoneme or word directly during generation.

---

## 4. Non-Destructive UI Integration Strategy

When `activeScene.audio.cues` is present:

1. **Binary Search Lookup**:
   Given `storyAudio.currentTime`, an efficient binary search (`O(log n)`) finds the currently active cue:
   ```typescript
   function findActiveCueIndex(cues: NarrationCue[], time: number): number {
     let low = 0, high = cues.length - 1;
     while (low <= high) {
       const mid = (low + high) >> 1;
       if (time >= cues[mid].startSeconds && time <= cues[mid].endSeconds) return mid;
       if (time < cues[mid].startSeconds) high = mid - 1;
       else low = mid + 1;
     }
     return -1;
   }
   ```

2. **Styling & Interaction Safety**:
   - The active word is wrapped in `<span className="narration-word narration-active">...</span>`.
   - The CSS style uses a soft tint (e.g., `text-[#F2C765] bg-[#E0AB3A]/15 rounded px-0.5 transition-colors duration-150`).
   - Native user selection remains intact: DOM ranges can span across spans without breaking copying or selection.
   - If cues are missing or empty, the component falls back directly to the standard paragraph view with zero layout shifts.

3. **Fallback & Degradation**:
   - If audio plays with no cues (Phase 8 & 9 state), the restrained scene-level indicator (`Narrating Scene X`) serves as the single source of truth.
   - Text selection and reading ergonomics remain completely unobstructed.
