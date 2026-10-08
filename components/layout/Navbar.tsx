"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
import { MOTION_EASINGS } from "@/lib/motion/tokens";
import { MobileBottomNav } from "./MobileBottomNav";

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

  const navItemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.08 + custom * 0.05,
        duration: 0.35,
        ease: MOTION_EASINGS.enter,
      },
    }),
  };

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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D9732B] via-[#C69224] to-[#8C4318] p-[1.5px] shadow-md shadow-[#D9732B]/10 transition-transform duration-300"
            >
              <div className="w-full h-full bg-[#1B1714] rounded-[10px] flex items-center justify-center">
                <span className="font-story-serif text-base font-bold text-[#F2C765]">
                  TG
                </span>
              </div>
            </motion.div>
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
            {/* Search Trigger with Tactile Press */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B1714] border border-[#2E2721] text-[#AB9784] hover:border-[#4A3E34] hover:text-[#F7F3EB] transition-all text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] cursor-pointer"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Search stories...</span>
              <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.2 bg-[#29231E] rounded text-[10px] text-[#857364]">
                ⌘K
              </kbd>
            </motion.button>

            {/* Saved / Favorites Trigger with Tactile Press */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/favorites"
                className="relative block p-2 rounded-full bg-[#1B1714] border border-[#2E2721] text-[#AB9784] hover:text-[#F2C765] hover:border-[#4A3E34] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A]"
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
            </motion.div>

            {/* Mobile Hamburger Menu Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg bg-[#1B1714] border border-[#2E2721] text-[#CBBCAE] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0AB3A] cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer with Staggered Entrance & Gestures */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Sheet */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-full bg-[#171310] border-t border-[#3E352E] rounded-t-3xl p-6 shadow-2xl z-10 select-none"
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1.5 bg-[#3E352E] rounded-full mx-auto mb-5" />

              {/* Header in Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2E2721]">
                <span className="font-story-serif text-lg text-[#F7F3EB]">
                  Tales of The Gambia
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#857364] hover:text-[#F7F3EB] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Search Button in Mobile Drawer */}
              <motion.button
                custom={0}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#221D18] border border-[#2E2721] text-[#AB9784] hover:text-[#F7F3EB] text-sm cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#D9732B]" />
                <span>Search stories...</span>
              </motion.button>

              {/* Staggered Navigation Links */}
              <div className="mt-4 space-y-1">
                <motion.div custom={1} initial="hidden" animate="visible" variants={navItemVariants}>
                  <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                      pathname === "/" ? "bg-[#221D18] text-[#F2C765]" : "text-[#F7F3EB] hover:bg-[#221D18]"
                    }`}
                  >
                    <Home className="w-4 h-4 text-[#E0AB3A]" />
                    <span>Home</span>
                  </Link>
                </motion.div>
                <motion.div custom={2} initial="hidden" animate="visible" variants={navItemVariants}>
                  <Link
                    href="/stories"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                      pathname.startsWith("/stories") ? "bg-[#221D18] text-[#F2C765]" : "text-[#F7F3EB] hover:bg-[#221D18]"
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-[#D9732B]" />
                    <span>Stories</span>
                  </Link>
                </motion.div>
                <motion.div custom={3} initial="hidden" animate="visible" variants={navItemVariants}>
                  <Link
                    href="/favorites"
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors ${
                      pathname === "/favorites" ? "bg-[#221D18] text-[#F2C765]" : "text-[#F7F3EB] hover:bg-[#221D18]"
                    }`}
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
                </motion.div>
                <motion.div custom={4} initial="hidden" animate="visible" variants={navItemVariants}>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-xs text-[#857364] hover:text-[#CBBCAE] transition-colors pt-2 border-t border-[#26201A] mt-2"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>About Tales of The Gambia</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent Mobile Bottom Navigation (Home | Stories | Saved | Search) */}
      <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />
    </>
  );
}
