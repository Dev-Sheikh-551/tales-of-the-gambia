"""
Tales of The Gambia — Environmental Ambience Audio Generation Pipeline
Synthesizes lightweight, web-optimized, organic, seamless-looping MP3 environmental
ambience tracks for pilot stories and creates a machine-readable manifest.

All generated soundscapes are dedicated to the Public Domain (CC0 1.0 Universal).
"""

import os
import sys
import json
import hashlib
import numpy as np
import soundfile as sf
from datetime import datetime, timezone

SAMPLE_RATE = 24000  # 24kHz matches Kokoro narration assets and is highly web-optimized
DURATION_SEC = 16.0   # 16 seconds is optimal for seamless environmental looping

def make_seamless_loop(audio: np.ndarray, fade_len: int) -> np.ndarray:
    """Equal-power crossfade between the end and beginning of the audio track."""
    fade_in = np.sin(np.linspace(0, np.pi / 2, fade_len))
    fade_out = np.cos(np.linspace(0, np.pi / 2, fade_len))
    
    body_len = len(audio) - fade_len
    result = audio[:body_len].copy()
    
    # Overlap tail into head
    tail = audio[body_len:body_len + fade_len]
    head = result[:fade_len]
    result[:fade_len] = head * fade_in + tail * fade_out
    
    return result

def lowpass_filter(data: np.ndarray, cutoff_hz: float, sr: int = SAMPLE_RATE) -> np.ndarray:
    """Simple frequency-domain lowpass filter with soft roll-off."""
    fft = np.fft.rfft(data)
    freqs = np.fft.rfftfreq(len(data), 1.0 / sr)
    response = 1.0 / (1.0 + (freqs / max(cutoff_hz, 1.0)) ** 4)
    return np.fft.irfft(fft * response, n=len(data))

def bandpass_filter(data: np.ndarray, low_hz: float, high_hz: float, sr: int = SAMPLE_RATE) -> np.ndarray:
    """Frequency-domain bandpass filter with smooth shoulders."""
    fft = np.fft.rfft(data)
    freqs = np.fft.rfftfreq(len(data), 1.0 / sr)
    center = (low_hz + high_hz) / 2.0
    width = (high_hz - low_hz) / 2.0
    response = np.exp(-0.5 * ((freqs - center) / max(width, 10.0)) ** 2)
    return np.fft.irfft(fft * response, n=len(data))

# ── Ambient Generators ─────────────────────────────────────────────────────────

def generate_savanna_wind(duration: float, sr: int) -> np.ndarray:
    """Dry harmattan wind whispering through savanna grasses."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    # Base pink-ish noise
    white = np.random.normal(0, 0.5, total_samples)
    pink = lowpass_filter(white, 600, sr)
    
    # Slow undulating gusts (0.15Hz and 0.08Hz)
    gusts = 0.55 + 0.35 * np.sin(2 * np.pi * 0.15 * t) + 0.1 * np.sin(2 * np.pi * 0.07 * t + 1.2)
    
    # High grass rustle texture (bandpass 800-1800Hz with fast modulation)
    grass_noise = bandpass_filter(white, 900, 1600, sr)
    grass_flutter = 0.5 + 0.5 * np.sin(2 * np.pi * 1.8 * t)
    
    combined = (pink * gusts * 0.75) + (grass_noise * grass_flutter * 0.25)
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    
    # Normalize to subtle volume level
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.4
    return looped.astype(np.float32)

def generate_council_murmurs(duration: float, sr: int) -> np.ndarray:
    """Subtle animal gathering and warm outdoor air under the silk cotton tree."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.4, total_samples)
    air = lowpass_filter(white, 450, sr)
    
    # Low resonant breathing/murmur texture
    rumble = bandpass_filter(white, 140, 320, sr)
    rumble_mod = 0.5 + 0.4 * np.sin(2 * np.pi * 0.3 * t) + 0.1 * np.cos(2 * np.pi * 0.7 * t)
    
    # Distant subtle leaf rustle
    foliage = bandpass_filter(white, 1200, 2400, sr) * (0.3 + 0.3 * np.sin(2 * np.pi * 0.9 * t))
    
    combined = (air * 0.5) + (rumble * rumble_mod * 0.35) + (foliage * 0.15)
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.35
    return looped.astype(np.float32)

def generate_digging_earth(duration: float, sr: int) -> np.ndarray:
    """Rhythmic, muted scraping and rustling of dry riverbed silt."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.4, total_samples)
    wind_bed = lowpass_filter(white, 400, sr) * 0.5
    
    # Rhythmic earthy scrape / digging texture at ~0.8 Hz
    scrape_band = bandpass_filter(white, 600, 1800, sr)
    rhythm = np.maximum(0, np.sin(2 * np.pi * 0.8 * t)) ** 3
    rhythm_sub = np.maximum(0, np.sin(2 * np.pi * 0.8 * t + 0.4)) ** 4 * 0.5
    
    scrapes = scrape_band * (rhythm + rhythm_sub) * 0.4
    
    combined = wind_bed + scrapes
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.35
    return looped.astype(np.float32)

def generate_tense_heat(duration: float, sr: int) -> np.ndarray:
    """Dry shimmering afternoon heat waves and tense silence."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.3, total_samples)
    
    # Ultra-quiet warm air drone
    deep_air = lowpass_filter(white, 280, sr)
    
    # Subtle thermal shimmering overtone
    shimmer = bandpass_filter(white, 2200, 3600, sr) * (0.4 + 0.3 * np.sin(2 * np.pi * 0.2 * t))
    
    combined = (deep_air * 0.7) + (shimmer * 0.25)
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.3
    return looped.astype(np.float32)

def generate_living_water(duration: float, sr: int) -> np.ndarray:
    """Living freshwater spring bubbling and trickling over clean sand."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.45, total_samples)
    
    # Gurgling water base (bandpass 250 - 900 Hz)
    gurgle = bandpass_filter(white, 280, 850, sr)
    gurgle_mod = 0.6 + 0.3 * np.sin(2 * np.pi * 2.2 * t) + 0.2 * np.cos(2 * np.pi * 3.7 * t)
    
    # Fluid bubbling trickles (bandpass 1200 - 2800 Hz with fast fluid perturbation)
    trickle = bandpass_filter(white, 1200, 2600, sr)
    trickle_mod = 0.5 + 0.4 * np.sin(2 * np.pi * 5.1 * t + 0.8)
    
    # Smooth water body flow
    flow = lowpass_filter(white, 500, sr) * 0.4
    
    combined = (gurgle * gurgle_mod * 0.5) + (trickle * trickle_mod * 0.35) + flow
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.4
    return looped.astype(np.float32)

def generate_night_cicadas(duration: float, sr: int) -> np.ndarray:
    """Savanna night: gentle cicadas and crickets under a quiet canopy."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.3, total_samples)
    
    # Night breeze bed
    breeze = lowpass_filter(white, 400, sr) * 0.35
    
    # Cricket chirp pulses: narrow high-frequency band 4800 - 5600 Hz
    cricket_carrier = bandpass_filter(white, 4700, 5400, sr)
    pulse1 = np.maximum(0, np.sin(2 * np.pi * 12.0 * t)) ** 4 * (0.6 + 0.4 * np.sin(2 * np.pi * 0.4 * t))
    
    # Slower second insect species (3800 - 4300 Hz, 3.5 Hz pulse)
    cricket2_carrier = bandpass_filter(white, 3800, 4300, sr)
    pulse2 = np.maximum(0, np.sin(2 * np.pi * 3.5 * t + 1.5)) ** 6 * 0.5
    
    insects = (cricket_carrier * pulse1 * 0.35) + (cricket2_carrier * pulse2 * 0.25)
    
    combined = breeze + insects
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.35
    return looped.astype(np.float32)

def generate_mangrove_bolong(duration: float, sr: int) -> np.ndarray:
    """Mangrove bolong creek: gentle brackish water lapping and paddle motion."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.4, total_samples)
    
    # Soft water body lapping
    body = bandpass_filter(white, 180, 750, sr)
    swell = 0.5 + 0.4 * np.sin(2 * np.pi * 0.28 * t)
    
    # Rhythmic paddle dips (~0.45 Hz)
    lap = bandpass_filter(white, 700, 1900, sr)
    lap_pulse = np.maximum(0, np.sin(2 * np.pi * 0.45 * t)) ** 5 * 0.45
    
    # Distant wetland air
    air = lowpass_filter(white, 350, sr) * 0.3
    
    combined = (body * swell * 0.5) + (lap * lap_pulse) + air
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.38
    return looped.astype(np.float32)

def generate_deep_water_swell(duration: float, sr: int) -> np.ndarray:
    """Deep atmospheric river swell and low resonant water movement."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.4, total_samples)
    
    # Deep sub-bass river resonance (80 - 240 Hz)
    sub = bandpass_filter(white, 70, 220, sr)
    sub_surge = 0.5 + 0.4 * np.sin(2 * np.pi * 0.18 * t)
    
    # Middle water wash
    wash = bandpass_filter(white, 300, 1100, sr)
    wash_surge = 0.4 + 0.3 * np.sin(2 * np.pi * 0.36 * t + 0.9)
    
    combined = (sub * sub_surge * 0.6) + (wash * wash_surge * 0.4)
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.42
    return looped.astype(np.float32)

def generate_moonlit_sanctuary(duration: float, sr: int) -> np.ndarray:
    """Sanctuary restored: tranquil moonlit river, glassy surface, soft night air."""
    total_samples = int((duration + 2.0) * sr)
    t = np.linspace(0, (duration + 2.0), total_samples, endpoint=False)
    
    white = np.random.normal(0, 0.3, total_samples)
    
    # Glassy nocturnal water ripples
    water = bandpass_filter(white, 200, 800, sr) * (0.5 + 0.3 * np.sin(2 * np.pi * 0.22 * t))
    
    # Gentle night air
    air = lowpass_filter(white, 300, sr) * 0.4
    
    # Very subtle, distant peaceful reeds (4kHz insect shimmer)
    reeds = bandpass_filter(white, 3800, 4600, sr) * (0.2 + 0.2 * np.sin(2 * np.pi * 0.6 * t))
    
    combined = water + air + reeds
    fade_samples = int(2.0 * sr)
    looped = make_seamless_loop(combined, fade_samples)
    looped = looped / (np.max(np.abs(looped)) + 1e-6) * 0.32
    return looped.astype(np.float32)

# ── Manifest & Generation Registry ───────────────────────────────────────────

TRACKS_SPEC = [
    # Story 1: The Clever Hare and the Great Drought
    {
        "storySlug": "the-clever-hare-and-the-great-drought",
        "sceneNumber": 1,
        "filename": "scene-01.mp3",
        "environmentLabel": "Harmattan wind through dry grass",
        "generator": generate_savanna_wind,
        "description": "Dry savanna harmattan breeze whispering through parched grassland.",
    },
    {
        "storySlug": "the-clever-hare-and-the-great-drought",
        "sceneNumber": 2,
        "filename": "scene-02.mp3",
        "environmentLabel": "Murmurs of gathered savanna animals",
        "generator": generate_council_murmurs,
        "description": "Warm outdoor air and low ambient gathering under the silk cotton tree.",
    },
    {
        "storySlug": "the-clever-hare-and-the-great-drought",
        "sceneNumber": 3,
        "filename": "scene-03.mp3",
        "environmentLabel": "Harmattan dust and digging rhythm",
        "generator": generate_digging_earth,
        "description": "Dry riverbed silt friction and subtle rhythmic collective labor.",
    },
    {
        "storySlug": "the-clever-hare-and-the-great-drought",
        "sceneNumber": 4,
        "filename": "scene-04.mp3",
        "environmentLabel": "Dry wind whistling over the river bank",
        "generator": generate_tense_heat,
        "description": "Mid-afternoon shimmering heat waves and quiet tense savanna atmosphere.",
    },
    {
        "storySlug": "the-clever-hare-and-the-great-drought",
        "sceneNumber": 5,
        "filename": "scene-05.mp3",
        "environmentLabel": "Cool freshwater bubbling vigorously",
        "generator": generate_living_water,
        "description": "Living freshwater bubbling from the sand and splashing joyfully.",
    },
    {
        "storySlug": "the-clever-hare-and-the-great-drought",
        "sceneNumber": 6,
        "filename": "scene-06.mp3",
        "environmentLabel": "Quiet cicadas under the savanna night sky",
        "generator": generate_night_cicadas,
        "description": "Cool night breeze with delicate nocturnal cicadas under the stars.",
    },

    # Story 2: The Whispering Waters of Ninki Nanka
    {
        "storySlug": "the-whispering-waters-of-ninki-nanka",
        "sceneNumber": 1,
        "filename": "scene-01.mp3",
        "environmentLabel": "Rhythmic paddle and quiet ripples",
        "generator": generate_mangrove_bolong,
        "description": "Brackish bolong creek with rhythmic wooden paddle dips and gentle ripples.",
    },
    {
        "storySlug": "the-whispering-waters-of-ninki-nanka",
        "sceneNumber": 2,
        "filename": "scene-02.mp3",
        "environmentLabel": "Deep atmospheric water rumble",
        "generator": generate_deep_water_swell,
        "description": "Deep resonant river swell and undulating underwater movement.",
    },
    {
        "storySlug": "the-whispering-waters-of-ninki-nanka",
        "sceneNumber": 3,
        "filename": "scene-03.mp3",
        "environmentLabel": "Tranquil night waters lapping boat",
        "generator": generate_moonlit_sanctuary,
        "description": "Tranquil moonlit river returning to glass-like stillness and balance.",
    },
]

def main():
    root_dir = os.getcwd()
    manifest_entries = []

    print("=" * 70)
    print("GENERATING PHASE 10 ENVIRONMENTAL AMBIENCE TRACKS")
    print(f"Sample Rate: {SAMPLE_RATE} Hz | Target Duration: {DURATION_SEC} s")
    print("=" * 70)

    for spec in TRACKS_SPEC:
        slug = spec["storySlug"]
        snum = spec["sceneNumber"]
        fname = spec["filename"]
        out_dir = os.path.join(root_dir, "public", "audio", "stories", slug, "ambience")
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, fname)

        print(f"Synthesizing [{slug}] Scene {snum}: {spec['environmentLabel']}...")
        audio = spec["generator"](DURATION_SEC, SAMPLE_RATE)
        
        # Write MP3 directly via soundfile
        sf.write(out_path, audio, SAMPLE_RATE, format="MP3")
        
        file_size = os.path.getsize(out_path)
        actual_duration = len(audio) / float(SAMPLE_RATE)
        
        with open(out_path, "rb") as f:
            file_hash = hashlib.sha256(f.read()).hexdigest()[:16]

        print(f"  -> {fname} | {actual_duration:.2f}s | {file_size / 1024.0:.1f} KB | SHA: {file_hash}")

        manifest_entries.append({
            "storySlug": slug,
            "sceneNumber": snum,
            "filename": fname,
            "url": f"/audio/stories/{slug}/ambience/{fname}",
            "environmentLabel": spec["environmentLabel"],
            "description": spec["description"],
            "durationSeconds": round(actual_duration, 2),
            "sampleRate": SAMPLE_RATE,
            "format": "mp3",
            "channels": 1,
            "fileSizeBytes": file_size,
            "sha256": file_hash,
            "loop": True,
            "crossfadeDurationSeconds": 0.8,
            "license": "CC0-1.0",
            "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
            "creator": "Tales of The Gambia Audio Synthesis Lab",
            "attributionRequired": False
        })

    # Save manifest
    manifest_path = os.path.join(root_dir, "data", "audio", "ambience-manifest.json")
    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    
    manifest_doc = {
        "version": "1.0.0",
        "description": "Environmental Ambience Manifest for Tales of The Gambia",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "license": "CC0-1.0 (Public Domain)",
        "totalTracks": len(manifest_entries),
        "tracks": manifest_entries
    }

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_doc, f, indent=2)

    print(f"\nWrote manifest to {manifest_path}")
    print("Ambience audio generation complete!")

if __name__ == "__main__":
    main()
