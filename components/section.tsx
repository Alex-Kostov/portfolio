import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-16 md:py-24", className)}
    >
      {title && (
        <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
