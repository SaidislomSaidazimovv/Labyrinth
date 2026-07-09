import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Act } from "@/data/mazeRunnerContent";

interface SectionProps {
  id: string;
  act: Act;
  /** Two digits. The maze has eight numbered sections; so does this page. */
  index: string;
  title: string;
  standfirst?: string;
  children: ReactNode;
}

/**
 * Every section sets its own act, which re-scopes --accent for everything
 * inside it. The heading treatment is the only place Michroma appears at size.
 */
const Section = ({ id, act, index, title, standfirst, children }: SectionProps) => (
  <section id={id} data-act={act} className="relative scroll-mt-24 py-24 md:py-36">
    <div className="mx-auto w-full max-w-6xl px-6">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 md:mb-20"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tabular-nums text-accent-c">{index}</span>
          <span className="seam w-16 shrink-0" />
          <span className="label">Section</span>
        </div>

        <h2 className="mt-6 text-3xl md:text-5xl text-foreground">{title}</h2>

        {standfirst && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {standfirst}
          </p>
        )}
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

export default Section;
