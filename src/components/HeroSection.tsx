import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroLamps from "./HeroLamps";
import heroImage from "@/assets/hero-maze.jpg";

const EASE_GATE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * The doors open at dawn.
 *
 * Two concrete slabs cover the viewport on load and grind apart, which is the
 * only thing that happens to a Glader every morning for three years. Everything
 * behind them is already painted, so the reveal costs one transform per slab.
 */
const HeroSection = () => {
  const reduced = useReducedMotion();
  const gateDelay = reduced ? 0 : 0.35;
  const gateDuration = reduced ? 0 : 1.7;

  /** Content waits for the doors. */
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.9,
      delay: reduced ? 0 : gateDelay + gateDuration * 0.55 + delay,
      ease: EASE_OUT,
    },
  });

  return (
    <section
      id="hero"
      data-act="maze"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          // Held back only as far as the lamps need to still read as lamps.
          filter: "grayscale(0.35) contrast(1.08) brightness(0.5)",
        }}
        aria-hidden
      />

      <HeroLamps />

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.4) 45%, hsl(var(--background)) 100%)",
        }}
        aria-hidden
      />
      {!reduced && <div className="dust absolute inset-0 z-[2] opacity-50" aria-hidden />}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p {...enter(0)} className="label">
          Trial One · Subject A2
        </motion.p>

        <motion.h1
          {...enter(0.12)}
          className="mt-8 text-[clamp(2.25rem,8vw,5.5rem)] text-foreground"
        >
          The Maze
          <br />
          <span className="text-accent-c">Runner</span>
        </motion.h1>

        <motion.p
          {...enter(0.24)}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Three films, one wall, and an organisation that built the whole thing to
          watch what a frightened brain does under observation. This is a study of
          how it was made — and of the game it keeps almost being.
        </motion.p>

        <motion.div
          {...enter(0.36)}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground"
        >
          <span>2014 — 2018</span>
          <span className="hidden h-3 w-px bg-border-strong sm:block" />
          <span>Dir. Wes Ball</span>
          <span className="hidden h-3 w-px bg-border-strong sm:block" />
          <span className="text-accent-c">WICKED is good.</span>
        </motion.div>

        <motion.a
          {...enter(0.6)}
          href="#the-maze"
          className="group mt-20 inline-flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-accent-c"
        >
          <span className="label group-hover:text-accent-c">Enter</span>
          <ArrowDown
            className="h-4 w-4 motion-safe:animate-bounce"
            aria-hidden
          />
        </motion.a>
      </div>

      {/* The doors. Two slabs, a seam of daylight between them. */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            initial={{ x: 0 }}
            animate={{ x: "-101%" }}
            transition={{ duration: gateDuration, delay: gateDelay, ease: EASE_GATE }}
            className="concrete absolute inset-y-0 left-0 z-20 w-1/2 border-r border-foreground/10 bg-[#121514]"
          />
          <motion.div
            aria-hidden
            initial={{ x: 0 }}
            animate={{ x: "101%" }}
            transition={{ duration: gateDuration, delay: gateDelay, ease: EASE_GATE }}
            className="concrete absolute inset-y-0 right-0 z-20 w-1/2 border-l border-foreground/10 bg-[#121514]"
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0.9, scaleX: 1 }}
            animate={{ opacity: 0, scaleX: 8 }}
            transition={{ duration: gateDuration, delay: gateDelay, ease: EASE_GATE }}
            className="absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2 bg-accent-c"
          />
        </>
      )}
    </section>
  );
};

export default HeroSection;
