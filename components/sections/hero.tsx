import Image from "next/image";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { profile } from "@/content/profile";

const iconFor: Record<string, (props: { className?: string }) => React.ReactElement> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

const initials = profile.name
  .split(" ")
  .map((word) => word[0])
  .join("");

export function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-3xl px-6 pb-12 pt-20 md:pt-32">
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="md:flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {profile.location}
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">{profile.title}</p>
          <p className="mt-4 max-w-2xl text-lg text-foreground md:text-xl">{profile.pitch}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-accent-fg transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            {profile.socials.map((s) => {
              const Icon = iconFor[s.label];
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-muted transition-colors hover:text-foreground"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null} {s.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className="shrink-0">
          {profile.photo ? (
            <Image
              src={profile.photo}
              alt={profile.name}
              width={176}
              height={220}
              priority
              className="rounded-md border border-border object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-[220px] w-[176px] items-center justify-center rounded-md border border-border bg-card font-serif text-5xl text-muted"
            >
              {initials}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
