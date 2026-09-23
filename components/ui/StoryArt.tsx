import React from "react";

interface StoryArtProps {
  theme: "ochre" | "river" | "earth" | "forest" | "gold";
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
}

export function StoryArt({ theme, className = "", size = "md" }: StoryArtProps) {
  // Height and aspect classes based on size
  const sizeClasses = {
    sm: "h-32 md:h-40",
    md: "h-48 md:h-64",
    lg: "h-72 md:h-96",
    hero: "h-[340px] md:h-[480px]",
  }[size];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-[#181410] border border-[#2E2721] flex items-center justify-center select-none ${sizeClasses} ${className}`}
    >
      {/* Background artwork tailored to Gambian storytelling motifs */}
      {theme === "ochre" && (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyOchre" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8C3A12" />
              <stop offset="40%" stopColor="#C96827" />
              <stop offset="75%" stopColor="#E29E4B" />
              <stop offset="100%" stopColor="#2A1B14" />
            </linearGradient>
            <radialGradient id="sunOchre" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#F39C12" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#E67E22" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Savanna Sky */}
          <rect width="800" height="600" fill="url(#skyOchre)" />
          {/* Setting Sun */}
          <circle cx="480" cy="240" r="140" fill="url(#sunOchre)" />
          <circle cx="480" cy="240" r="70" fill="#FFEAA7" opacity="0.8" />
          {/* Distant Hills / Termite Mounds */}
          <path d="M0,450 Q200,410 400,440 T800,430 L800,600 L0,600 Z" fill="#20150F" opacity="0.6" />
          {/* Savanna Foreground Floor */}
          <path d="M0,490 Q280,460 520,490 T800,480 L800,600 L0,600 Z" fill="#140E0A" />
          {/* Ancient Silk Cotton / Baobab Silhouette */}
          <path
            d="M260,510 Q240,430 220,360 Q170,330 110,310 Q160,290 200,320 Q190,260 170,200 Q210,230 230,280 Q250,210 270,160 Q285,220 280,280 Q320,230 380,210 Q340,260 300,310 Q370,300 440,330 Q360,350 300,370 Q280,440 295,510 Z"
            fill="#0F0A07"
          />
          {/* Delicate foliage tufts */}
          <circle cx="150" cy="230" r="50" fill="#0C0805" opacity="0.9" />
          <circle cx="270" cy="170" r="60" fill="#0C0805" opacity="0.95" />
          <circle cx="360" cy="230" r="55" fill="#0C0805" opacity="0.9" />
          <circle cx="220" cy="260" r="45" fill="#0C0805" opacity="0.9" />
          {/* Subtle Bird Silhouettes in flight */}
          <path d="M530,160 Q540,150 550,158 Q560,150 570,160 Q555,164 530,160 Z" fill="#2A1B14" opacity="0.8" />
          <path d="M590,130 Q597,122 605,128 Q613,122 620,130 Q608,133 590,130 Z" fill="#2A1B14" opacity="0.7" />
        </svg>
      )}

      {theme === "river" && (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="riverSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B1C22" />
              <stop offset="45%" stopColor="#1B3F48" />
              <stop offset="75%" stopColor="#2E626D" />
              <stop offset="100%" stopColor="#142B30" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B3A40" />
              <stop offset="50%" stopColor="#12272B" />
              <stop offset="100%" stopColor="#0A1517" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#riverSky)" />
          {/* Soft Moon */}
          <circle cx="220" cy="180" r="50" fill="#E8F4F8" opacity="0.85" />
          <circle cx="220" cy="180" r="80" fill="#A8D4E2" opacity="0.15" />
          {/* Distant Mangroves on River Horizon */}
          <path
            d="M0,360 Q120,340 260,355 T540,345 T800,360 L800,600 L0,600 Z"
            fill="#0E1E21"
          />
          {/* Water Surface with River Gambia reflections */}
          <rect y="380" width="800" height="220" fill="url(#waterGrad)" opacity="0.95" />
          {/* Moon Reflection on River */}
          <ellipse cx="220" cy="430" rx="40" ry="6" fill="#A8D4E2" opacity="0.3" />
          <ellipse cx="220" cy="460" rx="55" ry="5" fill="#A8D4E2" opacity="0.2" />
          <ellipse cx="220" cy="500" rx="70" ry="4" fill="#A8D4E2" opacity="0.15" />
          {/* Canoe (Piass) and Fisherman silhouette */}
          <path
            d="M480,440 Q550,455 620,440 Q590,460 510,460 Z"
            fill="#060C0E"
          />
          <path
            d="M525,442 L527,412 Q532,408 535,412 L537,442 Z"
            fill="#060C0E"
          />
          <circle cx="531" cy="404" r="5" fill="#060C0E" />
          <line x1="535" y1="418" x2="560" y2="465" stroke="#060C0E" strokeWidth="2.5" />
        </svg>
      )}

      {theme === "earth" && (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="earthSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C140F" />
              <stop offset="50%" stopColor="#38251B" />
              <stop offset="85%" stopColor="#5E3823" />
              <stop offset="100%" stopColor="#1E130D" />
            </linearGradient>
            <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5B041" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#E67E22" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#BA4A00" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#earthSky)" />
          {/* Giant Baobab Silhouette */}
          <path
            d="M360,540 Q340,360 300,280 Q240,250 160,220 Q220,180 280,240 Q290,140 270,80 Q320,130 330,220 Q380,120 440,70 Q430,160 410,230 Q470,170 560,180 Q480,230 430,270 Q410,360 440,540 Z"
            fill="#0F0906"
          />
          {/* Baobab Broad Foliage Crown */}
          <ellipse cx="230" cy="180" rx="80" ry="40" fill="#0C0704" />
          <ellipse cx="360" cy="110" rx="90" ry="45" fill="#0C0704" />
          <ellipse cx="490" cy="160" rx="85" ry="40" fill="#0C0704" />
          {/* Campfire Glow under the tree */}
          <circle cx="560" cy="480" r="100" fill="url(#fireGlow)" />
          {/* Seated Storyteller with Kora */}
          <circle cx="500" cy="460" r="10" fill="#0A0604" />
          <path d="M488,470 Q500,470 512,470 L514,510 L486,510 Z" fill="#0A0604" />
          {/* Kora Calabash & Neck */}
          <circle cx="518" cy="495" r="14" fill="#E59866" opacity="0.4" />
          <line x1="518" y1="460" x2="518" y2="520" stroke="#E59866" strokeWidth="2.5" opacity="0.6" />
        </svg>
      )}

      {theme === "forest" && (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="forestSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B170E" />
              <stop offset="40%" stopColor="#142B1A" />
              <stop offset="80%" stopColor="#22422A" />
              <stop offset="100%" stopColor="#0B170E" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#forestSky)" />
          {/* Canopy stars */}
          <circle cx="120" cy="80" r="2" fill="#FDFEFE" opacity="0.9" />
          <circle cx="280" cy="120" r="2.5" fill="#FDFEFE" opacity="0.7" />
          <circle cx="410" cy="60" r="3" fill="#F9E79F" opacity="0.9" />
          <circle cx="560" cy="140" r="2" fill="#FDFEFE" opacity="0.8" />
          <circle cx="680" cy="90" r="2.5" fill="#FDFEFE" opacity="0.85" />
          {/* Mahogany forest layers */}
          <path d="M0,320 Q200,280 400,300 T800,290 L800,600 L0,600 Z" fill="#112215" opacity="0.8" />
          <path d="M0,410 Q300,380 600,410 T800,390 L800,600 L0,600 Z" fill="#0A150D" />
          {/* Termite mound silhouette */}
          <path d="M520,530 Q540,430 560,420 Q580,430 600,530 Z" fill="#060C08" />
          {/* Little curled animal silhouette atop mound */}
          <circle cx="560" cy="410" r="14" fill="#F4D03F" opacity="0.4" />
        </svg>
      )}

      {theme === "gold" && (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A1F0D" />
              <stop offset="50%" stopColor="#4A3414" />
              <stop offset="80%" stopColor="#7D581E" />
              <stop offset="100%" stopColor="#1E1508" />
            </linearGradient>
            <radialGradient id="sparkle" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F9E79F" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#D4AC0D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7D6608" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#goldSky)" />
          {/* Palm Silhouette */}
          <path
            d="M380,560 Q400,350 420,230"
            stroke="#0D0904"
            strokeWidth="24"
            fill="none"
          />
          {/* Palm Fronds */}
          <path d="M420,230 Q300,190 220,260" stroke="#0D0904" strokeWidth="12" fill="none" />
          <path d="M420,230 Q340,130 290,140" stroke="#0D0904" strokeWidth="10" fill="none" />
          <path d="M420,230 Q440,90 460,90" stroke="#0D0904" strokeWidth="11" fill="none" />
          <path d="M420,230 Q510,130 560,160" stroke="#0D0904" strokeWidth="10" fill="none" />
          <path d="M420,230 Q540,210 610,270" stroke="#0D0904" strokeWidth="12" fill="none" />
          {/* Golden sparks of wisdom scattering */}
          <circle cx="430" cy="210" r="60" fill="url(#sparkle)" />
          <circle cx="360" cy="180" r="4" fill="#FEF9E7" />
          <circle cx="470" cy="170" r="5" fill="#FEF9E7" />
          <circle cx="420" cy="130" r="4.5" fill="#FEF9E7" />
          <circle cx="490" cy="240" r="3.5" fill="#FEF9E7" />
        </svg>
      )}

      {/* Atmospheric dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/40 via-transparent to-[#12100E]/40 pointer-events-none" />
    </div>
  );
}
