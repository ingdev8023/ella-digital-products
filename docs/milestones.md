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

## 3. Search metadata, indexing, and performance

Milestone 2 checkpoint: `315015a`. Milestone 3 is ready for review. The owner selected Netlify's primary address. The exact host is supplied during the build. The local Netlify configuration prepares the static output; the live service has not been changed.

### Changes

Updated the page, CSS, README, privacy notes, and browser regression test. Added the favicon, robots file, optimized images, local fonts and licenses, static build script, output ignore rule, Netlify build configuration, and SEO strategy. Archived six originals under `artwork/originals/`. The build emits deploy-specific canonical and social URLs, structured image URL, sitemap, and indexing rules.

### Verification

- `node scripts/build-site.mjs` with a reserved test origin and production context produced a parseable sitemap, matching canonical, absolute share card, and indexable page. A subsequent preview build emitted noindex HTML and response header and removed the production sitemap. A dummy Search Console token appeared only in the production build.
- Chrome verified the Product and Offer JSON, visible price, currency, and all five checkout links. At 360, 390, 768, 1024, and 1440 CSS pixels the page fit horizontally, the correct hero variant loaded, all three photos decoded, and the local fonts loaded.
- `node tests/milestone-2.cjs` passed all four exit scenarios with the new local assets. The test waits for image decoding before measuring navigation traffic.
- Pillow inspection confirmed the seven published images contain no EXIF or XMP metadata. A mobile Lighthouse run scored 99 performance, 100 accessibility, and 100 SEO. The [SEO strategy](seo-strategy.md) records conditions, limitations, and the reproduction command.

Remaining checks require the live Netlify site and owner-controlled Search Console property. Verify the served preview header, production canonical, sitemap, and social image after authorized deployment. Google's live rich-result and indexing status and real-user performance remain unmeasured.

Owner requested final photo sizing and sharpness adjustments, the local commit, and Milestone 4. Chrome measured both photos at 360, 390, 760, 768, 1024, and 1440 CSS pixels with device scale factors from 1 to 3. At 390 pixels both rendered 180 pixels tall. A 1440-pixel desktop loaded the 1080-pixel exports at 1x and the original-resolution exports at 3x. The earlier Lighthouse scores predate these final photo changes.

## 4. Analytics and privacy

Milestone 3 checkpoint: `a302626`. Milestone 4 is ready for owner review. The [analytics plan](analytics-plan.md) compares Netlify and Plausible, selects Netlify host-side reporting with Gumroad sales, and specifies collection boundaries, metric definitions and launch verification. Checkout click-through and site-attributed purchase conversion remain unmeasured. The actual team plan, account settings, billing, dashboard history, and live collection still need verification.

Added a native footer disclosure, provider links, and supporting styles. No visitor analytics script or paid service was installed. Updated the exit regression test to scope its FAQ assertion and settle lazy-loaded image requests from viewport changes before measuring exit traffic.

The production build succeeded with `node scripts/build-site.mjs` and a reserved test origin. Chrome opened the disclosure by keyboard with JavaScript enabled and disabled. Both runs showed zero external requests before checkout, empty cookie and web storage, and direct same-tab checkout navigation with external requests intercepted. The destination was a test response. `node tests/milestone-2.cjs` passed keyboard, mouse, emulated touch, and script-disabled exit scenarios. These local checks do not measure Netlify's host logs or Gumroad transactions.
