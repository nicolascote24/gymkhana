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
  {
    id: "hero-clean",
    src: "assets/cutouts/hero-clean.jpg",
    widths: [828, 1280, 1920, 2752],
    quality: 62,
    placeholder: true,
  },
  // Portrait screens only see a narrow band of the plate around the rider:
  // this crop, centred on x = 0.75 of the plate (the portrait --fx), carries
  // the same pixels at full resolution for less than half the weight.
  {
    id: "hero-clean-portrait",
    src: "assets/cutouts/hero-clean.jpg",
    widths: [620, 930, 1238],
    quality: 62,
    placeholder: true,
    trim: { left: 1445, top: 0, width: 1238, height: 1536 },
  },
  {
    id: "hero-rider",
    src: "assets/cutouts/hero-rider.png",
    widths: [828, 1280, 1920, 2752],
    quality: 70,
    alpha: true,
    crop: { left: 1787, top: 611, width: 745, height: 784 },
  },
  // The film's still, under the loop (Film.tsx): already graded with the film.
  { id: "film-still", src: "public/video/festival-poster.jpg", widths: [828, 1280, 1920], noGrade: true },
  // Shown edge to edge in the widescreen band, so it goes up to 2400px.
  { id: "relais", src: `${BANK}/CB_20220814_145327-1-scaled.jpg`, widths: [640, 828, 1080, 1600, 2400] },
  // 360px: the small frame of the activities hero collage on phones.
  { id: "sauvetage", src: `${BANK}/502.jpg`, widths: [360, 640, 828, 1080, 1600] },
  {
    id: "baril-gradins",
    src: `${BANK}/486121701_1082639307241061_638791365813437644_n.jpg`,
    widths: [640, 828, 1080, 1600],
  },
  {
    id: "baril-roulottes",
    src: `${BANK}/486177124_1082639060574419_1317052855270604286_n.jpg`,
    widths: [640, 828, 1080, 1600],
  },
  { id: "baril-foule", src: `${BANK}/486576520_1082639293907729_8661474365982776403_n.jpg`, widths: [640, 828, 1080, 1600] },
  {
    id: "chien",
    src: `${BANK}/486199081_1082632333908425_3091345128069034974_n.jpg`,
    widths: [640, 828, 1080, 1600],
    // The bottom band (signature and badge) would sit under the tile's text.
    trim: { left: 0, top: 60, width: 2048, height: 880 },
  },
  {
    id: "mascotte",
    src: `${BANK}/487212465_1082643843907274_8083644331164335370_n.jpg`,
    widths: [640, 828, 1080, 1600],
    // The bottom band (signature and badge) and the top of the sky, so the
    // faces clear the tile's title.
    trim: { left: 0, top: 200, width: 2048, height: 860 },
  },
  { id: "jeune-cavaliere", src: `${BANK}/432-680x1024.jpg`, widths: [480, 680] },
  { id: "presidente", src: `${BANK}/Presidente.jpg`, widths: [640, 828, 1080, 1600] },
  { id: "equipe", src: `${BANK}/equipe.jpg`, widths: [640, 1080, 1440] },
  // Activities page (/activite-festival/). Client photos trimmed of their
  // signature and badge; 360px is the hero film strip's phone size.
  {
    id: "act-jumpai",
    src: "photo_clients/endants.jpg",
    widths: [360, 640, 828, 1080],
    trim: { left: 0, top: 0, width: 1365, height: 1700 },
  },
  {
    id: "act-releve",
    src: "photo_clients/jeune_cavaliere.jpg",
    widths: [360, 640, 828, 1080],
    trim: { left: 440, top: 0, width: 1260, height: 1365 },
  },
  {
    id: "act-gonflables",
    src: "photo_clients/jeux-endants.jpg",
    widths: [360, 640, 828, 1080, 1600],
    trim: { left: 0, top: 180, width: 2048, height: 880 },
  },
  { id: "act-bottes", src: "photo_clients/kiosque.jpg", widths: [360, 640, 828, 1080], trim: { left: 0, top: 0, width: 1992, height: 1700 } },
  { id: "act-vetements", src: "photo_clients/kiosque2.jpg", widths: [360, 640, 828, 1080] },
  { id: "act-cantine", src: "photo_clients/kiosue3.jpg", widths: [360, 640, 828, 1080, 1600] },
  // Concert photos come graded by their photographer: kept as delivered.
  {
    id: "act-spectacle",
    src: "photo_clients/spectacle_photo.jpg",
    widths: [360, 640, 828, 1080, 1600],
    noGrade: true,
    trim: { left: 0, top: 0, width: 1870, height: 1152 },
  },
  {
    id: "act-spectacle-2",
    src: "photo_clients/spectacle.jpg",
    widths: [640, 828, 1080, 1600],
    noGrade: true,
    trim: { left: 0, top: 0, width: 1870, height: 1152 },
  },
  // The activities hero: a day at the arena from the 2026 film, wide for
  // landscape screens and a portrait crop around the rider for phones.
  {
    id: "act-hero",
    src: "assets/film/arene-jour.jpg",
    widths: [1280, 1640],
    quality: 58,
    noGrade: true,
    trim: { left: 0, top: 0, width: 1640, height: 1080 },
  },
  {
    id: "act-hero-portrait",
    src: "assets/film/arene-jour.jpg",
    // shaded under the title, so 640px is plenty even on dense screens
    widths: [480, 640],
    quality: 52,
    noGrade: true,
    trim: { left: 180, top: 0, width: 800, height: 1080 },
  },
  // Stills from the 2026 film (assets/film/), graded with it; each trim
  // leaves out the videographer's mark in the bottom right corner.
  { id: "act-bmx", src: "assets/film/bmx.jpg", widths: [360, 640, 828, 1080, 1350], noGrade: true, trim: { left: 300, top: 0, width: 1350, height: 1080 } },
  {
    id: "act-enseigne",
    src: "assets/film/chapiteau-enseigne.jpg",
    widths: [360, 640, 828, 1080, 1600],
    noGrade: true,
    trim: { left: 0, top: 0, width: 1640, height: 1080 },
  },
  { id: "act-dj", src: "assets/film/chapiteau-dj.jpg", widths: [640, 828, 1080, 1600], noGrade: true, trim: { left: 0, top: 0, width: 1640, height: 1080 } },
  {
    id: "act-arene-nuit",
    src: "assets/film/arene-nuit.jpg",
    widths: [828, 1280, 1640],
    noGrade: true,
    trim: { left: 0, top: 0, width: 1640, height: 1080 },
  },
  {
    id: "act-foule",
    src: "assets/film/chapiteau-foule.jpg",
    widths: [640, 828, 1280, 1920],
    noGrade: true,
    trim: { left: 0, top: 0, width: 1920, height: 890 },
  },
  {
    id: "act-camping",
    src: "assets/film/camping-ciel.jpg",
    widths: [640, 828, 1280, 1920],
    noGrade: true,
    trim: { left: 0, top: 0, width: 1920, height: 890 },
  },
  // The badge gets a white disc behind it, so the inside of the circle reads
  // white on night as on sand (the black ring covers the disc's edge).
  {
    id: "logo",
    src: `${BANK}/logo-festival-final-ca.png`,
    widths: [96, 192, 384],
    alpha: true,
    noGrade: true,
    disc: { radius: 0.45, color: "#ffffff" },
  },
  // Major partners' logos, as supplied by the client (logo_commendit/), never
  // regraded: their colours belong to them. Trimmed to their ink so the
  // section can balance them by their real shape.
  ...[
    ["ckaj", "ckaj.png"],
    ["350-chicoutimi", "350-chicoutimi.webp"],
    ["boucherie-ra", "boucherie-raymond-andree.png"],
    ["desjardins", "desjardins.png"],
    ["falardeau", "falardeau.png"],
    ["bmr", "logo_bmr.png"],
    ["mrc-fjord", "mrc_fjord.png"],
    ["promotion-saguenay", "promotion-sag.png"],
    ["quebec", "quebec.png"],
    ["zone-kubota", "zone-kubota.webp"],
  ].map(([id, file]) => ({
    id: `logo-${id}`,
    src: `logo_commendit/${file}`,
    widths: [240, 480],
    quality: 88,
    alpha: true,
    noGrade: true,
    trimInk: true,
  })),
];

// Optional filter: `node scripts/build-images.mjs hero-rider relais` rebuilds only those ids.
const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });
const manifest = only.length ? JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}")) : {};

for (const job of jobs.filter((j) => !only.length || only.includes(j.id))) {
  let base = sharp(job.src).rotate();
  // Drop the transparent margin around a logo, so its box is its ink.
  if (job.trimInk) base = sharp(await base.trim({ threshold: 1 }).png().toBuffer());
  const meta = await base.metadata();
  const full = { width: meta.width, height: meta.height };
  if (job.disc) {
    const { width: w, height: h } = full;
    const disc = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * job.disc.radius}" fill="${job.disc.color}"/></svg>`;
    base = sharp(Buffer.from(disc)).composite([{ input: await base.png().toBuffer() }]);
  }
  if (job.crop ?? job.trim) base = base.extract(job.crop ?? job.trim);
  const box = job.crop ?? job.trim ?? { left: 0, top: 0, ...full };
  const shaped = job.alpha ? base.ensureAlpha() : base.removeAlpha();
  const graded = job.noGrade ? shaped : grade(shaped, job.alpha);
  // Freeze the graded pixels once, then resize from that buffer.
  const { data, info } = await graded.raw().toBuffer({ resolveWithObject: true });
  const src = () => sharp(data, { raw: info });

  const entry = { width: box.width, height: box.height, sources: {} };
  // Where a trimmed image sits in its source, for layers that must stay aligned with it.
  if (job.trim) entry.region = { ...job.trim, plateWidth: full.width, plateHeight: full.height };
  // A tiny blurred preview, inlined, painted while the real file loads.
  if (job.placeholder) {
    const tiny = await src().resize({ width: 32 }).blur(1.2).webp({ quality: 40 }).toBuffer();
    entry.placeholder = `data:image/webp;base64,${tiny.toString("base64")}`;
  }
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

  const done = new Set();
  for (const target of job.widths) {
    // Widths are expressed against the full plate for cut-outs so both layers share breakpoints.
    const w = job.crop ? Math.round((target / full.width) * box.width) : Math.min(target, box.width);
    // A small source caps several targets at its own width: write it once.
    if (done.has(w)) continue;
    done.add(w);
    const q = job.quality ?? 64;
    const avif = `${job.id}-${target}.avif`;
    const webp = `${job.id}-${target}.webp`;
    await src()
      .resize({ width: w })
      .avif({ quality: q - 8, effort: 6 })
      .toFile(path.join(OUT, avif));
    await src()
      .resize({ width: w })
      .webp({ quality: q + 6, alphaQuality: 90 })
      .toFile(path.join(OUT, webp));
    // The descriptor is the file's real pixel width (cut-outs are narrower than their plate).
    (entry.sources.avif ??= []).push({ src: `/images/${avif}`, w });
    (entry.sources.webp ??= []).push({ src: `/images/${webp}`, w });
  }
  if (!job.alpha) {
    const jpg = `${job.id}.jpg`;
    await src()
      .resize({ width: Math.min(1600, box.width) })
      .flatten()
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT, jpg));
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
if (!only.length)
  await grade(sharp("photo_clients/hero_idee.jpg"))
    .resize({ width: 1200, height: 630, fit: "cover", position: "right" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, "og-festival-gymkhana.jpg"));

// Each inner page shares its own card (`node scripts/build-images.mjs og`):
// the activities page its hero (a day at the arena, the film's mark left
// out), the events page the rescue race.
if (!only.length || only.includes("og")) {
  await sharp("assets/film/arene-jour.jpg")
    .extract({ left: 0, top: 0, width: 1640, height: 1080 })
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, "og-activites.jpg"));
  await grade(sharp(`${BANK}/502.jpg`).rotate())
    .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, "og-epreuves.jpg"));
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest -> ${MANIFEST}`);
