# Building Android APK

## Option 1: EAS Build (Recommended - Cloud Build)

EAS Build builds your APK in the cloud, no Android SDK needed locally.

### Setup (One-time):
1. **Login to Expo:**
   ```bash
   npx eas-cli login
   ```

2. **Initialize EAS project:**
   ```bash
   npx eas-cli build:configure
   ```
   (This will create/update eas.json)

3. **Build APK:**
   ```bash
   npm run build:android:apk
   ```
   or for production:
   ```bash
   npm run build:android:apk:prod
   ```

The build will run in the cloud and you'll get a download link when it's done.

## Option 2: Local Build (Requires Android SDK)

If you want to build locally, you need:

1. **Install Android Studio:**
   - Download from: https://developer.android.com/studio
   - Install and complete setup wizard

2. **Set environment variables** in `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

3. **Reload shell:**
   ```bash
   source ~/.zshrc
   ```

4. **Build APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Current Status

- ✅ Android project prebuilt (android/ folder exists)
- ✅ Java installed
- ❌ Android SDK not configured
- ✅ EAS Build configured (eas.json created)

**Recommended:** Use EAS Build (Option 1) - it's faster and doesn't require local Android SDK setup.
