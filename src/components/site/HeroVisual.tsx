import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  FileText,
  Users,
  Mail,
  Sparkles,
  Database,
  Share2,
} from "lucide-react";

const nodes = [
  { label: "WhatsApp", Icon: MessageCircle, x: 10, y: 14 },
  { label: "Telegram", Icon: Send, x: 50, y: 5 },
  { label: "PDF", Icon: FileText, x: 88, y: 16 },
  { label: "CRM", Icon: Users, x: 7, y: 52 },
  { label: "Email", Icon: Mail, x: 92, y: 52 },
  { label: "AI", Icon: Sparkles, x: 13, y: 88 },
  { label: "Database", Icon: Database, x: 51, y: 95 },
  { label: "Social Media", Icon: Share2, x: 87, y: 86 },
];

const words = ["Capture", "Understand", "Automate", "Execute"];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 12,
      y: ((e.clientY - r.top) / r.height - 0.5) * 12,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative aspect-square w-full max-w-xl"
    >
      <div
        className="absolute inset-0 rounded-4xl border border-border bg-card/30 backdrop-blur-sm transition-transform duration-300 ease-out"
        style={{ transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-4xl">
          <div className="grid-bg grid-drift absolute inset-[-64px] opacity-40" />
          <div className="hero-aura absolute inset-0" />
        </div>

        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {nodes.map((n) => (
            <line
              key={n.label}
              x1={n.x}
              y1={n.y}
              x2={50}
              y2={50}
              stroke="var(--primary)"
              strokeOpacity="0.35"
              strokeWidth="0.25"
              className="dash-flow"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Center node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="pulse-soft absolute -inset-10 rounded-full bg-primary/25 blur-2xl" />
            <div className="glass-strong glow-ring relative rounded-3xl px-5 py-4 text-center">
              <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.22em] text-primary">
                AI Automation
              </p>
              <div className="mt-1 h-5 overflow-hidden">
                <p key={wordIndex} className="word-rise text-sm font-semibold text-foreground">
                  {words[wordIndex]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Satellite nodes */}
        {nodes.map((n, i) => (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div
              className="glass float-soft flex items-center gap-2 rounded-full px-3 py-2 shadow-lg"
              style={{ animationDelay: `${i * 0.55}s` }}
            >
              <n.Icon className="size-3.5 shrink-0 text-primary" />
              <span className="whitespace-nowrap text-[0.68rem] font-medium text-foreground/85">
                {n.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
