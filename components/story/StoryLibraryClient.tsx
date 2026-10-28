"use client";

import React, { useState, useMemo, useEffect, useRef, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Bookmark,
  ChevronDown,
  Check,
  ArrowUpDown,
} from "lucide-react";
import { Story, StoryCategory, ContentType } from "@/types/story";
import { CATEGORIES } from "@/data/categories";
import { StoryCard } from "./StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { usePlatform } from "@/hooks/usePlatform";

interface StoryLibraryClientProps {
  stories: Story[];
}

type SortOption = "featured" | "alphabetical" | "recent" | "shortest" | "longest";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "alphabetical", label: "Alphabetical" },
  { id: "recent", label: "Recently Added" },
  { id: "shortest", label: "Shortest" },
  { id: "longest", label: "Longest" },
];

const CONTENT_TYPE_OPTIONS: { id: ContentType | "all"; label: string }[] = [
  { id: "all", label: "All Formats" },
  { id: "traditional", label: "Oral Traditional" },
  { id: "historical", label: "Historical" },
  { id: "adapted", label: "Adapted" },
  { id: "original-fiction", label: "Original Fiction" },
];

export function StoryLibraryClient({ stories }: StoryLibraryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const { favorites, isFav, toggleFav, getProgress, progressList, isLoaded } = useStoryStorage();
  const { isNative } = usePlatform();

  // Sort dropdown state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSortOpen]);

  // Read initial filter values from URL query parameters
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = (searchParams.get("category") as StoryCategory | "all") || "all";
  const initialType = (searchParams.get("type") as ContentType | "all") || "all";
  const initialTradition = searchParams.get("tradition") || "all";
  const initialAge = searchParams.get("age") || "all";
  const initialSort = (searchParams.get("sort") as SortOption) || "featured";
  const initialSaved = searchParams.get("saved") === "true";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "all">(initialCategory);
  const [selectedType, setSelectedType] = useState<ContentType | "all">(initialType);
  const [selectedTradition, setSelectedTradition] = useState<string>(initialTradition);
  const [selectedAge, setSelectedAge] = useState<string>(initialAge);
  const [selectedSort, setSelectedSort] = useState<SortOption>(initialSort);
  const [isSavedOnly, setIsSavedOnly] = useState<boolean>(initialSaved);

  // Sync state if URL searchParams change (e.g. browser back/forward)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory((searchParams.get("category") as StoryCategory | "all") || "all");
    setSelectedType((searchParams.get("type") as ContentType | "all") || "all");
    setSelectedTradition(searchParams.get("tradition") || "all");
    setSelectedAge(searchParams.get("age") || "all");
    setSelectedSort((searchParams.get("sort") as SortOption) || "featured");
    setIsSavedOnly(searchParams.get("saved") === "true");
  }, [searchParams]);

  // Helper to update URL params
  const updateUrl = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (!value || value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  // Derive dynamic list of cultural traditions from actual story data
  const availableTraditions = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => {
      const tradition = s.origin.community || s.origin.ethnicGroup || s.provenance?.community;
      if (tradition) set.add(tradition);
    });
    return Array.from(set).sort();
  }, [stories]);

  // Derive dynamic list of age ranges from actual story data
  const availableAges = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => {
      if (s.ageRange) set.add(s.ageRange);
    });
    return Array.from(set).sort();
  }, [stories]);

  // Handle filter changes and sync to URL
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrl({ search: val });
  };

  const handleCategoryChange = (cat: StoryCategory | "all") => {
    setSelectedCategory(cat);
    updateUrl({ category: cat });
  };

  const handleTypeChange = (type: ContentType | "all") => {
    setSelectedType(type);
    updateUrl({ type: type });
  };

  const handleTraditionChange = (trad: string) => {
    setSelectedTradition(trad);
    updateUrl({ tradition: trad });
  };

  const handleAgeChange = (age: string) => {
    setSelectedAge(age);
    updateUrl({ age: age });
  };

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
    updateUrl({ sort: sort });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedTradition("all");
    setSelectedAge("all");
    setSelectedSort("featured");
    setIsSavedOnly(false);
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== "all" ||
    selectedType !== "all" ||
    selectedTradition !== "all" ||
    selectedAge !== "all" ||
    selectedSort !== "featured" ||
    isSavedOnly;

  // Filter and sort the stories
  const filteredStories = useMemo(() => {
    let list = [...stories];

    // Saved favorites filter
    if (isSavedOnly) {
      list = list.filter((s) => favorites.includes(s.slug));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((story) => {
        return (
          story.title.toLowerCase().includes(q) ||
          story.description.toLowerCase().includes(q) ||
          story.subtitle.toLowerCase().includes(q) ||
          story.category.toLowerCase().includes(q) ||
          story.contentType.toLowerCase().includes(q) ||
          story.origin.region.toLowerCase().includes(q) ||
          (story.origin.community && story.origin.community.toLowerCase().includes(q)) ||
          (story.origin.ethnicGroup && story.origin.ethnicGroup.toLowerCase().includes(q)) ||
          (story.provenance?.community && story.provenance.community.toLowerCase().includes(q)) ||
          (story.provenance?.originalLanguage &&
            story.provenance.originalLanguage.toLowerCase().includes(q)) ||
          (story.provenance?.historicalEra &&
            story.provenance.historicalEra.toLowerCase().includes(q)) ||
          (story.historicalContext?.era && story.historicalContext.era.toLowerCase().includes(q)) ||
          (story.historicalContext?.location &&
            story.historicalContext.location.toLowerCase().includes(q)) ||
          (story.historicalContext?.documentedFigures &&
            story.historicalContext.documentedFigures.some((f) => f.toLowerCase().includes(q))) ||
          (story.provenance?.sourceRef?.title &&
            story.provenance.sourceRef.title.toLowerCase().includes(q)) ||
          (story.provenance?.sourceRef?.notes &&
            story.provenance.sourceRef.notes.toLowerCase().includes(q)) ||
          (story.narrative?.communalMoral &&
            story.narrative.communalMoral.toLowerCase().includes(q)) ||
          story.themes.some((t) => t.toLowerCase().includes(q)) ||
          story.characters.some((c) => c.toLowerCase().includes(q)) ||
          story.scenes.some((s) => s.narration && s.narration.toLowerCase().includes(q))
        );
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((s) => s.category === selectedCategory);
    }

    // Content type filter
    if (selectedType !== "all") {
      list = list.filter((s) => s.contentType === selectedType);
    }

    // Cultural tradition filter
    if (selectedTradition !== "all") {
      list = list.filter((s) => {
        const t = s.origin.community || s.origin.ethnicGroup || s.provenance?.community;
        return t === selectedTradition;
      });
    }

    // Age filter
    if (selectedAge !== "all") {
      list = list.filter((s) => s.ageRange === selectedAge);
    }

    // Sort options
    switch (selectedSort) {
      case "alphabetical":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "recent":
        // Order by reverse list position
        list.reverse();
        break;
      case "shortest":
        list.sort(
          (a, b) =>
            (a.listeningDurationSeconds || a.readingTimeMinutes * 60) -
            (b.listeningDurationSeconds || b.readingTimeMinutes * 60)
        );
        break;
      case "longest":
        list.sort(
          (a, b) =>
            (b.listeningDurationSeconds || b.readingTimeMinutes * 60) -
            (a.listeningDurationSeconds || a.readingTimeMinutes * 60)
        );
        break;
      case "featured":
      default:
        // Featured stories first, then original order
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [
    stories,
    searchQuery,
    selectedCategory,
    selectedType,
    selectedTradition,
    selectedAge,
    selectedSort,
    isSavedOnly,
    favorites,
  ]);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
      isNative ? "pt-[calc(max(env(safe-area-inset-top,0px),1.25rem)+0.5rem)]" : "py-6 sm:py-12"
    } pb-28 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] space-y-6`}>
      {/* 1. Header */}
      <div>
        <h1 className="font-story-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
          Stories
        </h1>
      </div>

      {/* 2. Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search stories, characters, themes..."
          className="w-full pl-11 pr-10 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => handleSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => handleCategoryChange("all")}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
            selectedCategory === "all"
              ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium shadow-sm"
              : "bg-transparent border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-prominent)]"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium shadow-sm"
                  : "bg-transparent border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-prominent)]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 4. Sub-toolbar: Saved only on left, Redesigned Sort on right */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const next = !isSavedOnly;
              setIsSavedOnly(next);
              updateUrl({ saved: next ? "true" : null });
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              isSavedOnly
                ? "bg-[var(--accent-ochre)] text-white font-medium shadow-sm"
                : "bg-transparent border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-prominent)]"
            }`}
          >
            Saved only
          </button>
        </div>

        {/* Polished Compact Sorting Control */}
        <div className="relative shrink-0" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-prominent)] text-xs font-medium text-[var(--text-primary)] transition-all cursor-pointer active:scale-95 shadow-sm"
            aria-expanded={isSortOpen}
            aria-haspopup="listbox"
            aria-label="Sort stories"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>{SORT_OPTIONS.find((o) => o.id === selectedSort)?.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-[var(--bg-card)] border border-[var(--border-prominent)] shadow-2xl py-1.5 z-30 overflow-hidden"
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = selectedSort === opt.id;
                  return (
                    <button
                      key={opt.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        handleSortChange(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 font-semibold"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--accent-gold)]" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Active Filter State Summary Bar */}
      <div className="flex items-center justify-between mb-2 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-[var(--text-primary)]">{filteredStories.length}</strong> of{" "}
            {stories.length} stories
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] text-[var(--accent-ochre)] text-[11px] border border-[var(--border-subtle)]">
              Filtered
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[var(--accent-ochre)] hover:underline underline-offset-4 cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Story Grid or Empty State */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[var(--text-muted)]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-story-serif text-xl sm:text-2xl text-[var(--text-primary)]">
            No stories match your criteria
          </h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            We couldn&rsquo;t find any stories matching your current search and filter combination.
            Try adjusting your search terms or resetting filters.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-ochre)] hover:opacity-90 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, idx) => (
            <MotionReveal key={story.id} delay={Math.min(0.2, idx * 0.04)} direction="up">
              <StoryCard
                story={story}
                progress={getProgress(story.slug)}
                isFavorite={isFav(story.slug)}
                onToggleFavorite={toggleFav}
              />
            </MotionReveal>
          ))}
        </div>
      )}
    </div>
  );
}
