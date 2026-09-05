/**
 * The resume markup and its print stylesheet live in the resume repo and are
 * inlined here at build time, so the paper always matches the newest resume
 * on the next deploy. The PDF download stays fully dynamic through the
 * `latest` release redirect in `site.resumePdf`.
 */
const RAW =
  "https://raw.githubusercontent.com/subhangadirli/resume/master";

export const resumeHtmlUrl = `${RAW}/resume.html`;
export const resumeCssUrl = `${RAW}/style.css`;

function absolutizeAssets(value: string): string {
  return value
    .replace(/url\(\s*["']?assets\//g, `url("${RAW}/assets/`)
    .replace(/((?:src|href)=")assets\//g, `$1${RAW}/assets/`);
}

/**
 * The resume stylesheet targets bare `body`, `a` and `*`, which would leak
 * into the dark wrapper. Every rule is scoped under `.paper` instead, with
 * at-rules such as `@font-face` and `@page` left untouched.
 */
function scopeCss(css: string): string {
  const uncommented = css.replace(/\/\*[\s\S]*?\*\//g, "");
  return uncommented.replace(
    /(^|})\s*([^@{}][^{}]*)\{/g,
    (_match, pre, selectors) => {
      const scoped = String(selectors)
        .split(",")
        .map((part) => {
          const selector = part.trim();
          if (selector === "html" || selector === "body") return ".paper";
          if (selector === "*") return ".paper, .paper *";
          return `.paper ${selector}`;
        })
        .join(", ");
      return `${pre} ${scoped} {`;
    },
  );
}

export type ResumeSnapshot = { body: string; css: string };

export async function fetchResume(): Promise<ResumeSnapshot> {
  const empty: ResumeSnapshot = { body: "", css: "" };

  try {
    const [htmlRes, cssRes] = await Promise.all([
      fetch(resumeHtmlUrl, { signal: AbortSignal.timeout(10000) }),
      fetch(resumeCssUrl, { signal: AbortSignal.timeout(10000) }),
    ]);

    if (!htmlRes.ok) console.warn(`[resume] markup returned ${htmlRes.status}`);
    if (!cssRes.ok) console.warn(`[resume] stylesheet returned ${cssRes.status}`);
    if (!htmlRes.ok || !cssRes.ok) return empty;

    const html = await htmlRes.text();
    const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]?.trim() ?? "";

    if (!body) {
      console.warn("[resume] no body found in the fetched markup");
      return empty;
    }

    return {
      body: absolutizeAssets(body),
      css: scopeCss(absolutizeAssets(await cssRes.text())),
    };
  } catch (err) {
    console.warn("[resume] could not fetch the resume at build time", err);
    return empty;
  }
}
