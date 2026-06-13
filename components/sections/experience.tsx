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
