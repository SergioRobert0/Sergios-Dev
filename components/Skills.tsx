"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionHeader";
import { skillCategories } from "@/constants/portfolio";

export function Skills() {
  return (
    <section id="habilidades" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader
        eyebrow="Habilidades"
        title="Suporte, sistemas e atendimento."
        description="Competências organizadas por área de atuação, com níveis relativos de domínio e frequência de uso."
      />
      <div className="grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.05}>
            <article className="h-full bg-card p-6 sm:p-8">
              <h3 className="font-heading text-5xl uppercase leading-none">
                {category.title}
              </h3>
              <div className="mt-8 grid gap-6">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-brand">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden bg-background">
                        <motion.div
                          className="h-full bg-brand"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
