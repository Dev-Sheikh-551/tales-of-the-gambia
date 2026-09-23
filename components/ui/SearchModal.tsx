"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Volume2, ArrowRight, CornerDownLeft } from "lucide-react";
import { MOCK_STORIES } from "@/data/stories";
import { CategoryBadge, ContentTypeBadge, Badge } from "./Badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredStories = query.trim()
    ? MOCK_STORIES.filter((story) => {
        const q = query.toLowerCase();
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
          (story.ageRange && story.ageRange.toLowerCase().includes(q)) ||
          (story.narrative?.communalMoral &&
            story.narrative.communalMoral.toLowerCase().includes(q)) ||
          story.themes.some((t) => t.toLowerCase().includes(q)) ||
          story.characters.some((c) => c.toLowerCase().includes(q)) ||
          story.scenes.some((s) => s.narration && s.narration.toLowerCase().includes(q))
        );
      })
    : MOCK_STORIES.slice(0, 5);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredStories.length > 0 ? (prev + 1) % filteredStories.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredStories.length > 0
            ? (prev - 1 + filteredStories.length) % filteredStories.length
            : 0
        );
      } else if (e.key === "Enter") {
        if (filteredStories.length > 0 && filteredStories[selectedIndex]) {
          e.preventDefault();
          const target = filteredStories[selectedIndex];
          onClose();
          router.push(`/stories/${target.slug}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredStories, selectedIndex, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search stories"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#1B1714] border border-[#3E352E] shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2E2721] bg-[#171310]">
          <Search className="w-5 h-5 text-[#AB9784] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search folktales, fables, epics, traditions, characters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-[#F7F3EB] placeholder-[#857364] outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[#857364] hover:text-[#F7F3EB] transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs rounded border border-[#3E352E] text-[#AB9784] hover:bg-[#29231E] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#857364] font-medium px-2 py-1">
            <span>
              {query.trim()
                ? `Found ${filteredStories.length} ${
                    filteredStories.length === 1 ? "story" : "stories"
                  }`
                : "Suggested Stories"}
            </span>
            {query.trim() && filteredStories.length > 0 && (
              <Link
                href={`/stories?search=${encodeURIComponent(query.trim())}`}
                onClick={onClose}
                className="text-[#E0AB3A] hover:underline normal-case flex items-center gap-1 font-normal"
              >
                <span>View in Library</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          {filteredStories.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-2">
              <p className="text-sm text-[#AB9784]">
                No stories found matching &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs text-[#857364]">
                Try searching for &ldquo;Mandinka&rdquo;, &ldquo;hare&rdquo;, &ldquo;kora&rdquo;,
                &ldquo;river&rdquo;, or &ldquo;Pulaaku&rdquo;.
              </p>
              <div className="pt-2">
                <Link
                  href="/stories"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs text-[#F2C765] hover:underline"
                >
                  <span>Browse all stories in library</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            filteredStories.map((story, idx) => {
              const isSelected = idx === selectedIndex;
              const tradition =
                story.origin.community ||
                story.origin.ethnicGroup ||
                story.provenance?.community;

              return (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-[#28221C] border-[#E0AB3A]/40 shadow-sm"
                      : "bg-[#221D18] hover:bg-[#28221C] border-transparent"
                  }`}
                >
                  <div className="space-y-1.5 pr-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-story-serif text-base transition-colors ${
                          isSelected ? "text-[#F2C765]" : "text-[#F7F3EB]"
                        }`}
                      >
                        {story.title}
                      </span>
                      <CategoryBadge category={story.category} />
                      <ContentTypeBadge type={story.contentType} />
                      {tradition && (
                        <Badge variant="gold" size="sm">
                          {tradition}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#AB9784] line-clamp-1">{story.subtitle}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#857364]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#D9732B]" />
                        {story.readingTimeMinutes} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-[#E0AB3A]" />
                        {Math.round(story.listeningDurationSeconds / 60)} min audio
                      </span>
                      <span>{story.scenes.length} scenes</span>
                      <span className="text-[#AB9784]">• {story.origin.region}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#857364] px-1.5 py-0.5 rounded bg-[#1B1714] border border-[#3E352E]">
                        <span>Enter</span>
                        <CornerDownLeft className="w-2.5 h-2.5" />
                      </span>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 transition-all ${
                        isSelected
                          ? "text-[#F2C765] translate-x-1"
                          : "text-[#857364] group-hover:text-[#F2C765]"
                      }`}
                    />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-4 py-2.5 bg-[#14100E] border-t border-[#2E2721] flex items-center justify-between text-[11px] text-[#857364]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <Link
            href="/stories"
            onClick={onClose}
            className="text-[#E0AB3A] hover:underline"
          >
            Explore all {MOCK_STORIES.length} stories →
          </Link>
        </div>
      </div>
    </div>
  );
}
