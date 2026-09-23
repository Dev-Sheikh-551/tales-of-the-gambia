import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CATEGORIES, MOCK_STORIES } from "@/data/stories";
import { CategoryBadge, ContentTypeBadge } from "@/components/ui/Badge";
import { StoryArt } from "@/components/ui/StoryArt";
import { Clock, Volume2, ArrowRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Story Categories & Traditions | Tales of The Gambia",
  description:
    "Explore Gambian storytelling by genre: Folktales, Fables, Legends, Historical narratives, Children's tales, and Bedtime journeys.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs uppercase tracking-widest text-[#E0AB3A] font-semibold">
          Cultural Streams
        </span>
        <h1 className="font-story-serif text-4xl sm:text-5xl font-medium text-[#F7F3EB] mt-2 mb-4">
          Story Categories & Traditions
        </h1>
        <p className="text-base text-[#CBBCAE] leading-relaxed">
          From ancient animal fables passed around village fires to majestic river legends,
          warrior epics, and gentle bedtime lullabies, explore the rich tapestry of Senegambian
          storytelling across its distinct categories.
        </p>
      </div>

      {/* Quick Category Jump Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
        {CATEGORIES.map((cat) => {
          const count = MOCK_STORIES.filter((s) => s.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/stories?category=${cat.id}`}
              className="p-4 rounded-xl bg-[#1A1613] border border-[#2E2721] hover:border-[#E0AB3A]/50 hover:bg-[#221D18] transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-[#E0AB3A] font-medium block mb-1">
                  {cat.label}
                </span>
                <span className="text-[11px] text-[#857364] line-clamp-1 block">
                  {cat.tagline}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-[#26201A] flex items-center justify-between text-[11px] text-[#857364] group-hover:text-[#F2C765]">
                <span>{count} {count === 1 ? "story" : "stories"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Category Sections */}
      <div className="space-y-16">
        {CATEGORIES.map((cat) => {
          const storiesInCat = MOCK_STORIES.filter((s) => s.category === cat.id);

          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              {/* Category Subheader */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-[#2E2721] gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryBadge category={cat.id} />
                    <span className="text-xs text-[#857364] italic">{cat.tagline}</span>
                  </div>
                  <h2 className="font-story-serif text-2xl sm:text-3xl text-[#F7F3EB]">
                    {cat.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#AB9784] mt-1 max-w-xl">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#857364]">
                    {storiesInCat.length} {storiesInCat.length === 1 ? "story" : "stories"}
                  </span>
                  <Link
                    href={`/stories?category=${cat.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241E19] hover:bg-[#2F2721] text-xs font-medium text-[#F2C765] border border-[#3E352E] hover:border-[#E0AB3A]/40 transition-all"
                  >
                    <span>View all in Library</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Stories in this category */}
              {storiesInCat.length === 0 ? (
                <div className="p-8 rounded-xl bg-[#171310] border border-[#2E2721] text-xs text-[#857364] flex items-center justify-between">
                  <span>New oral recordings and adaptations coming soon in this stream.</span>
                  <Link
                    href="/stories"
                    className="text-[#E0AB3A] hover:underline underline-offset-4 flex items-center gap-1"
                  >
                    <span>Explore all stories</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storiesInCat.map((story) => (
                    <div
                      key={story.id}
                      className="group flex flex-col justify-between rounded-2xl bg-[#1A1613] border border-[#2E2721] hover:border-[#4A3E34] transition-all p-5 overflow-hidden shadow-md"
                    >
                      <div className="space-y-3.5">
                        <div className="relative">
                          <Link href={`/stories/${story.slug}`} tabIndex={-1}>
                            <StoryArt
                              theme={story.coverImage.paletteTheme}
                              size="sm"
                              className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-102"
                            />
                          </Link>
                        </div>

                        <div className="flex items-center gap-2">
                          <ContentTypeBadge type={story.contentType} />
                          {story.origin.community && (
                            <span className="text-[11px] text-[#E0AB3A]/90 font-medium">
                              • {story.origin.community}
                            </span>
                          )}
                          <span className="text-[11px] text-[#857364] ml-auto">
                            {story.origin.region}
                          </span>
                        </div>

                        <h3 className="font-story-serif text-xl text-[#F7F3EB] group-hover:text-[#F2C765] transition-colors leading-snug">
                          <Link href={`/stories/${story.slug}`}>{story.title}</Link>
                        </h3>

                        <p className="text-xs text-[#AB9784] line-clamp-2 leading-relaxed">
                          {story.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#26201A] flex items-center justify-between text-xs text-[#857364]">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D9732B]" />
                            {story.readingTimeMinutes} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Volume2 className="w-3 h-3 text-[#E0AB3A]" />
                            {Math.round(story.listeningDurationSeconds / 60)} min
                          </span>
                        </div>

                        <Link
                          href={`/stories/${story.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#F2C765] group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
