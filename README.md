# KAiTER Softwares — Website

The commercial website for **KAiTER Softwares**, a technology consulting and custom software development company.

**Tech Stack:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · MDX content · lucide-react

**Key Features:**
- Fully static. Every route is pre-rendered at build time.
- WhatsApp lead capture. All CTA interactions route to **+233 533 289 892**.
- MDX-based content management for projects and articles.
- Type-safe content validation at build time.

---

## Quick Start

```bash
nvm use            # Node 24 (see .nvmrc); Node >= 20.9 works
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Environment Variables

| Variable                       | Required    | Purpose                                                                                                 |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | yes         | Business WhatsApp number. `233533289892` (international) or `0533289892` (local). Defaults to local.   |
| `NEXT_PUBLIC_SITE_URL`         | yes (prod)  | Canonical URL, no trailing slash. Drives canonical tags, Open Graph, `sitemap.xml` and `robots.txt`.    |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | recommended | Email shown on the Contact page and footer. Hidden when empty.                                          |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | optional    | Official address shown on the Contact page. Hidden when empty.                                          |
| `NEXT_PUBLIC_SHOW_DRAFTS`      | optional    | `true` shows draft content in production. Drafts always show in `next dev` and preview deployments.      |

`NEXT_PUBLIC_*` values are inlined at build time — redeploy after changing them.

## Deployment (Vercel)

1. Push this repository to GitHub and import it in Vercel (framework preset: **Next.js**).
2. Add the environment variables above for **Production** and **Preview**.
3. Add your custom domain and set `NEXT_PUBLIC_SITE_URL` accordingly, then redeploy.
4. Enable **Web Analytics** in the Vercel project to track page views.

`main` auto-deploys to production; every pull request gets its own preview URL. Any Next.js-compatible host works: `npm run build && npm start`.

## Project Structure

```
app/                       Routes + sitemap.ts, robots.ts, OG image, manifest
  our-work/[slug]/         Project detail pages
  insights/[slug]/         Article pages
components/
  layout/                  Header, Footer, Navigation
  sections/                Hero, CTA, Process, Cards, Grids…
  cards/                   ProjectCard, IndustryCard, TestimonialCard…
  ui/                      Button, Badge, Icon, Logo, Mdx renderer
content/
  projects/*.mdx           Project case studies
  insights/*.mdx           Blog articles
  industries.json          Industry cards data
  testimonials.json        Client testimonials
lib/
  content.ts               Content loader with Zod validation
  site.ts                  Site config
  analytics.ts             Event tracking
```

## Built With

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 4 with custom design tokens
- **Content:** MDX files with gray-matter frontmatter parsing
- **Icons:** lucide-react
- **Lead Capture:** WhatsApp integration (wa.me links)
- **Analytics:** Vercel Analytics + custom events

## License

Proprietary. © KAiTER Softwares.

---

**Questions?** [Visit our website](https://kaitersoftwares.com) or contact us via WhatsApp.