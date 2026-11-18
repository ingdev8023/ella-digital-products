# Unmasking Control landing page

Standalone HTML/CSS/JS landing page for the Unmasking Control digital educational toolkit.

## Local testing

From this folder, run:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

Opening `index.html` directly also works for basic review, but a local server is better for browser QA.

## Static publishing

Netlify runs `node scripts/build-site.mjs` from the repository root and publishes `dist/`. It supplies the primary site address in `URL` and the deploy type in `CONTEXT`. The build writes absolute metadata and a production sitemap. Deploy previews receive indexing exclusions. Local source review works directly from this folder.

Responsive WebP photos, a JPEG social image, and licensed WOFF2 fonts are served from `assets/`. The six original PNGs are archived in `artwork/originals/` at the repository root. See the [SEO and verification notes](../docs/seo-strategy.md).

## Checkout and delivery

The header, hero, offer, final section, and mobile bar link directly to the [Gumroad checkout](https://mentalhealthforyou.gumroad.com/l/unmasking-control?wanted=true). These ordinary links work with JavaScript disabled. Gumroad handles payment, receipts, and delivery of seven PDFs. Buyers can reply to their receipt for product support.

Before publishing, compare the visible price, contents, and refund condition with the live listing. Confirm the seller identity and receipt reply-to address in the seller account. See the [milestone record](../docs/milestones.md) for local QA and outstanding checks.
