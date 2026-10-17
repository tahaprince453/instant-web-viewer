import { AnimatedText } from "./TextEffects";
import { Reveal, SectionHeading, useInView } from "./Reveal";

const steps = [
  { n: "01", title: "Strategize", text: "Analyse your operations and identify the repetitive processes with the greatest potential for automation." },
  { n: "02", title: "Design", text: "Define the agent's logic: the data it consumes, how it reasons and which decisions it is responsible for." },
  { n: "03", title: "Develop", text: "Integrate APIs, AI models, databases and messaging channels into a cohesive, production-ready workflow." },
  { n: "04", title: "Test", text: "Stress-test every path and edge case until the system behaves reliably." },
  { n: "05", title: "Launch", text: "Deploy, monitor and refine performance so the system stays dependable long after go-live." },
  { n: "06", title: "Scale", text: "Iterate, improve and expand the automation as your business grows." },
];

export function Process() {
  const { ref, inView } = useInView<HTMLDivElement>("-120px");

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Process" title="How I Deliver" />

        <div ref={ref} className="relative mt-16">
          <div className="hidden">
            <div
              className={`line-grow h-px w-full bg-[var(--gradient-line)] ${inView ? "line-grow-in" : ""}`}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="group relative h-full rounded-lg border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_70px_-45px_var(--glow)]">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full border border-border bg-secondary/60 transition-all duration-500 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground font-display text-sm font-bold text-primary shadow-[0_0_30px_-14px_var(--glow)]">
                      {s.n}
                    </span>
                  </div>
                  <AnimatedText as="h3" delay={0.12} stagger={0.045} className="text-lg font-semibold">{s.title}</AnimatedText>
                  <AnimatedText as="p" delay={0.22} stagger={0.018} className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </AnimatedText>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
