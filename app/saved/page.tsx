import { Metadata } from "next";
import { FavoritesPageClient } from "@/components/story/FavoritesPageClient";

export const metadata: Metadata = {
  title: "Saved | Tales of The Gambia",
  description:
    "Your personal library of bookmarked and downloaded Gambian and Senegambian stories, legends, and bedtime lullabies.",
};

export default function SavedPage() {
  return <FavoritesPageClient />;
}
