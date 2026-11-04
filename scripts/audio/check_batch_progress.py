import os
from multi_narrator_generator import STORY_CONFIGS

PROJECT_ROOT = "."

foday_needed = [s for s, c in STORY_CONFIGS.items() if c["existing_voice"] == "af_heart"]
amara_needed = [s for s, c in STORY_CONFIGS.items() if c["existing_voice"] == "am_michael"]

foday_done = 0
foday_total = 0
for s in foday_needed:
    cfg = STORY_CONFIGS[s]
    # Check scenes
    sdir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", s)
    cdir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cfg["cue_folder"])
    for i in range(1, 10):
        afile = os.path.join(sdir, f"scene-{i:02d}-foday.mp3")
        cfile = os.path.join(cdir, f"scene-{i:02d}-foday.json")
        if os.path.exists(afile) and os.path.exists(cfile):
            foday_done += 1
        elif os.path.exists(os.path.join(sdir, f"scene-{i:02d}-narration.mp3")):
            foday_total += 1
foday_total += foday_done

amara_done = 0
amara_total = 0
for s in amara_needed:
    cfg = STORY_CONFIGS[s]
    sdir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", s)
    cdir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cfg["cue_folder"])
    for i in range(1, 10):
        afile = os.path.join(sdir, f"scene-{i:02d}-amara.mp3")
        cfile = os.path.join(cdir, f"scene-{i:02d}-amara.json")
        if os.path.exists(afile) and os.path.exists(cfile):
            amara_done += 1
        elif os.path.exists(os.path.join(sdir, f"scene-{i:02d}-narration.mp3")):
            amara_total += 1
amara_total += amara_done

print(f"Foday scenes: {foday_done}/{foday_total} done ({foday_done/foday_total*100:.1f}%)" if foday_total else "Foday: 0")
print(f"Amara scenes: {amara_done}/{amara_total} done ({amara_done/amara_total*100:.1f}%)" if amara_total else "Amara: 0")
print(f"Total multi-narrator scenes: {foday_done + amara_done}/{foday_total + amara_total} ({(foday_done + amara_done)/(foday_total + amara_total)*100:.1f}%)" if (foday_total + amara_total) else "Total: 0")
