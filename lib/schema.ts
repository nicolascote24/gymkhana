import { festival, mapsUrl } from "@/content/festival";
import { siteUrl } from "@/lib/site";

// One JSON-LD graph per page, its nodes linked by @id. Everything in it is
// visible on the site (seo_rule.md, rule 6).
//
// The festival is described as an Organization tied to a Place, not as a
// LocalBusiness: it is a volunteer-run event organiser with no storefront and
// no opening hours, and LocalBusiness would claim both. An Event node is
// added only once the 2027 dates are confirmed (festival.edition.datesKnown).

const ORG = `${siteUrl}/#organisation`;
const PLACE = `${siteUrl}/#lieu`;
const SITE = `${siteUrl}/#site`;

const a = festival.address;
const c = festival.contact;

const organization = {
  "@type": "Organization",
  "@id": ORG,
  name: festival.name,
  alternateName: [festival.shortName, "FGF"],
  url: `${siteUrl}/`,
  logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png`, width: 384, height: 384 },
  image: `${siteUrl}/images/og-festival-gymkhana.jpg`,
  description:
    "Festival de gymkhana gratuit organisé en août par des bénévoles : une compétition officielle sanctionnée par le CBSLC, entourée de spectacles country et d'activités familiales.",
  foundingDate: String(festival.founded),
  founder: { "@type": "Person", name: festival.founder },
  email: c.email,
  telephone: "+1-418-540-5700",
  address: {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: "QC",
    postalCode: a.postalCode,
    addressCountry: "CA",
  },
  location: { "@id": PLACE },
  areaServed: [
    { "@type": "City", name: "Saint-David-de-Falardeau", sameAs: "https://www.wikidata.org/wiki/Q3462046" },
    { "@type": "City", name: "Saguenay", sameAs: "https://www.wikidata.org/wiki/Q139229" },
    {
      "@type": "AdministrativeArea",
      name: "Saguenay–Lac-Saint-Jean",
      sameAs: "https://www.wikidata.org/wiki/Q615914",
    },
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+1-418-540-5700", contactType: "information et camping", availableLanguage: "fr" },
    { "@type": "ContactPoint", telephone: "+1-418-820-6134", contactType: "kiosques et exposants", availableLanguage: "fr" },
  ],
  sameAs: [c.facebook],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ce que propose le festival",
    itemListElement: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CAD",
        itemOffered: { "@type": "Service", name: "Entrée au festival : site, compétition et spectacles" },
      },
      {
        "@type": "Offer",
        price: "50",
        priceCurrency: "CAD",
        description: "Sans réservation, pour la fin de semaine",
        itemOffered: { "@type": "Service", name: "Camping temporaire pour la fin de semaine" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inscription aux épreuves de gymkhana" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kiosques et exposants" } },
    ],
  },
};

const place = {
  "@type": "Place",
  "@id": PLACE,
  name: a.venue,
  address: organization.address,
  geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
  hasMap: mapsUrl,
};

const SERIES = `${siteUrl}/#festival`;

// The festival as a recurring event: needs no dates, so it ships now. Each
// year's edition hangs from it once its dates are confirmed (editionNodes).
const eventSeries = {
  "@type": "EventSeries",
  "@id": SERIES,
  name: festival.name,
  description:
    "Festival de gymkhana gratuit, en août à Saint-David-de-Falardeau depuis 2007 : compétition officielle sanctionnée par le CBSLC, spectacles country et activités familiales.",
  url: `${siteUrl}/`,
  image: `${siteUrl}/images/og-festival-gymkhana.jpg`,
  organizer: { "@id": ORG },
  location: { "@id": PLACE },
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  inLanguage: "fr-CA",
};

// This year's festival and its competition, only when festival.edition has
// datesKnown: true with startDate and endDate (ISO 8601 with offset, e.g.
// "2027-08-05T09:00:00-04:00"). Until then nothing is claimed (rule 6).
function editionNodes() {
  const e = festival.edition as { datesKnown: boolean; startDate?: string; endDate?: string };
  if (!e.datesKnown || !e.startDate || !e.endDate) return [];
  const year = e.startDate.slice(0, 4);
  const EDITION = `${siteUrl}/#edition-${year}`;
  const when = {
    startDate: e.startDate,
    endDate: e.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@id": PLACE },
    organizer: { "@id": ORG },
  };
  return [
    {
      "@type": "Festival",
      "@id": EDITION,
      name: `${festival.name} ${year}`,
      description: eventSeries.description,
      url: `${siteUrl}/`,
      image: [`${siteUrl}/images/og-festival-gymkhana.jpg`],
      ...when,
      isAccessibleForFree: true,
      inLanguage: "fr-CA",
      superEvent: { "@id": SERIES },
      offers: { "@type": "Offer", url: `${siteUrl}/`, price: "0", priceCurrency: "CAD", availability: "https://schema.org/InStock" },
      subEvent: { "@id": `${EDITION}-gymkhana` },
    },
    {
      "@type": "SportsEvent",
      "@id": `${EDITION}-gymkhana`,
      name: `Compétition de gymkhana du ${festival.shortName} ${year}`,
      sport: "Gymkhana",
      url: `${siteUrl}/epreuves-gymkhana/`,
      ...when,
      superEvent: { "@id": EDITION },
    },
  ];
}

// The 2026 film shown on the home page ("Voir le film", 1 min 25). Its date
// is the day the file was added to the site.
const film = {
  "@type": "VideoObject",
  "@id": `${siteUrl}/#film-2026`,
  name: "Film de l'édition 2026 du Festival Gymkhana de Falardeau",
  description: "Le film de l'édition 2026 du Festival Gymkhana de Saint-David-de-Falardeau, au Saguenay–Lac-Saint-Jean.",
  thumbnailUrl: `${siteUrl}/video/festival-poster.jpg`,
  contentUrl: `${siteUrl}/video/festival-2026.mp4`,
  uploadDate: "2026-10-16",
  duration: "PT1M26S",
  inLanguage: "fr-CA",
  publisher: { "@id": ORG },
};

const website = {
  "@type": "WebSite",
  "@id": SITE,
  url: `${siteUrl}/`,
  name: festival.shortName,
  inLanguage: "fr-CA",
  publisher: { "@id": ORG },
};

type PageGraph = {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage";
  // Only when the same trail is visible on the page.
  breadcrumb?: { label: string; href: string }[];
  // Questions answered visibly on the page (content/faq.ts).
  faq?: { q: string; a: string }[];
  // A date written in the page itself (the privacy policy's revision), never
  // the build or commit date: Google prints it next to the result, where an
  // aging date makes an off-season festival look abandoned.
  updated?: string;
};

export function pageGraph(p: PageGraph) {
  const url = `${siteUrl}${p.path}`;
  const crumbs = p.breadcrumb ? [{ label: "Accueil", href: "/" }, ...p.breadcrumb] : null;
  const home = p.path === "/";
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      place,
      website,
      // The festival itself, its edition and its film live on the home page.
      ...(home ? [eventSeries, ...editionNodes(), film] : []),
      {
        "@type": p.type ?? "WebPage",
        "@id": `${url}#page`,
        url,
        name: p.title,
        description: p.description,
        inLanguage: "fr-CA",
        isPartOf: { "@id": SITE },
        about: { "@id": home ? SERIES : ORG },
        ...(p.updated ? { dateModified: p.updated } : {}),
        ...(home ? { video: { "@id": `${siteUrl}/#film-2026` } } : {}),
        ...(crumbs ? { breadcrumb: { "@id": `${url}#fil` } } : {}),
      },
      ...(p.faq
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              isPartOf: { "@id": `${url}#page` },
              mainEntity: p.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      ...(crumbs
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#fil`,
              itemListElement: crumbs.map((cr, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: cr.label,
                item: `${siteUrl}${cr.href}`,
              })),
            },
          ]
        : []),
    ],
  };
}
