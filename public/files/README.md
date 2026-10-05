# Site files

Put your own files here and reference them from the admin panel (or upload directly in the admin).
Everything in this folder is served at `https://<your-domain>/files/...`.

| Folder     | Use for                               | Example path to enter in the admin        |
|------------|---------------------------------------|-------------------------------------------|
| `papers/`  | Paper PDFs                            | `/files/papers/rahman2024-sacnn.pdf`      |
| `posters/` | Conference posters                    | `/files/posters/sacnn-ijcai24-poster.pdf` |
| `slides/`  | Talk slides                           | `/files/slides/icml26-stt-llm.pdf`        |
| `cv/`      | Your CV                               | `/files/cv/Maxx_Richard_Rahman_CV.pdf`    |
| `images/`  | Photos, figures, project/teaching art, hero video (.mp4) | `/files/images/hero.mp4`  |

Tips
- Use short lower-case file names without spaces.
- Images of the current site live in `public/images/site/` (extracted from screenshots). Replace them with the
  originals at the same file names to upgrade quality, or upload new ones and change the path in the admin.
- Files committed here are deployed with the site (works on Vercel too). Files uploaded through the admin are
  stored in `public/uploads/` (or Vercel Blob when configured).
