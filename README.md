# Yaxley Cheng — Portfolio

Personal portfolio site for Yaxley Cheng: selected work with case-study pages, About, Resume, Contact, and an optional Reflections section.

Built as a static site with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages with GitHub Actions. No database, no backend: push to `main` and the site rebuilds and publishes itself.

## Run it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:4871>. The page reloads as you edit.

`npm run build` writes the finished site to `_site/`.

## Where the content lives

All of Yaxley's information is in `src/_data/`. Edit these JSON files and everything else updates:

| File | What it controls |
| --- | --- |
| `site.json` | Name, email, LinkedIn/GitHub links, hero text, stats, "How I work" pillars, call-to-action text, footer |
| `projects.json` | The Selected Work cards **and** each project's detail page (`/work/<slug>/`) |
| `experience.json` | Education, roles (shown on the home accordion and the Resume page), skills |
| `about.json` | The About page: statement, facts, story rows, "Why I do this", "Beyond work" |
| `reflections.json` | Reflections posts. While `posts` is empty the page and its nav links are not generated at all; add a post and they appear (the first post is also teased on the home page) |

The content is taken from Yaxley's resume. Numbers on the site (250+ targets, ~35% fewer errors, $3–5M seed round, and so on) come straight from it, so keep them in sync if the resume changes.

Optional sections: set `about.why` to an object (see the git history for the shape) to add a personal essay with a pull quote on the About page, which also switches the hero button to "Why I do this".

### Adding images

Drop files in `src/assets/` and reference them with a leading slash, e.g. `"portrait": "/assets/portrait.jpg"`:

- **Portrait**: set `portrait` in `site.json`. Until then a monogram is shown.
- **Project images**: set `image` on a project in `projects.json` (4:3 works best for the card; the detail page shows it wide). Without one, a coloured tile is used (`tile` picks which colour, 1–6).
- **Logos**: set `logo` on a role or school in `experience.json`. Without one, initials are shown.
- **About photos**: add `{ "src": "/assets/about/photo.jpg", "alt": "..." }` entries to `about.beyond.images`.
- **Social preview** (the card shown when the link is shared on LinkedIn or in messages): `src/assets/og.png`, 1200×630. Replace it with a photo-based version once there is a portrait.

Images to collect: a portrait (roughly 4:5, at least 1200px tall), optional logos for Columbia Business School, Emory Goizueta, and each firm (square, PNG or SVG), optional 4:3 images for the six project cards, and one or two wide photos for "Beyond work".

### Changing the colour

The whole palette hangs off `--accent` (and the `--tint*` values) at the top of `src/css/style.css`.

## Going live on GitHub Pages

Everything is in place; the site only needs to be pushed to a repository under Yaxley's GitHub account (`YaxleyCY`) with Pages switched on.

1. Create an **empty** repository under her account (no README, no .gitignore).
   - Name it **`YaxleyCY.github.io`** to publish at `https://yaxleycy.github.io/`, or
   - name it anything else (e.g. `portfolio`) to publish at `https://yaxleycy.github.io/portfolio/`.
   The workflow derives the URL prefix, canonical URLs, and sitemap from the repository name and owner, so no config changes are needed either way.
2. Push this code to it (from a clone of this repo):

   ```bash
   git remote add yaxley https://github.com/YaxleyCY/<repo-name>.git
   git push -u yaxley main
   ```

3. In the repository on GitHub: **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
4. The **Deploy to GitHub Pages** workflow (`.github/workflows/deploy.yml`) runs on every push to `main`. The first run takes about a minute; after that the site is live at the URL above and every later push redeploys it.

What the build ships, besides the pages: `robots.txt`, `sitemap.xml`, a `404.html` GitHub Pages serves for unknown URLs, canonical and Open Graph tags on every page, and a `Person` JSON-LD block on every page for search engines.

### Optional: custom domain

If she buys a domain later, add it under **Settings → Pages → Custom domain**, create the DNS records GitHub shows, and set `SITE_URL` in `.github/workflows/deploy.yml` to that domain (and `PATH_PREFIX` to `/`).

## Project layout

```
src/
  _data/          content (JSON)
  _includes/      layout + shared partials (header, footer, icons)
  index.njk       home
  about.njk       /about/
  resume.njk      /resume/
  reflections.njk /reflections/
  contact.njk     /contact/
  work.njk        generates one page per project at /work/<slug>/
  404.njk         /404.html
  robots.njk      /robots.txt
  sitemap.njk     /sitemap.xml
  css/style.css
  js/main.js      nav, reveal animations, filters, accordion, lightbox
  assets/         images, favicon
eleventy.config.js
.github/workflows/deploy.yml
```
