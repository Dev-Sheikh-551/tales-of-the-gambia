import React from "react";
import { SceneVisual } from "@/types/story";
import { StoryArt } from "@/components/ui/StoryArt";

interface SceneBackgroundProps {
  visual?: SceneVisual;
  backgroundGradient?: string;
  className?: string;
}

export function SceneBackground({
  visual,
  backgroundGradient = "from-[#1B1714] via-[#16120F] to-[#12100E]",
  className = "",
}: SceneBackgroundProps) {
  const paletteTheme = visual?.paletteTheme || "ochre";

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden select-none ${className}`}>
      {/* Visual illustration layer */}
      <StoryArt
        theme={paletteTheme}
        size="hero"
        className="w-full h-full rounded-none border-none"
      />

      {/* Dynamic atmospheric gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${backgroundGradient} opacity-40 mix-blend-multiply pointer-events-none`}
      />

      {/* Cinematic Vignette (top & bottom darkening for contrast) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
