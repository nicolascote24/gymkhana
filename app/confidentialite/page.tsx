import Link from "next/link";
import PageShell, { Section, Todo } from "@/components/PageShell";
import { ConsentPreferences } from "@/components/Consent";
import { festival } from "@/content/festival";
import { pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typo";

const DESCRIPTION =
  "Ce que le site du Festival Gymkhana de Falardeau recueille, pourquoi, avec quels tiers, et comment exercer vos droits selon la Loi 25.";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: DESCRIPTION,
  path: "/confidentialite/",
});

const UPDATED = "2026-10-22";

// Privacy policy (Loi 25, seo_rule.md rule 7). It names every third party the
// site relies on. Items the client must confirm are marked as such.
export default function Confidentialite() {
  const c = festival.contact;
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
            "Le site du Festival Gymkhana de Saint-David-de-Falardeau ne vend aucune donnée et n'affiche aucune publicité. Il ne recueille rien sur vous sans votre accord, sauf ce que vous nous écrivez vous-même.",
          )}
        </p>
      }
    >
      <Section id="responsable" title="Qui est responsable de vos renseignements ?">
        <p className="pg-answer">
          {fr(
            `Le comité organisateur du Festival Gymkhana de Saint-David-de-Falardeau. La personne responsable de la protection des renseignements personnels se joint à ${c.email}.`,
          )}
        </p>
        <Todo>nom et titre de la personne responsable (par défaut, selon la Loi 25, la personne ayant la plus haute autorité de l&apos;organisme).</Todo>
      </Section>

      <Section id="recueilli" title="Quels renseignements recueillons-nous ?">
        <p className="pg-answer">
          {fr(
            "Seulement ce que vous choisissez de nous transmettre, et des statistiques de visite si vous les acceptez.",
          )}
        </p>
        <ul className="pg-list">
          <li>
            {fr(
              "Quand vous nous écrivez ou nous appelez (information, inscription aux épreuves, kiosque, partenariat, bénévolat) : votre nom, votre adresse courriel ou votre numéro, et le contenu de votre message. Ils servent seulement à vous répondre et à organiser le festival.",
            )}
          </li>
          <li>
            {fr(
              "Si vous acceptez les témoins de mesure d'audience : les pages consultées, la durée de la visite, le type d'appareil et la région approximative, par Google Analytics 4. Ces données ne nous permettent pas de vous identifier.",
            )}
          </li>
        </ul>
        <p>{fr("Le site n'a ni formulaire, ni compte, ni paiement en ligne.")}</p>
      </Section>

      <Section id="temoins" title="Quels témoins (cookies) le site utilise-t-il ?">
        <p className="pg-answer">
          {fr(
            "Aucun témoin de mesure tant que vous n'avez pas cliqué sur « Accepter ». Votre choix est gardé dans votre navigateur pendant 12 mois.",
          )}
        </p>
        <dl className="pg-facts">
          <div>
            <dt>fgf-consentement</dt>
            <dd>{fr("Mémorise votre choix (accepter ou refuser). Stockage local du navigateur, 12 mois.")}</dd>
          </div>
          <div>
            <dt>_ga, _ga_*</dt>
            <dd>{fr("Google Analytics 4, seulement si vous acceptez. Distinguent les visites, jusqu'à 2 ans.")}</dd>
          </div>
        </dl>
        <p>
          <ConsentPreferences
            className="pg-inline-btn"
            fallback={fr("Aucun outil de mesure n'est actif sur le site pour l'instant.")}
          />{" "}
          {fr("Le lien « Préférences de témoins », au bas de chaque page, permet de changer d'avis en tout temps.")}
        </p>
      </Section>

      <Section id="tiers" title="Avec quels tiers vos données sont-elles partagées ?">
        <p className="pg-answer">
          {fr("Avec aucun tiers à des fins commerciales. Le site s'appuie sur ces fournisseurs :")}
        </p>
        <dl className="pg-facts">
          <div>
            <dt>Google LLC (États-Unis)</dt>
            <dd>{fr("Google Analytics 4, seulement si vous acceptez. Les données peuvent être traitées hors du Québec.")}</dd>
          </div>
          <div>
            <dt>Cloudflare, Inc. (États-Unis)</dt>
            <dd>{fr("Hébergement du site. Journaux techniques (adresse IP, page demandée) conservés pour la sécurité.")}</dd>
          </div>
          <div>
            <dt>Google Maps</dt>
            <dd>{fr("Seulement si vous cliquez sur « Itinéraire » : vous quittez alors notre site.")}</dd>
          </div>
          <div>
            <dt>Meta (Facebook)</dt>
            <dd>{fr("Seulement si vous suivez le lien vers notre page Facebook. Aucun bouton ni pixel Facebook sur le site.")}</dd>
          </div>
          <div>
            <dt>Gmail (Google)</dt>
            <dd>{fr(`Les courriels envoyés à ${c.email} sont reçus par la messagerie de Google.`)}</dd>
          </div>
        </dl>
        <p>
          {fr(
            "La police de caractères est hébergée sur notre propre site : aucune requête n'est faite à Google Fonts.",
          )}
        </p>
        <Todo>évaluation des facteurs relatifs à la vie privée pour la communication de renseignements hors du Québec (Google, Cloudflare), exigée par la Loi 25.</Todo>
      </Section>

      <Section id="conservation" title="Combien de temps les conservons-nous ?">
        <p className="pg-answer">
          {fr(
            "Vos messages, le temps de vous répondre et d'organiser l'édition en cours. Les statistiques de Google Analytics, 14 mois.",
          )}
        </p>
        <Todo>durée réelle de conservation des courriels et des listes d&apos;inscription par le comité.</Todo>
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
