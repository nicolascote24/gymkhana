"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// The cloverleaf barrel pattern, drawn by the reader's scroll. On wide
// screens the scene is pinned while the course draws and the three steps
// advance; on small screens it simply draws once when it comes into view.
// Labels sit outside each barrel's loop so the drawn path never covers them.
const BARRELS = [
  { x: 290, y: 300, lx: 50, ly: 5 },
  { x: 110, y: 300, lx: -50, ly: 5 },
  { x: 200, y: 110, lx: 0, ly: -46 },
];
const PATH =
  "M200 492 L256 310 A34 34 0 1 1 270 327 C 232 352, 172 352, 144 310 A34 34 0 1 0 130 328 C 156 290, 150 190, 166 118 A34 34 0 1 1 214 141 C 212 250, 204 380, 200 492";

type Step = { title: string; text: string };

export default function GymkhanaScene({ steps, definition }: { steps: Step[]; definition: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const path = root.querySelector<SVGPathElement>("[data-course]");
    const barrels = root.querySelectorAll<SVGGElement>("[data-barrel]");
    if (!path) return;
    if (prefersReducedMotion()) {
      barrels.forEach((b) => b.classList.add("is-lit"));
      return;
    }
    const { gsap, ScrollTrigger } = getGsap();
    // Fractions of the path where each barrel is rounded, then the finish.
    const lit = [0.38, 0.62, 0.86];
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const cancel = whenIdle(() => {
      ctx = gsap.context(() => {
        gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
        const mm = gsap.matchMedia();
        const update = (p: number) => {
          barrels.forEach((b, i) => b.classList.toggle("is-lit", p >= lit[i]));
          setStep(p < 0.3 ? 0 : p < 0.88 ? 1 : 2);
        };
        mm.add("(min-width: 1024px)", () => {
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=160%",
              pin: true,
              scrub: 0.6,
              onUpdate: (self) => update(self.progress),
            },
          });
        });
        mm.add("(max-width: 1023px)", () => {
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path,
              start: "top 80%",
              end: "bottom 45%",
              scrub: 0.6,
              onUpdate: (self) => update(self.progress),
            },
          });
        });
      }, root);
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <div className="gym__scene" ref={ref}>
      <div className="wrap gym__grid">
        <div className="gym__text">
          <h2 id="gym-title" className="gym__title" data-reveal="title">
            Le gymkhana
          </h2>
          <p className="gym__def" data-reveal>
            {definition}
          </p>
          <ol className="gym__steps">
            {steps.map((s, i) => (
              <li key={s.title} className="gym__step" data-active={i === step} data-done={i < step}>
                <span className="gym__step-title">{s.title}</span>
                <span className="gym__step-text">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <figure className="gym__arena" aria-label="Le parcours en trèfle de la course de barils">
          <svg viewBox="0 0 400 520" role="img" aria-labelledby="arena-title">
            <title id="arena-title">Parcours en trèfle autour de trois barils</title>
            <rect x="8" y="8" width="384" height="504" className="arena__fence" />
            <line x1="150" y1="470" x2="250" y2="470" className="arena__line" />
            <text x="262" y="474" className="arena__label">
              DÉPART
            </text>
            <path d={PATH} className="arena__ghost" />
            <path d={PATH} className="arena__path" data-course pathLength={1} />
            {BARRELS.map((b, i) => (
              <g key={i} data-barrel className="arena__barrel" transform={`translate(${b.x} ${b.y})`}>
                <circle r="16" className="arena__halo" />
                <circle r="10" className="arena__drum" />
                <text x={b.lx} y={b.ly} textAnchor="middle" className="arena__num">
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
        </figure>
      </div>
    </div>
  );
}
