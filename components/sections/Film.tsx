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
const loopSrc = () => `/video/festival-boucle-${window.matchMedia("(max-width: 767px)").matches ? 720 : 1280}.${ext()}`;
const fullSrc = () => `/video/festival-2026.${ext()}`;
const POSTER = "/video/festival-poster.jpg";

export default function Film({ chapters }: { chapters: Chapter[] }) {
  const frame = useRef<HTMLDivElement>(null);
  const loop = useRef<HTMLVideoElement>(null);
  const full = useRef<HTMLVideoElement>(null);
  const playBtn = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = loop.current;
    const box = frame.current;
    if (!v || !box || prefersReducedMotion()) return;
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
    if (!prefersReducedMotion()) loop.current?.play().catch(() => {});
    requestAnimationFrame(() => playBtn.current?.focus());
  };

  return (
    <section className="film" aria-labelledby="film-title" data-playing={playing || undefined}>
      <div className="film__frame" ref={frame}>
        <video
          ref={loop}
          className="film__loop"
          poster={POSTER}
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
