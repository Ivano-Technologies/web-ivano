# web-ivano

Ivano Technologies company marketing site.

**Target host (post-cutover):** `www.ivanotechnologies.com`  
**This repo / Preview:** `*.vercel.app` only until Chief gates cutover.

## Preview notes

- Production branch: `main`
- Preview work: `dev`
- New Vercel project `web-ivano` (team **techivano**) is linked separately by Shipping
- **Do not attach** `www.ivanotechnologies.com` or the apex domain
- **www cutover is Chief-gated.** The current 308 www → Kompleet stays until that gate. Do not detach www/apex from the Kompleet Vercel project.

## Stack

Next.js App Router + TypeScript. Marketing site only — no Convex, auth, or Kompleet product code.

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
```

## Routes

| Path | Notes |
|---|---|
| `/` | Home — Magnific Pass 1 |
| `/products` | Product family + client-work cards (outbound, new tab) |
| `/services` | Five MoA clusters |
| `/about` | Mission, Abuja Nigeria, RC 8736090, PDF download |
| `/contact` | Form → `hi@ivanotechnologies.com` (mailto) |
| `/privacy` `/terms` `/cookies` | Light legal stubs |
| `/company-profile.pdf` | Downloadable company profile |

## Contact form

The contact form opens a **mailto** to `hi@ivanotechnologies.com` with Name / Email / Subject / Message. A mail API (e.g. Resend) can replace this later without changing the fields.

## Brand locks

- Wordmark only — no red “i” tile / logo mark
- Favicon: Design IV1 set — navy square for tabs (`favicon-32-navy` + `mark-on-navy-square.svg`), transparent PNGs for icons/PWA, no orange
- Palette: bg `#141B26`–`#1A2230` · footer `#0F141C` · accent `#E0442E` / `#E8553A` · body `#9AA3AE` · borders `#2A3342`
- Type: Exo headings + Montserrat body (`next/font`)
- No Kompleet teal · no cream chrome
- Clients strip: JUO white mono JO mark + NMDPRA greyscale placeholder only

## Product link-outs

| Card | Badge | URL |
|---|---|---|
| Kompleet | Product | https://kompleet.techivano.com |
| Ivano PMS | Product | https://pms.techivano.com |
| NRCS EAM | Product | https://nrcseam.techivano.com |
| JUO Campaign | Client work | https://www.votejohnupanodey.com |
| NMDPRA Dashboard | Client work | https://nmdpra-dashboard-techivano.vercel.app |

## Design source of truth

Magnific Pass 1 comps (HTML + `ivano.css` + `art/` + screenshots). Public download: `/company-profile.pdf`.
