import HeroSection from "@/components/home/HeroSection";
import FeaturedStory from "@/components/home/FeaturedStory";
import StoryDiscovery from "@/components/home/StoryDiscovery";
import ContinueStorySection from "@/components/home/ContinueStorySection";
import { HeroOffset } from "@/components/home/HeroOffset";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Atmospheric Hero.
          HeroOffset applies -mt-16 sm:-mt-20 on web (pulls hero behind transparent nav).
          On native (Capacitor) the offset is skipped — no top nav is present. */}
      <HeroOffset>
        <HeroSection />
      </HeroOffset>

      {/* 2. Featured Story */}
      <FeaturedStory />

      {/* 3. Continue Reading (only if user has active in-progress reading) */}
      <ContinueStorySection />

      {/* 4. Story Collection with Clean Category Filter Tabs */}
      <StoryDiscovery />
    </div>
  );
}
