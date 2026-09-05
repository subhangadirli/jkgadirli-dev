# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev      # dev server at localhost:4321
pnpm build    # static build to dist/
pnpm preview  # serve the built output, no dev toolbar
```

There is no test suite, linter, formatter, or typecheck script. `astro check` is
not installed and prompts to add `@astrojs/check` if invoked. `pnpm build` is
the only automated gate, so it is the thing to run after every change.

Verification here is visual. Build, serve with `pnpm preview`, and look at the
page. Prefer `preview` over `dev` when capturing screenshots, because the dev
server injects the Astro toolbar over the bottom of the viewport.

Layout bugs here do not show up without a real browser. A jsdom test of the
mobile nav passed every interaction while the scrim was `height: 0` in Chromium,
because jsdom does no layout. If a change touches positioning, drive it in a
headless browser and read the bounding boxes, do not infer from the markup.

pnpm is the only package manager here. `pnpm-lock.yaml` is the committed
lockfile, `packageManager` in `package.json` pins the version, and
`pnpm-workspace.yaml` carries `minimumReleaseAge`, `saveExact` and the esbuild
build allowance. Do not run npm or yarn in this repo, and do not reintroduce
`package-lock.json`.

## Architecture

One static page, composed in `src/pages/index.astro` from a section component per
band: Hero, Activity, About, Community, Projects, Blog, Contact. Astro renders
everything to static HTML; Svelte supplies a small number of interactive islands.

### Content is data, not markup

`src/data/site.ts` holds nearly all visible copy: bio, socials, nav, projects,
skill groups, education, and the blog instance. Most content requests are a data
edit in that one file, not a component edit. Check it before touching a
component.

Section components read from it and are otherwise presentational. `nav` entries
must match the `id` on the corresponding `<section>`.

### External data: two feeds, two different strategies

Both are fetched at build time so the section is complete in the static HTML,
but they diverge at runtime, and the reason is CORS:

- **Contributions** (`Activity.astro` plus `ContributionGraph.svelte`) come from
  `github-contributions-api.jogruber.de`, which sends
  `Access-Control-Allow-Origin`. The build embeds a snapshot as `seed`, and the
  island refetches on view, so the graph stays current between deploys. If the
  refetch fails it silently keeps the seed.
- **Blog posts** (`Blog.astro` plus `BlogPosts.svelte` and `src/data/blog.ts`)
  come from the Omicron RSS feed, which sends
  `Access-Control-Allow-Origin` (see `FEED_HEADERS` in the Omicron
  frontend). The build embeds a snapshot as `seed`, and the island refetches
  on view, so new posts appear without a redeploy. If the refetch fails it
  silently keeps the seed.

Before adding any client-side fetch, confirm the endpoint actually sends
`Access-Control-Allow-Origin`. Both paths degrade to a readable fallback rather
than an empty box when the fetch fails.

`src/data/blog.ts` hand-parses the RSS with no dependency. Descriptions arrive as
double-encoded HTML, so it decodes, strips tags, then decodes again, and drops
the "Read the full article" link Omicron appends to every item.

### Islands are the exception

Static HTML is the default. Only add a `client:*` directive when something
genuinely needs to run in the browser. Current islands: `SocialLinks`
(`client:load`, for tooltips), `CopyEmail`, `ContributionGraph` and
`BlogPosts` (`client:visible`). The Bits UI `Button` and `Separator` wrappers render to
static HTML with no client JS.

Known issue: `CopyEmail` copies the address correctly but its label never flips
to the "Copied" confirmation state. This predates the current code and is
unresolved.

### Styling

Tailwind v4, configured entirely in `src/styles/app.css` with no config file. The
design tokens there are transcribed from the Bits UI documentation theme so class
strings copied out of those docs render as they do there.

The site is dark only and `<html>` carries the `dark` class permanently, which is
why `dark:` variants appear throughout and still resolve.

The `Separator` wrapper's base class sets `h-full`, which collapses to nothing
inside a centred flex row. Any height or colour you set on it needs the `!`
important suffix to win, as in `data-[orientation=vertical]:h-3.5!`. This has
silently produced invisible separators more than once.

### Responsive conventions

Stacked layouts centre on phones and switch to left aligned at the breakpoint
where the layout goes side by side, usually `md`. The Hero and Footer follow
this.

The Contact card and the Journey timeline are the exceptions: both stay centred
at every width. Contact centres its own text and button pair inside the card,
Journey centres the rail and its entries as one block while the entries stay
left aligned against the rail.

The horizontal gutter is `px-4 sm:px-6` and lives in three places that must stay
in sync: `main` in `Base.astro`, the header inner div, and the footer inner div.
If they diverge, the header wordmark stops lining up with the section headings.

The header has two navs. Below `sm` the inline links and the "Get in touch"
button are both hidden and `MobileNav.svelte` (`client:load`, the one island
that must respond to the first tap) renders a hamburger toggle plus a panel
fixed under the bar. From `sm` up the inline nav returns and the button carries
the `ml-auto`. Adding a nav item is a `site.ts` edit and needs nothing else, the
inline nav still scrolls internally rather than widening the page and the panel
is a column.

The header carries `backdrop-blur-md`, and a backdrop-filter makes an element
the containing block for its `fixed` descendants. The mobile overlay therefore
resolved against the 64px header box rather than the viewport, which collapsed
the scrim to zero height and silently broke tap to dismiss. `MobileNav` moves
both nodes to `document.body` with a small `portal` attachment. Anything fixed
and full height that starts life inside the header needs the same treatment.

The panel also locks scrolling while open, and it does it inline on `<html>`,
because that is where the scrollbar is and an inline style is what outranks the
`overflow-y-scroll` rule in `app.css`. It closes itself when the viewport
crosses `sm`, since the panel is `sm:hidden` and an open menu would otherwise
leave the lock on with no way to release it.

## Copy conventions

No emoji and no em dashes, in site copy and commit messages alike. Commits carry
no co-author or generated-with trailers.

## Deploy

Vercel, static output. `vercel.json` sets `cleanUrls`. Build command
`pnpm build`, output directory `dist`.

`README.md` carries the design rationale in more depth, including the logo mode
conventions and why the hero portrait is a plain `<img>` rather than the Bits UI
`Avatar`.
