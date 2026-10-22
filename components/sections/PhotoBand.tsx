import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Picture from "@/components/Picture";
import PhotoBandMotion from "@/components/sections/PhotoBandMotion";

// "Une compétition officielle": the proof that closes the gymkhana section.
// The relay race fills the frame; over it, on the page's own column, the
// facts that make it a real competition and the way to the rule book and
// registration, on the events page. The rescue race sits on the corner as a second camera, captioned
// with what the event actually is. The two planes move at different speeds.
const FACTS: { value: string; label: string }[] = [
  { value: "≈ 100", label: "cavaliers par édition" },
  { value: "CBSLC", label: "compétition sanctionnée par le Club de barils du Saguenay–Lac-Saint-Jean–Côte-Nord" },
  { value: "Cheval Québec", label: "règlements officiels" },
];

export default function PhotoBand() {
  return (
    <div className="band" data-band aria-labelledby="band-title">
      <PhotoBandMotion />
      <div className="band__wide" data-reveal="image">
        <div className="band__frame" data-band-wide>
          <Picture
            id="relais"
            alt="Course de relais : deux cavaliers au galop se passent le témoin devant les gradins."
            sizes="100vw"
          />
        </div>
      </div>

      <div className="wrap band__grid">
        <div className="band__copy">
          <h3 id="band-title" className="band__title" data-reveal>
            Une compétition officielle
          </h3>
          <dl className="band__facts" data-reveal>
            {FACTS.map((f) => (
              <div key={f.value}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <Link href="/epreuves-gymkhana/#reglement" className="btn btn--ghost band__cta" data-reveal>
            Règlement et inscription <ArrowRight size={18} weight="bold" aria-hidden />
          </Link>
        </div>

        <figure className="band__inset" data-band-inset>
          <div className="band__inset-img" data-reveal="image">
            <Picture
              id="sauvetage"
              alt="Course de sauvetage : le cavalier se jette sur la croupe du cheval de son coéquipier."
              sizes="(max-width: 1023px) 92vw, 32vw"
            />
          </div>
          <figcaption>
            <strong>Course de sauvetage.</strong> Un cavalier contourne l&apos;arène, charge son coéquipier en croupe et
            termine la course à deux.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
