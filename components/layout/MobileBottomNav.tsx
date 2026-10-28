"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Bookmark, Search } from "lucide-react";
import { useStoryStorage } from "@/hooks/useStoryStorage";

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export function MobileBottomNav({ onOpenSearch }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { favorites } = useStoryStorage();
  const favoritesCount = favorites.length;
  const [isCinematic, setIsCinematic] = useState(false);

  // Sync cinematic mode on client without bailing out Next.js static prerendering
  useEffect(() => {
    const checkCinematic = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      setIsCinematic(params.get("mode") === "cinematic");
    };

    checkCinematic();
    window.addEventListener("popstate", checkCinematic);
    return () => window.removeEventListener("popstate", checkCinematic);
  }, [pathname]);

  // Hide bottom nav if cinematic mode is active
  if (isCinematic) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isStoriesActive = pathname.startsWith("/stories");
  const isSavedActive =
    pathname === "/favorites" ||
    pathname === "/saved" ||
    pathname.startsWith("/favorites/") ||
    pathname.startsWith("/saved/");

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_rgba(0,0,0,0.25)] transition-all"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`relative flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 px-2.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
            isHomeActive
              ? "text-[var(--accent-gold)] font-semibold bg-[var(--accent-gold)]/10"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          aria-label="Home"
          aria-current={isHomeActive ? "page" : undefined}
        >
          {isHomeActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r from-[var(--accent-ochre)] to-[var(--accent-gold)] shadow-[0_0_8px_rgba(224,171,58,0.6)]"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <Home className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${isHomeActive ? "scale-105 stroke-[2.25]" : "stroke-2"}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* 2. Stories */}
        <Link
          href="/stories"
          className={`relative flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 px-2.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
            isStoriesActive
              ? "text-[var(--accent-gold)] font-semibold bg-[var(--accent-gold)]/10"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          aria-label="Story Library"
          aria-current={isStoriesActive ? "page" : undefined}
        >
          {isStoriesActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r from-[var(--accent-ochre)] to-[var(--accent-gold)] shadow-[0_0_8px_rgba(224,171,58,0.6)]"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <BookOpen className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${isStoriesActive ? "scale-105 stroke-[2.25]" : "stroke-2"}`} />
          <span className="text-[10px] tracking-tight">Stories</span>
        </Link>

        {/* 3. Saved */}
        <Link
          href="/favorites"
          className={`relative flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 px-2.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
            isSavedActive
              ? "text-[var(--accent-gold)] font-semibold bg-[var(--accent-gold)]/10"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          aria-label={`Saved stories (${favoritesCount})`}
          aria-current={isSavedActive ? "page" : undefined}
        >
          {isSavedActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r from-[var(--accent-ochre)] to-[var(--accent-gold)] shadow-[0_0_8px_rgba(224,171,58,0.6)]"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <div className="relative">
            <Bookmark className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${isSavedActive ? "scale-105 fill-current stroke-[2.25]" : "stroke-2"}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[var(--accent-ochre)] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Saved</span>
        </Link>

        {/* 4. Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="relative flex flex-col items-center justify-center min-w-[60px] min-h-[48px] py-1 px-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] cursor-pointer active:scale-95"
          aria-label="Search stories"
        >
          <Search className="w-5 h-5 mb-0.5 text-[var(--accent-gold)]" />
          <span className="text-[10px] font-medium tracking-tight">Search</span>
        </button>
      </div>
    </nav>
  );
}
