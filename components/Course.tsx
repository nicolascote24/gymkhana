import type { Epreuve } from "@/content/epreuves";

// An event's course drawn as a single line on a 100x100 grid, with its
// barrels, poles and zones. The line takes the text colour, so the same
// drawing reads on sand and on night; marks are barrel red. A red dot (the
// horse) can travel the line (CourseRun).
export default function Course({ e, className = "course" }: { e: Epreuve; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path className="course__ghost" d={e.trace} />
      <path className="course__path" d={e.trace} pathLength={1} />
      {e.marks.map((m, i) => {
        switch (m.kind) {
          case "cercle":
            return <circle key={i} cx={m.x} cy={m.y} r={11} className="course__ring" />;
          case "relais": {
            // The zone lies across the track: bars across a side, posts across the ends.
            const across = m.y < 20 || m.y > 80;
            return across ? (
              <g key={i} className="course__mark">
                <rect x={m.x - 6} y={m.y - 7} width={3} height={14} />
                <rect x={m.x + 3} y={m.y - 7} width={3} height={14} />
              </g>
            ) : (
              <g key={i} className="course__mark">
                <rect x={m.x - 7} y={m.y - 6} width={14} height={3} />
                <rect x={m.x - 7} y={m.y + 3} width={14} height={3} />
              </g>
            );
          }
          case "couloir":
            return (
              <g key={i} className="course__mark">
                <rect x={m.x - 7} y={m.y - 6} width={2.5} height={12} />
                <rect x={m.x + 4.5} y={m.y - 6} width={2.5} height={12} />
              </g>
            );
          case "fleche":
            return (
              <path
                key={i}
                d={`M${m.x - 6} ${m.y} L${m.x + 3} ${m.y - 5.5} L${m.x + 3} ${m.y + 5.5} Z`}
                className="course__mark"
              />
            );
          case "piquet":
            return <rect key={i} x={m.x - 1.5} y={m.y - 4} width={3} height={8} className="course__mark" />;
          case "drapeau":
            return (
              <g key={i} className="course__mark">
                <circle cx={m.x} cy={m.y} r={4.5} />
                <rect x={m.x - 0.6} y={m.y - 15} width={1.2} height={11} />
                <path d={`M${m.x} ${m.y - 15} L${m.x + 8} ${m.y - 12} L${m.x} ${m.y - 9} Z`} />
              </g>
            );
          default:
            return <circle key={i} cx={m.x} cy={m.y} r={4.5} className="course__mark" />;
        }
      })}
      <circle className="course__rider" r={3.6} />
    </svg>
  );
}
