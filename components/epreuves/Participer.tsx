import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { festival } from "@/content/festival";
import { fr } from "@/lib/typo";

// Back to the day to take part. Registration is by email to the organising
// committee (client, 2026-10).

const subject = encodeURIComponent("Inscription aux épreuves de gymkhana 2027");
export const inscriptionHref = `mailto:${festival.contact.email}?subject=${subject}`;

const STEPS = [
  {
    title: "Choisir ses épreuves",
    text: "Repérez les épreuves et les classes qui vous conviennent. Les classes et les tarifs 2027 seront annoncés avec la programmation.",
  },
  {
    title: "Préparer son cheval et sa tenue",
    text: "Test de Coggins valide, tenue western, casque pour les 18 ans et moins : les exigences sont dans le règlement.",
    link: { href: "#reglement", label: "Revoir les exigences" },
  },
  {
    title: "Écrire au festival",
    text: `Les inscriptions se font par courriel : envoyez votre demande au comité organisateur, à ${festival.contact.email}.`,
  },
];

export default function Participer() {
  return (
    <div className="ep-part">
      <section id="inscription" className="wrap ep-sign" aria-labelledby="sign-title">
        <div className="ep-sign__head">
          <h2 id="sign-title" className="ep-sign__title" data-reveal="title">
            {fr("S'inscrire")}
          </h2>
          <p className="ep-sign__lead" data-reveal>
            Les inscriptions aux épreuves se font par courriel, en trois temps.
          </p>
        </div>
        <ol className="ep-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="ep-step" data-reveal style={{ ["--d" as string]: i }}>
              <span className="ep-step__num" aria-hidden>
                {i + 1}
              </span>
              <h3 className="ep-step__title">{s.title}</h3>
              <p className="ep-step__text">{fr(s.text)}</p>
              {s.link && (
                <a className="ep-step__link" href={s.link.href}>
                  {s.link.label} <ArrowRight size={14} weight="bold" aria-hidden />
                </a>
              )}
            </li>
          ))}
        </ol>
        <div className="ep-sign__action" data-reveal>
          <a className="btn" href={inscriptionHref}>
            <EnvelopeSimple size={20} weight="bold" aria-hidden /> {fr("S'inscrire par courriel")}
          </a>
          <p>
            <a href={`mailto:${festival.contact.email}`}>{festival.contact.email}</a>
            <br />
            Information : <a href={festival.contact.info.href}>{festival.contact.info.phone}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
