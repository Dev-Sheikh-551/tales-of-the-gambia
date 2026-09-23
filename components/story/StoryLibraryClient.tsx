"use client";

import React, { useState, useMemo, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import { Story, StoryCategory, ContentType } from "@/types/story";
import { CATEGORIES } from "@/data/categories";
import { StoryCard } from "./StoryCard";
import { useStoryStorage } from "@/hooks/useStoryStorage";
import { MotionReveal } from "@/components/motion/MotionReveal";

interface StoryLibraryClientProps {
  stories: Story[];
}

type SortOption = "featured" | "alphabetical" | "recent" | "shortest" | "longest";

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

  const { isFav, toggleFav, getProgress, progressList, isLoaded } = useStoryStorage();

  // Read initial filter values from URL query parameters
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = (searchParams.get("category") as StoryCategory | "all") || "all";
  const initialType = (searchParams.get("type") as ContentType | "all") || "all";
  const initialTradition = searchParams.get("tradition") || "all";
  const initialAge = searchParams.get("age") || "all";
  const initialSort = (searchParams.get("sort") as SortOption) || "featured";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "all">(initialCategory);
  const [selectedType, setSelectedType] = useState<ContentType | "all">(initialType);
  const [selectedTradition, setSelectedTradition] = useState<string>(initialTradition);
  const [selectedAge, setSelectedAge] = useState<string>(initialAge);
  const [selectedSort, setSelectedSort] = useState<SortOption>(initialSort);

  // Sync state if URL searchParams change (e.g. browser back/forward)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory((searchParams.get("category") as StoryCategory | "all") || "all");
    setSelectedType((searchParams.get("type") as ContentType | "all") || "all");
    setSelectedTradition(searchParams.get("tradition") || "all");
    setSelectedAge(searchParams.get("age") || "all");
    setSelectedSort((searchParams.get("sort") as SortOption) || "featured");
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
    selectedSort !== "featured";

  // Filter and sort the stories
  const filteredStories = useMemo(() => {
    let list = [...stories];

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
  ]);

  // Active in-progress stories for the Continue Reading top section
  const activeContinueStories = useMemo(() => {
    if (!isLoaded || progressList.length === 0) return [];
    return progressList
      .map((p) => {
        const story = stories.find((s) => s.slug === p.storySlug);
        if (!story || p.percentComplete >= 100) return null;
        return { story, progress: p };
      })
      .filter((item): item is { story: Story; progress: (typeof progressList)[0] } => item !== null);
  }, [isLoaded, progressList, stories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* 1. Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-widest text-[#E0AB3A] font-semibold">
            Oral Lore Archive
          </span>
          <span className="text-xs text-[#857364]">•</span>
          <span className="text-xs text-[#AB9784] font-medium">
            {stories.length} stories documented
          </span>
        </div>
        <h1 className="font-story-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#F7F3EB] tracking-tight mb-4">
          The Story Collection
        </h1>
        <p className="text-base sm:text-lg text-[#CBBCAE] leading-relaxed">
          Explore Gambian and Senegambian oral narratives, river legends, warrior epics,
          animal fables, children&rsquo;s adventures, and calming bedtime lullabies — preserved
          and retold with honesty and cultural care.
        </p>
      </div>

      {/* 2. Continue Reading Banner (Only if genuine progress exists) */}
      {activeContinueStories.length > 0 && (
        <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#221B16] via-[#1B1612] to-[#14100E] border border-[#3E352E] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#D9732B]/20 border border-[#D9732B]/40 flex items-center justify-center">
                <Bookmark className="w-3.5 h-3.5 text-[#D9732B]" />
              </div>
              <h2 className="font-story-serif text-lg sm:text-xl text-[#F7F3EB] font-medium">
                Continue Reading
              </h2>
            </div>
            <span className="text-xs text-[#857364]">
              {activeContinueStories.length} in progress
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeContinueStories.map(({ story, progress }) => (
              <div
                key={story.slug}
                className="p-4 rounded-xl bg-[#16120F] border border-[#2A231D] hover:border-[#4A3E34] transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#E0AB3A] font-medium">
                      Scene {progress.currentSceneNumber} of {progress.totalScenes}
                    </span>
                    <span className="text-[#857364]">{progress.percentComplete}% read</span>
                  </div>
                  <h3 className="font-story-serif text-base text-[#F7F3EB] font-medium leading-snug">
                    {story.title}
                  </h3>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-[#26201A] rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-[#D9732B] to-[#E0AB3A] rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentComplete}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#26201A] text-xs">
                  <span className="text-[#857364] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D9732B]" />
                    {story.readingTimeMinutes} min total
                  </span>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-[#F2C765] hover:text-white transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Resume Scene {progress.currentSceneNumber}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Discovery Toolbar */}
      <div className="space-y-4 mb-10 p-5 sm:p-6 rounded-2xl bg-[#171310] border border-[#2E2721] shadow-lg">
        {/* Search Bar & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#857364]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title, character, theme, kingdom, tradition..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#201B17] border border-[#2E2721] focus:border-[#E0AB3A]/60 text-sm text-[#F7F3EB] placeholder-[#857364] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#857364] hover:text-[#F7F3EB]"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort-select" className="text-xs text-[#857364] whitespace-nowrap">
              Sort:
            </label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="px-3 py-2.5 rounded-xl bg-[#201B17] border border-[#2E2721] text-xs font-medium text-[#CBBCAE] hover:text-[#F7F3EB] outline-none cursor-pointer"
            >
              <option value="featured">Featured Stories</option>
              <option value="alphabetical">Alphabetical (A–Z)</option>
              <option value="recent">Recently Added</option>
              <option value="shortest">Shortest First</option>
              <option value="longest">Longest First</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2.5 rounded-xl bg-[#29221C] hover:bg-[#382E25] text-xs font-medium text-[#F2C765] border border-[#4A3E34] transition-colors flex items-center gap-1.5"
                title="Reset all filters and sort"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#857364] font-medium mb-2">
            Categories
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-[#D9732B] text-white shadow-sm"
                  : "bg-[#201B17] text-[#AB9784] border border-[#2E2721] hover:text-[#F7F3EB] hover:border-[#4A3E34]"
              }`}
            >
              All Categories ({stories.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = stories.filter((s) => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#D9732B] text-white shadow-sm"
                      : "bg-[#201B17] text-[#AB9784] border border-[#2E2721] hover:text-[#F7F3EB] hover:border-[#4A3E34]"
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Filters: Content Type, Tradition, Age */}
        <div className="pt-3 border-t border-[#26201A] grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Format / Content Type */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#857364] font-medium mb-1.5">
              Content Classification
            </label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value as ContentType | "all")}
              className="w-full px-3 py-2 rounded-xl bg-[#201B17] border border-[#2E2721] text-xs text-[#CBBCAE] hover:text-[#F7F3EB] outline-none cursor-pointer"
            >
              {CONTENT_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cultural Tradition (Dynamically built) */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#857364] font-medium mb-1.5">
              Cultural Tradition
            </label>
            <select
              value={selectedTradition}
              onChange={(e) => handleTraditionChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#201B17] border border-[#2E2721] text-xs text-[#CBBCAE] hover:text-[#F7F3EB] outline-none cursor-pointer"
            >
              <option value="all">All Traditions ({availableTraditions.length})</option>
              {availableTraditions.map((trad) => (
                <option key={trad} value={trad}>
                  {trad}
                </option>
              ))}
            </select>
          </div>

          {/* Age Range Filter (Dynamically built) */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#857364] font-medium mb-1.5">
              Audience / Age
            </label>
            <select
              value={selectedAge}
              onChange={(e) => handleAgeChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#201B17] border border-[#2E2721] text-xs text-[#CBBCAE] hover:text-[#F7F3EB] outline-none cursor-pointer"
            >
              <option value="all">All Audiences</option>
              {availableAges.map((age) => (
                <option key={age} value={age}>
                  {age === "all-ages"
                    ? "All Ages"
                    : age.charAt(0).toUpperCase() + age.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter State Summary Bar */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#857364]">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-[#F7F3EB]">{filteredStories.length}</strong> of{" "}
            {stories.length} stories
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-md bg-[#29231E] text-[#E0AB3A] text-[11px]">
              Filtered
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[#E0AB3A] hover:underline underline-offset-4"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* 4. Story Grid or Empty State */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl bg-[#171310] border border-[#2E2721] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#201B17] border border-[#3E352E] flex items-center justify-center mx-auto text-[#857364]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-story-serif text-xl sm:text-2xl text-[#F7F3EB]">
            No stories match your criteria
          </h3>
          <p className="text-sm text-[#AB9784] max-w-md mx-auto leading-relaxed">
            We couldn&rsquo;t find any stories matching your current search and filter combination.
            Try adjusting your search terms or resetting filters.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D9732B] hover:bg-[#C45E1B] text-white text-xs font-semibold shadow-md transition-colors"
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
