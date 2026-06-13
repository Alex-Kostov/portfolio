# Personal Portfolio — Aleksandar Kostov

Single-page portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4.
Minimal-editorial design: Cormorant serif display type, a light "paper" theme with a dark
toggle, and one configurable accent color.

## Develop

```bash
pnpm install        # if it stalls on native build approval, use: pnpm install --ignore-scripts
pnpm dev            # http://localhost:3000
pnpm test           # Vitest
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint
pnpm build          # production build
```

## Editing content

All copy lives in `content/` — edit the typed data objects, never the JSX:

- `profile.ts` — name, title, pitch, bio, email, social links
- `experience.ts` — work history (newest first)
- `skills.ts` — grouped skill tags
- `projects.ts` — project cards

## Theming

- **Accent color:** a single token in `app/globals.css` — `--color-accent` (default oxblood
  `#7b2d26`; a muted-gold alternative `#b08d2e` is noted inline). Change that one line to
  recolor the whole site.
- **Light/dark palettes:** the `:root` (light) and `.dark` variables in `app/globals.css`.
  The toggle is `next-themes`, defaulting to light and respecting system preference.

## Deploy (Vercel)

1. Create a GitHub repo and push this branch/`main`.
2. In Vercel: **Add New → Project**, import the repo, accept the **Next.js** preset, deploy.
3. No environment variables are required (the site is static; contact is mailto + links).
4. Optionally add a custom domain in Vercel afterwards.
