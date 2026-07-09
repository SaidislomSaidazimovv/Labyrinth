import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import SubjectPortrait from "./SubjectPortrait";
import PhotoCredits from "./PhotoCredits";
import { characters, type Character } from "@/data/mazeRunnerContent";

const FACTIONS = ["All", "Glader", "WCKD", "Right Arm", "The Scorch", "The Last City"] as const;
type Filter = (typeof FACTIONS)[number];

const STATUS: Record<Character["status"], { label: string; className: string }> = {
  survives: { label: "Survives", className: "text-accent-c border-accent-c/40" },
  dies: { label: "Dies", className: "text-alert border-alert/40" },
  lost: { label: "Lost to the maze", className: "text-muted-foreground border-border-strong" },
};

/**
 * Designation. Only A1 and A2 are ever stated on screen, so the rest sit under
 * a bar rather than under a number somebody made up.
 */
const Designation = ({ code }: { code: string | null }) =>
  code ? (
    <span className="font-mono text-xs text-accent-c">SUBJECT {code}</span>
  ) : (
    <span className="inline-flex items-center" title="Designation never stated on screen">
      <span className="h-3 w-24 bg-foreground/80" aria-hidden />
      <span className="sr-only">Subject designation redacted</span>
    </span>
  );

const CharacterCard = ({ person, index }: { person: Character; index: number }) => {
  const reduced = useReducedMotion();
  const status = STATUS[person.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : Math.min(index * 0.03, 0.24),
      }}
      className="slab group flex flex-col transition-colors hover:border-border-strong"
    >
      <SubjectPortrait name={person.name} designation={person.designation} />

      <div className="flex flex-1 flex-col p-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg text-foreground">{person.name}</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{person.actor}</p>
          </div>
          <span
            className={`shrink-0 border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-widest ${status.className}`}
          >
            {status.label}
          </span>
        </header>

        <div className="mt-5">
          <Designation code={person.designation} />
        </div>

        <p className="label mt-6 text-[0.5625rem]">
          {person.faction} · {person.role}
        </p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {person.arc}
        </p>

        <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-foreground/80">
          {person.fate}
        </p>
      </div>
    </motion.article>
  );
};

const CharactersSection = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const shown = useMemo(
    () => (filter === "All" ? characters : characters.filter((c) => c.faction === filter)),
    [filter],
  );

  return (
    <Section
      id="characters"
      act="wckd"
      index="05"
      title="Subjects"
      standfirst="Twenty people, three trials, and an organisation that filed every one of them under a letter and a number."
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by faction">
        {FACTIONS.map((faction) => {
          const isActive = filter === faction;
          return (
            <button
              key={faction}
              type="button"
              onClick={() => setFilter(faction)}
              aria-pressed={isActive}
              className={`border px-4 py-2 font-mono text-xs transition-colors ${
                isActive
                  ? "border-accent-c bg-accent-c text-accent-ink"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
            >
              {faction}
            </button>
          );
        })}
      </div>

      <p className="label mt-6">
        {shown.length} {shown.length === 1 ? "record" : "records"}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((person, i) => (
          <CharacterCard key={person.name} person={person} index={i} />
        ))}
      </div>

      <PhotoCredits />
    </Section>
  );
};

export default CharactersSection;
