# Unmasking Control milestones

## 1. Gumroad checkout

Implementation approved November 17, 2026. Local branch `codex/gumroad-checkout` is ready for review.

Five purchase links open the product page in the same tab. Each link suppresses the referrer. The contents link still opens the toolkit section. The page identifies the publisher, the one-time USD price, the seven downloadable PDFs, the seller's conditional refund, and how buyers can reach the seller through their receipt. The previous platform snippets and checkout alert were removed.

### Verification

- `node --check unmasking-control-landing/script.js` passed.
- `rg -ni 'systeme[._-]?io|YOUR_SYSTEME|data-checkout-link' unmasking-control-landing` returned zero matches.
- `git diff --check` passed.
- A read-only HTTP GET to the [product listing](https://mentalhealthforyou.gumroad.com/l/unmasking-control) returned 200. The listing names Mental Health For You, displays $29, and describes an eight-chapter ebook, six companions, seven files, and the seven-day conditional full refund.
- Desktop Chrome automation used local HTML, CSS, and JS with live external resources. With JavaScript enabled and disabled, all five purchase links navigated to the exact product URL in the same tab. The internal fragments resolved, the inline images loaded, the skip link received keyboard focus, and the FAQ responded to Enter and Space. With JavaScript enabled, opening the next FAQ closed the previous item.
- At 360, 390, 768, 1024, and 1440 CSS pixels, the document fit the viewport. The mobile bar appeared at 360 and 390. The final browser run reported zero landing-page console errors or script exceptions. The initial restricted file-preview run could not resolve external resources.

### Owner review

Review the public author bio, privacy claims on the seller listing, actual checkout terms, and the configured receipt reply-to identity before public launch. Gumroad documents the [receipt support route](https://gumroad.com/help/article/195-theres-an-issue-with-my-purchase). A seller test purchase, delivery inspection, and physical-device testing remain for launch QA.

The owner approved the checkout milestone including the direct checkout query, centered recognition text, and single-line offer button. Local checkpoint `a5dd5e9` records that version.

## 2. Buyer information, trust, and visitor safety

Implementation approved November 17, 2026. Ready for owner review. The hero explains the audience, bundle, price, and delivery. The FAQ covers digital access, receipt email, purchase records, scope, technical support, conditional refunds, and exit behavior. Public support details were checked against the US National Domestic Violence Hotline. See the [purchase journey](conversion-strategy.md) and [safety notes](privacy-and-safety.md).

### Verification

- Run `node tests/milestone-2.cjs` with Playwright available to Node and `CHROME_PATH` pointing to Chrome, or use Playwright's installed Chromium. Four scenarios passed. The test serves local files via browser request interception and substitutes a neutral response at the weather destination to isolate browser history, referrer, and outgoing requests.
- At 320, 360, 390, 768, 1024, and 1440 CSS pixels the exit was visible with a touch target at least 44 pixels tall. The header fit, the sticky purchase bar followed its breakpoint, and all five checkout URLs matched. Keyboard FAQ activation passed.
- Ordinary keyboard, mouse, and emulated touch activation replaced the landing-page entry. The script-disabled link navigated normally. Each exit issued only the destination request with no referrer. No page exceptions occurred.
- Visually inspected Chrome captures at 390 and 1440 pixels with live imagery and fonts. The header exit and purchase actions fit. A physical-device check and seller-account delivery test remain for launch QA.

Review the local landing page and the diff against `a5dd5e9`. The seller's public profile, checkout terms, and actual receipt contact still need owner verification before launch.

Owner review approved the remaining Milestone 2 work and supplied final wording for the hero, toolkit overview, and FAQ introduction. The US support paragraph and both contact links now appear in the footer.

Milestone 2 approved with the final two-paragraph lede. The owner authorized the local commit and Milestone 3.
