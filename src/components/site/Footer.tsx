import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Demos", href: "#demos" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/automatewithtaha/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taha-amjad-9b8b76335", Icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/923270012204", Icon: Phone },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=tahaprince503505@gmail.com",
    Icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-secondary py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold">
              TAHA<span className="text-primary">.</span>
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-soft">
              AI Automation Specialist
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Designing intelligent automation systems that streamline operations and drive measurable efficiency.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
              Connect
            </h2>
            <ul className="mt-4 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="grid size-11 place-items-center rounded-full border border-border bg-secondary/50 text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary"
                  >
                    <s.Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              WhatsApp: 0327 0012204
            </p>
            <p className="text-xs text-muted-foreground">
              Email: tahaprince503505@gmail.com
            </p>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Taha Amjad. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
