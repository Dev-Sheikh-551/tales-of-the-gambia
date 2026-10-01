# Tales of The Gambia V2 — Mobile & Capacitor Architecture Assessment

## 1. Executive Summary

This document evaluates the architectural readiness of *Tales of The Gambia* for native mobile distribution via **Capacitor** (targeting Android APK/AAB and iOS IPA) while maintaining unified codebase parity with the existing Next.js web application.

The primary objective for V2 is to deliver a downloadable, native-grade storytelling experience with **full offline capabilities**, uninterrupted background audio narration, expressive mobile-first motion, and responsive performance on budget-to-flagship mobile devices.

---

## 2. Current Architecture Overview

| Layer | Implementation in V1 | V2 Evolution Target |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.5 (Turbopack, App Router) | Static export (`output: 'export'`) |
| **Rendering** | Static Site Generation (`generateStaticParams`) | 100% pre-rendered client-side application |
| **Audio** | Native `HTMLAudioElement` + custom hook | Hybrid: `HTMLAudioElement` + Capacitor Audio bridge |
| **State & Storage**| `localStorage` with window event sync | `safeStorage` (in-memory fallback) → Capacitor Preferences / Filesystem |
| **Motion** | Framer Motion v13.3 + CSS animations | Token-driven Framer Motion + Lottie + Hardware CSS |
| **Styling** | Tailwind CSS v4 + Storybook Serif typography | Responsive mobile-first touch ergonomics |
| **Stories Collection** | 29 stories, 133 scenes, 1,023 synced cues | Fully indexed, offline-packageable story bundles |

---

## 3. Capacitor Compatibility Assessment

Capacitor embeds modern web applications into native WebView containers (Android WebView / iOS WKWebView) and exposes native device APIs via bidirectional TypeScript plugins.

### 3.1 Static Export Compatibility (`output: 'export'`)

* **Status:** Fully compatible.
* **Findings:**
  - *Tales of The Gambia* already uses pure static generation across all routes:
    - `/` (Home / Featured Showcase)
    - `/stories` (Story Library & Filter)
    - `/stories/[slug]` (Reading & Cinematic Viewports, backed by `generateStaticParams`)
    - `/favorites` (Bookmarked Stories)
    - `/categories` (Thematic Taxonomy)
    - `/about` (Cultural Provenance & Project Mission)
  - No server-side runtime APIs (`getServerSideProps`, Server Actions, or dynamic Next.js API route handlers) are required to read or narrate stories.
  - Adding `output: 'export'` to `next.config.ts` outputs a standalone `./out` directory with pure HTML, CSS, JS, and media assets ready to be copied into Capacitor's `www/` folder.

### 3.2 Image Optimization Considerations (`next/image`)

* **Risk:** Standard Next.js `<Image>` relies on an on-demand Node.js image optimization server (`/_next/image`), which is unavailable in a static Capacitor bundle.
* **Mitigation:**
  - For standard static builds targeting Capacitor, `images: { unoptimized: true }` in `next.config.ts` allows SVGs and local WebP/JPEG files to load directly from local assets.
  - The project currently renders rich SVG-based visual artwork via `<StoryArt />`, which has zero external network or image optimization dependencies.

### 3.3 Audio Subsystem & Background Playback

* **Web Current State:**
  - The audio engine uses native `HTMLAudioElement` encapsulated in `hooks/useStoryAudio.ts`.
  - Cues are loaded via local JSON files bundled in `data/audio/cues/`.
* **Capacitor Mobile Challenges:**
  1. **Background Audio & Lockscreen Controls:** Standard mobile WebViews pause or throttle audio timers when the device screen locks or the user switches apps.
  2. **Autoplay Restrictions:** Mobile OS policies require an initial user gesture before audio can play.
* **V2 Native Audio Strategy:**
  - Web: Continue utilizing `HTMLAudioElement` as the default engine.
  - Mobile (Capacitor): Use `@capacitor-community/media-session` to register media metadata (Story Title, Scene Number, Griot Narrator Name, Artwork) on Android Notification Shade and iOS Control Center.
  - For true background audio on low-memory Android devices, integrate `@capacitor-community/native-audio` or a background audio service plugin that keeps audio playing when the screen is dark.

### 3.4 Local Storage & File System

* **Web Current State:** `localStorage` with window event broadcasting.
* **Capacitor Considerations:**
  - `localStorage` in mobile WebViews can be purged by iOS under low-disk pressure and has a 5MB–10MB hard quota.
  - Storing downloaded offline narration MP3s (average 2MB–6MB per story, total ~41MB for all 29 stories) requires real filesystem storage.
* **V2 Offline Storage Strategy:**
  - **Metadata & Settings (Favorites, Reading Progress, Audio Settings):** Use `safeStorage` (which will bridge to `@capacitor/preferences` for native persistence).
  - **Offline Media & Packages:** Use `@capacitor/filesystem` (or IndexedDB on web) to stream and store audio files in the device's `Directory.Data` sandbox, completely bypassing WebView storage quotas.

---

## 4. Potential Blockers & Architectural Solutions

| Blocker / Risk | Severity | Architectural Solution |
| :--- | :--- | :--- |
| **Hardcoded absolute URLs** | Low | All audio and image paths in story data use relative paths (e.g. `/audio/stories/...`). Capacitor's local web server maps these cleanly to `http://localhost/` or `capacitor://localhost/`. |
| **WebView viewport safe-areas** | Medium | Notch/home indicator overlaps on modern iPhones and Android devices with camera cutouts. Handled in V2 using CSS `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` applied to navigation headers and bottom transport controls. |
| **Network connectivity detection** | Low | Integrate `@capacitor/network` or `navigator.onLine` to smoothly update offline package status indicators. |
| **Large bundle size** | Low | Audio files are separated into distinct per-story folders in `public/audio/stories/`. Users download stories on demand rather than bundling 41MB into the core app binary. |

---

## 5. Offline Story Packaging Architecture

In V2, each story can be packaged as a discrete, verifiable bundle defined by `StoryOfflinePackage` (`types/offline.ts`):

```text
Story Package ("the-clever-hare-and-the-great-drought")
├── Story Metadata & Scenes (JSON)
├── Scene Narration Audio (scene-01.mp3 ... scene-06.mp3)
├── Word Synchronization Cues (scene-01.json ... scene-06.json)
└── Illustration & Visual Themes (StoryArt vectors / Cover artwork)
```

### Download Flow:
1. **Request:** User taps "Download for Offline Reading" (or auto-downloads on story start if configured).
2. **Manifest Generation:** `generateStoryOfflineManifest(story, narratorId)` calculates expected asset URLs, total bytes, and checksums.
3. **Chunked Download:** Assets are fetched via background workers and saved to `@capacitor/filesystem` (Native) or IndexedDB (Web).
4. **Resolution:** When in offline mode, `resolveSceneNarration` intercepts the remote URL and serves the local device URI (`capacitor://localhost/_offline/...`).

---

## 6. Implementation Roadmap to V2

```text
Phase 1 (Current)   Architecture & types, narrator model, motion tokens, storage isolation
Phase 2             Offline storage engine (IndexedDB on Web, Capacitor FileSystem bridge)
Phase 3             Multi-narrator selection UI & audio switching
Phase 4             Lottie animation integration for expressive storytelling moments
Phase 5             Capacitor initialization (android/ and ios/ native shell generation)
Phase 6             Native QA, safe-area ergonomics, app store packaging
```
