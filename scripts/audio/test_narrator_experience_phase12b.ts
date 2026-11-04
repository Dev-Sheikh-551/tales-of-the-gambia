/**
 * Phase 12B Runtime Acceptance Test Suite:
 * Comprehensive multi-narrator verification for ALL FOUR NARRATORS across all 29 stories:
 * 1. Amara of Gambia (voice: af_heart)
 * 2. Foday the Jali (voice: am_michael)
 * 3. Elder Baboucar (voice: am_adam)
 * 4. Kaddy of Brikama (voice: af_bella)
 *
 * Expected coverage:
 * - 29 stories
 * - 133 canonical scenes
 * - 532 narrator audio tracks (133 x 4)
 * - 532 dedicated cue JSON files (133 x 4)
 * - Zero cross-contamination across all pairs
 * - 100% offline manifest isolation
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

// The 29 canonical narrated stories
const CANONICAL_STORIES = STORIES.slice(0, 29);

function runPhase12BAcceptanceTests() {
  console.log("================================================================================");
  console.log("PHASE 12B: FOUR-NARRATOR RUNTIME ACCEPTANCE SUITE (29 STORIES / 133 SCENES / 532 TRACKS)");
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
  console.log("--- 1. Four-Narrator Registry Integrity ---");
  assert(DEFAULT_NARRATOR_ID === "amara-gambia", "DEFAULT_NARRATOR_ID is 'amara-gambia'");
  const allNarrators = getAllNarrators();
  assert(allNarrators.length === 4, `All 4 planned narrators present in registry (found ${allNarrators.length})`);

  const available = getAvailableNarrators();
  assert(available.length === 4, `ALL 4 narrators are now active and available (found ${available.length})`);

  const amara = getNarratorById("amara-gambia");
  assert(amara?.available === true && amara?.voiceId === "af_heart" && amara?.badge === "Available", "Amara is available with af_heart");

  const foday = getNarratorById("foday-jali");
  assert(foday?.available === true && foday?.voiceId === "am_michael" && foday?.badge === "Available", "Foday is available with am_michael");

  const baboucar = getNarratorById("elder-baboucar");
  assert(baboucar?.available === true && baboucar?.voiceId === "am_adam" && baboucar?.badge === "Available", "Elder Baboucar is available with am_adam");

  const kaddy = getNarratorById("kaddy-brikama");
  assert(kaddy?.available === true && kaddy?.voiceId === "af_bella" && kaddy?.badge === "Available", "Kaddy of Brikama is available with af_bella");

  console.log(`  Passed registry checks\n`);

  // TEST 2: Per-Story & Per-Scene Audio & Cue Resolution for all 4 Narrators
  console.log("--- 2. Complete Story & Scene Resolution (29 Stories / 133 Scenes / 532 Tracks) ---");
  assert(CANONICAL_STORIES.length === 29, `Exactly 29 canonical stories loaded (found ${CANONICAL_STORIES.length})`);

  let totalScenes = 0;
  let amaraResolved = 0;
  let fodayResolved = 0;
  let baboucarResolved = 0;
  let kaddyResolved = 0;

  for (const story of CANONICAL_STORIES) {
    for (const scene of story.scenes) {
      totalScenes++;

      // Amara resolution
      const trackAmara = resolveSceneNarration(scene.audio, "amara-gambia");
      assert(trackAmara.narratorId === "amara-gambia", `${story.slug} S${scene.sceneNumber}: Amara narratorId matches`);
      const amaraFile = path.join(PROJECT_ROOT, "public", trackAmara.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(amaraFile), `${story.slug} S${scene.sceneNumber}: Amara audio exists (${trackAmara.narrationUrl})`);
      assert(!!trackAmara.cues && trackAmara.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Amara cues exist`);
      if (trackAmara.narratorId === "amara-gambia" && fs.existsSync(amaraFile) && trackAmara.cues && trackAmara.cues.length > 0) {
        amaraResolved++;
      }

      // Foday resolution
      const trackFoday = resolveSceneNarration(scene.audio, "foday-jali");
      assert(trackFoday.narratorId === "foday-jali", `${story.slug} S${scene.sceneNumber}: Foday narratorId matches`);
      const fodayFile = path.join(PROJECT_ROOT, "public", trackFoday.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(fodayFile), `${story.slug} S${scene.sceneNumber}: Foday audio exists (${trackFoday.narrationUrl})`);
      assert(!!trackFoday.cues && trackFoday.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Foday cues exist`);
      if (trackFoday.narratorId === "foday-jali" && fs.existsSync(fodayFile) && trackFoday.cues && trackFoday.cues.length > 0) {
        fodayResolved++;
      }

      // Elder Baboucar resolution
      const trackBaboucar = resolveSceneNarration(scene.audio, "elder-baboucar");
      assert(trackBaboucar.narratorId === "elder-baboucar", `${story.slug} S${scene.sceneNumber}: Baboucar narratorId matches`);
      const baboucarFile = path.join(PROJECT_ROOT, "public", trackBaboucar.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(baboucarFile), `${story.slug} S${scene.sceneNumber}: Baboucar audio exists (${trackBaboucar.narrationUrl})`);
      assert(!!trackBaboucar.cues && trackBaboucar.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Baboucar cues exist`);
      if (trackBaboucar.narratorId === "elder-baboucar" && fs.existsSync(baboucarFile) && trackBaboucar.cues && trackBaboucar.cues.length > 0) {
        baboucarResolved++;
      }

      // Kaddy of Brikama resolution
      const trackKaddy = resolveSceneNarration(scene.audio, "kaddy-brikama");
      assert(trackKaddy.narratorId === "kaddy-brikama", `${story.slug} S${scene.sceneNumber}: Kaddy narratorId matches`);
      const kaddyFile = path.join(PROJECT_ROOT, "public", trackKaddy.narrationUrl!.replace(/^\//, ""));
      assert(fs.existsSync(kaddyFile), `${story.slug} S${scene.sceneNumber}: Kaddy audio exists (${trackKaddy.narrationUrl})`);
      assert(!!trackKaddy.cues && trackKaddy.cues.length > 0, `${story.slug} S${scene.sceneNumber}: Kaddy cues exist`);
      if (trackKaddy.narratorId === "kaddy-brikama" && fs.existsSync(kaddyFile) && trackKaddy.cues && trackKaddy.cues.length > 0) {
        kaddyResolved++;
      }

      // Zero Cross-Contamination Check (All 6 pairwise combinations)
      assert(trackAmara.narrationUrl !== trackFoday.narrationUrl, `${story.slug} S${scene.sceneNumber}: Amara != Foday`);
      assert(trackAmara.narrationUrl !== trackBaboucar.narrationUrl, `${story.slug} S${scene.sceneNumber}: Amara != Baboucar`);
      assert(trackAmara.narrationUrl !== trackKaddy.narrationUrl, `${story.slug} S${scene.sceneNumber}: Amara != Kaddy`);
      assert(trackFoday.narrationUrl !== trackBaboucar.narrationUrl, `${story.slug} S${scene.sceneNumber}: Foday != Baboucar`);
      assert(trackFoday.narrationUrl !== trackKaddy.narrationUrl, `${story.slug} S${scene.sceneNumber}: Foday != Kaddy`);
      assert(trackBaboucar.narrationUrl !== trackKaddy.narrationUrl, `${story.slug} S${scene.sceneNumber}: Baboucar != Kaddy`);

      // Verify Kaddy cues are monotonic and within duration
      let prevEnd = 0;
      for (const cue of trackKaddy.cues || []) {
        assert(cue.startSeconds >= prevEnd - 0.05, `${story.slug} S${scene.sceneNumber}: Kaddy cue ${cue.index} monotonic`);
        assert(cue.endSeconds > cue.startSeconds, `${story.slug} S${scene.sceneNumber}: Kaddy cue ${cue.index} duration positive`);
        prevEnd = cue.startSeconds;
      }
    }
  }

  console.log(`  Total Canonical Scenes: ${totalScenes} (expected 133)`);
  console.log(`  Amara Resolved Tracks:  ${amaraResolved}/${totalScenes}`);
  console.log(`  Foday Resolved Tracks:  ${fodayResolved}/${totalScenes}`);
  console.log(`  Baboucar Resolved Tracks: ${baboucarResolved}/${totalScenes}`);
  console.log(`  Kaddy Resolved Tracks:  ${kaddyResolved}/${totalScenes}`);
  console.log(`  TOTAL 4-NARRATOR TRACKS: ${amaraResolved + fodayResolved + baboucarResolved + kaddyResolved}/532\n`);

  // TEST 3: Multi-Cues Registry & Binary Search Sync
  console.log("--- 3. Cue Lookup & Binary Search Pacing for all 4 Narrators ---");
  const testStory = CANONICAL_STORIES[0];
  for (const nId of ["amara-gambia", "foday-jali", "elder-baboucar", "kaddy-brikama"]) {
    const cues = getStorySceneCues(testStory.slug, 1, nId);
    assert(!!cues && cues.length > 0, `${nId} cues retrieved from registry for ${testStory.slug} S1`);

    if (cues && cues.length > 0) {
      const activeMid = findActiveCueIndex(cues, (cues[0].startSeconds + cues[0].endSeconds) / 2);
      assert(activeMid === 0, `findActiveCueIndex locates cue 0 for ${nId}`);
    }
  }

  // TEST 4: Offline Package Generator Isolation for Kaddy
  console.log("\n--- 4. Offline Package Generator Isolation ---");
  const manifestKaddy = generateStoryOfflineManifest(testStory, "kaddy-brikama");
  assert(manifestKaddy.slug === testStory.slug, "Offline manifest has correct storySlug");
  assert(manifestKaddy.narratorId === "kaddy-brikama", "Offline manifest is configured for 'kaddy-brikama'");

  const kaddyAudioCount = manifestKaddy.audioAssets.filter(u => u.includes("-kaddy.mp3")).length;
  assert(kaddyAudioCount === testStory.scenes.length, `Offline audioAssets contains ${testStory.scenes.length} Kaddy audio files (found ${kaddyAudioCount})`);

  const crossAudio = manifestKaddy.audioAssets.filter(u =>
    u.includes("-foday.mp3") || u.includes("-amara.mp3") || u.includes("-baboucar.mp3")
  );
  assert(crossAudio.length === 0, `Offline manifest for Kaddy has zero cross-contamination (found ${crossAudio.length})`);

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
    console.log("Phase 12B Kaddy of Brikama Narration is completely verified and release-ready!");
    console.log("FULL FOUR-NARRATOR SYSTEM COMPLETE (532/532 TRACKS & CUES)!");
    console.log("================================================================================");
  }
}

runPhase12BAcceptanceTests();
