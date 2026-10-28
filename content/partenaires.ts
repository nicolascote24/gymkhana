// Partners. Source: references/brief.md, section 8, and the client's 2026
// list of major partners whose logo must be shown (logo_commendit/).
import type { ImageId } from "@/components/Picture";

export const paliers = ["Au grand galop", "Au galop", "Au trot", "Au pas"] as const;

export type Major = {
  name: string;
  logo: ImageId;
  // Official site, only where one was found; otherwise the logo is not a link.
  href?: string;
  // Optical weight: a logo that fills little of its box (a diamond, thin
  // letters) reads smaller than its area says, and is nudged up.
  optic?: number;
  // A logo drawn in white needs the night plate to be seen.
  night?: boolean;
};

// "Au grand galop": the partners whose logo is shown. Five panels then four
// on wide screens: the order puts the night panel in the middle of the
// first row (the 3 x 3 wall of smaller screens centres it on its own).
export const grandGalop: Major[] = [
  {
    name: "Municipalité de Saint-David-de-Falardeau",
    logo: "logo-falardeau",
    href: "https://www.villefalardeau.ca/",
  },
  {
    name: "Desjardins",
    logo: "logo-desjardins",
    href: "https://www.desjardins.com/fr/nous-trouver/caisse-desjardins/rive-nord-du-saguenay.html",
  },
  { name: "Boucherie Raymond et André", logo: "logo-boucherie-ra", night: true },
  { name: "Promotion Saguenay", logo: "logo-promotion-saguenay", href: "https://promotion.saguenay.ca/" },
  { name: "Zone Kubota", logo: "logo-zone-kubota", optic: 1.15 },
  { name: "BMR St-Honoré", logo: "logo-bmr" },
  { name: "MRC du Fjord-du-Saguenay", logo: "logo-mrc-fjord", href: "https://mrc-fjord.qc.ca/" },
  { name: "92,5 CKAJ", logo: "logo-ckaj", href: "https://ckaj.org/" },
  { name: "Gouvernement du Québec", logo: "logo-quebec", href: "https://www.quebec.ca/" },
];

export const medias = ["92,5 CKAJ", "KYK 95,7", "Rouge FM", "Énergie"];

// Every other partner, as text. None of these repeats a major partner above.
export const partenaires = [
  "Alimentation IGA Éric Régnier",
  "Animalerie Jonas",
  "Annie Bouchard barbier",
  "Boivin & Filles",
  "Buffet sans souci",
  "Centre équestre Le Jordan",
  "Chaussures POP",
  "Club Optimiste de Falardeau",
  "Construction G. Tremblay",
  "Dépanneur Falardeau",
  "Diffusion Saguenay",
  "Échafaudage Industriels",
  "Éco-Carburant",
  "Équipements Industriels",
  "Excavation Ber-Nard",
  "Familiprix Houde et Lévesque",
  "Ferme Avicole Falardeau",
  "Garage Mercier & Frères",
  "Harnais Équestre",
  "Imago Village",
  "Le Géant Motorisé",
  "Mario Simard, député fédéral",
  "Menuiserie d'Alma",
  "Nutrinor",
  "Pepsi",
  "Pizza Salvatoré",
  "Pro-Pneu",
  "Roulottes Lévesque",
  "Scierie Falardeau",
  "SST 2006",
  "Tavata Chalets",
  "Transport Maxime Fortin",
  "Transport Saguenay",
];
