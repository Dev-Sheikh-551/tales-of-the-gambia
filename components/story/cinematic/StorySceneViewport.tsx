"use client";

import React from "react";
import { Scene } from "@/types/story";
import { SceneBackground } from "./SceneBackground";
import { SceneCameraContainer } from "./SceneCameraContainer";
import { SceneAtmosphere } from "./SceneAtmosphere";
import { SceneCharacterLayer } from "./SceneCharacterLayer";
import { SceneCaption } from "./SceneCaption";

interface StorySceneViewportProps {
  scene: Scene;
  totalScenes: number;
  isPaused: boolean;
}

export function StorySceneViewport({
  scene,
  totalScenes,
  isPaused,
}: StorySceneViewportProps) {
  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between overflow-hidden bg-[#0A0807]">
      {/* Visual Camera Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <SceneCameraContainer
          sceneId={scene.id}
          cameraMotion={scene.cameraMotion}
          isPaused={isPaused}
        >
          {/* Background Illustration & Vignettes */}
          <SceneBackground
            visual={scene.visual}
            backgroundGradient={scene.backgroundGradient}
          />

          {/* Environmental Motion Presets */}
          <SceneAtmosphere
            environmentMotion={scene.environmentMotion}
            isPaused={isPaused}
          />

          {/* Character Placement Layer */}
          <SceneCharacterLayer
            characters={scene.charactersData}
            isPaused={isPaused}
          />
        </SceneCameraContainer>
      </div>

      {/* Floating Editorial Caption */}
      <SceneCaption
        sceneId={scene.id}
        title={scene.title}
        text={scene.text}
        narration={scene.narration}
        sceneNumber={scene.sceneNumber}
        totalScenes={totalScenes}
      />
    </div>
  );
}
