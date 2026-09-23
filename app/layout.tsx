import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#12100E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Tales of The Gambia",
    default: "Tales of The Gambia | Cultural Storytelling Platform",
  },
  description:
    "An immersive digital home for Gambian folktales, fables, historical narratives, and traditional oral stories carried through generations.",
  keywords: [
    "The Gambia",
    "Gambian folktales",
    "Senegambia",
    "African storytelling",
    "Griot traditions",
    "Oral history",
    "Fables",
    "African legends",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakarta.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#12100E] text-[#F7F3EB] antialiased selection:bg-[#D9732B]/30 selection:text-[#F2C765]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

