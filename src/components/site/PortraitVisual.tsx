import { Bot, Workflow, MessageCircle, FileSpreadsheet, Mail, Sparkles, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { ProfilePhoto } from "./ProfilePhoto";
import { Tilt } from "./Interactive";

const tools = [
  { name: "n8n workflows", Icon: Workflow, ring: "outer" },
  { name: "AI agents", Icon: Bot, ring: "inner" },
  { name: "Gemini", Icon: Sparkles, ring: "outer" },
  { name: "WhatsApp", Icon: MessageCircle, ring: "inner" },
  { name: "Google Sheets", Icon: FileSpreadsheet, ring: "outer" },
  { name: "Gmail", Icon: Mail, ring: "inner" },
] as const;

const orbitDuration = { outer: 30, inner: 22 };

export function PortraitVisual() {
  const counts = { outer: 0, inner: 0 };
  return (
    <div className="portrait-stage relative mx-auto aspect-square w-full max-w-[420px]" aria-label="Taha Amjad and his automation tools">
      {[0, 1.2, 2.4].map((delay) => (
        <span key={delay} className="portrait-pulse" style={{ animationDelay: `${delay}s` }} aria-hidden="true" />
      ))}
      <div className="portrait-dash portrait-dash-a absolute inset-0 rounded-full" aria-hidden="true" />
      <div className="portrait-dash portrait-dash-b absolute inset-[6%] rounded-full" aria-hidden="true" />
      {tools.map(({ name, Icon, ring }) => {
        const itemIndex = counts[ring]++;
        const duration = orbitDuration[ring];
        const style = { "--dur": `${duration}s`, "--delay": `${-(itemIndex * duration) / 3}s` } as CSSProperties;
        return (
          <div key={name} className={`orbiter orbiter-${ring}`} style={style}>
            <span title={name} aria-label={name} className="orbiter-chip grid size-11 place-items-center rounded-xl border border-border-strong bg-card text-primary sm:size-14">
              <Icon className="size-6 sm:size-7" aria-hidden="true" />
            </span>
          </div>
        );
      })}
      <Tilt max={14} className="absolute inset-[15%] z-10 rounded-full">
        <div className="portrait-spin-ring size-full rounded-full">
          <div className="relative z-10 size-full overflow-hidden rounded-full bg-secondary">
            <ProfilePhoto />
            <span className="portrait-scan" aria-hidden="true" />
          </div>
        </div>
      </Tilt>
      <span className="portrait-badge portrait-badge-a z-20" aria-hidden="true">
        <i className="status-indicator size-1.5 rounded-full bg-primary" /> Workflows live
      </span>
      <span className="portrait-badge portrait-badge-b z-20" aria-hidden="true">
        <Zap className="size-3.5" /> 24/7 Active
      </span>
    </div>
  );
}
