import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Demos", href: "#demos" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const els = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "glass-strong border-b border-border" : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <a
            href="#home"
            className="min-w-0 font-display text-lg font-bold tracking-tight text-foreground"
          >
            TAHA<span className="text-primary">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-all duration-300 hover:bg-secondary/60 hover:text-foreground",
                    active === l.href ? "bg-primary/15 text-primary shadow-[0_0_24px_-8px_var(--glow)]" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label={theme === "day" ? "Switch to dark theme" : "Switch to light theme"}
              title={theme === "day" ? "Switch to dark theme" : "Switch to light theme"}
              onClick={toggle}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
            >
              {theme === "day" ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </Button>
            <Button asChild variant="outline" className="portfolio-cta hidden h-10 sm:inline-flex"><a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border border-border-strong bg-secondary/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 sm:inline-flex"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a></Button>
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {open ? (
        <div className="glass-strong border-b border-border lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 pb-5 sm:px-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-4 text-base text-foreground/90"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Get Started <ArrowRight className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
