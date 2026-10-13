// Gymkhana events. Source: references/brief.md, section 5.

export type Epreuve = {
  id: string;
  nom: string;
  famille: "centre" | "tour";
  description: string;
  // Simplified course drawn on a 100x100 grid (SVG path), for the event cards.
  trace: string;
  marks: { x: number; y: number; kind: "baril" | "piquet" | "drapeau" | "cercle" }[];
};

export const epreuves: Epreuve[] = [
  {
    id: "barils",
    nom: "Course de barils",
    famille: "centre",
    description: "Parcours chronométré en trèfle autour de trois barils.",
    trace: "M50 96 L66 62 A9 9 0 1 1 72 70 L34 62 A9 9 0 1 0 28 70 L46 24 A8 8 0 1 1 54 24 L50 96",
    marks: [
      { x: 72, y: 62, kind: "baril" },
      { x: 28, y: 62, kind: "baril" },
      { x: 50, y: 18, kind: "baril" },
    ],
  },
  {
    id: "slalom",
    nom: "Slalom",
    famille: "centre",
    description: "Serpentin aller-retour autour de six piquets.",
    trace:
      "M30 96 L30 86 C 50 80, 50 74, 30 68 C 10 62, 10 56, 30 50 C 50 44, 50 38, 30 32 C 10 26, 10 20, 30 14 C 50 8, 70 8, 70 14 C 50 20, 50 26, 70 32 C 90 38, 90 44, 70 50 C 50 56, 50 62, 70 68 C 90 74, 90 80, 70 86 L70 96",
    marks: [
      { x: 30, y: 77, kind: "piquet" },
      { x: 30, y: 59, kind: "piquet" },
      { x: 30, y: 41, kind: "piquet" },
      { x: 30, y: 23, kind: "piquet" },
      { x: 70, y: 23, kind: "piquet" },
      { x: 70, y: 41, kind: "piquet" },
    ],
  },
  {
    id: "aller-retour",
    nom: "Aller-retour",
    famille: "centre",
    description: "Ligne droite, virage à 180 degrés autour d'un baril, retour au galop.",
    trace: "M44 96 L44 26 A6 6 0 1 1 56 26 L56 96",
    marks: [{ x: 50, y: 20, kind: "baril" }],
  },
  {
    id: "trou-de-serrure",
    nom: "Trou de serrure",
    famille: "centre",
    description: "Sprint dans un corridor, rotation dans un cercle, sprint de retour.",
    trace: "M50 96 L50 46 A12 12 0 1 1 50 22 A12 12 0 1 1 50 46 L50 96",
    marks: [{ x: 50, y: 34, kind: "cercle" }],
  },
  {
    id: "drapeau",
    nom: "Course du drapeau",
    famille: "centre",
    description: "Prise et dépôt d'un drapeau dans des réceptacles, au galop.",
    trace: "M42 96 L42 30 A8 8 0 1 1 58 30 L58 96",
    marks: [{ x: 50, y: 22, kind: "drapeau" }],
  },
  {
    id: "sauvetage",
    nom: "Course de sauvetage",
    famille: "tour",
    description: "Un cavalier contourne l'arène, charge son coéquipier en croupe et termine à deux.",
    trace: "M50 94 C 88 94, 94 70, 94 50 C 94 18, 70 8, 50 8 C 26 8, 8 22, 8 50 C 8 78, 22 94, 50 94",
    marks: [{ x: 8, y: 50, kind: "cercle" }],
  },
  {
    id: "relais",
    nom: "Relais",
    famille: "tour",
    description: "Des équipes de cavaliers se passent un témoin autour du ring.",
    trace: "M50 94 C 88 94, 94 70, 94 50 C 94 18, 70 8, 50 8 C 26 8, 8 22, 8 50 C 8 78, 22 94, 50 94",
    marks: [{ x: 94, y: 50, kind: "cercle" }],
  },
  {
    id: "tour-de-ring",
    nom: "Tour de ring",
    famille: "tour",
    description: "Un tour complet de l'arène, à pleine vitesse.",
    trace: "M50 94 C 88 94, 94 70, 94 50 C 94 18, 70 8, 50 8 C 26 8, 8 22, 8 50 C 8 78, 22 94, 50 94",
    marks: [],
  },
];

export const sanction =
  "Compétitions régionales sanctionnées par le Club de barils du Saguenay–Lac-Saint-Jean–Côte-Nord (CBSLC), selon les règlements officiels de Cheval Québec.";

export const definition =
  "Discipline d'équitation western très répandue en Amérique du Nord, où l'agilité et la rapidité du cheval sont mises à l'épreuve sur des parcours chronométrés, exécutés selon des patrons précis.";
