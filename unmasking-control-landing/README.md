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

## Checkout and delivery

The header, hero, offer, final section, and mobile bar link directly to the [Gumroad checkout](https://mentalhealthforyou.gumroad.com/l/unmasking-control?wanted=true). These ordinary links work with JavaScript disabled. Gumroad handles payment, receipts, and delivery of seven PDFs. Buyers can reply to their receipt for product support.

Before publishing, compare the visible price, contents, and refund condition with the live listing. Confirm the seller identity and receipt reply-to address in the seller account. See the [milestone record](../docs/milestones.md) for local QA and outstanding checks.
