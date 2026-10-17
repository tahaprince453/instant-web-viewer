import { Cpu, Bot, Mic, MessageCircle, PlaySquare, Filter, BookOpen } from "lucide-react";
import { AnimatedText } from "./TextEffects";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

const services = [
  {
    Icon: Cpu,
    title: "Agentic AI Systems",
    text: "Smart decision-making, not just rule-following.",
  },
  {
    Icon: Bot,
    title: "AI Agents",
    text: "Lead qualification, customer support & task handling.",
  },
  {
    Icon: Mic,
    title: "Voice AI Agents",
    text: "Inbound calling bots built with Vapi AI / Retell AI.",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp AI Agents",
    text: "24/7 lead qualification directly on WhatsApp.",
  },
  {
    Icon: PlaySquare,
    title: "Content & YouTube Automation",
    text: "Idea to published, fully hands-free.",
  },
  {
    Icon: Filter,
    title: "CRM & Lead Workflows",
    text: "Capture, qualify, route, and follow up automatically.",
  },
  {
    Icon: BookOpen,
    title: "RAG Workflows",
    text: "AI that reads and answers from your business knowledge base.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-secondary/45 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What I{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Build
              </span>
            </>
          }
          subtitle="From the first customer conversation to the final follow-up: practical AI systems for the work your team repeats every day."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const wide = i === services.length - 1;
            return (
              <Reveal
                key={s.title}
                delay={i * 0.07}
                from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
                className={cn(wide && "sm:col-span-2 lg:col-span-3")}
              >
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_30px_70px_-40px_var(--glow)]",
                    wide && "flex items-center gap-5",
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute right-6 top-5 text-xs font-semibold tracking-widest text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={cn(
                      "relative grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-secondary/60 text-primary transition-all duration-500",
                      "group-hover:scale-110 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground group-hover:shadow-[0_10px_30px_-8px_var(--glow)]",
                      !wide && "mb-6",
                    )}
                  >
                    <s.Icon className="size-5" />
                  </div>

                  <div className="relative">
                    <AnimatedText as="h3" delay={0.1} stagger={0.04} className="block text-base font-bold">
                      {s.title}
                    </AnimatedText>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
