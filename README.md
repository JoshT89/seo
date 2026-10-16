# seo

## UPSHIFT

A bespoke Next.js App Router website for a UK SEO and web design studio. It exports to static HTML with interactive React components.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run typecheck
npm run build
```

The production export is in `out/`. Host that directory on any static host. `npm start` previews the production export on port 3000; `npm run dev` runs the Next.js development server.

## Before the business goes live

- Replace the proposed UPSHIFT brand if needed and check brand/domain availability.
- Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the actual business email. This enables an email draft from the review form; the visitor sends it through their email app. No backend collects enquiries. Without an inbox configured, the preview explicitly offers downloading/copying the prepared brief and says nothing has been sent.
- Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS domain and rebuild. Update the hosting domain and metadata consistently.
- Add the actual business identity, contact information and approved privacy/service terms before accepting customer work. Current terms describe the preview and proposed commercial scope.
- Confirm prices, capacity and VAT status. Prices are proposed offers, not representations of an established agency’s track record.
- The website has no fabricated testimonials, client logos, case studies or guaranteed rankings. The growth illustration and revenue calculator are labelled illustrative.

## Included

Responsive design, mobile navigation, service tabs, monthly/project pricing, scenario calculator, accessible native review dialog with brief download/copy, FAQs, educational guide, privacy and terms pages, custom 404, canonical metadata, Open Graph image, icon, robots.txt, sitemap.xml, and Organization/WebSite/Service JSON-LD.

No cookies, third-party analytics, external fonts or remote image dependencies are required. Fonts are self-hosted. Reduced-motion preferences are respected.

## Pricing research

Reviewed 16 October 2026 against published UK provider pricing, including:

- https://www.neometa.uk/seo-pricing — published Local £495/month, Growth £895/month on an existing website; standalone websites from £2,500 and audits from £795.
- https://seomanagement.co.uk/pricing/ — packages advertised from £350/month.
- https://prontx.com/seo/seo-packages/ — Local from £595/month, Growth typically £1,200–£2,000.

UPSHIFT prices are proposed commercial positioning informed by these examples. This is not a claim that those prices represent the whole UK market. Different scopes, tax treatment and contract terms affect comparisons.
