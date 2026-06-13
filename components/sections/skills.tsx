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
