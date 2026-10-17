import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { AnimatedText } from "./TextEffects";
import { Magnetic } from "./Interactive";
import { contacts } from "@/data/profile";

const WA = "https://wa.me/923270012204";

const rows = [
  contacts[0]!,
  { label: "Phone", value: "+92 327 0012204", href: "tel:+923270012204", Icon: Phone },
  { label: "WhatsApp", value: "Chat on WhatsApp", href: WA, Icon: MessageCircle },
  { ...contacts[2]!, value: "Connect on LinkedIn" },
  { ...contacts[3]!, value: "Follow on Instagram" },
];

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--gradient-line)]" />
      <div className="hero-aura pointer-events-none absolute inset-0 rotate-180 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-primary-soft">Contact</p>
          </Reveal>
          <AnimatedText as="h2" delay={0.1} className="block text-balance text-4xl font-bold leading-[1.1] sm:text-5xl">
            Let's Build Something That <span className="text-gradient">Runs Itself</span>
          </AnimatedText>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Have a workflow you want automated? Share the process that consumes the most time in your business and
              I'll outline how an AI-driven system can take it over.
            </p>
            <Magnetic className="mt-9">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-primary to-accent px-7 py-4 text-sm font-bold text-primary-foreground shadow-[0_18px_50px_-18px_var(--glow)] transition-all duration-300 hover:shadow-[0_24px_70px_-16px_var(--glow)]"
              >
                Book a Call
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="space-y-3">
          {rows.map(({ label, value, href, Icon }, i) => (
            <Reveal key={label} from="right" delay={0.08 * i}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_24px_60px_-40px_var(--glow)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground">
                  <Icon className="size-[1.1rem]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary-soft">{label}</span>
                  <span className="mt-0.5 block truncate text-sm font-semibold sm:text-base">{value}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
