import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Feather, Shield, Sparkles, BookOpen, Music, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "The Oral Tradition | Tales of The Gambia",
  description:
    "Learn about the centuries-old Jali (Griot) oral heritage, the 21-string kora, and the preservation philosophy of Tales of The Gambia.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Page Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241E19] border border-[#3E352E] text-xs text-[#E0AB3A] font-medium">
          <Feather className="w-3.5 h-3.5 text-[#D9732B]" />
          <span>Senegambian Heritage</span>
        </div>

        <h1 className="font-story-serif text-4xl sm:text-6xl font-normal text-[#F7F3EB] tracking-tight leading-tight">
          The Living Voice of the{" "}
          <span className="italic bg-gradient-to-r from-[#F2C765] via-[#E0AB3A] to-[#D9732B] bg-clip-text text-transparent">
            Jali
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#CBBCAE] max-w-2xl mx-auto leading-relaxed font-light">
          In Gambian culture, storytelling is not mere entertainment. It is genealogy, history,
          moral philosophy, and communal memory preserved through sound and heart.
        </p>
      </div>

      {/* Main Narrative Articles */}
      <div className="space-y-12 text-sm sm:text-base leading-relaxed text-[#CBBCAE]">
        {/* Section 1: The Jali */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#181410] border border-[#2E2721] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D9732B]/15 border border-[#D9732B]/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#D9732B]" />
            </div>
            <h2 className="font-story-serif text-2xl text-[#F7F3EB]">Who is the Jali?</h2>
          </div>

          <p>
            Across Senegambia and West Africa, the <strong>Jali</strong> (often known in French as
            <em> griot</em>) holds a sacred position. Rather than recording historic deeds in ink or
            stone, ancient Mandinka, Wolof, Fula, Jola, and Serer societies entrusted their memory
            to hereditary families of oral historians.
          </p>
          <p>
            From childhood, an apprentice Jali spends decades committing epic genealogies,
            battles of the Kaabu Empire, proverbs, and moral fables to memory. When a Jali speaks,
            they speak with the voices of their ancestors behind them.
          </p>
        </section>

        {/* Section 2: The Kora */}
        <section
          id="kora"
          className="p-6 sm:p-8 rounded-2xl bg-[#181410] border border-[#2E2721] space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C69224]/15 border border-[#E0AB3A]/30 flex items-center justify-center">
              <Music className="w-5 h-5 text-[#F2C765]" />
            </div>
            <h2 className="font-story-serif text-2xl text-[#F7F3EB]">
              The 21 Strings of the Kora
            </h2>
          </div>

          <p>
            The kora is a 21-string harp-lute built from a large calabash gourd cut in half,
            covered in cowhide, and fitted with a hardwood neck and notched bridge.
          </p>
          <p>
            Legend tells that the first kora was played by the spirit world along the banks of the
            Gambia River before it was gifted to master musicians. The right hand plays the ostinato
            basslines that echo the steady flow of the river, while the left hand weaves intricate,
            crystalline improvisations that imitate birdsong and whispering winds.
          </p>
        </section>

        {/* Section 3: Cultural Stewardship & Ethical Principle */}
        <section
          id="preservation"
          className="p-6 sm:p-8 rounded-2xl bg-[#1F1914] border border-[#3E352E] space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#264A51]/30 border border-[#4B8590]/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#97CDD6]" />
            </div>
            <h2 className="font-story-serif text-2xl text-[#F7F3EB]">
              Our Ethical Preservation Principle
            </h2>
          </div>

          <p>
            Because traditional narratives are living heritage, <em>Tales of The Gambia</em> operates
            under a clear principle: <strong>we do not invent or fabricate Gambian history or
            customs.</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#14100E] border border-[#2A231C]">
              <span className="text-xs font-semibold text-[#F2C765] block mb-1">
                Oral Traditional
              </span>
              <span className="text-xs text-[#857364]">
                Fables, animal trickster tales, and moral stories passed down across generations.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#14100E] border border-[#2A231C]">
              <span className="text-xs font-semibold text-[#D9732B] block mb-1">
                Historical Memory
              </span>
              <span className="text-xs text-[#857364]">
                Grounded in Senegambian kingdoms, landmark treaties, and documented griot songs.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#14100E] border border-[#2A231C]">
              <span className="text-xs font-semibold text-[#97CDD6] block mb-1">
                Folkloric Adaptation
              </span>
              <span className="text-xs text-[#857364]">
                Literary retellings of classic mythic lore (such as river guardians like Ninki Nanka).
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#14100E] border border-[#2A231C]">
              <span className="text-xs font-semibold text-[#97D6A7] block mb-1">
                Original Fiction
              </span>
              <span className="text-xs text-[#857364]">
                Contemporary children&apos;s stories inspired by Gambian wildlife and ecosystems.
              </span>
            </div>
          </div>
        </section>

        {/* Call to Explore */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D9732B] to-[#C69224] text-white font-medium text-sm shadow-lg shadow-[#D9732B]/20 hover:scale-102 transition-transform"
          >
            <span>Return to the Stories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
