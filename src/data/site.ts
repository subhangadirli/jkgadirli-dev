export const site = {
  name: "Subhan JK Gadirli",
  /** the browser tab and og:title, kept short so it does not get truncated */
  title: "Subhan Gadirli",
  short: "JK",
  role: "Full-stack developer & Linux enthusiast",
  location: "Baku, Azerbaijan",
  email: "subhanqedirli@protonmail.com",
  github: "subhangadirli",
  resume:
    "https://github.com/subhangadirli/resume/releases/latest/download/Subhan-Gadirli-Resume.pdf",
  mastodon: "https://mastodon.social/@subhanqedirli",
  description:
    "Full-stack developer and Linux enthusiast. Computer Science student at Azerbaijan Technical University, building fediverse tools, Linux desktop apps and developer tooling.",
};

/** the omicron instance the blog runs on, and the account posts are read from */
export const blog = {
  base: "https://omicron.blog",
  user: "subhangadirli",
};

/** `icon` maps to a brand path in components/icons/brands.ts, or to the local
 * omicron logo. `me` links are also declared as rel="me" in the document head. */
export const socials = [
  { label: "GitHub", href: "https://github.com/subhangadirli", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/subhangadirli",
    icon: "linkedin",
  },
  {
    label: "Mastodon",
    href: "https://mastodon.social/@subhanqedirli",
    icon: "mastodon",
    me: true,
  },
  {
    label: "Omicron",
    href: "https://omicron.blog/@subhangadirli",
    icon: "omicron",
    me: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/subhangadirli",
    icon: "instagram",
  },
] as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  title: string;
  blurb: string;
  href: string;
  /** maps to a Lucide component in Projects.astro, used when there is no logo */
  icon: "rss" | "bot" | "users" | "cloud" | "languages" | "palette";
  /**
   * `mark` logos carry their own transparency and sit straight on the card.
   * `tile` logos are opaque squares, so they get clipped to a rounded icon.
   */
  logo?: { src: string; mode: "mark" | "tile" };
  tags: string[];
};

/** the pinned repositories on github.com/subhangadirli */
export const projects: Project[] = [
  {
    title: "Community Website",
    blurb:
      "The website of the Azerbaijan GitHub Community, built and maintained with the community.",
    href: "https://github.com/Azerbaijan-Git-Community/website",
    icon: "users",
    logo: { src: "/images/logos/agc-white.png", mode: "mark" },
    tags: ["TypeScript", "Web", "Community"],
  },
  {
    title: "omicron",
    blurb:
      "Minimal, modern, self-hostable blogging over ActivityPub, so posts federate into the fediverse instead of sitting on an island.",
    href: "https://github.com/the-jk-labs/omicron",
    icon: "rss",
    logo: { src: "/images/logos/omicron.png", mode: "mark" },
    tags: ["TypeScript", "ActivityPub", "Self-hosted"],
  },
  {
    title: "gazan",
    blurb:
      "Browse, upload, download and manage cloud files from the desktop, through a native GTK4 interface.",
    href: "https://github.com/subhangadirli/gazan",
    icon: "cloud",
    logo: { src: "/images/logos/gazan.svg", mode: "mark" },
    tags: ["Python", "GTK4", "Linux"],
  },
  {
    title: "kagi-translate-mcp",
    blurb:
      "A Model Context Protocol server for Kagi Translate, which puts translation and proofreading in reach of any MCP client.",
    href: "https://github.com/subhangadirli/kagi-translate-mcp",
    icon: "languages",
    logo: { src: "/images/logos/kagi.png", mode: "tile" },
    tags: ["TypeScript", "MCP", "API"],
  },
  {
    title: "vs-code-plus-icons-for-zed",
    blurb:
      "Custom file and folder icons for the Zed editor, over 800 of them, ported from the VS Code icon set.",
    href: "https://github.com/subhangadirli/vs-code-plus-icons-for-zed",
    icon: "palette",
    logo: { src: "/images/logos/zed-white.png", mode: "mark" },
    tags: ["TypeScript", "Zed", "Icons"],
  },
  {
    title: "x-to-mastodon-bot",
    blurb:
      "An X sync bot for Mastodon that mirrors posts across, keeping both timelines aligned without manual work.",
    href: "https://github.com/subhangadirli/x-to-mastodon-bot",
    icon: "bot",
    tags: ["JavaScript", "Automation", "API"],
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Ruby", "Bash"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Svelte", "Astro", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Deno", "Bun", "Hono"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "SQLite", "Drizzle ORM", "Prisma ORM"],
  },
  {
    label: "Infrastructure",
    items: [
      "Linux",
      "Docker",
      "Podman",
      "Caddy",
      "Anubis",
      "Hetzner",
      "Cloudflare",
      "Vercel",
      "Netlify",
      "Heroku",
      "Git",
    ],
  },
];

export type JourneyEntry = {
  title: string;
  /** rendered first, in full contrast, ahead of the muted meta segments */
  lead?: string;
  /** joined with a thin divider, so keep each segment short */
  meta: string[];
  /** the fallback drawn in the node when there is no logo, maps to a Lucide
   * component in Journey.astro */
  icon: "award" | "education" | "code" | "users";
  /** same modes as Project.logo: `mark` carries its own transparency and sits
   * straight in the node, `tile` is an opaque square and gets clipped */
  logo?: { src: string; mode: "mark" | "tile" };
  /** entries are listed newest first, and a year marker is drawn on each change */
  year: number;
};

/**
 * LinkedIn has no public API or feed for a profile, so this is maintained by
 * hand. Keep it newest first, the year markers are derived from the order.
 */
export const journey: JourneyEntry[] = [
  {
    title: "Founder and Full-Stack Developer",
    lead: "Omicron Blogging",
    meta: ["Self-employed", "Jun 2026 to present"],
    icon: "code",
    logo: { src: "/images/logos/omicron.png", mode: "mark" },
    year: 2026,
  },
  {
    title: "Community Lead",
    lead: "Azerbaijan GitHub Community",
    meta: ["Baku", "Jan 2026 to present"],
    icon: "users",
    logo: { src: "/images/logos/agc-white.png", mode: "mark" },
    year: 2026,
  },
  {
    title: "Full-Stack Development",
    lead: "Qwasar Silicon Valley",
    meta: ["Course", "Oct 2025 to Jul 2026"],
    icon: "education",
    logo: { src: "/images/logos/qwasar-white.svg", mode: "mark" },
    year: 2025,
  },
  {
    title: "Member of Corporate Relations",
    lead: "ESTIEM",
    meta: ["Baku", "Mar 2025 to Feb 2026"],
    icon: "users",
    logo: { src: "/images/logos/estiem.png", mode: "mark" },
    year: 2025,
  },
  {
    title: "Introduction to Entrepreneurship",
    lead: "SABAH.HUB",
    meta: ["Certification", "Feb 2025"],
    icon: "award",
    /** the site only publishes the square mark as a 32px favicon, so this is
     * upscaled from it, with the rounded corners filled back in */
    logo: { src: "/images/logos/sabahhub.png", mode: "tile" },
    year: 2025,
  },
  {
    title: "BSc Computer Science",
    lead: "Azerbaijan Technical University",
    meta: ["Bachelor's degree", "Sep 2024 to present"],
    icon: "education",
    logo: { src: "/images/logos/aztu-white.png", mode: "mark" },
    year: 2024,
  },
  {
    title: "Linux Developer",
    lead: "Kiber Təhlükəsizlik Platforması",
    meta: ["Turan Linux", "May 2020 to Jun 2024"],
    icon: "code",
    /** an opaque navy shield on white, so it is clipped as a tile rather than
     * sat straight on the dark background */
    logo: { src: "/images/logos/kiberplatforma.png", mode: "tile" },
    year: 2020,
  },
];

export const education = [
  {
    title: "BSc Computer Science",
    org: "Azerbaijan Technical University",
    period: "2024 to 2028",
  },
  {
    title: "Full-Stack Development",
    org: "Qwasar Silicon Valley",
    period: "2025 to 2026",
  },
];
