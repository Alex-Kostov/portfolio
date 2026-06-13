import { Section } from "@/components/section";
import { testimonials } from "@/content/testimonials";

export function References() {
  return (
    <Section id="references" title="References">
      <div className="space-y-8">
        {testimonials.map((t) => (
          <figure
            key={t.author}
            className="rounded-lg border border-border bg-card p-6 md:p-8"
          >
            <blockquote className="font-serif text-xl leading-relaxed text-foreground md:text-2xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 font-mono text-xs text-muted">
              {t.href ? (
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-opacity hover:opacity-80"
                >
                  {t.author}
                </a>
              ) : (
                <span className="text-accent">{t.author}</span>
              )}
              <span className="text-foreground"> · {t.title}</span>
              <br />
              {t.relationship}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
