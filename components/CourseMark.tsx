// A small cloverleaf course with its label: "Départ" under the hero,
// "Arrivée" in the footer. Same pattern as the arena in the Gymkhana section.
const PATH =
  "M200 492 L256 310 A34 34 0 1 1 270 327 C 232 352, 172 352, 144 310 A34 34 0 1 0 130 328 C 160 280, 240 190, 234 118 A34 34 0 1 0 186 141 C 188 250, 196 380, 200 492";

export default function CourseMark({ label, className }: { label: string; className?: string }) {
  return (
    <span className={`course-mark ${className ?? ""}`} data-reveal="course">
      <svg viewBox="60 60 280 450" aria-hidden>
        <path d={PATH} className="course-mark__path" pathLength={1} />
        <circle cx="290" cy="300" r="16" className="course-mark__barrel" />
        <circle cx="110" cy="300" r="16" className="course-mark__barrel" />
        <circle cx="200" cy="110" r="16" className="course-mark__barrel" />
      </svg>
      {label}
    </span>
  );
}
