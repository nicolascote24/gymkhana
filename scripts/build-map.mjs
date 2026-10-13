// Builds the illustrated map of the visit section (content/map.json) from
// OpenStreetMap data: the Saguenay, the lakes and rivers around Falardeau,
// the municipal boundary, and the real driving route from Chicoutimi.
//
// Raw responses are kept in assets/map/ so the map rebuilds offline; pass
// --refresh to download them again (Nominatim and the OSRM demo server, at
// most one request per second, as their usage policies ask).
//
// Data © OpenStreetMap contributors, ODbL. The map credits them on the page.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const RAW = "assets/map";
const OUT = "content/map.json";
const UA = "festival-gymkhana-site-build";
const refresh = process.argv.includes("--refresh");

// Map frame (degrees). Wider than tall so it sits in a landscape panel.
// The route runs down its middle.
const BOX = { west: -71.36, east: -70.81, south: 48.39, north: 48.68 };
const WIDTH = 1000;
const SITE = { lat: 48.620091, lng: -71.106986 }; // Place des Festivals, 51, rue du Chalet
const START = { lat: 48.428, lng: -71.0589 }; // downtown Chicoutimi

const FEATURES = [
  { id: "falardeau", kind: "boundary", q: "Saint-David-de-Falardeau, Québec" },
  { id: "saguenay", kind: "river", q: "Rivière Saguenay, Québec" },
  { id: "sebastien", kind: "lake", q: "Lac Sébastien, Saint-David-de-Falardeau" },
  { id: "clair", kind: "lake", q: "Lac Clair, Saint-David-de-Falardeau" },
  { id: "brochet", kind: "lake", q: "Lac Brochet, Saint-David-de-Falardeau" },
  { id: "emmuraille", kind: "lake", q: "Lac Emmuraillé, Saint-David-de-Falardeau" },
  { id: "grenon", kind: "lake", q: "Lac Grenon, Saint-David-de-Falardeau" },
  { id: "valin", kind: "stream", q: "Rivière Valin, Saint-David-de-Falardeau" },
  { id: "shipshaw", kind: "stream", q: "Rivière Shipshaw, Saint-David-de-Falardeau" },
];

mkdirSync(RAW, { recursive: true });
const curl = (url) => execFileSync("curl", ["-s", "-m", "60", "-A", UA, url], { maxBuffer: 64 << 20 }).toString();
const sleep = (ms) => execFileSync("sleep", [String(ms / 1000)]);

function cached(name, url) {
  const file = `${RAW}/${name}.json`;
  if (refresh || !existsSync(file)) {
    writeFileSync(file, curl(url));
    sleep(1200);
  }
  return JSON.parse(readFileSync(file, "utf8"));
}

const nominatim = (q) =>
  "https://nominatim.openstreetmap.org/search?" +
  new URLSearchParams({ q, format: "json", polygon_geojson: "1", polygon_threshold: "0.0002", limit: "1" });

// Equirectangular projection, scaled at the frame's mid latitude: exact
// enough over 40 km, and straight lines stay straight.
const k = Math.cos((((BOX.south + BOX.north) / 2) * Math.PI) / 180);
const scale = WIDTH / ((BOX.east - BOX.west) * k);
const HEIGHT = Math.round((BOX.north - BOX.south) * scale);
const project = ([lng, lat]) => [(lng - BOX.west) * k * scale, (BOX.north - lat) * scale];
const kmToUnits = scale / 111.32;

// Douglas-Peucker, in map units.
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let max = 0;
  let at = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const d = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) [max, at] = [d, i];
  }
  if (max <= tol) return [a, b];
  return [...simplify(pts.slice(0, at + 1), tol).slice(0, -1), ...simplify(pts.slice(at), tol)];
}

// A closed ring starts and ends on the same point, which gives the line
// above no direction: simplify its two halves separately.
function simplifyRing(pts, tol) {
  const mid = Math.floor(pts.length / 2);
  return [...simplify(pts.slice(0, mid + 1), tol).slice(0, -1), ...simplify(pts.slice(mid), tol)];
}

// Keep only the parts of a line near the frame (a margin keeps edges clean).
function trim(pts) {
  const m = 80;
  const inside = ([x, y]) => x > -m && x < WIDTH + m && y > -m && y < HEIGHT + m;
  const runs = [];
  let run = [];
  for (const p of pts) {
    if (inside(p)) run.push(p);
    else if (run.length) (runs.push(run), (run = []));
  }
  if (run.length) runs.push(run);
  return runs.filter((r) => r.length > 1);
}

const d = (pts, close) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + (close ? "Z" : "");

function shapes(geo, closed, tol) {
  const rings =
    geo.type === "Polygon"
      ? geo.coordinates
      : geo.type === "MultiPolygon"
        ? geo.coordinates.flat()
        : geo.type === "MultiLineString"
          ? geo.coordinates
          : geo.type === "LineString"
            ? [geo.coordinates]
            : [];
  return rings
    .map((ring) => ring.map(project))
    .flatMap((pts) => (closed ? [pts] : trim(pts)))
    .map((pts) => (closed ? simplifyRing(pts, tol) : simplify(pts, tol)))
    .filter((pts) => pts.length > (closed ? 3 : 1))
    .map((pts) => d(pts, closed))
    .join("");
}

const features = [];
for (const f of FEATURES) {
  const [hit] = cached(f.id, nominatim(f.q));
  if (!hit?.geojson) {
    console.warn(`skip ${f.id}: no geometry`);
    continue;
  }
  const closed = f.kind === "lake" || f.kind === "boundary";
  const path = shapes(hit.geojson, closed, f.kind === "boundary" ? 1.2 : f.kind === "lake" ? 1 : 0.6);
  if (path) features.push({ id: f.id, kind: f.kind, d: path });
}

const osrm = cached(
  "route",
  `https://router.project-osrm.org/route/v1/driving/${START.lng},${START.lat};${SITE.lng},${SITE.lat}?overview=full&geometries=geojson`,
);
const route = osrm.routes[0];
const routePts = simplify(route.geometry.coordinates.map(project), 0.5);

// Place names, set as HTML over the map so they keep a readable size.
const LABELS = [
  { text: "Rivière Saguenay", kind: "water", lng: -71.3, lat: 48.437 },
  { text: "Rivière Valin", kind: "water", lng: -70.955, lat: 48.53 },
  { text: "Lac Sébastien", kind: "water", lng: -71.2, lat: 48.672 },
  { text: "Saint-David-de-Falardeau", kind: "area", lng: -70.99, lat: 48.66 },
];
const labels = LABELS.map(({ lng, lat, ...l }) => {
  const [x, y] = project([lng, lat]);
  return { ...l, x: +x.toFixed(1), y: +y.toFixed(1) };
});

const [sx, sy] = project([SITE.lng, SITE.lat]);
const [cx, cy] = project([START.lng, START.lat]);
const map = {
  attribution: "© contributeurs OpenStreetMap",
  width: WIDTH,
  height: HEIGHT,
  kmToUnits: +kmToUnits.toFixed(3),
  features,
  route: { d: d(routePts), km: Math.round(route.distance / 1000) },
  labels,
  site: { x: +sx.toFixed(1), y: +sy.toFixed(1) },
  start: { x: +cx.toFixed(1), y: +cy.toFixed(1) },
};
writeFileSync(OUT, JSON.stringify(map, null, 2) + "\n");
console.log(`map -> ${OUT}: ${WIDTH}x${HEIGHT}, ${features.length} features, route ${map.route.km} km`);
