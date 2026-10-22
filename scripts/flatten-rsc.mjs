// Post-build: the static export writes a page's prefetch data in a folder
// (confidentialite/__next.confidentialite/__PAGE__.txt), but <Link> prefetch
// asks for it with dots (confidentialite/__next.confidentialite.__PAGE__.txt).
// Next.js servers map one to the other; a static host does not, so every
// prefetch failed with a 404 (console error, Lighthouse best practices 96).
// This step publishes each file under the dotted name as well.
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = "out";
let copied = 0;

async function filesUnder(dir, rel = "") {
  const out = [];
  for (const e of await readdir(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...(await filesUnder(dir, r)));
    else out.push(r);
  }
  return out;
}

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      for (const rel of await filesUnder(p)) {
        await copyFile(path.join(p, rel), path.join(dir, `${e.name}.${rel.split("/").join(".")}`));
        copied++;
      }
    } else if (!["_next", "images", "video", "textures"].includes(e.name)) {
      await walk(p);
    }
  }
}

await walk(OUT);
console.log(`flatten-rsc: ${copied} prefetch files published under their dotted name`);
