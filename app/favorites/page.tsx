import { Metadata } from "next";
import { FavoritesPageClient } from "@/components/story/FavoritesPageClient";

export const metadata: Metadata = {
  title: "Your Saved Tales | Tales of The Gambia",
  description:
    "Your personal library of bookmarked Gambian and Senegambian stories, legends, and bedtime lullabies.",
};

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
