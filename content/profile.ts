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
  // Drop a headshot at public/profile.jpg and set this to "/profile.jpg".
  // While empty, the hero shows a monogram placeholder.
  photo: "",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aleksandar-kostov-5754121bb/" },
    { label: "GitHub", href: "https://github.com/Alex-Kostov" },
  ],
  bio: [
    "I'm a full-stack developer based in Sofia, Bulgaria, with over six years of experience building products end to end — from WordPress and PHP early on to TypeScript-heavy React/Next.js frontends and Node.js services today. I've worked across fintech, crypto, and iGaming, shipping data-dense dashboards, enterprise tables, and API gateways used by quantitative and engineering teams.",
    "These days I'm especially energized by AI-assisted engineering. I'm a committed Claude enthusiast, and I build LLM-powered applications and automation that ship into real products — not just demos. I care about typed, maintainable code and software that holds up in production.",
  ],
};
