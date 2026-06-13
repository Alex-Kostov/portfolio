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
