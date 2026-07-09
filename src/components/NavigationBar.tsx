import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { sections } from "@/lib/sections";
import { useScrolledPastHero } from "@/hooks/useActiveSection";

const NavigationBar = ({ activeId }: { activeId: string }) => {
  const [open, setOpen] = useState(false);
  const solid = useScrolledPastHero();
  const reduced = useReducedMotion();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {/* Visible only once tabbed to. The first thing a keyboard reaches. */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:border focus:border-accent-c focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-c"
      >
        Skip to content
      </a>

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#hero"
          className="font-display text-xs tracking-tight text-foreground transition-colors hover:text-accent-c"
        >
          W<span className="text-accent-c">C</span>KD
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((section, i) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative flex items-baseline gap-2 px-3 py-2 font-mono text-xs transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-[0.625rem] tabular-nums opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.label}

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-px bg-accent-c"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <ul className="px-6 py-4">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={section.id === activeId ? "location" : undefined}
                    className={`flex items-baseline gap-3 border-b border-border/50 py-3 font-mono text-sm transition-colors ${
                      section.id === activeId
                        ? "text-accent-c"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="text-[0.625rem] tabular-nums opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationBar;
