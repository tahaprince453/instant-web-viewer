import { useEffect, useState } from "react";

/** Short branded intro: letters pop in, a bar fills, then the curtain lifts. */
export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("out"), reduce ? 100 : 1700);
    const t2 = setTimeout(() => setPhase("gone"), reduce ? 200 : 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div className={`preloader ${phase === "out" ? "preloader-out" : ""}`} aria-hidden>
      <div className="text-center">
        <div className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
          {"TAHA".split("").map((l, i) => (
            <span key={i} className="pre-letter text-gradient" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              {l}
            </span>
          ))}
          <span className="pre-letter text-primary" style={{ animationDelay: "0.6s" }}>.</span>
        </div>
        <p className="rise mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground" style={{ animationDelay: "0.7s" }}>
          AI Automation Specialist
        </p>
        <div className="mx-auto mt-6 h-[3px] w-48 overflow-hidden rounded-full bg-border">
          <div className="pre-bar h-full rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>
    </div>
  );
}
