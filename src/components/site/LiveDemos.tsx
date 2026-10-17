import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { AnimatedText } from "./TextEffects";

type Demo = {
  isNew?: boolean;
  /** Tailwind aspect class for the thumbnail frame. Default: aspect-video */
  posterAspect?: string;
  badge: string;
  label: string;
  title: string;
  description: string;
  categories: string[];
  features: { title: string; text: string }[];
  tags: string[];
  poster: string;
  video: string;
  duration: string;
  captionTitle: string;
  captionLine: string;
};

const demos: Demo[] = [
  {
    badge: "AI AUTOMATION • LIVE DEMO",
    label: "Featured Automation",
    title: "AI-Powered Restaurant WhatsApp Assistant",
    description: "A WhatsApp assistant that answers menu questions, takes orders and confirms them, so restaurants spend less time on chats.",
    categories: ["AI Automation", "WhatsApp", "Order Management"],
    features: [
      { title: "Instant Replies", text: "Answers menu, price and timing questions." },
      { title: "Order Booking", text: "Collects items, quantity and delivery details." },
      { title: "AI Customer Support", text: "Understands messages and replies naturally." },
      { title: "Auto Follow-Ups", text: "Sends confirmations and reminders." },
    ],
    tags: ["AI Automation", "WhatsApp", "n8n", "Google Sheets"],
    poster: "/media/restaurant-demo-thumb.webp",
    video: "/media/restaurant-demo.mp4",
    duration: "00:57",
    captionTitle: "Restaurant WhatsApp AI Automation",
    captionLine: "Auto Replies · Order Booking · Customer Support",
  },
  {
    isNew: true,
    badge: "AI AUTOMATION • LIVE DEMO",
    label: "Featured Automation",
    title: "AI-Powered PDF to Blog Automation",
    description: "Turns uploaded PDFs into AI-written blog drafts and delivers them straight to Gmail through an n8n workflow.",
    categories: ["AI Automation", "Content Generation", "PDF Processing"],
    features: [
      { title: "PDF Content Extraction", text: "Reads the PDF and prepares it for AI." },
      { title: "AI Blog Writing", text: "Creates a draft with headings and paragraphs." },
      { title: "Gmail Delivery", text: "Sends the finished draft to your inbox." },
    ],
    tags: ["AI Automation", "PDF Processing", "n8n", "Gmail"],
    poster: "/media/pdf-blog-ai-demo-thumb.webp",
    video: "/media/pdf-blog-ai-demo.mp4",
    duration: "00:30",
    captionTitle: "AI PDF to Blog · Sent to Gmail",
    captionLine: "Upload PDF · AI Generates Blog · Blog Ready · Send to Gmail",
  },
  {
    isNew: true,
    posterAspect: "aspect-[3/2]",
    badge: "AI AUTOMATION • LIVE DEMO",
    label: "Featured Automation",
    title: "WhatsApp RAG Chatbot",
    description: "A WhatsApp chatbot that gives instant, accurate answers from your own data, 24/7.",
    categories: ["AI Chatbot", "WhatsApp", "RAG"],
    features: [
      { title: "Instant Replies", text: "No more waiting for customers." },
      { title: "Answers From Your Data", text: "Accurate, up-to-date responses from your sources." },
      { title: "No Manual Work", text: "Set it once and let it run." },
    ],
    tags: ["AI Chatbot", "RAG", "WhatsApp", "24/7 Support"],
    poster: "/media/rag-chatbot-demo-thumb.webp",
    video: "/media/rag-chatbot-demo.mp4",
    duration: "00:57",
    captionTitle: "WhatsApp RAG Chatbot",
    captionLine: "WhatsApp Message · RAG Processing · Your Data · Smart Response",
  },
];

export function LiveDemos() {
  const [playing, setPlaying] = useState<number | null>(null);
  const multi = demos.length > 1;

  useEffect(() => {
    if (playing === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [playing]);

  return (
    <section id="demos" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--gradient-line)]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Live Demo"
          title={
            <>
              See it <span className="text-gradient">in action</span>
            </>
          }
          subtitle="Real workflows, recorded end to end. Pick a demo to see the inputs, decisions and final results."
        />

        <div className={multi ? "mt-12 grid items-stretch gap-6 lg:grid-cols-2" : "mx-auto mt-12 max-w-3xl"}>
          {demos.map((d, i) => (
            <Reveal
              key={d.video}
              from={multi && demos.length % 2 === 1 && i === demos.length - 1 ? "up" : i % 2 === 0 ? "left" : "right"}
              delay={(i % 2) * 0.1}
              className={multi && demos.length % 2 === 1 && i === demos.length - 1 ? "lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-3xl" : ""}
            >
              <article className={`demo-card group/card relative h-full overflow-hidden rounded-3xl border ${d.isNew ? "border-primary/60 ring-1 ring-primary/30" : "border-border"} bg-card shadow-[0_40px_100px_-60px_var(--glow)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_50px_120px_-50px_var(--glow)]`}>
                <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                {/* Video thumbnail */}
                <button
                  type="button"
                  onClick={() => setPlaying(i)}
                  aria-label={`Play demo: ${d.title}`}
                  className="group relative block w-full overflow-hidden bg-black text-left"
                >
                  <img
                    src={d.poster}
                    alt={`${d.captionTitle} demo thumbnail`}
                    className={`${d.posterAspect ?? "aspect-video"} w-full object-cover transition-transform duration-700 group-hover:scale-105`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#25D366]" />
                    {d.badge}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[0.7rem] font-bold tracking-widest text-white backdrop-blur">
                    {d.duration}
                  </span>
                  <span className="shimmer-sweep pointer-events-none absolute inset-0" />
                  {d.isNew ? (
                    <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_24px_-2px_var(--glow)]">
                      ✦ New
                    </span>
                  ) : null}
                  <span className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-full border border-white/15 bg-black/70 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    <span className="flex h-3 items-end gap-0.5" aria-hidden>
                      {[0, 1, 2, 3].map((b) => (
                        <span key={b} className="eq-bar w-0.5 rounded-full bg-primary" style={{ animationDelay: `${b * 0.15}s` }} />
                      ))}
                    </span>
                    Watch the demo
                  </span>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_50px_-4px_var(--glow)] transition-transform duration-300 group-hover:scale-110 sm:size-20">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                      <Play className="relative size-7 translate-x-0.5 fill-current sm:size-8" />
                    </span>
                  </span>
                </button>

                <div className="flex items-center justify-between gap-3 border-y border-border bg-secondary/40 px-5 py-3 sm:px-7">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary-soft">{d.captionTitle}</p>
                  <p className="hidden text-xs text-muted-foreground xl:block">{d.captionLine}</p>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <ul className="flex flex-wrap gap-2">
                      {d.categories.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[0.68rem] font-semibold text-primary-soft"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em]">
                      {String(i + 1).padStart(2, "0")} / {d.label}
                    </span>
                  </div>

                  <AnimatedText as="h3" stagger={0.04} className="mt-5 block text-2xl font-bold leading-tight sm:text-3xl">
                    {d.title}
                  </AnimatedText>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{d.description}</p>

                  <p className="mt-7 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary-soft">Key Features</p>
                  <ul className={`mt-3 grid gap-3 ${multi ? "" : "sm:grid-cols-2"}`}>
                    {d.features.map((f, k) => (
                      <li
                        key={f.title}
                        className={`rise rounded-xl border border-border bg-secondary/30 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 ${
                          !multi && k === d.features.length - 1 && d.features.length % 2 === 1 ? "sm:col-span-2" : ""
                        }`}
                        style={{ animationDelay: `${0.1 + k * 0.08}s` }}
                      >
                        <p className="flex items-start gap-2.5 text-sm font-semibold">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {f.title}
                        </p>
                        <p className="mt-1.5 pl-4 text-xs leading-relaxed text-muted-foreground">{f.text}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-border pt-5">
                    <ul className="flex flex-wrap gap-2">
                      {d.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {playing !== null && typeof document !== "undefined"
        ? createPortal(
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
          onClick={() => setPlaying(null)}
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setPlaying(null)}
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-border bg-secondary/70 hover:border-primary/60"
          >
            <X className="size-4" />
          </button>
          <video
            src={demos[playing]!.video}
            poster={demos[playing]!.poster}
            controls
            autoPlay
            playsInline
            className="modal-in max-h-[88dvh] max-w-full rounded-xl border border-border bg-black object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body,
      )
        : null}
    </section>
  );
}
