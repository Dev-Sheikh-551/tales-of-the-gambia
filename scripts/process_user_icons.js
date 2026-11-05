const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { execFileSync } = require("child_process");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const APP_DIR = path.join(PROJECT_ROOT, "app");
const ANDROID_RES_DIR = path.join(PROJECT_ROOT, "android", "app", "src", "main", "res");

const APP_ICON_SRC = path.join(PUBLIC_DIR, "app-icon.png");
const APP_FAVICON_SRC = path.join(PUBLIC_DIR, "app-favicon-icon.png");

// 1. Render HTML via headless Chrome to an exact-size PNG
function renderToPng(htmlContent, outPath, width, height) {
  const tmpHtml = path.join(PROJECT_ROOT, `temp_render_${width}x${height}_${Date.now()}.html`);
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
        `--screenshot=${path.resolve(outPath)}`,
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

// 2. HTML Templates
function getFullIconHtml(imagePath) {
  const fileUrl = `file:///${imagePath.replace(/\\/g, "/")}`;
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
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
</head>
<body>
  <img src="${fileUrl}" />
</body>
</html>`;
}

function getRoundIconHtml(imagePath) {
  const fileUrl = `file:///${imagePath.replace(/\\/g, "/")}`;
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
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
</style>
</head>
<body>
  <img src="${fileUrl}" />
</body>
</html>`;
}

function getAdaptiveForegroundHtml(imagePath) {
  const fileUrl = `file:///${imagePath.replace(/\\/g, "/")}`;
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
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 72%;
    height: 72%;
    object-fit: contain;
    display: block;
  }
</style>
</head>
<body>
  <img src="${fileUrl}" />
</body>
</html>`;
}

// 3. PNG Decoder in pure Node.js
function decodePng(buffer) {
  let offset = 8;
  let width, height, bitDepth, colorType;
  const idatChunks = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.slice(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = colorType === 6 ? 4 : (colorType === 2 ? 3 : 4);
  const stride = width * bpp;
  const rawRgba = Buffer.alloc(width * height * 4);

  let srcPos = 0;
  const prevRow = Buffer.alloc(stride, 0);
  const currRow = Buffer.alloc(stride, 0);

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++];
    for (let i = 0; i < stride; i++) {
      const x = decompressed[srcPos++];
      const a = i >= bpp ? currRow[i - bpp] : 0;
      const b = prevRow[i];
      const c = i >= bpp ? prevRow[i - bpp] : 0;

      let val = x;
      if (filterType === 1) val = (x + a) & 0xff;
      else if (filterType === 2) val = (x + b) & 0xff;
      else if (filterType === 3) val = (x + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (x + pr) & 0xff;
      }
      currRow[i] = val;
    }

    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4;
      const srcIdx = x * bpp;
      rawRgba[dstIdx + 0] = currRow[srcIdx + 0]; // R
      rawRgba[dstIdx + 1] = currRow[srcIdx + 1]; // G
      rawRgba[dstIdx + 2] = currRow[srcIdx + 2]; // B
      rawRgba[dstIdx + 3] = bpp === 4 ? currRow[srcIdx + 3] : 0xff; // A
    }

    currRow.copy(prevRow);
  }

  return { width, height, rgba: rawRgba };
}

// 4. Build standard uncompressed DIB/BMP ICO file
function buildDIBIco(sizes) {
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let currentOffset = 6 + count * 16;
  const dirEntries = [];
  const imageBuffers = [];

  for (const item of sizes) {
    const { width, height, rgba } = item;
    const bmpHeader = Buffer.alloc(40);
    bmpHeader.writeUInt32LE(40, 0); // biSize
    bmpHeader.writeInt32LE(width, 4); // biWidth
    bmpHeader.writeInt32LE(height * 2, 8); // biHeight (doubled for mask in ICO)
    bmpHeader.writeUInt16LE(1, 12); // biPlanes
    bmpHeader.writeUInt16LE(32, 14); // biBitCount (32-bit RGBA)
    bmpHeader.writeUInt32LE(0, 16); // biCompression (BI_RGB)
    bmpHeader.writeUInt32LE(width * height * 4, 20); // biSizeImage

    const pixelData = Buffer.alloc(width * height * 4);
    const maskRowSize = Math.floor((width + 31) / 32) * 4;
    const maskData = Buffer.alloc(maskRowSize * height, 0);

    for (let y = 0; y < height; y++) {
      const srcY = height - 1 - y;
      for (let x = 0; x < width; x++) {
        const srcIdx = (srcY * width + x) * 4;
        const dstIdx = (y * width + x) * 4;
        pixelData[dstIdx + 0] = rgba[srcIdx + 2]; // B
        pixelData[dstIdx + 1] = rgba[srcIdx + 1]; // G
        pixelData[dstIdx + 2] = rgba[srcIdx + 0]; // R
        pixelData[dstIdx + 3] = rgba[srcIdx + 3]; // A
      }
    }

    const totalImageSize = bmpHeader.length + pixelData.length + maskData.length;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(totalImageSize, 8);
    entry.writeUInt32LE(currentOffset, 12);

    currentOffset += totalImageSize;
    dirEntries.push(entry);
    imageBuffers.push(Buffer.concat([bmpHeader, pixelData, maskData]));
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

async function main() {
  console.log("=== Replacing Icons with User Provided Assets ===");
  console.log("App Icon Source:", APP_ICON_SRC);
  console.log("Favicon Source:", APP_FAVICON_SRC);

  if (!fs.existsSync(APP_ICON_SRC)) throw new Error("Missing public/app-icon.png");
  if (!fs.existsSync(APP_FAVICON_SRC)) throw new Error("Missing public/app-favicon-icon.png");

  const fullIconHtml = getFullIconHtml(APP_ICON_SRC);
  const roundIconHtml = getRoundIconHtml(APP_ICON_SRC);
  const adaptiveFgHtml = getAdaptiveForegroundHtml(APP_ICON_SRC);

  const faviconHtml = getFullIconHtml(APP_FAVICON_SRC);

  // 1. Android Mipmap Folders
  console.log("\n[1/4] Generating Android Launcher Mipmaps...");
  const mipmaps = [
    { dir: path.join(ANDROID_RES_DIR, "mipmap-mdpi"), size: 48, fgSize: 108 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-hdpi"), size: 72, fgSize: 162 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-xhdpi"), size: 96, fgSize: 216 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-xxhdpi"), size: 144, fgSize: 324 },
    { dir: path.join(ANDROID_RES_DIR, "mipmap-xxxhdpi"), size: 192, fgSize: 432 },
  ];

  for (const m of mipmaps) {
    if (!fs.existsSync(m.dir)) fs.mkdirSync(m.dir, { recursive: true });

    renderToPng(fullIconHtml, path.join(m.dir, "ic_launcher.png"), m.size, m.size);
    renderToPng(roundIconHtml, path.join(m.dir, "ic_launcher_round.png"), m.size, m.size);
    renderToPng(adaptiveFgHtml, path.join(m.dir, "ic_launcher_foreground.png"), m.fgSize, m.fgSize);
    console.log(`Updated Android ${path.basename(m.dir)}`);
  }

  // Ensure mipmap-anydpi-v26 references the mipmap foreground
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

  // 2. Web App Icons (from app-icon.png)
  console.log("\n[2/4] Generating Web and PWA App Icons...");
  const webAppIcons = [
    { out: path.join(APP_DIR, "icon.png"), size: 512, html: fullIconHtml },
    { out: path.join(APP_DIR, "apple-icon.png"), size: 180, html: fullIconHtml },
    { out: path.join(PUBLIC_DIR, "icon-512.png"), size: 512, html: fullIconHtml },
    { out: path.join(PUBLIC_DIR, "icon-192.png"), size: 192, html: fullIconHtml },
    { out: path.join(PUBLIC_DIR, "apple-touch-icon.png"), size: 180, html: fullIconHtml },
  ];

  for (const w of webAppIcons) {
    renderToPng(w.html, w.out, w.size, w.size);
    console.log(`Rendered ${path.relative(PROJECT_ROOT, w.out)} (${w.size}x${w.size})`);
  }

  // 3. Web Favicons (from app-favicon-icon.png)
  console.log("\n[3/4] Generating Favicon PNGs...");
  const favSizes = [16, 32, 48];
  const decodedFavicons = [];

  for (const size of favSizes) {
    const pngPath = path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`);
    renderToPng(faviconHtml, pngPath, size, size);
    console.log(`Rendered ${path.relative(PROJECT_ROOT, pngPath)} (${size}x${size})`);

    const decoded = decodePng(fs.readFileSync(pngPath));
    decodedFavicons.push(decoded);
  }

  // 4. Pack into DIB/BMP ICO
  console.log("\n[4/4] Packing multi-resolution favicon.ico...");
  const icoBuffer = buildDIBIco(decodedFavicons);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(APP_DIR, "favicon.ico"), icoBuffer);

  const androidPublic = path.join(PROJECT_ROOT, "android", "app", "src", "main", "assets", "public");
  if (fs.existsSync(androidPublic)) {
    fs.writeFileSync(path.join(androidPublic, "favicon.ico"), icoBuffer);
  }
  console.log("Successfully wrote favicon.ico (size:", icoBuffer.length, "bytes)");

  // Clean up temporary 48x48
  try {
    fs.unlinkSync(path.join(PUBLIC_DIR, "favicon-48x48.png"));
  } catch (e) {}

  console.log("\nAll icons and favicons successfully replaced with user assets!");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
