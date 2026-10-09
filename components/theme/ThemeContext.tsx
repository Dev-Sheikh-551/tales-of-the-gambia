"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = "totg_theme_preference";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from storage or system on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeState(stored);
      } else {
        // Default to dark to preserve existing application identity
        setThemeState("dark");
      }
    } catch {
      setThemeState("dark");
    }
    setMounted(true);
  }, []);

  // Compute resolved theme whenever theme changes
  useEffect(() => {
    const computed: ResolvedTheme =
      theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(computed);

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (computed === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      }
    }

    // Sync Capacitor Android status bar
    if (Capacitor.isNativePlatform()) {
      try {
        if (computed === "light") {
          StatusBar.setStyle({ style: Style.Light });
          StatusBar.setBackgroundColor({ color: "#FAF7F2" });
        } else {
          StatusBar.setStyle({ style: Style.Dark });
          StatusBar.setBackgroundColor({ color: "#12100E" });
        }
      } catch (err) {
        console.warn("[Theme] StatusBar sync error:", err);
      }
    }
  }, [theme]);

  // Listen for system theme changes if theme === "system"
  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => {
      const nextTheme = mediaQuery.matches ? "light" : "dark";
      setResolvedTheme(nextTheme);
      const root = document.documentElement;
      if (nextTheme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (err) {
      console.warn("[Theme] Failed to persist theme:", err);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
