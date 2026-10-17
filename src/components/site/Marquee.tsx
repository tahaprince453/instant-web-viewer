const items = [
  "AUTONOMOUS AI AGENTS",
  "24/7 CUSTOMER SUPPORT AUTOMATION",
  "n8n WORKFLOW AUTOMATION",
  "WHATSAPP AI ASSISTANTS",
  "TELEGRAM AI BOTS",
  "DOCUMENT INTELLIGENCE",
  "AUTOMATED LEAD QUALIFICATION",
  "CONTENT AUTOMATION",
  "API INTEGRATIONS",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section
      aria-label="Capabilities"
      className="relative border-y border-border bg-secondary/20 py-5"
    >
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-10 pr-10">
          {row.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.22em] text-foreground/70">
                {item}
              </span>
              <span className="size-1 shrink-0 rounded-full bg-primary/70" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
