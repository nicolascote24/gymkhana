"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion, setScroller } from "@/lib/motion";

// Light inertial scrolling on desktop pointers only. Touch keeps native
// scrolling, and reduced-motion users get the browser default.
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: { offset: 0 } });
    lenis.on("scroll", ScrollTrigger.update);
    setScroller(lenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis");
    return () => {
      gsap.ticker.remove(tick);
      setScroller(null);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}
