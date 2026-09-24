import sys, os
sys.path.insert(0, '.')
os.chdir(r'c:\Users\sheik\OneDrive\Desktop\building stuff\tales of the gambia')

from generate_narration import parse_scenes_from_ts

# Test backtick story (kelefa-saane)
scenes = parse_scenes_from_ts('data/stories/historical/kelefa-saane.ts')
print(f'kelefa-saane: {len(scenes)} scenes')
for s in scenes:
    num = s["sceneNumber"]
    title = s["title"]
    chars = len(s["text"])
    preview = s["text"][:50].strip().replace('\n', ' ')
    print(f'  Scene {num}: {title} ({chars} chars) preview: {repr(preview)}')

print()

# Test quoted story (griot-baobab)
scenes2 = parse_scenes_from_ts('data/stories/adapted/griot-baobab.ts')
print(f'griot-baobab: {len(scenes2)} scenes')
for s in scenes2:
    num = s["sceneNumber"]
    title = s["title"]
    chars = len(s["text"])
    print(f'  Scene {num}: {title} ({chars} chars)')

print()

# Test all 13 new stories
slugs = [
    ("data/stories/adapted/griot-baobab.ts", "griot-baobab"),
    ("data/stories/original/little-pangolin.ts", "little-pangolin"),
    ("data/stories/adapted/nightfall-janjanbureh.ts", "nightfall-janjanbureh"),
    ("data/stories/adapted/spider-wisdom.ts", "spider-wisdom"),
    ("data/stories/adapted/clever-hare-and-hyena.ts", "clever-hare-hyena"),
    ("data/stories/adapted/two-kumbas.ts", "two-kumbas"),
    ("data/stories/legends/kankurang-sacred-forest.ts", "kankurang"),
    ("data/stories/historical/kelefa-saane.ts", "kelefa-saane"),
    ("data/stories/adapted/the-fula-herdsman.ts", "fula-herdsman"),
    ("data/stories/historical/sundiata-lion-of-old-mali.ts", "sundiata"),
    ("data/stories/adapted/why-the-baobab-grows-upside-down.ts", "baobab-upside-down"),
    ("data/stories/historical/stone-circles-of-wassu.ts", "stone-circles"),
    ("data/stories/legends/the-first-kora.ts", "first-kora"),
]

print("=== All 13 new stories ===")
for path, label in slugs:
    try:
        s = parse_scenes_from_ts(path)
        status = "OK" if s else "EMPTY"
        print(f"  {label}: {len(s)} scenes - {status}")
    except Exception as e:
        print(f"  {label}: ERROR - {e}")
