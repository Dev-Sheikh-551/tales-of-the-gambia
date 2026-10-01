/**
 * Target runtime environment platform
 */
export type RuntimePlatform =
  | "web-browser"
  | "mobile-web"
  | "capacitor-android"
  | "capacitor-ios"
  | "server";

/**
 * Feature capability flags detected for the active runtime
 */
export interface PlatformCapabilities {
  /** True when running inside a native iOS or Android Capacitor shell */
  isNative: boolean;
  /** True when running on a mobile viewport or mobile device */
  isMobile: boolean;
  /** True when running on an iOS device or iOS Capacitor shell */
  isIos: boolean;
  /** True when running on an Android device or Android Capacitor shell */
  isAndroid: boolean;
  /** Primary input method is touch */
  hasTouch: boolean;
  /** Device supports native filesystem storage (Capacitor Filesystem plugin) */
  hasFileSystem: boolean;
  /** Audio can be stored and played locally from local disk/cache */
  hasOfflineAudio: boolean;
  /** System accessibility flag prefers-reduced-motion is active */
  prefersReducedMotion: boolean;
  /** Device supports native haptic vibration feedback */
  supportsHaptics: boolean;
}

/**
 * Battery and network constraint states to throttle non-essential background tasks
 */
export interface DeviceResourceState {
  isOnline: boolean;
  effectiveNetworkType?: "slow-2g" | "2g" | "3g" | "4g";
  saveDataEnabled?: boolean;
  batteryLevel?: number;
  isCharging?: boolean;
}
