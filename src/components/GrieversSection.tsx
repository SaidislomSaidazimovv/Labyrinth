import Section from "./Section";
import GrieverModel from "./GrieverModel";
import { grievers } from "@/data/mazeRunnerContent";

const GrieversSection = () => (
  <Section
    id="grievers"
    act="maze"
    index="04"
    title="Grievers"
    standfirst={grievers.summary}
  >
    <GrieverModel />

    <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_20rem] lg:gap-20">
      <div>
        <div className="slab p-8">
          <p className="label">Design</p>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {grievers.origin}
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            Creature design — {grievers.designer}
          </p>
        </div>

        {/* Anatomy, part by part. Organic body, machine limbs. */}
        <dl className="mt-12 divide-y divide-border border-y border-border">
          {grievers.anatomy.map((part) => (
            <div key={part.part} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
              <dt className="font-mono text-sm text-accent-c">{part.part}</dt>
              <dd className="leading-relaxed text-muted-foreground">{part.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 border-l-2 border-alert bg-surface p-8">
          <h3 className="text-base text-foreground">{grievers.sting.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {grievers.sting.text}
          </p>
          <p className="mt-4 border-l border-border-strong pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
            {grievers.sting.note}
          </p>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="label">Behaviour</p>
        <ul className="mt-6 space-y-5">
          {grievers.behavior.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-px w-4 shrink-0 bg-accent-c" aria-hidden />
              {line}
            </li>
          ))}
        </ul>

        <p className="label mt-12">On screen</p>
        <ul className="mt-6 space-y-5">
          {grievers.vfx.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-px w-4 shrink-0 bg-border-strong" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  </Section>
);

export default GrieversSection;
