import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/content/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "References", href: "#references" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link href="#top" className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
          {profile.shortName}
        </Link>
        <div className="flex items-center gap-1 md:gap-4">
          <ul className="hidden items-center gap-4 font-mono text-xs text-muted md:flex">
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
