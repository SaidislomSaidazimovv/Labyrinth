import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { sections } from "@/lib/sections";

// Sized so the whole rail — label included — clears a 720px-tall viewport once
// it is vertically centred. The old geometry was 780px of SVG alone, which
// pushed the label off the top of the screen and clipped it.
const NODE_GAP = 58;
const TOP = 22;
const LEFT = 9;
const RIGHT = 31;

/**
 * The Runner's map.
 *
 * Every Runner charts a section a day and redraws the map by lamplight. This
 * rail does the same with the reader's progress: a corridor that turns a right
 * angle at each of the eight sections and draws itself as you descend.
 *
 * Decorative — the nav is the real navigation — so it is aria-hidden and absent
 * below xl.
 */
const MazeRail = ({ activeId }: { activeId: string }) => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const height = TOP * 2 + (sections.length - 1) * NODE_GAP;

  // A corridor: down, turn, down, turn back. One jog per section.
  const path = sections
    .map((_, i) => {
      const y = TOP + i * NODE_GAP;
      const x = i % 2 === 0 ? LEFT : RIGHT;
      return i === 0 ? `M${x},0 V${y}` : `H${x} V${y}`;
    })
    .join(" ")
    .concat(` V${height}`);

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center xl:flex"
    >
      <p className="label mb-5 h-[8.5rem] whitespace-nowrap text-[0.5625rem] [writing-mode:vertical-rl]">
        Sections 01—08
      </p>

      <svg width={40} height={height} viewBox={`0 0 40 ${height}`} fill="none">
        <path d={path} stroke="hsl(var(--border-strong))" strokeWidth={1} />

        <motion.path
          d={path}
          stroke="hsl(var(--accent))"
          strokeWidth={1.5}
          style={{ pathLength: reduced ? 1 : drawn }}
        />

        {sections.map((section, i) => {
          const y = TOP + i * NODE_GAP;
          const x = i % 2 === 0 ? LEFT : RIGHT;
          const isActive = i === activeIndex;
          const isPassed = i < activeIndex;

          return (
            <g key={section.id}>
              <rect
                x={x - 3}
                y={y - 3}
                width={6}
                height={6}
                fill={
                  isActive || isPassed ? "hsl(var(--accent))" : "hsl(var(--background))"
                }
                stroke={isActive ? "hsl(var(--accent))" : "hsl(var(--border-strong))"}
              />
              {isActive && (
                <rect
                  x={x - 7}
                  y={y - 7}
                  width={14}
                  height={14}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeOpacity={0.5}
                />
              )}
            </g>
          );
        })}
      </svg>
    </aside>
  );
};

export default MazeRail;
