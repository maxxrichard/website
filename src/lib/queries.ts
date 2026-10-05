import { asc, desc, eq, and } from "drizzle-orm";
import { db, schema, ensureReady } from "@/db";

const {
  profile, socialLinks, education, experience, researchAreas, projects,
  publications, news, blogPosts, press, teaching, messages,
} = schema;

export async function getProfile() {
  await ensureReady();
  const rows = await db.select().from(profile).where(eq(profile.id, 1)).limit(1);
  return rows[0] ?? null;
}

export async function getSocialLinks(onlyVisible = true) {
  await ensureReady();
  const rows = await db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder), asc(socialLinks.id));
  return onlyVisible ? rows.filter((r) => r.visible) : rows;
}

export async function getEducation() {
  await ensureReady();
  return db.select().from(education).orderBy(asc(education.sortOrder), desc(education.endYear));
}

export async function getExperience() {
  await ensureReady();
  return db.select().from(experience).orderBy(asc(experience.sortOrder), desc(experience.startDate));
}

export async function getResearchAreas() {
  await ensureReady();
  return db.select().from(researchAreas).orderBy(asc(researchAreas.sortOrder), asc(researchAreas.id));
}

export async function getProjects(opts: { publishedOnly?: boolean } = { publishedOnly: true }) {
  await ensureReady();
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.startYear), asc(projects.id));
  return opts.publishedOnly ? rows.filter((p) => p.published) : rows;
}

export async function getProjectBySlug(slug: string) {
  await ensureReady();
  const rows = await db.select().from(projects).where(and(eq(projects.slug, slug), eq(projects.published, true))).limit(1);
  return rows[0] ?? null;
}

export async function getPublications(opts: { publishedOnly?: boolean } = { publishedOnly: true }) {
  await ensureReady();
  const rows = await db.select().from(publications).orderBy(desc(publications.year), asc(publications.sortOrder), asc(publications.id));
  return opts.publishedOnly ? rows.filter((p) => p.published) : rows;
}

export async function getNews(opts: { publishedOnly?: boolean; limit?: number } = { publishedOnly: true }) {
  await ensureReady();
  const rows = await db.select().from(news).orderBy(desc(news.date), desc(news.id));
  const filtered = opts.publishedOnly ? rows.filter((n) => n.published) : rows;
  return opts.limit ? filtered.slice(0, opts.limit) : filtered;
}

export async function getBlogPosts(opts: { publishedOnly?: boolean } = { publishedOnly: true }) {
  await ensureReady();
  const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.id));
  return opts.publishedOnly ? rows.filter((p) => p.published) : rows;
}

export async function getBlogPostBySlug(slug: string) {
  await ensureReady();
  const rows = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true))).limit(1);
  return rows[0] ?? null;
}

export async function getPress(opts: { publishedOnly?: boolean } = { publishedOnly: true }) {
  await ensureReady();
  const rows = await db.select().from(press).orderBy(asc(press.sortOrder), desc(press.date), desc(press.id));
  return opts.publishedOnly ? rows.filter((p) => p.published) : rows;
}

export async function getTeaching() {
  await ensureReady();
  return db.select().from(teaching).orderBy(asc(teaching.sortOrder), desc(teaching.term), desc(teaching.id));
}

export async function getMessages() {
  await ensureReady();
  return db.select().from(messages).orderBy(desc(messages.createdAt));
}

export async function getCounts() {
  await ensureReady();
  const [pubs, projs, newsRows, posts, pressRows, msgs, teach] = await Promise.all([
    db.select().from(publications), db.select().from(projects), db.select().from(news),
    db.select().from(blogPosts), db.select().from(press), db.select().from(messages), db.select().from(teaching),
  ]);
  return {
    publications: pubs.length, projects: projs.length, news: newsRows.length, blog: posts.length,
    press: pressRows.length, messages: msgs.length, unreadMessages: msgs.filter((m) => !m.read).length,
    teaching: teach.length,
  };
}
