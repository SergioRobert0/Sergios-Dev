"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionHeader";
import { stats } from "@/constants/portfolio";

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader
        eyebrow="Sobre mim"
        title="Tecnologia a serviço das pessoas."
        description="Minha atuação une suporte técnico, atendimento humanizado e formação em desenvolvimento de sistemas."
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="border-y border-line py-8">
            <p className="text-2xl leading-10 text-foreground">
              Sou estudante de Ciência da Computação e técnico em Desenvolvimento
              de Sistemas, com experiência em suporte técnico, helpdesk presencial
              e remoto, atendimento ao público e orientação de usuários.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-5 text-lg leading-9 text-muted-foreground">
            <p>
              Atuo na identificação e resolução de problemas relacionados a
              computadores, sistemas, equipamentos e periféricos. Também realizo
              instalação e configuração de programas e dispositivos.
            </p>
            <p>
              Valorizo uma comunicação clara e um atendimento atento, buscando
              tornar a tecnologia mais acessível e eficiente para cada usuário.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-card p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <div className="font-heading text-6xl text-brand">
              {stat.value.toLocaleString("pt-BR")}{stat.suffix ?? ""}
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
