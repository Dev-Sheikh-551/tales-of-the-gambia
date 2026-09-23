"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Search,
  Menu,
  X,
  BookOpen,
  Home,
  Info,
} from "lucide-react";
import { SearchModal } from "@/components/ui/SearchModal";
import { useStoryStorage } from "@/hooks/useStoryStorage";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useStoryStorage();
  const favoritesCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#12100E]/90 backdrop-blur-md border-b border-[#2E2721] py-3 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D9732B] via-[#C69224] to-[#8C4318] p-[1.5px] shadow-md shadow-[#D9732B]/10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#1B1714] rounded-[10px] flex items-center justify-center">
                <span className="font-story-serif text-base font-bold text-[#F2C765]">
                  TG
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-story-serif text-lg sm:text-xl font-medium tracking-tight text-[#F7F3EB] group-hover:text-[#F2C765] transition-colors leading-none">
                Tales of The Gambia
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#AB9784] font-medium mt-1">
                Oral Lore & Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Story-First & Focused */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-[#F2C765]"
                  : "text-[#CBBCAE] hover:text-[#F7F3EB]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/stories"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/stories") && !pathname.includes("/stories/")
                  ? "text-[#F2C765]"
                  : "text-[#CBBCAE] hover:text-[#F7F3EB]"
              }`}
            >
              Stories
            </Link>
            <Link
              href="/favorites"
              className={`text-sm font-medium transition-colors ${
                pathname === "/favorites"
                  ? "text-[#F2C765]"
                  : "text-[#CBBCAE] hover:text-[#F7F3EB]"
              }`}
            >
              Saved
            </Link>
          </nav>

          {/* Action Affordances (Search, Favorites, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B1714] border border-[#2E2721] text-[#AB9784] hover:border-[#4A3E34] hover:text-[#F7F3EB] transition-all text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A]"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Search stories...</span>
              <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.2 bg-[#29231E] rounded text-[10px] text-[#857364]">
                ⌘K
              </kbd>
            </button>

            {/* Saved / Favorites Trigger */}
            <Link
              href="/favorites"
              className="relative p-2 rounded-full bg-[#1B1714] border border-[#2E2721] text-[#AB9784] hover:text-[#F2C765] hover:border-[#4A3E34] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A]"
              aria-label="View saved stories"
              title="Saved stories"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D9732B] text-[10px] text-white font-bold flex items-center justify-center shadow">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg bg-[#1B1714] border border-[#2E2721] text-[#CBBCAE] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Clean Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="relative w-full bg-[#171310] border-t border-[#3E352E] rounded-t-3xl p-6 shadow-2xl z-10"
          >
            {/* Drawer Handle */}
            <div className="w-12 h-1.5 bg-[#3E352E] rounded-full mx-auto mb-5" />

            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2E2721]">
              <span className="font-story-serif text-lg text-[#F7F3EB]">
                Tales of The Gambia
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#857364] hover:text-[#F7F3EB]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Button in Mobile Drawer */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#221D18] border border-[#2E2721] text-[#AB9784] hover:text-[#F7F3EB] text-sm"
            >
              <Search className="w-4 h-4 text-[#D9732B]" />
              <span>Search stories...</span>
            </button>

            {/* Clean Navigation Links */}
            <div className="mt-4 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-[#F7F3EB] hover:bg-[#221D18] transition-colors"
              >
                <Home className="w-4 h-4 text-[#E0AB3A]" />
                <span>Home</span>
              </Link>
              <Link
                href="/stories"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-[#F7F3EB] hover:bg-[#221D18] transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#D9732B]" />
                <span>Stories</span>
              </Link>
              <Link
                href="/favorites"
                className="flex items-center justify-between px-3 py-3 rounded-lg text-sm text-[#F7F3EB] hover:bg-[#221D18] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 text-[#F2C765]" />
                  <span>Saved Stories</span>
                </div>
                {favoritesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#D9732B] text-[10px] text-white font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-xs text-[#857364] hover:text-[#CBBCAE] transition-colors pt-2 border-t border-[#26201A] mt-2"
              >
                <Info className="w-3.5 h-3.5" />
                <span>About Tales of The Gambia</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
