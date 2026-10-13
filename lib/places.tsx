import type { ReactNode } from "react";

// Compound place names break at their hyphens by default, and Archivo has no
// non-breaking hyphen glyph, so they are wrapped in a no-wrap span instead.
const COMPOUNDS = /(Saint-David-de-Falardeau|Lac-Saint-Jean|Côte-Nord)/;

export function keepPlaces(text: string): ReactNode {
  const parts = text.split(COMPOUNDS);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    i % 2 ? (
      <span key={i} className="place">
        {p}
      </span>
    ) : (
      p
    ),
  );
}
