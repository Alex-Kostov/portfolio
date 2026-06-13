# Personal Portfolio — Design Spec

**Date:** 2026-06-13
**Owner:** Aleksandar Kostov (Alex)
**Status:** Approved design → ready for implementation plan

## 1. Purpose

A single-page personal portfolio whose sole job is to **make a hiring manager or
recruiter think "this person is senior — let's talk."** Not a client-sales funnel, not
a blog. Quiet, confident, editorial.

**Success criteria:**

- A recruiter can, in under 60 seconds, understand who Alex is, what he does, his
  experience, and how to reach him.
- Looks polished and professional on first load; ages well; not "templatey."
- Loads fast, works on mobile, deploys to Vercel with one push.

## 2. Direction & aesthetic

**"Roman" touch (restrained):** classical serif display typography only — Cormorant for
the name and section headings. No Roman numerals, no laurel/column ornaments, nothing
flashy.

**Typography:**

- **Display / headings:** Cormorant (via `next/font/google`).
- **Body / UI:** a clean sans — Inter or Geist.
- **Micro-labels** (dates, tech tags): a monospace face, used sparingly as a subtle
  developer signature.

**Palette:**

- Light (default): warm off-white paper (~`#FAF8F4`), near-black ink text.
- Dark: deep near-black background, warm off-white text.
- **One accent color**, defined as a single CSS variable / Tailwind token so it can be
  changed in one place later. Initial pick: **oxblood / deep classical red**
  (`#7B2D26`-ish), with a muted-gold alternative noted in code as a comment. Alex was
  undecided; this is reversible by editing one token.

**Motion:** minimal — at most a gentle fade/slide-in on scroll. No gradients, no
parallax, no flashy animation.

## 3. Tech stack & architecture

Mirrors Alex's existing `wealthlens` setup so it's familiar and modern:

- **Next.js (App Router) + TypeScript (strict)** — latest stable.
- **Tailwind CSS v4** + **shadcn/ui** primitives (only the few needed: button, etc.).
- **next-themes** for the light/dark toggle (persisted, respects system preference).
- **next/font** for self-hosted Cormorant + sans (zero layout shift).
- **lucide-react** for icons (mail, GitHub, LinkedIn, sun/moon).
- **pnpm**, ESLint + Prettier, deploy target **Vercel**.
- Statically rendered — no backend, no API routes (contact is mailto + links).

**Structure (single page, anchored sections):**

```
app/
  layout.tsx            # fonts, ThemeProvider, metadata/SEO
  page.tsx              # composes the section components in order
  globals.css           # Tailwind + CSS variables (palette, accent token)
components/
  nav.tsx               # slim sticky top nav with anchor links + theme toggle
  theme-toggle.tsx
  sections/
    hero.tsx
    about.tsx
    experience.tsx
    skills.tsx
    projects.tsx
    contact.tsx
  ui/                   # shadcn primitives as needed
content/
  profile.ts            # name, title, location, bio, social links
  experience.ts         # typed array of roles
  projects.ts           # typed array of projects
  skills.ts             # typed grouped skills
lib/
  utils.ts
```

**Content-as-data principle:** all copy (bio, jobs, projects, skills) lives in typed
objects in `content/*.ts`. Updating the site later = editing one object, never touching
JSX. Each section component renders from its data file.

## 4. Page sections (top → bottom)

1. **Hero** — Name "Aleksandar Kostov" (Cormorant, large), role line, one-line pitch,
   "Sofia, Bulgaria." CTAs: Email (mailto), LinkedIn, GitHub. *(No CV download for now —
   omitted; can be added later.)*
2. **About** — first-person bio, 2–3 short paragraphs (draft below).
3. **Experience** — clean vertical list, most recent first: role · company · dates ·
   location/arrangement · 2–3 impact bullets. The recruiter's core read.
4. **Skills** — grouped tag rows.
5. **Projects** — featured project cards (one for now: WealthLens). Title, 1–2 line
   description, tech tags, GitHub link (live demo link when available).
6. **Contact** — short "let's talk" line, email (mailto) + LinkedIn/GitHub. Footer with
   © year + small "built with Next.js" note.

**Nav:** slim sticky top bar — name/initials left; anchor links (About · Experience ·
Projects · Contact) + theme toggle right. Smooth-scroll; no page reloads (this is the
"SPA" feel).

## 5. Content (real data)

**Identity:**

- Name: Aleksandar Kostov (Alex)
- Title: Full-Stack Developer — React, Next.js, Node.js, PHP · AI Integrations, LLM
  Applications & Automation
- Location: Sofia, Bulgaria
- LinkedIn: https://www.linkedin.com/in/aleksandar-kostov-5754121bb/
- GitHub: https://github.com/Alex-Kostov
- Email: alex89773@gmail.com (exposed via mailto link)

**Bio (DRAFT — Alex to refine; LinkedIn couldn't be auto-fetched):**

> I'm a full-stack developer based in Sofia, Bulgaria, with around five years of
> experience building products end to end — from WordPress and PHP early on to
> TypeScript-heavy React/Next.js frontends and Node.js services today. I've worked across
> fintech, crypto, and iGaming, shipping data-dense dashboards, enterprise tables, and API
> gateways used by quantitative and engineering teams.
>
> Lately I've focused on AI integrations and LLM-powered applications and automation —
> wiring language models into real products rather than demos. I care about typed,
> maintainable code and building things that hold up in production.

**Experience (from LinkedIn screenshot, most recent first):**

1. **Software Engineer — 90K Capital** · Full-time · Sep 2025 – Present · Sofia, Hybrid
   - _Bullets TBD (Alex to add). Tech: Next.js, React.js, +1._
2. **Software Engineer — Nexo** · Full-time · Mar 2024 – Aug 2025 (1 yr 6 mos) · Sofia,
   Hybrid
   - Built complex UIs with React, Next.js, TypeScript, TailwindCSS, shadcn/ui, and Redux,
     ensuring scalability and maintainability.
   - Developed Node.js/Express API gateways connecting front-end apps to backend services.
   - Designed reusable UI components, data-heavy dashboards, and complex AG Grid
     enterprise tables/charts to improve user workflows.
   - Applied strongly typed TypeScript, current React/Next.js patterns, and internal UI
     toolkit packages for cross-project consistency.
   - Collaborated closely with quantitative engineers and backend developers to translate
     requirements into reliable user-facing solutions. Agile workflow.
3. **Back-end Node.js / TypeScript Developer — Pateplay** · Full-time · Nov 2022 – Nov 2023
   (1 yr 1 mo) · Sofia, On-site
   - Developed internal platforms, iGaming products, and features.
   - Built and maintained server-side APIs with TypeScript, Node.js, and MySQL.
   - Assisted with front-end (React.js) development; wrote unit tests with Jest; fixed bugs
     reported in Jira.
   - Daily workflow with AWS CodeCommit, WebStorm, Jira, Confluence, Slack; followed the
     release and deployment process.
4. **Back-end Developer — DevriX** · Full-time · Jun 2021 – Oct 2022 (1 yr 5 mos) · Sofia
   - PHP web development for WordPress: theme/plugin modifications and plugin development.
   - JavaScript, jQuery, MySQL; WordPress Core contribution.
   - Built deployment pipelines via Buddy; daily workflow with Linux, Git, Asana, Slack.
   - Worked with Gutenberg, WooCommerce, WP Bakery, Classic Editor, WP Engine.
   - _(Preceded by a 3-month Back-end Developer internship at DevriX, Apr–Jun 2021 —
     optionally folded in or omitted.)_

**Skills (grouped):**

- **Frontend:** React, Next.js, TypeScript, React Native, TailwindCSS, shadcn/ui, Redux
- **Backend:** Node.js, Express, PHP
- **Data:** SQL/NoSQL databases & ORMs (e.g. Drizzle, Prisma), PostgreSQL, MySQL
- **CMS:** WordPress
- **AI:** LLM integrations, AI-powered automation

  _(Grouping is a starting structure; Alex can adjust labels/items in `content/skills.ts`.)_

**Projects:**

1. **WealthLens** — https://github.com/Alex-Kostov/wealthlens
   - Personal investment portfolio tracker for ETFs, stocks, options, gold, and
     multi-currency cash. Holdings, cost basis, and P&L are derived from an immutable
     transaction ledger; money handled with exact decimals; multi-currency with a
     pluggable FX provider; options "wheel" tracking; money-weighted IRR; 164 tests + CI.
   - Tech: Next.js (App Router), React, TypeScript, Drizzle ORM + PostgreSQL, Auth.js,
     shadcn/ui, AG Grid, Recharts, Vitest.
   - Links: GitHub repo (live demo "coming soon" per README).

## 6. Out of scope (explicitly deferred / excluded)

- **Blog / writing** — excluded.
- **Contact form** — excluded; contact via mailto + links only.
- **Booking / calendar** — excluded.
- **CV/PDF download** — deferred (Alex has no CV yet). Not built now.
- **Multi-language** — excluded for v1.
- **CMS** — not needed; content is typed data files.

## 7. Open items to resolve during/after build

- ~~**Email address** for the mailto link~~ — resolved: alex89773@gmail.com.
- **Bio** final wording (draft provided; refine, ideally with real LinkedIn detail).
- **90K Capital** role bullets.
- **Accent color** final decision (ships as oxblood; one-token change if disliked).
- DevriX internship: fold in as a sub-line or omit.
