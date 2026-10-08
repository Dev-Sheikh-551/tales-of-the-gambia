/**
 * Capacitor Storage Adapter — Native Android Filesystem implementation of OfflineStorageAdapter.
 *
 * Uses:
 * - @capacitor/filesystem: Application-private persistent data directory (Directory.Data)
 * - @capacitor/preferences: Fast local key-value metadata store
 *
 * Architecture:
 * - Private files reside under `TalesOfTheGambia/` in Directory.Data
 *   - Audio files: `TalesOfTheGambia/assets/{hashed_or_sanitized_name}.mp3`
 *   - Lottie/Visual assets: `TalesOfTheGambia/assets/{name}`
 *   - Packages: `TalesOfTheGambia/packages/{slug}.json`
 * - Audio Playback URI:
 *   - On Android Capacitor, Filesystem.getUri({ directory: Directory.Data, path: ... })
 *     returns `file:///data/user/0/com.talesofthegambia.app/files/...`
 *   - Capacitor.convertFileSrc(nativeUri) converts this to:
 *     `https://localhost/_capacitor_file_/data/user/0/...`
 *     which Android's WebView can natively stream/seek/play via HTMLAudioElement without loading
 *     the full file into memory.
 */

import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import type {
  OfflineStorageAdapter,
  StoryOfflinePackage,
  OfflineStorageQuota,
} from "@/types/offline";

const BASE_DIR = "TalesOfTheGambia";
const ASSETS_SUBDIR = `${BASE_DIR}/assets`;
const PACKAGES_SUBDIR = `${BASE_DIR}/packages`;
const PREF_PACKAGE_LIST = "totg_offline_packages_list";

/**
 * Convert arbitrary URL into a safe, deterministic filename within our private storage
 */
function sanitizeFilename(url: string): string {
  // Strip origin or protocol if any
  let clean = url.replace(/^[a-zA-Z]+:\/\/[^/]+\//, "").replace(/^\//, "");
  // Replace slashes and unsafe characters with underscores
  clean = clean.replace(/[/\\?%*:|"<>]/g, "_");
  // Limit length while keeping extension
  if (clean.length > 80) {
    const extMatch = clean.match(/\.[0-9a-z]+$/i);
    const ext = extMatch ? extMatch[0] : "";
    clean = clean.substring(0, 70) + ext;
  }
  return clean;
}

/**
 * Convert Blob or ArrayBuffer to base64 for writing to Capacitor Filesystem
 */
async function blobToBase64(blobOrBuffer: Blob | ArrayBuffer): Promise<string> {
  const blob = blobOrBuffer instanceof Blob ? blobOrBuffer : new Blob([blobOrBuffer]);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      // dataUrl format: data:[<mediatype>];base64,<data>
      const base64Index = dataUrl.indexOf(",");
      if (base64Index !== -1) {
        resolve(dataUrl.substring(base64Index + 1));
      } else {
        resolve(dataUrl);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export class CapacitorStorageAdapter implements OfflineStorageAdapter {
  private initialized = false;

  private async ensureDirectories(): Promise<void> {
    if (this.initialized) return;
    try {
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: BASE_DIR,
        recursive: true,
      });
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: ASSETS_SUBDIR,
        recursive: true,
      });
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: PACKAGES_SUBDIR,
        recursive: true,
      });
      this.initialized = true;
    } catch {
      // If directories already exist, mark initialized
      this.initialized = true;
    }
  }

  async isAvailable(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    try {
      await this.ensureDirectories();
      return true;
    } catch {
      return false;
    }
  }

  async saveAsset(url: string, data: Blob | ArrayBuffer): Promise<string> {
    await this.ensureDirectories();
    const filename = sanitizeFilename(url);
    const relativePath = `${ASSETS_SUBDIR}/${filename}`;
    const base64Data = await blobToBase64(data);

    await Filesystem.writeFile({
      directory: Directory.Data,
      path: relativePath,
      data: base64Data,
      recursive: true,
    });

    const fileUriResult = await Filesystem.getUri({
      directory: Directory.Data,
      path: relativePath,
    });

    // Convert native file:// URI to WebView-streamable https://localhost/_capacitor_file_/...
    return Capacitor.convertFileSrc(fileUriResult.uri);
  }

  async getAssetUri(url: string): Promise<string | undefined> {
    try {
      await this.ensureDirectories();
      const filename = sanitizeFilename(url);
      const relativePath = `${ASSETS_SUBDIR}/${filename}`;

      // Stat file to confirm existence and non-zero size
      const stat = await Filesystem.stat({
        directory: Directory.Data,
        path: relativePath,
      });

      if (!stat || stat.size === 0) {
        return undefined;
      }

      const fileUriResult = await Filesystem.getUri({
        directory: Directory.Data,
        path: relativePath,
      });

      return Capacitor.convertFileSrc(fileUriResult.uri);
    } catch {
      return undefined;
    }
  }

  async deleteAsset(url: string): Promise<boolean> {
    try {
      await this.ensureDirectories();
      const filename = sanitizeFilename(url);
      const relativePath = `${ASSETS_SUBDIR}/${filename}`;
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: relativePath,
      });
      return true;
    } catch {
      return false;
    }
  }

  async savePackageMetadata(pkg: StoryOfflinePackage): Promise<void> {
    await this.ensureDirectories();
    const packagePath = `${PACKAGES_SUBDIR}/${pkg.slug}.json`;

    // Save package json file
    await Filesystem.writeFile({
      directory: Directory.Data,
      path: packagePath,
      data: JSON.stringify(pkg),
      encoding: "utf8" as any,
      recursive: true,
    });

    // Update package slug index in Preferences for quick enumeration
    try {
      const pref = await Preferences.get({ key: PREF_PACKAGE_LIST });
      const currentList: string[] = pref.value ? JSON.parse(pref.value) : [];
      if (!currentList.includes(pkg.slug)) {
        currentList.push(pkg.slug);
        await Preferences.set({
          key: PREF_PACKAGE_LIST,
          value: JSON.stringify(currentList),
        });
      }
    } catch (e) {
      console.warn("[CapacitorStorageAdapter] Preferences index update failed:", e);
    }
  }

  async getPackageMetadata(slug: string): Promise<StoryOfflinePackage | undefined> {
    try {
      await this.ensureDirectories();
      const packagePath = `${PACKAGES_SUBDIR}/${slug}.json`;
      const res = await Filesystem.readFile({
        directory: Directory.Data,
        path: packagePath,
        encoding: "utf8" as any,
      });

      if (!res.data) return undefined;
      const content = typeof res.data === "string" ? res.data : JSON.stringify(res.data);
      return JSON.parse(content) as StoryOfflinePackage;
    } catch {
      return undefined;
    }
  }

  async removePackage(slug: string): Promise<void> {
    try {
      await this.ensureDirectories();
      const packagePath = `${PACKAGES_SUBDIR}/${slug}.json`;
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: packagePath,
      });
    } catch {
      // Ignore if file doesn't exist
    }

    try {
      const pref = await Preferences.get({ key: PREF_PACKAGE_LIST });
      if (pref.value) {
        const currentList: string[] = JSON.parse(pref.value);
        const filtered = currentList.filter((s) => s !== slug);
        await Preferences.set({
          key: PREF_PACKAGE_LIST,
          value: JSON.stringify(filtered),
        });
      }
    } catch {
      // Ignore preference errors
    }
  }

  async listDownloadedPackages(): Promise<StoryOfflinePackage[]> {
    const packages: StoryOfflinePackage[] = [];
    try {
      await this.ensureDirectories();
      const pref = await Preferences.get({ key: PREF_PACKAGE_LIST });
      const slugs: string[] = pref.value ? JSON.parse(pref.value) : [];

      for (const slug of slugs) {
        const pkg = await this.getPackageMetadata(slug);
        if (pkg) {
          packages.push(pkg);
        }
      }
    } catch {
      // Fallback: list directory directly
      try {
        const dirList = await Filesystem.readdir({
          directory: Directory.Data,
          path: PACKAGES_SUBDIR,
        });
        for (const file of dirList.files) {
          const name = typeof file === "string" ? file : file.name;
          if (name.endsWith(".json")) {
            const slug = name.replace(/\.json$/, "");
            const pkg = await this.getPackageMetadata(slug);
            if (pkg) packages.push(pkg);
          }
        }
      } catch {
        // Return whatever was collected
      }
    }
    return packages;
  }

  async getStorageQuota(): Promise<OfflineStorageQuota> {
    const packages = await this.listDownloadedPackages();
    const usedBytes = packages.reduce((sum, p) => sum + (p.totalSizeBytes || 0), 0);

    return {
      usedBytes,
      storyCount: packages.length,
    };
  }
}

let _capacitorAdapter: CapacitorStorageAdapter | null = null;

export function getCapacitorStorageAdapter(): CapacitorStorageAdapter {
  if (!_capacitorAdapter) {
    _capacitorAdapter = new CapacitorStorageAdapter();
  }
  return _capacitorAdapter;
}
