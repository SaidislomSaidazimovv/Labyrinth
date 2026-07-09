import { useId, useState } from "react";
import { lastCity } from "@/data/mazeRunnerContent";

/**
 * One wall, two worlds.
 *
 * Gyula Pados grades the third film orange against teal: warm is the
 * resistance, the desert, the people the wall keeps out. Cold blue is the
 * machine. The whole argument of The Death Cure is in that one piece of
 * architecture, so here it is as architecture.
 *
 * Drawn, not photographed — the skylines are rectangles. A range input drives
 * the divider, so a keyboard gets the same thing a pointer does.
 */

/** Shanties: low, crowded, irregular. Nothing here was planned. */
const SHANTY = [
  [2, 62, 9, 38],
  [12, 70, 7, 30],
  [20, 58, 11, 42],
  [32, 68, 8, 32],
  [41, 74, 6, 26],
  [48, 64, 9, 36],
] as const;

/** Towers: tall, spaced, aligned. Everything here was planned. */
const TOWER = [
  [54, 22, 8, 78],
  [64, 34, 6, 66],
  [72, 12, 9, 88],
  [83, 30, 7, 70],
  [92, 44, 6, 56],
] as const;

const LastCityWall = () => {
  const [split, setSplit] = useState(46);
  const sliderId = useId();

  return (
    <section className="mt-20">
      <div className="seam mb-12" />

      <h3 className="text-xl text-foreground">{lastCity.title}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {lastCity.standfirst}
      </p>

      <div className="slab relative mt-12 h-[300px] overflow-hidden sm:h-[380px]">
        {/* Inside: steel blue, and the light is even. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#16222B_0%,#0D141A_100%)]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            {TOWER.map(([x, y, w, h]) => (
              <rect key={x} x={x} y={y} width={w} height={h} fill="#28414F" />
            ))}
            {TOWER.map(([x, y, w]) => (
              <rect key={`lit-${x}`} x={x + 1} y={y + 4} width={w - 2} height={2} fill="#5C9BC4" opacity={0.5} />
            ))}
          </svg>
        </div>

        {/* Outside: gold and sodium, clipped to the left of the wall. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#2E2013_0%,#140D08_100%)]"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            {SHANTY.map(([x, y, w, h]) => (
              <rect key={x} x={x} y={y} width={w} height={h} fill="#4A3520" />
            ))}
            {SHANTY.map(([x, y, w]) => (
              <rect key={`fire-${x}`} x={x + 2} y={y + 6} width={w - 4} height={2} fill="#E08A2E" opacity={0.6} />
            ))}
          </svg>
        </div>

        {/* The wall itself. */}
        <div
          className="absolute inset-y-0 w-[10px] -translate-x-1/2 bg-[#4B5257] shadow-[0_0_40px_rgba(0,0,0,0.7)]"
          style={{ left: `${split}%` }}
          aria-hidden
        />

        {/* Labels, each pinned to its own side. */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-between p-5">
          <p className="font-mono text-[0.625rem] uppercase tracking-widest text-[#E0A85E]">
            {lastCity.outside.tagline}
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-widest text-[#7FB0CF]">
            {lastCity.inside.tagline}
          </p>
        </div>

        <label htmlFor={sliderId} className="sr-only">
          Move the wall to see either side of the Last City
        </label>
        <input
          id={sliderId}
          type="range"
          min={12}
          max={88}
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          aria-valuetext={`Wall at ${split} percent`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent
            [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:bg-transparent
            [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:cursor-ew-resize
            [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent
            [&::-moz-range-track]:bg-transparent"
        />
      </div>

      <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
        {[lastCity.outside, lastCity.inside].map((side) => (
          <div key={side.label} className="bg-surface p-8">
            <p className="label">{side.label}</p>
            <ul className="mt-6 space-y-4">
              {side.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent-c" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground">
        {lastCity.closing}
      </p>
    </section>
  );
};

export default LastCityWall;
