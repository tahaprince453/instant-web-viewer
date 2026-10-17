import { ArrowRight, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { PortraitVisual } from "./PortraitVisual";
import { AnimatedText, Typewriter } from "./TextEffects";
import { Magnetic } from "./Interactive";
import { Button } from "@/components/ui/button";

const specialities = ["AI Agents", "Workflow Automation", "Lead Qualification", "Document Processing", "Customer Support Automation"];
const contacts = [
  { label: "Instagram", href: "https://www.instagram.com/automatewithtaha/", Icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/923270012204", Icon: Phone },
  { label: "Email", href: "mailto:tahaprince503505@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taha-amjad-9b8b76335", Icon: Linkedin },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36">
      <div className="hero-grid grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <div className="rise inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-2">
            <span className="status-indicator size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="text-[0.65rem] font-semibold uppercase text-primary-soft">AI Automation Specialist &amp; Agent Developer</span>
          </div>
          <AnimatedText as="h1" delay={0.1} stagger={0.025} className="mt-6 block text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Taha Amjad<span className="text-primary">.</span></AnimatedText>
          <AnimatedText as="h2" delay={0.15} stagger={0.025} className="mt-4 block max-w-xl text-balance text-3xl font-bold leading-tight sm:text-4xl">I Build AI Systems That Work <span className="text-gradient">While You Sleep.</span></AnimatedText>
          <p className="rise mt-5 text-sm font-semibold text-primary"><Typewriter phrases={specialities} /></p>
          <p className="rise mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">AI agents · n8n workflows · WhatsApp automation · API integrations. I connect your tools and automate customer support, lead qualification and document processing — so your team can focus on growing the business.</p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3">
            <Magnetic><Button asChild className="portfolio-cta h-auto px-6 py-3.5"><a href="#contact">Book a Call <ArrowRight className="size-4" /></a></Button></Magnetic>
            <Magnetic><Button asChild variant="outline" className="portfolio-cta h-auto px-6 py-3.5"><a href="#projects">Explore My Work <ArrowRight className="size-4" /></a></Button></Magnetic>
          </div>
          <div className="rise mt-7 flex flex-wrap gap-2">
            {contacts.map(({ label, href, Icon }) => (
              <Button key={label} asChild variant="ghost" size="icon" className="rounded-full border border-border text-muted-foreground hover:text-primary"><a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><Icon className="size-4" /></a></Button>
            ))}
          </div>
        </div>
        <div className="rise min-w-0 px-3 py-4"><PortraitVisual /></div>
      </div>
    </section>
  );
}
