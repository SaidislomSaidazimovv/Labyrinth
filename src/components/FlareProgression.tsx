import { useId, useMemo, useState } from "react";
import { flare } from "@/data/mazeRunnerContent";

/**
 * The Flare, scrubbed.
 *
 * There is no clinical staging for this in any of the three films — no chart,
 * no timeline, no numbers. Inventing one would be inventing canon. What the
 * films do give is four people standing at four distances from the end, so the
 * scale is measured in people.
 *
 * The control is a real range input. Drag it, or focus it and use the arrow
 * keys; either way the same thing happens, which is the point of using one.
 */

/** Veins, drawn as a river system. They fill as the reader scrubs forward. */
const VEINS = [
  "M50 96 L50 62",
  "M50 68 L34 50 L30 34",
  "M50 68 L66 50 L70 34",
  "M50 58 L38 42 L36 26",
  "M50 58 L62 42 L64 26",
  "M50 50 L44 34 L46 18",
  "M50 50 L56 34 L54 18",
  "M34 50 L22 42",
  "M66 50 L78 42",
  "M36 26 L28 16",
  "M64 26 L72 16",
];

const FlareProgression = () => {
  const [value, setValue] = useState(0);
  const sliderId = useId();

  const stage = useMemo(() => {
    // The nearest person at or before this point on the scale.
    let current = flare.stages[0];
    for (const candidate of flare.stages) {
      if (value >= candidate.at) current = candidate;
    }
    return current;
  }, [value]);

  const progress = value / 100;

  return (
    <section className="mt-20">
      <div className="seam mb-12" />

      <h3 className="text-xl text-foreground">{flare.title}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {flare.standfirst}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
        {/* The arm, and what is climbing it. */}
        <div className="slab relative flex items-center justify-center overflow-hidden p-8">
          <svg
            viewBox="0 0 100 100"
            className="h-56 w-full"
            aria-hidden
            style={{
              // Amber, to rust, to something with no colour left in it.
              filter: `hue-rotate(${-progress * 26}deg) saturate(${1 - progress * 0.55})`,
            }}
          >
            {VEINS.map((d, i) => {
              // Each vein waits its turn, so they creep rather than appear.
              const start = (i / VEINS.length) * 0.85;
              const reveal = Math.min(1, Math.max(0, (progress - start) / 0.15));
              return (
                <path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="hsl(var(--accent-2))"
                  strokeWidth={1.4 - i * 0.06}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - reveal}
                  opacity={0.35 + reveal * 0.65}
                />
              );
            })}
          </svg>

          <p className="absolute bottom-4 left-4 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
            {value === 0 ? "No infection" : `${value}% along a scale nobody wrote`}
          </p>
        </div>

        <div>
          <label htmlFor={sliderId} className="label">
            Drag, or use the arrow keys
          </label>

          <input
            id={sliderId}
            type="range"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            aria-valuetext={`${stage.person}: ${stage.status}`}
            className="mt-5 w-full cursor-pointer appearance-none bg-transparent
              [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-border-strong
              [&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px]
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-accent-c
              [&::-webkit-slider-thumb]:bg-background
              [&::-moz-range-thumb]:h-[15px] [&::-moz-range-thumb]:w-[15px] [&::-moz-range-thumb]:rounded-none
              [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-accent-c [&::-moz-range-thumb]:bg-background
              [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-border-strong"
          />

          {/* The people, pinned where we met them. */}
          <div className="relative mt-3 h-10">
            {flare.stages.map((pin) => (
              <button
                key={pin.person}
                type="button"
                onClick={() => setValue(pin.at)}
                style={{ left: `${pin.at}%` }}
                className="absolute -translate-x-1/2 whitespace-nowrap pt-2 font-mono text-[0.625rem] transition-colors first:translate-x-0 last:-translate-x-full"
                aria-label={`Jump to ${pin.person}`}
              >
                <span
                  className={
                    pin.person === stage.person
                      ? "text-accent-c"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {pin.person}
                </span>
              </button>
            ))}
          </div>

          <div className="slab mt-8 p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-lg text-foreground">{stage.person}</h4>
              <p className="font-mono text-xs uppercase tracking-widest text-accent-c">
                {stage.status}
              </p>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{stage.text}</p>
          </div>

          <p className="mt-6 border-l border-border-strong pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
            {flare.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlareProgression;
