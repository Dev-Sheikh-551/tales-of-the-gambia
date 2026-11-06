const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const APP_DIR = path.join(PROJECT_ROOT, "app");
const ANDROID_RES_DIR = path.join(PROJECT_ROOT, "android", "app", "src", "main", "res");
const FAVICON_ARTWORK_SRC = path.join(PUBLIC_DIR, "app-favicon-icon.png");

async function generateIcons() {
  console.log("=== Generating Android Launcher Icons with Sharp ===");
  console.log("Source artwork:", FAVICON_ARTWORK_SRC);

  if (!fs.existsSync(FAVICON_ARTWORK_SRC)) {
    throw new Error("Missing public/app-favicon-icon.png");
  }

  const mipmaps = [
    { dir: path.join(ANDROID_RES_DIR, "mipmap-mdpi"), size: 48, fgSize: 108 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-hdpi"), size: 72, fgSize: 162 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-xhdpi"), size: 96, fgSize: 216 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-xxhdpi"), size: 144, fgSize: 324 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-xxxhdpi"), size: 192, fgSize: 432 },
  ];

  for (const m of mipmaps) {
    if (!fs.existsSync(m.dir)) fs.mkdirSync(m.dir, { recursive: true });

    // 1. Standard Square Icon (solid #12100E background, no transparent border)
    const stdArtworkSize = Math.round(m.size * 0.80);
    const stdArtworkBuffer = await sharp(FAVICON_ARTWORK_SRC)
      .resize(stdArtworkSize, stdArtworkSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp({
      create: {
        width: m.size,
        height: m.size,
        channels: 4,
        background: { r: 0x12, g: 0x10, b: 0x0E, alpha: 1 },
      },
    })
      .composite([{ input: stdArtworkBuffer, gravity: "center" }])
      .png()
      .toFile(path.join(m.dir, "ic_launcher.png"));

    // 2. Round Icon (solid #12100E circular disc, transparent corners)
    const radius = m.size / 2;
    const circleSvg = Buffer.from(
      `<svg width="${m.size}" height="${m.size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="#12100E" /></svg>`
    );
    const roundArtworkSize = Math.round(m.size * 0.74);
    const roundArtworkBuffer = await sharp(FAVICON_ARTWORK_SRC)
      .resize(roundArtworkSize, roundArtworkSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp({
      create: {
        width: m.size,
        height: m.size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: circleSvg, gravity: "center" },
        { input: roundArtworkBuffer, gravity: "center" },
      ])
      .png()
      .toFile(path.join(m.dir, "ic_launcher_round.png"));

    // 3. Adaptive Foreground Icon (108dp canvas, artwork scaled to 60% inside 66dp safe zone, transparent background)
    const fgArtworkSize = Math.round(m.fgSize * 0.60);
    const fgArtworkBuffer = await sharp(FAVICON_ARTWORK_SRC)
      .resize(fgArtworkSize, fgArtworkSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp({
      create: {
        width: m.fgSize,
        height: m.fgSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: fgArtworkBuffer, gravity: "center" }])
      .png()
      .toFile(path.join(m.dir, "ic_launcher_foreground.png"));

    console.log(`Updated Android ${path.basename(m.dir)}`);
  }

  // Ensure mipmap-anydpi-v26 references
  const anydpiDir = path.join(ANDROID_RES_DIR, "mipmap-anydpi-v26");
  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  fs.writeFileSync(path.join(anydpiDir, "ic_launcher.xml"), adaptiveXml, "utf8");
  fs.writeFileSync(path.join(anydpiDir, "ic_launcher_round.xml"), adaptiveXml, "utf8");
  console.log("Updated Android adaptive icon XML configs.");

  // Clean obsolete drawables
  const obsoleteVector = path.join(ANDROID_RES_DIR, "drawable", "ic_launcher_foreground.xml");
  const obsoleteVectorV24 = path.join(ANDROID_RES_DIR, "drawable-v24", "ic_launcher_foreground.xml");
  if (fs.existsSync(obsoleteVector)) fs.unlinkSync(obsoleteVector);
  if (fs.existsSync(obsoleteVectorV24)) fs.unlinkSync(obsoleteVectorV24);

  // Update web PWA app icons (512, 192, 180) to match
  const webSizes = [
    { out: path.join(APP_DIR, "icon.png"), size: 512 },
    { out: path.join(APP_DIR, "apple-icon.png"), size: 180 },
    { out: path.join(PUBLIC_DIR, "icon-512.png"), size: 512 },
    { out: path.join(PUBLIC_DIR, "icon-192.png"), size: 192 },
    { out: path.join(PUBLIC_DIR, "apple-touch-icon.png"), size: 180 },
  ];

  for (const w of webSizes) {
    const artSize = Math.round(w.size * 0.80);
    const artBuf = await sharp(FAVICON_ARTWORK_SRC)
      .resize(artSize, artSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp({
      create: {
        width: w.size,
        height: w.size,
        channels: 4,
        background: { r: 0x12, g: 0x10, b: 0x0E, alpha: 1 },
      },
    })
      .composite([{ input: artBuf, gravity: "center" }])
      .png()
      .toFile(w.out);
    console.log(`Updated ${path.relative(PROJECT_ROOT, w.out)} (${w.size}x${w.size})`);
  }

  console.log("\nAll Android icons and web PWA icons generated successfully with Sharp!");
}

generateIcons().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
