"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

// Secondary detail folded behind one button on phones only (see .fold). Wider
// screens, and phones without the script, always show the content.
export default function MobileFold({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={className ? `fold ${className}` : "fold"} data-open={open}>
      <button type="button" className="fold__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {open ? "Réduire" : label}
        <CaretDown size={16} weight="bold" aria-hidden />
      </button>
      <div id={id} className="fold__body">
        {children}
      </div>
    </div>
  );
}
