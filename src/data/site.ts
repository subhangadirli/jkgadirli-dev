export const site = {
  name: "Subhan JK Gadirli",
  short: "JK",
  role: "Full-stack developer & Linux user",
  email: "subhanqedirli@protonmail.com",
  resume: "https://rxresu.me/subhangadirli/subhan-gadirli",
  mastodon: "https://mastodon.social/@subhanqedirli",
  description:
    "Full-stack developer and Linux user. Computer Science student at Azerbaijan Technical University, building operating systems, browsers and web experiences.",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/subhangadirli" },
  { label: "LinkedIn", href: "https://linkedin.com/in/subhangadirli" },
  { label: "Mastodon", href: "https://mastodon.social/@subhanqedirli" },
  { label: "Instagram", href: "https://instagram.com/subhangadirli" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  title: string;
  blurb: string;
  href: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "TuranOS",
    blurb:
      "A customized Debian-based operating system with specialized editions for education, cybersecurity, personal and commercial use.",
    href: "https://www.instagram.com/turanlinux/",
    image: "/images/turan-os.png",
    tags: ["Linux", "Debian", "OS"],
  },
  {
    title: "Firefox One 🦊+",
    blurb:
      "A browser with the power of Firefox and the aesthetics of Opera One, a modern, fluid, fully customizable interface.",
    href: "https://github.com/subhangadirli/FoxOne",
    image:
      "https://raw.githubusercontent.com/subhangadirli/FoxOne/refs/heads/main/branding/FoxOne/content/preview.png",
    tags: ["Firefox", "CSS", "Theming"],
  },
  {
    title: "ZenTab",
    blurb:
      "A focused, minimal browser start page for Firefox, built to cut distraction with a clean, customizable interface.",
    href: "https://github.com/subhangadirli/ZenTab",
    image:
      "https://raw.githubusercontent.com/subhangadirli/ZenTab/refs/heads/master/screen.png",
    tags: ["JavaScript", "UI", "Productivity"],
  },
  {
    title: "x-to-mastodon-bot",
    blurb:
      "An automation bot that mirrors posts from X to Mastodon, keeping both timelines in sync without manual work.",
    href: "https://github.com/subhangadirli/x-to-mastodon-bot",
    image:
      "https://raw.githubusercontent.com/subhangadirli/x-to-mastodon-bot/refs/heads/main/assets/banner.png",
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
