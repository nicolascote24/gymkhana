"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion, setScroller } from "@/lib/motion";

// Light inertial scrolling on desktop pointers only. Touch keeps native
// scrolling, and reduced-motion users get the browser default. Lenis, like
// GSAP, is fetched after the first paint, and never on touch screens.
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    let dead = false;
    let cleanup: (() => void) | undefined;
    Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (dead) return;
      const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: { offset: 0 } });
      lenis.on("scroll", ScrollTrigger.update);
      setScroller(lenis);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis");
      cleanup = () => {
        gsap.ticker.remove(tick);
        setScroller(null);
        lenis.destroy();
        document.documentElement.classList.remove("lenis");
      };
    });
    return () => {
      dead = true;
      cleanup?.();
    };
  }, []);
  return null;
}
