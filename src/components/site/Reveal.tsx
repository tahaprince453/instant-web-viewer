import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { AnimatedText } from "./TextEffects";
import { cn } from "@/lib/utils";

export { useInView };

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right" | "scale";
};

export function Reveal({ children, delay = 0, className, from = "up" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>("0px", true);

  return (
    <div
      ref={ref}
      className={cn(from === "up" ? "reveal" : `reveal-${from}`, inView && "reveal-in", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary-soft">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <AnimatedText
        as="h2"
        delay={0.1}
        className="block text-balance text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl"
      >
        {title}
      </AnimatedText>
      {subtitle ? (
        <AnimatedText
          as="p"
          delay={0.2}
          stagger={0.018}
          className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {subtitle}
        </AnimatedText>
      ) : null}
    </div>
  );
}
