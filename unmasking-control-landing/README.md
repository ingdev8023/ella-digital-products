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

## V2 assets

Current project assets and public URLs:

- Hero: `https://res.cloudinary.com/smivyk2c/image/upload/v1786994460/hero-workbook-desk.png`
- Toolkit: `https://res.cloudinary.com/smivyk2c/image/upload/v1786994460/toolkit-worksheets.png`
- Dual-Anchor Method: `https://res.cloudinary.com/smivyk2c/image/upload/v1786994460/dual-anchor-method.png`
- Local backups remain in `assets/hero-workbook-desk.png`, `assets/toolkit-worksheets.png`, and `assets/dual-anchor-method.png`.
- `assets/privacy-desk.png` - generated but not used in the current page

The old `hook.png` and `problem.png` files remain in `assets/` but are not used in V2.

## Before publishing

1. Replace every `YOUR_SYSTEME_CHECKOUT_URL` with the real secure Systeme.io checkout URL.
2. Confirm the refund/guarantee language against the actual checkout terms.
3. Confirm emergency, privacy, support, and professional-scope language with the final product owner.
4. Do not add testimonials unless they are genuine, permissioned, and substantiated.
5. Test on a real mobile device after publishing in Systeme.io.

## Systeme.io placement

Use the files in `systeme-io/` in numerical order:

1. Paste `01-header-code.html` into page settings header code.
2. Paste `02-page-body.html` into one raw HTML/code element.
3. Paste `03-footer-code.html` into page settings footer code.

The Systeme.io files already use the Cloudinary image URLs above. Replace only the checkout placeholder before publishing.

## Production QA checklist

- No broken image URLs
- No console errors
- No horizontal overflow at 360px, 390px, 768px, 1024px, and 1440px
- Sticky mobile CTA does not cover critical content at rest
- Keyboard focus is visible on links, CTAs, and FAQ summaries
- FAQ works with native `details/summary`
- Checkout placeholder is fully replaced
- Systeme.io page matches the standalone source structure
