import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { id: "cover", label: "Overview" },
  { id: "summary", label: "Executive Summary" },
  { id: "radar", label: "UX Health Radar" },
  { id: "severity", label: "Severity Breakdown" },
  { id: "homepage", label: "Homepage Audit" },
  { id: "funnel", label: "Conversion Funnel" },
  { id: "ia", label: "Information Architecture" },
  { id: "accessibility", label: "Accessibility" },
  { id: "mobile", label: "Mobile UX" },
  { id: "trust", label: "Trust & Credibility" },
  { id: "cro", label: "CRO" },
  { id: "seo", label: "SEO" },
  { id: "roadmap", label: "Priority Roadmap" },
  { id: "matrix", label: "Impact Matrix" },
  { id: "projection", label: "Score Projection" },
];

export function SideNav() {
  const [active, setActive] = useState("cover");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(item.id);
          });
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="hidden lg:block sticky top-24 self-start">
      <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-4">
        Sections
      </div>
      <ul className="space-y-0.5">
        {items.map((item, idx) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "group flex items-center gap-3 py-1.5 text-small transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="tabular-nums text-caption opacity-60 w-5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
