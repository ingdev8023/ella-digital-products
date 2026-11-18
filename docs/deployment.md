# Deployment and rollback

## Release target

The owner identified `https://unmaskingcontrol.netlify.app/` as the target. On November 17, 2026 it responded over HTTPS with Netlify 404s for the homepage, robots file, sitemap and share image. The response alone cannot establish which account owns the project or whether an earlier deploy exists.

In the Netlify project, verify the repository is `ingdev8023/ella-digital-products`, the production branch contains the reviewed commit, the base directory is the repository root, the command is `node scripts/build-site.mjs`, and the publish directory is `dist`. The existing root `netlify.toml` specifies the last two settings. Do not publish the repository root, archived source art, or a domain-free local build. Check that the Netlify primary URL matches the owner's address. A Netlify subdomain needs no registrar DNS change. For a later custom domain, add it to the same project, apply the DNS records Netlify shows for that domain, verify certificate issuance, select the primary address, then rebuild the canonical and sitemap.

## Preflight

Use Node 22 or newer, Playwright available to Node, and Chromium or Chrome. Set `CHROME_PATH` to an installed Chrome executable if Playwright's bundled browser is unavailable. The site build itself uses only Node standard libraries.

```powershell
$env:URL = 'https://unmaskingcontrol.netlify.app'
foreach ($mode in 'deploy-preview','production') {
  $env:CONTEXT = $mode
  node scripts/build-site.mjs
  if ($LASTEXITCODE) { throw 'Build failed' }
  node tests/launch.cjs
  if ($LASTEXITCODE) { throw 'Smoke tests failed' }
}
node tests/milestone-2.cjs
```

The launch test serves the generated files on loopback and applies the generated headers. Chrome checks five widths, script execution, image decoding, fragment links, keyboard behavior, price, offer metadata, indexing, checkout and exit navigation. External destinations are intercepted for this test. A separate read-only browser check reached the real Gumroad checkout and displayed the product and $29.

## Identity and seller checks

- The publish tree contains local images and fonts, license notices, page code, and indexing files. The metadata and on-page credit use product and publisher information. Checks found no private email, local user path, PDF preview or source map in the page output. Nine published JPEG/WebP files had no EXIF, XMP or comment metadata in the inspection.
- Local Git history contains author email attribution, including a non-noreply address. Repository visibility and archived originals with metadata need owner review before public sharing. They sit outside the publish directory. No history was rewritten.
- The public Gumroad listing identifies an author and makes privacy claims. Confirm the displayed identity is approved, the refund terms agree across listing and checkout, and the receipt uses the intended public support identity.
- In the authenticated seller session, open the product's purchase flow. Confirm Gumroad explicitly labels it a test purchase and requests no payment method. Verify receipt delivery, reply-to identity, access link, and all seven PDFs. Record pass/fail and date without logging buyer identifiers or private download URLs. [Gumroad seller test procedure](https://gumroad.com/help/article/62-testing-a-purchase)

## Release and smoke test

1. Record the approved commit, previous published deploy ID (if one exists), primary domain and project settings. Check provider status and the account's analytics/billing configuration. Seek explicit publication approval.
2. Inspect the approved build on a Netlify preview. Confirm preview HTML and the actual HTTP response both carry noindex. Check the same URL on a physical phone when available.
3. After authorization, publish the reviewed revision through the project's configured deployment workflow. Visit the homepage over HTTPS. Confirm 200, correct product, certificate, canonical and one-time price. Check HTTP redirects to HTTPS.
4. Inspect the homepage response with `curl.exe -sSI https://unmaskingcontrol.netlify.app/`. Verify CSP, nosniff, no-referrer, frame denial and the permissions policy. Production also sets host-only HSTS for one year. Production should have no noindex directive on either the response or the page. Check that the sitemap, robots, favicon and share image all return the expected content.
5. Reload in a fresh browser, check the console, all five purchase links across desktop and phone, the two inline images, FAQ, disclosure, and Quick Exit. Confirm Back behavior with JavaScript on and off. Check that leaving for Gumroad reaches the correct product. Record the real-device and checkout results.
6. With the owner, verify Search Console ownership, submit the sitemap, inspect the canonical and run the live Rich Results Test. Verify Netlify traffic and Gumroad sales reports separately. See the [SEO instructions](seo-strategy.md) and [analytics verification](analytics-plan.md).

The CSP permits same-origin page resources and disables browser data connections, forms, embedding, and base URL overrides. The permissions policy disables camera, microphone, location, and browser payment APIs on this origin. External links navigate normally and Gumroad controls its own checkout policies. The header file applies to both builds, with indexing and HSTS varied by context. [Netlify custom headers](https://docs.netlify.com/manage/routing/headers/)

## Rollback

If smoke tests fail after release, select the recorded working deploy in Netlify's deploy history and republish it with owner authorization. Ensure an automatic deploy cannot immediately replace it. Recheck the homepage, checkout, header set, images, and robots. Fix or revert the release change in Git before resuming automatic publishing. For a first launch without a known working deploy, retain the failed deploy ID and keep traffic promotion paused while preparing and testing a corrected build. [Netlify deploy management](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/)
