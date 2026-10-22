"use client";

import { useEffect } from "react";
import { withGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// The band's two planes move at different speeds. Kept apart from the band
// itself (a server component), so its photographs and their image manifest
// never travel to the browser as script.
export default function PhotoBandMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-band]");
    if (!root || prefersReducedMotion()) return;
    return withGsap(({ gsap }) => {
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
    });
  }, []);
  return null;
}
