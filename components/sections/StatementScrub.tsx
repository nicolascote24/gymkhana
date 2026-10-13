"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// Words of the statement go from dust to ink as the reader scrolls through
// it, so the sentence is read at the pace it is revealed. The motto words
// fill in ink like the rest, then turn red together once the last one is
// read (fading them in red would pass them through salmon).
export default function StatementScrub({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const words = [...root.querySelectorAll<HTMLElement>(".w")];
    const lastMotto = words.map((w) => w.classList.contains("em")).lastIndexOf(true);
    const STAGGER = 0.08;
    const DURATION = 0.5;
    const total = (words.length - 1) * STAGGER + DURATION;
    const mottoAt = lastMotto < 0 ? 2 : (lastMotto * STAGGER + DURATION) / total;
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const cancel = whenIdle(() => {
      root.classList.add("is-scrub");
      ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            duration: DURATION,
            stagger: STAGGER,
            // The dim state is applied only once the statement reaches the
            // viewport edge, so the text is fully legible until then.
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom 45%",
              scrub: 0.4,
              onUpdate: (self) => root.classList.toggle("is-motto", self.progress >= mottoAt - 0.01),
            },
          },
        );
      }, root);
    });
    return () => {
      cancel();
      ctx?.revert();
      root.classList.remove("is-scrub", "is-motto");
    };
  }, []);
  return <div ref={ref}>{children}</div>;
}
