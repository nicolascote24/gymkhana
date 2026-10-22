// Performance budget: Lighthouse on the built site (out/), every page, phone
// and desktop. Fails (exit 1) when a score falls under its floor, so a
// regression is caught before it is deployed. Run after `npm run build`:
//   npm run perf
// Needs Chrome or Edge installed (set CHROME_PATH if it is not found).
import { createServer } from "node:http";
import { readFile, stat, mkdtemp } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const OUT = path.resolve("out");
const LIGHTHOUSE = path.resolve("node_modules/lighthouse/cli/index.js");
const PAGES = ["/", "/activite-festival/", "/epreuves-gymkhana/"];
const FLOORS = {
  mobile: { performance: 90, accessibility: 100, "best-practices": 100, seo: 100 },
  desktop: { performance: 95, accessibility: 100, "best-practices": 100, seo: 100 },
};
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

// A small static server shaped like the production host: gzip on text, and
// trailing-slash folders served by their index.html.
const server = createServer(async (req, res) => {
  try {
    let file = path.join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!file.startsWith(OUT)) throw new Error("outside");
    if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, "index.html");
    let body = await readFile(file);
    const type = TYPES[path.extname(file)] ?? "application/octet-stream";
    const headers = { "content-type": type, "cache-control": "public, max-age=31536000" };
    if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
    }
    res.writeHead(200, headers).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const dir = await mkdtemp(path.join(tmpdir(), "lh-"));

let failed = false;

// One Lighthouse run; resolves with its report (or null).
async function lighthouse(page, form, name) {
  const report = path.join(dir, `${name}.json`);
  // The project's own Lighthouse (devDependency), run by this Node: no npx,
  // no shell, the same version on every machine.
  const args = [LIGHTHOUSE, base + page, "--quiet", "--output=json", `--output-path=${report}`];
  args.push("--chrome-flags=--headless=new");
  if (form === "desktop") args.push("--preset=desktop");
  // Asynchronous on purpose: the server above lives in this process and
  // must keep answering while Lighthouse loads the page.
  await new Promise((done) => {
    const lh = spawn(process.execPath, args, { stdio: "ignore" });
    const timer = setTimeout(() => lh.kill(), 180_000);
    lh.on("exit", () => (clearTimeout(timer), done()));
  });
  return JSON.parse(await readFile(report, "utf8").catch(() => "null"));
}

// One run thrown away first: the first Chrome start on a machine (font and
// GPU caches) can hold the first paint for two seconds and skew the score.
await lighthouse("/", "mobile", "warmup");

for (const page of PAGES) {
  for (const form of ["mobile", "desktop"]) {
    // Two runs, the better one kept: one slow start must not block a deploy,
    // and a real regression shows in both.
    const tag = `${form}${page.replace(/\//g, "_")}`;
    const reports = [await lighthouse(page, form, `${tag}-1`), await lighthouse(page, form, `${tag}-2`)].filter(Boolean);
    if (!reports.length) {
      console.error(`${page} ${form}: Lighthouse did not run (is Chrome installed? set CHROME_PATH)`);
      failed = true;
      continue;
    }
    const json = reports.sort((x, y) => y.categories.performance.score - x.categories.performance.score)[0];
    const scores = Object.fromEntries(Object.values(json.categories).map((c) => [c.id, Math.round(c.score * 100)]));
    const low = Object.entries(FLOORS[form]).filter(([k, floor]) => scores[k] < floor);
    const a = json.audits;
    const line = `${page.padEnd(20)} ${form.padEnd(7)} perf ${scores.performance}  a11y ${scores.accessibility}  bp ${scores["best-practices"]}  seo ${scores.seo}  |  LCP ${a["largest-contentful-paint"].displayValue}  TBT ${a["total-blocking-time"].displayValue}  CLS ${a["cumulative-layout-shift"].displayValue}`;
    console.log(low.length ? `✗ ${line}  (under: ${low.map(([k, f]) => `${k} < ${f}`).join(", ")})` : `✓ ${line}`);
    if (low.length) failed = true;
  }
}
server.close();
process.exit(failed ? 1 : 0);
