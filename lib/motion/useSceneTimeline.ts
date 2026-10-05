"use client";

import { useMemo } from "react";
import { Scene, NarrationCue } from "@/types/story";
import {
  CharacterActionType,
  CameraAnimationEvent,
  EnvironmentAnimationEvent,
  EffectAnimationEvent,
} from "@/types/engine";

interface SceneTimelineState {
  activeCueIndex: number;
  activeCameraEvent: CameraAnimationEvent | null;
  characterActionOverrides: Record<string, CharacterActionType>;
  environmentOverride: EnvironmentAnimationEvent | null;
  activeEffects: EffectAnimationEvent[];
}

/**
 * Declarative Scene Timeline Resolver
 *
 * Synchronously computes the active animation state from authoritative audio currentTime
 * and active narration cues.
 * Pure function of time — no competing interval timers, no stale listeners, no memory leaks.
 */
export function useSceneTimeline(
  scene: Scene,
  currentTime: number = 0,
  cues?: NarrationCue[],
  isPaused: boolean = false
): SceneTimelineState {
  return useMemo(() => {
    // 1. Identify active narration cue index
    let activeCueIndex = -1;
    if (cues && cues.length > 0) {
      for (let i = 0; i < cues.length; i++) {
        const cue = cues[i];
        if (currentTime >= cue.startSeconds && currentTime <= cue.endSeconds) {
          activeCueIndex = i;
          break;
        } else if (currentTime > cue.endSeconds) {
          activeCueIndex = i; // Last spoken cue before current position
        }
      }
    }

    const events = scene.timeline?.events || [];

    let activeCameraEvent: CameraAnimationEvent | null = null;
    const characterActionOverrides: Record<string, CharacterActionType> = {};
    let environmentOverride: EnvironmentAnimationEvent | null = null;
    const activeEffects: EffectAnimationEvent[] = [];

    // 2. Evaluate timeline events matching the current playback time or cue index
    for (const event of events) {
      let isTriggered = false;

      // Cue-based trigger
      if (typeof event.cueIndex === "number" && activeCueIndex >= 0) {
        if (activeCueIndex >= event.cueIndex) {
          isTriggered = true;
        }
      }

      // Time-based trigger
      if (typeof event.timeSeconds === "number") {
        const triggerTime = (event.timeSeconds || 0) + (event.delaySeconds || 0);
        if (currentTime >= triggerTime) {
          isTriggered = true;
        }
      }

      if (isTriggered) {
        const payload = event.payload;
        switch (payload.target) {
          case "camera":
            activeCameraEvent = payload as CameraAnimationEvent;
            break;
          case "character": {
            const charPayload = payload;
            characterActionOverrides[charPayload.characterId] = charPayload.action;
            break;
          }
          case "environment":
            environmentOverride = payload as EnvironmentAnimationEvent;
            break;
          case "effect":
            activeEffects.push(payload as EffectAnimationEvent);
            break;
        }
      }
    }

    return {
      activeCueIndex,
      activeCameraEvent,
      characterActionOverrides,
      environmentOverride,
      activeEffects,
    };
  }, [scene, currentTime, cues, isPaused]);
}
