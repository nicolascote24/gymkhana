// Post-build: React and the Next.js runtime load right after the page has
// painted, instead of competing with the hero photograph for the network and
// the processor. Runs after `next build` on the static export (out/).
//
// Why: the pages are complete without script (static HTML, CSS entrances,
// native popover menu, plain links), so nothing the visitor sees waits for
// React. On a slow phone, downloading and running ~150 KB of framework at the
// same time as the hero delayed its paint by about 1.8 s (Lighthouse mobile
// 84 -> 97 when deferred).
//
// When: as soon as the browser reports the largest paint (first idle moment,
// 1 s at most), at once on the first touch, click, key or scroll, and after
// 1.5 s whatever happens.
//
// Safety: if the export does not look the way this script expects (a future
// Next.js changing its tags), the build fails instead of shipping a page that
// never hydrates. DEFER_HYDRATION=0 skips the step entirely.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "out";

if (process.env.DEFER_HYDRATION === "0") {
  console.log("defer-hydration: skipped (DEFER_HYDRATION=0)");
  process.exit(0);
}

const fail = (msg) => {
  console.error(`defer-hydration: ${msg}`);
  console.error("The Next.js export no longer matches what this step expects. Check scripts/defer-hydration.mjs,");
  console.error("or build without it (DEFER_HYDRATION=0) to ship the standard loading.");
  process.exit(1);
};

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

// <script src="/_next/static/chunks/x.js" async=""></script>, optionally with
// an id. The noModule polyfills (old browsers only) are left alone.
const SCRIPT = /<script ((?:[a-zA-Z-]+(?:="[^"]*")?\s?)+)><\/script>/g;
const PRELOAD = /<link rel="preload" as="script"[^>]*\/>/g;
const attrs = (s) => Object.fromEntries([...s.matchAll(/([a-zA-Z-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] ?? ""]));

const LOADER = (list) =>
  `<script>(function(){var s=${JSON.stringify(list)},d=0;` +
  `function go(){if(d)return;d=1;s.forEach(function(a){var e=document.createElement("script");for(var k in a)e.setAttribute(k,a[k]);e.async=true;document.body.appendChild(e)})}` +
  `var idle=window.requestIdleCallback?function(f){requestIdleCallback(f,{timeout:1000})}:function(f){setTimeout(f,1)};` +
  `try{new PerformanceObserver(function(l,o){o.disconnect();idle(go)}).observe({type:"largest-contentful-paint",buffered:true})}catch(e){}` +
  `["pointerdown","touchstart","keydown","wheel","scroll"].forEach(function(t){addEventListener(t,go,{once:true,passive:true,capture:true})});` +
  `setTimeout(go,1500)})()</script>`;

let pages = 0;
for await (const file of htmlFiles(OUT)) {
  const html = await readFile(file, "utf8");
  if (!html.includes("self.__next_f")) continue; // not a Next.js page
  if (html.includes("data-deferred-hydration")) fail(`${file} was already processed`);

  const scripts = [];
  let out = html.replace(SCRIPT, (tag, raw) => {
    const a = attrs(raw);
    if (!a.src) return tag; // inline scripts (RSC payload, JSON-LD) stay
    if ("noModule" in a || "nomodule" in a) return tag;
    if (!a.src.startsWith("/_next/static/chunks/") || !("async" in a)) fail(`unexpected script tag in ${file}: ${tag}`);
    delete a.async;
    scripts.push(a);
    return "";
  });
  out = out.replace(PRELOAD, "");

  if (scripts.length < 3) fail(`only ${scripts.length} framework scripts found in ${file}`);
  if (!out.includes("</body>")) fail(`no </body> in ${file}`);
  out = out.replace("</body>", `${LOADER(scripts).replace("<script>", "<script data-deferred-hydration>")}</body>`);
  await writeFile(file, out);
  pages++;
}

if (pages === 0) fail("no Next.js page found in out/");
console.log(`defer-hydration: ${pages} pages load the framework after first paint`);
