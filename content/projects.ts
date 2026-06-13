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
