import { PlatformCapabilities, RuntimePlatform } from "@/types/mobile";
import { checkPrefersReducedMotion } from "@/lib/motion/reducedMotion";

/**
 * Detects whether the active runtime is running inside a Capacitor native container.
 * In a Capacitor environment, `window.Capacitor` is defined by the native bridge.
 */
export function isCapacitorNative(): boolean {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  return Boolean(win.Capacitor && win.Capacitor.isNativePlatform && win.Capacitor.isNativePlatform());
}

/**
 * Detects the specific Capacitor native platform (android or ios)
 */
export function getCapacitorPlatform(): "android" | "ios" | "web" {
  if (typeof window === "undefined") return "web";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (win.Capacitor && win.Capacitor.getPlatform) {
    return win.Capacitor.getPlatform();
  }
  return "web";
}

/**
 * Detects whether the user agent or screen width indicates a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const userAgent = navigator.userAgent || "";
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isNarrowScreen = window.innerWidth <= 768;
  return isMobileUA || isNarrowScreen;
}

/**
 * Detects the overall runtime platform category
 */
export function getRuntimePlatform(): RuntimePlatform {
  if (typeof window === "undefined") return "server";

  const capPlatform = getCapacitorPlatform();
  if (capPlatform === "android") return "capacitor-android";
  if (capPlatform === "ios") return "capacitor-ios";

  if (isMobileDevice()) return "mobile-web";
  return "web-browser";
}

/**
 * Returns full capabilities of the active runtime platform.
 * Safe to execute on both server and client.
 */
export function getPlatformCapabilities(): PlatformCapabilities {
  if (typeof window === "undefined") {
    return {
      isNative: false,
      isMobile: false,
      isIos: false,
      isAndroid: false,
      hasTouch: false,
      hasFileSystem: false,
      hasOfflineAudio: false,
      prefersReducedMotion: false,
      supportsHaptics: false,
    };
  }

  const isNative = isCapacitorNative();
  const capPlatform = getCapacitorPlatform();
  const userAgent = navigator.userAgent || "";
  const isIos = capPlatform === "ios" || /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = capPlatform === "android" || /Android/.test(userAgent);
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return {
    isNative,
    isMobile: isMobileDevice(),
    isIos,
    isAndroid,
    hasTouch,
    hasFileSystem: isNative, // Capacitor provides native Filesystem API
    hasOfflineAudio: isNative,
    prefersReducedMotion: checkPrefersReducedMotion(),
    supportsHaptics: isNative || "vibrate" in navigator,
  };
}
