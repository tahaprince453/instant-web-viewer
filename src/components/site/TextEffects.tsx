import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

type Counter = { i: number; delay: number; stagger: number };

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === "br") return " ";
    return textOf(node.props.children);
  }
  return "";
}

/** Splits any text/JSX into individually animated words, preserving nested styling. */
function splitWords(node: ReactNode, cls: string | undefined, ctr: Counter, prefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  Children.forEach(node, (child, idx) => {
    const key = `${prefix}-${idx}`;
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(/(\s+)/)
        .forEach((part, j) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            out.push(" ");
            return;
          }
          const n = ctr.i++;
          out.push(
            <span key={`${key}-${j}`} className="split-mask">
              <span
                  className={cn("split-word", cls)}
                  style={{ transitionDelay: `${ctr.delay + Math.min(n * ctr.stagger, 0.28)}s` }}
              >
                {part}
              </span>
            </span>,
          );
        });
    } else if (isValidElement<{ children?: ReactNode; className?: string }>(child)) {
      if (child.type === "br") out.push(<br key={key} />);
      else if (child.type === Fragment) out.push(...splitWords(child.props.children, cls, ctr, key));
      else
        out.push(
          ...splitWords(child.props.children, cn(cls, child.props.className), ctr, key),
        );
    }
  });
  return out;
}

/** Word-by-word masked reveal (slide-up + de-blur) that plays when scrolled into view. */
export function AnimatedText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.03,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>("0px", true);
  const parts = splitWords(children, undefined, { i: 0, delay, stagger }, "w");

  return (
    <Tag
      ref={ref}
      aria-label={textOf(children)}
      className={cn("split-text", inView && "split-in", className)}
    >
      <span aria-hidden>{parts}</span>
    </Tag>
  );
}

/** Types and erases a rotating list of phrases. Static (first phrase) for reduced motion. */
export function Typewriter({ phrases, className }: { phrases: string[]; className?: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0] ?? "");
      return;
    }
    let phrase = 0;
    let pos = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase] ?? "";
      if (!deleting) {
        pos++;
        setText(current.slice(0, pos));
        if (pos === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1700);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        pos--;
        setText(current.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 28);
      }
    };

    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className} aria-label={phrases.join(", ")}>
      <span aria-hidden>{text}</span>
      <span className="type-caret" aria-hidden />
    </span>
  );
}
