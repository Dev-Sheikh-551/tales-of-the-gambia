"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { App as CapApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { handleBackAction } from "@/lib/native/backButton";

/**
 * Initializes Capacitor native bridge features when running on a native platform (Android/iOS):
 * 1. Configures dark status bar (#12100E) and ensures overlay is false.
 * 2. Listens to Android hardware back button events:
 *    - Priority 1: Registered in-app handlers (SearchModal, ReadingSettings, NarratorPicker, CinematicMode)
 *    - Priority 2: In-app router back (if not at root `/`)
 *    - Priority 3: Exit app (CapApp.exitApp()) if already at root
 * 3. Listens to native app lifecycle events (appStateChange) to trigger document pause events when app goes to background.
 */
export function NativeBridgeInitializer() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    // 1. Android Status Bar styling
    const setupStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark }); // Light text on dark bg
        await StatusBar.setBackgroundColor({ color: "#12100E" });
        await StatusBar.setOverlaysWebView({ overlay: false });
      } catch (err) {
        console.warn("[NativeBridge] StatusBar setup error:", err);
      }
    };
    setupStatusBar();

    // 2. Hardware Back Button handling
    let backButtonHandle: { remove: () => void } | null = null;
    const setupBackButton = async () => {
      try {
        backButtonHandle = await CapApp.addListener("backButton", ({ canGoBack }) => {
          // Check if any in-app modal / view handler consumed the back press
          const consumed = handleBackAction();
          if (consumed) {
            return;
          }

          // If on a sub-route (e.g. /stories/[slug], /favorites, /about), navigate back
          if (pathname !== "/") {
            if (canGoBack || window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
            return;
          }

          // If at root homepage and no handlers are open, exit app cleanly
          CapApp.exitApp();
        });
      } catch (err) {
        console.warn("[NativeBridge] BackButton setup error:", err);
      }
    };
    setupBackButton();

    // 3. Native App Lifecycle (Pause / Resume)
    let appStateHandle: { remove: () => void } | null = null;
    const setupLifecycle = async () => {
      try {
        appStateHandle = await CapApp.addListener("appStateChange", ({ isActive }) => {
          if (!isActive) {
            // App went to background: pause audio elements to prevent background battery drain
            const audioElements = document.querySelectorAll("audio");
            audioElements.forEach((audio) => {
              try {
                if (!audio.paused) {
                  audio.pause();
                }
              } catch {
                // Ignore audio pause errors
              }
            });
          }
        });
      } catch (err) {
        console.warn("[NativeBridge] AppState setup error:", err);
      }
    };
    setupLifecycle();

    return () => {
      backButtonHandle?.remove();
      appStateHandle?.remove();
    };
  }, [pathname, router]);

  return null;
}
