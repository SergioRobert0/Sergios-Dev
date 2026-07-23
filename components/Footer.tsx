"use client";

import { ArrowUp, BriefcaseBusiness, GitBranch, Mail } from "lucide-react";

import { profile } from "@/constants/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-4xl uppercase">
            Sérgio Roberto Loyola<span className="text-brand">.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { href: profile.github, icon: GitBranch, label: "GitHub" },
            { href: profile.linkedin, icon: BriefcaseBusiness, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={item.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card transition hover:bg-foreground hover:text-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <a
            href="#inicio"
            aria-label="Voltar ao topo"
            className="grid h-10 w-10 place-items-center rounded-full bg-brand text-background transition hover:bg-hover"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
