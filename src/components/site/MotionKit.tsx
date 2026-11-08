import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const railSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "demos", label: "Live Demo" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = root.scrollHeight - root.clientHeight;
      root.style.setProperty("--sy", String(Math.round(window.scrollY)));
      root.style.setProperty("--sp", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
      if (reduceMotion) return;

      for (const element of document.querySelectorAll<HTMLElement>("[data-speed]")) {
        const bounds = element.parentElement?.getBoundingClientRect();
        if (!bounds || bounds.bottom < -300 || bounds.top > window.innerHeight + 300) continue;
        const speed = Number.parseFloat(element.getAttribute("data-speed") ?? "0");
        element.style.setProperty(
          "--py",
          `${((bounds.top + bounds.height / 2 - window.innerHeight / 2) * speed).toFixed(1)}px`,
        );
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

export function ScrollRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState("home");
  const [dots, setDots] = useState<number[]>(() => railSections.map((_, index) => index / (railSections.length - 1)));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = root.scrollHeight - root.clientHeight;
      const nextProgress = maxScroll > 0 ? Math.min(1, Math.max(0, root.scrollTop / maxScroll)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${nextProgress})`;
      if (markerRef.current) markerRef.current.style.top = `${nextProgress * 100}%`;
      if (percentRef.current) percentRef.current.textContent = `${Math.round(nextProgress * 100)}%`;
      setProgress((previous) => (Math.abs(previous - nextProgress) > 0.01 ? nextProgress : previous));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const maxScroll = root.scrollHeight - root.clientHeight;
      if (maxScroll <= 0) return;
      setDots(
        railSections.map(({ id }) => {
          const section = document.getElementById(id);
          return section ? Math.min(1, Math.max(0, (section.getBoundingClientRect().top + window.scrollY) / maxScroll)) : 0;
        }),
      );
    };

    update();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    resizeObserver?.observe(document.body);
    const intersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    railSections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) intersectionObserver.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
      intersectionObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside aria-label="Page progress" className="scroll-rail">
      <div className="rail-track">
        <div ref={fillRef} className="rail-fill" />
        {railSections.map(({ id, label }, index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className={cn("rail-dot", progress >= (dots[index] ?? 0) - 0.002 && "rail-dot-done", active === id && "rail-dot-active")}
            style={{ top: `${(dots[index] ?? 0) * 100}%` }}
          >
            <span className="rail-label">{label}</span>
          </a>
        ))}
        <div ref={markerRef} className="rail-marker" aria-hidden="true">
          <span ref={percentRef} className="rail-percent">0%</span>
        </div>
      </div>
    </aside>
  );
}

type ShapeKind = "ring" | "plus" | "dot" | "triangle" | "square";
type Shape = { kind: ShapeKind; x: string; y: string; size: number; speed: number; duration: number; accent?: boolean };

const shapePresets: Shape[][] = [
  [
    { kind: "ring", x: "4%", y: "16%", size: 70, speed: -0.1, duration: 11 },
    { kind: "plus", x: "46%", y: "7%", size: 26, speed: 0.12, duration: 9, accent: true },
    { kind: "triangle", x: "93%", y: "58%", size: 44, speed: -0.14, duration: 13, accent: true },
    { kind: "dot", x: "8%", y: "82%", size: 16, speed: 0.16, duration: 8 },
    { kind: "square", x: "88%", y: "10%", size: 38, speed: 0.08, duration: 12 },
  ],
  [
    { kind: "square", x: "3%", y: "10%", size: 40, speed: 0.1, duration: 12, accent: true },
    { kind: "ring", x: "92%", y: "20%", size: 84, speed: -0.12, duration: 14 },
    { kind: "dot", x: "50%", y: "92%", size: 14, speed: -0.14, duration: 8, accent: true },
    { kind: "plus", x: "94%", y: "84%", size: 28, speed: 0.12, duration: 10 },
    { kind: "triangle", x: "6%", y: "70%", size: 36, speed: -0.08, duration: 11 },
  ],
];

function ShapeSvg({ kind }: { kind: ShapeKind }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {kind === "ring" && <circle cx="24" cy="24" r="20" {...stroke} strokeDasharray="4 6" />}
      {kind === "plus" && <path d="M24 6v36M6 24h36" {...stroke} />}
      {kind === "dot" && <circle cx="24" cy="24" r="10" fill="currentColor" />}
      {kind === "triangle" && <path d="M24 6 42 40H6Z" {...stroke} />}
      {kind === "square" && <rect x="8" y="8" width="32" height="32" rx="6" {...stroke} />}
    </svg>
  );
}

export function ShapeField({ variant = 0 }: { variant?: 0 | 1 }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {shapePresets[variant].map((shape, index) => (
        <span
          key={`${variant}-${index}`}
          className={cn("shape", shape.accent ? "text-accent" : "text-primary", index > 2 && "hidden sm:block")}
          data-speed={shape.speed}
          style={{ left: shape.x, top: shape.y, width: shape.size, height: shape.size, "--dur": `${shape.duration}s` } as CSSProperties}
        >
          <ShapeSvg kind={shape.kind} />
        </span>
      ))}
    </div>
  );
}