import { Story } from "@/types/story";
import { StoryOfflinePackage } from "@/types/offline";
import { DEFAULT_NARRATOR_ID } from "@/lib/narrators/registry";
import { resolveStoryAssets } from "./assetResolver";
import { getStorySceneCues } from "@/data/audio/cues";
import { resolveSceneNarration } from "@/lib/narrators/resolver";

/**
 * Generates a complete downloadable package manifest for a story.
 * Scans all scenes, resolves narration audio paths for the selected narrator,
 * maps required binary assets, and embeds canonical story data with cues.
 *
 * An offline package must accurately attribute the actual narrator audio downloaded,
 * rather than an unfulfilled coming-soon request.
 */
export function generateStoryOfflineManifest(
  story: Story,
  targetNarratorId: string = DEFAULT_NARRATOR_ID
): StoryOfflinePackage {
  const resolved = resolveStoryAssets(story, targetNarratorId);

  // Guarantee that every scene in embeddedStory has its cues array populated
  const embeddedStory: Story = {
    ...story,
    scenes: story.scenes.map((scene) => ({
      ...scene,
      audio: {
        ...scene.audio,
        cues: scene.audio?.cues || getStorySceneCues(story.slug, scene.sceneNumber) || [],
      },
    })),
  };

  // Determine actual narrator id from resolved scene audio (guarding against fake narrator labels)
  let actualNarratorId = targetNarratorId;
  for (const scene of story.scenes) {
    const sceneResolved = resolveSceneNarration(scene.audio, targetNarratorId);
    if (sceneResolved.hasAudio && sceneResolved.narratorId) {
      actualNarratorId = sceneResolved.narratorId;
      break;
    }
  }

  return {
    storyId: story.id,
    slug: story.slug,
    version: "2.0.0",
    title: story.title,
    narratorId: actualNarratorId,
    createdAt: new Date().toISOString(),
    totalSizeBytes: resolved.totalEstimatedBytes,
    assets: resolved.assets,
    audioAssets: resolved.audioAssets,
    imageAssets: resolved.imageAssets,
    animationAssets: resolved.animationAssets,
    dataAssets: resolved.dataAssets,
    embeddedStory,
  };
}
