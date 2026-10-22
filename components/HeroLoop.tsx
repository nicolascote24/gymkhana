"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// The 13 s cut of the 2026 film, laid over a hero's still once the page has
// loaded. Wide screens with a fine pointer only: phones keep the photograph
// (no 4 MB on a data plan), reduced motion and Save-Data keep it too. The
// still stays underneath, so nothing changes size or jumps when the video
// fades in, and a page that never plays it looks finished.
const ext = () => (document.createElement("video").canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4");

export default function HeroLoop({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const wide = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!v || !wide || prefersReducedMotion() || conn?.saveData) return;
    let timer = 0;
    const start = () => {
      // After the load and a short pause, so it never competes with the page.
      timer = window.setTimeout(() => {
        v.src = `/video/festival-boucle-1920.${ext()}`;
        v.play().catch(() => {});
      }, 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    // Pause off screen: the hero is only the top of the page.
    const io = new IntersectionObserver(([e]) => {
      if (!v.src) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      onPlaying={(e) => e.currentTarget.setAttribute("data-on", "")}
    />
  );
}
