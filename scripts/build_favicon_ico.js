const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\sheik\\.gemini\\antigravity\\brain\\ca391366-ebc1-4d92-ab1b-d94da4891255";

function buildDIBIco(sizes) {
  // sizes is array of { width, height, pixels: Buffer of RGBA }
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

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
    // 1-bit AND mask row must be aligned to 32 bits (4 bytes)
    const maskRowSize = Math.floor((width + 31) / 32) * 4;
    const maskData = Buffer.alloc(maskRowSize * height, 0);

    // BMP rows are bottom-to-top, BGRA format
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
    entry.writeUInt8(0, 2); // no color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(totalImageSize, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset

    currentOffset += totalImageSize;
    dirEntries.push(entry);
    imageBuffers.push(Buffer.concat([bmpHeader, pixelData, maskData]));
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

// Generate RGBA pixels by rendering math model of our icon
function generateIconPixels(size) {
  const buf = Buffer.alloc(size * size * 4);
  const center = size / 2;
  const radius = size * 0.48;
  const sunCenterY = size * 0.44;
  const sunRadius = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - center;
      const dy = y - center;
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);

      // Outside round border: transparent
      if (distFromCenter > radius) {
        buf[idx + 0] = 0;
        buf[idx + 1] = 0;
        buf[idx + 2] = 0;
        buf[idx + 3] = 0;
        continue;
      }

      // Base background: #12100E with rim
      let r = 0x12;
      let g = 0x10;
      let b = 0x0E;
      let a = 0xFF;

      // Fine golden rim
      if (distFromCenter >= radius - 1.2) {
        r = 0xE0;
        g = 0xAB;
        b = 0x3A;
        a = 0xDD;
        buf[idx + 0] = r;
        buf[idx + 1] = g;
        buf[idx + 2] = b;
        buf[idx + 3] = a;
        continue;
      }

      // Sun glow
      const sunDx = x - center;
      const sunDy = y - sunCenterY;
      const sunDist = Math.sqrt(sunDx * sunDx + sunDy * sunDy);
      if (sunDist <= sunRadius) {
        const factor = sunDist / sunRadius; // 0 at center, 1 at edge
        // Interpolate #FFEAA7 -> #E0AB3A -> #D9732B
        r = Math.round(0xFF * (1 - factor * 0.15));
        g = Math.round(0xEA - factor * (0xEA - 0x73));
        b = Math.round(0xA7 - factor * (0xA7 - 0x2B));
      } else if (sunDist <= sunRadius * 1.5) {
        const haloFactor = (sunDist - sunRadius) / (sunRadius * 0.5);
        r = Math.round(r * haloFactor + 0xD9 * (1 - haloFactor));
        g = Math.round(g * haloFactor + 0x73 * (1 - haloFactor));
        b = Math.round(b * haloFactor + 0x2B * (1 - haloFactor));
      }

      // Baobab tree silhouette (central trunk and crown)
      const nx = (x - center) / size; // -0.5 to 0.5
      const ny = (y - center) / size; // -0.5 to 0.5

      // Ground mound: ny > 0.22
      const isGround = ny > 0.22 + 0.1 * Math.pow(nx * 2, 2);

      // Baobab Trunk
      const isTrunk = ny >= -0.05 && ny <= 0.28 && Math.abs(nx) <= (0.07 + 0.08 * (ny - 0.05));

      // Baobab Crown / Canopy (branches & tufts)
      const crownDist1 = Math.sqrt(Math.pow(nx - 0.0, 2) + Math.pow(ny - (-0.16), 2));
      const crownDist2 = Math.sqrt(Math.pow(nx - (-0.14), 2) + Math.pow(ny - (-0.08), 2));
      const crownDist3 = Math.sqrt(Math.pow(nx - 0.14), 2 + Math.pow(ny - (-0.08), 2));
      const crownDist4 = Math.sqrt(Math.pow(nx - (-0.22)), 2 + Math.pow(ny - 0.0), 2);
      const crownDist5 = Math.sqrt(Math.pow(nx - 0.22), 2 + Math.pow(ny - 0.0), 2);

      const isCrown =
        crownDist1 <= 0.15 ||
        crownDist2 <= 0.13 ||
        crownDist3 <= 0.13 ||
        (crownDist4 <= 0.11 && ny < 0.05) ||
        (crownDist5 <= 0.11 && ny < 0.05);

      if (isGround || isTrunk || isCrown) {
        // Deep tree dark: #0A0807
        r = 0x0A;
        g = 0x08;
        b = 0x07;
      }

      buf[idx + 0] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    }
  }

  return buf;
}

const ico16 = { width: 16, height: 16, rgba: generateIconPixels(16) };
const ico32 = { width: 32, height: 32, rgba: generateIconPixels(32) };
const ico48 = { width: 48, height: 48, rgba: generateIconPixels(48) };

const icoBuffer = buildDIBIco([ico16, ico32, ico48]);
fs.writeFileSync("app/favicon.ico", icoBuffer);
fs.writeFileSync("public/favicon.ico", icoBuffer);

const androidAssetsPublic = "android/app/src/main/assets/public";
if (fs.existsSync(androidAssetsPublic)) {
  fs.writeFileSync(path.join(androidAssetsPublic, "favicon.ico"), icoBuffer);
}

console.log("DIB BMP favicon.ico written successfully. Size:", icoBuffer.length);
