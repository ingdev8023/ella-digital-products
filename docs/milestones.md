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

Open the landing page locally and follow a purchase link to review the handoff. Use `git diff HEAD -- unmasking-control-landing` for the migration diff. Milestone 2 requires separate approval.
