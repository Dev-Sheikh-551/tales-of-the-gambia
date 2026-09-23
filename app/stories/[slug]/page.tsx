import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_STORIES, getStoryBySlug } from "@/data/stories";
import StoryReaderShell from "@/components/story/StoryReaderShell";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found",
    };
  }

  return {
    title: `${story.title} | Tales of The Gambia`,
    description: story.description,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return <StoryReaderShell story={story} />;
}
