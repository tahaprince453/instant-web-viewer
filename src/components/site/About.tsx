import { Mail } from "lucide-react";
import { AnimatedText } from "./TextEffects";
import { Reveal, SectionHeading } from "./Reveal";
import { Tilt } from "./Interactive";
import { AboutVisuals } from "./AboutVisuals";
import { ProfilePhoto } from "./ProfilePhoto";
import { contacts, coreStack } from "@/data/profile";

const badges = ["Autonomous", "Reliable", "Cost-Effective", "24/7"];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              AI that thinks, decides, and <span className="text-gradient">acts on its own</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Bio card */}
          <Reveal from="left">
            <div className="h-full rounded-lg border border-border bg-card p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative size-28 shrink-0 overflow-hidden rounded-full border-2 border-primary/40 p-1 shadow-[0_0_40px_-12px_var(--glow)] sm:size-32">
                  <div className="size-full overflow-hidden rounded-full bg-secondary">
                    <ProfilePhoto />
                  </div>
                </div>
                <div>
                  <AnimatedText as="h3" stagger={0.04} className="block text-2xl font-bold">
                    Taha Amjad
                  </AnimatedText>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-soft">
                    AI Automation Specialist &amp; Agent Developer
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                I'm an AI Automation Specialist building intelligent systems that help businesses run with less manual
                work. I build <strong className="text-foreground">AI agents</strong> and connected workflows with{" "}
                <strong className="text-foreground">n8n</strong>, AI models and APIs to simplify everyday business
                operations.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                My work focuses on practical systems: answering customers on WhatsApp, qualifying leads, processing
                documents and keeping business tools in sync. Explore the projects below to see the workflows and how
                each system works.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary-soft"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_var(--glow)]"
              >
                <Mail className="size-4" /> Let's work together
              </a>
            </div>
          </Reveal>

          {/* Side panel */}
          <Reveal from="right" delay={0.1}>
            <Tilt className="h-full rounded-lg" max={4}>
              <div className="flex h-full flex-col gap-7 rounded-lg border border-border bg-card p-6 sm:p-8">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">Status</p>
                  <p className="mt-3 flex items-center gap-2.5 text-sm font-semibold">
                    <span className="status-indicator size-2 rounded-full bg-primary" />
                    Open to Work · Remote
                  </p>
                </div>

                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">Core Stack</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {coreStack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[0.72rem] font-medium text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">Quick Connect</p>
                  <div className="mt-3 flex gap-3">
                    {contacts.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        title={label}
                        className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        </div>
        <AboutVisuals />
      </div>
    </section>
  );
}
