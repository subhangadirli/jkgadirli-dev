export const site = {
  name: "Subhan JK Gadirli",
  /** the browser tab and og:title, kept short so it does not get truncated */
  title: "Subhan Gadirli",
  short: "JK",
  role: "Full-stack developer & Linux enthusiast",
  location: "Baku, Azerbaijan",
  email: "subhanqedirli@protonmail.com",
  github: "subhangadirli",
  resume: "https://rxresu.me/subhangadirli/subhan-gadirli",
  mastodon: "https://mastodon.social/@subhanqedirli",
  description:
    "Full-stack developer and Linux enthusiast. Computer Science student at Azerbaijan Technical University, building fediverse tools, Linux desktop apps and developer tooling.",
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
  { label: "Work", href: "#work" },
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
    title: "omicron",
    blurb:
      "Minimal, modern, self-hostable blogging over ActivityPub, so posts federate into the fediverse instead of sitting on an island.",
    href: "https://github.com/the-jk-labs/omicron",
    icon: "rss",
    logo: { src: "/images/logos/omicron.png", mode: "mark" },
    tags: ["TypeScript", "ActivityPub", "Self-hosted"],
  },
  {
    title: "x-to-mastodon-bot",
    blurb:
      "An X sync bot for Mastodon that mirrors posts across, keeping both timelines aligned without manual work.",
    href: "https://github.com/subhangadirli/x-to-mastodon-bot",
    icon: "bot",
    tags: ["JavaScript", "Automation", "API"],
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
    title: "Azerbaijan Git Community",
    blurb:
      "The website of the Azerbaijan GitHub Community, built and maintained with the community.",
    href: "https://github.com/Azerbaijan-Git-Community/website",
    icon: "users",
    logo: { src: "/images/logos/agc-white.png", mode: "mark" },
    tags: ["TypeScript", "Web", "Community"],
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
];

/** ordered in groups: languages, frontend, runtimes, data, then infrastructure */
export const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Ruby",
  "Bash",
  "React",
  "Svelte",
  "Astro",
  "Tailwind CSS",
  "Node.js",
  "Deno",
  "Bun",
  "Hono",
  "PostgreSQL",
  "SQLite",
  "Linux",
  "Docker",
  "Podman",
  "Caddy",
  "Hetzner",
  "Git",
];

export const education = [
  {
    title: "BSc Computer Science",
    org: "Azerbaijan Technical University",
    period: "2024 to 2028",
  },
  {
    title: "Full-Stack Course",
    org: "Peerstack Academy",
    period: "2024 to 2025",
  },
];
