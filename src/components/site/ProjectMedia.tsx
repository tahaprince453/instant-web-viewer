import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import type { Media } from "@/data/projects";

type Props = {
  media?: Media | undefined;
  placeholderLabel: string;
  className?: string;
};

/**
 * Renders a project image or video, or an elegant upload placeholder.
 * See src/data/projects.ts for how to plug in your own media.
 */
export function ProjectMedia({ media, placeholderLabel, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const fitClass = media?.fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`group/media relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-secondary/25 ${className ?? ""}`}
      onMouseEnter={() => void videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {media?.type === "image" ? (
        <img
          src={media.src}
          alt={media.alt ?? placeholderLabel}
          loading="lazy"
          decoding="async"
          className={`size-full ${fitClass} transition-transform duration-700 group-hover/media:scale-[1.03]`}
        />
      ) : media?.type === "video" ? (
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className={`size-full ${fitClass} transition-transform duration-700 group-hover/media:scale-[1.03]`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="grid-bg absolute inset-0 opacity-25" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-dashed border-primary/20" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <div className="relative grid size-14 place-items-center rounded-2xl border border-dashed border-primary/40 bg-primary/10 text-primary shadow-[0_0_30px_-8px_var(--primary)]">
              <ImagePlus className="size-6" />
            </div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground/80">
              {placeholderLabel}
            </p>
            <p className="max-w-xs text-[0.72rem] leading-relaxed text-muted-foreground">
              1280 × 800 px recommended. Image ya MP4 video dono chalenge.
            </p>
            <p className="text-[0.65rem] text-primary-soft">
              Edit: src/data/projects.ts → media
            </p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-border transition-all duration-500 group-hover:ring-primary/40" />
    </div>
  );
}
