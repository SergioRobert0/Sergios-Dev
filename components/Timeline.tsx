"use client";

import { Reveal } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionHeader";
import { timeline } from "@/constants/portfolio";

export function Timeline() {
  return (
    <section id="experiencia" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader
        eyebrow="Linha do tempo"
        title="Experiência, formação e evolução."
        description="Um percurso construído entre atendimento, suporte de TI, formação técnica e graduação em Ciência da Computação."
      />
      <div className="relative border-l border-line pl-6 sm:pl-10">
        {timeline.map((item, index) => (
          <Reveal key={`${item.title}-${item.date}`} delay={index * 0.06}>
            <article className="relative mb-10 border border-line bg-card p-6 sm:p-8">
              <span className="absolute -left-[35px] top-8 h-4 w-4 rounded-full border-4 border-background bg-brand sm:-left-[51px]" />
              <div className="grid gap-5 lg:grid-cols-[0.35fr_1fr]">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                    {item.date}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.company}
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-5xl uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-background px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
