import { motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import type { Film } from "@/data/mazeRunnerContent";

interface FilmSectionProps {
  film: Film;
  index: string;
  children?: React.ReactNode;
}

const FilmSection = ({ film, index, children }: FilmSectionProps) => {
  const reduced = useReducedMotion();

  return (
    <Section
      id={film.id}
      act={film.act}
      index={index}
      title={film.title}
      standfirst={film.logline}
    >
      <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
        {/* Production slate */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="slab slab-accent p-6">
            <p className="font-display text-4xl text-accent-c">{film.ordinal}</p>
            <p className="label mt-3">Released {film.year}</p>

            <dl className="mt-8 space-y-4">
              {film.crew.map((member) => (
                <div key={member.role}>
                  <dt className="label text-[0.5625rem]">{member.role}</dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">
                    {member.name}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {film.setting}
          </p>
        </aside>

        {/* Beats — an actual sequence, so it gets an actual sequence's treatment. */}
        <div>
          <ol className="border-l border-border">
            {film.beats.map((beat, i) => (
              <motion.li
                key={beat.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: reduced ? 0 : 0.55,
                  delay: reduced ? 0 : Math.min(i * 0.06, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span className="absolute -left-[3px] top-2 h-[5px] w-[5px] bg-accent-c" />
                <h3 className="text-base text-foreground">{beat.label}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {beat.text}
                </p>
              </motion.li>
            ))}
          </ol>

          <div className="slab mt-12 p-8">
            <p className="label">How it ends</p>
            <p className="mt-4 text-lg leading-relaxed text-foreground">
              {film.ending}
            </p>
          </div>

          {children}
        </div>
      </div>
    </Section>
  );
};

export default FilmSection;
