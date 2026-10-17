import { Reveal, SectionHeading } from "./Reveal";

const tech = [
  "n8n",
  "Google Gemini",
  "OpenAI",
  "AI Agents",
  "LLMs",
  "RAG",
  "REST APIs",
  "Webhooks",
  "WhatsApp",
  "Telegram",
  "Gmail",
  "Google Sheets",
  "CRM Integrations",
  "Databases",
  "Social Media APIs",
];

export function Stack() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Technology" title="Automation Technology Stack" align="center" />

        <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
          {tech.map((t, i) => (
            <Reveal key={t} delay={i * 0.04}>
              <div
                className="glass float-soft rounded-2xl px-5 py-4 text-sm font-medium text-foreground/85 transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 hover:text-primary"
                style={{ animationDelay: `${(i % 6) * 0.6}s` }}
              >
                {t}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
