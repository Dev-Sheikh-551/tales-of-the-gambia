# Tales of The Gambia — Android Release Build Guide

## Keystore Setup (one-time)

The keystore is NOT committed to the repository.

Generate a keystore using `keytool` (bundled with any JDK):

```bash
keytool -genkey -v \
  -keystore tales-of-the-gambia-release.jks \
  -alias talesofthegambia \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store the resulting `.jks` file in a secure location **outside** this repository.

## Signing Configuration

Add the following to `android/app/build.gradle` inside `android {}`:

```groovy
signingConfigs {
    release {
        keyAlias System.getenv("KEY_ALIAS") ?: "talesofthegambia"
        keyPassword System.getenv("KEY_PASSWORD")
        storeFile file(System.getenv("KEY_STORE_FILE") ?: "../tales-of-the-gambia-release.jks")
        storePassword System.getenv("KEY_STORE_PASSWORD")
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
    }
}
```

Or set in `~/.gradle/gradle.properties` (outside the repo):

```properties
TOTG_KEY_ALIAS=talesofthegambia
TOTG_KEY_PASSWORD=your_key_password
TOTG_STORE_FILE=/path/to/tales-of-the-gambia-release.jks
TOTG_STORE_PASSWORD=your_store_password
```

## Build Commands

All commands require `JAVA_HOME` pointing to JDK 21.

### Debug APK (no signing key required)
```bash
cd android
.\gradlew.bat assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Unsigned Release APK
```bash
cd android
.\gradlew.bat assembleRelease
# Output: android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### Signed Release APK (after keystore setup)
```bash
cd android
.\gradlew.bat assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

### Android App Bundle (AAB) for Play Store
```bash
cd android
.\gradlew.bat bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

## Version Management

Version info lives in `android/app/build.gradle`:

```groovy
defaultConfig {
    versionCode 1      // Integer, increment for each release
    versionName "1.0"  // Human-readable version
}
```

Increment `versionCode` for every Play Store upload.

## Environment Variables for CI/CD

```
JAVA_HOME=<path to JDK 21>
ANDROID_HOME=<path to Android SDK>
KEY_ALIAS=talesofthegambia
KEY_PASSWORD=<secret>
KEY_STORE_FILE=<absolute path to .jks>
KEY_STORE_PASSWORD=<secret>
```

Never commit these values to the repository.
