import HeroSection from "@/components/home/HeroSection";
import FeaturedStory from "@/components/home/FeaturedStory";
import StoryDiscovery from "@/components/home/StoryDiscovery";
import ContinueStorySection from "@/components/home/ContinueStorySection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Atmospheric Hero (extends behind transparent navigation) */}
      <div className="-mt-16 sm:-mt-20">
        <HeroSection />
      </div>

      {/* 2. Featured Story */}
      <FeaturedStory />

      {/* 3. Continue Reading (only if user has active in-progress reading) */}
      <ContinueStorySection />

      {/* 4. Story Collection with Clean Category Filter Tabs */}
      <StoryDiscovery />
    </div>
  );
}
