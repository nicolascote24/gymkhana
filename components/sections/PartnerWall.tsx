"use client";

import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CaretDown } from "@phosphor-icons/react";

// The other partners. Wide screens run them as a slow marquee; phones show
// them as a set list, folded to its first lines until the reader asks for
// the rest, so the names do not fill two screens before the page ends.
export default function PartnerWall({ names }: { names: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const loop = [...names, ...names];
  // Folding the list shrinks the page above the button: keep the button
  // where the finger is, instead of dropping the reader into the footer.
  const toggle = () => {
    const before = btn.current?.getBoundingClientRect().top ?? 0;
    flushSync(() => setOpen(!open));
    const after = btn.current?.getBoundingClientRect().top ?? 0;
    window.scrollBy(0, after - before);
  };
  return (
    <>
      <div className="part__marquee" data-open={open} aria-label="Autres partenaires" role="region">
        <ul className="part__track" id={id}>
          {loop.map((p, i) => (
            <li key={`${p}-${i}`} aria-hidden={i >= names.length}>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap part__more">
        <button
          ref={btn}
          type="button"
          className="part__toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={toggle}
        >
          {open ? "Réduire la liste" : `Voir les ${names.length} autres partenaires`}
          <CaretDown size={16} weight="bold" aria-hidden />
        </button>
      </div>
    </>
  );
}
