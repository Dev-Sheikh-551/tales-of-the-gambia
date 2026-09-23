import { StoryCategory } from "@/types/story";

export interface CategoryInfo {
  id: StoryCategory;
  label: string;
  description: string;
  tagline: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "folktale",
    label: "Folktales",
    description: "Centuries-old community stories teaching morality, humility, and human nature.",
    tagline: "Passed down by elder storytellers",
  },
  {
    id: "fable",
    label: "Fables",
    description: "Animal allegories of cleverness, wisdom, and the balance of the wild.",
    tagline: "Wisdom through clever creatures",
  },
  {
    id: "legend",
    label: "Legends",
    description: "Mythic lore, sacred waters, guardian spirits, and majestic natural landmarks.",
    tagline: "Where reality weaves with myth",
  },
  {
    id: "historical",
    label: "Historical",
    description: "Narratives reflecting the heritage, kings, and griot lineage of Senegambia.",
    tagline: "Memories of kingdoms and river traders",
  },
  {
    id: "children",
    label: "Children's",
    description: "Lively, engaging tales crafted to delight young listeners and budding readers.",
    tagline: "Joyful tales for the young heart",
  },
  {
    id: "bedtime",
    label: "Bedtime",
    description: "Calm, atmospheric lullaby stories set under the warm Gambian night sky.",
    tagline: "Gentle rhythms for peaceful sleep",
  },
];
