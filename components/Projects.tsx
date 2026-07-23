"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import Image from "next/image";
import type { MouseEvent } from "react";

import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/constants/portfolio";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-120, 120], [6, -6]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-6, 6]), {
    stiffness: 160,
    damping: 18,
  });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.article
      className="group grid overflow-hidden border border-line bg-card lg:grid-cols-[1fr_0.86fr]"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
    >
      <div className="relative min-h-[280px] overflow-hidden bg-[#f8f7f3] lg:min-h-[420px]">
        <Image
          src={project.image}
          alt={`Imagem de apresentação do projeto ${project.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className={`${project.imageFit === "contain" ? "object-contain" : "object-cover"} transition duration-700 group-hover:scale-105`}
        />
      </div>
      <div className="flex min-h-[360px] flex-col justify-between p-6 sm:p-9">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-brand">
            0{index + 1} / Projeto
          </p>
          <h3 className="mt-5 font-heading text-6xl uppercase leading-none text-foreground sm:text-7xl">
            {project.title}
          </h3>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {project.images.map((image, imageIndex) => (
              <div
                key={image}
                className="relative aspect-[4/2.7] overflow-hidden border border-line bg-background"
              >
                <Image
                  src={image}
                  alt={`Imagem ${imageIndex + 1} do projeto ${project.title}`}
                  fill
                  sizes="(max-width: 1024px) 42vw, 16vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:bg-brand"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={project.demo}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              <ArrowUpRight className="h-4 w-4" />
              Demo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projetos" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader
        eyebrow="Projetos"
        title="Produtos digitais com intenção."
        description="Cards grandes, visuais editoriais e interações suaves para destacar escopo, tecnologia e maturidade de cada projeto."
      />
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
