import type { CSSProperties } from "react";

/**
 * The strip lights buried in the hero photograph.
 *
 * Positions are pinned to features in the image, so they shift at the
 * breakpoints where the photo's crop does. That used to be a resize listener
 * setting two booleans; it is now four Tailwind steps and no JavaScript.
 *
 * Rhythm, duration and phase are all different per lamp. Nothing here is
 * random at runtime — it just never repeats often enough to look scheduled.
 */
interface Lamp {
  position: string;
  size: string;
  shape: "circle" | "strip";
  intensity: number;
  rhythm: "a" | "b" | "c" | "d" | "e";
  /** Odd, mutually prime-ish seconds so the lamps never re-sync. */
  duration: number;
  /** Negative, so every lamp starts mid-cycle. */
  phase: number;
  rotate?: number;
}

const LAMPS: Lamp[] = [
  {
    // Ceiling lamp, front centre.
    position: "top-[6%] sm:top-[13%] lg:top-[12%] xl:top-[6%] left-1/2 -translate-x-1/2",
    size: "w-[clamp(50px,8vw,120px)] h-[clamp(50px,8vw,120px)]",
    shape: "circle",
    intensity: 0.4,
    rhythm: "a",
    duration: 5.3,
    phase: -0.4,
  },
  {
    // Ceiling lamp, deeper in the corridor.
    position: "top-[28%] sm:top-[32%] lg:top-[30%] xl:top-[28%] left-1/2 -translate-x-1/2 translate-y-[40%]",
    size: "w-[clamp(30px,4vw,60px)] h-[clamp(30px,4vw,60px)]",
    shape: "circle",
    intensity: 0.26,
    rhythm: "d",
    duration: 7.1,
    phase: -2.6,
  },
  {
    // Floor strip, near left.
    position: "bottom-[8%] sm:bottom-[13%] lg:bottom-[12%] xl:bottom-[8%] left-[13%] sm:left-[-4%] lg:left-[6%] xl:left-[13%]",
    size: "w-[clamp(60px,10vw,150px)] h-[clamp(12px,2vw,30px)]",
    shape: "strip",
    intensity: 0.4,
    rhythm: "c",
    duration: 4.7,
    phase: -1.1,
    rotate: -30,
  },
  {
    // Floor strip, near right.
    position: "bottom-[8%] sm:bottom-[13%] lg:bottom-[12%] xl:bottom-[8%] right-[12%] sm:right-[-4%] lg:right-[5%] xl:right-[12%]",
    size: "w-[clamp(60px,10vw,150px)] h-[clamp(12px,2vw,30px)]",
    shape: "strip",
    intensity: 0.4,
    rhythm: "e",
    duration: 6.1,
    phase: -3.4,
    rotate: 30,
  },
  {
    // Floor strip, mid left.
    position: "bottom-[27%] sm:bottom-[29%] lg:bottom-[29%] xl:bottom-[27%] left-[31%] sm:left-[21%] lg:left-[27%] xl:left-[31%]",
    size: "w-[clamp(35px,6vw,80px)] h-[clamp(12px,2vw,30px)]",
    shape: "strip",
    intensity: 0.36,
    rhythm: "b",
    duration: 8.3,
    phase: -0.9,
    rotate: -30,
  },
  {
    // Floor strip, mid right.
    position: "bottom-[27%] sm:bottom-[29%] lg:bottom-[29%] xl:bottom-[27%] right-[31%] sm:right-[20%] lg:right-[27%] xl:right-[31%]",
    size: "w-[clamp(35px,6vw,80px)] h-[clamp(12px,2vw,30px)]",
    shape: "strip",
    intensity: 0.36,
    rhythm: "a",
    duration: 9.7,
    phase: -5.2,
    rotate: 30,
  },
  {
    // Far strip, right of the vanishing point.
    position: "bottom-[38%] sm:bottom-[40%] lg:bottom-[40%] xl:bottom-[38%] right-[40.5%] sm:right-[35%] lg:right-[39%] xl:right-[40.5%]",
    size: "w-[clamp(20px,3vw,40px)] h-[clamp(15px,2vw,30px)]",
    shape: "strip",
    intensity: 0.32,
    rhythm: "e",
    duration: 3.7,
    phase: -1.8,
    rotate: 30,
  },
  {
    // Far strip, left of the vanishing point.
    position: "bottom-[36%] sm:bottom-[38%] lg:bottom-[39%] xl:bottom-[36%] left-[39.5%] sm:left-[35%] lg:left-[38%] xl:left-[39.5%]",
    size: "w-[clamp(20px,3vw,40px)] h-[clamp(15px,2vw,30px)]",
    shape: "strip",
    intensity: 0.32,
    rhythm: "c",
    duration: 11.3,
    phase: -7.5,
    rotate: 30,
  },
];

const glow = (lamp: Lamp) =>
  lamp.shape === "circle"
    ? `radial-gradient(circle, rgba(200,230,255,${lamp.intensity}) 0%, transparent 70%)`
    : `radial-gradient(ellipse, rgba(200,230,255,${lamp.intensity}) 0%, transparent 100%)`;

const HeroLamps = () => (
  <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
    {LAMPS.map((lamp, i) => {
      const style: CSSProperties = {
        background: glow(lamp),
        filter: "blur(18px)",
        animationName: `lamp-${lamp.rhythm}`,
        animationDuration: `${lamp.duration}s`,
        animationDelay: `${lamp.phase}s`,
      };

      // The ceiling lamps centre themselves with a Tailwind translate, so the
      // transform slot is spoken for. Only the strips — which position off an
      // edge — are free to take a rotation here.
      if (lamp.rotate) style.transform = `rotate(${lamp.rotate}deg)`;

      return (
        <div
          key={i}
          className={`lamp absolute ${lamp.shape === "circle" ? "rounded-full" : "rounded-md"} ${lamp.position} ${lamp.size}`}
          style={style}
        />
      );
    })}
  </div>
);

export default HeroLamps;
