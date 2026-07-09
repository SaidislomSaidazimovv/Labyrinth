import { Suspense, lazy, useState } from "react";
import { Grid3x3, Minus, Plus, RefreshCw } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInView";

// three + fiber + drei is the heaviest thing on the page. It has no business in
// the initial bundle for a canvas that lives well below the fold.
const MazeScene = lazy(() => import("./MazeScene"));

const MIN_RINGS = 9;
const MAX_RINGS = 18;

const KEY = [
  { colour: "#4C5F3C", label: "The Glade" },
  { colour: "#2F3D2A", label: "Deadheads" },
  { colour: "#3B3026", label: "Homestead" },
  { colour: "#565C5E", label: "The four doors" },
  { colour: "#6C716D", label: "Concrete, ivy-choked" },
  { colour: "#4A5155", label: "Metal, mid-band" },
  { colour: "#37414A", label: "Machine, outer band" },
];

const Placeholder = ({ label }: { label: string }) => (
  <div className="absolute inset-0 grid place-items-center">
    <p className="label animate-pulse">{label}</p>
  </div>
);

const MazePreview = () => {
  const [rings, setRings] = useState(14);
  const [seed, setSeed] = useState(1);
  const [showSections, setShowSections] = useState(false);
  const [frameRef, mounted] = useInViewOnce<HTMLDivElement>();

  const resize = (delta: number) =>
    setRings((r) => Math.min(MAX_RINGS, Math.max(MIN_RINGS, r + delta)));

  return (
    <figure className="mt-16">
      <div
        ref={frameRef}
        className="slab relative h-[320px] overflow-hidden sm:h-[440px] lg:h-[580px]"
      >
        {mounted ? (
          <Suspense fallback={<Placeholder label="Opening the doors" />}>
            <MazeScene rings={rings} seed={seed} showSections={showSections} />
          </Suspense>
        ) : (
          <Placeholder label="The Glade" />
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="flex items-center gap-2 border border-border-strong bg-background/80 px-3 py-2 font-mono text-xs text-foreground backdrop-blur transition-colors hover:border-accent-c hover:text-accent-c"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden />
              Shift the walls
            </button>

            <button
              type="button"
              onClick={() => setShowSections((v) => !v)}
              aria-pressed={showSections}
              className={`flex items-center gap-2 border bg-background/80 px-3 py-2 font-mono text-xs backdrop-blur transition-colors ${
                showSections
                  ? "border-accent-c text-accent-c"
                  : "border-border-strong text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">The eight sections</span>
              <span className="sm:hidden">Sections</span>
            </button>

            <button
              type="button"
              onClick={() => resize(-1)}
              disabled={rings <= MIN_RINGS}
              aria-label="Fewer rings"
              className="grid h-9 w-9 place-items-center border border-border-strong bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => resize(1)}
              disabled={rings >= MAX_RINGS}
              aria-label="More rings"
              className="grid h-9 w-9 place-items-center border border-border-strong bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground disabled:opacity-30"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          <div className="flex items-end justify-between font-mono text-[0.6875rem] text-muted-foreground">
            <dl className="flex gap-6">
              <div>
                <dt className="label text-[0.5625rem]">Rings</dt>
                <dd className="mt-1 tabular-nums text-foreground">{rings}</dd>
              </div>
              <div>
                <dt className="label text-[0.5625rem]">Seed</dt>
                <dd className="mt-1 tabular-nums text-foreground">
                  {String(seed).padStart(4, "0")}
                </dd>
              </div>
            </dl>
            <p className="hidden sm:block">Drag to orbit · scroll to zoom</p>
          </div>
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {KEY.map((entry) => (
          <li
            key={entry.label}
            className="flex items-center gap-2 font-mono text-[0.6875rem] text-muted-foreground"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 border border-border-strong"
              style={{ backgroundColor: entry.colour }}
              aria-hidden
            />
            {entry.label}
          </li>
        ))}
      </ul>

      <figcaption className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        A square Glade with one door centred in each wall, ringed by a circular
        maze of three concentric bands: dense against the Glade, opening outward,
        the outer band split into eight sections whose boundaries fall on the door
        axes — so two Runners leave by one door and take a section each. Concrete
        gives way to metal, and metal to machine.{" "}
        <span className="text-foreground/70">
          The circular, three-band reading is a reconstruction of the film's aerial
          shot, not a filmmaker's plan. There isn't one.
        </span>
      </figcaption>
    </figure>
  );
};

export default MazePreview;
