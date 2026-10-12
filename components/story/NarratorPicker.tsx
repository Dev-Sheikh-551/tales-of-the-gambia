"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Check, Mic } from "lucide-react";
import { Narrator } from "@/types/narrator";
import { useNarrator } from "@/hooks/useNarrator";
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
    allNarrators,
    selectNarrator,
  } = useNarrator();

  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-clear feedback notice after 3 seconds
  useEffect(() => {
    if (!feedbackNotice) return;
    const timer = setTimeout(() => {
      setFeedbackNotice(null);
    }, 3000);
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
      setFeedbackNotice(`${narrator.name} is coming soon`);
      return;
    }

    const result = selectNarrator(narrator.id);
    if (result.success) {
      setFeedbackNotice(null);
      onNarratorChanged?.(narrator.id);
      setTimeout(() => {
        onClose();
      }, 200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="region"
          aria-label="Narrator Selection Modal Container"
          className="fixed inset-0 z-50 select-none"
        >
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Floating Narrator Card matching Prototype Screenshot 1 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="narrator-picker-title"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 10 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 10 }
            }
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`fixed top-6 right-4 left-4 sm:left-auto sm:top-12 sm:right-12 z-50 w-full max-w-[340px] mx-auto sm:mx-0 bg-[#FAF6F0] dark:bg-[#1C1713] border border-[#E8DFD3]/80 dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col ${className}`}
          >
            {/* Header: Title on Left, Close button on Right */}
            <div className="flex items-center justify-between mb-4">
              <h2
                id="narrator-picker-title"
                className="font-story-serif text-lg font-medium text-[#2C241E] dark:text-[#F7F3EB]"
              >
                Narrator
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#8C7D6F] hover:text-[#2C241E] dark:text-[#A8988B] dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label="Close narrator selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Narrator Options List */}
            <div
              role="radiogroup"
              aria-label="Available Storytellers"
              className="space-y-2.5"
            >
              {allNarrators.map((narrator) => {
                const isSelected = narrator.id === selectedNarratorId;
                const isAvailable = narrator.available;
                const subtitle = isAvailable
                  ? "Warm storyteller"
                  : "Coming soon";

                return (
                  <div
                    key={narrator.id}
                    role="radio"
                    aria-checked={isSelected}
                    aria-disabled={!isAvailable}
                    tabIndex={isAvailable ? 0 : -1}
                    onClick={() => handleSelect(narrator)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(narrator);
                      }
                    }}
                    className={`p-3 rounded-2xl flex items-center justify-between transition-all select-none cursor-pointer ${
                      isSelected
                        ? "border border-[#7A3E1D] dark:border-[#D9732B] bg-[#F7F1E6] dark:bg-[#2A1F18]"
                        : "bg-[#F5EFE6]/70 dark:bg-white/[0.04] border border-transparent hover:bg-[#EFE8DD] dark:hover:bg-white/[0.07] opacity-85"
                    }`}
                  >
                    {/* Left: Round circle icon & Text details */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#EADDC9] dark:bg-white/10 text-[#5A4E42] dark:text-[#E0AB3A]"
                            : "bg-[#ECE4D8] dark:bg-white/5 text-[#9E9083] dark:text-[#6E5F53]"
                        }`}
                      >
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <div
                          className={`text-sm ${
                            isSelected
                              ? "font-semibold text-[#2C241E] dark:text-[#F7F3EB]"
                              : "font-medium text-[#6C5E51] dark:text-[#C5B7A8]"
                          }`}
                        >
                          {narrator.name}
                        </div>
                        <div
                          className={`text-xs ${
                            isSelected
                              ? "text-[#7A6C5D] dark:text-[#AB9784]"
                              : "text-[#A39587] dark:text-[#7A6A5D]"
                          }`}
                        >
                          {subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Right: Checkmark on active */}
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#7A3E1D] dark:text-[#D9732B] stroke-[2.5] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Subtle Feedback Banner if Coming Soon tapped */}
            <AnimatePresence>
              {feedbackNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-3 text-center text-xs text-[#7A6C5D] dark:text-[#AB9784]"
                >
                  {feedbackNotice}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
