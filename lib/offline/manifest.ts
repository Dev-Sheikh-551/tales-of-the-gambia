import { Story } from "@/types/story";
import { StoryOfflinePackage, OfflineAssetEntry } from "@/types/offline";
import { resolveSceneNarration } from "@/lib/narrators/resolver";
import { DEFAULT_NARRATOR_ID } from "@/lib/narrators/registry";

/**
 * Average estimated size of a scene narration MP3 file in bytes (~320 KB per scene at 64kbps speech)
 */
const ESTIMATED_SCENE_AUDIO_BYTES = 320 * 1024;

/**
 * Average estimated size of a scene cue JSON file in bytes (~8 KB per scene)
 */
const ESTIMATED_SCENE_CUE_BYTES = 8 * 1024;

/**
 * Generates a complete downloadable package manifest for a story.
 * Scans all scenes, resolves narration audio paths for the selected narrator,
 * maps cue files, and computes storage requirements.
 */
export function generateStoryOfflineManifest(
  story: Story,
  targetNarratorId: string = DEFAULT_NARRATOR_ID
): StoryOfflinePackage {
  const assets: OfflineAssetEntry[] = [];
  const audioAssets: string[] = [];
  const imageAssets: string[] = [];
  const animationAssets: string[] = [];
  const dataAssets: string[] = [];

  let totalEstimatedBytes = 0;

  // 1. Cover / Story Art Asset
  if (story.coverImage?.src) {
    imageAssets.push(story.coverImage.src);
    assets.push({
      url: story.coverImage.src,
      type: "image",
      required: false,
      fileSizeBytes: 120 * 1024,
    });
    totalEstimatedBytes += 120 * 1024;
  }

  // 2. Canonical Story Metadata Asset
  const storyJsonUrl = `/data/stories/${story.slug}.json`;
  dataAssets.push(storyJsonUrl);
  assets.push({
    url: storyJsonUrl,
    type: "story-json",
    required: true,
    fileSizeBytes: 15 * 1024,
  });
  totalEstimatedBytes += 15 * 1024;

  // 3. Scene Assets (Audio narration & Cues)
  for (const scene of story.scenes) {
    const resolved = resolveSceneNarration(scene.audio, targetNarratorId);

    // Audio narration MP3
    if (resolved.hasAudio && resolved.narrationUrl) {
      audioAssets.push(resolved.narrationUrl);
      const estAudioBytes =
        resolved.narrationDurationSeconds && resolved.narrationDurationSeconds > 0
          ? Math.round((resolved.narrationDurationSeconds * 64 * 1024) / 8) // ~64kbps mono MP3
          : ESTIMATED_SCENE_AUDIO_BYTES;

      assets.push({
        url: resolved.narrationUrl,
        type: "audio",
        required: true,
        fileSizeBytes: estAudioBytes,
      });
      totalEstimatedBytes += estAudioBytes;
    }

    // Cue alignment track
    const cueTrackUrl = `/data/audio/cues/${story.slug}/scene-${String(scene.sceneNumber).padStart(2, "0")}.json`;
    dataAssets.push(cueTrackUrl);
    assets.push({
      url: cueTrackUrl,
      type: "cue-data",
      required: false,
      fileSizeBytes: ESTIMATED_SCENE_CUE_BYTES,
    });
    totalEstimatedBytes += ESTIMATED_SCENE_CUE_BYTES;
  }

  return {
    storyId: story.id,
    slug: story.slug,
    version: "2.0.0",
    title: story.title,
    narratorId: targetNarratorId,
    createdAt: new Date().toISOString(),
    totalSizeBytes: totalEstimatedBytes,
    assets,
    audioAssets,
    imageAssets,
    animationAssets,
    dataAssets,
    embeddedStory: story,
  };
}
