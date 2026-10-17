import { Counter, Tilt } from "./Interactive";
import { Reveal } from "./Reveal";

const stats = [
  { to: 10, suffix: "+", label: "AI Automation Systems Built", sub: "Support · Leads · Email · Invoices · Research · Booking · More" },
  { to: 8, suffix: "+", label: "Tools & APIs Integrated", sub: "n8n · Gemini · Groq · WhatsApp · Telegram · Gmail · Sheets" },
  { to: 24, suffix: "/7", label: "Always-On Workflows", sub: "Systems that work while you sleep" },
];

export function Stats() {
  return (
    <section className="relative -mt-4 pb-16 sm:pb-24">
      <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12} from="scale">
            <Tilt className="group relative overflow-hidden border-b border-border p-5 text-center">
              <p className="text-gradient font-display text-5xl font-bold sm:text-6xl">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">{s.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.sub}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
