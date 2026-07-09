import { useEffect, useRef, useState } from "react";

/**
 * Latches true the first time the element comes near the viewport, then stops
 * observing. Used to defer mounting a WebGL context until it can actually be
 * seen — a canvas rendering off-screen costs exactly what one on-screen does.
 */
export function useInViewOnce<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, seen]);

  return [ref, seen] as const;
}

/**
 * Tracks visibility continuously. An always-animating scene should stop
 * animating when it scrolls away; this is what gates its frameloop.
 */
export function useIsVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.01,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}
