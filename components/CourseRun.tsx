"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Pointing at an event (or focusing its link) runs its course once: the line
// redraws in red while a red dot, the horse, travels it. Same run as the
// relay on the home page; the course stays fully drawn at rest.
const DRAW = 1500;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CourseRun({ selector }: { selector: string }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const offs = [...document.querySelectorAll<HTMLElement>(selector)].map((el) => {
      const path = el.querySelector<SVGPathElement>(".course__path");
      const dot = el.querySelector<SVGCircleElement>(".course__rider");
      if (!path || !dot) return () => {};
      const length = path.getTotalLength();
      let raf = 0;
      let startedAt = 0;
      const place = (p: number) => {
        path.style.strokeDashoffset = String(1 - p);
        const pt = path.getPointAtLength(length * p);
        dot.setAttribute("cx", pt.x.toFixed(2));
        dot.setAttribute("cy", pt.y.toFixed(2));
      };
      const frame = (now: number) => {
        const t = Math.min((now - startedAt) / DRAW, 1);
        place(easeInOut(t));
        if (t < 1) raf = requestAnimationFrame(frame);
        else {
          raf = 0;
          el.removeAttribute("data-running");
        }
      };
      const run = () => {
        if (raf) return;
        el.setAttribute("data-running", "");
        startedAt = performance.now();
        place(0);
        raf = requestAnimationFrame(frame);
      };
      el.addEventListener("pointerenter", run);
      el.addEventListener("focusin", run);
      return () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("pointerenter", run);
        el.removeEventListener("focusin", run);
      };
    });
    return () => offs.forEach((off) => off());
  }, [selector]);
  return null;
}
