import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A WCKD redaction bar. Hover, click, or focus and it wipes away.
 *
 * A real button rather than a hover-only div: this is the only route to the
 * text underneath, so it has to work for a keyboard and a screen reader too.
 */
const Redacted = ({ children }: { children: string }) => {
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() => setRevealed((v) => !v)}
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      aria-expanded={revealed}
      className="group relative block w-full cursor-pointer text-left"
    >
      <span
        className={`block font-mono text-sm leading-relaxed transition-colors duration-300 ${
          revealed ? "text-foreground" : "text-transparent"
        }`}
      >
        {children}
      </span>

      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: revealed ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "right" }}
        className="absolute inset-0 bg-foreground/85"
      />

      <span className="sr-only">
        {revealed ? "Hide redacted text" : "Reveal redacted text"}
      </span>
    </button>
  );
};

export default Redacted;
