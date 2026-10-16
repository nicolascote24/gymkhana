"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import Picture from "@/components/Picture";
import { getGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// "Une compétition officielle": the proof that closes the gymkhana section.
// The relay race fills the frame; over it, on the page's own column, the
// facts that make it a real competition and the way to the competition
// schedule. The rescue race sits on the corner as a second camera, captioned
// with what the event actually is. The two planes move at different speeds.
const FACTS: { value: string; label: string }[] = [
  { value: "≈ 100", label: "cavaliers par édition" },
  { value: "CBSLC", label: "compétition sanctionnée par le Club de barils du Saguenay–Lac-Saint-Jean–Côte-Nord" },
  { value: "Cheval Québec", label: "règlements officiels" },
];

export default function PhotoBand() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const cancel = whenIdle(() => {
      ctx = gsap.context(() => {
        const scroll = { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 };
        // The frame is taller than the window it shows through, so it can travel.
        gsap.fromTo("[data-band-wide]", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: scroll });
        gsap.matchMedia().add("(min-width: 1024px)", () => {
          gsap.fromTo("[data-band-inset]", { yPercent: 12 }, { yPercent: -12, ease: "none", scrollTrigger: scroll });
        });
      }, root);
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <div className="band" ref={ref} aria-labelledby="band-title">
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
          <a href="#jour-samedi" className="btn band__cta" data-reveal>
            Horaire des compétitions <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
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
