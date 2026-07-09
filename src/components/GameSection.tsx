import Section from "./Section";
import { gameDesign } from "@/data/mazeRunnerContent";

/**
 * The films are chases. This is the argument for what they'd be if you had to
 * play them — and enough Unity to show the argument is serious.
 */
const GameSection = () => (
  <Section
    id="the-game"
    act="city"
    index="08"
    title="If It Were a Game"
    standfirst={gameDesign.premise}
  >
    {/* Pillars */}
    <div className="grid gap-px bg-border md:grid-cols-2">
      {gameDesign.pillars.map((pillar) => (
        <article key={pillar.title} className="bg-surface p-8">
          <h3 className="text-lg text-accent-c">{pillar.title}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{pillar.text}</p>
        </article>
      ))}
    </div>

    {/* Systems */}
    <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-20">
      <div>
        <p className="label">Systems</p>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {gameDesign.mechanics.map((mechanic) => (
            <div key={mechanic.name} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <dt className="font-mono text-sm text-foreground">{mechanic.name}</dt>
              <dd className="leading-relaxed text-muted-foreground">{mechanic.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* A real progression — the Glade's actual hierarchy. */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="label">Rank</p>
        <ol className="mt-6 border-l border-border">
          {gameDesign.progression.map((step) => (
            <li key={step.rank} className="relative pb-8 pl-6 last:pb-0">
              <span className="absolute -left-[3px] top-2 h-[5px] w-[5px] bg-accent-c" />
              <p className="font-mono text-sm text-foreground">{step.rank}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  </Section>
);

export default GameSection;
