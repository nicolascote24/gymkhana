"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GA_ID, readChoice, saveChoice, startAnalytics, stopAnalytics, track, type Choice } from "@/lib/consent";

// The consent banner. It appears only when a measurement tool is configured
// (NEXT_PUBLIC_GA_ID), after the page has painted, as a bar fixed to the
// bottom: it never becomes the largest element and never moves the page.
// « Accepter » and « Refuser » have the same weight. The footer's
// « Préférences de témoins » brings it back.
export const OPEN_EVENT = "fgf:preferences";

export default function Consent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const choice = readChoice();
    if (choice === "accepte") startAnalytics();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the stored choice is only readable in the browser
    else if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);

    // Conversion events: calls, e-mails, directions and links marked
    // data-event. Only the kind of link is sent, nothing about the person.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const name =
        a.dataset.event ??
        (href.startsWith("tel:")
          ? "clic_telephone"
          : href.startsWith("mailto:")
            ? href.includes("subject=Inscription")
              ? "clic_inscription"
              : "clic_courriel"
            : href.includes("google.com/maps")
              ? "clic_itineraire"
              : "");
      if (name) track(name);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener(OPEN_EVENT, reopen);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  if (!GA_ID || !open) return null;

  const choose = (choice: Choice) => {
    saveChoice(choice);
    if (choice === "accepte") startAnalytics();
    else stopAnalytics();
    setOpen(false);
  };

  return (
    <section className="consent on-night" role="region" aria-labelledby="consent-title">
      <div className="consent__text">
        <h2 id="consent-title" className="consent__title">
          Témoins de mesure d&apos;audience
        </h2>
        <p>
          Avec votre accord, nous mesurons les visites avec Google Analytics pour savoir quelles pages vous servent.
          Aucune publicité, aucune donnée vendue.{" "}
          <Link href="/confidentialite/">Politique de confidentialité</Link>
        </p>
      </div>
      <div className="consent__actions">
        <button type="button" className="consent__btn" onClick={() => choose("refuse")}>
          Refuser
        </button>
        <button type="button" className="consent__btn" onClick={() => choose("accepte")}>
          Accepter
        </button>
      </div>
    </section>
  );
}

// Footer link to change the choice at any time.
// Without a measurement tool configured there is nothing to choose: the
// fallback (if any) is shown instead.
export function ConsentPreferences({ className, fallback = null }: { className?: string; fallback?: React.ReactNode }) {
  if (!GA_ID) return fallback;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Préférences de témoins
    </button>
  );
}
