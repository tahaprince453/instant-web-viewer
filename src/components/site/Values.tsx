import { AnimatedText } from "./TextEffects";
import { Reveal, SectionHeading } from "./Reveal";

const values = [
  {
    title: "Reclaimed Team Time",
    text: "Repetitive data entry, follow-ups and routine communication are automated, allowing your team to concentrate on high-value work.",
  },
  {
    title: "Faster Response Times",
    text: "Customers, leads and inquiries receive immediate, accurate responses at any hour, every day of the week.",
  },
  {
    title: "Scale Without Added Headcount",
    text: "Systems that manage ten conversations today can handle thousands tomorrow, supporting growth without a proportional increase in cost.",
  },
];

export function Values() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--gradient-line)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Business Impact" title="Measurable Efficiency. Scalable Growth." />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-4xl border border-border bg-card/35 p-8 transition-all duration-500 hover:border-primary/40 hover:bg-card/55">
                <span className="font-display text-sm font-bold text-primary-soft">
                  0{i + 1}
                </span>
                <AnimatedText as="h3" delay={0.12} stagger={0.045} className="mt-6 text-2xl font-bold leading-tight sm:text-3xl">{v.title}</AnimatedText>
                <AnimatedText as="p" delay={0.22} stagger={0.018} className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {v.text}
                </AnimatedText>
                <div className="mt-8 h-px w-full bg-border">
                  <div className="h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
