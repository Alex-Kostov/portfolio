import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "TailwindCSS",
      "shadcn/ui",
      "Material UI",
      "Redux",
      "Zustand",
      "AG Grid",
      "TanStack Query",
      "Zod",
      "Vite",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PHP", "REST APIs"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Drizzle ORM", "Prisma", "SQL & NoSQL"],
  },
  {
    label: "DevOps & Cloud",
    items: ["AWS", "Docker", "Vercel"],
  },
  {
    label: "Testing",
    items: ["Vitest", "Playwright"],
  },
  {
    label: "CMS",
    items: ["WordPress"],
  },
  {
    label: "AI",
    items: [
      "LLM integrations",
      "Claude",
      "Codex",
      "Anthropic & OpenAI APIs",
      "Prompt engineering",
      "AI-powered automation",
    ],
  },
];
