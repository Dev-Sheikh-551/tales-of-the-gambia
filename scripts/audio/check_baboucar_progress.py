import os
from multi_narrator_generator import STORY_CONFIGS

PROJECT_ROOT = "."

baboucar_done = 0
baboucar_total = 133

stories_done = 0
stories_in_progress = 0

for slug, cfg in STORY_CONFIGS.items():
    sdir = os.path.join(PROJECT_ROOT, "public", "audio", "stories", slug)
    cdir = os.path.join(PROJECT_ROOT, "data", "audio", "cues", cfg["cue_folder"])
    story_scenes = 0
    story_done = 0
    for i in range(1, 15):
        orig = os.path.join(sdir, f"scene-{i:02d}-narration.mp3")
        if not os.path.exists(orig):
            break
        story_scenes += 1
        afile = os.path.join(sdir, f"scene-{i:02d}-baboucar.mp3")
        cfile = os.path.join(cdir, f"scene-{i:02d}-baboucar.json")
        if os.path.exists(afile) and os.path.exists(cfile):
            story_done += 1
            baboucar_done += 1
    if story_done == story_scenes and story_scenes > 0:
        stories_done += 1
    elif story_done > 0:
        stories_in_progress += 1

print(f"Elder Baboucar scenes: {baboucar_done}/{baboucar_total} done ({baboucar_done/baboucar_total*100:.1f}%)")
print(f"Stories fully completed: {stories_done}/29 (in progress: {stories_in_progress})")
