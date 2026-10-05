/**
 * Web Storage Adapter — Cache Storage + IndexedDB implementation of OfflineStorageAdapter.
 *
 * This is the browser-native implementation. A future Capacitor adapter will implement
 * the same OfflineStorageAdapter interface using @capacitor/filesystem and @capacitor/preferences.
 *
 * Architecture rules:
 * - UI code never imports this file directly. It imports OfflineStorageAdapter from types/offline.ts.
 * - The download manager creates one instance and passes it via the hook.
 * - All binary asset blobs live in Cache Storage under the "totg-offline-v1" cache.
 * - All package metadata (JSON) lives in IndexedDB under "totg-offline" DB.
 */

import type {
  OfflineStorageAdapter,
  StoryOfflinePackage,
  OfflineStorageQuota,
} from "@/types/offline";

const CACHE_NAME = "totg-offline-v1";
const IDB_NAME = "totg-offline";
const IDB_VERSION = 1;
const STORE_PACKAGES = "packages";

// ---------------------------------------------------------------------------
// IndexedDB helpers
// ---------------------------------------------------------------------------

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_PACKAGES)) {
        db.createObjectStore(STORE_PACKAGES, { keyPath: "slug" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet<T>(
  db: IDBDatabase,
  storeName: string,
  key: string
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

function idbPut<T>(
  db: IDBDatabase,
  storeName: string,
  value: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).put(value);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function idbDelete(
  db: IDBDatabase,
  storeName: string,
  key: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function idbGetAll<T>(db: IDBDatabase, storeName: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

// ---------------------------------------------------------------------------
// Adapter implementation
// ---------------------------------------------------------------------------

export class WebStorageAdapter implements OfflineStorageAdapter {
  async isAvailable(): Promise<boolean> {
    if (typeof window === "undefined") return false;
    if (!("caches" in window)) return false;
    if (!("indexedDB" in window)) return false;
    try {
      await openDb();
      return true;
    } catch {
      return false;
    }
  }

  async saveAsset(url: string, data: Blob | ArrayBuffer): Promise<string> {
    const cache = await caches.open(CACHE_NAME);
    const blob =
      data instanceof Blob ? data : new Blob([data]);
    const response = new Response(blob);
    await cache.put(url, response);
    // Return the same URL — asset is now cached and fetch() will return it
    return url;
  }

  async getAssetUri(url: string): Promise<string | undefined> {
    const cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(url);
    if (!hit) return undefined;
    // For audio, we need a blob URL that <audio> can play offline
    const blob = await hit.blob();
    return URL.createObjectURL(blob);
  }

  async deleteAsset(url: string): Promise<boolean> {
    const cache = await caches.open(CACHE_NAME);
    return cache.delete(url);
  }

  async savePackageMetadata(pkg: StoryOfflinePackage): Promise<void> {
    const db = await openDb();
    await idbPut(db, STORE_PACKAGES, pkg);
  }

  async getPackageMetadata(slug: string): Promise<StoryOfflinePackage | undefined> {
    const db = await openDb();
    return idbGet<StoryOfflinePackage>(db, STORE_PACKAGES, slug);
  }

  async removePackage(slug: string): Promise<void> {
    const db = await openDb();
    await idbDelete(db, STORE_PACKAGES, slug);
  }

  async listDownloadedPackages(): Promise<StoryOfflinePackage[]> {
    const db = await openDb();
    return idbGetAll<StoryOfflinePackage>(db, STORE_PACKAGES);
  }

  async getStorageQuota(): Promise<OfflineStorageQuota> {
    const packages = await this.listDownloadedPackages();
    const usedBytes = packages.reduce((sum, p) => sum + p.totalSizeBytes, 0);

    let quotaBytes: number | undefined;
    let remainingBytes: number | undefined;

    if ("storage" in navigator && "estimate" in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        if (estimate.quota) quotaBytes = estimate.quota;
        if (estimate.quota && estimate.usage) {
          remainingBytes = estimate.quota - estimate.usage;
        }
      } catch {
        // quota API not available — leave undefined
      }
    }

    return {
      usedBytes,
      quotaBytes,
      storyCount: packages.length,
      remainingBytes,
    };
  }
}

// Singleton instance for browser usage
let _adapter: WebStorageAdapter | null = null;

export function getWebStorageAdapter(): WebStorageAdapter {
  if (!_adapter) {
    _adapter = new WebStorageAdapter();
  }
  return _adapter;
}
