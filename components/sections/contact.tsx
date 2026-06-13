import { Section } from "@/components/section";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <>
      <Section id="contact" title="Contact">
        <p className="max-w-2xl text-lg text-muted">
          Looking for my next front-end or full-stack role — bonus points if there&apos;s
          some AI in the mix. Email is the fastest way to reach me.
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
