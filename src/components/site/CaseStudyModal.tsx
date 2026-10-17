import { X } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";
import { AnimatedText } from "./TextEffects";

const blocks = (p: Project) => [
  { label: "Problem", body: p.caseStudy.problem },
  { label: "Solution", body: p.caseStudy.solution },
];

export function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong modal-in relative my-auto w-full max-w-4xl rounded-4xl p-6 sm:p-10"
      >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-border bg-secondary/60 text-foreground transition-colors hover:border-primary/50"
            >
              <X className="size-4" />
            </button>

            <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Case Study {project.number}
            </p>
            <AnimatedText
              as="h3"
              delay={0.1}
              className="mt-3 block pr-12 text-2xl font-bold sm:text-4xl"
            >
              {project.title}
            </AnimatedText>
            <p className="rise mt-2 text-sm text-muted-foreground" style={{ animationDelay: "0.35s" }}>
              {project.tagline}
            </p>

            <div className="mt-7">
              <ProjectMedia
                media={project.media}
                placeholderLabel={`Add project ${project.number} image / video`}
              />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {blocks(project).map((b) => (
                <section key={b.label} className="rounded-3xl border border-border bg-card/40 p-5">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-soft">
                    {b.label}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </section>
              ))}
            </div>

            <section className="mt-5 rounded-3xl border border-border bg-card/40 p-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-soft">
                Automation Workflow
              </h4>
              <ol className="mt-4 space-y-3">
                {project.caseStudy.workflow.map((step, i) => (
                  <li
                    key={step}
                    className="rise flex gap-3 text-sm text-muted-foreground"
                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                  >
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/15 text-[0.65rem] font-semibold text-primary">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <section className="rounded-3xl border border-border bg-card/40 p-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-soft">
                  AI Components
                </h4>
                <ul className="mt-4 space-y-2">
                  {project.caseStudy.aiComponents.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-3xl border border-border bg-card/40 p-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-soft">
                  Tools Used
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.caseStudy.tools.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[0.7rem] text-foreground/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-5 rounded-3xl border border-primary/25 bg-primary/[0.06] p-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Result</h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                {project.caseStudy.result}
              </p>
            </section>

            <section className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-soft">
                Workflow Screenshots & Diagrams
              </h4>
              <div
                className={`mt-4 grid gap-4 ${
                  project.caseStudy.gallery.length === 1 ? "" : "sm:grid-cols-2"
                }`}
              >
                {(project.caseStudy.gallery.length
                  ? project.caseStudy.gallery
                  : [undefined, undefined]
                ).map((m, i) => (
                  <ProjectMedia
                    key={i}
                    media={m}
                    placeholderLabel={`Add ${project.number} screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </section>
      </div>
    </div>
  );
}
