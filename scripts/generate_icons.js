const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\sheik\\.gemini\\antigravity\\brain\\ca391366-ebc1-4d92-ab1b-d94da4891255";

// 1. Full Composited Icon SVG (for Web Favicon, PWA icon, and Android legacy launcher)
// Background: #12100E with subtle dark gradient and fine golden rim
// Center: Radiant Senegambian sun with glowing gradient and majestic Baobab silhouette
function getFullIconSvg(isRound = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stopColor="#1E1915" />
      <stop offset="70%" stopColor="#12100E" />
      <stop offset="100%" stopColor="#0A0807" />
    </radialGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFEAA7" stopOpacity="1" />
      <stop offset="35%" stopColor="#F2C765" stopOpacity="0.95" />
      <stop offset="70%" stopColor="#E0AB3A" stopOpacity="0.85" />
      <stop offset="100%" stopColor="#D9732B" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F2C765" stopOpacity="0.6" />
      <stop offset="50%" stopColor="#D9732B" stopOpacity="0.2" />
      <stop offset="100%" stopColor="#E0AB3A" stopOpacity="0.5" />
    </linearGradient>
    <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#1B3F48" stopOpacity="0" />
      <stop offset="40%" stopColor="#2E626D" stopOpacity="0.6" />
      <stop offset="60%" stopColor="#4B8590" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#1B3F48" stopOpacity="0" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  ${
    isRound
      ? `<circle cx="256" cy="256" r="250" fill="url(#bgGrad)" stroke="url(#rimGrad)" stroke-width="6" />`
      : `<rect width="512" height="512" rx="112" fill="url(#bgGrad)" stroke="url(#rimGrad)" stroke-width="4" />`
  }

  <!-- Sun Rays Ambient Halo -->
  <circle cx="256" cy="225" r="140" fill="url(#sunGlow)" opacity="0.35" />

  <!-- Core Golden Sun -->
  <circle cx="256" cy="225" r="95" fill="url(#sunGlow)" />
  <circle cx="256" cy="225" r="50" fill="#FFF3D1" opacity="0.45" />

  <!-- River Gambia Water Ribbon (Beneath Bantaba) -->
  <path d="M 120 380 Q 200 370, 256 385 T 392 378 Q 420 384, 440 395" 
        fill="none" stroke="url(#riverGrad)" stroke-width="6" stroke-linecap="round" />

  <!-- Ground Mound / Bantaba Base -->
  <path d="M 80 405 Q 180 375, 256 375 Q 332 375, 432 405 L 432 440 Q 332 445, 256 445 Q 180 445, 80 440 Z" 
        fill="#0D0B0A" />

  <!-- The Ancient Baobab (Bantaba Tree of Stories) -->
  <!-- Sturdy trunk and roots -->
  <path d="
    M 215 385
    C 210 350, 222 305, 224 260
    C 190 245, 155 235, 140 210
    C 148 202, 165 208, 185 220
    C 205 230, 220 242, 230 252
    C 232 230, 230 195, 220 170
    C 228 165, 240 172, 244 195
    C 248 215, 248 235, 250 250
    C 253 210, 258 175, 262 145
    C 270 145, 274 165, 272 190
    C 270 215, 268 238, 266 252
    C 276 238, 290 220, 310 200
    C 318 206, 316 218, 300 232
    C 285 246, 275 255, 272 265
    C 280 272, 315 258, 355 245
    C 362 254, 350 262, 332 270
    C 305 282, 282 284, 274 292
    C 278 330, 286 355, 298 385
    C 320 392, 345 398, 360 405
    C 345 408, 320 404, 295 398
    C 275 402, 256 403, 235 398
    C 210 404, 180 408, 165 405
    C 180 398, 200 392, 215 385
    Z" 
    fill="#0A0807" />

  <!-- Foliage Tufts on Crown of Baobab -->
  <circle cx="150" cy="205" r="28" fill="#0A0807" />
  <circle cx="185" cy="180" r="26" fill="#0A0807" />
  <circle cx="225" cy="155" r="30" fill="#0A0807" />
  <circle cx="265" cy="135" r="32" fill="#0A0807" />
  <circle cx="310" cy="155" r="28" fill="#0A0807" />
  <circle cx="345" cy="190" r="26" fill="#0A0807" />
  <circle cx="360" cy="235" r="24" fill="#0A0807" />
  <circle cx="260" cy="170" r="34" fill="#0A0807" />
  <circle cx="205" cy="210" r="25" fill="#0A0807" />
  <circle cx="315" cy="215" r="25" fill="#0A0807" />

  <!-- Delicate Griot Gold Sparkles (Representing Living Oral Stories) -->
  <circle cx="185" cy="140" r="3" fill="#FFEAA7" opacity="0.9" />
  <circle cx="330" cy="130" r="2.5" fill="#FFEAA7" opacity="0.8" />
  <circle cx="275" cy="110" r="3.5" fill="#F2C765" opacity="0.95" />
  <circle cx="130" cy="250" r="2" fill="#FFEAA7" opacity="0.75" />
  <circle cx="380" cy="270" r="2" fill="#F2C765" opacity="0.8" />
</svg>`;
}

// 2. Android Adaptive Icon Foreground SVG (108x108 viewport, safe circle is central 66x66)
// Centered at (54, 54), scale fits in radius 33
function getAdaptiveForegroundSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="108" height="108">
  <defs>
    <radialGradient id="fgSun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFEAA7" stopOpacity="1" />
      <stop offset="40%" stopColor="#F2C765" stopOpacity="0.95" />
      <stop offset="75%" stopColor="#E0AB3A" stopOpacity="0.85" />
      <stop offset="100%" stopColor="#D9732B" stopOpacity="0.2" />
    </radialGradient>
  </defs>

  <!-- Glowing Sun within 66dp Safe Area (Center: 54, 50, radius 20) -->
  <circle cx="54" cy="48" r="20" fill="url(#fgSun)" />
  <circle cx="54" cy="48" r="10" fill="#FFF3D1" opacity="0.5" />

  <!-- River Glow Ribbon -->
  <path d="M 28 78 Q 42 75, 54 78 T 80 77" 
        fill="none" stroke="#2E626D" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />

  <!-- Ground Bantaba Mound -->
  <path d="M 22 82 Q 40 76, 54 76 Q 68 76, 86 82 L 86 88 L 22 88 Z" fill="#0A0807" />

  <!-- Baobab Tree Scaled to 108dp canvas (centered at 54) -->
  <path d="
    M 46 78
    C 45 71, 47 62, 48 53
    C 41 50, 34 48, 31 43
    C 33 41, 36 43, 40 45
    C 44 47, 47 49, 49 51
    C 49 47, 49 40, 47 35
    C 49 34, 51 35, 52 40
    C 53 44, 53 48, 53 51
    C 54 43, 55 36, 56 30
    C 57 30, 58 34, 58 39
    C 57 44, 57 49, 56 51
    C 58 48, 61 45, 65 41
    C 67 42, 66 44, 63 47
    C 60 50, 58 52, 57 54
    C 59 55, 66 52, 74 50
    C 75 52, 73 53, 69 55
    C 64 57, 59 58, 58 59
    C 59 67, 60 72, 63 78
    C 67 79, 72 80, 75 82
    C 72 83, 67 82, 62 81
    C 58 82, 54 82, 50 81
    C 45 82, 39 83, 36 82
    C 39 81, 43 79, 46 78
    Z" 
    fill="#0A0807" />

  <!-- Canopy Tufts -->
  <circle cx="33" cy="42" r="6" fill="#0A0807" />
  <circle cx="40" cy="37" r="5.5" fill="#0A0807" />
  <circle cx="48" cy="32" r="6.5" fill="#0A0807" />
  <circle cx="56" cy="28" r="7" fill="#0A0807" />
  <circle cx="65" cy="32" r="6" fill="#0A0807" />
  <circle cx="72" cy="39" r="5.5" fill="#0A0807" />
  <circle cx="75" cy="48" r="5" fill="#0A0807" />
  <circle cx="55" cy="35" r="7.5" fill="#0A0807" />
  <circle cx="44" cy="43" r="5.5" fill="#0A0807" />
  <circle cx="66" cy="44" r="5.5" fill="#0A0807" />

  <!-- Gold Star Particles -->
  <circle cx="40" cy="29" r="0.8" fill="#FFEAA7" />
  <circle cx="69" cy="27" r="0.7" fill="#FFEAA7" />
  <circle cx="58" cy="23" r="0.9" fill="#F2C765" />
</svg>`;
}

// Helper to write an HTML container for Chrome screenshotting
function createHtmlForSvg(svgContent, bg = "transparent") {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${bg};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;
}

// Convert a single HTML string into a PNG of exact width and height via Chrome
function renderPng(htmlContent, outPngPath, width, height) {
  const absOutPath = path.resolve(outPngPath);
  const tmpHtml = path.join(ARTIFACT_DIR, `temp_render_${width}x${height}_${Date.now()}.html`);
  fs.writeFileSync(tmpHtml, htmlContent, "utf8");

  try {
    execFileSync(
      CHROME_PATH,
      [
        "--headless=new",
        "--hide-scrollbars",
        "--disable-gpu",
        "--force-device-scale-factor=1",
        `--window-size=${width},${height}`,
        `--screenshot=${absOutPath}`,
        `file:///${tmpHtml.replace(/\\/g, "/")}`,
      ],
      { stdio: "ignore" }
    );
  } finally {
    try {
      fs.unlinkSync(tmpHtml);
    } catch (e) {}
  }
}

// Build multi-resolution ICO file from PNG buffers
function packIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let dataOffset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Count of images

  const entries = [];
  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(dataOffset, 12); // Image offset

    dataOffset += buffer.length;
    entries.push(entry);
  }

  return Buffer.concat([
    header,
    ...entries,
    ...pngBuffers.map((p) => p.buffer),
  ]);
}

async function main() {
  console.log("Generating Tales of The Gambia icon assets...");

  const squircleSvg = getFullIconSvg(false);
  const roundSvg = getFullIconSvg(true);
  const fgSvg = getAdaptiveForegroundSvg();

  // Save the SVGs into artifact and public dirs for inspection
  fs.writeFileSync(path.join(ARTIFACT_DIR, "icon_squircle.svg"), squircleSvg, "utf8");
  fs.writeFileSync(path.join(ARTIFACT_DIR, "icon_round.svg"), roundSvg, "utf8");
  fs.writeFileSync(path.join(ARTIFACT_DIR, "icon_adaptive_foreground.svg"), fgSvg, "utf8");
  fs.writeFileSync(path.join("public", "icon.svg"), squircleSvg, "utf8");

  const squircleHtml = createHtmlForSvg(squircleSvg, "#12100E");
  const roundHtml = createHtmlForSvg(roundSvg, "#12100E");
  const fgHtml = createHtmlForSvg(fgSvg, "transparent");

  // 1. Android Launcher Icons (both square/squircle and round)
  const androidMipmaps = [
    { dir: "android/app/src/main/res/mipmap-mdpi", size: 48, fgSize: 108 },
    { dir: "android/app/src/main/res/mipmap-hdpi", size: 72, fgSize: 162 },
    { dir: "android/app/src/main/res/mipmap-xhdpi", size: 96, fgSize: 216 },
    { dir: "android/app/src/main/res/mipmap-xxhdpi", size: 144, fgSize: 324 },
    { dir: "android/app/src/main/res/mipmap-xxxhdpi", size: 192, fgSize: 432 },
  ];

  for (const m of androidMipmaps) {
    if (!fs.existsSync(m.dir)) fs.mkdirSync(m.dir, { recursive: true });

    const icPath = path.join(m.dir, "ic_launcher.png");
    const icRoundPath = path.join(m.dir, "ic_launcher_round.png");
    const icFgPath = path.join(m.dir, "ic_launcher_foreground.png");

    renderPng(squircleHtml, icPath, m.size, m.size);
    renderPng(roundHtml, icRoundPath, m.size, m.size);
    renderPng(fgHtml, icFgPath, m.fgSize, m.fgSize);
    console.log(`Rendered Android mipmap ${m.dir} (${m.size}x${m.size})`);
  }

  // 2. Web App Icons & Favicons
  console.log("Rendering Web Favicons and Apple Touch Icons...");
  const webAssets = [
    { out: "public/favicon-16x16.png", size: 16, html: roundHtml },
    { out: "public/favicon-32x32.png", size: 32, html: roundHtml },
    { out: "public/favicon-48x48.png", size: 48, html: roundHtml },
    { out: "public/apple-touch-icon.png", size: 180, html: squircleHtml },
    { out: "public/icon-192.png", size: 192, html: squircleHtml },
    { out: "public/icon-512.png", size: 512, html: squircleHtml },
    { out: "app/apple-icon.png", size: 180, html: squircleHtml },
    { out: "app/icon.png", size: 512, html: squircleHtml },
  ];

  for (const w of webAssets) {
    renderPng(w.html, w.out, w.size, w.size);
    console.log(`Rendered ${w.out} (${w.size}x${w.size})`);
  }

  // 3. Create Multi-Size .ico file for app/favicon.ico and public/favicon.ico
  const icoPngs = [
    { buffer: fs.readFileSync("public/favicon-16x16.png"), size: 16 },
    { buffer: fs.readFileSync("public/favicon-32x32.png"), size: 32 },
    { buffer: fs.readFileSync("public/favicon-48x48.png"), size: 48 },
  ];
  const icoBuffer = packIco(icoPngs);
  fs.writeFileSync("app/favicon.ico", icoBuffer);
  fs.writeFileSync("public/favicon.ico", icoBuffer);
  // Also copy to Android assets for Capacitor WebView
  const androidAssetsPublic = "android/app/src/main/assets/public";
  if (fs.existsSync(androidAssetsPublic)) {
    fs.writeFileSync(path.join(androidAssetsPublic, "favicon.ico"), icoBuffer);
  }
  console.log("Successfully packed multi-resolution favicon.ico!");

  // Clean up temporary 48x48 if desired
  try {
    fs.unlinkSync("public/favicon-48x48.png");
  } catch (e) {}

  console.log("All icon assets generated successfully!");
}

main().catch((err) => {
  console.error("Icon generation error:", err);
  process.exit(1);
});
