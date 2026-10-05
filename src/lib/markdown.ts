import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/** Render trusted (admin-authored) markdown to HTML. */
export function renderMarkdown(md: string | null | undefined): string {
  if (!md) return "";
  return marked.parse(md) as string;
}

/** Turn **Name** author markup into <b>Name</b> and escape everything else. */
export function renderAuthors(authors: string): string {
  const escaped = authors
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function toYouTubeEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  const m =
    url.match(/youtube\.com\/embed\/([\w-]+)/) ||
    url.match(/youtu\.be\/([\w-]+)/) ||
    url.match(/[?&]v=([\w-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export function formatDate(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "2-digit" }): string {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", opts);
}
