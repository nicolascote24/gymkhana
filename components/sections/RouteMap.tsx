import map from "@/content/map.json";

// The illustrated map of the visit section, drawn from OpenStreetMap data
// (scripts/build-map.mjs): water and the municipal boundary in the site's
// own colours, and the real route from Chicoutimi drawn in barrel red when
// the map comes into view. Place names are HTML laid over the drawing, so
// they keep a readable size on a phone.
const CLOVER =
  "M200 492 L256 310 A34 34 0 1 1 270 327 C 232 352, 172 352, 144 310 A34 34 0 1 0 130 328 C 156 290, 150 190, 166 118 A34 34 0 1 1 214 141 C 212 250, 204 380, 200 492";

// Lines of latitude and longitude every tenth of a degree, as on a survey map.
function graticule() {
  const { width: w, height: h } = map;
  const lines: string[] = [];
  const step = map.kmToUnits * 11.132; // 0.1 degree of latitude
  for (let y = h % step; y < h; y += step) lines.push(`M0 ${y.toFixed(1)}H${w}`);
  const stepX = step * Math.cos((48.535 * Math.PI) / 180);
  for (let x = w % stepX; x < w; x += stepX) lines.push(`M${x.toFixed(1)} 0V${h}`);
  return lines.join("");
}

const pos = (x: number, y: number) => ({ "--x": x, "--y": y }) as React.CSSProperties;

export default function RouteMap({ access }: { access: string }) {
  const { width: w, height: h, site, start, route } = map;
  const scaleKm = 5;
  return (
    <figure className="vmap" data-reveal style={{ ["--vbh" as string]: h }}>
      <div className="vmap__canvas">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="vmap-desc">
          <desc id="vmap-desc">
            {`Carte du trajet routier de ${route.km} km, du centre-ville de Chicoutimi à la Place des Festivals de Saint-David-de-Falardeau, au nord de la rivière Saguenay.`}
          </desc>
          <path d={graticule()} className="vmap__grid" />
          {map.features.map((f) => (
            <path key={f.id} d={f.d} className={`vmap__${f.kind}`} />
          ))}
          <path d={route.d} className="vmap__road" />
          <path d={route.d} className="vmap__route" pathLength={1000} />
          <circle cx={start.x} cy={start.y} r={9} className="vmap__start" />
          <g className="vmap__site" transform={`translate(${site.x} ${site.y})`}>
            <circle r={26} className="vmap__site-halo" />
            <svg x={-17} y={-27} width={34} height={54} viewBox="60 60 280 450" overflow="visible">
              <path d={CLOVER} className="vmap__clover" />
            </svg>
          </g>
        </svg>

        {map.labels.map((l) => (
          <span
            key={l.text}
            className={`vmap__label vmap__label--${l.kind}`}
            data-wide-only={l.x < 230 || l.x > 640 || undefined}
            style={pos(l.x, l.y)}
            aria-hidden
          >
            {l.text}
          </span>
        ))}
        <span className="vmap__label vmap__label--start" style={pos(start.x, start.y)} aria-hidden>
          Chicoutimi
        </span>
        <span className="vmap__label vmap__label--site" style={pos(site.x, site.y)} aria-hidden>
          <strong>Place des Festivals</strong>
          51, rue du Chalet
        </span>
        <span
          className="vmap__label vmap__label--trip"
          style={pos((site.x + start.x) / 2, (site.y + start.y) / 2)}
          aria-hidden
        >
          {route.km} km
        </span>
        <span className="vmap__north" aria-hidden>
          N
        </span>
        <span className="vmap__scale" style={{ ["--len" as string]: map.kmToUnits * scaleKm }} aria-hidden>
          {scaleKm} km
        </span>
      </div>
      <figcaption className="vmap__caption">
        <span>{access}</span>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
          {map.attribution}
        </a>
      </figcaption>
    </figure>
  );
}
