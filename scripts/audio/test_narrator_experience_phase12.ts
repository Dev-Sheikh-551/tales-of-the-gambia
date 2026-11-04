/**
 * Phase 12A Runtime Acceptance Test Suite:
 * Comprehensive multi-narrator verification for Amara, Foday, and Elder Baboucar across all 29 stories.
 */

import fs from "fs";
import path from "path";
import { STORIES } from "@/data/stories";
import {
  NARRATORS,
  DEFAULT_NARRATOR_ID,
  getAllNarrators,
  getAvailableNarrators,
  getNarratorById,
} from "@/lib/narrators/registry";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { getStorySceneCues, findActiveCueIndex, MULTI_CUES_REGISTRY } from "@/data/audio/cues";
import { generateStoryOfflineManifest } from "@/lib/offline/manifest";

const PROJECT_ROOT = process.cwd();

// The 29 canonical narrated stories are the first 29 stories in the catalog
const CANONICAL_STORIES = STORIES.slice(0, 29);

function runPhase12AcceptanceTests() {
  console.log("================================================================================");
  console.log("PHASE 12A: RUNTIME MULTI-NARRATOR ACCEPTANCE SUITE (ALL 29 STORIES / 133 SCENES)");
  console.log("================================================================================\n");

  let totalTests = 0;
  let passedTests = 0;
  const failures: string[] = [];

  function assert(condition: boolean, desc: string) {
    totalTests++;
    if (condition) {
      passedTests++;
    } else {
      failures.push(desc);
      console.error(`  [FAIL] ${desc}`);
    }
  }

  // TEST 1: Narrator Registry Integrity
  console.log("--- 1. Narrator Registry Integrity ---");
  assert(DEFAULT_NARRATOR_ID === "amara-gambia", "DEFAULT_NARRATOR_ID is 'amara-gambia'");
  const allNarrators = getAllNarrators();
  assert(allNarrators.length === 4, `All 4 planned narrators present in registry (found ${allNarrators.length})`);

  const available = getAvailableNarrators();
  assert(available.length === 3, `Exactly 3 narrators are active (found ${available.length})`);

  const amara = getNarratorById("amara-gambia");
  assert(amara?.available === true && amara?.voiceId === "af_heart", "Amara is available with af_heart");

  const foday = getNarratorById("foday-jali");
  assert(foday?.available === true && foday?.voiceId === "am_michael", "Foday is available with am_michael");

  const baboucar = getNarratorById("elder-baboucar");
  assert(baboucar?.available === true && baboucar?.voiceId === "am_adam" && baboucar?.badge === "Available", "Elder Baboucar is available with am_adam");

  const kaddy = getNarratorById("kaddy-brikama");
  assert(kaddy?.available === false && kaddy?.badge === "Coming Soon", "Kaddy of Brikama is locked with 'Coming Soon'");

  console.log(`  Passed ${passedTests}/${totalTests} registry checks\n`);

  // TEST 2: Per-Story & Per-Scene Audio & Cue Resolution for all 3 Narrators
  console.log("--- 2. Complete Story & Scene Resolution (29 Stories / 133 Scenes) ---");
  assert(CANONICAL_STORIES.length === 29, `Exactly 29 canonical stories loaded (found ${CANONICAL_STORIES.length})`);

  let totalScenes = 0;
  let amaraResolved = 0;
  let fodayResolved = 0;
  let baboucarResolved = 0;

  for (const story of CANONICAL_STORIES) {
    for (const scene of story.scenes) {
      totalScenes++;

      // Amara resolution
      const trackAmara = resolveSceneNarration(scene.audio, "amara-gambia");
      assert(trackAmara.narratorId === "amara-gambia", `${story.slug} S${scene.sceneNumber}: Amara narratorId matches`);
      const amaraFile = path.join(PROJECT_ROOT, "public", trackAmara.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(amaraFile), `${story.slug} S${scene.sceneNumber}: Amara audio file exists on disk (${trackAmara.narrationUrl})`);
      assert(!!trackAmara.cues && trackAmara.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Amara cues exist`);
      if (trackAmara.narratorId === "amara-gambia" && fs.existsSync(amaraFile) && trackAmara.cues && trackAmara.cues.length > 0) {
        amaraResolved++;
      }

      // Foday resolution
      const trackFoday = resolveSceneNarration(scene.audio, "foday-jali");
      assert(trackFoday.narratorId === "foday-jali", `${story.slug} S${scene.sceneNumber}: Foday narratorId matches`);
      const fodayFile = path.join(PROJECT_ROOT, "public", trackFoday.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(fodayFile), `${story.slug} S${scene.sceneNumber}: Foday audio file exists on disk (${trackFoday.narrationUrl})`);
      assert(!!trackFoday.cues && trackFoday.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Foday cues exist`);
      if (trackFoday.narratorId === "foday-jali" && fs.existsSync(fodayFile) && trackFoday.cues && trackFoday.cues.length > 0) {
        fodayResolved++;
      }

      // Elder Baboucar resolution
      const trackBaboucar = resolveSceneNarration(scene.audio, "elder-baboucar");
      assert(trackBaboucar.narratorId === "elder-baboucar", `${story.slug} S${scene.sceneNumber}: Baboucar narratorId matches`);
      const baboucarFile = path.join(PROJECT_ROOT, "public", trackBaboucar.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(baboucarFile), `${story.slug} S${scene.sceneNumber}: Baboucar audio file exists on disk (${trackBaboucar.narrationUrl})`);
      assert(!!trackBaboucar.cues && trackBaboucar.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Baboucar cues exist`);
      if (trackBaboucar.narratorId === "elder-baboucar" && fs.existsSync(baboucarFile) && trackBaboucar.cues && trackBaboucar.cues.length > 0) {
        baboucarResolved++;
      }

      // Zero Cross-Contamination Check
      assert(trackAmara.narrationUrl !== trackFoday.narrationUrl, `${story.slug} S${scene.sceneNumber}: Amara & Foday have distinct audio files`);
      assert(trackAmara.narrationUrl !== trackBaboucar.narrationUrl, `${story.slug} S${scene.sceneNumber}: Amara & Baboucar have distinct audio files`);
      assert(trackFoday.narrationUrl !== trackBaboucar.narrationUrl, `${story.slug} S${scene.sceneNumber}: Foday & Baboucar have distinct audio files`);

      // Verify cues are monotonic and within duration
      let prevEnd = 0;
      for (const cue of trackBaboucar.cues || []) {
        assert(cue.startSeconds >= prevEnd - 0.05, `${story.slug} S${scene.sceneNumber}: Baboucar cue ${cue.index} start is monotonic`);
        assert(cue.endSeconds > cue.startSeconds, `${story.slug} S${scene.sceneNumber}: Baboucar cue ${cue.index} duration positive`);
        prevEnd = cue.startSeconds;
      }
    }
  }

  console.log(`  Total Canonical Scenes: ${totalScenes} (expected 133)`);
  console.log(`  Amara Resolved Tracks:  ${amaraResolved}/${totalScenes}`);
  console.log(`  Foday Resolved Tracks:  ${fodayResolved}/${totalScenes}`);
  console.log(`  Baboucar Resolved Tracks: ${baboucarResolved}/${totalScenes}\n`);

  // TEST 3: Multi-Cues Registry & Binary Search Sync
  console.log("--- 3. Cue Lookup & Binary Search Pacing ---");
  const testStory = CANONICAL_STORIES[0];
  const cuesBaboucar = getStorySceneCues(testStory.slug, 1, "elder-baboucar");
  assert(!!cuesBaboucar && cuesBaboucar.length > 0, `Baboucar cues retrieved from registry for ${testStory.slug} S1`);

  if (cuesBaboucar && cuesBaboucar.length > 0) {
    const activeMid = findActiveCueIndex(cuesBaboucar, (cuesBaboucar[0].startSeconds + cuesBaboucar[0].endSeconds) / 2);
    assert(activeMid === 0, "findActiveCueIndex accurately locates active cue during speech");

    const activeBefore = findActiveCueIndex(cuesBaboucar, -1);
    assert(activeBefore === -1, "findActiveCueIndex returns -1 before audio start");
  }

  // TEST 4: Locked Narrator Fallback Protection
  console.log("--- 4. Locked Narrator Security & Fallback ---");
  const fallbackTrack = resolveSceneNarration(testStory.scenes[0].audio, "kaddy-brikama");
  assert(fallbackTrack.narratorId === DEFAULT_NARRATOR_ID, "Requesting locked 'kaddy-brikama' cleanly falls back to default narrator");
  assert(!fallbackTrack.narrationUrl?.includes("kaddy"), "No accidental or invented audio track for locked narrator");

  // TEST 5: Offline Package Generator Isolation
  console.log("--- 5. Offline Package Generator for Elder Baboucar ---");
  const manifest = generateStoryOfflineManifest(testStory, "elder-baboucar");
  assert(manifest.slug === testStory.slug, "Offline manifest has correct storySlug");
  assert(manifest.narratorId === "elder-baboucar", "Offline manifest is configured for 'elder-baboucar'");
  // Verify Baboucar audio URLs appear in the audioAssets list
  const baboucarAudioCount = manifest.audioAssets.filter(u => u.includes("-baboucar.mp3")).length;
  assert(baboucarAudioCount === testStory.scenes.length, `Offline manifest audioAssets contains ${testStory.scenes.length} Baboucar audio files (found ${baboucarAudioCount})`);
  // Verify no other narrator's audio was mixed in
  const crossContaminatedAudio = manifest.audioAssets.filter(u =>
    u.includes("-foday.mp3") || u.includes("-amara.mp3")
  );
  assert(crossContaminatedAudio.length === 0, `Offline manifest has no cross-contamination from other narrators (found ${crossContaminatedAudio.length})`);
  // Note: cue data is embedded in-memory per architecture (assetResolver.ts rule #3), so dataAssets is intentionally empty
  console.log(`  Note: cue data is embedded in-memory per architecture — no remote cue JSON fetched (by design)`);
  assert(manifest.assets.every(a => a.url.includes("-baboucar.mp3") || a.type === "animation"), "All offline assets belong to Elder Baboucar or are shared animation assets");

  // FINAL VERDICT
  console.log("\n================================================================================");
  console.log(`ACCEPTANCE RESULTS: ${passedTests}/${totalTests} CHECKS PASSED`);
  if (failures.length > 0) {
    console.error(`FAILURES ENCOUNTERED (${failures.length}):`);
    for (const f of failures.slice(0, 10)) {
      console.error(`  * ${f}`);
    }
    process.exit(1);
  } else {
    console.log("ALL ACCEPTANCE TESTS PASSED WITH 100% SUCCESS!");
    console.log("Phase 12A Elder Baboucar Narration is completely verified and release-ready!");
    console.log("================================================================================");
  }
}

runPhase12AcceptanceTests();
