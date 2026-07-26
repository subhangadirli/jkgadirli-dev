# jkgadirli.dev

Personal portfolio. Single page, dark, flat. Built with [Astro](https://astro.build),
[Bits UI](https://bits-ui.com) components in Svelte islands, Tailwind CSS v4 and
[Lucide](https://lucide.dev) icons.

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
  data/site.ts          # all content: bio, projects, skills, education, links
  layouts/Base.astro    # <head>, meta, page shell
  components/           # Header, Hero, Activity, About, Projects, Contact, Footer, SocialLinks
  components/ui/        # Bits UI wrappers: Button, Separator
  styles/app.css        # Tailwind entry plus the design tokens
pages/index.astro       # the one page, composed from the components
public/                 # font, images, robots.txt, sitemap.xml, copied as-is
```

Adding a project means one entry in the `projects` array in `src/data/site.ts`.
Its `icon` field maps to a Lucide component in `Projects.astro`.

## Design notes

- The tokens in `src/styles/app.css` (`--background`, `--dark-10`, `--radius-card`,
  `--shadow-card` and the rest) are transcribed from the Bits UI documentation
  theme, so component classes copied out of those docs render as they do there.
- Dark only. `<html>` carries the `dark` class permanently, which keeps the
  `dark:` variants in the docs class strings working as written.
- Flat surfaces: a border, a small shadow, one step of background lightness.
  No gradients. Radii stay in the 5px to 16px range from the token scale.
- Interactive components are Svelte islands: `AboutTabs` (`client:visible`),
  `CopyEmail` and `ContributionGraph` (`client:visible`), `SocialLinks`
  (`client:load`). Everything else, including the Bits UI `Button` and
  `Separator`, renders to static HTML with no client JS.
- The hero portrait is a plain `<img>` rather than the Bits UI `Avatar`. That
  component ships the image with `display: none` and reveals it from JS once it
  has loaded, so the portrait was missing until the island hydrated.
- Lucide dropped brand glyphs in v1, so the social icons come from Simple Icons
  as raw paths in `src/components/icons/brands.ts`, drawn with `currentColor`.
  LinkedIn is from Simple Icons v13, the last version that still shipped it.
- Social links are icon-only, with the label in a Bits UI tooltip and on
  `aria-label`. Entries flagged `me` in `socials` are also emitted as
  `<link rel="me">` for fediverse verification.
- The Activity section draws the GitHub contribution graph from
  `github-contributions-api.jogruber.de`, an unauthenticated mirror of the
  contributions data. `Activity.astro` fetches a snapshot at build time and
  embeds it, so the graph is in the static HTML with no JS and no layout shift;
  the island then refetches on view, which is what keeps it current between
  deploys. If both the build fetch and the client fetch fail the card says so
  instead of collapsing. The GitHub handle comes from `site.github`.
- Project logos live in `public/images/logos`. A `mark` logo carries its own
  transparency and sits straight on the card; a `tile` logo is an opaque square
  and gets clipped to a rounded icon. A project with no logo falls back to the
  Lucide icon named in its `icon` field. The Azerbaijan Git Community lockup and
  the Zed mark were recoloured to white for the dark background.

## Deploy

Vercel, static output. `vercel.json` sets `cleanUrls`. Framework preset Astro,
build command `npm run build`, output directory `dist`.
