import { Briefcase } from "lucide-react";
import { AnimatedText } from "./TextEffects";
import { Reveal, SectionHeading } from "./Reveal";
import { coreSkills, tools } from "@/data/profile";

const roles = [
  {
    title: "AI Automation Specialist & Agent Developer",
    org: "Independent",
    meta: "Present · Remote",
    points: [
      "Designed and deployed 10+ end-to-end AI automation systems with n8n, Google Gemini and Groq",
      "Built WhatsApp and Telegram AI agents for 24/7 customer support and lead qualification",
      "Automated document intelligence: invoices extracted, validated and logged to Google Sheets",
      "Connected Gmail, Google Sheets, CRMs and social media APIs into hands-free pipelines",
    ],
  },
];

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--gradient-line)]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Career" title="Where I've Worked" />

        <div className="mt-12 space-y-6">
          {roles.map((r, i) => (
            <Reveal key={r.title} from="scale" delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_30px_70px_-45px_var(--glow)] sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary shadow-[0_0_24px_-6px_var(--glow)]">
                    <Briefcase className="size-5" />
                  </span>
                  <div>
                    <AnimatedText as="h3" stagger={0.03} className="block text-xl font-bold sm:text-2xl">
                      {r.title}
                    </AnimatedText>
                    <p className="mt-1.5 text-sm font-semibold text-primary-soft">
                      {r.org} <span className="text-muted-foreground">· {r.meta}</span>
                    </p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {r.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 rounded-xl border border-border bg-secondary/30 p-4 text-sm leading-relaxed text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <div className="grid items-stretch gap-6 md:grid-cols-[1fr_1.5fr]">
            <Reveal from="left" delay={0.05}>
              <div className="h-full rounded-lg border border-border bg-card p-6 sm:p-8">
                <h3 className="text-lg font-bold">Core Skills</h3>
                <Chips items={coreSkills} />
              </div>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <div className="h-full rounded-lg border border-border bg-card p-6 sm:p-8">
                <h3 className="text-lg font-bold">Tools &amp; Technologies</h3>
                <Chips items={tools} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
