// Builds the site icons from the festival badge, as Next.js file conventions:
// app/favicon.ico (browsers' default request), app/icon.png and
// app/apple-icon.png (home-screen shortcut). Run: node scripts/build-icons.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "photo_clients/banque_photos/logo-festival-final-ca.png";
const NIGHT = "#141619";

// The badge on a white disc, so the inside of the star's circle reads white
// at every size (as in scripts/build-images.mjs).
const meta = await sharp(SRC).metadata();
const side = Math.min(meta.width, meta.height);
const disc = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}"><circle cx="${meta.width / 2}" cy="${meta.height / 2}" r="${side * 0.45}" fill="#fff"/></svg>`;
const badge = await sharp(Buffer.from(disc))
  .composite([{ input: await sharp(SRC).png().toBuffer() }])
  .png()
  .toBuffer();

const square = (size) => sharp(badge).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

// Browser tab icons: transparent around the badge.
await square(192).png({ compressionLevel: 9, palette: true }).toFile("app/icon.png");

// Home screen: iOS fills transparency with black, so the badge sits on the
// site's night with a margin, as on a plaque.
const inner = await square(148).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: NIGHT } })
  .composite([{ input: inner, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile("app/apple-icon.png");

// favicon.ico: PNG images in an ICO container (supported by every current browser).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => square(s).png({ compressionLevel: 9 }).toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...pngs]));
console.log("icons -> app/favicon.ico, app/icon.png, app/apple-icon.png");
