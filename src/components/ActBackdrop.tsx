import { motion, useReducedMotion } from "framer-motion";
import type { Act } from "@/data/mazeRunnerContent";
import { actTint } from "@/lib/sections";

/**
 * The page's ground colour. Sits behind everything and cross-fades as the
 * reader moves between acts — cement, then rust, then steel.
 *
 * Only background-color and opacity animate here, both compositor-cheap.
 */
const ActBackdrop = ({ act }: { act: Act }) => {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ backgroundColor: actTint[act] }}
        transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Light falls from above in the maze, always. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, hsl(var(--accent) / 0.07), transparent 60%)",
        }}
      />

      {/* Vignette. The corridors never quite reach the corners. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 40%, hsl(var(--background) / 0.85) 100%)",
        }}
      />

      {!reduced && <div className="dust absolute inset-0 opacity-[0.35]" />}
    </div>
  );
};

export default ActBackdrop;
