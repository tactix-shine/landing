# Tactix website

A static site for Tactix, a cleaning business in Melbourne. NDIS cleaning is the lead service. Plain HTML and CSS with no build step. Photos are ordinary images with captions hidden visually and available to assistive technology. There is no photo viewer, swipe interaction or JavaScript dependency on the public pages.

| Path | Page |
| --- | --- |
| `index.html` | Home. Leads with NDIS cleaning and links to every service |
| `ndis-cleaning/` | NDIS cleaning, the main service page |
| `house-cleaning/` | Residential cleaning |
| `end-of-lease-cleaning/` | End-of-lease cleaning, with a summary of Victorian renting rules |
| `gallery/` | All 20 job photos, grouped by room and visible on the page |
| `404.html` | Not-found page, kept out of search with `noindex` |
| `brochure/ndis-brochure.html` | Two-page A4 source for the NDIS brochure |
| `ndis-cleaning/tactix-ndis-cleaning-brochure.pdf` | The exported brochure, linked from the site |

## Preview

The service links point at folders (`ndis-cleaning/`), so use a local server rather than opening files directly:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/`. `preview.html` shows the home page in desktop and phone frames. Open `preview.html#our-work` to start at the photo showcase, or `preview.html#brochure` for the download section. `header-options.html` compares the three NDIS header designs; these review files are excluded from deployment.

## Publish on GitHub Pages

`.github/workflows/deploy-pages.yml` (at the repo root) publishes this folder on every push to `main`. It leaves out the README, design guide, checks, previews and brochure source.

1. Push the repo to GitHub. Free Pages needs a public repo. `images/` (the original photos) is in `.gitignore`, so only the resized copies go up.
2. In the repo, open Settings > Pages and set Source to **GitHub Actions**.
3. Under Custom domain, enter `tactixshine.au`. At your domain registrar, add A records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. Then tick Enforce HTTPS once it's available.

Use the custom domain. The canonical URLs, sitemap and 404 page all assume the site is served from `https://tactixshine.au/`. At a `username.github.io/repo/` address the pages still work, but the 404 page loses its styles and search engines would see the canonicals pointing elsewhere.

## SEO setup

Every page has its own title, meta description, canonical URL, Open Graph tags and JSON-LD. The home page carries `LocalBusiness` and `WebSite` schema. Each service page carries `Service` and `BreadcrumbList` schema. `robots.txt` and `sitemap.xml` sit at the root.

All absolute URLs assume the site lives at `https://tactixshine.au/`. If the domain differs, search and replace `https://tactixshine.au` across the HTML, `robots.txt` and `sitemap.xml`. Update `<lastmod>` in `sitemap.xml` when page content changes.

The FAQ sections are plain content. They have no `FAQPage` schema, because Google stopped showing FAQ rich results in May 2026.

## Photo layouts

The homepage uses three selected images in a staggered composition. The job photos page groups all 20 photos by room, with a large lead photo and smaller supporting photos on desktop. On phones, all photos stack at the full content width. Photos have descriptive image alternatives and visually hidden captions; clicking them does nothing. Category links provide direct access to each room type. Desktop and mobile layout measurements are in `DESIGN.md`.

## Accessibility and key information

The homepage names NDIS cleaning in the H1 and gives direct links to services, getting started, the brochure and contact. The NDIS page places what we clean before the process explanation. Reading text uses a minimum of 16px; secondary notes use 14px. The phone header keeps the logo, Call and Menu on one row. A native disclosure menu reveals the navigation links with 48px tap targets and works without JavaScript. A skip link moves keyboard focus to main content, and reduced-motion preferences disable smooth scrolling. The brochure is also available as an ordinary HTML service page.

## Brochure

Edit `brochure/ndis-brochure.html`, then run `./brochure/export.sh` to rebuild the PDF. It uses headless Google Chrome. The homepage and job photos page include a compact download strip with no cover image or embedded PDF. The existing cover asset is unused by the public pages. To print by hand, open the HTML in Chrome, choose Save as PDF, set margins to None and turn on Background graphics.

## Checks

`node check.cjs` checks all five pages. It covers one H1, title and description lengths, unique titles and descriptions, canonical and `og:image`, valid JSON-LD, alt attributes, in-page and relative links, overflow at eight widths from 320 to 1440px, the skip link and its focus destination, reduced motion, static photos, quick-link tap targets, the compact mobile header, keyboard menu operation, expanded navigation at 320px and the brochure PDF. It also saves desktop and phone screenshots to `previews/`. It needs Node, Playwright and Google Chrome.

Physical phone, browser zoom and screen-reader checks remain manual launch checks.

## Before launch

- The job photos come from real client homes. Get each client's permission before publishing.
- Confirm Tactix's NDIS provider status. The site deliberately makes no claim about registration.
- Replace the CSS-cropped logo with the master SVG.
- Set up a Google Business Profile with the same name, phone number and service area as the site.
- Add suburbs or regions to the copy once the service area is confirmed.
