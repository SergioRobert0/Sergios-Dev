"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, GitBranch, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Reveal } from "@/components/Motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { profile } from "@/constants/portfolio";

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um email válido."),
  subject: z.string().min(3, "Informe o assunto."),
  message: z.string().min(10, "Escreva uma mensagem com mais detalhes."),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(data: ContactForm) {
    const body = encodeURIComponent(
      `Nome: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    );
    window.location.assign(`mailto:${profile.email}?subject=${encodeURIComponent(
      data.subject,
    )}&body=${body}`);
    setSent(true);
    reset();
  }

  const contacts = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: "GitHub", value: profile.githubLabel, href: profile.github, icon: GitBranch },
    { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, icon: BriefcaseBusiness },
    { label: "Telefone", value: profile.phone, href: "#contato", icon: Phone },
    { label: "Localização", value: profile.location, href: "#contato", icon: MapPin },
  ];

  return (
    <section id="contato" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeader
        eyebrow="Contato"
        title="Vamos conversar."
        description="Disponível para conversar sobre oportunidades em suporte de TI, helpdesk, atendimento técnico e desenvolvimento de sistemas."
      />
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <Reveal>
          <div className="border border-line bg-card p-6 sm:p-8">
            <h3 className="font-heading text-6xl uppercase leading-none">
              Informações
            </h3>
            <div className="mt-8 grid gap-4">
              {contacts.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 border-t border-line py-4 transition hover:text-brand"
                  >
                    <Icon className="h-5 w-5 text-brand" />
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="break-all">{item.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 border border-line bg-card p-6 sm:p-8"
            noValidate
          >
            {[
              { label: "Nome", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Assunto", name: "subject", type: "text" },
            ].map((field) => (
              <label key={field.name} className="grid gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  {field.label}
                </span>
                <input
                  {...register(field.name as keyof ContactForm)}
                  type={field.type}
                  className="h-12 border border-line bg-background px-4 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  aria-invalid={Boolean(errors[field.name as keyof ContactForm])}
                />
                {errors[field.name as keyof ContactForm] ? (
                  <span className="text-sm text-brand">
                    {errors[field.name as keyof ContactForm]?.message}
                  </span>
                ) : null}
              </label>
            ))}
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.18em]">
                Mensagem
              </span>
              <textarea
                {...register("message")}
                rows={6}
                className="resize-none border border-line bg-background p-4 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <span className="text-sm text-brand">{errors.message.message}</span>
              ) : null}
            </label>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-full bg-brand px-6 text-background hover:bg-hover"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar
            </Button>
            {sent ? (
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
                Cliente de email aberto com a mensagem preenchida.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
