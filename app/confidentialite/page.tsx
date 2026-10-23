import Link from "next/link";
import PageShell, { Section } from "@/components/PageShell";
import { comite, festival } from "@/content/festival";
import { pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typo";

const DESCRIPTION =
  "Le site du Festival Gymkhana de Falardeau ne recueille aucune donnée. Qui est responsable de vos renseignements et comment exercer vos droits selon la Loi 25.";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: DESCRIPTION,
  path: "/confidentialite/",
});

const UPDATED = "2026-10-22";

// Privacy policy (Loi 25, seo_rule.md rule 7), kept to what the site really
// does: no form, no cookie, no analytics. If a measurement tool is ever added
// (NEXT_PUBLIC_GA_ID or Cloudflare Web Analytics), it needs its own section
// here, naming the tool and its cookies.
export default function Confidentialite() {
  const c = festival.contact;
  const presidente = comite.find((m) => m.role === "Présidente");
  return (
    <PageShell
      page="confidentialite"
      crumbs={[{ label: "Politique de confidentialité", href: "/confidentialite/" }]}
      title="Politique de confidentialité"
      description={DESCRIPTION}
      fp={13.2}
      updated={UPDATED}
      lead={
        <p>
          {fr(
            "Le site du Festival Gymkhana de Saint-David-de-Falardeau ne recueille aucun renseignement sur vous : pas de formulaire, pas de témoins (cookies), pas de mesure d'audience ni de publicité.",
          )}
        </p>
      }
    >
      <Section id="responsable" title="Qui est responsable de vos renseignements ?">
        <p className="pg-answer">
          {fr(
            `${presidente?.name}, présidente du comité organisateur, est responsable de la protection des renseignements personnels. Pour la joindre : ${c.email}.`,
          )}
        </p>
      </Section>

      <Section id="recueilli" title="Que faisons-nous de ce que vous nous transmettez ?">
        <p className="pg-answer">
          {fr(
            "Quand vous nous écrivez ou nous appelez (information, inscription aux épreuves, kiosque, partenariat), nous utilisons votre nom, vos coordonnées et votre message seulement pour vous répondre et organiser le festival. Nous ne les vendons ni ne les partageons, et nous les supprimons quand ils ne sont plus nécessaires.",
          )}
        </p>
        <p>
          {fr(
            "Le site est hébergé par Cloudflare, qui garde des journaux techniques (adresse IP, page demandée) pour sa sécurité. Les liens vers Google Maps et Facebook vous font quitter notre site.",
          )}
        </p>
      </Section>

      <Section id="droits" title="Quels sont vos droits ?">
        <p className="pg-answer">
          {fr(
            "Vous pouvez demander l'accès à vos renseignements, leur correction ou leur suppression, et retirer votre consentement en tout temps.",
          )}
        </p>
        <p>
          Écrivez à <a href={`mailto:${c.email}?subject=Renseignements%20personnels`}>{c.email}</a>. Nous répondons
          dans les 30 jours. Si notre réponse ne vous satisfait pas, vous pouvez vous adresser à la{" "}
          <a href="https://www.cai.gouv.qc.ca/" target="_blank" rel="noopener noreferrer">
            Commission d&apos;accès à l&apos;information du Québec
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
          .
        </p>
        <p>
          <Link href="/">Retour à l&apos;accueil</Link>
        </p>
      </Section>
    </PageShell>
  );
}
