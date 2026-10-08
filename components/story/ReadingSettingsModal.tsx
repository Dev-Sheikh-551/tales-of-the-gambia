"use client";

import React, { useEffect } from "react";
import { X, Type, Sun, Moon, Droplets, Check } from "lucide-react";
import { ReadingSettings } from "@/types/story";
import { registerBackButtonHandler } from "@/lib/native/backButton";

interface ReadingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onUpdateSettings: (newSettings: Partial<ReadingSettings>) => void;
}

export function ReadingSettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: ReadingSettingsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    return registerBackButtonHandler(() => {
      onClose();
      return true;
    });
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet / Modal Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reading Controls & Preferences"
        className="relative w-full sm:max-w-md bg-[#1C1713] border border-[#3E352E] rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl z-10 space-y-5 sm:space-y-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] max-h-[85vh] overflow-y-auto overscroll-contain"
      >
        {/* Grab Handle for Touch Devices */}
        <div className="w-12 h-1.5 bg-white/25 rounded-full mx-auto -mt-1 mb-2 sm:hidden" />

        <div className="flex items-center justify-between border-b border-[#2E2721] pb-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#E0AB3A]" />
            <h3 className="font-story-serif text-base sm:text-lg text-[#F7F3EB]">Reading Experience</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-[#CBBCAE] hover:text-white transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Font Size Adjuster */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#857364] font-medium block">
            Story Text Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(["sm", "base", "lg", "xl"] as const).map((size) => (
              <button
                key={size}
                onClick={() => onUpdateSettings({ fontSize: size })}
                className={`py-2.5 sm:py-2 px-3 min-h-[44px] rounded-xl border text-center transition-all cursor-pointer ${
                  settings.fontSize === size
                    ? "bg-[#D9732B] border-[#D9732B] text-white font-bold shadow-sm"
                    : "bg-[#241F1A] border-[#3A3026] text-[#AB9784] hover:text-[#F7F3EB]"
                }`}
              >
                <span className={size === "sm" ? "text-xs" : size === "base" ? "text-sm" : size === "lg" ? "text-base" : "text-lg"}>
                  Aa
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Atmosphere Theme Selector */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#857364] font-medium block">
            Reading Palette Mood
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onUpdateSettings({ theme: "midnight" })}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                settings.theme === "midnight"
                  ? "bg-[#12100E] border-[#E0AB3A] shadow-md shadow-black"
                  : "bg-[#16120F] border-[#2E2721] hover:border-[#4A3E34]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Moon className="w-4 h-4 text-[#F2C765]" />
                {settings.theme === "midnight" && <Check className="w-3.5 h-3.5 text-[#E0AB3A]" />}
              </div>
              <div>
                <div className="text-xs font-medium text-[#F7F3EB]">Midnight</div>
                <div className="text-[10px] text-[#857364]">Deep charcoal</div>
              </div>
            </button>

            <button
              onClick={() => onUpdateSettings({ theme: "parchment" })}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                settings.theme === "parchment"
                  ? "bg-[#F7F3EB] border-[#C45E1B] text-black shadow-md"
                  : "bg-[#F2ECE1] border-[#CBBCAE] text-[#1A1714] hover:opacity-90"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Sun className="w-4 h-4 text-[#C45E1B]" />
                {settings.theme === "parchment" && <Check className="w-3.5 h-3.5 text-[#C45E1B]" />}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1A1714]">Parchment</div>
                <div className="text-[10px] text-[#796C5F]">Warm daylight</div>
              </div>
            </button>

            <button
              onClick={() => onUpdateSettings({ theme: "river-dusk" })}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                settings.theme === "river-dusk"
                  ? "bg-[#0E181A] border-[#4B8590] shadow-md"
                  : "bg-[#101D20] border-[#243D42] hover:border-[#375E66]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Droplets className="w-4 h-4 text-[#97CDD6]" />
                {settings.theme === "river-dusk" && <Check className="w-3.5 h-3.5 text-[#4B8590]" />}
              </div>
              <div>
                <div className="text-xs font-medium text-[#F0F6F7]">River Dusk</div>
                <div className="text-[10px] text-[#6E949C]">Teal estuary</div>
              </div>
            </button>
          </div>
        </div>

        {/* Accessibility reduced motion switch */}
        <div className="pt-2 border-t border-[#2E2721] flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-[#F7F3EB]">Reduced Interface Motion</div>
            <div className="text-[10px] text-[#857364]">Calmer transitions for reading</div>
          </div>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
            className="w-4 h-4 accent-[#D9732B] rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
