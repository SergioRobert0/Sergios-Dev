"use client";

import dynamic from "next/dynamic";

import { About } from "@/components/About";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";

const ResumeGenerator = dynamic(
  () => import("@/components/ResumeGenerator").then((mod) => mod.ResumeGenerator),
  { ssr: false },
);

export function PortfolioShell() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <section id="curriculo" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <ResumeGenerator />
        </section>
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
