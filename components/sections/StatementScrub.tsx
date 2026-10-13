"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// Words of the statement go from dust to ink as the reader scrolls through
// it, so the sentence is read at the pace it is revealed.
export default function StatementScrub({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const words = root.querySelectorAll<HTMLElement>(".w");
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const cancel = whenIdle(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            // The dim state is applied only once the statement reaches the
            // viewport edge, so the text is fully legible until then.
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom 45%",
              scrub: 0.4,
            },
          },
        );
      }, root);
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);
  return <div ref={ref}>{children}</div>;
}
