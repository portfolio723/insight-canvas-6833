import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="mb-12 max-w-3xl">
        <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-4">
          {eyebrow}
        </div>
        <h2 className="text-h2 text-foreground">{title}</h2>
        {description && (
          <p className="text-body text-muted-foreground mt-4">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
  as: As = "div",
  interactive = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "button";
  interactive?: boolean;
  onClick?: () => void;
}) {
  return (
    <As
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-3xl p-8 text-left w-full",
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function SeverityBadge({
  level,
  children,
}: {
  level: "critical" | "major" | "minor" | "success" | "opportunity";
  children: ReactNode;
}) {
  const colors: Record<string, string> = {
    critical: "bg-critical/10 text-critical",
    major: "bg-major/10 text-[color:var(--major)]",
    minor: "bg-minor/10 text-minor",
    success: "bg-success/10 text-success",
    opportunity: "bg-muted text-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption uppercase tracking-[0.12em] font-medium",
        colors[level],
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          level === "critical" && "bg-critical",
          level === "major" && "bg-[color:var(--major)]",
          level === "minor" && "bg-minor",
          level === "success" && "bg-success",
          level === "opportunity" && "bg-foreground",
        )}
      />
      {children}
    </span>
  );
}

export function MetricNumber({
  value,
  total = 100,
  size = "lg",
}: {
  value: number;
  total?: number;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-7xl md:text-8xl",
  };
  const color =
    value >= 90
      ? "text-success"
      : value >= 70
        ? "text-[color:var(--major)]"
        : "text-critical";
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        className={cn(
          "font-semibold tabular-nums tracking-tighter",
          sizes[size],
          color,
        )}
      >
        {value}
      </span>
      <span className="text-muted-foreground text-lg">/{total}</span>
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  tone = "auto",
}: {
  value: number;
  max?: number;
  tone?: "auto" | "neutral";
}) {
  const pct = Math.min(100, (value / max) * 100);
  const color =
    tone === "neutral"
      ? "bg-foreground"
      : value >= 90
        ? "bg-success"
        : value >= 70
          ? "bg-[color:var(--major)]"
          : "bg-critical";
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-700", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function StatLine({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "critical" | "major" | "success" | "minor";
}) {
  const toneClass: Record<string, string> = {
    critical: "text-critical",
    major: "text-[color:var(--major)]",
    success: "text-success",
    minor: "text-minor",
  };
  return (
    <div className="flex items-baseline justify-between gap-6 py-3 border-b border-border last:border-0">
      <span className="text-small text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-small font-medium tabular-nums",
          tone && toneClass[tone],
        )}
      >
        {value}
      </span>
    </div>
  );
}
