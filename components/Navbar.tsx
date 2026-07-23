"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/portfolio";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

export function Navbar() {
  const ids = useMemo(
    () => navItems.map((item) => item.href.replace("#", "")),
    [],
  );
  const activeId = useScrollSpy(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-line/80 bg-background/88 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#inicio"
          className="font-heading text-3xl uppercase leading-none text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          aria-label="Ir para o início"
        >
          SL<span className="text-brand">.</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-line bg-card"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-line bg-card lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-background px-5 py-4 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-line bg-card px-4 py-3 font-mono text-xs uppercase tracking-[0.18em]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
