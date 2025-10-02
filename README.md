## Minimal Apple-style Portfolio

A clean, fast, and responsive static site inspired by Apple's visual language: bold typography, generous spacing, restrained color, and tasteful motion.

### Getting Started

- Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 5500
```

Then open `http://localhost:5500`.

### Case Studies

You have five example case studies and a reusable template.

- Pages: `cs-democracyos.html`, `cs-portal.html`, `cs-opendata.html`, `cs-feedback.html`, `cs-grants.html`
- Template: `cs-template.html` (copy this to start a new study)

Step‑by‑step: add or update a case study

1) Pick your approach
- Edit an existing page (fast): open one of the `cs-*.html` files.
- Create a new page (clean slate): duplicate `cs-template.html` and rename, e.g. `cs-myproject.html`.

2) Set the header and title
- In your page, find the top of `<main>`:
  - Update the small line: `<div class="study-header">PROJECT • SHIPPED YEAR</div>`
  - Update the main title: `<h1 class="study-title">Your project title</h1>`

3) Swap the hero image
- Replace the `src` in the hero block:
  - `<div class="study-hero"><img src="assets/my-hero.jpg" alt="Short alt text"></div>`
- Place your image in `assets/` and use a descriptive `alt`.

4) Edit the left sidebar menu
- The sidebar lives inside `<aside class="study-sidebar">`.
- Each link maps to a section id. Example:
  - `<a href="#overview">Overview</a>` scrolls to `<section id="overview">`.
- To rename or add items:
  - Change the link text and keep the `href` and section `id` in sync.
  - Keep one link with the `active` class by default (usually Overview).

5) Fill in the Overview meta
- Inside `<section id="overview">` update the four blocks in `.study-meta`:
  - `<strong>Role</strong>`, `<strong>Timeline</strong>`, `<strong>Team</strong>`, `<strong>Skills</strong>`
- You can add/remove blocks; they will wrap responsively.

6) Write each section
- Replace the placeholder content in sections like `#observations`, `#market`, `#users`, `#competitors`, `#solution`, `#designs`, `#reflection`.
- Add images inside any section as needed:
  - `<img src="assets/your-image.png" alt="Description">`
- For large images, you can reuse the framed style:
  - Wrap with `<div class="study-hero"> ... </div>` to get the rounded frame.

7) Test navigation and scrollspy
- Open the page in a browser and scroll; the left link for the section in view should highlight automatically.
- Clicking a left‑nav item should smooth‑scroll to that section and update the URL hash.

8) Link from the homepage
- In `index.html`, find the corresponding case card and update its button `href` to your page, e.g. `href="cs-myproject.html"`.
- Button label text is editable inside the card as well.

9) Optional: add a new homepage card
- Duplicate an existing `<article class="case">` in the `#work` section of `index.html`.
- Update the title, description, role link, tags, year, and screenshot `src`.
- Point the “View Case Study” button to your new `cs-*.html` page.

10) Naming and accessibility tips
- Use short, descriptive file names: `cs-<project>.html`.
- Fill all `alt` attributes for images.
- Keep headings in order: page has one `<h1>`, section headings use `<h3>`.

### Customize

- Replace `Your Name`, email, and text in `index.html`.
- Swap placeholder images in `assets/` and update `alt` text.
- Tweak colors and spacing in `styles.css` variables.

### Assets

Place images in `assets/`:

- `assets/favicon.png`
- `assets/og.png`
- `assets/placeholder-1.jpg`, `placeholder-2.jpg`, `placeholder-3.jpg`

Images are optional; the layout will gracefully handle missing files while you iterate.

### Notes

- Typography uses the Inter font with system fallbacks.
- Motion is subtle and respects performance; no heavy libraries.

