"use client";

import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type Motion = { gsap: typeof Gsap; ScrollTrigger: typeof ScrollTriggerType };

// GSAP is not part of the first load: it is fetched once, after the page has
// painted, so the hero's photograph and text never wait for it. Everything
// the script animates is already readable without it.
let loading: Promise<Motion> | null = null;

export function loadGsap(): Promise<Motion> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    g.gsap.config({ nullTargetWarn: false });
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
  return loading;
}

// Effect helper: runs `setup` once GSAP has loaded (unless the component
// unmounted first) and returns the cleanup for useEffect.
export function withGsap(setup: (m: Motion) => void | (() => void)): () => void {
  let dead = false;
  let cleanup: void | (() => void);
  loadGsap().then((m) => {
    if (!dead) cleanup = setup(m);
  });
  return () => {
    dead = true;
    cleanup?.();
  };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Motion tokens shared by every animation on the page.
export const ease = {
  out: "expo.out", // entrances: fast start, long settle
  outSoft: "power3.out",
  inOut: "power2.inOut", // scrubbed and state transitions
};

export const dur = {
  micro: 0.18,
  reveal: 0.9,
  hero: 1.6,
};

// Run below-the-fold motion setup once the browser is idle, after the first
// paint, so it never competes with the hero for the main thread.
export function whenIdle(fn: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout: 1500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(fn, 300);
  return () => window.clearTimeout(id);
}

// The smooth-scroll instance, when one runs (desktop fine pointers only).
type Scroller = { scrollTo: (target: number, options?: { immediate?: boolean }) => void };
let scroller: Scroller | null = null;
export const setScroller = (s: Scroller | null) => {
  scroller = s;
};

// Scroll the page to a y position through Lenis when it runs, so the two
// never fight; instant under reduced motion.
export function scrollToY(y: number, jump = false) {
  const immediate = jump || prefersReducedMotion();
  if (scroller) scroller.scrollTo(y, { immediate });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}
