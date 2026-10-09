"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      type="button"
      className={`relative flex items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] cursor-pointer ${
        size === "sm" ? "w-8 h-8" : "w-9 h-9"
      } ${
        className
          ? className
          : "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-prominent)]"
      }`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isDark ? (
          <Sun className={size === "sm" ? "w-4 h-4 text-[#F2C765]" : "w-4 h-4 text-[#F2C765]"} />
        ) : (
          <Moon className={size === "sm" ? "w-4 h-4 text-[#5C5248]" : "w-4 h-4 text-[#5C5248]"} />
        )}
      </motion.div>
    </motion.button>
  );
}
