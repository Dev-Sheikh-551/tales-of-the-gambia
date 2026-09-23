"use client";

import React from "react";
import { CATEGORIES } from "@/data/stories";
import { StoryCategory } from "@/types/story";
import { Compass, Moon, Sparkles, Feather, Shield, Baby } from "lucide-react";

interface CategoryBrowserProps {
  selectedCategory: StoryCategory | "all";
  onSelectCategory: (category: StoryCategory | "all") => void;
}

export default function CategoryBrowser({
  selectedCategory,
  onSelectCategory,
}: CategoryBrowserProps) {
  const getCategoryIcon = (id: StoryCategory | "all") => {
    switch (id) {
      case "folktale":
        return <Feather className="w-4 h-4 text-[#F2C765]" />;
      case "fable":
        return <Sparkles className="w-4 h-4 text-[#D9732B]" />;
      case "legend":
        return <Compass className="w-4 h-4 text-[#4B8590]" />;
      case "historical":
        return <Shield className="w-4 h-4 text-[#AB9784]" />;
      case "children":
        return <Baby className="w-4 h-4 text-[#97D6A7]" />;
      case "bedtime":
        return <Moon className="w-4 h-4 text-[#97CDD6]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#E0AB3A]" />;
    }
  };

  return (
    <div className="w-full">
      {/* Category Pills Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase tracking-widest text-[#857364] font-semibold">
          Explore Traditions & Categories
        </h3>
        <span className="text-xs text-[#857364]">6 Cultural Streams</span>
      </div>

      {/* Horizontal Scrollable Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar">
        {/* All Stories Filter */}
        <button
          onClick={() => onSelectCategory("all")}
          className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
            selectedCategory === "all"
              ? "bg-[#D9732B] border-[#D9732B] text-white shadow-md shadow-[#D9732B]/20"
              : "bg-[#1C1713] border-[#2E2721] text-[#AB9784] hover:text-[#F7F3EB] hover:border-[#4A3E34]"
          }`}
        >
          <span>All Stories</span>
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                isSelected
                  ? "bg-[#2A221B] border-[#E0AB3A] text-[#F2C765] shadow-md shadow-black/40"
                  : "bg-[#1C1713] border-[#2E2721] text-[#CBBCAE] hover:text-[#F7F3EB] hover:border-[#4A3E34]"
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
