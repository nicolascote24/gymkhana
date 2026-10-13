"use client";

import { useEffect, useRef } from "react";
import Picture from "@/components/Picture";
import { getGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// The arena in widescreen: the relay race edge to edge, and the rescue race
// set over its corner like a second camera. The two planes travel at
// different speeds as the page scrolls, so the frame has depth.
export default function PhotoBand({ children }: { children?: React.ReactNode }) {
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
        // On phones the inset sits in the flow under the photo: only the wide frame moves.
        gsap.matchMedia().add("(min-width: 768px)", () => {
          gsap.fromTo("[data-band-inset]", { yPercent: 14 }, { yPercent: -14, ease: "none", scrollTrigger: scroll });
        });
      }, root);
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <div className="band" ref={ref}>
      <figure className="band__wide" data-reveal="image">
        <div className="band__frame" data-band-wide>
          <Picture
            id="relais"
            alt="Deux cavaliers au galop se passent le témoin pendant la course de relais, devant les gradins."
            sizes="100vw"
          />
        </div>
        <figcaption className="band__caption">
          <span className="band__caption-title">Course de relais</span>
          <span>Devant les gradins du manège</span>
        </figcaption>
      </figure>
      <figure className="band__inset" data-band-inset>
        <div className="band__inset-img" data-reveal="image">
          <Picture
            id="sauvetage"
            alt="Un cavalier saute de sa selle dans un nuage de poussière, au milieu de l'arène."
            sizes="(max-width: 767px) 72vw, 36vw"
          />
        </div>
        <figcaption className="band__inset-caption">Course de sauvetage, dans l&apos;arène de sable.</figcaption>
      </figure>
      {children && (
        <p className="band__note" data-reveal>
          {children}
        </p>
      )}
    </div>
  );
}
