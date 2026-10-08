/**
 * Centralized Offline Storage Adapter Provider.
 *
 * Automatically selects:
 * - CapacitorStorageAdapter on native platforms (Android / iOS)
 * - WebStorageAdapter on web browsers (Cache Storage + IndexedDB)
 *
 * Provides a clean abstraction boundary so that:
 * 1. Web builds and SSR/static export do not break.
 * 2. Downloader and reader components remain platform-agnostic.
 */

import { Capacitor } from "@capacitor/core";
import type { OfflineStorageAdapter } from "@/types/offline";
import { getWebStorageAdapter } from "./webStorageAdapter";
import { getCapacitorStorageAdapter } from "./capacitorStorageAdapter";

let _activeAdapter: OfflineStorageAdapter | null = null;

export function getOfflineStorageAdapter(): OfflineStorageAdapter {
  if (_activeAdapter) {
    return _activeAdapter;
  }

  // Capacitor.isNativePlatform() is safe to call in browser and Node/SSR
  if (typeof window !== "undefined" && Capacitor.isNativePlatform()) {
    _activeAdapter = getCapacitorStorageAdapter();
  } else {
    _activeAdapter = getWebStorageAdapter();
  }

  return _activeAdapter;
}
