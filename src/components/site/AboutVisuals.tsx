import { Reveal } from "./Reveal";
import { Tilt } from "./Interactive";

/** Two animated, on-brand illustrations (replace the old stock photos). */
function WorkflowArt() {
  const outs = [
    { y: 46, label: "Sheets", d: "M234 120 C 280 120, 290 46, 316 46" },
    { y: 120, label: "WhatsApp", d: "M234 120 H 316" },
    { y: 194, label: "Gmail", d: "M234 120 C 280 120, 290 194, 316 194" },
  ];
  return (
    <svg viewBox="0 0 440 240" className="h-full w-full" role="img" aria-label="Animated connected workflow: trigger, AI agent and three outputs">
      <g stroke="var(--border-strong, var(--border))" strokeWidth="1" opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="240" strokeOpacity="0.25" />
        ))}
      </g>

      {/* paths */}
      <path id="p-in" d="M92 120 H 166" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6 6" className="dash-flow" />
      {outs.map((o, i) => (
        <path key={o.label} id={`p-out-${i}`} d={o.d} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 6" className="dash-flow" />
      ))}

      {/* travelling dots */}
      <circle r="4" fill="var(--primary)">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M92 120 H 166" />
      </circle>
      {outs.map((o, i) => (
        <circle key={o.label} r="4" fill="var(--accent)">
          <animateMotion dur="2.2s" begin={`${0.9 + i * 0.35}s`} repeatCount="indefinite" path={o.d} />
        </circle>
      ))}

      {/* trigger node */}
      <rect x="18" y="100" width="74" height="40" rx="12" fill="var(--card)" stroke="var(--primary)" strokeOpacity="0.7" />
      <text x="55" y="125" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--foreground)">Trigger</text>

      {/* AI core */}
      <circle cx="200" cy="120" r="46" fill="var(--primary)" opacity="0.12" className="core-pulse" />
      <circle cx="200" cy="120" r="34" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
      <text x="200" y="127" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--primary)">AI</text>

      {/* outputs */}
      {outs.map((o) => (
        <g key={o.label}>
          <rect x="316" y={o.y - 20} width="96" height="40" rx="12" fill="var(--card)" stroke="var(--accent)" strokeOpacity="0.7" />
          <text x="364" y={o.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--foreground)">{o.label}</text>
          <circle cx="404" cy={o.y - 12} r="6" fill="var(--primary)" />
          <path d={`M401 ${o.y - 12} l2 2 l4 -4`} stroke="var(--primary-foreground)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

function DocumentArt() {
  const rows = ["Vendor", "Invoice No.", "Amount", "Due Date"];
  return (
    <svg viewBox="0 0 440 240" className="h-full w-full" role="img" aria-label="Animated document being scanned into structured data">
      {/* document */}
      <rect x="28" y="28" width="132" height="184" rx="14" fill="var(--card)" stroke="var(--border-strong, var(--border))" />
      {[54, 76, 98, 120, 142, 164, 186].map((y, i) => (
        <rect key={y} x="46" y={y} width={i % 3 === 2 ? 60 : 96} height="7" rx="3.5" fill="var(--muted-foreground)" opacity="0.35" />
      ))}
      <rect x="28" y="28" width="132" height="184" rx="14" fill="none" stroke="var(--primary)" strokeOpacity="0.5" />
      <g className="scan-beam">
        <rect x="28" y="28" width="132" height="3" fill="var(--primary)" />
        <rect x="28" y="31" width="132" height="26" fill="var(--primary)" opacity="0.14" />
      </g>

      {/* arrow */}
      <path d="M172 120 H 232" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6 6" fill="none" className="dash-flow" />
      <path d="M228 113 l10 7 l-10 7" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--primary)">
        <animateMotion dur="1.6s" repeatCount="indefinite" path="M172 120 H 232" />
      </circle>

      {/* structured data */}
      <rect x="248" y="28" width="164" height="184" rx="14" fill="var(--card)" stroke="var(--accent)" strokeOpacity="0.6" />
      <text x="264" y="52" fontSize="11" fontWeight="800" letterSpacing="1.5" fill="var(--accent)">STRUCTURED DATA</text>
      {rows.map((r, i) => (
        <g key={r} className="row-in" style={{ animationDelay: `${i * 0.5}s` }}>
          <rect x="262" y={68 + i * 34} width="136" height="26" rx="8" fill="var(--secondary)" />
          <circle cx="277" cy={81 + i * 34} r="6" fill="var(--primary)" />
          <path d={`M274 ${81 + i * 34} l2 2 l4 -4`} stroke="var(--primary-foreground)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="292" y={85 + i * 34} fontSize="11" fontWeight="600" fill="var(--foreground)">{r}</text>
          <rect x="350" y={78 + i * 34} width="38" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

const cards = [
  { title: "Connected workflows", text: "Triggers, AI and your business tools linked in one automated flow.", Art: WorkflowArt },
  { title: "Documents into actionable data", text: "Invoices and files read by AI and turned into clean, structured records.", Art: DocumentArt },
];

export function AboutVisuals() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {cards.map(({ title, text, Art }, i) => (
        <Reveal key={title} from={i === 0 ? "left" : "right"} delay={0.1}>
          <Tilt className="h-full rounded-3xl" max={5}>
            <figure className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors duration-500 hover:border-primary/50 sm:p-5">
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              <div className="relative aspect-[11/6] overflow-hidden rounded-2xl border border-border bg-background/60">
                <Art />
              </div>
              <figcaption className="relative mt-5 border-b border-border pb-4">
                <p className="text-lg font-bold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </figcaption>
            </figure>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}
