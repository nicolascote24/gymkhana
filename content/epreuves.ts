// Gymkhana events. Sources: references/brief.md, section 5 (the events run at
// the festival) and the Cheval Québec western rule
// book 2026, section IV (what each event is, what disqualifies). Rules are
// summarised close to the text and always point to their article.

import type { ImageId } from "@/components/Picture";

export type Mark = {
  x: number;
  y: number;
  // relais: the hand-off zone across the track; couloir: the keyhole corridor;
  // fleche: direction of travel.
  kind: "baril" | "piquet" | "drapeau" | "cercle" | "relais" | "couloir" | "fleche";
};

export type Epreuve = {
  id: string;
  nom: string;
  famille: "centre" | "tour";
  description: string;
  // Who runs it, when it is not one rider on one horse.
  equipe?: string;
  // Article of the rule book and its page in the PDF.
  article?: { num: string; page: number };
  // When the event has no article of its own in the rule book.
  note?: string;
  points: string[];
  // Key figures of the event, straight from its article, shown open on every
  // screen (they answer the questions people ask about it).
  chiffres?: { value: string; label: string }[];
  disqualif: string[];
  // Simplified course drawn on a 100x100 grid (SVG path).
  trace: string;
  marks: Mark[];
};

const OVAL = "M50 94 C 88 94, 94 70, 94 50 C 94 18, 70 8, 50 8 C 26 8, 8 22, 8 50 C 8 78, 22 94, 50 94";
// Two laps: the second, inside the first, ends on the finish line.
const TWO_LAPS = `${OVAL} C 80 90, 86 72, 86 50 C 86 26, 68 16, 50 16 C 32 16, 16 28, 16 50 C 16 72, 30 86, 50 88`;

export const epreuves: Epreuve[] = [
  {
    id: "barils",
    nom: "Course de barils",
    famille: "centre",
    description: "Trois barils placés en triangle, un parcours en trèfle à boucler le plus vite possible sans les faire tomber.",
    article: { num: "409", page: 222 },
    points: [
      "Le parcours garde toujours la forme du trèfle, quel que soit le sens de départ.",
      "Les Futurités sont réservées aux chevaux de 4 et 5 ans, aux conditions de l'article 409.",
    ],
    // Articles 406 and 409 of the 2026 rule book. The distances between the
    // barrels are on the official diagram (page 222), not restated here.
    chiffres: [
      { value: "3", label: "barils en triangle, un parcours en trèfle" },
      { value: "+5 s", label: "par baril renversé ; le retenir de la main est permis" },
      { value: "200 L", label: "par baril (45 gallons), en plastique ou en métal" },
      { value: "2", label: "sens de départ possibles, par la gauche ou par la droite" },
    ],
    disqualif: ["Ne pas respecter le parcours.", "Renverser une borne de la ligne de départ."],
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
    description: "Six bornes alignées, espacées de 6,40 m, à contourner en serpentin à l'aller comme au retour.",
    article: { num: "410", page: 223 },
    points: [
      "Le cheval part à gauche ou à droite de la première borne, au choix.",
      "Les bornes mesurent 1,83 m de haut ; en renverser une entraîne la disqualification.",
    ],
    disqualif: ["Ne pas respecter le parcours.", "Renverser une borne."],
    trace:
      "M66 96 L66 15 A13 13 0 0 0 40 15 C 40 21.5, 60 21.5, 60 28 C 60 34.5, 40 34.5, 40 41 C 40 47.5, 60 47.5, 60 54 C 60 60.5, 40 60.5, 40 67 C 40 73.5, 60 73.5, 60 80 C 60 88, 46 88, 46 96",
    marks: [80, 67, 54, 41, 28, 15].map((y) => ({ x: 50, y, kind: "piquet" as const })),
  },
  {
    id: "aller-retour",
    nom: "Aller-retour",
    famille: "centre",
    description: "Une ligne droite jusqu'au baril du fond du manège, un virage serré autour de lui, puis le sprint jusqu'à l'arrivée.",
    article: { num: "414", page: 225 },
    points: [
      "Deux bornes encadrent le baril, à 15 pieds de chaque côté : il faut passer entre le baril et chacune d'elles.",
    ],
    disqualif: ["Ne pas respecter le parcours.", "Renverser le baril ou une borne."],
    trace: "M44 96 L44 26 A6 6 0 1 1 56 26 L56 96",
    marks: [
      { x: 50, y: 26, kind: "baril" },
      { x: 30, y: 26, kind: "piquet" },
      { x: 70, y: 26, kind: "piquet" },
    ],
  },
  {
    id: "trou-de-serrure",
    nom: "Trou de serrure",
    famille: "centre",
    description: "Le cavalier entre dans un corridor, fait volte-face à l'extérieur, puis retraverse le corridor jusqu'à l'arrivée.",
    article: { num: "412", page: 224 },
    points: ["Les largeurs du corridor (1,5 m et 2 m) ne sont jamais modifiées, quelle que soit la taille du manège."],
    disqualif: ["Ne pas respecter le parcours.", "Renverser un obstacle ou une borne."],
    trace: "M50 96 L50 28 A11 11 0 1 1 50.2 28 L50 96",
    marks: [{ x: 50, y: 42, kind: "couloir" }],
  },
  {
    id: "drapeau",
    nom: "Course du drapeau",
    famille: "centre",
    description: "Prendre le drapeau dans le premier baril, contourner le second, puis replanter le drapeau dans le premier.",
    article: { num: "413", page: 224 },
    points: [
      "Le drapeau mesure au moins 120 cm ; il se replace à gauche, à droite ou au centre du baril.",
      "Si le drapeau se brise, le concurrent a droit à deux reprises.",
    ],
    disqualif: [
      "Échapper le drapeau.",
      "Le placer en dehors du baril.",
      "Retraverser la ligne de départ avant de l'avoir déposé.",
      "Frapper le cheval avec le drapeau.",
      "Laisser le drapeau ressortir du baril et toucher le sol, même après l'arrêt du chronomètre.",
      "Ne pas contourner le deuxième baril.",
    ],
    trace: "M57 96 L57 22 A7 7 0 1 0 43 22 L43 96",
    marks: [
      { x: 50, y: 60, kind: "drapeau" },
      { x: 50, y: 22, kind: "baril" },
    ],
  },
  {
    id: "sauvetage",
    nom: "Course de sauvetage",
    famille: "tour",
    description:
      "Le cavalier contourne deux bornes, hisse derrière lui son coéquipier, le sauteur, dans la zone de repêchage, puis fonce vers l'arrivée.",
    equipe: "Un cavalier et un sauteur",
    article: { num: "416", page: 227 },
    points: [
      "Le sauteur doit quitter le sol dans la zone de repêchage et franchir l'arrivée une jambe de chaque côté du cheval.",
      "Le sauteur porte la même tenue que les concurrents, sans obligation de chapeau.",
    ],
    disqualif: [
      "Utiliser de l'équipement non standard : selle d'acrobatie, courroie attachée au pommeau ou à la corne, etc.",
      "Ne pas respecter le parcours.",
      "Le sauteur quitte le sol avant la zone de repêchage, ou le touche après.",
    ],
    trace: OVAL,
    marks: [{ x: 8, y: 50, kind: "cercle" }],
  },
  {
    id: "echange-de-cavaliers",
    nom: "Échange de cavaliers",
    famille: "tour",
    description:
      "Un cheval, deux cavaliers : le premier descend dans la zone d'échange, au fond du manège, et le second y monte pour finir le tour.",
    equipe: "Deux cavaliers, un cheval",
    article: { num: "417", page: 227 },
    points: [
      "Le cheval ne fait qu'un seul tour de manège.",
      "Le second cavalier doit quitter le sol avant de sortir de la zone et franchir l'arrivée une jambe de chaque côté du cheval.",
    ],
    disqualif: [
      "Le premier cavalier descend avant ou après la zone d'échange.",
      "Le second cavalier touche le sol en dehors de la zone d'échange.",
      "Ne pas respecter le parcours.",
    ],
    trace: OVAL,
    marks: [{ x: 50, y: 8, kind: "relais" }],
  },
  {
    id: "relais",
    nom: "Course à relais",
    famille: "tour",
    description:
      "Le premier cavalier fait le tour des quatre bornes et passe un témoin au second, qui attend au centre du manège et refait un tour complet.",
    equipe: "Deux cavaliers, un témoin",
    article: { num: "418", page: 228 },
    points: [
      "Le témoin mesure 60 cm de long et 2,5 cm de diamètre.",
      "Le second cavalier peut saisir le témoin avant la zone d'échange, si le premier le tient jusque dans la zone.",
    ],
    disqualif: [
      "Frapper le cheval avec le témoin.",
      "Échapper ou lancer le témoin.",
      "Ne pas respecter le parcours.",
      "Dans la zone d'échange, la première monture passe la première borne avant la deuxième.",
    ],
    trace: TWO_LAPS,
    marks: [{ x: 94, y: 50, kind: "relais" }],
  },
  {
    id: "poney-express",
    nom: "Poney express",
    famille: "tour",
    description:
      "Un tour complet sur un premier cheval, un changement de monture dans la zone d'échange, puis un second tour complet jusqu'à l'arrivée.",
    equipe: "Un cavalier, deux chevaux",
    article: { num: "419", page: 229 },
    points: [
      "Dans la zone d'échange, le cavalier peut toucher le sol, mais il doit l'avoir quitté avant d'en sortir.",
      "Il franchit l'arrivée une jambe de chaque côté de sa monture.",
    ],
    disqualif: [
      "Ne pas respecter le parcours.",
      "Le premier cheval, laissé libre, franchit l'arrivée en même temps, ou presque, que le second et empêche un bon chronométrage.",
      "Le cheval partenaire empêche un bon chronométrage.",
      "Dans la zone d'échange, la première monture passe la première borne avant la deuxième.",
    ],
    trace: TWO_LAPS,
    marks: [{ x: 50, y: 8, kind: "relais" }],
  },
  {
    id: "tour-de-ring",
    nom: "Tour de ring",
    famille: "tour",
    description: "Un tour complet de l'arène, à pleine vitesse.",
    note: "Épreuve des éditions passées du festival ; elle n'a pas d'article propre dans le livre de Cheval Québec 2026.",
    points: [],
    disqualif: [],
    trace: OVAL,
    marks: [{ x: 50, y: 8, kind: "fleche" }],
  },
];

export const familles = [
  {
    id: "jeux-de-centre",
    famille: "centre" as const,
    nom: "Les jeux de centre",
    court: "Jeux de centre",
    intro: "Des parcours tracés dans le manège, avec un départ et une arrivée par le même couloir.",
    photo: {
      id: "baril-gradins" as ImageId,
      alt: "Course de barils : une cavalière casquée vire au ras d'un baril devant les gradins pleins.",
    },
  },
  {
    id: "jeux-de-tour",
    famille: "tour" as const,
    nom: "Les jeux de tour",
    court: "Jeux de tour",
    intro: "Des courses qui font le tour du manège, le plus souvent à deux cavaliers ou à deux chevaux.",
    photo: {
      id: "relais" as ImageId,
      alt: "Course à relais : deux cavaliers au galop se passent le témoin devant les gradins.",
    },
  },
];

export const sanction =
  "Compétitions régionales sanctionnées par le Club de barils du Saguenay–Lac-Saint-Jean–Côte-Nord (CBSLC), selon les règlements officiels de Cheval Québec.";

// Opens with its subject, so the sentence still makes sense when a search
// engine or an AI answer quotes it alone.
export const definition =
  "Le gymkhana est une discipline d'équitation western très répandue en Amérique du Nord, où l'agilité et la rapidité du cheval sont mises à l'épreuve sur des parcours chronométrés, exécutés selon des patrons précis.";

// The official rule book. Section IV covers gymkhana (pages 213 to 229).
export const reglement = {
  titre: "Livre des règlements en équitation western",
  edition: "2026",
  editeur: "Cheval Québec",
  section: "Section IV : règlements généraux pour les épreuves de gymkhana",
  pages: "Pages 213 à 229",
  format: "PDF, 12 Mo",
  url: "https://www.cheval.quebec/uploads/6/5/5/4/65541265/reg_2026_western_v5.pdf",
  ressources: "https://www.cheval.quebec/ressources.html",
};

export const articleUrl = (page: number) => `${reglement.url}#page=${page}`;

// How the time is judged: two ideas from the general rules (articles 400 and 406).
export const jugement = [
  {
    terme: "Le chrono",
    texte: "Le gagnant est celui qui respecte le parcours dans le meilleur temps, mesuré en secondes.",
    article: { num: "400", page: 214 },
  },
  {
    terme: "Le parcours",
    texte:
      "Sortir du parcours disqualifie. Aux barils, chaque baril renversé ajoute cinq secondes ; dans les autres épreuves, renverser un obstacle disqualifie.",
    article: { num: "406", page: 219 },
  },
];

// Before entering the arena: requirements quoted from the rule book, and the
// festival's own Coggins requirement (brief, section 5).
export const avantArene = [
  {
    terme: "Le casque",
    texte:
      "Le port du casque protecteur est obligatoire pour tous les cavaliers âgés de 18 ans et moins, en tout temps sur le terrain de compétition, lorsqu'ils sont à cheval.",
    article: { num: "400.4", page: 214 },
  },
  {
    terme: "La tenue",
    texte: "La tenue vestimentaire de style western est obligatoire. Le chandail est interdit et les manches roulées ne sont pas permises.",
    article: { num: "401.6", page: 215 },
  },
  {
    terme: "Le test de Coggins",
    texte:
      "Un test de Coggins valide est exigé pour chaque cheval : la preuve d'un dépistage de l'anémie infectieuse des équidés fait dans l'année, avec un résultat négatif.",
    article: { num: "113", page: 54 },
  },
  {
    terme: "Le signal",
    texte: "Attendre le signal officiel avant d'entrer dans le manège, sous peine de disqualification.",
    article: { num: "404.1", page: 217 },
  },
];
