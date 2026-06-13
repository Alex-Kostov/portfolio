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
