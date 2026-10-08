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
  const isStoriesActive = pathname.startsWith("/stories") && !pathname.includes("/stories/");
  const isSavedActive = pathname === "/favorites";

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#14100E]/95 backdrop-blur-lg border-t border-[#2E2721] px-3 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl transition-all"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] ${
            isHomeActive ? "text-[#F2C765]" : "text-[#857364] hover:text-[#CBBCAE]"
          }`}
          aria-label="Home"
          aria-current={isHomeActive ? "page" : undefined}
        >
          {isHomeActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A]"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </Link>

        {/* 2. Stories */}
        <Link
          href="/stories"
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] ${
            isStoriesActive ? "text-[#F2C765]" : "text-[#857364] hover:text-[#CBBCAE]"
          }`}
          aria-label="Story Library"
          aria-current={isStoriesActive ? "page" : undefined}
        >
          {isStoriesActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A]"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Stories</span>
        </Link>

        {/* 3. Saved */}
        <Link
          href="/favorites"
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] ${
            isSavedActive ? "text-[#F2C765]" : "text-[#857364] hover:text-[#CBBCAE]"
          }`}
          aria-label={`Saved stories (${favoritesCount})`}
          aria-current={isSavedActive ? "page" : undefined}
        >
          {isSavedActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A]"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <div className="relative">
            <Bookmark className={`w-5 h-5 mb-0.5 ${isSavedActive ? "fill-current" : ""}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#D9732B] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Saved</span>
        </Link>

        {/* 4. Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl text-[#857364] hover:text-[#CBBCAE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] cursor-pointer"
          aria-label="Search stories"
        >
          <Search className="w-5 h-5 mb-0.5 text-[#E0AB3A]" />
          <span className="text-[10px] font-medium tracking-tight">Search</span>
        </button>
      </div>
    </nav>
  );
}
