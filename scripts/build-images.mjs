// Builds the site's responsive images from the source photos.
// Sources stay in photo_clients/ and assets/; outputs go to public/images/
// with a manifest (content/images.json) carrying dimensions for layout stability.
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "public/images";
const MANIFEST = "content/images.json";

// Warm, slightly desaturated grade shared by every photo, so the cut-out
// layer matches the hero plate exactly.
const grade = (img, alpha = false) =>
  img
    .modulate({ saturation: 0.86 })
    .recomb([
      [1.04, 0.02, 0],
      [0.01, 1.0, 0.0],
      [0, 0.02, 0.9],
    ])
    .linear(alpha ? [1.04, 1.04, 1.04, 1] : 1.04, alpha ? [-4, -4, -4, 0] : -4);

const BANK = "photo_clients/banque_photos";

const jobs = [
  // Hero plate and its cut-out (rider, horse and barrel), same canvas so the layers align.
  { id: "hero", src: "photo_clients/hero_idee.jpg", widths: [828, 1280, 1920, 2752], quality: 62 },
  // Same plate with the rider removed (inpainted): the background layer of the
  // living hero, so rider and background can move on separate depth planes.
  { id: "hero-clean", src: "assets/cutouts/hero-clean.jpg", widths: [828, 1280, 1920, 2752], quality: 62 },
  {
    id: "hero-rider",
    src: "assets/cutouts/hero-rider.png",
    widths: [828, 1280, 1920, 2752],
    quality: 70,
    alpha: true,
    crop: { left: 1787, top: 611, width: 745, height: 784 },
  },
  { id: "relais", src: `${BANK}/CB_20220814_145327-1-scaled.jpg`, widths: [640, 1080, 1600] },
  { id: "sauvetage", src: `${BANK}/502.jpg`, widths: [640, 1080, 1600] },
  { id: "baril-gradins", src: `${BANK}/486121701_1082639307241061_638791365813437644_n.jpg`, widths: [640, 1080, 1600] },
  { id: "baril-roulottes", src: `${BANK}/486177124_1082639060574419_1317052855270604286_n.jpg`, widths: [640, 1080, 1600] },
  { id: "baril-foule", src: `${BANK}/486576520_1082639293907729_8661474365982776403_n.jpg`, widths: [640, 1080, 1600] },
  { id: "chien", src: `${BANK}/486199081_1082632333908425_3091345128069034974_n.jpg`, widths: [640, 1080, 1600] },
  { id: "mascotte", src: `${BANK}/487212465_1082643843907274_8083644331164335370_n.jpg`, widths: [640, 1080, 1600] },
  { id: "jeune-cavaliere", src: `${BANK}/432-680x1024.jpg`, widths: [480, 680] },
  { id: "presidente", src: `${BANK}/Presidente.jpg`, widths: [640, 1080, 1600] },
  { id: "equipe", src: `${BANK}/equipe.jpg`, widths: [640, 1080, 1440] },
  { id: "logo", src: `${BANK}/logo-festival-10-Final.png`, widths: [96, 192, 384], alpha: true, noGrade: true },
];

// Optional filter: `node scripts/build-images.mjs hero-rider relais` rebuilds only those ids.
const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });
const manifest = only.length ? JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}")) : {};

for (const job of jobs.filter((j) => !only.length || only.includes(j.id))) {
  let base = sharp(job.src).rotate();
  const meta = await base.metadata();
  const full = { width: meta.width, height: meta.height };
  if (job.crop) base = base.extract(job.crop);
  const box = job.crop ?? { left: 0, top: 0, ...full };
  const shaped = job.alpha ? base.ensureAlpha() : base.removeAlpha();
  const graded = job.noGrade ? shaped : grade(shaped, job.alpha);
  // Freeze the graded pixels once, then resize from that buffer.
  const { data, info } = await graded.raw().toBuffer({ resolveWithObject: true });
  const src = () => sharp(data, { raw: info });

  const entry = { width: box.width, height: box.height, sources: {} };
  if (job.crop) {
    // Position of the cut-out inside the full plate, in percent, for absolute layering.
    entry.frame = {
      x: (box.left / full.width) * 100,
      y: (box.top / full.height) * 100,
      w: (box.width / full.width) * 100,
      h: (box.height / full.height) * 100,
      plateWidth: full.width,
      plateHeight: full.height,
    };
  }

  for (const target of job.widths) {
    // Widths are expressed against the full plate for cut-outs so both layers share breakpoints.
    const w = job.crop ? Math.round((target / full.width) * box.width) : Math.min(target, box.width);
    const q = job.quality ?? 64;
    const avif = `${job.id}-${target}.avif`;
    const webp = `${job.id}-${target}.webp`;
    await src().resize({ width: w }).avif({ quality: q - 8, effort: 6 }).toFile(path.join(OUT, avif));
    await src().resize({ width: w }).webp({ quality: q + 6, alphaQuality: 90 }).toFile(path.join(OUT, webp));
    // The descriptor is the file's real pixel width (cut-outs are narrower than their plate).
    (entry.sources.avif ??= []).push({ src: `/images/${avif}`, w });
    (entry.sources.webp ??= []).push({ src: `/images/${webp}`, w });
  }
  if (!job.alpha) {
    const jpg = `${job.id}.jpg`;
    await src().resize({ width: Math.min(1600, box.width) }).flatten().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, jpg));
    entry.fallback = `/images/${jpg}`;
  } else {
    const png = `${job.id}.png`;
    const w = job.crop ? Math.round(box.width * 0.7) : Math.min(384, box.width);
    await src().resize({ width: w }).png({ compressionLevel: 9, palette: false }).toFile(path.join(OUT, png));
    entry.fallback = `/images/${png}`;
  }
  manifest[job.id] = entry;
  console.log(`${job.id}: ${job.widths.length} widths`);
}

// Open Graph card: hero plate, 1200x630.
if (!only.length) await grade(sharp("photo_clients/hero_idee.jpg"))
  .resize({ width: 1200, height: 630, fit: "cover", position: "right" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, "og-festival-gymkhana.jpg"));

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest -> ${MANIFEST}`);
