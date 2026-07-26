# jkgadirli.dev

Personal portfolio. Single-page, dark, glass/blur. Built with [Astro](https://astro.build) as a static site.

## Commands

```sh
npm install      # install deps
npm run dev      # dev server at localhost:4321
npm run build    # static build to dist/
npm run preview  # serve the build locally
```

## Structure

```
src/
  data/site.ts        # all content: bio, projects, skills, links, edit here first
  layouts/Base.astro  # <head>, analytics, aurora background, scroll-reveal
  components/         # Nav, Hero, About, Projects, Contact, Footer
  styles/global.css   # design tokens (--ink, --glass, --accent…), .glass, .aurora
pages/index.astro     # the one page, composed from the components
public/               # fonts, images, robots.txt, sitemap.xml, copied as-is
```

Adding a project means one entry in the `projects` array in `src/data/site.ts`, with no markup changes.

## Design notes

- Dark only; `color-scheme: dark` is declared, there is no light theme.
- Glass surfaces come from the `.glass` class (translucent fill + `backdrop-filter` + top-edge sheen). Reuse it rather than re-rolling the effect.
- The ambient colour is three blurred radial gradients in `.aurora`, fixed behind the content with a faint noise layer to stop wide-screen banding.
- Sections fade up on scroll via `[data-reveal]` + one `IntersectionObserver` in `Base.astro`. Everything is disabled under `prefers-reduced-motion`.
- Project screenshots get a scrim (`.shot::after`) because several are light-on-white and would otherwise break the dark palette.

## Deploy

Vercel, static output. `vercel.json` sets `cleanUrls`. Build command `npm run build`, output directory `dist`.
