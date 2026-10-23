"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, X } from "@phosphor-icons/react";
import { prefersReducedMotion } from "@/lib/motion";

type Chapter = { id: string; title: string; text: string; href: string };

// The 2026 film, in two states. At rest, a silent 13 s cut of its best shots
// loops behind the three ways into the page (Compétition, Country, Famille).
// "Voir le film" swaps it, in the same frame, for the full film with sound
// and controls. The loop loads only near the screen, plays only on screen,
// and never plays by itself under reduced motion (the poster stays).
// WebM (VP9) where the browser plays it, H.264 MP4 everywhere else.
const ext = () => (document.createElement("video").canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4");
// Encoded from the client's 4K master: 1080p for wide screens, 720p for
// phones (their 4:5 crop of the frame still fills a high-density screen).
const loopSrc = () => `/video/festival-boucle-${window.matchMedia("(max-width: 767px)").matches ? 1280 : 1920}.${ext()}`;
const fullSrc = () => `/video/festival-2026.${ext()}`;
// Data saver on, or a slow link: the still stays and the ~3 MB loop is never
// fetched. The full film still plays on request.
const saveData = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g|3g/.test(c.effectiveType ?? ""));
};
const POSTER = "/video/festival-poster.jpg";
// The still under the loop, at three widths (scripts/build-images.mjs, "film-still").
const STILL = (type: string) => [828, 1280, 1920].map((w) => `/images/film-still-${w}.${type} ${w}w`).join(", ");

export default function Film({ chapters }: { chapters: Chapter[] }) {
  const frame = useRef<HTMLDivElement>(null);
  const loop = useRef<HTMLVideoElement>(null);
  const full = useRef<HTMLVideoElement>(null);
  const playBtn = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = loop.current;
    const box = frame.current;
    if (!v || !box || prefersReducedMotion() || saveData()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = loopSrc();
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  const open = () => {
    setPlaying(true);
    loop.current?.pause();
    requestAnimationFrame(() => {
      const f = full.current;
      if (!f) return;
      f.focus();
      f.play().catch(() => {});
    });
  };
  const close = () => {
    full.current?.pause();
    setPlaying(false);
    if (!prefersReducedMotion() && loop.current?.src) loop.current.play().catch(() => {});
    requestAnimationFrame(() => playBtn.current?.focus());
  };

  return (
    <section className="film" aria-labelledby="film-title" data-playing={playing || undefined}>
      <div className="film__frame" ref={frame}>
        {/* The still under the loop is an image, not the video's poster, so
            it loads lazily like any picture below the fold. */}
        <picture>
          <source type="image/avif" srcSet={STILL("avif")} sizes="100vw" />
          <source type="image/webp" srcSet={STILL("webp")} sizes="100vw" />
          <img className="film__still" src={POSTER} alt="" width={1920} height={1080} loading="lazy" decoding="async" />
        </picture>
        <video
          ref={loop}
          className="film__loop"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
        />
        {playing && (
          <video
            ref={full}
            className="film__full"
            src={fullSrc()}
            poster={POSTER}
            controls
            playsInline
            preload="auto"
            onEnded={close}
            onKeyDown={(e) => e.key === "Escape" && close()}
            aria-label="Film de l'édition 2026 du festival"
          />
        )}

        <div className="film__head">
          <h2 id="film-title" className="film__title">
            Le festival en images
          </h2>
          {playing ? (
            <button type="button" className="film__btn film__btn--close" onClick={close}>
              <X size={18} weight="bold" aria-hidden /> Fermer le film
            </button>
          ) : (
            <button type="button" className="film__btn" onClick={open} ref={playBtn}>
              <span className="film__play" aria-hidden>
                <Play size={18} weight="fill" />
              </span>
              Voir le film<span className="film__long"> de l&apos;édition 2026</span>{" "}
              <span className="film__time">1 min 25</span>
            </button>
          )}
        </div>

        <ul className="film__chapters">
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={c.href} className="film__chapter">
                <span className="film__chapter-title">
                  {c.title}
                  <ArrowRight className="film__arrow" size={22} weight="bold" aria-hidden />
                </span>
                <span className="film__chapter-text">{c.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
