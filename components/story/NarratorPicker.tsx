"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Check,
  Mic,
  Clock,
  Volume2,
  Info,
  Sparkles,
} from "lucide-react";
import { Narrator } from "@/types/narrator";
import { useNarrator } from "@/hooks/useNarrator";
import { MOTION_EASINGS } from "@/lib/motion/tokens";
import { registerBackButtonHandler } from "@/lib/native/backButton";

export interface NarratorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  onNarratorChanged?: (narratorId: string) => void;
}

export function NarratorPicker({
  isOpen,
  onClose,
  className = "",
  onNarratorChanged,
}: NarratorPickerProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    selectedNarratorId,
    selectedNarrator,
    allNarrators,
    selectNarrator,
  } = useNarrator();

  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-clear feedback notice after 4 seconds
  useEffect(() => {
    if (!feedbackNotice) return;
    const timer = setTimeout(() => {
      setFeedbackNotice(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [feedbackNotice]);

  // Register native Android back-button handler
  useEffect(() => {
    if (!isOpen) return;
    return registerBackButtonHandler(() => {
      onClose();
      return true;
    });
  }, [isOpen, onClose]);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-focus container when opened for accessibility
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  const handleSelect = (narrator: Narrator) => {
    if (!narrator.available) {
      setFeedbackNotice(
        `${narrator.name} is in production and coming soon. Narration currently uses ${selectedNarrator.name}.`
      );
      return;
    }

    const result = selectNarrator(narrator.id);
    if (result.success) {
      setFeedbackNotice(null);
      onNarratorChanged?.(narrator.id);
      // Brief pause for visual confirmation before auto-closing on mobile
      setTimeout(() => {
        onClose();
      }, 250);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sheetVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: "100%", scale: 0.98 },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.35, ease: MOTION_EASINGS.organic },
        },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: "100%",
          scale: 0.98,
          transition: { duration: 0.25, ease: MOTION_EASINGS.exit },
        },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="region"
          aria-label="Narrator Selection Modal Container"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal / Bottom Sheet Panel */}
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="narrator-picker-title"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full sm:max-w-lg max-h-[88vh] sm:max-h-[80vh] flex flex-col bg-[#14100D] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 pb-[env(safe-area-inset-bottom,0px)] ${className}`}
          >
            {/* Grab Handle for Touch Devices */}
            <div className="w-12 h-1.5 bg-white/25 rounded-full mx-auto my-3 sm:hidden" />

            {/* Header */}
            <header className="flex items-center justify-between px-5 py-3 sm:py-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D9732B]/15 border border-[#D9732B]/30 flex items-center justify-center text-[#F2C765]">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    id="narrator-picker-title"
                    className="font-story-serif text-base sm:text-lg font-semibold text-[#F7F3EB]"
                  >
                    Storyteller Voice
                  </h2>
                  <p className="text-xs text-[#857364]">
                    Choose the voice that brings this tale to life
                  </p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-[#CBBCAE] hover:text-white transition-colors cursor-pointer"
                aria-label="Close narrator selection"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Notification / Feedback Banner */}
            <AnimatePresence>
              {feedbackNotice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 py-2.5 bg-[#D9732B]/15 border-b border-[#D9732B]/30 flex items-start gap-2 text-xs text-[#F2C765]"
                >
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#E0AB3A]" />
                  <p className="leading-snug">{feedbackNotice}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Narrator Options List */}
            <div
              role="radiogroup"
              aria-label="Available Storytellers"
              className="p-4 sm:p-5 space-y-3 overflow-y-auto flex-1 overscroll-contain"
            >
              {allNarrators.map((narrator) => {
                const isSelected = narrator.id === selectedNarratorId;
                const isAvailable = narrator.available;

                return (
                  <div
                    key={narrator.id}
                    role="radio"
                    aria-checked={isSelected}
                    aria-disabled={!isAvailable}
                    tabIndex={isAvailable ? 0 : -1}
                    onClick={() => handleSelect(narrator)}
                    onKeyDown={(e) => {
                      if (isAvailable && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        handleSelect(narrator);
                      }
                    }}
                    className={`group relative p-3.5 sm:p-4 rounded-xl border transition-all select-none ${
                      isSelected
                        ? "bg-[#D9732B]/15 border-[#D9732B] shadow-[0_0_20px_rgba(217,115,43,0.18)]"
                        : isAvailable
                        ? "bg-white/[0.02] border-white/10 hover:border-[#D9732B]/50 hover:bg-white/[0.04] cursor-pointer"
                        : "bg-white/[0.01] border-white/5 opacity-55 cursor-not-allowed"
                    }`}
                  >
                    {/* Top Row: Name, Title & Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-story-serif text-sm sm:text-base font-semibold text-[#F7F3EB] group-hover:text-[#F2C765] transition-colors">
                          {narrator.name}
                        </span>
                        {narrator.title && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#AB9784]">
                            {narrator.title}
                          </span>
                        )}
                      </div>

                      {/* Status / Selection Indicator */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D9732B] text-white text-[11px] font-semibold tracking-wide shadow-sm">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>Active</span>
                          </span>
                        ) : isAvailable ? (
                          <span className="text-[11px] font-medium text-[#AB9784] group-hover:text-[#F2C765] transition-colors">
                            Select
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#857364]">
                            <Clock className="w-2.5 h-2.5" />
                            <span>Coming Soon</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Factual Description */}
                    <p className="text-xs text-[#AB9784] leading-relaxed mb-2.5">
                      {narrator.description}
                    </p>

                    {/* Bottom Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#857364]">
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3" />
                        <span>{narrator.accent}</span>
                      </span>
                      <span>•</span>
                      <span>{narrator.language}</span>
                      {narrator.credits && (
                        <>
                          <span>•</span>
                          <span className="text-[#6E5F53] truncate max-w-[200px]">
                            {narrator.credits}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <footer className="px-5 py-3 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-[#857364] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E0AB3A]" />
                <span>Selected voice persists across stories and cinematic mode</span>
              </div>
              <span className="font-mono text-[10px] text-[#6E5F53]">V2.0</span>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
