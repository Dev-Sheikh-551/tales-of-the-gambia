"use client";

import { usePlatform } from "@/hooks/usePlatform";

/**
 * Wrapper that applies the -mt-16 sm:-mt-20 offset on web
 * so the hero slides behind the transparent sticky nav.
 * On native (Capacitor), there is no top nav, so no offset is needed.
 */
export function HeroOffset({ children }: { children: React.ReactNode }) {
  const { isNative } = usePlatform();
  return (
    <div className={isNative ? "mt-0" : "-mt-16 sm:-mt-20"}>
      {children}
    </div>
  );
}
