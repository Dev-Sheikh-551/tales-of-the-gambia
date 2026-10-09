"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bookmark, Search } from "lucide-react";
import { SearchModal } from "@/components/ui/SearchModal";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { MobileBottomNav } from "./MobileBottomNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { favorites } = useStoryStorage();
  const favoritesCount = favorites.length;

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Is the navigation in the completely transparent state over the hero?
  const isTransparentOverHero = isHome && !isScrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out ${
          isTransparentOverHero
            ? "bg-transparent border-b border-transparent shadow-none py-4 sm:py-5 backdrop-blur-none [-webkit-backdrop-filter:none]"
            : isScrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl [-webkit-backdrop-filter:blur(16px)] border-b border-[var(--border-subtle)]/70 py-3 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)]"
            : "bg-[var(--bg-primary)] border-b border-transparent shadow-none py-4 sm:py-5 backdrop-blur-none [-webkit-backdrop-filter:none]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-lg p-1"
          >
            <span
              className={`font-story-serif text-xl sm:text-2xl font-normal tracking-tight transition-colors ${
                isTransparentOverHero ? "text-white" : "text-[var(--text-primary)]"
              }`}
            >
              Tales of{" "}
              <span
                className={`font-medium transition-colors ${
                  isTransparentOverHero ? "text-[#E0AB3A]" : "text-[var(--accent-ochre)]"
                }`}
              >
                The Gambia
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isTransparentOverHero
                  ? "text-[#E0AB3A] font-semibold"
                  : pathname === "/"
                  ? "text-[var(--accent-ochre)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/stories"
              className={`text-sm font-medium transition-colors ${
                isTransparentOverHero
                  ? "text-[#CBBCAE] hover:text-white"
                  : pathname.startsWith("/stories") && !pathname.includes("/stories/")
                  ? "text-[var(--accent-ochre)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Stories
            </Link>
            <Link
              href="/favorites"
              className={`text-sm font-medium transition-colors ${
                isTransparentOverHero
                  ? "text-[#CBBCAE] hover:text-white"
                  : pathname === "/favorites" || pathname === "/saved"
                  ? "text-[var(--accent-ochre)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Saved
            </Link>
          </nav>

          {/* Action Affordances: Search, Favorites, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] cursor-pointer ${
                isTransparentOverHero
                  ? "text-[#CBBCAE] hover:text-white hover:bg-white/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-label="Open search dialog"
              title="Search stories"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Saved / Favorites Trigger */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/favorites"
                className={`relative block p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                  isTransparentOverHero
                    ? "text-[#CBBCAE] hover:text-[#E0AB3A] hover:bg-white/10"
                    : "text-[var(--text-secondary)] hover:text-[var(--accent-ochre)]"
                }`}
                aria-label="View saved stories"
                title="Saved stories"
              >
                <Bookmark className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] text-white font-bold flex items-center justify-center shadow ${
                      isTransparentOverHero ? "bg-[#E0AB3A] text-[#1A1614]" : "bg-[var(--accent-ochre)]"
                    }`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle
              className={
                isTransparentOverHero
                  ? "bg-white/10 border-white/15 text-[#CBBCAE] hover:text-white hover:bg-white/20"
                  : ""
              }
            />
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Persistent Mobile Bottom Navigation (Home | Stories | Saved | Search) */}
      <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />
    </>
  );
}
