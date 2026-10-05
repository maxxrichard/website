import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/** Single-row table holding the site owner's profile and global settings. */
export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey(),
  fullName: text("full_name").notNull(),
  shortName: text("short_name"),
  jobTitle: text("job_title").notNull(),
  tagline: text("tagline"),
  avatar: text("avatar"),
  aboutMarkdown: text("about_markdown").notNull().default(""),
  email: text("email"),
  secondaryEmail: text("secondary_email"),
  phone: text("phone"),
  location: text("location"),
  affiliation: text("affiliation"),
  affiliationUrl: text("affiliation_url"),
  cvUrl: text("cv_url"),
  mapEmbedUrl: text("map_embed_url"),
  siteTitle: text("site_title"),
  siteDescription: text("site_description"),
  footerText: text("footer_text"),
  updatedAt: text("updated_at"),
});

export const socialLinks = sqliteTable("social_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  platform: text("platform").notNull(), // e.g. linkedin, github, scholar, huggingface, medium, orcid, twitter, email
  label: text("label").notNull(),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  location: text("location"),
  startYear: text("start_year"),
  endYear: text("end_year"),
  thesis: text("thesis"),
  thesisUrl: text("thesis_url"),
  codeUrl: text("code_url"),
  coursework: text("coursework"),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const experience = sqliteTable("experience", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  role: text("role").notNull(),
  organization: text("organization").notNull(),
  organizationUrl: text("organization_url"),
  location: text("location"),
  startDate: text("start_date"),
  endDate: text("end_date"), // null/"" => Present
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const researchAreas = sqliteTable("research_areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("flask"), // key of an icon in the icon map
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull().default("Research"),
  summary: text("summary").notNull().default(""),
  contentMarkdown: text("content_markdown").notNull().default(""),
  image: text("image"),
  url: text("url"),
  codeUrl: text("code_url"),
  partners: text("partners"),
  startYear: text("start_year"),
  endYear: text("end_year"),
  status: text("status").notNull().default("Ongoing"), // Ongoing | Completed
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const publications = sqliteTable("publications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: integer("year").notNull(),
  authors: text("authors").notNull(), // use **Rahman, M.R.** to bold the owner
  title: text("title").notNull(),
  venue: text("venue").notNull(),
  venueShort: text("venue_short"),
  type: text("type").notNull().default("Conference"), // Conference | Journal | Workshop | Preprint | Book Chapter | Thesis
  paperUrl: text("paper_url"),
  pdfUrl: text("pdf_url"),
  codeUrl: text("code_url"),
  doi: text("doi"),
  abstract: text("abstract"),
  award: text("award"),
  bibtex: text("bibtex"),
  status: text("status").notNull().default("Published"), // Published | Accepted | Under Review | In Preparation
  highlight: integer("highlight", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(), // ISO yyyy-mm-dd
  title: text("title").notNull(),
  bodyMarkdown: text("body_markdown").notNull().default(""),
  category: text("category").notNull().default("News"), // News | Award | Talk | Publication | Media
  url: text("url"),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  contentMarkdown: text("content_markdown").notNull().default(""),
  coverImage: text("cover_image"),
  tags: text("tags"), // comma separated
  externalUrl: text("external_url"), // e.g. Medium link
  readingMinutes: integer("reading_minutes"),
  publishedAt: text("published_at").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const press = sqliteTable("press", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  outlet: text("outlet").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  videoUrl: text("video_url"), // YouTube watch or embed URL
  image: text("image"),
  url: text("url"),
  language: text("language"),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const teaching = sqliteTable("teaching", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  term: text("term").notNull(), // e.g. "Winter 2024/25"
  course: text("course").notNull(),
  role: text("role").notNull().default("Teaching Assistant"),
  institution: text("institution"),
  description: text("description"),
  url: text("url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
  read: integer("read", { mode: "boolean" }).notNull().default(false),
});

export type Profile = typeof profile.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type ResearchArea = typeof researchAreas.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Publication = typeof publications.$inferSelect;
export type NewsItem = typeof news.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type PressItem = typeof press.$inferSelect;
export type Teaching = typeof teaching.$inferSelect;
export type Message = typeof messages.$inferSelect;
