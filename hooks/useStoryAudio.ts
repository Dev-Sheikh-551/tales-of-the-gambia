"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getAudioSettings, saveAudioSettings } from "@/lib/storyStorage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AudioState =
  | "idle"      // initial state, no src ever set
  | "missing"   // narrationSrc is undefined/empty — no audio for this scene
  | "loading"   // src assigned, browser fetching
  | "ready"     // metadata loaded, ready to play
  | "playing"
  | "paused"
  | "ended"
  | "error";    // network / decode error

export const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5] as const;
export type PlaybackRate = (typeof PLAYBACK_RATES)[number];

interface UseStoryAudioOptions {
  /** URL for the narration audio file. `undefined` = no narration for this scene. */
  narrationSrc: string | undefined;
  /** Called when narration ends naturally (not on pause). */
  onNarrationEnded?: () => void;
  /** Called when the audio element emits a load/decode error. */
  onNarrationError?: () => void;
}

export interface UseStoryAudioReturn {
  audioState: AudioState;
  currentTime: number;
  duration: number;
  narrationVolume: number;
  playbackRate: PlaybackRate;
  isPlaying: boolean;
  isLoading: boolean;
  /** true when narrationSrc is a non-empty string (audio is expected for this scene) */
  hasAudio: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  seek: (seconds: number) => void;
  setNarrationVolume: (v: number) => void;
  setPlaybackRate: (r: PlaybackRate) => void;
  retry: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useStoryAudio({
  narrationSrc,
  onNarrationEnded,
  onNarrationError,
}: UseStoryAudioOptions): UseStoryAudioReturn {
  // Persistent settings — read once on mount
  const settingsRef = useRef(getAudioSettings());

  // Narration audio element is created ONCE per hook instance and never re-created.
  const narrationRef = useRef<HTMLAudioElement | null>(null);
  const isMounted = useRef(false);

  // Stable callback refs to avoid stale closures in event listeners
  const narrationSrcRef = useRef(narrationSrc);
  useEffect(() => { narrationSrcRef.current = narrationSrc; }, [narrationSrc]);
  const onNarrationEndedRef = useRef(onNarrationEnded);
  const onNarrationErrorRef = useRef(onNarrationError);
  useEffect(() => { onNarrationEndedRef.current = onNarrationEnded; }, [onNarrationEnded]);
  useEffect(() => { onNarrationErrorRef.current = onNarrationError; }, [onNarrationError]);

  // ── State ─────────────────────────────────────────────────────────────────
  const [audioState, setAudioState] = useState<AudioState>(
    narrationSrc ? "loading" : "missing"
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [narrationVolume, setNarrationVolumeState] = useState(
    settingsRef.current.narrationVolume
  );
  const [playbackRate, setPlaybackRateState] = useState<PlaybackRate>(
    (settingsRef.current.playbackRate as PlaybackRate) ?? 1
  );

  // ── Create HTMLAudioElement once (client only) ────────────────────────────
  useEffect(() => {
    isMounted.current = true;
    const s = settingsRef.current;

    const narration = new Audio();
    narration.preload = "metadata";
    narration.volume = clamp(s.narrationVolume, 0, 1);
    narration.playbackRate = s.playbackRate;
    narrationRef.current = narration;

    // ── Narration event listeners ──────────────────────────────────────────
    const onLoadedMetadata = () => {
      if (!isMounted.current) return;
      setDuration(narration.duration);
      setAudioState((prev) =>
        prev === "loading" || prev === "idle" || prev === "missing"
          ? "ready"
          : prev
      );
    };
    const onTimeUpdate = () => {
      if (!isMounted.current) return;
      setCurrentTime(narration.currentTime);
    };
    const onPlay = () => {
      if (!isMounted.current) return;
      setAudioState("playing");
    };
    const onPause = () => {
      if (!isMounted.current) return;
      // Only update state if we're not transitioning to ended
      setAudioState((prev) => (prev === "ended" ? "ended" : "paused"));
    };
    const onEnded = () => {
      if (!isMounted.current) return;
      setAudioState("ended");
      onNarrationEndedRef.current?.();
    };
    const onError = () => {
      if (!isMounted.current) return;
      if (!narrationSrcRef.current) {
        setAudioState("missing");
        return;
      }
      setAudioState("error");
      onNarrationErrorRef.current?.();
    };
    const onWaiting = () => {
      if (!isMounted.current) return;
      setAudioState("loading");
    };
    const onCanPlay = () => {
      if (!isMounted.current) return;
      setAudioState((prev) => (prev === "loading" ? "ready" : prev));
    };

    narration.addEventListener("loadedmetadata", onLoadedMetadata);
    narration.addEventListener("timeupdate", onTimeUpdate);
    narration.addEventListener("play", onPlay);
    narration.addEventListener("pause", onPause);
    narration.addEventListener("ended", onEnded);
    narration.addEventListener("error", onError);
    narration.addEventListener("waiting", onWaiting);
    narration.addEventListener("canplay", onCanPlay);

    return () => {
      isMounted.current = false;
      narration.removeEventListener("loadedmetadata", onLoadedMetadata);
      narration.removeEventListener("timeupdate", onTimeUpdate);
      narration.removeEventListener("play", onPlay);
      narration.removeEventListener("pause", onPause);
      narration.removeEventListener("ended", onEnded);
      narration.removeEventListener("error", onError);
      narration.removeEventListener("waiting", onWaiting);
      narration.removeEventListener("canplay", onCanPlay);
      // Release resources
      narration.pause();
      narration.removeAttribute("src");
      narration.load();
    };
  }, []); // intentionally empty — element created/destroyed once per mount

  // ── React to narrationSrc changes ─────────────────────────────────────────
  useEffect(() => {
    const el = narrationRef.current;
    if (!el) return;

    if (!narrationSrc) {
      el.pause();
      el.removeAttribute("src");
      el.load();
      setAudioState("missing");
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    // New source — reset and load
    el.pause();
    el.src = narrationSrc;
    el.load();
    setAudioState("loading");
    setCurrentTime(0);
    setDuration(0);
  }, [narrationSrc]);

  // ── Controls ───────────────────────────────────────────────────────────────

  const play = useCallback(async () => {
    const el = narrationRef.current;
    if (!el || !narrationSrc) return;

    // If track has ended or is at the end, rewind to start before playing
    if (el.ended || (el.duration && el.currentTime >= el.duration - 0.2)) {
      el.currentTime = 0;
    }

    try {
      await el.play();
    } catch (err: unknown) {
      // Browser blocked autoplay, or AbortError from rapid src changes.
      // Do NOT re-throw — just settle into paused state.
      const name = err instanceof Error ? err.name : "";
      if (name !== "AbortError") {
        setAudioState("paused");
      }
    }
  }, [narrationSrc]);

  const pause = useCallback(() => {
    narrationRef.current?.pause();
  }, []);

  const toggle = useCallback(async () => {
    const el = narrationRef.current;
    if (!el) return;
    if (el.paused || audioState === "ended") {
      await play();
    } else {
      pause();
    }
  }, [audioState, play, pause]);

  const seek = useCallback((seconds: number) => {
    const el = narrationRef.current;
    if (!el || !isFinite(el.duration)) return;
    el.currentTime = clamp(seconds, 0, el.duration);
    setCurrentTime(el.currentTime);
  }, []);

  const setNarrationVolume = useCallback((v: number) => {
    const clamped = clamp(v, 0, 1);
    if (narrationRef.current) narrationRef.current.volume = clamped;
    settingsRef.current.narrationVolume = clamped;
    setNarrationVolumeState(clamped);
    saveAudioSettings({ narrationVolume: clamped });
  }, []);

  const setPlaybackRate = useCallback((r: PlaybackRate) => {
    if (narrationRef.current) narrationRef.current.playbackRate = r;
    settingsRef.current.playbackRate = r;
    setPlaybackRateState(r);
    saveAudioSettings({ playbackRate: r });
  }, []);

  const retry = useCallback(() => {
    const el = narrationRef.current;
    if (!el || !narrationSrc) return;
    el.pause();
    el.src = narrationSrc;
    el.load();
    setAudioState("loading");
    setCurrentTime(0);
    setDuration(0);
  }, [narrationSrc]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const hasAudio = !!narrationSrc;
  const isPlaying = audioState === "playing";
  const isLoading = audioState === "loading";

  return {
    audioState,
    currentTime,
    duration,
    narrationVolume,
    playbackRate,
    isPlaying,
    isLoading,
    hasAudio,
    play,
    pause,
    toggle,
    seek,
    setNarrationVolume,
    setPlaybackRate,
    retry,
  };
}
