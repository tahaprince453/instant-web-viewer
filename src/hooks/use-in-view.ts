import { useEffect, useRef, useState } from "react";

/** Returns true once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(rootMargin = "-10px", replay = false) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setInView(true);
          else if (replay) setInView(false);
          if (e.isIntersecting && !replay) io.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, replay]);

  return { ref, inView };
}
