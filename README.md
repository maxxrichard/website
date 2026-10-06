# Website


## 1. Quick start (Local)

```bash
git clone https://github.com/maxxrichard/website.git
cd website
npm install
cp .env.example .env            # then edit ADMIN_EMAIL / ADMIN_PASSWORD / SESSION_SECRET
npm run setup                   # creates data/site.db, runs migrations, seeds all content
npm run dev                     # http://localhost:3000  (admin: http://localhost:3000/admin)
```

Production build:

```bash
npm run build
npm start        # runs the standalone server with .env loaded (scripts/start.mjs)
```

## 2. Site structure

The pages mirror the original Wix site one to one.

| URL | Content | Managed in admin under |
|---|---|---|
| `/` | Hero (name, title, social icons, tagline, photo/video), About Me with portrait, Recent Publications (the three entries marked *Highlight*), News list, Contact footer | Profile, Social links, Publications, News |
| `/about` | About Me text + talk photo, Education, Experience | Profile, Education, Experience |
| `/research` | Research Projects: intro + project texts with "More info" links and images | Profile (intro), Projects |
| `/publications` | Publications by year with venue tags, Abstract / Paper / Code / Poster / Video pills and figures | Publications |
| `/teaching` | Teaching intro + course cards with images and term pills | Profile (intro), Teaching |
| `/media` | Media Coverage: alternating video + text entries | Profile (intro), Media |
| `/blogs` | Blog Posts: image + text entries (external or internal posts) | Profile (intro), Blog |
| `/contact` | Contact information, map and a contact form (messages are stored) | Profile, Messages |
| `/news` | Full news list (also shown on the home page) | News |
| `/admin` | CMS | — |

Header (logo + menu) and the black Contact footer are shared by every page and driven by **Profile & settings**
and **Social links**.

### Interactive features

- Home: full-screen background video (`Profile → Hero video`, poster image as fallback), animated counters, scroll-reveal sections.
- Publications: filter by type and year, live search, expandable abstracts, one-click **Cite** (copies the reference), figure hover zoom.
- Research: sticky project index with scroll-spy, numbered projects, image hover zoom.
- Everywhere: animated header underline, off-canvas mobile menu, back-to-top button, button and card hover effects. Animations respect `prefers-reduced-motion`.

### Where to put files

`public/files/` is the folder for your own material — see `public/files/README.md`:

```
public/files/papers/    paper PDFs            →  /files/papers/<name>.pdf
public/files/posters/   posters               →  /files/posters/<name>.pdf
public/files/slides/    slides                →  /files/slides/<name>.pdf
public/files/cv/        CV                    →  /files/cv/<name>.pdf
public/files/images/    photos, figures, hero video (.mp4)
```

Enter the resulting path (for example `/files/papers/sacnn.pdf`) in the matching admin field (Paper URL, Poster URL,
Figure, …) and the pill/figure appears on the site. The admin upload button is an alternative that stores files in
`public/uploads/` (or Vercel Blob).

The images of the current site live in `public/images/site/` (extracted from page screenshots). Replace them with
the originals under the same names to upgrade their quality.

## 3. Admin panel

- Login at `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the environment. Sessions are signed
  HttpOnly cookies (7 days) using `SESSION_SECRET`.
- Every content type has a list (search, visibility toggle, delete) and a form (create/edit).
- **Images / PDFs** can be uploaded from any image field (stored in `public/uploads`, max 15 MB). You can also
  paste an external URL.
- **Markdown** is supported in About me, project descriptions, blog posts and news bodies.
- Author lists: wrap your own name in double asterisks (`**Rahman, M.R.**`) to render it bold.
- **Messages** from the contact form are listed under *Messages* with read/unread state.

## 4. Configuration (`.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | `file:./data/site.db` (default) or a libSQL/Turso URL such as `libsql://xyz.turso.io` |
| `DATABASE_AUTH_TOKEN` | Only for remote libSQL/Turso |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin credentials |
| `SESSION_SECRET` | Long random string signing the admin cookie (`openssl rand -hex 32`) |
| `SITE_URL` | Public URL, used for metadata, `robots.txt` and `sitemap.xml` |
| `UPLOAD_DIR` | Optional, defaults to `public/uploads` |
| `BLOB_READ_WRITE_TOKEN` | Optional; when set (Vercel Blob) uploads go to Blob storage instead of local disk. Public and private stores both work; private files are served via `/blob/…` |
| `BLOB_ACCESS` | Optional; `public` or `private` to skip the automatic store-type detection |
| `AUTO_SEED` | Optional; `false` disables automatic seeding of an empty database |

## 5. Database

Schema: `src/db/schema.ts`. Tables: `profile`, `social_links`, `education`, `experience`, `research_areas`,
`projects`, `publications`, `news`, `blog_posts`, `press`, `teaching`, `messages`.

```bash
npm run db:generate   # create a new migration after editing the schema
npm run db:migrate    # apply migrations
npm run db:seed       # (re)load the full seed content – replaces content tables, keeps messages
npm run db:reset      # delete the DB and start over
```

The seed (`scripts/seed.ts`) contains the complete content of the site. Everything can afterwards be edited in the
admin panel; the DB is the source of truth.

## 6. Hosting and connecting your domain

### Vercel

The app initialises itself: on the first request it runs the database migrations and, if the database is empty,
loads the full site content. So a plain "Import Git Repository" deploy works immediately.

1. Import the repository in Vercel (framework: Next.js, no build settings to change).
2. Set the environment variables `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` and `SITE_URL`.
3. **Make the database permanent.** Vercel's filesystem is read-only, so without a database URL the site runs from a
   temporary SQLite copy in `/tmp`: pages work, but admin edits are lost whenever the function restarts (the admin
   shows a warning). Create a free [Turso](https://turso.tech) database and set
   `DATABASE_URL=libsql://<name>-<org>.turso.io` and `DATABASE_AUTH_TOKEN=<token>` in Vercel, then redeploy. The app
   migrates and seeds the Turso database automatically on the first request.
   ```bash
   # with the Turso CLI
   turso db create maxxrichard-site
   turso db show maxxrichard-site --url
   turso db tokens create maxxrichard-site
   ```
4. **Uploads.** Add a Vercel Blob store to the project (Storage → Blob). Vercel injects `BLOB_READ_WRITE_TOKEN`
   and the admin upload button then stores images and PDFs in Blob. Without it you can still paste image URLs.
5. Add `maxxrichard.com` and `www.maxxrichard.com` under *Project → Settings → Domains* and create the DNS records
   Vercel shows (an `A` record for the apex and a `CNAME` for `www`).

## 7. Project layout

```
src/app/(site)/        public pages (home, about, research, publications, teaching, media, blogs, contact, news)
src/app/admin/         CMS (login, dashboard, generic resource list/form, profile, messages)
src/app/api/upload     image/PDF upload endpoint (admin only)
src/components/        header, footer, social icons, publication entry, contact form
src/db/                Drizzle schema + client
src/lib/               auth, queries, markdown helpers, resource (CMS form) definitions
scripts/               migrate.ts, seed.ts, seed-if-empty.ts
drizzle/               SQL migrations
public/images/site     site images (portrait, hero, logo, project/teaching/publication figures)
public/files           your papers, posters, slides, CV and pictures
```

To add a new field to a content type: edit `src/db/schema.ts`, run `npm run db:generate && npm run db:migrate`,
then add the field to `src/lib/resources.ts` (admin form) and render it in the page component.

