import { schema } from "@/db";

export type FieldType = "text" | "textarea" | "markdown" | "number" | "checkbox" | "date" | "select" | "image" | "url" | "email";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
  placeholder?: string;
  default?: string | number | boolean;
  /** show in the list table */
  list?: boolean;
  width?: "half" | "full";
}

export interface ResourceDef {
  key: string;
  label: string;
  singular: string;
  description: string;
  table: keyof typeof schema;
  titleField: string;
  fields: FieldDef[];
  /** field used for default ordering in the admin list (desc) */
  orderBy?: string;
  orderDir?: "asc" | "desc";
  hasTimestamps?: boolean;
  slugFrom?: string; // auto slug source
}

const timestampsFields: FieldDef[] = [];

export const resources: Record<string, ResourceDef> = {
  publications: {
    key: "publications", label: "Publications", singular: "Publication", table: "publications", titleField: "title", orderBy: "year", orderDir: "desc", hasTimestamps: true,
    description: "Papers, preprints, chapters. Use **Rahman, M.R.** (double asterisks) in the author list to bold your name.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "authors", label: "Authors", type: "textarea", required: true, help: "e.g. **Rahman, M.R.**, Maass, W." },
      { name: "year", label: "Year", type: "number", required: true, list: true, width: "half", default: new Date().getFullYear() },
      { name: "type", label: "Type", type: "select", required: true, options: ["Conference", "Journal", "Workshop", "Preprint", "Book Chapter", "Thesis", "Other"], list: true, width: "half", default: "Conference" },
      { name: "venue", label: "Venue (full)", type: "text", required: true, help: "e.g. In Proceedings of the 33rd International Joint Conference on Artificial Intelligence (IJCAI 24)" },
      { name: "venueShort", label: "Venue (short)", type: "text", width: "half", placeholder: "IJCAI 2024" },
      { name: "status", label: "Status", type: "select", options: ["Published", "Accepted", "Under Review", "In Preparation"], width: "half", default: "Published", list: true },
      { name: "paperUrl", label: "Paper URL", type: "url", width: "half" },
      { name: "pdfUrl", label: "PDF URL", type: "url", width: "half" },
      { name: "codeUrl", label: "Code / GitHub URL", type: "url", width: "half" },
      { name: "doi", label: "DOI", type: "text", width: "half", placeholder: "10.1234/abcd" },
      { name: "award", label: "Award", type: "text", placeholder: "Best Paper Award" },
      { name: "abstract", label: "Abstract", type: "textarea" },
      { name: "bibtex", label: "BibTeX", type: "textarea" },
      { name: "highlight", label: "Highlight (selected publication)", type: "checkbox", width: "half" },
      { name: "published", label: "Visible on site", type: "checkbox", default: true, width: "half", list: true },
      { name: "sortOrder", label: "Sort order within year", type: "number", default: 0, width: "half" },
      ...timestampsFields,
    ],
  },
  projects: {
    key: "projects", label: "Projects", singular: "Project", table: "projects", titleField: "title", orderBy: "sortOrder", orderDir: "asc", hasTimestamps: true, slugFrom: "title",
    description: "Research projects shown on the Research page. Each project gets its own detail page.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "slug", label: "Slug (URL)", type: "text", help: "Leave empty to generate from the title.", width: "half" },
      { name: "category", label: "Category", type: "text", required: true, list: true, width: "half", default: "Research", help: "Free text; used for the filter buttons." },
      { name: "summary", label: "Short summary", type: "textarea", required: true },
      { name: "contentMarkdown", label: "Description (Markdown)", type: "markdown" },
      { name: "image", label: "Cover image", type: "image" },
      { name: "url", label: "Project URL", type: "url", width: "half" },
      { name: "codeUrl", label: "Code URL", type: "url", width: "half" },
      { name: "partners", label: "Partners / Funding", type: "text" },
      { name: "startYear", label: "Start", type: "text", width: "half", placeholder: "2024" },
      { name: "endYear", label: "End (empty = Present)", type: "text", width: "half" },
      { name: "status", label: "Status", type: "select", options: ["Ongoing", "Completed", "Planned"], width: "half", default: "Ongoing", list: true },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
      { name: "featured", label: "Featured", type: "checkbox", width: "half" },
      { name: "published", label: "Visible on site", type: "checkbox", default: true, width: "half", list: true },
    ],
  },
  news: {
    key: "news", label: "News", singular: "News item", table: "news", titleField: "title", orderBy: "date", orderDir: "desc", hasTimestamps: true,
    description: "Short dated announcements. The four most recent appear on the home page.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "date", label: "Date", type: "date", required: true, list: true, width: "half" },
      { name: "category", label: "Category", type: "select", options: ["News", "Publication", "Award", "Talk", "Media", "Teaching", "Other"], default: "News", width: "half", list: true },
      { name: "bodyMarkdown", label: "Text (Markdown)", type: "markdown" },
      { name: "url", label: "Link", type: "url" },
      { name: "published", label: "Visible on site", type: "checkbox", default: true, list: true },
    ],
  },
  blog: {
    key: "blog", label: "Blog", singular: "Blog post", table: "blogPosts", titleField: "title", orderBy: "publishedAt", orderDir: "desc", hasTimestamps: true, slugFrom: "title",
    description: "Long-form posts written in Markdown. Add a Medium link in 'External URL' if the post lives elsewhere.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "slug", label: "Slug (URL)", type: "text", help: "Leave empty to generate from the title.", width: "half" },
      { name: "publishedAt", label: "Publish date", type: "date", required: true, width: "half", list: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "contentMarkdown", label: "Content (Markdown)", type: "markdown" },
      { name: "coverImage", label: "Cover image", type: "image" },
      { name: "tags", label: "Tags (comma separated)", type: "text", width: "half" },
      { name: "readingMinutes", label: "Reading time (min)", type: "number", width: "half" },
      { name: "externalUrl", label: "External URL (e.g. Medium)", type: "url" },
      { name: "published", label: "Visible on site", type: "checkbox", default: true, list: true },
    ],
  },
  press: {
    key: "press", label: "Press", singular: "Press item", table: "press", titleField: "title", orderBy: "sortOrder", orderDir: "asc",
    description: "Media coverage. Paste a YouTube link to embed the video.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "outlet", label: "Outlet", type: "text", required: true, list: true, width: "half" },
      { name: "date", label: "Date", type: "date", required: true, list: true, width: "half" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "videoUrl", label: "YouTube URL", type: "url", width: "half" },
      { name: "url", label: "Article URL", type: "url", width: "half" },
      { name: "image", label: "Image (if no video)", type: "image" },
      { name: "language", label: "Language", type: "text", width: "half" },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
      { name: "published", label: "Visible on site", type: "checkbox", default: true, list: true },
    ],
  },
  teaching: {
    key: "teaching", label: "Teaching", singular: "Teaching entry", table: "teaching", titleField: "course", orderBy: "sortOrder", orderDir: "asc",
    description: "Courses, seminars and supervision.",
    fields: [
      { name: "course", label: "Course", type: "text", required: true, list: true },
      { name: "term", label: "Term", type: "text", required: true, list: true, width: "half", placeholder: "Winter 2025/26" },
      { name: "role", label: "Role", type: "text", required: true, width: "half", default: "Teaching Assistant", list: true },
      { name: "institution", label: "Institution", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "url", label: "Course URL", type: "url", width: "half" },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
    ],
  },
  education: {
    key: "education", label: "Education", singular: "Education entry", table: "education", titleField: "degree", orderBy: "sortOrder", orderDir: "asc",
    description: "Degrees shown in the timeline on the home page.",
    fields: [
      { name: "degree", label: "Degree", type: "text", required: true, list: true },
      { name: "institution", label: "Institution", type: "text", required: true, list: true },
      { name: "location", label: "Location", type: "text", width: "half" },
      { name: "startYear", label: "Start year", type: "text", width: "half", list: true },
      { name: "endYear", label: "End year (empty = Present)", type: "text", width: "half" },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
      { name: "thesis", label: "Thesis title", type: "textarea" },
      { name: "thesisUrl", label: "Thesis / paper URL", type: "url", width: "half" },
      { name: "codeUrl", label: "Code URL", type: "url", width: "half" },
      { name: "coursework", label: "Selected coursework", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  experience: {
    key: "experience", label: "Experience", singular: "Experience entry", table: "experience", titleField: "role", orderBy: "sortOrder", orderDir: "asc",
    description: "Positions shown in the timeline on the home page.",
    fields: [
      { name: "role", label: "Role", type: "text", required: true, list: true },
      { name: "organization", label: "Organization", type: "text", required: true, list: true },
      { name: "organizationUrl", label: "Organization URL", type: "url" },
      { name: "location", label: "Location", type: "text", width: "half" },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
      { name: "startDate", label: "Start", type: "text", width: "half", placeholder: "2021", list: true },
      { name: "endDate", label: "End (empty = Present)", type: "text", width: "half" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  "research-areas": {
    key: "research-areas", label: "Research areas", singular: "Research area", table: "researchAreas", titleField: "title", orderBy: "sortOrder", orderDir: "asc",
    description: "The 'What I'm doing' cards on the home and research pages.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "select", options: ["flask", "pulse", "analytics", "chat", "medkit", "fitness", "network", "sparkles", "book", "school", "news"], default: "flask", width: "half", list: true },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
    ],
  },
  "social-links": {
    key: "social-links", label: "Social links", singular: "Social link", table: "socialLinks", titleField: "label", orderBy: "sortOrder", orderDir: "asc",
    description: "Icons in the sidebar.",
    fields: [
      { name: "label", label: "Label", type: "text", required: true, list: true },
      { name: "platform", label: "Platform (icon)", type: "select", required: true, list: true, options: ["linkedin", "github", "scholar", "huggingface", "orcid", "researchgate", "dblp", "arxiv", "medium", "twitter", "facebook", "instagram", "youtube", "website", "email", "cv", "link"] },
      { name: "url", label: "URL", type: "text", required: true, list: true },
      { name: "sortOrder", label: "Sort order", type: "number", default: 0, width: "half" },
      { name: "visible", label: "Visible", type: "checkbox", default: true, width: "half", list: true },
    ],
  },
};

export const resourceList = Object.values(resources);
export function getResource(key: string): ResourceDef | null { return resources[key] ?? null; }
