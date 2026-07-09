import { motion, useReducedMotion } from "framer-motion";
import { chronology } from "@/data/mazeRunnerContent";

/**
 * The prologue.
 *
 * Deliberately outside the numbered eight — the page numbers its sections the
 * way the Maze numbers its own, and this is what happened before there was a
 * maze to number. It gets no index and no nav entry; you arrive by scrolling,
 * which is the only way anyone in the Glade arrives anywhere.
 */
const PrologueTimeline = () => {
  const reduced = useReducedMotion();

  return (
    <section id="before" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="seam w-16 shrink-0" />
            <span className="label">Prologue</span>
          </div>

          <h2 className="mt-6 text-2xl text-foreground md:text-4xl">
            {chronology.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {chronology.standfirst}
          </p>
        </motion.header>

        {/* Each era carries its own act, so the timeline burns through the
            trilogy's palette on the way down: fire, then the department, then
            concrete, then steel. */}
        <ol className="border-l border-border">
          {chronology.eras.map((era, i) => (
            <motion.li
              key={era.title}
              data-act={era.act}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: reduced ? 0 : 0.55,
                delay: reduced ? 0 : Math.min(i * 0.05, 0.25),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pb-12 pl-8 last:pb-0 md:pl-12"
            >
              <span className="absolute -left-[4px] top-2 h-[7px] w-[7px] bg-accent-c" />

              <p className="label text-[0.5625rem]">{era.label}</p>
              <h3 className="mt-3 text-lg text-foreground md:text-xl">{era.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {era.text}
              </p>

              {era.note && (
                <p className="mt-4 max-w-2xl border-l border-border-strong pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
                  {era.note}
                </p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PrologueTimeline;
