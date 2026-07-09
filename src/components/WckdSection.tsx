import { useState } from "react";
import Section from "./Section";
import Redacted from "./Redacted";
import { wckd, lore, type LoreTerm } from "@/data/mazeRunnerContent";

const TAGS: { id: LoreTerm["tag"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "world", label: "The world" },
  { id: "maze", label: "The maze" },
  { id: "slang", label: "Glader slang" },
];

const WckdSection = () => {
  const [tag, setTag] = useState<LoreTerm["tag"] | "all">("all");
  const terms = tag === "all" ? lore : lore.filter((t) => t.tag === tag);

  return (
    <Section
      id="wckd"
      act="wckd"
      index="06"
      title="WCKD Files"
      standfirst={wckd.mission}
    >
      {/* The wordmark, unpacked. */}
      <div className="slab p-8 md:p-12">
        <p className="font-display text-4xl text-foreground md:text-6xl">
          W<span className="text-alert">C</span>KD
        </p>
        <p className="label mt-6">{wckd.expansion}</p>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
          {wckd.killzone}
        </p>
        <p className="mt-8 font-mono text-sm text-alert">{wckd.motto}</p>
      </div>

      {/* Trials */}
      <div className="mt-16">
        <p className="label">Programme</p>
        <ol className="mt-6 grid gap-px bg-border md:grid-cols-3">
          {wckd.trials.map((trial) => (
            <li key={trial.code} className="bg-surface p-8">
              <p className="font-mono text-xs text-alert">{trial.code}</p>
              <h3 className="mt-3 text-lg text-foreground">{trial.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {trial.purpose}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* The files themselves. Everything worth reading is under a bar. */}
      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="label">Recovered documents</p>
          <p className="font-mono text-xs text-muted-foreground">
            Hover or select to declassify
          </p>
        </div>

        <ul className="mt-6 divide-y divide-border border-y border-border">
          {wckd.files.map((file) => (
            <li key={file.code} className="grid gap-4 py-6 lg:grid-cols-[14rem_1fr] lg:gap-10">
              <div>
                <p className="font-mono text-sm text-foreground">{file.code}</p>
                <p className="label mt-1 text-[0.5625rem]">{file.label}</p>
                <p className="mt-3 inline-block border border-alert/40 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-alert">
                  {file.classification}
                </p>
              </div>
              <Redacted>{file.redacted}</Redacted>
            </li>
          ))}
        </ul>
      </div>

      {/* Vocabulary */}
      <div className="mt-20">
        <div className="seam mb-12" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl text-foreground">The vocabulary</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter vocabulary">
            {TAGS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setTag(option.id)}
                aria-pressed={tag === option.id}
                className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                  tag === option.id
                    ? "border-accent-c bg-accent-c text-accent-ink"
                    : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <dl className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {terms.map((term) => (
            <div key={term.term}>
              <dt className="font-mono text-sm text-accent-c">{term.term}</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">
                {term.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-16 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        {wckd.aesthetic.map((line) => (
          <li key={line} className="text-sm leading-relaxed text-muted-foreground">
            {line}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default WckdSection;
