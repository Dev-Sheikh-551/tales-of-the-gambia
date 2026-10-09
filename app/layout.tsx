import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { NativeBridgeInitializer } from "@/components/native/NativeBridgeInitializer";

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
  viewportFit: "cover",
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
  verification: {
    google: "I_94vyJz3gC0rfG0v2QrV9Y4T8MtkFhAvNeF5n_Udms",
  },
};

import { ThemeProvider } from "@/components/theme/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plusJakarta.variable} dark scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var t = localStorage.getItem('totg_theme_preference');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch(e) {}
            })()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[#D9732B]/30 selection:text-[#F2C765] transition-colors duration-200">
        <ThemeProvider>
          <NativeBridgeInitializer />
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

