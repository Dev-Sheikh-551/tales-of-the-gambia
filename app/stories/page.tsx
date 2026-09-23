import { Suspense } from "react";
import { Metadata } from "next";
import { MOCK_STORIES } from "@/data/stories";
import { StoryLibraryClient } from "@/components/story/StoryLibraryClient";

export const metadata: Metadata = {
  title: "The Story Collection | Tales of The Gambia",
  description:
    "Explore the full collection of Gambian and Senegambian folktales, fables, historical epics, legends, children's adventures, and bedtime stories.",
};

function StoryLibraryFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-8">
      <div className="h-10 w-64 bg-[#201B17] rounded-lg" />
      <div className="h-6 w-96 bg-[#201B17] rounded-lg" />
      <div className="h-24 w-full bg-[#171310] rounded-2xl border border-[#2E2721]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="h-80 rounded-2xl bg-[#1A1613] border border-[#2E2721]"
          />
        ))}
      </div>
    </div>
  );
}

export default function StoriesPage() {
  return (
    <Suspense fallback={<StoryLibraryFallback />}>
      <StoryLibraryClient stories={MOCK_STORIES} />
    </Suspense>
  );
}
