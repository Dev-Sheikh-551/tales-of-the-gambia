/**
 * Tales of The Gambia — Animated Storybook Engine Types
 *
 * Provides declarative timeline, character rigging, camera choreography,
 * and environmental FX models for cinematic storytelling.
 */

import { CameraPreset, SceneCharacter } from "./story";
import { AnimationAssetId } from "@/lib/animations/registry";

export type CharacterActionType =
  // Movement
  | "enter-left"
  | "enter-right"
  | "exit-left"
  | "exit-right"
  | "walk"
  | "run"
  | "step"
  | "approach"
  | "retreat"
  | "jump"
  | "fall"
  // Posture
  | "stand"
  | "sit"
  | "crouch"
  | "rise"
  | "kneel"
  | "lean"
  | "recline"
  // Head / Attention
  | "look-left"
  | "look-right"
  | "look-up"
  | "look-down"
  | "turn"
  | "focus"
  | "react"
  // Gestures
  | "point"
  | "wave"
  | "raise-hand"
  | "reach"
  | "gesture"
  | "embrace"
  | "push"
  | "pull"
  | "paddle"
  | "pluck-kora"
  | "singing"
  | "fanning"
  | "labor"
  // Emotional Reactions
  | "surprise"
  | "fear"
  | "concern"
  | "joy"
  | "triumphant"
  | "sadness"
  | "anger"
  | "curiosity"
  | "relief"
  | "determination"
  | "cunning-look"
  | "mock"
  // Lifecycle
  | "reveal"
  | "dissolve"
  | "fade"
  | "disappear"
  | "still";

export interface CameraAnimationEvent {
  target: "camera";
  preset: CameraPreset;
  intensity?: "subtle" | "medium" | "dramatic";
  durationSeconds?: number;
  focusTarget?: "character" | "environment" | "left" | "right" | "center";
}

export interface CharacterAnimationEvent {
  target: "character";
  characterId: string;
  action: CharacterActionType;
  durationSeconds?: number;
  facing?: "left" | "right";
  positionTarget?: "far-left" | "left" | "center" | "right" | "far-right";
  intensity?: "subtle" | "medium" | "expressive";
}

export interface EnvironmentAnimationEvent {
  target: "environment";
  type:
    | "wind-gust"
    | "harmattan-dust"
    | "heat-shimmer"
    | "river-surge"
    | "water-ripples"
    | "fire-flare"
    | "nightfall"
    | "dawn-light"
    | "birds-crossing"
    | "calm";
  intensity?: "subtle" | "standard" | "dramatic";
  durationSeconds?: number;
}

export interface EffectAnimationEvent {
  target: "effect";
  lottieId: AnimationAssetId;
  position?: { x: number; y: number }; // Percentage 0-100
  scale?: number;
  durationSeconds?: number;
}

export interface CaptionAnimationEvent {
  target: "caption";
  action: "fade-in" | "highlight" | "dim" | "settle";
  cueIndex?: number;
}

export type SceneAnimationEventPayload =
  | CameraAnimationEvent
  | CharacterAnimationEvent
  | EnvironmentAnimationEvent
  | EffectAnimationEvent
  | CaptionAnimationEvent;

export interface SceneAnimationEvent {
  id: string;
  /** Exact audio second offset or timeline offset */
  timeSeconds?: number;
  /** Narration cue index trigger (fires as soon as audio hits this cue) */
  cueIndex?: number;
  /** Payload describing what changes in the scene */
  payload: SceneAnimationEventPayload;
  /** Optional delay before execution */
  delaySeconds?: number;
}

export interface SceneTimeline {
  durationSeconds?: number;
  events: SceneAnimationEvent[];
}

/**
 * Character appearance & rigging configuration
 */
export interface CharacterRigData {
  id: string;
  theme: SceneCharacter["avatarTheme"] | "kelefa" | "samba" | "ninki-nanka";
  name: string;
  facing?: "left" | "right";
  position: SceneCharacter["position"];
  scale?: number;
  action: CharacterActionType;
  activeProps?: string[];
}
