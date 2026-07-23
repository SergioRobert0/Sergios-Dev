import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 border-t border-line pt-6", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-brand">
        {eyebrow}
      </p>
      <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
        <h2 className="font-heading text-6xl uppercase leading-[0.88] text-foreground sm:text-7xl lg:text-8xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
