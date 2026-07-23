"use client";

import { Eye } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionHeader";
import { certificates } from "@/constants/portfolio";

export function Certificates() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader
        eyebrow="Certificados"
        title="Formação complementar."
        description="Cursos que reforçam a atuação em atendimento, tecnologia da informação e comunicação."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {certificates.map((certificate, index) => (
          <Reveal key={certificate.title} delay={index * 0.08}>
            <article className="group overflow-hidden border border-line bg-card">
              <div className="relative aspect-[4/2.6] overflow-hidden bg-white p-5">
                <Image
                  src={certificate.image}
                  alt={`Certificado ${certificate.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{certificate.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {certificate.institution}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{certificate.hours}</span>
                  <span>{certificate.year}</span>
                </div>
                <a
                  href={certificate.url}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm transition hover:bg-foreground hover:text-background"
                >
                  <Eye className="h-4 w-4" />
                  Visualizar
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
