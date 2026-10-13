# Tales of The Gambia — Android Release & Production Guide

This guide details the release architecture, signing configuration, build procedures, and verification steps for publishing **Tales of The Gambia** (`com.talesofthegambia.app`).

---

## 1. Release Configuration Overview

| Property | Value | Source |
|---|---|---|
| **Application ID** | `com.talesofthegambia.app` | `android/app/build.gradle` & `capacitor.config.ts` |
| **Namespace** | `com.talesofthegambia.app` | `android/app/build.gradle` |
| **App Name** | `Tales of The Gambia` | `android/app/src/main/res/values/strings.xml` |
| **Current versionCode** | `1` | `android/app/build.gradle` |
| **Current versionName** | `1.0` | `android/app/build.gradle` |
| **minSdkVersion** | `24` (Android 7.0) | `android/variables.gradle` |
| **compileSdkVersion** | `36` (Android 16) | `android/variables.gradle` |
| **targetSdkVersion** | `36` (Android 16) | `android/variables.gradle` |
| **Minification / ProGuard** | `false` (Web bundle in Capacitor assets) | `android/app/build.gradle` |

---

## 2. Keystore Generation (One-Time Setup)

> **Important:** The production keystore must **never** be committed to version control. Keep multiple encrypted backups of this file and its passwords.

Generate a standard RSA 2048-bit release keystore:

```bash
keytool -genkey -v \
  -keystore tales-of-the-gambia-release.jks \
  -alias talesofthegambia \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store `tales-of-the-gambia-release.jks` in a secure location outside the repository (e.g., password manager, secret vault, or a dedicated local directory not tracked by Git).

---

## 3. Supplying Signing Credentials Securely

The build system in `android/app/build.gradle` supports two secure methods for supplying signing credentials:

### Option A: Local Properties File (Recommended for Local Development)

Create an ignored properties file named `signing.properties` inside the `android/` directory (already added to `.gitignore`):

File: `android/signing.properties`
```properties
storeFile=C:\\path\\to\\tales-of-the-gambia-release.jks
storePassword=YourStorePasswordHere
keyAlias=talesofthegambia
keyPassword=YourKeyPasswordHere
```

*Note: Use double backslashes `\\` or forward slashes `/` for Windows paths in properties files.*

### Option B: Environment Variables (Recommended for CI/CD)

Set the following environment variables in your terminal session or CI/CD secret manager:

```powershell
$env:KEY_STORE_FILE = "C:\path\to\tales-of-the-gambia-release.jks"
$env:KEY_STORE_PASSWORD = "YourStorePasswordHere"
$env:KEY_ALIAS = "talesofthegambia"
$env:KEY_PASSWORD = "YourKeyPasswordHere"
```

Or on Linux/macOS:

```bash
export KEY_STORE_FILE="/path/to/tales-of-the-gambia-release.jks"
export KEY_STORE_PASSWORD="YourStorePasswordHere"
export KEY_ALIAS="talesofthegambia"
export KEY_PASSWORD="YourKeyPasswordHere"
```

---

## 4. Complete Build Workflow

Always run the full build pipeline from the repository root:

```powershell
# 1. Typecheck TypeScript
npx tsc --noEmit

# 2. Compile static Next.js export into out/
npm run build

# 3. Synchronize static assets and plugins into Android project
npx cap sync android

# 4. Navigate to android directory
cd android
```

### Building Release Artifacts

#### A. Release APK
```powershell
.\gradlew assembleRelease
```
- **If credentials are provided**: Produces a signed APK at `android/app/build/outputs/apk/release/app-release.apk`.
- **If credentials are not yet provided**: Produces an unsigned APK at `android/app/build/outputs/apk/release/app-release-unsigned.apk` for external manual or CI signing.

#### B. Android App Bundle (AAB) for Google Play
```powershell
.\gradlew bundleRelease
```
- Produces `android/app/build/outputs/bundle/release/app-release.aab`.
- If Google Play App Signing is enabled in Play Console, you can upload this bundle or sign it using the Play Console deployment key.

---

## 5. Installing and Testing on a Physical Android Device

### Testing the Debug APK
```powershell
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Testing a Signed Release APK
```powershell
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

### Testing an App Bundle (AAB) Locally via Bundletool
To test the exact `.aab` prior to Google Play submission:
```powershell
bundletool build-apks --bundle=android/app/build/outputs/bundle/release/app-release.aab --output=app.apks --mode=universal
bundletool install-apks --apks=app.apks
```

---

## 6. Version Management for Subsequent Releases

For every new release uploaded to Google Play:

1. Open `android/app/build.gradle`.
2. Increment `versionCode` by 1:
   ```groovy
   versionCode 2      // Must strictly increase with each Play Store upload
   versionName "1.1"  // User-facing version string
   ```
3. Re-run `npm run build`, `npx cap sync android`, and `.\gradlew bundleRelease`.

---

## 7. Pre-Submission Checklist

- [x] TypeScript validation clean (`npx tsc --noEmit` exits 0).
- [x] Next.js export clean (`npm run build` generates all 38 routes into `out/`).
- [x] Capacitor assets synced (`android/app/src/main/assets/public/`).
- [x] Package identifier verified: `com.talesofthegambia.app`.
- [x] App label verified: `Tales of The Gambia`.
- [x] Launcher icons & adaptive mipmaps configured in `@mipmap/ic_launcher`.
- [x] Splash screen & themes aligned with `#12100E` brand palette.
- [x] Release packaging pipeline verified (`assembleRelease` & `bundleRelease` succeed).
- [x] Signing credentials protected via `android/.gitignore` (`*.jks`, `*.keystore`, `signing.properties`).
- [ ] Production keystore generated and safely archived off-repo.
- [ ] Release APK / AAB signed with production key.
- [ ] Tested on target physical device using release build.
