import { Suspense, lazy, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { FloatingUI } from "@/components/site/FloatingUI";
import { Stats } from "@/components/site/Stats";
import { ScrollProgress } from "@/components/site/ScrollEffects";
import { profilePhotoUrl } from "@/components/site/ProfilePhoto";
import { CursorGlow } from "@/components/site/CursorGlow";

// Below-the-fold sections are split into separate chunks so the first screen loads faster.
const Services = lazy(() => import("@/components/site/Services").then((m) => ({ default: m.Services })));
const LiveDemos = lazy(() => import("@/components/site/LiveDemos").then((m) => ({ default: m.LiveDemos })));
const Projects = lazy(() => import("@/components/site/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import("@/components/site/Experience").then((m) => ({ default: m.Experience })));
const Process = lazy(() => import("@/components/site/Process").then((m) => ({ default: m.Process })));
const Values = lazy(() => import("@/components/site/Values").then((m) => ({ default: m.Values })));
const FinalCTA = lazy(() => import("@/components/site/FinalCTA").then((m) => ({ default: m.FinalCTA })));
const Footer = lazy(() => import("@/components/site/Footer").then((m) => ({ default: m.Footer })));

/** Keeps space reserved while a lazy section loads, so the page doesn't jump. */
const Later = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>{children}</Suspense>
);

const title = "Taha Amjad — AI Automation Specialist | AI Agents, n8n & Workflow Automation";
const description =
  "I design and deploy AI-powered automation systems that streamline business operations — AI agents, n8n workflows, API integrations, and WhatsApp and Telegram automation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: profilePhotoUrl },
      { name: "twitter:image", content: profilePhotoUrl },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <FloatingUI />
      <Nav />
      <main className="relative">
        <Hero />
        <Stats />
        <Marquee />
        <About />
        <Later><Services /></Later>
        <Later><LiveDemos /></Later>
        <Later><Projects /></Later>
        <Later><Experience /></Later>
        <Later><Process /></Later>
        <Later><Values /></Later>
        <Later><FinalCTA /></Later>
      </main>
      <Later><Footer /></Later>
    </>
  );
}
