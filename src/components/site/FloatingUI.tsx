import { useEffect, useState } from "react";
import { ArrowUp, Briefcase, FolderOpen, Home, Mail, MessageCircle, PlayCircle, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { id: "home", label: "Home", Icon: Home },
  { id: "about", label: "About", Icon: User },
  { id: "services", label: "Services", Icon: Zap },
  { id: "demos", label: "Live Demo", Icon: PlayCircle },
  { id: "projects", label: "Projects", Icon: FolderOpen },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "contact", label: "Contact", Icon: Mail },
];

/** Floating bottom dock, back-to-top and WhatsApp buttons. */
export function FloatingUI() {
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav
        aria-label="Quick navigation"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background/80 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        {items.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            title={label}
            className={cn(
              "grid size-10 place-items-center rounded-full transition-all duration-300 sm:size-11",
              active === id
                ? "scale-110 bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_8px_26px_-8px_var(--glow)]"
                : "text-muted-foreground hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-[1.1rem]" />
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-24 right-5 z-50 grid size-11 place-items-center rounded-lg border border-primary/40 bg-background/80 text-primary backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-primary/10 sm:bottom-28",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      <a
        href="https://wa.me/923270012204"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle className="size-7" />
      </a>
    </>
  );
}
