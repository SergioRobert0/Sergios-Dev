"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, BriefcaseBusiness, GitBranch, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { ResumeDownloadButton } from "@/components/ResumeGenerator";
import { profile } from "@/constants/portfolio";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.06fr_0.94fr]"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-brand">
          Portfólio • Currículo
        </p>
        <h1 className="mt-7 font-heading text-[6.6rem] uppercase leading-[0.82] text-foreground sm:text-[9rem] lg:text-[12rem]">
          Sérgio
          <br />
          Loyola
        </h1>
        <div className="mt-7 border-l-4 border-brand pl-5">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-foreground">
            {profile.role}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {profile.summary}
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ResumeDownloadButton />
          <a
            href="#projetos"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-card px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            Ver projetos <ArrowDownRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          {[
            { label: "LinkedIn", href: profile.linkedin, icon: BriefcaseBusiness },
            { label: "GitHub", href: profile.github, icon: GitBranch },
            { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
          ].map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-b border-line py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:border-brand hover:text-brand"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
        style={{ y: imageY }}
      >
        <motion.div
          className="relative aspect-[4/5] overflow-hidden border border-brand bg-card p-3 shadow-[0_30px_80px_rgba(17,17,17,0.14)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={profile.image}
            alt="Foto de Sérgio Roberto de Oliveira Loyola"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-cover object-[50%_45%] p-3"
          />
        </motion.div>
        <div className="absolute -bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-3 text-sm shadow-sm">
          <MapPin className="h-4 w-4 text-brand" />
          {profile.location}
        </div>
      </motion.div>
    </section>
  );
}
