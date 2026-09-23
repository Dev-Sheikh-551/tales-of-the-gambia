"use client";

import React, { useState } from "react";
import { Story, ProvenanceConfidence } from "@/types/story";
import {
  ShieldCheck,
  ChevronDown,
  BookOpen,
  MapPin,
  Globe,
  Feather,
  Landmark,
  FileCheck2,
} from "lucide-react";

interface StoryProvenanceCardProps {
  story: Story;
}

function confidenceLabel(confidence: ProvenanceConfidence): string {
  const map: Record<ProvenanceConfidence, string> = {
    documented: "Documented Source",
    "community-attributed": "Community Attributed",
    "research-based": "Research-Based Drama",
    "editorial-adaptation": "Editorial Adaptation",
    "original-fiction": "Original Fiction",
  };
  return map[confidence] || confidence;
}

export function StoryProvenanceCard({ story }: StoryProvenanceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { origin, provenance, narrative, historicalContext } = story;

  return (
    <div className="border-t border-[#26201A] pt-8 mt-12 select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-[#171310]/60 hover:bg-[#1A1613] border border-[#2E2721] text-left transition-colors group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#E0AB3A]" />
          <div>
            <span className="text-xs font-medium text-[#F7F3EB] group-hover:text-[#F2C765] transition-colors">
              Story notes & cultural lineage
            </span>
            <span className="text-[11px] text-[#857364] ml-2 hidden sm:inline">
              ({origin.community || origin.region} · {provenance ? confidenceLabel(provenance.provenanceConfidence) : "Oral Heritage"})
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#857364]">
          <span className="text-[11px] hidden sm:inline">{isOpen ? "Hide notes" : "View notes"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#E0AB3A]" : "text-[#857364]"
            }`}
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-4 p-5 sm:p-6 rounded-xl bg-[#14100E] border border-[#2A231D] space-y-6 text-xs text-[#AB9784] animate-in fade-in slide-in-from-top-2 duration-200 select-text">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-[#221D18]">
            <div className="space-y-1">
              <span className="text-[#857364] flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3 h-3 text-[#D9732B]" />
                Region & Community
              </span>
              <p className="text-[#F7F3EB] font-medium font-story-serif text-sm">
                {origin.community || origin.region}
              </p>
              {origin.ethnicGroup && (
                <p className="text-[11px] text-[#857364]">{origin.ethnicGroup}</p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[#857364] flex items-center gap-1.5 text-[11px]">
                <BookOpen className="w-3 h-3 text-[#E0AB3A]" />
                Attribution & Confidence
              </span>
              <p className="text-[#F7F3EB] font-medium font-story-serif text-sm capitalize">
                {provenance ? confidenceLabel(provenance.provenanceConfidence) : "Oral Heritage"}
              </p>
              {provenance?.collectorOrAuthor && (
                <p className="text-[11px] text-[#857364] truncate">
                  {provenance.collectorOrAuthor}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[#857364] flex items-center gap-1.5 text-[11px]">
                <Globe className="w-3 h-3 text-[#4B8590]" />
                Language & Historical Era
              </span>
              <p className="text-[#F7F3EB] font-medium font-story-serif text-sm">
                {provenance?.originalLanguage || story.language}
              </p>
              {provenance?.historicalPeriod && (
                <p className="text-[11px] text-[#857364] truncate">
                  {provenance.historicalPeriod}
                </p>
              )}
            </div>
          </div>

          {/* Authenticity Statement */}
          {provenance?.authenticityStatement && (
            <div className="space-y-1.5">
              <span className="text-[#E0AB3A] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5" />
                Cultural Authenticity Declaration
              </span>
              <p className="leading-relaxed text-[#CBBCAE]">{provenance.authenticityStatement}</p>
            </div>
          )}

          {/* Source Reference */}
          {provenance?.sourceRef && (
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#857364] font-medium block">
                Source Reference
              </span>
              {provenance.sourceRef.title && (
                <p className="text-[#F7F3EB] font-medium">{provenance.sourceRef.title}</p>
              )}
              {provenance.sourceRef.notes && (
                <p className="leading-relaxed">{provenance.sourceRef.notes}</p>
              )}
            </div>
          )}

          {/* Historical Context */}
          {historicalContext && (
            <div className="space-y-2 pt-2 border-t border-[#221D18]">
              <div className="flex items-center gap-1.5 text-[#E0AB3A] font-semibold text-[11px] uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5 text-[#D9732B]" />
                Documented Historical Foundation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {historicalContext.era && (
                  <div>
                    <span className="text-[#857364] block text-[11px]">Era</span>
                    <span className="text-[#F7F3EB]">{historicalContext.era}</span>
                  </div>
                )}
                {historicalContext.location && (
                  <div>
                    <span className="text-[#857364] block text-[11px]">Geography</span>
                    <span className="text-[#F7F3EB]">{historicalContext.location}</span>
                  </div>
                )}
              </div>
              {historicalContext.narrativeReconstructionNotes && (
                <p className="text-[11px] text-[#AB9784] leading-relaxed pt-1">
                  <strong className="text-[#F2C765]">Reconstruction Disclosure: </strong>
                  {historicalContext.narrativeReconstructionNotes}
                </p>
              )}
            </div>
          )}

          {/* Digital Adaptation Note */}
          {provenance?.adaptationNotes && (
            <div className="leading-relaxed">
              <strong className="text-[#F7F3EB]">Digital Adaptation Note: </strong>
              <span>{provenance.adaptationNotes}</span>
            </div>
          )}

          {/* Cultural Moral */}
          {(narrative?.culturalMoral || narrative?.communalMoral) && (
            <div className="pt-2 border-t border-[#221D18] flex items-start gap-2 text-[#F2C765]">
              <Feather className="w-3.5 h-3.5 text-[#D9732B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F7F3EB] block text-[11px] mb-0.5">Communal Teaching:</strong>
                <span className="italic font-story-serif text-sm">
                  &ldquo;{narrative.communalMoral || narrative.culturalMoral}&rdquo;
                </span>
              </div>
            </div>
          )}

          {/* Contextual Notes */}
          {narrative?.contextualNotes && narrative.contextualNotes.length > 0 && (
            <div className="pt-2 border-t border-[#221D18] space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#857364] font-medium block">
                Cultural Notes & Glossary
              </span>
              <ul className="space-y-1 text-[#AB9784]">
                {narrative.contextualNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E0AB3A]">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
