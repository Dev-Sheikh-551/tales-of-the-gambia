/**
 * In-memory fallback map used when localStorage is disabled or throws QuotaExceededError/SecurityError
 */
const memoryStore = new Map<string, string>();

/**
 * Checks if localStorage is functional in the active environment.
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__totg_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Universal safe storage accessor.
 * Provides error-isolated storage across web browsers, restricted iframes,
 * iOS Safari Private Browsing mode, and future native Capacitor webviews.
 */
export const safeStorage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;

    if (isLocalStorageAvailable()) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return memoryStore.get(key) || null;
      }
    }
    return memoryStore.get(key) || null;
  },

  setItem(key: string, value: string): boolean {
    if (typeof window === "undefined") return false;

    // Always mirror to memory store for instant resilience
    memoryStore.set(key, value);

    if (isLocalStorageAvailable()) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  },

  removeItem(key: string): void {
    memoryStore.delete(key);

    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignore
      }
    }
  },

  clear(): void {
    memoryStore.clear();

    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
      try {
        window.localStorage.clear();
      } catch {
        // Ignore
      }
    }
  },
};
