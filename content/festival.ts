// Festival facts. Source: references/brief.md (archives of the former site
// and the 2023-2024 programme leaflets). Values marked PROVISOIRE are waiting
// for the 2027 announcement.

const nbsp = " ";

export const festival = {
  name: "Festival Gymkhana de Saint-David-de-Falardeau",
  shortName: "Festival Gymkhana de Falardeau",
  place: "Saint-David-de-Falardeau",
  region: "Saguenay–Lac-Saint-Jean",
  founded: 2007,
  founder: "Suzie Gauthier",
  volunteers: 60,
  competitors: 100,
  days: 4,
  // PROVISOIRE: dates 2027 non annoncées.
  edition: { label: `Août${nbsp}2027`, datesKnown: false },
  slogans: {
    main: `Au triple galop vers Falardeau${nbsp}!`,
    saddle: `En selle vers Falardeau${nbsp}!`,
    meet: `C'est un rendez-vous${nbsp}!`,
  },
  motto: "Accueillir le public et les compétiteurs comme des membres de la famille.",
  address: {
    venue: "Place des Festivals",
    street: "51, rue du Chalet",
    city: "Saint-David-de-Falardeau",
    province: "Québec",
    postalCode: "G0V 1C0",
    lat: 48.620091,
    lng: -71.106986,
    access: "À 20 minutes au nord de Chicoutimi",
  },
  contact: {
    info: { label: "Information et camping", phone: "418-540-5700", href: "tel:+14185405700" },
    kiosks: { label: "Kiosques et exposants", phone: "418-820-6134", href: "tel:+14188206134" },
    email: "festivalfalardeau@gmail.com",
    facebook: "https://www.facebook.com/FGF2015",
  },
  camping: {
    price: `40${nbsp}$`,
    period: "pour la fin de semaine (4 jours)",
    terms: "Terrains sans service, sans réservation : premier arrivé, premier servi.",
  },
  rules: [
    { id: "alcool", text: "N'apportez ni alcool ni bouteilles de verre : le bar est sous le chapiteau." },
    { id: "chiens", text: "Chiens en laisse en tout temps, interdits dans les gradins." },
    { id: "securite", text: "Respect des consignes de sécurité équestre aux abords de l'arène." },
  ],
  // What visitors find on site (the temporary camping has its own card).
  amenities: [
    { id: "gradins", text: "Manège de compétition avec gradins" },
    { id: "chapiteau", text: "Chapiteau des spectacles et de la danse, avec bar" },
    { id: "chalet", text: "Chalet des loisirs, où sont servis les déjeuners" },
    { id: "famille", text: "Zone familiale" },
    { id: "stationnement", text: "Stationnement sur place" },
  ],
} as const;

export const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${festival.address.lat},${festival.address.lng}`;
