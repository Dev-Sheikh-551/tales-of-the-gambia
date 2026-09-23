import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/stories";
import { Feather, Heart, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0B0A] border-t border-[#26201A] text-[#AB9784] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1F1A15]">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D9732B] to-[#8C4318] p-[1px]">
                <div className="w-full h-full bg-[#171310] rounded-[7px] flex items-center justify-center">
                  <span className="font-story-serif text-base font-bold text-[#F2C765]">
                    TG
                  </span>
                </div>
              </div>
              <span className="font-story-serif text-xl font-medium text-[#F7F3EB]">
                Tales of The Gambia
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#AB9784] max-w-md">
              A digital sanctuary dedicated to celebrating, preserving, and sharing the oral
              folktales, fables, historical memories, and legends of The Gambia. Stories carried
              through generations of elder storytellers and griots.
            </p>

            {/* Cultural Integrity Note */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#171310] border border-[#2E2721] text-xs text-[#AB9784]">
              <Shield className="w-4 h-4 text-[#D9732B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F7F3EB] font-medium block">
                  Cultural Stewardship & Integrity
                </strong>
                Traditional oral stories are living cultural inheritances. This platform distinguishes
                between authentic oral lineage, historical memory, and creative adaptations.
              </div>
            </div>
          </div>

          {/* Column 2: Story Categories */}
          <div className="space-y-3">
            <h3 className="font-story-serif text-base font-medium text-[#F7F3EB]">
              Story Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories#${category.id}`}
                    className="hover:text-[#F2C765] transition-colors flex items-center justify-between"
                  >
                    <span>{category.label}</span>
                    <span className="text-[11px] text-[#6E5F52]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The Tradition & Platform */}
          <div className="space-y-3">
            <h3 className="font-story-serif text-base font-medium text-[#F7F3EB]">
              The Tradition
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#F2C765] transition-colors">
                  The Jali (Griot) Lineage
                </Link>
              </li>
              <li>
                <Link href="/about#kora" className="hover:text-[#F2C765] transition-colors">
                  The Kora & River Songs
                </Link>
              </li>
              <li>
                <Link href="/about#preservation" className="hover:text-[#F2C765] transition-colors">
                  Preservation Philosophy
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#221D18] border border-[#3A3026] text-xs text-[#E0AB3A] mt-2">
                  <Sparkles className="w-3 h-3" />
                  Phase 1 Foundation
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#857364]">
          <div className="flex items-center gap-2">
            <Feather className="w-3.5 h-3.5 text-[#D9732B]" />
            <span>Honoring the living oral heritage of Senegambia.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted with reverence for Gambian storytelling</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
