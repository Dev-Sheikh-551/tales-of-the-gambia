import React from "react";
import Link from "next/link";
import { Feather, ArrowRight, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";

export default function CulturalContextBanner() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal delay={0.1} direction="up">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E1712] via-[#221B16] to-[#171310] border border-[#3E352E] p-8 sm:p-12 shadow-xl">
            {/* Background geometric watermark */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D9732B]/10 via-[#E0AB3A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9732B]/10 border border-[#D9732B]/25 text-xs text-[#E58E45] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The Griot (Jali) Heritage</span>
              </div>

              <h3 className="font-story-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#F7F3EB] leading-snug">
                &ldquo;When an elder dies in Africa, a library burns to the ground.&rdquo;
              </h3>

              <p className="text-sm sm:text-base text-[#CBBCAE] leading-relaxed">
                In Senegambia, the Jali is not just a performer; they are historians, genealogists,
                poets, and custodians of ancestral truth. Through the 21 strings of the kora and the
                cadence of spoken memory, stories have traveled across rivers and centuries.
                Our mission is to build a modern digital hearth for these living words.
              </p>

              <div className="pt-3 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F2C765] hover:text-white transition-colors"
                >
                  <Feather className="w-4 h-4 text-[#D9732B]" />
                  <span>Learn more about Senegambian oral lineage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
