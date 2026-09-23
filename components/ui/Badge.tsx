import React from "react";
import { ContentType, StoryCategory } from "@/types/story";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "ochre" | "river" | "forest" | "muted" | "demo";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#24201C] text-[#D8C7B5] border-[#3E352E]",
    gold: "bg-[#9E7418]/15 text-[#F2C765] border-[#E0AB3A]/30",
    ochre: "bg-[#B35821]/15 text-[#F0AB6E] border-[#D9732B]/30",
    river: "bg-[#264A51]/20 text-[#97CDD6] border-[#4B8590]/30",
    forest: "bg-[#294532]/25 text-[#97D6A7] border-[#3B6147]/30",
    muted: "bg-[#1F1A16] text-[#A59585] border-[#2E2721]",
    demo: "bg-[#D9732B]/10 text-[#E58E45] border-[#D9732B]/35 tracking-wider uppercase",
  }[variant];

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium rounded-full",
    md: "text-xs px-3 py-1 font-medium rounded-full",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 border leading-none transition-colors ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}

export function ContentTypeBadge({ type }: { type: ContentType }) {
  const meta = {
    traditional: {
      label: "Oral Traditional",
      variant: "gold" as const,
      tooltip: "Preserved through community oral tradition",
    },
    historical: {
      label: "Historical Narrative",
      variant: "ochre" as const,
      tooltip: "Senegambian cultural and royal oral heritage",
    },
    adapted: {
      label: "Folkloric Adaptation",
      variant: "river" as const,
      tooltip: "Modern written adaptation of Gambian legend",
    },
    "original-fiction": {
      label: "Original Fiction",
      variant: "forest" as const,
      tooltip: "Contemporary story inspired by Gambian ecology & folklore",
    },
  }[type];

  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}

export function CategoryBadge({ category }: { category: StoryCategory }) {
  const meta: Record<StoryCategory, { label: string; variant: BadgeProps["variant"] }> = {
    folktale: { label: "Folktale", variant: "gold" },
    fable: { label: "Fable", variant: "ochre" },
    legend: { label: "Legend", variant: "river" },
    historical: { label: "Historical", variant: "default" },
    children: { label: "Children's", variant: "forest" },
    bedtime: { label: "Bedtime", variant: "muted" },
  };

  const item = meta[category] || { label: category, variant: "default" };

  return <Badge variant={item.variant}>{item.label}</Badge>;
}
