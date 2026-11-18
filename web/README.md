# datos.mati.lol

Static Astro site on Cloudflare Workers, deployed with Alchemy.

    bun install
    bun run dev                                  # local preview
    bunx alchemy deploy --stage prod             # build and deploy

- **Pages** live in `src/pages/`. Every page uses `src/layouts/Base.astro`
  and must be registered in `src/sitio.ts` with a title, description and an
  Open Graph image; the build fails otherwise.
- **Open Graph images** are rendered at build time with satori (JSX-like
  objects to SVG) and resvg (SVG to PNG), at `/og/<page>.png`. Write a card
  with the `h()` helper in `src/og/` (see `inflacion.ts`), or use
  `ogSimple(title, line)`. Fonts are static TTFs in `src/og/fonts/`.
- **Data** is fetched at build time with a committed fallback (see
  `src/data/inflacion/`). Redeploy to refresh.
- **Analytics:** Cloudflare Web Analytics site for the hostname, declared in
  `alchemy.run.ts`; its public beacon token is in `src/analytics.ts`.
