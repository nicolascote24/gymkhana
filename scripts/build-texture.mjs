// Builds the terrain texture of the pale sections: contour lines, as on a
// survey map, drawn in the earth colour at low opacity. The noise is
// periodic, so the tile repeats without a seam.
//
//   node scripts/build-texture.mjs  ->  public/textures/terrain.webp

import sharp from "sharp";
import { mkdirSync } from "node:fs";

const W = 1600;
const H = 1000;
const LEVELS = 22; // contour lines across the full height range
const INK = [107, 68, 41]; // --color-terre
const ALPHA = 0.11; // strength of a line at its centre
const LINE = 0.9; // half width of a line, in px

// Seeded random, so the texture is the same on every build.
let seed = 20070811;
const rand = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

// Periodic value noise: a lattice that wraps, smoothly interpolated.
function lattice(cx, cy) {
  const v = Array.from({ length: cx * cy }, rand);
  const at = (i, j) => v[((j + cy) % cy) * cx + ((i + cx) % cx)];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  return (x, y) => {
    const gx = (x / W) * cx;
    const gy = (y / H) * cy;
    const i = Math.floor(gx);
    const j = Math.floor(gy);
    const u = fade(gx - i);
    const w = fade(gy - j);
    const a = at(i, j) + (at(i + 1, j) - at(i, j)) * u;
    const b = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * u;
    return a + (b - a) * w;
  };
}
const octaves = [lattice(5, 3), lattice(10, 6), lattice(20, 12)];
const field = (x, y) => octaves[0](x, y) * 0.62 + octaves[1](x, y) * 0.27 + octaves[2](x, y) * 0.11;

// Height map, then each pixel's distance to the nearest contour level,
// measured in pixels through the local gradient so lines keep one width.
const h = new Float32Array(W * H);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) h[y * W + x] = field(x, y) * LEVELS;

const px = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const v = h[y * W + x];
    const gx = (h[y * W + ((x + 1) % W)] - h[y * W + ((x - 1 + W) % W)]) / 2;
    const gy = (h[((y + 1) % H) * W + x] - h[((y - 1 + H) % H) * W + x]) / 2;
    const grad = Math.hypot(gx, gy) || 1e-6;
    const dist = Math.abs(v - Math.round(v)) / grad;
    // every fifth line is an index contour, a little stronger
    const index = Math.round(v) % 5 === 0 ? 1.6 : 1;
    const a = Math.max(0, 1 - dist / (LINE * (index > 1 ? 1.3 : 1))) * ALPHA * index;
    const o = (y * W + x) * 4;
    px[o] = INK[0];
    px[o + 1] = INK[1];
    px[o + 2] = INK[2];
    px[o + 3] = Math.round(Math.min(1, a) * 255);
  }
}

mkdirSync("public/textures", { recursive: true });
const raw = () => sharp(px, { raw: { width: W, height: H, channels: 4 } });
const info = await raw().webp({ quality: 70, alphaQuality: 60, effort: 6 }).toFile("public/textures/terrain.webp");
console.log(`terrain.webp: ${W}x${H}, ${Math.round(info.size / 1024)} KB`);
// AVIF carries the same lines at a fifth of the weight; the CSS offers it
// first (image-set) and keeps the WebP for browsers without AVIF.
const avif = await raw().avif({ quality: 55, effort: 6 }).toFile("public/textures/terrain.avif");
console.log(`terrain.avif: ${W}x${H}, ${Math.round(avif.size / 1024)} KB`);
