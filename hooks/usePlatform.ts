"use client";

import { useState, useEffect } from "react";
import { isCapacitorNative, getCapacitorPlatform } from "@/lib/mobile/runtime";

/**
 * Client-side hook that detects the runtime platform.
 * Returns stable values after the first client render.
 *
 * isNative  — true only inside a Capacitor native WebView (Android / iOS)
 * platform  — "android" | "ios" | "web"
 */
export function usePlatform() {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | "web">("web");

  useEffect(() => {
    setIsNative(isCapacitorNative());
    setPlatform(getCapacitorPlatform());
  }, []);

  return { isNative, platform };
}
