export const site = {
  name: "Subhan JK Gadirli",
  short: "JK",
  role: "Full-stack developer & Linux user",
  location: "Baku, Azerbaijan",
  email: "subhanqedirli@protonmail.com",
  resume: "https://rxresu.me/subhangadirli/subhan-gadirli",
  mastodon: "https://mastodon.social/@subhanqedirli",
  description:
    "Full-stack developer and Linux user. Computer Science student at Azerbaijan Technical University, building operating systems, browsers and web experiences.",
};

/** `icon` maps to a Lucide component in SocialLinks.svelte. */
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
  /** maps to a Lucide component in Projects.astro */
  icon: "terminal" | "globe" | "layout" | "bot";
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "TuranOS",
    blurb:
      "A customized Debian-based operating system with specialized editions for education, cybersecurity, personal and commercial use.",
    href: "https://www.instagram.com/turanlinux/",
    icon: "terminal",
    tags: ["Linux", "Debian", "OS"],
  },
  {
    title: "Firefox One 🦊+",
    blurb:
      "A browser with the power of Firefox and the aesthetics of Opera One, a modern, fluid, fully customizable interface.",
    href: "https://github.com/subhangadirli/FoxOne",
    icon: "globe",
    tags: ["Firefox", "CSS", "Theming"],
  },
  {
    title: "ZenTab",
    blurb:
      "A focused, minimal browser start page for Firefox, built to cut distraction with a clean, customizable interface.",
    href: "https://github.com/subhangadirli/ZenTab",
    icon: "layout",
    tags: ["JavaScript", "UI", "Productivity"],
  },
  {
    title: "x-to-mastodon-bot",
    blurb:
      "An automation bot that mirrors posts from X to Mastodon, keeping both timelines in sync without manual work.",
    href: "https://github.com/subhangadirli/x-to-mastodon-bot",
    icon: "bot",
    tags: ["Python", "Automation", "API"],
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Linux",
  "Git",
  "Astro",
  "Bash",
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
