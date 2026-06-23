export const meta = {
  client: "SA Wellness New York",
  url: "sawellnessnewyork.com",
  date: "June 2026",
  score: 61,
  verdict: "Promising Brand. Fundamentally Broken UX.",
};

export const summaryMetrics = [
  { label: "Usability", value: 64 },
  { label: "Accessibility", value: 52 },
  { label: "Performance", value: 78 },
  { label: "Conversion", value: 50 },
];

export const strengths = [
  "Strong South Asian positioning",
  "High-quality imagery & photography",
  "Solid mobile performance scores",
];

export const weaknesses = [
  "Hero clarity & value proposition unclear",
  "Broken conversion path to membership",
  "Multiple WCAG accessibility failures",
  "Weak trust signals beyond founder",
  "CTA redirection Issues",
  "Missing Alt Text",
  "Typography Hierarchy Imbalance(sizes, weights)",
  "No Direct Answer to User Problems",
  "Statistics Section Creates Confusion",
  "Social Media Section Appears Broken",
  "Testimonial Layout Needs Improvement",
  "Weak Visual Focus on Primary CTA",
  "No SEO & Blogs",
  "No FOunders Visibilty",
  "Weak NewYork positioning",
  "No certifications for users trust",
  "Images to be updated"
];

export const radarData = [
  { axis: "Usability", current: 64, target: 90 },
  { axis: "Accessibility", current: 52, target: 92 },
  { axis: "SEO", current: 64, target: 90 },
  { axis: "Mobile", current: 58, target: 88 },
  { axis: "Conversion", current: 50, target: 88 },
  { axis: "Trust", current: 52, target: 92 },
  { axis: "IA", current: 48, target: 90 },
];

export const severity = [
  { level: "critical", count: 4, label: "Critical", desc: "Blocks conversion or fails WCAG" },
  { level: "major", count: 8, label: "Major", desc: "Materially harms UX or trust" },
  { level: "minor", count: 12, label: "Minor", desc: "Polish & consistency issues" },
  { level: "opportunity", count: 10, label: "Opportunity", desc: "Growth & differentiation" },
] as const;

export type Hotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  severity: "critical" | "major" | "minor";
  problem: string;
  impact: string;
  recommendation: string;
};

export const hotspots: Hotspot[] = [
  {
    id: "01",
    x: 22,
    y: 18,
    title: "Hero Clarity",
    severity: "critical",
    problem:
      "Hero headline does not communicate who the service is for, what is offered, or the outcome. Visitors do not learn the brand promise within the 5-second test.",
    impact:
      "Estimated 30–40% of homepage visitors bounce without understanding the offering. Top-of-funnel comprehension below industry benchmark.",
    recommendation:
      "Rewrite hero to lead with audience + outcome: 'Functional medicine for South Asians in NYC. Reverse pre-diabetes, fatigue & PCOS — rooted in your biology.'",
  },
  {
    id: "02",
    x: 64,
    y: 32,
    title: "Broken Membership Form",
    severity: "critical",
    problem:
      "Primary CTA links to a Stripe page with no context, pricing tiers shown out of order, and a form field that silently fails validation on Safari.",
    impact:
      "Direct revenue loss. ~58/100 conversion score with measurable abandonment at the Stripe handoff.",
    recommendation:
      "Replace direct Stripe link with a guided consultation funnel (Calendly + qualification quiz). Defer payment to after the discovery call.",
  },
  {
    id: "03",
    x: 38,
    y: 58,
    title: "Weak Primary CTA",
    severity: "major",
    problem:
      "CTA copy reads 'Learn More' with low contrast (1.74:1) and competes with two equally-weighted secondary actions.",
    impact: "Ambiguous next step reduces click-through and dilutes funnel intent.",
    recommendation:
      "Single primary CTA: 'Book a free consultation' — high-contrast pill, paired with one passive secondary link.",
  },
  {
    id: "04",
    x: 78,
    y: 70,
    title: "No Trust Signals",
    severity: "major",
    problem:
      "Below the fold there are no testimonials, credentials, press mentions, or outcome data — only marketing copy.",
    impact:
      "Trust score 52 vs 92 benchmark. Visitors leave to verify credibility on third-party sites and don't return.",
    recommendation:
      "Add a trust strip: founder credentials, 3 outcome-based testimonials, press logos, and review schema.",
  },
  {
    id: "05",
    x: 16,
    y: 84,
    title: "Confusing Statistics",
    severity: "minor",
    problem:
      "Statistics block uses unsourced numbers ('80% feel better') without time frame, sample size, or citation.",
    impact: "Undermines clinical positioning and creates legal/regulatory risk.",
    recommendation:
      "Replace with cited outcomes: 'Avg HbA1c reduction of 1.2 across 142 members in 12 weeks (2025 cohort).'",
  },
];

export const accessibility = {
  errors: 16,
  alerts: 7,
  contrast: 48,
  structural: 19,
  score: 42,
  target: 92,
  contrastCurrent: "1.74:1",
  contrastRequired: "4.5:1",
};

export const mobile = {
  score: 58,
  target: 88,
  issues: [
    { label: "Small tap targets on primary CTA", severity: "major" as const },
    { label: "Tight navigation, no breathing room", severity: "minor" as const },
    { label: "Floating WhatsApp overlaps form fields", severity: "critical" as const },
    { label: "Hero text wraps awkwardly at 375px", severity: "minor" as const },
  ],
};

export const trust = [
  { label: "Mobile Experience", score: 3 },
  { label: "User Experience", score: 2 },
  { label: "User Interface", score: 2 },
  { label: "Media Mentions", score: 0 },
  { label: "Social Proof", score: 2 },
  { label: "Booking Flow", score: 2 },
];

export const seo = {
  score: 64,
  checklist: [
    { label: "Local SEO (geo pages, GBP optimisation)", status: "missing" as const },
    { label: "FAQ Schema", status: "missing" as const },
    { label: "Review Schema", status: "missing" as const },
    { label: "Blog (regular long-form publishing)", status: "missing" as const },
    { label: "Google Business Profile", status: "partial" as const },
    { label: "Meta titles & descriptions", status: "ok" as const },
    { label: "Page speed & Core Web Vitals", status: "ok" as const },
  ],
};

export const roadmap = [
  {
    phase: "Week 1",
    horizon: "Immediate",
    items: ["Fix Hero copy & hierarchy", "Fix membership form", "Fix primary CTA contrast", "Fix accessibility contrast failures"],
  },
  {
    phase: "Weeks 2–3",
    horizon: "Short term",
    items: ["Integrate Calendly consultation flow", "Reviews & testimonials strip", "Navigation IA restructure", "Add credentials & press"],
  },
  {
    phase: "Week 3–4",
    horizon: "Growth",
    items: ["Qualification quiz lead magnet", "Editorial blog cadence", "Local SEO (geo + schema)", "Member success stories", "Video testimonials"],
  },
];

export const matrix = [
  { id: "hero", label: "Rewrite Hero", effort: 1.5, impact: 9, quadrant: "quick" },
  { id: "cta", label: "Primary CTA fix", effort: 1, impact: 8, quadrant: "quick" },
  { id: "contrast", label: "Contrast fixes", effort: 1.5, impact: 6, quadrant: "quick" },
  { id: "calendly", label: "Consultation funnel", effort: 5, impact: 9.5, quadrant: "major" },
  { id: "quiz", label: "Qualification quiz", effort: 6, impact: 8.5, quadrant: "major" },
  { id: "blog", label: "Editorial blog", effort: 8, impact: 7, quadrant: "major" },
  { id: "schema", label: "FAQ / Review schema", effort: 3, impact: 4, quadrant: "fill" },
  { id: "footer", label: "Footer polish", effort: 2, impact: 2, quadrant: "fill" },
  { id: "press", label: "Press logos strip", effort: 2.5, impact: 3.5, quadrant: "fill" },
  { id: "video", label: "Hero video background", effort: 8.5, impact: 2, quadrant: "avoid" },
];

export const projection = [
  { phase: "Current", score: 61 },
  { phase: "Phase 1 — Week 1", score: 66 },
  { phase: "Phase 2 — Week 3", score: 78 },
  { phase: "Phase 3 — Week 4", score: 88 },
];
