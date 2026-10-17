import { useCallback, useEffect, useState } from "react";

export type Theme = "day" | "night";

const STORAGE_KEY = "ta-theme";

/** Site-wide color scheme. The initial value comes from the inline head script. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "night" || applied === "day") setTheme(applied);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "day" ? "night" : "day";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
