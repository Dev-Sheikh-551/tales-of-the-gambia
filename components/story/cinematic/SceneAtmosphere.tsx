"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { EnvironmentMotion } from "@/types/story";

interface SceneAtmosphereProps {
  environmentMotion?: EnvironmentMotion;
  isPaused?: boolean;
}

export function SceneAtmosphere({
  environmentMotion,
  isPaused = false,
}: SceneAtmosphereProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || !environmentMotion || environmentMotion.type === "none") {
    return null;
  }

  const { type } = environmentMotion;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
    >
      {type === "wind" && (
        <div className={`absolute inset-0 ${isPaused ? "" : "animate-pulse"}`}>
          {/* Subtle horizontal harmattan wind streaks */}
          <div className="absolute top-1/3 -left-20 w-80 h-1 bg-gradient-to-r from-transparent via-[#E0AB3A]/10 to-transparent blur-[1px] transform -rotate-3 transition-transform duration-1000" />
          <div className="absolute top-1/2 -left-10 w-96 h-1.5 bg-gradient-to-r from-transparent via-[#D9732B]/10 to-transparent blur-[1px] transform -rotate-1" />
        </div>
      )}

      {type === "river-ripples" && (
        <div className="absolute bottom-1/4 left-0 right-0 h-32 opacity-25">
          <div
            className={`w-full h-full bg-gradient-to-t from-[#4B8590]/20 via-transparent to-transparent ${
              isPaused ? "" : "animate-pulse"
            }`}
          />
        </div>
      )}

      {type === "fire-flicker" && (
        <div
          className={`absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-radial from-[#D9732B]/15 via-[#C69224]/5 to-transparent blur-2xl ${
            isPaused ? "" : "animate-pulse"
          }`}
          style={{ animationDuration: "3s" }}
        />
      )}

      {type === "night-stars" && (
        <div className="absolute top-4 left-0 right-0 h-48">
          <div
            className={`absolute top-6 left-[18%] w-1.5 h-1.5 rounded-full bg-[#FEF9E7] shadow-sm shadow-[#FEF9E7] ${
              isPaused ? "opacity-70" : "animate-ping"
            }`}
            style={{ animationDuration: "4s" }}
          />
          <div
            className={`absolute top-12 left-[42%] w-1 h-1 rounded-full bg-[#FEF9E7] ${
              isPaused ? "opacity-60" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.2s" }}
          />
          <div
            className={`absolute top-8 right-[24%] w-1.5 h-1.5 rounded-full bg-[#FEF9E7] shadow-sm shadow-[#FEF9E7] ${
              isPaused ? "opacity-80" : "animate-ping"
            }`}
            style={{ animationDuration: "5s" }}
          />
          <div
            className={`absolute top-16 right-[38%] w-1 h-1 rounded-full bg-[#E8F4F8] ${
              isPaused ? "opacity-50" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.8s" }}
          />
        </div>
      )}

      {type === "dust-particles" && (
        <div className="absolute inset-0">
          <div
            className={`absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#E0AB3A]/30 ${
              isPaused ? "opacity-30" : "animate-pulse"
            }`}
            style={{ animationDuration: "2.5s" }}
          />
          <div
            className={`absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#D9732B]/25 ${
              isPaused ? "opacity-20" : "animate-pulse"
            }`}
            style={{ animationDuration: "3.5s" }}
          />
        </div>
      )}
    </div>
  );
}
