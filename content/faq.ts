// Questions people ask about the festival, answered in 40 to 60 words each.
// Every fact comes from content/festival.ts, content/epreuves.ts or the events
// page; nothing here is new. Each answer names its subject, so it still reads
// when a search engine or an AI answer quotes it alone. Shown folded at the
// end of "Planifier ma visite" and given to search engines as FAQPage.

import { festival } from "@/content/festival";

const a = festival.address;
const c = festival.contact;

export const faq: { q: string; a: string }[] = [
  {
    q: "Qu'est-ce que le gymkhana ?",
    a: "Le gymkhana est une discipline d'équitation western où le cheval et son cavalier courent contre la montre, autour de barils et de piquets, selon des patrons précis. Au Festival Gymkhana de Falardeau, une centaine de cavaliers disputent dix épreuves, dont la course de barils et la course de sauvetage, sanctionnées par le CBSLC.",
  },
  {
    q: "L'entrée au festival est-elle gratuite ?",
    a: "Oui. L'entrée au Festival Gymkhana de Falardeau est gratuite : le site, la compétition de gymkhana, qu'on regarde depuis les gradins, et les spectacles sous le chapiteau. Seul le camping temporaire est payant, à 40 $ pour la fin de semaine.",
  },
  {
    q: "Quand a lieu le festival en 2027 ?",
    a: "Le Festival Gymkhana de Falardeau a lieu en août, pendant quatre jours. Les dates de l'édition 2027 ne sont pas encore annoncées : elles seront publiées sur ce site et sur la page Facebook officielle du festival dès qu'elles seront connues.",
  },
  {
    q: "Où se trouve le festival ?",
    a: `Le festival se tient à la ${a.venue}, au ${a.street}, à ${a.city} (Québec), au Saguenay–Lac-Saint-Jean, à 20 minutes au nord de Chicoutimi. Le manège de compétition, le chapiteau, le chalet des loisirs et le stationnement sont sur le même site.`,
  },
  {
    q: "Peut-on camper sur place ?",
    a: `Oui. Un camping temporaire est installé sur le site du festival : 40 $ pour la fin de semaine, selon le tarif des éditions 2024 et 2025. Il n'y a pas de réservation, c'est premier arrivé, premier servi, sur des terrains sans service. Information : ${c.info.phone}.`,
  },
  {
    q: "Comment s'inscrire aux épreuves de gymkhana ?",
    a: `Les inscriptions aux épreuves de gymkhana se font par courriel, à ${c.email}. Chaque cheval doit avoir un test de Coggins valide, la tenue western est obligatoire et le casque l'est pour les cavaliers de 18 ans et moins. Les classes et les tarifs 2027 seront annoncés avec la programmation.`,
  },
];
