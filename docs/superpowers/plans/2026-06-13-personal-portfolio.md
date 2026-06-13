# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page, minimal-editorial personal portfolio for Aleksandar Kostov that presents his bio, experience, skills, and projects to potential employers, with a light/dark theme toggle.

**Architecture:** Statically-rendered Next.js (App Router) single page composed of independent section components. All copy lives in typed `content/*.ts` data files; section components render from that data. No backend — contact is mailto + links. Light "paper" theme by default with a `next-themes` dark toggle. Classical serif (Cormorant) display type, Geist sans body, Geist mono micro-labels, one configurable accent color defined as a single CSS token.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · next-themes · next/font (Cormorant + Geist) · lucide-react · Vitest + React Testing Library + jsdom · pnpm · Vercel.

**Reference spec:** `docs/superpowers/specs/2026-06-13-personal-portfolio-design.md`

**Conventions for the executor:**
- Working directory is the repo root: `C:\Users\alex8\code\portfolio`. Git is already initialized (branch `main`) with the spec committed; do NOT re-init git.
- Use the **Bash** tool for shell commands (POSIX syntax shown below). Commit with an explicit identity if git complains: `git -c user.name="Aleksandar Kostov" -c user.email="alex89773@gmail.com" commit ...`.
- The accent color must remain a **single-token change**. Never hardcode the accent hex anywhere except the one `--color-accent` definition in `app/globals.css`.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root layout: fonts, `<html>`, ThemeProvider, site metadata/SEO |
| `app/page.tsx` | Composes section components in order |
| `app/globals.css` | Tailwind import, theme tokens (palette + accent), light/dark variables |
| `components/theme-provider.tsx` | Wraps `next-themes` provider |
| `components/theme-toggle.tsx` | Sun/moon button toggling theme |
| `components/nav.tsx` | Sticky top nav: name + anchor links + theme toggle |
| `components/section.tsx` | Shared section wrapper (id anchor, heading, spacing) |
| `components/sections/hero.tsx` | Name, role, pitch, location, contact CTAs |
| `components/sections/about.tsx` | Bio paragraphs |
| `components/sections/experience.tsx` | Work history list |
| `components/sections/skills.tsx` | Grouped skill tags |
| `components/sections/projects.tsx` | Project cards |
| `components/sections/contact.tsx` | Contact line + links + footer |
| `content/profile.ts` | name, title, pitch, location, email, social links, bio |
| `content/experience.ts` | typed array of roles |
| `content/skills.ts` | typed grouped skills |
| `content/projects.ts` | typed array of projects |
| `content/types.ts` | shared TS types for content |
| `lib/utils.ts` | `cn()` class-merge helper |
| `vitest.config.ts`, `vitest.setup.ts` | test runner config |

---

## Task 1: Scaffold the Next.js app

**Files:**
- Create: entire Next.js scaffold (package.json, tsconfig, app/, etc.)

The repo root already contains `.git/`, `.gitignore`, and `docs/`. `create-next-app` refuses a directory that contains a `docs/` folder, so scaffold into a temp subfolder and move the files up (keeping our existing git).

- [ ] **Step 1: Scaffold into a temp folder (non-interactive)**

Run:
```bash
pnpm create next-app@latest _scaffold \
  --ts --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*" --use-pnpm --turbopack --disable-git --yes
```
Expected: completes and creates `_scaffold/` with a Next.js 16 app. (`--disable-git` prevents a nested repo; `--yes` accepts defaults.)

- [ ] **Step 2: Move scaffold contents into the repo root, then remove temp**

Run:
```bash
# move regular + dotfiles, but never the scaffold's node_modules or any .git
shopt -s dotglob
for f in _scaffold/*; do
  base=$(basename "$f")
  [ "$base" = "node_modules" ] && continue
  [ "$base" = ".git" ] && continue
  mv "$f" .
done
shopt -u dotglob
rm -rf _scaffold
ls -a
```
Expected: root now has `app/`, `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, etc., alongside the existing `docs/` and `.git/`. If the scaffold wrote its own `.gitignore`, that's fine — it supersedes ours and already ignores `node_modules/.next/`.

- [ ] **Step 3: Install dependencies**

Run:
```bash
pnpm install
```
Expected: installs cleanly, creates `pnpm-lock.yaml`.

- [ ] **Step 4: Verify dev build compiles**

Run:
```bash
pnpm build
```
Expected: `✓ Compiled successfully`. If the default scaffold page builds, the toolchain works.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js app (App Router, TS, Tailwind v4)"
```

---

## Task 2: Add dependencies and test tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `vitest.setup.ts`

- [ ] **Step 1: Install runtime + dev dependencies**

Run:
```bash
pnpm add next-themes lucide-react clsx tailwind-merge
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
Expected: all install; `next-themes@0.4.x`, `vitest@^3` resolve.

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: Create the Vitest setup file**

Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add test scripts to package.json**

In `package.json` `"scripts"`, add:
```json
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
```

- [ ] **Step 5: Verify the test runner starts (no tests yet is OK)**

Run:
```bash
pnpm test
```
Expected: Vitest runs and reports "No test files found" (exit may be non-zero with that message — acceptable here; the next task adds a real test).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add deps (next-themes, lucide, tailwind-merge) and Vitest setup"
```

---

## Task 3: Theme tokens, fonts, and global CSS

**Files:**
- Modify: `app/globals.css`
- Create: `lib/utils.ts`

- [ ] **Step 1: Create the class-merge helper**

Create `lib/utils.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Write globals.css with the palette + single accent token**

Replace the entire contents of `app/globals.css` with:
```css
@import "tailwindcss";

/* Dark mode is class-driven via next-themes (attribute="class"). */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Light "paper" theme (default) */
  --background: #faf8f4;
  --foreground: #1a1714;
  --muted: #6b6258;
  --border: #e6e0d6;
  --card: #fffdf9;
}

.dark {
  --background: #14110e;
  --foreground: #f3efe8;
  --muted: #9a9183;
  --border: #2a2521;
  --card: #1c1814;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-card: var(--card);

  /* ── ACCENT: change this ONE line to recolor the whole site ──
     Default: oxblood. Alternative (muted gold): #B08D2E */
  --color-accent: #7b2d26;

  --font-serif: var(--font-cormorant);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Respect users who prefer no motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 3: Wire fonts in the root layout**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aleksandar Kostov — Full-Stack Developer",
  description:
    "Full-Stack Developer in Sofia, Bulgaria — React, Next.js, Node.js, PHP, and AI/LLM integrations.",
  openGraph: {
    title: "Aleksandar Kostov — Full-Stack Developer",
    description:
      "Full-Stack Developer in Sofia, Bulgaria — React, Next.js, Node.js, PHP, and AI/LLM integrations.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

Note: `components/theme-provider.tsx` is created in Task 4 — the build will fail until then; that's expected and resolved next task.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add theme tokens, palette, fonts, and cn() helper"
```

---

## Task 4: Theme provider and toggle

**Files:**
- Create: `components/theme-provider.tsx`, `components/theme-toggle.tsx`, `components/theme-toggle.test.tsx`

- [ ] **Step 1: Create the theme provider**

Create `components/theme-provider.tsx`:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 2: Write the failing test for the toggle**

Create `components/theme-toggle.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  it("renders an accessible toggle button", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle (theme|dark mode)/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `pnpm test theme-toggle`
Expected: FAIL — cannot resolve `./theme-toggle`.

- [ ] **Step 4: Implement the toggle**

Create `components/theme-toggle.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground"
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm test theme-toggle`
Expected: PASS.

- [ ] **Step 6: Verify the full build now compiles**

Run: `pnpm build`
Expected: `✓ Compiled successfully` (layout’s ThemeProvider import now resolves).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add theme provider and accessible dark-mode toggle"
```

---

## Task 5: Content types and data files

**Files:**
- Create: `content/types.ts`, `content/profile.ts`, `content/experience.ts`, `content/skills.ts`, `content/projects.ts`, `content/content.test.ts`

- [ ] **Step 1: Define content types**

Create `content/types.ts`:
```ts
export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  pitch: string;
  location: string;
  email: string;
  socials: SocialLink[];
  bio: string[];
}

export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  arrangement: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
}
```

- [ ] **Step 2: Create the profile data**

Create `content/profile.ts`:
```ts
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Aleksandar Kostov",
  shortName: "Alex Kostov",
  title:
    "Full-Stack Developer — React, Next.js, Node.js, PHP · AI Integrations, LLM Applications & Automation",
  pitch:
    "I build products end to end and wire language models into them — typed, maintainable, and production-ready.",
  location: "Sofia, Bulgaria",
  email: "alex89773@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aleksandar-kostov-5754121bb/" },
    { label: "GitHub", href: "https://github.com/Alex-Kostov" },
  ],
  bio: [
    "I'm a full-stack developer based in Sofia, Bulgaria, with around five years of experience building products end to end — from WordPress and PHP early on to TypeScript-heavy React/Next.js frontends and Node.js services today. I've worked across fintech, crypto, and iGaming, shipping data-dense dashboards, enterprise tables, and API gateways used by quantitative and engineering teams.",
    "Lately I've focused on AI integrations and LLM-powered applications and automation — wiring language models into real products rather than demos. I care about typed, maintainable code and building things that hold up in production.",
  ],
};
```

- [ ] **Step 3: Create the experience data**

Create `content/experience.ts`:
```ts
import type { Role } from "./types";

export const experience: Role[] = [
  {
    company: "90K Capital",
    title: "Software Engineer",
    start: "Sep 2025",
    end: "Present",
    location: "Sofia, Bulgaria",
    arrangement: "Hybrid",
    bullets: [
      "Full-stack engineering with Next.js and React.js.",
    ],
  },
  {
    company: "Nexo",
    title: "Software Engineer",
    start: "Mar 2024",
    end: "Aug 2025",
    location: "Sofia, Bulgaria",
    arrangement: "Hybrid",
    bullets: [
      "Built complex UIs with React, Next.js, TypeScript, TailwindCSS, shadcn/ui, and Redux, ensuring scalability and maintainability.",
      "Developed Node.js/Express API gateways connecting front-end applications to backend services.",
      "Designed reusable UI components, data-heavy dashboards, and complex AG Grid enterprise tables and charts to improve user workflows.",
      "Collaborated with quantitative engineers and backend developers to translate requirements into reliable user-facing solutions in an Agile workflow.",
    ],
  },
  {
    company: "Pateplay",
    title: "Back-end Node.js / TypeScript Developer",
    start: "Nov 2022",
    end: "Nov 2023",
    location: "Sofia, Bulgaria",
    arrangement: "On-site",
    bullets: [
      "Developed internal platforms, iGaming products, and features.",
      "Built and maintained server-side APIs with TypeScript, Node.js, and MySQL.",
      "Assisted with React.js front-end development, wrote unit tests with Jest, and fixed bugs reported in Jira.",
      "Followed the release and deployment process using AWS CodeCommit, WebStorm, Jira, Confluence, and Slack.",
    ],
  },
  {
    company: "DevriX",
    title: "Back-end Developer",
    start: "Jun 2021",
    end: "Oct 2022",
    location: "Sofia, Bulgaria",
    arrangement: "Full-time",
    bullets: [
      "PHP web development for WordPress: theme and plugin modifications, plugin development, and WordPress Core contribution.",
      "Built deployment pipelines via Buddy; daily workflow with Linux, Git, Asana, and Slack.",
      "Worked across Gutenberg, WooCommerce, WP Bakery, Classic Editor, and WP Engine using JavaScript, jQuery, and MySQL.",
    ],
  },
];
```

- [ ] **Step 4: Create the skills data**

Create `content/skills.ts`:
```ts
import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "React Native", "TailwindCSS", "shadcn/ui", "Redux"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PHP"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Prisma", "SQL & NoSQL"],
  },
  {
    label: "CMS",
    items: ["WordPress"],
  },
  {
    label: "AI",
    items: ["LLM integrations", "AI-powered automation"],
  },
];
```

- [ ] **Step 5: Create the projects data**

Create `content/projects.ts`:
```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "WealthLens",
    description:
      "A personal investment portfolio tracker for ETFs, stocks, options, gold, and multi-currency cash. Holdings, cost basis, and P&L are derived from an immutable transaction ledger; money is handled with exact decimals; multi-currency via a pluggable FX provider; options-wheel tracking and money-weighted IRR. 164 tests with CI.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Auth.js",
      "shadcn/ui",
      "AG Grid",
      "Recharts",
      "Vitest",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Alex-Kostov/wealthlens" }],
  },
];
```

- [ ] **Step 6: Write a test asserting content integrity**

Create `content/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { profile } from "./profile";
import { experience } from "./experience";
import { skills } from "./skills";
import { projects } from "./projects";

describe("content data", () => {
  it("has a profile with email and at least one social link", () => {
    expect(profile.email).toContain("@");
    expect(profile.socials.length).toBeGreaterThan(0);
    expect(profile.bio.length).toBeGreaterThan(0);
  });

  it("lists experience newest-first with non-empty bullets", () => {
    expect(experience.length).toBeGreaterThanOrEqual(4);
    expect(experience[0].end).toBe("Present");
    for (const role of experience) {
      expect(role.company).not.toBe("");
      expect(role.bullets.length).toBeGreaterThan(0);
    }
  });

  it("has skill groups and at least one project", () => {
    expect(skills.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].links.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `pnpm test content`
Expected: PASS (3 tests).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add typed content data files (profile, experience, skills, projects)"
```

---

## Task 6: Shared Section wrapper

**Files:**
- Create: `components/section.tsx`

- [ ] **Step 1: Implement the Section wrapper**

Create `components/section.tsx`:
```tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-16 md:py-24", className)}
    >
      {title && (
        <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Add shared Section wrapper component"
```

---

## Task 7: Nav

**Files:**
- Create: `components/nav.tsx`, `components/nav.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/nav.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Nav } from "./nav";

describe("Nav", () => {
  it("renders anchor links to each section", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: /experience/i })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "#contact");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test nav`
Expected: FAIL — cannot resolve `./nav`.

- [ ] **Step 3: Implement the Nav**

Create `components/nav.tsx`:
```tsx
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/content/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link href="#top" className="font-serif text-lg font-semibold tracking-tight">
          {profile.shortName}
        </Link>
        <div className="flex items-center gap-1 md:gap-4">
          <ul className="hidden items-center gap-4 font-mono text-xs text-muted sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test nav`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add sticky nav with anchor links and theme toggle"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/hero.tsx`, `components/sections/hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/hero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./hero";
import { profile } from "@/content/profile";

describe("Hero", () => {
  it("shows the name as a heading and a mailto link", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: profile.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test hero`
Expected: FAIL — cannot resolve `./hero`.

- [ ] **Step 3: Implement the Hero**

Create `components/sections/hero.tsx`:
```tsx
import { Mail, Github, Linkedin } from "lucide-react";
import { profile } from "@/content/profile";

const iconFor: Record<string, typeof Mail> = { GitHub: Github, LinkedIn: Linkedin };

export function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-3xl px-6 pb-12 pt-20 md:pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{profile.location}</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">{profile.title}</p>
      <p className="mt-4 max-w-2xl text-lg text-foreground md:text-xl">{profile.pitch}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-white transition-opacity hover:opacity-90"
        >
          <Mail className="h-4 w-4" /> Email
        </a>
        {profile.socials.map((s) => {
          const Icon = iconFor[s.label] ?? Mail;
          return (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-muted transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" /> {s.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test hero`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add hero section"
```

---

## Task 9: About section

**Files:**
- Create: `components/sections/about.tsx`

- [ ] **Step 1: Implement About**

Create `components/sections/about.tsx`:
```tsx
import { Section } from "@/components/section";
import { profile } from "@/content/profile";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-5 text-lg leading-relaxed text-muted">
        {profile.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Add about section"
```

---

## Task 10: Experience section

**Files:**
- Create: `components/sections/experience.tsx`, `components/sections/experience.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/experience.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Experience } from "./experience";

describe("Experience", () => {
  it("renders each company", () => {
    render(<Experience />);
    expect(screen.getByText("Nexo")).toBeInTheDocument();
    expect(screen.getByText("Pateplay")).toBeInTheDocument();
    expect(screen.getByText("DevriX")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test sections/experience`
Expected: FAIL — cannot resolve `./experience`.

- [ ] **Step 3: Implement Experience**

Create `components/sections/experience.tsx`:
```tsx
import { Section } from "@/components/section";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-12">
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.start}`}
            className="grid gap-2 border-l border-border pl-6 md:grid-cols-[1fr_auto]"
          >
            <div className="md:col-start-1">
              <h3 className="font-serif text-2xl font-medium">{role.title}</h3>
              <p className="text-accent">{role.company}</p>
            </div>
            <p className="font-mono text-xs text-muted md:col-start-2 md:text-right">
              {role.start} – {role.end}
              <br />
              {role.location} · {role.arrangement}
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-muted md:col-span-2">
              {role.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test sections/experience`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add experience section"
```

---

## Task 11: Skills section

**Files:**
- Create: `components/sections/skills.tsx`

- [ ] **Step 1: Implement Skills**

Create `components/sections/skills.tsx`:
```tsx
import { Section } from "@/components/section";
import { skills } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-6">
        {skills.map((group) => (
          <div key={group.label} className="grid gap-3 md:grid-cols-[120px_1fr]">
            <dt className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.label}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-card px-3 py-1 font-mono text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Add skills section"
```

---

## Task 12: Projects section

**Files:**
- Create: `components/sections/projects.tsx`, `components/sections/projects.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/projects.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Projects } from "./projects";

describe("Projects", () => {
  it("renders the WealthLens project with a GitHub link", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { name: /wealthlens/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/Alex-Kostov/wealthlens",
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test sections/projects`
Expected: FAIL — cannot resolve `./projects`.

- [ ] **Step 3: Implement Projects**

Create `components/sections/projects.tsx`:
```tsx
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-8">
        {projects.map((p) => (
          <article
            key={p.name}
            className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <h3 className="font-serif text-2xl font-medium">{p.name}</h3>
            <p className="mt-3 text-muted">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li
                  key={t}
                  className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-4 font-mono text-sm">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80"
                >
                  {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test sections/projects`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add projects section"
```

---

## Task 13: Contact section + footer

**Files:**
- Create: `components/sections/contact.tsx`

- [ ] **Step 1: Implement Contact**

Create `components/sections/contact.tsx`:
```tsx
import { Section } from "@/components/section";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <>
      <Section id="contact" title="Contact">
        <p className="max-w-2xl text-lg text-muted">
          I&apos;m open to interesting full-stack and AI-focused roles. The fastest way to
          reach me is email.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-accent transition-opacity hover:opacity-80"
          >
            {profile.email}
          </a>
          {profile.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </Section>
      <footer className="mx-auto w-full max-w-3xl px-6 py-10 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Add contact section and footer"
```

---

## Task 14: Compose the page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the default page with composed sections**

Replace the entire contents of `app/page.tsx` with:
```tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Remove leftover scaffold assets that are now unused**

If the scaffold left a `app/page.module.css` or demo SVGs in `public/` referenced nowhere, delete them. Verify nothing imports them first:
```bash
grep -rn "page.module.css" app components || echo "no references — safe to delete"
rm -f app/page.module.css
```

- [ ] **Step 3: Run the full test suite**

Run: `pnpm test`
Expected: all suites PASS (theme-toggle, content, nav, hero, experience, projects).

- [ ] **Step 4: Run typecheck, lint, and build**

Run:
```bash
pnpm typecheck && pnpm lint && pnpm build
```
Expected: typecheck clean, lint clean, `✓ Compiled successfully` and the route `/` rendered as static.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Compose single-page portfolio from section components"
```

---

## Task 15: Manual verification and polish

**Files:**
- (No new files unless issues are found)

- [ ] **Step 1: Run the dev server and inspect**

Run: `pnpm dev` and open http://localhost:3000.
Verify (manually):
- Light "paper" theme loads by default; no flash of wrong theme.
- Theme toggle switches to dark and back; choice persists on reload.
- Nav links smooth-scroll to each section; sticky header stays on top.
- Name renders in the Cormorant serif; dates/tags render in mono.
- Email button opens a mail client to `alex89773@gmail.com`; LinkedIn/GitHub open in new tabs.
- Layout is clean on a narrow (mobile) viewport: nav links hide below `sm`, text reflows.

- [ ] **Step 2: Confirm the accent is a one-token change**

Temporarily edit `--color-accent` in `app/globals.css` to the gold alternative `#b08d2e`, reload, confirm accents update site-wide, then revert to `#7b2d26`. (This validates the spec's "easy to change" requirement.)

- [ ] **Step 3: Stop the dev server and commit any fixes**

```bash
git add -A
git commit -m "Polish: manual QA fixes" || echo "nothing to commit"
```

---

## Task 16: Deployment notes (Vercel)

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write a short README**

Create `README.md`:
```markdown
# Personal Portfolio — Aleksandar Kostov

Single-page portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # Vitest
pnpm build      # production build
```

## Editing content

All copy lives in `content/`:
- `profile.ts` — name, title, pitch, bio, email, social links
- `experience.ts` — work history
- `skills.ts` — grouped skill tags
- `projects.ts` — project cards

## Theming

The accent color is a single token in `app/globals.css` (`--color-accent`). Light/dark
palettes are the `:root` / `.dark` variables in the same file.

## Deploy

Push to GitHub and import the repo in Vercel. Framework preset: Next.js. No environment
variables are required.
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "Add README with develop, content, theming, and deploy notes"
```

- [ ] **Step 3: Hand off deployment to Alex**

Deployment requires Alex's GitHub + Vercel accounts (interactive auth), so it is a manual handoff, not an automated step:
1. Create a GitHub repo (e.g. `Alex-Kostov/portfolio`) and push `main`.
2. In Vercel, "Add New → Project", import the repo, accept the Next.js preset, deploy.
3. (Optional) add a custom domain in Vercel later.

---

## Post-build follow-ups (tracked from spec §7)

These are content refinements Alex can make by editing `content/*.ts` after the site is live — not blockers for shipping:
- Refine the **bio** wording (draft is in `profile.ts`), ideally with real LinkedIn detail.
- Add concrete **90K Capital** bullets when ready.
- Decide whether to keep the default **oxblood** accent or switch to gold (`--color-accent`).
- Decide whether to add the **DevriX internship** as an extra entry.
- Add a **CV download** button + `public/cv.pdf` if/when a CV exists.
```
