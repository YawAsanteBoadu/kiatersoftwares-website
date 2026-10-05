# KAiTER Softwares — Website (v1)

The commercial website for **KAiTER Softwares**, built to the _KAiTER Softwares Website — Technical Documentation (v1)_ and the _Commercial Website User Requirements Document_.

- **Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · MDX content · lucide-react**
- **Fully static.** Every route is pre-rendered at build time. No backend, database, CMS or auth.
- **WhatsApp lead capture.** Every lead-generating interaction (Start a Project, Talk to an Expert, Request a Technology Quote, Book a Consultation, Request Hardware Consultation, the Project Request Form) opens a pre-filled WhatsApp chat with **0533289892**.

---

## Quick start

```bash
nvm use            # Node 24 (see .nvmrc); Node >= 20.9 works
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

| Script                                            | What it does                                |
| ------------------------------------------------- | ------------------------------------------- |
| `npm run dev`                                     | Local dev server (shows draft content)      |
| `npm run build` / `npm start`                     | Production build / serve it                 |
| `npm run lint` · `npm run typecheck` · `npm test` | ESLint · `tsc --noEmit` · Vitest unit tests |
| `npm run format` / `format:check`                 | Prettier (with Tailwind class sorting)      |
| `npm run check`                                   | Everything CI runs, in order                |

## Environment variables

| Variable                       | Required    | Purpose                                                                                                                                 |
| ------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | yes         | Business WhatsApp number. `233533289892` (international) or `0533289892` (local — converted automatically). Defaults to `233533289892`. |
| `NEXT_PUBLIC_SITE_URL`         | yes (prod)  | Canonical URL, no trailing slash. Drives canonical tags, Open Graph, `sitemap.xml` and `robots.txt`.                                    |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | recommended | Shown on the Contact page and footer only — never used for form submission in v1. Hidden when empty.                                    |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | optional    | Official address shown on the Contact page. Hidden when empty.                                                                          |
| `NEXT_PUBLIC_SHOW_DRAFTS`      | optional    | `true` shows `draft: true` content in a production build. Drafts always show in `next dev` and on Vercel preview deployments.           |

`NEXT_PUBLIC_*` values are inlined at build time — redeploy after changing them.

## Deploying (Vercel)

1. Push this repository to GitHub and import it in Vercel (framework preset: **Next.js**, no build settings to change).
2. Add the environment variables above for **Production** (and **Preview** if you want).
3. Add the custom domain, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.
4. Enable **Web Analytics** in the Vercel project to receive page views and the funnel events below.

`main` auto-deploys to production; every pull request gets its own preview URL (with drafts visible and `robots.txt` set to disallow indexing). Any Next.js-compatible host works too: `npm run build && npm start`.

## Project structure

```
app/                     Routes (1:1 with the site map) + sitemap.ts, robots.ts, OG image, manifest
  our-work/[slug]/       Project pages, statically generated from content/projects
  insights/[slug]/       Articles, statically generated from content/insights
components/
  layout/                Header, MobileNav, Footer, SocialLinks
  sections/              Hero, TrustStrip, Problem, ProcessSteps, WhyKaiter, CTA, browsers/grids…
  cards/                 ProjectCard, IndustryCard, TestimonialCard, BlogCard, ServicePillarCard
  forms/                 ProjectRequestForm + validation (unit-tested)
  ui/                    Button, Badge, SectionHeading, WhatsAppCTAButton, Mdx, Icon, Logo
content/
  projects/*.mdx         One file per project (see _template.mdx)
  insights/*.mdx         Blog posts
  industries.json        Industry cards
  testimonials.json      Genuine, permissioned testimonials only (empty = section hidden)
lib/
  content.ts             The ONLY module that reads /content — typed, validated with zod at build time
  whatsapp.ts            Number normalisation + every wa.me link and message (unit-tested)
  copy.ts                Fixed brand copy from the requirements document
  site.ts                Site config: contact details, social links, navigation
  analytics.ts           Funnel event tracking
```

## Managing content

Content changes are pull requests against `content/` — no code changes needed.

**Add a project:** copy `content/projects/_template.mdx` to `content/projects/<slug>.mdx` (filename must equal `slug`), put images in `public/images/projects/`, and fill in the frontmatter. The body holds the case study: _The Challenge, The Approach, The Solution, Key Features, Business Impact_. `category` must be one of the Section 16 categories (or a list of them) — the `/our-work` filter picks it up automatically. Set `featured: true` to show it on the Home page.

**Add an insight:** create `content/insights/<slug>.mdx` with `title`, `slug`, `category` (one of the Section 28 categories), `excerpt`, `publishedAt` (YYYY-MM-DD).

**Add a testimonial:** see `content/testimonials.README.md`. Only genuine testimonials with written client permission.

Invalid frontmatter **fails the build** with a message naming the file and field, so broken content can't reach production. Use `draft: true` to review content on a preview deployment before publishing.

## Lead capture

- `WhatsAppCTAButton` renders every WhatsApp CTA as a plain `https://wa.me/233533289892?text=…` link (works without JavaScript) and records an analytics event on click.
- `ProjectRequestForm` validates inline (errors announced to screen readers, focus moves to the first invalid field), then formats every answer into one readable message and opens WhatsApp in a new tab. If a popup blocker stops the new tab, it navigates to WhatsApp in the same tab instead. Nothing is posted to a server.
- "Need Something Similar?" on project pages pre-fills the project name.

## Analytics events

`start_project_click`, `talk_to_expert_click`, `project_request_submit`, `hardware_quote_click`, `book_consultation_click`, `similar_project_click`, `project_category_filter`, `insight_category_filter` — each with a `source` property naming where on the site it happened. Sent to Vercel Analytics (custom events require a Vercel Pro plan), and to Plausible as well if its script is added.

## Launch checklist

These need real information from KAiTER before going live:

- [ ] Replace the two **sample projects** (`draft: true`, hidden in production) with real, client-approved projects and screenshots. Until then `/our-work` shows a "showcase is being prepared" message and the Home page hides the work section.
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` and (optionally) `NEXT_PUBLIC_BUSINESS_ADDRESS`.
- [ ] Add official social profile URLs in `lib/site.ts` → `social` (empty links are hidden; WhatsApp is always shown).
- [ ] Add the parent organization's website in `lib/site.ts` → `parentOrg.url` to enable the "Learn About KAiTER" button on the About page.
- [ ] Add genuine testimonials (optional — the section stays hidden until there are some).
- [ ] Review the five starter Insights articles.
- [ ] Replace the placeholder logo mark in `components/ui/Logo.tsx` and `app/icon.svg` with the official brand logo, if one exists.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
