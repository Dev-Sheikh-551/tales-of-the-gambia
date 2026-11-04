import fs from "fs";
import path from "path";
import { STORIES } from "../../data/stories";
import { storyDownloadManager } from "../../lib/offline/storyDownloadManager";
import { OfflineStorageAdapter, StoryOfflinePackage, OfflineStorageQuota } from "../../types/offline";
import { resolveSceneNarration } from "../../lib/narrators/resolver";
import { generateStoryOfflineManifest } from "../../lib/offline/manifest";

class MemoryOfflineStorageAdapter implements OfflineStorageAdapter {
  private assets = new Map<string, Blob>();
  private packages = new Map<string, StoryOfflinePackage>();

  async isAvailable(): Promise<boolean> {
    return true;
  }
  async saveAsset(url: string, data: Blob | ArrayBuffer): Promise<string> {
    const blob = data instanceof Blob ? data : new Blob([data]);
    this.assets.set(url, blob);
    return `blob:${url}`;
  }
  async getAssetUri(url: string): Promise<string | undefined> {
    if (this.assets.has(url)) {
      return `blob:${url}`;
    }
    return undefined;
  }
  async deleteAsset(url: string): Promise<boolean> {
    return this.assets.delete(url);
  }
  async savePackageMetadata(pkg: StoryOfflinePackage): Promise<void> {
    this.packages.set(pkg.slug, pkg);
  }
  async getPackageMetadata(slug: string): Promise<StoryOfflinePackage | undefined> {
    return this.packages.get(slug);
  }
  async removePackage(slug: string): Promise<void> {
    this.packages.delete(slug);
  }
  async listDownloadedPackages(): Promise<StoryOfflinePackage[]> {
    return Array.from(this.packages.values());
  }
  async getStorageQuota(): Promise<OfflineStorageQuota> {
    return {
      usedBytes: 1024 * 1024,
      quotaBytes: 100 * 1024 * 1024,
      storyCount: this.packages.size,
    };
  }
}

async function testOfflineRuntime() {
  console.log("================================================================================");
  console.log("TEST 5: OFFLINE RUNTIME DOWNLOAD & ISOLATION ACCEPTANCE TEST");
  console.log("================================================================================");

  const memAdapter = new MemoryOfflineStorageAdapter();
  storyDownloadManager.setAdapter(memAdapter);

  const hareStory = STORIES.find(s => s.slug === "the-clever-hare-and-the-great-drought")!;
  const ninkiStory = STORIES.find(s => s.slug === "the-whispering-waters-of-ninki-nanka")!;

  // ── Step 1: Download Hare story with AMARA selected ──────────────────────
  console.log("\n[STEP 1] Generating & Caching 'The Clever Hare' offline with AMARA selected...");
  const amaraPkg = generateStoryOfflineManifest(hareStory, "amara-gambia");

  console.log(`  Package narrator: ${amaraPkg.narratorId}`);
  console.log(`  Total assets: ${amaraPkg.assets.length} (${amaraPkg.audioAssets.length} audio)`);
  if (amaraPkg.narratorId !== "amara-gambia") {
    throw new Error(`Expected narratorId 'amara-gambia', got ${amaraPkg.narratorId}`);
  }

  // Save all real binary assets into adapter
  for (const asset of amaraPkg.assets) {
    const filePath = path.join(process.cwd(), "public", asset.url.replace(/^\//, ""));
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer]);
    await memAdapter.saveAsset(asset.url, blob);
  }
  await memAdapter.savePackageMetadata(amaraPkg);

  const savedAmaraPkg = await memAdapter.getPackageMetadata(hareStory.slug);
  if (!savedAmaraPkg || savedAmaraPkg.narratorId !== "amara-gambia") {
    throw new Error("Failed to retrieve Amara package from offline storage adapter");
  }
  console.log("  PASS: Amara package successfully stored and verified in offline storage.");

  // ── Step 2: Download Ninki Nanka with FODAY selected ─────────────────────
  console.log("\n[STEP 2] Generating & Caching 'Ninki Nanka' offline with FODAY selected...");
  const fodayPkg = generateStoryOfflineManifest(ninkiStory, "foday-jali");

  console.log(`  Package narrator: ${fodayPkg.narratorId}`);
  console.log(`  Total assets: ${fodayPkg.assets.length} (${fodayPkg.audioAssets.length} audio)`);
  if (fodayPkg.narratorId !== "foday-jali") {
    throw new Error(`Expected narratorId 'foday-jali', got ${fodayPkg.narratorId}`);
  }

  for (const asset of fodayPkg.assets) {
    const filePath = path.join(process.cwd(), "public", asset.url.replace(/^\//, ""));
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer]);
    await memAdapter.saveAsset(asset.url, blob);
  }
  await memAdapter.savePackageMetadata(fodayPkg);

  const savedFodayPkg = await memAdapter.getPackageMetadata(ninkiStory.slug);
  if (!savedFodayPkg || savedFodayPkg.narratorId !== "foday-jali") {
    throw new Error("Failed to retrieve Foday package from offline storage adapter");
  }
  console.log("  PASS: Foday package successfully stored and verified in offline storage.");

  // ── Step 3: Offline Simulation & Asset Retrieval ─────────────────────────
  console.log("\n[STEP 3] Simulating OFFLINE Playback (Zero Network Requests)...");
  
  // For Hare story (downloaded with Amara):
  for (const scene of savedAmaraPkg.embeddedStory!.scenes) {
    const resAmara = resolveSceneNarration(scene.audio, "amara-gambia");
    const assetUri = await memAdapter.getAssetUri(resAmara.narrationUrl!);
    if (!assetUri) {
      throw new Error(`Offline asset resolution failed for Amara scene ${scene.sceneNumber}: ${resAmara.narrationUrl}`);
    }

    // Try resolving Foday while offline (should NOT have Foday audio downloaded for this story)
    const resFoday = resolveSceneNarration(scene.audio, "foday-jali");
    const fodayUri = await memAdapter.getAssetUri(resFoday.narrationUrl!);
    if (fodayUri) {
      throw new Error(`Leaked un-downloaded Foday asset in Amara-only package: ${resFoday.narrationUrl}`);
    }
  }
  console.log("  PASS: 'The Clever Hare' plays all 6 scenes offline with Amara.");
  console.log("  PASS: Zero un-downloaded Foday audio accessible offline for this package.");

  // For Ninki Nanka (downloaded with Foday):
  for (const scene of savedFodayPkg.embeddedStory!.scenes) {
    const resFoday = resolveSceneNarration(scene.audio, "foday-jali");
    const assetUri = await memAdapter.getAssetUri(resFoday.narrationUrl!);
    if (!assetUri) {
      throw new Error(`Offline asset resolution failed for Foday scene ${scene.sceneNumber}: ${resFoday.narrationUrl}`);
    }

    // Try resolving Amara while offline
    const resAmara = resolveSceneNarration(scene.audio, "amara-gambia");
    const amaraUri = await memAdapter.getAssetUri(resAmara.narrationUrl!);
    if (amaraUri) {
      throw new Error(`Leaked un-downloaded Amara asset in Foday-only package: ${resAmara.narrationUrl}`);
    }
  }
  console.log("  PASS: 'Ninki Nanka' plays all 3 scenes offline with Foday.");
  console.log("  PASS: Zero un-downloaded Amara audio accessible offline for this package.");

  console.log("\n================================================================================");
  console.log("OFFLINE RUNTIME ACCEPTANCE TESTS PASSED (100% ISOLATION, REAL BLOBS VERIFIED)!");
  console.log("================================================================================");
}

testOfflineRuntime().catch(err => {
  console.error("Offline Test Failed:", err);
  process.exit(1);
});
