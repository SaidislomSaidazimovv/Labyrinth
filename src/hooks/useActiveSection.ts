import { useEffect, useState } from "react";

/**
 * Tracks which section owns the viewport.
 *
 * Deliberately an IntersectionObserver rather than a scroll handler: the old
 * implementation read offsetTop/offsetHeight for every section on every scroll
 * event, which forces a layout on each tick and was the page's main source of
 * jank.
 *
 * `rootMargin` biases the "active" band to the upper-middle of the viewport, so
 * a section lights up as its heading arrives rather than when its footer leaves.
 */
export function useActiveSection(ids: string[], fallback = ids[0]) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        if (visible.size === 0) return;

        // Ties go to document order, which is also narrative order.
        let best = "";
        let bestRatio = -1;
        for (const id of ids) {
          const ratio = visible.get(id);
          if (ratio !== undefined && ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** True once the reader has left the hero. Cheap: one observer, no scroll math. */
export function useScrolledPastHero(heroId = "hero") {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  return past;
}
