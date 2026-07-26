import { blog } from "./site";

export const feedUrl = `${blog.base}/@${blog.user}/feed.xml`;
export const profileUrl = `${blog.base}/@${blog.user}`;

export type Post = {
  title: string;
  href: string;
  published: string;
  excerpt: string;
  tags: string[];
};

const named: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decode(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] !== "#") return named[code.toLowerCase()] ?? match;

    const point =
      code[1] === "x" || code[1] === "X"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);

    return Number.isFinite(point) ? String.fromCodePoint(point) : match;
  });
}

function pattern(tag: string, flags: string) {
  return new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, flags);
}

/** CDATA is passed through verbatim, everything else is entity decoded */
function unwrap(raw: string): string {
  const trimmed = raw.trim();
  const cdata = trimmed.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : decode(trimmed);
}

function tagText(xml: string, tag: string): string {
  const match = xml.match(pattern(tag, "i"));
  return match ? unwrap(match[1]) : "";
}

function tagList(xml: string, tag: string): string[] {
  return [...xml.matchAll(pattern(tag, "gi"))]
    .map((match) => unwrap(match[1]))
    .filter(Boolean);
}

/**
 * Descriptions arrive as escaped HTML, so the markup is stripped to plain text
 * for the card. Omicron appends a read-the-full-article link to every item,
 * which is dropped because the whole card already links to the post.
 */
function toExcerpt(html: string, limit = 170): string {
  const text = decode(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s*Read the full article\s*$/i, "")
    .trim();

  if (text.length <= limit) return text;

  const cut = text.slice(0, limit);
  const space = cut.lastIndexOf(" ");
  return `${(space > 0 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

export function parseFeed(xml: string, limit = 4): Post[] {
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)]
    .slice(0, limit)
    .map(([, item]) => ({
      title: tagText(item, "title"),
      href: tagText(item, "link") || tagText(item, "guid"),
      published: tagText(item, "pubDate"),
      excerpt: toExcerpt(tagText(item, "description")),
      tags: tagList(item, "category"),
    }))
    .filter((post) => post.title && post.href);
}

/** fixed to UTC so the build and the reader never disagree on the date */
export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
