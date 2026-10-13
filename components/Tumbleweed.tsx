"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// A tumbleweed drawn in the same single line as the course diagrams. It rolls
// across once, the first time its strip comes into view, and leaves. Under
// reduced motion it simply rests at the edge of the strip.

// Seeded so the server and the browser draw the same strands.
function strands(seed: number) {
  let s = seed;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  const R = 44;
  const paths: string[] = [];
  for (let k = 0; k < 22; k++) {
    // each strand wanders around the ball, mostly near its rim
    let a = rand() * Math.PI * 2;
    const pts: [number, number][] = [];
    const n = 4 + Math.floor(rand() * 3);
    for (let i = 0; i < n; i++) {
      const r = R * (k < 9 ? 0.82 + rand() * 0.18 : 0.25 + rand() * 0.7);
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
      a += (0.5 + rand() * 0.9) * (rand() < 0.8 ? 1 : -1);
    }
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += `Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    paths.push(d);
  }
  return paths.join("");
}

export default function Tumbleweed({ seed = 7, className = "" }: { seed?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.dataset.ready = "";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.rolling = "";
        io.disconnect();
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={`tumble ${className}`} aria-hidden>
      <span className="tumble__run">
        <span className="tumble__hop">
          <svg viewBox="-50 -50 100 100" className="tumble__ball">
            <path d={strands(seed)} />
          </svg>
        </span>
      </span>
    </span>
  );
}
