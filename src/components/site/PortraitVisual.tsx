import { Bot, Workflow, MessageCircle, FileSpreadsheet, Mail, Sparkles } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";

const tools = [
  { name: "n8n workflows", Icon: Workflow, position: "left-[2%] top-[20%]" },
  { name: "AI agents", Icon: Bot, position: "left-[42%] -top-[1%]" },
  { name: "Gemini", Icon: Sparkles, position: "right-[1%] top-[22%]" },
  { name: "WhatsApp", Icon: MessageCircle, position: "right-[1%] bottom-[20%]" },
  { name: "Google Sheets", Icon: FileSpreadsheet, position: "left-[42%] -bottom-[1%]" },
  { name: "Gmail", Icon: Mail, position: "left-[2%] bottom-[20%]" },
];

export function PortraitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[390px]" aria-label="Taha Amjad and his automation tools">
      <div className="portrait-orbit pointer-events-none absolute inset-0 rounded-full border border-primary/25" aria-hidden />
      <div className="portrait-ring absolute inset-[7%] rounded-full p-2 sm:p-3">
        <div className="h-full w-full overflow-hidden rounded-full bg-secondary"><ProfilePhoto /></div>
      </div>
      {tools.map(({ name, Icon, position }, i) => (
        <span key={name} title={name} aria-label={name} className={`portrait-tool absolute z-10 grid size-11 place-items-center rounded-lg border border-border-strong bg-card text-primary sm:size-14 ${position}`} style={{ animationDelay: `${i * 0.4}s` }}>
          <Icon className="size-6 sm:size-7" aria-hidden />
        </span>
      ))}
    </div>
  );
}
