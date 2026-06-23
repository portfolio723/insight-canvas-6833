import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Card,
  Section,
  SeverityBadge,
  MetricNumber,
  ProgressBar,
  StatLine,
} from "@/components/dashboard/primitives";
import { SideNav } from "@/components/dashboard/SideNav";
import {
  meta,
  summaryMetrics,
  strengths,
  weaknesses,
  radarData,
  severity,
  hotspots,
  type Hotspot,
  accessibility,
  mobile,
  trust,
  seo,
  roadmap,
  matrix,
  projection,
} from "@/components/dashboard/data";
import homepageImg from "@/assets/homepage-screenshot.jpg";
import mobileImg from "@/assets/mobile-screenshot.jpg";
import logoImg from "../assets/black.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UX Audit Dashboard — SA Wellness New York" },
      {
        name: "description",
        content:
          "Executive UX audit dashboard for SA Wellness New York: health score, severity breakdown, conversion funnel, accessibility, and priority roadmap.",
      },
      { property: "og:title", content: "UX Audit — SA Wellness New York" },
      {
        property: "og:description",
        content:
          "Interactive UX audit dashboard. Score 61/100. 4 critical issues, projected 92/100 after roadmap.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 pb-32">
        <Cover />
        <div className="mt-32 grid grid-cols-12 gap-10">
          <aside className="col-span-12 lg:col-span-3">
            <SideNav />
          </aside>
          <div className="col-span-12 lg:col-span-9 space-y-32">
            <ExecutiveSummary />
            <RadarSection />
            <SeveritySection />
            <HomepageSection />
            <FunnelSection />
            <IASection />
            <AccessibilitySection />
            <MobileSection />
            <TrustSection />
            <CROSection />
            <SEOSection />
            <RoadmapSection />
            <MatrixSection />
            <ProjectionSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="SA Wellness Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="text-small font-medium">UX Audit Dashboard</div>
          <span className="hidden sm:inline text-small text-muted-foreground">
            · {meta.client}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-caption uppercase tracking-[0.14em] text-muted-foreground">
          <span>{meta.date}</span>
          <span className="text-foreground">Web Anatomy</span>
        </div>
      </div>
    </header>
  );
}

function Cover() {
  return (
    <section id="cover" className="pt-20 md:pt-32 scroll-mt-24">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            UX Audit Report · {meta.date}
          </div>
          <h1 className="text-display text-foreground">
            {meta.client}
          </h1>
          <p className="text-small text-muted-foreground mt-3 font-mono">
            {meta.url}
          </p>
          <p className="text-body text-muted-foreground mt-10 max-w-xl">
            A research-driven assessment of usability, accessibility, conversion
            architecture, and trust. Findings are scored against industry
            benchmarks and prioritized by business impact.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#summary"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-small font-medium hover:opacity-90 transition-opacity"
            >
              View findings
              <span aria-hidden>→</span>
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-small font-medium hover:border-foreground/40 transition-colors"
            >
              Jump to roadmap
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
                UX Health Score
              </div>
              <SeverityBadge level="major">Needs work</SeverityBadge>
            </div>
            <div className="my-10">
              <div className="flex items-baseline gap-2">
                <span className="text-[120px] leading-none font-semibold tracking-[-0.05em] tabular-nums text-foreground">
                  {meta.score}
                </span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-body text-foreground mt-6 max-w-xs">
                {meta.verdict}
              </p>
            </div>
            <div>
              <ProgressBar value={meta.score} />
              <div className="mt-3 flex justify-between text-caption text-muted-foreground">
                <span>Below 70 · Red</span>
                <span>70–89 · Amber</span>
                <span>90+ · Green</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ExecutiveSummary() {
  return (
    <Section
      id="summary"
      eyebrow="02 · Executive Summary"
      title="Strong clinical positioning. Conversion architecture leaves money on the table."
      description="Four pillar scores benchmarked against best-in-class wellness sites. Performance is healthy; conversion and accessibility need direct intervention."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((m) => (
          <Card key={m.label} className="p-6">
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
              {m.label}
            </div>
            <MetricNumber value={m.value} size="md" />
            <div className="mt-6">
              <ProgressBar value={m.value} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card>
          <div className="text-caption uppercase tracking-[0.14em] text-success mb-6">
            Key Strengths
          </div>
          <ul className="space-y-4">
            {strengths.map((s) => (
              <li key={s} className="flex gap-3 text-body">
                <span className="text-success mt-1.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="text-caption uppercase tracking-[0.14em] text-critical mb-6">
            Key Weaknesses
          </div>
          <ul className="space-y-4">
            {weaknesses.map((w) => (
              <li key={w} className="flex gap-3 text-body">
                <span className="text-critical mt-1.5">✕</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function RadarSection() {
  return (
    <Section
      id="radar"
      eyebrow="03 · UX Health Radar"
      title="Where the site is, and where it should be."
      description="Seven UX dimensions plotted against the target state defined by industry benchmarks for premium clinical-wellness brands."
    >
      <Card className="p-4 md:p-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-center">
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="78%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: "var(--foreground)", fontSize: 13 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  stroke="var(--border)"
                />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="var(--muted-foreground)"
                  fill="var(--muted-foreground)"
                  fillOpacity={0.05}
                  strokeDasharray="3 3"
                />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="var(--foreground)"
                  fill="var(--foreground)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Current
              </div>
              <div className="text-h2 font-semibold tabular-nums">71</div>
            </div>
            <div>
              <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Target
              </div>
              <div className="text-h2 font-semibold tabular-nums text-success">
                92
              </div>
            </div>
            <div className="pt-6 border-t border-border space-y-2">
              <div className="flex items-center gap-2 text-small">
                <span className="w-3 h-0.5 bg-foreground" /> Current
              </div>
              <div className="flex items-center gap-2 text-small text-muted-foreground">
                <span className="w-3 h-px border-t border-dashed border-muted-foreground" />{" "}
                Target
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function SeveritySection() {
  return (
    <Section
      id="severity"
      eyebrow="04 · Severity Breakdown"
      title="34 findings, classified by business risk."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {severity.map((s) => (
          <Card key={s.label} interactive className="group">
            <div className="flex items-start justify-between mb-8">
              <SeverityBadge level={s.level as "critical" | "major" | "minor" | "opportunity"}>
                {s.label}
              </SeverityBadge>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                →
              </span>
            </div>
            <div className="text-[64px] leading-none font-semibold tabular-nums tracking-tighter">
              {s.count}
            </div>
            <p className="text-small text-muted-foreground mt-4">{s.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HomepageSection() {
  const [active, setActive] = useState<Hotspot | null>(hotspots[0]);
  return (
    <Section
      id="homepage"
      eyebrow="05 · Homepage Audit"
      title="The first 5 seconds, deconstructed."
      description="Click any marker to inspect the finding, business impact, and recommended fix."
    >
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <Card className="p-3 md:p-4 overflow-hidden">
          <div className="relative rounded-2xl overflow-hidden bg-muted border border-border">
            <img
              src={homepageImg}
              alt="Current homepage screenshot"
              width={1280}
              height={1600}
              loading="lazy"
              className="block w-full h-auto"
            />
            {hotspots.map((h) => (
              <button
                key={h.id}
                onClick={() => setActive(h)}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 group",
                )}
                aria-label={`Issue ${h.id}: ${h.title}`}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full animate-ping opacity-40",
                    h.severity === "critical" && "bg-critical",
                    h.severity === "major" && "bg-[color:var(--major)]",
                    h.severity === "minor" && "bg-minor",
                  )}
                />
                <span
                  className={cn(
                    "relative grid place-items-center w-9 h-9 rounded-full text-caption font-semibold text-white ring-4 ring-background transition-transform group-hover:scale-110",
                    active?.id === h.id && "scale-110",
                    h.severity === "critical" && "bg-critical",
                    h.severity === "major" && "bg-[color:var(--major)]",
                    h.severity === "minor" && "bg-minor",
                  )}
                >
                  {h.id}
                </span>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          {active && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <SeverityBadge level={active.severity}>
                  {active.severity}
                </SeverityBadge>
                <span className="text-caption text-muted-foreground tabular-nums">
                  Finding {active.id}
                </span>
              </div>
              <h3 className="text-h3">{active.title}</h3>
              <div className="mt-8 space-y-6">
                <Field label="Problem">{active.problem}</Field>
                <Field label="Impact">{active.impact}</Field>
                <Field label="Recommendation">{active.recommendation}</Field>
              </div>
            </Card>
          )}
          <Card className="p-4">
            <div className="flex flex-wrap gap-1">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActive(h)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-small transition-colors",
                    active?.id === h.id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60",
                  )}
                >
                  <span className="tabular-nums text-caption opacity-70">
                    {h.id}
                  </span>
                  {h.title}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
        {label}
      </div>
      <p className="text-body text-foreground">{children}</p>
    </div>
  );
}

function FunnelSection() {
  const currentSteps = ["Homepage", "Membership", "Stripe", "Unknown"];
  const recSteps = [
    "Homepage",
    "Consultation",
    "Calendly",
    "Assessment",
    "Confirmation",
    "Consultation Call",
  ];
  return (
    <Section
      id="funnel"
      eyebrow="06 · Conversion Funnel Audit"
      title="The current path asks for payment before earning trust."
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-8">
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
              Current funnel
            </div>
            <SeverityBadge level="critical">High dropoff risk</SeverityBadge>
          </div>
          <FunnelList steps={currentSteps} tone="critical" />
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-8">
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
              Recommended funnel
            </div>
            <SeverityBadge level="success">Trust-led</SeverityBadge>
          </div>
          <FunnelList steps={recSteps} tone="success" />
        </Card>
      </div>
      <Card className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
            Expected conversion gain
          </div>
          <div className="text-h2 text-success font-semibold">+30% to +45%</div>
        </div>
        <p className="text-body text-muted-foreground max-w-md">
          Modelled from category benchmarks: replacing direct-pay with a
          qualification + consultation flow consistently lifts paid conversion
          and reduces refund rate.
        </p>
      </Card>
    </Section>
  );
}

function FunnelList({
  steps,
  tone,
}: {
  steps: string[];
  tone: "critical" | "success";
}) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={step}>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/60">
            <span className="text-caption tabular-nums text-muted-foreground w-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-body font-medium flex-1">{step}</span>
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                tone === "critical" ? "bg-critical/50" : "bg-success/60",
              )}
            />
          </div>
          {i < steps.length - 1 && (
            <div className="ml-7 my-1 h-4 w-px bg-border" />
          )}
        </li>
      ))}
    </ol>
  );
}

function IASection() {
  const current = ["Home", "About", "Membership", "Programs", "Blog", "Contact", "Login"];
  const recommended = [
    { group: "Clinical Services", items: ["Pre-Diabetes", "PCOS", "Fatigue", "Longevity"] },
    { group: "Resources", items: ["Blog", "Assessment Quiz", "Success Stories"] },
    { group: "Company", items: ["About", "Founder", "Press", "Contact"] },
    { group: "Book Consultation", items: [] },
  ];
  return (
    <Section
      id="ia"
      eyebrow="07 · Information Architecture"
      title="Flat list vs. clinical hierarchy."
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-8">
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
              Before
            </div>
            <SeverityBadge level="major">Flat & ambiguous</SeverityBadge>
          </div>
          <ul className="flex flex-wrap gap-2">
            {current.map((c) => (
              <li
                key={c}
                className="px-3 py-2 rounded-xl border border-border text-small"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="text-small text-muted-foreground mt-8">
            No grouping signals clinical depth. "Membership" leads with
            commitment instead of education.
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-8">
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
              After
            </div>
            <SeverityBadge level="success">Structured</SeverityBadge>
          </div>
          <ul className="space-y-4">
            {recommended.map((g) => (
              <li key={g.group}>
                <div className="text-small font-medium">{g.group}</div>
                {g.items.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="px-2.5 py-1 rounded-lg bg-muted text-caption text-muted-foreground"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function AccessibilitySection() {
  return (
    <Section
      id="accessibility"
      eyebrow="08 · Accessibility (WCAG 2.2 AA)"
      title="Failing in places that matter for clinical credibility."
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            Accessibility Score
          </div>
          <MetricNumber value={accessibility.score} size="xl" />
          <div className="mt-6">
            <ProgressBar value={accessibility.score} />
          </div>
          <StatLine
            label="Target"
            value={`${accessibility.target}+`}
            tone="success"
          />
        </Card>

        <Card className="lg:col-span-2">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            WCAG dashboard
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <KpiTile value={accessibility.errors} label="Errors" tone="critical" />
            <KpiTile value={accessibility.alerts} label="Alerts" tone="major" />
            <KpiTile
              value={accessibility.contrast}
              label="Contrast Issues"
              tone="critical"
            />
            <KpiTile
              value={accessibility.structural}
              label="Structural"
              tone="major"
            />
          </div>
          <div className="mt-10 p-6 rounded-2xl bg-muted/60">
            <div className="flex items-center justify-between mb-3">
              <div className="text-small font-medium">Primary CTA contrast</div>
              <SeverityBadge level="critical">FAIL</SeverityBadge>
            </div>
            <div className="flex items-baseline gap-8 mt-6">
              <div>
                <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
                  Current
                </div>
                <div className="text-h3 text-critical font-semibold tabular-nums mt-1">
                  {accessibility.contrastCurrent}
                </div>
              </div>
              <div className="text-2xl text-muted-foreground">→</div>
              <div>
                <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
                  WCAG AA Required
                </div>
                <div className="text-h3 text-success font-semibold tabular-nums mt-1">
                  {accessibility.contrastRequired}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function KpiTile({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: "critical" | "major" | "success" | "minor";
}) {
  const tones: Record<string, string> = {
    critical: "text-critical",
    major: "text-[color:var(--major)]",
    success: "text-success",
    minor: "text-minor",
  };
  return (
    <div>
      <div className={cn("text-h2 font-semibold tabular-nums", tones[tone])}>
        {value}
      </div>
      <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mt-2">
        {label}
      </div>
    </div>
  );
}

function MobileSection() {
  return (
    <Section
      id="mobile"
      eyebrow="09 · Mobile UX"
      title="Fast on mobile, but tap targets fight the user."
    >
      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <Card className="p-6 flex justify-center bg-muted/40">
          <div className="rounded-[36px] border-8 border-foreground/90 overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
            <img
              src={mobileImg}
              alt="Mobile homepage screenshot"
              width={280}
              height={580}
              loading="lazy"
              className="block w-[240px] h-auto"
            />
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
                  Mobile UX Score
                </div>
                <div className="mt-3">
                  <MetricNumber value={mobile.score} size="lg" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
                  Target
                </div>
                <div className="text-h3 text-success font-semibold tabular-nums mt-2">
                  {mobile.target}+
                </div>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar value={mobile.score} />
            </div>
          </Card>

          <Card>
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
              Top mobile findings
            </div>
            <ul className="space-y-1">
              {mobile.issues.map((i) => (
                <li
                  key={i.label}
                  className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0"
                >
                  <span className="text-body">{i.label}</span>
                  <SeverityBadge level={i.severity}>{i.severity}</SeverityBadge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function TrustSection() {
  return (
    <Section
      id="trust"
      eyebrow="10 · Trust & Credibility"
      title="The founder carries the brand. Everything else is thin."
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <Card>
          <ul className="divide-y divide-border">
            {trust.map((t) => (
              <li
                key={t.label}
                className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0"
              >
                <span className="text-body">{t.label}</span>
                <Stars value={t.score} />
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex flex-col justify-between">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
            Opportunity score
          </div>
          <div className="my-8">
            <div className="flex items-baseline gap-3">
              <span className="text-h1 font-semibold tabular-nums">78</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-h1 font-semibold text-success tabular-nums">
                95
              </span>
            </div>
            <p className="text-small text-muted-foreground mt-3">
              Achievable with credentials, press, and outcome testimonials.
            </p>
          </div>
          <ProgressBar value={78} />
        </Card>
      </div>
    </Section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5 tabular-nums">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "text-lg",
            i < value ? "text-foreground" : "text-border",
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CROSection() {
  const leaks = ["No Lead Magnet", "No Quiz", "No Discovery Call", "No Urgency", "No Funnel"];
  return (
    <Section
      id="cro"
      eyebrow="11 · Conversion Rate Optimization"
      title="Five revenue leaks. All addressable in 6 weeks."
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            CRO Score
          </div>
          <MetricNumber value={58} size="xl" />
          <div className="mt-6">
            <ProgressBar value={58} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            Revenue leaks
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {leaks.map((l) => (
              <li
                key={l}
                className="flex items-center gap-3 p-4 rounded-2xl bg-muted/60"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-critical" />
                <span className="text-body">{l}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-3">
          <div className="grid sm:grid-cols-3 gap-10 items-end">
            <div>
              <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Current monthly leads
              </div>
              <div className="text-h2 font-semibold tabular-nums">100</div>
            </div>
            <div>
              <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Projected
              </div>
              <div className="text-h2 font-semibold text-success tabular-nums">
                145
              </div>
            </div>
            <div>
              <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Lift
              </div>
              <div className="text-h2 font-semibold text-success tabular-nums">
                +45%
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-1.5">
            <div className="h-2 rounded-full bg-foreground" style={{ width: "40%" }} />
            <div className="h-2 rounded-full bg-success" style={{ width: "18%" }} />
            <div className="h-2 rounded-full bg-muted flex-1" />
          </div>
        </Card>
      </div>
    </Section>
  );
}

function SEOSection() {
  const statusBadge: Record<string, { level: "critical" | "major" | "success"; label: string }> = {
    missing: { level: "critical", label: "Missing" },
    partial: { level: "major", label: "Partial" },
    ok: { level: "success", label: "OK" },
  };
  return (
    <Section
      id="seo"
      eyebrow="12 · SEO"
      title="Technically passable. Strategically invisible."
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            SEO Score
          </div>
          <MetricNumber value={seo.score} size="xl" />
          <div className="mt-6">
            <ProgressBar value={seo.score} />
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
            Strategic checklist
          </div>
          <ul className="divide-y divide-border">
            {seo.checklist.map((c) => {
              const b = statusBadge[c.status];
              return (
                <li
                  key={c.label}
                  className="flex items-center justify-between gap-6 py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-body">{c.label}</span>
                  <SeverityBadge level={b.level}>{b.label}</SeverityBadge>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function RoadmapSection() {
  return (
    <Section
      id="roadmap"
      eyebrow="13 · Priority Roadmap"
      title="Sequenced for compounding impact."
    >
      <div className="space-y-4">
        {roadmap.map((p, i) => (
          <Card key={p.phase}>
            <div className="grid md:grid-cols-[200px_120px_1fr] gap-6 items-start">
              <div>
                <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Phase {i + 1}
                </div>
                <div className="text-h3 font-semibold">{p.phase}</div>
              </div>
              <div>
                <SeverityBadge
                  level={
                    i === 0 ? "critical" : i === 1 ? "major" : "minor"
                  }
                >
                  {p.horizon}
                </SeverityBadge>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-body">
                    <span className="mt-2 w-1 h-1 rounded-full bg-foreground" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function MatrixSection() {
  // 10 effort scale, 10 impact scale
  const quadLabels = [
    { id: "quick", label: "Quick Wins", x: "0%", y: "0%", tone: "text-success" },
    { id: "major", label: "Major Projects", x: "50%", y: "0%", tone: "text-foreground" },
    { id: "fill", label: "Fill-ins", x: "0%", y: "50%", tone: "text-muted-foreground" },
    { id: "avoid", label: "Avoid", x: "50%", y: "50%", tone: "text-critical" },
  ];
  return (
    <Section
      id="matrix"
      eyebrow="14 · Impact Matrix"
      title="Effort vs. business impact."
    >
      <Card>
        <div className="grid md:grid-cols-[1fr_240px] gap-8">
          <div className="relative aspect-square w-full max-w-[560px] mx-auto">
            {/* Grid */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {quadLabels.map((q) => (
                <div
                  key={q.id}
                  className="border border-border first:rounded-tl-2xl"
                />
              ))}
            </div>
            {/* Quadrant labels */}
            {quadLabels.map((q) => (
              <div
                key={q.id}
                className={cn(
                  "absolute text-caption uppercase tracking-[0.14em] p-3",
                  q.tone,
                )}
                style={{ left: q.x, top: q.y }}
              >
                {q.label}
              </div>
            ))}
            {/* Axes labels */}
            <div className="absolute -bottom-7 left-0 right-0 flex justify-between text-caption text-muted-foreground">
              <span>Low effort</span>
              <span>High effort →</span>
            </div>
            <div className="absolute top-0 -left-7 bottom-0 flex flex-col justify-between text-caption text-muted-foreground rotate-180 [writing-mode:vertical-rl]">
              <span>Low impact</span>
              <span>High impact →</span>
            </div>
            {/* Dots */}
            {matrix.map((m) => (
              <div
                key={m.id}
                className="absolute group"
                style={{
                  left: `${(m.effort / 10) * 100}%`,
                  top: `${100 - (m.impact / 10) * 100}%`,
                }}
              >
                <div
                  className={cn(
                    "w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background transition-transform group-hover:scale-150",
                    m.quadrant === "quick" && "bg-success",
                    m.quadrant === "major" && "bg-foreground",
                    m.quadrant === "fill" && "bg-muted-foreground",
                    m.quadrant === "avoid" && "bg-critical",
                  )}
                />
                <div className="absolute left-3 top-1 whitespace-nowrap text-caption text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background px-2 py-1 rounded-md border border-border">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground mb-6">
              Recommendations
            </div>
            <ul className="space-y-3 text-small">
              {matrix.map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      m.quadrant === "quick" && "bg-success",
                      m.quadrant === "major" && "bg-foreground",
                      m.quadrant === "fill" && "bg-muted-foreground",
                      m.quadrant === "avoid" && "bg-critical",
                    )}
                  />
                  <span className="flex-1">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function ProjectionSection() {
  const max = 100;
  return (
    <Section
      id="projection"
      eyebrow="15 · Final Score Projection"
      title="From 71 to 92 in three phases."
    >
      <Card>
        <div className="grid sm:grid-cols-4 gap-6">
          {projection.map((p, i) => {
            const isLast = i === projection.length - 1;
            const isFirst = i === 0;
            return (
              <div key={p.phase} className="relative">
                <div className="text-caption uppercase tracking-[0.14em] text-muted-foreground">
                  {p.phase}
                </div>
                <div
                  className={cn(
                    "mt-6 text-[64px] leading-none font-semibold tabular-nums tracking-tighter",
                    isLast
                      ? "text-success"
                      : isFirst
                        ? "text-foreground"
                        : "text-foreground",
                  )}
                >
                  {p.score}
                </div>
                <div className="text-muted-foreground text-small mt-1">
                  /{max}
                </div>
                <div className="mt-6">
                  <ProgressBar value={p.score} />
                </div>
                {!isLast && (
                  <div className="hidden sm:block absolute -right-3 top-12 text-muted-foreground">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-body text-muted-foreground max-w-xl">
            Projection assumes full execution of Phase 1 fixes, Phase 2
            consultation funnel rollout, and Phase 3 content + local SEO
            cadence. Modeled against industry benchmarks for clinical-wellness
            sites.
          </p>
          <a
            href="#cover"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-small font-medium hover:opacity-90 transition-opacity"
          >
            Back to overview ↑
          </a>
        </div>
      </Card>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-12 flex flex-row md:flex-row justify-between gap-6 text-small text-muted-foreground">
      
       
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="SA Wellness Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          UX Audit · {meta.client} · {meta.date}
        </div>
        <div className="flex items-center gap-6">
          <span>Research-driven · Evidence-based</span>
          <span className="text-foreground">Web Anatomy </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
       Web Anatomy © {new Date().getFullYear()} UX Audit Report. All rights reserved.
      </div>
      
    </footer>
  );
}
