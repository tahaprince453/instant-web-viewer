import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";
import { projects, type Media, type Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";
import { Reveal, SectionHeading } from "./Reveal";
import { AnimatedText } from "./TextEffects";
import { CaseStudyModal } from "./CaseStudyModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** One soft accent hue per project (cyan, blue, amber, pink, teal, coral) so cards feel distinct but cohesive. */
const hues = [165, 245, 75, 335, 205, 25];
const pad = (n: number) => String(n).padStart(2, "0");
const slidesOf = (p: Project): Media[] => [...(p.media ? [p.media] : []), ...p.caseStudy.gallery];

/** Image / video slider inside one project card (arrows, dots, counter, autoplay, click to zoom). */
function MediaSlider({
  project,
  active,
  onOpen,
}: {
  project: Project;
  active: boolean;
  onOpen: (m: Media) => void;
}) {
  const items = slidesOf(project);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!active || paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [active, paused, items.length]);

  const go = (n: number) => setI((n + items.length) % items.length);
  const arrow =
    "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground opacity-0 backdrop-blur transition-all duration-300 hover:border-primary/60 hover:text-primary group-hover/slider:opacity-100 focus-visible:opacity-100 max-sm:opacity-100";

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="group/slider relative">
        <div className="overflow-hidden rounded-2xl border border-border">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {items.map((m, k) => (
              <div key={m.src} className="w-full shrink-0" aria-hidden={k !== i}>
                {m.type === "image" ? (
                  <button
                    type="button"
                    onClick={() => onOpen(m)}
                    className="group/zoom relative block w-full cursor-zoom-in"
                    aria-label={`Open ${project.title} image ${k + 1} full size`}
                  >
                    <ProjectMedia media={m} placeholderLabel={project.title} />
                    <span className="pointer-events-none absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity group-hover/zoom:opacity-100">
                      <ZoomIn className="size-4" />
                    </span>
                  </button>
                ) : (
                  <ProjectMedia media={m} placeholderLabel={project.title} />
                )}
              </div>
            ))}
          </div>
        </div>

        <span className="absolute left-3 top-3 z-10 rounded-full border border-border bg-background/85 px-3 py-1 text-[0.68rem] font-bold tracking-widest text-foreground backdrop-blur">
          {pad(i + 1)} / {pad(items.length)}
        </span>

        {items.length > 1 ? (
          <>
            <button type="button" aria-label="Previous image" onClick={() => go(i - 1)} className={cn(arrow, "left-3")}>
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(i + 1)} className={cn(arrow, "right-3")}>
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="mt-4 flex justify-center gap-3">
          {items.map((m, k) => (
            <button
              key={m.src}
              type="button"
              aria-label={`Show image ${k + 1}`}
              aria-current={k === i}
              onClick={() => go(k)}
              className={cn(
                "relative grid h-11 w-[3.75rem] place-items-center overflow-hidden rounded-lg border bg-secondary transition-all duration-300",
                k === i
                  ? "border-primary shadow-[0_0_0_2px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
                  : "border-border opacity-60 hover:-translate-y-0.5 hover:opacity-100",
              )}
            >
              {m.type === "image" ? (
                <img src={m.src} alt="" className="size-full object-cover" loading="lazy" />
              ) : (
                <Play className="size-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Projects() {
  const [idx, setIdx] = useState(0);
  const [study, setStudy] = useState<Project | null>(null);
  const [zoom, setZoom] = useState<Media | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const total = projects.length;

  const go = useCallback((n: number) => setIdx(((n % total) + total) % total), [total]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--gradient-line)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Work"
          title={
            <>
              Featured <span className="text-gradient">Projects</span>
            </>
          }
          subtitle="Explore the workflows behind the results. Use the arrows, choose a project, or swipe on mobile."
        />

        <Reveal delay={0.1}>
          {/* Carousel */}
          <div
            className="relative mt-12 touch-pan-y outline-none"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(idx - 1);
              if (e.key === "ArrowRight") go(idx + 1);
            }}
            onPointerDown={(e) => (drag.current = { x: e.clientX, y: e.clientY })}
            onPointerUp={(e) => {
              const d = drag.current;
              drag.current = null;
              if (!d) return;
              const dx = e.clientX - d.x;
              if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - d.y) * 1.5) go(idx + (dx < 0 ? 1 : -1));
            }}
          >
            <div className="overflow-hidden">
              <div
                className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {projects.map((p, k) => (
                  <div
                    key={p.id}
                    className={cn(
                      "w-full shrink-0 px-1 py-2 transition-all duration-700",
                      k === idx ? "scale-100 opacity-100" : "scale-[0.94] opacity-30",
                    )}
                    aria-hidden={k !== idx}
                  >
                    <article
                      className="proj-card grid h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_90px_-60px_var(--glow)] lg:grid-cols-[1.35fr_1fr]"
                      style={{ "--h": hues[k % hues.length] } as CSSProperties}
                    >
                      <div className="p-4 sm:p-5">
                        <MediaSlider project={p} active={k === idx} onOpen={setZoom} />
                      </div>

                      <div className="flex min-w-0 flex-col justify-center border-t border-border p-6 sm:p-8 lg:border-l lg:border-t-0">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-soft">
                            {p.category}
                          </span>
                          <span className="text-sm font-bold tracking-widest">
                            {p.number} / {pad(total)}
                          </span>
                        </div>

                        {k === idx ? (
                          <AnimatedText as="h3" stagger={0.045} className="mt-5 block text-2xl font-bold leading-tight sm:text-3xl">
                            {p.title}
                          </AnimatedText>
                        ) : (
                          <h3 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">{p.title}</h3>
                        )}
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {p.description}
                        </p>

                        <div className="mt-6 border-t border-border pt-5">
                          <ul className="flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                              <li
                                key={t}
                                className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() => setStudy(p)}
                          className="group/btn mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/15 hover:shadow-[0_14px_40px_-20px_var(--glow)]"
                        >
                          View Case Study
                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => go(idx - 1)}
                className="grid size-10 place-items-center rounded-full border border-border bg-card transition-all duration-300 hover:-translate-x-0.5 hover:border-primary/60 hover:text-primary"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex items-center gap-2">
                {projects.map((p, k) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Go to project ${k + 1}: ${p.title}`}
                    aria-current={k === idx}
                    onClick={() => go(k)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      k === idx ? "w-9 bg-gradient-to-r from-primary to-accent" : "w-2 bg-foreground/25 hover:bg-foreground/50",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => go(idx + 1)}
                className="grid size-10 place-items-center rounded-full border border-border bg-card transition-all duration-300 hover:translate-x-0.5 hover:border-primary/60 hover:text-primary"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <CaseStudyModal project={study} onClose={() => setStudy(null)} />

      {zoom ? (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
          onClick={() => setZoom(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setZoom(null)}
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-border bg-secondary/70 hover:border-primary/60"
          >
            <X className="size-4" />
          </button>
          <img
            src={zoom.src}
            alt={zoom.alt ?? "Project preview"}
            className="modal-in max-h-[90vh] max-w-full rounded-lg border border-border object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
