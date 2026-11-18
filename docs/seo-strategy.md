# Search, sharing, and performance

## Search intent

The landing page serves readers looking for an educational guide to recognizing coercive control. The title and description identify the subject, format, and contents. The social card uses the existing editorial hero photograph. Its metadata identifies the product and publisher. No author biography or personal contact information is included.

The page marks up one Product with one Offer for the seven-PDF bundle. The structured price, currency, and purchase link must match the visible offer. The bundle includes an ebook and companion resources, so Product describes the purchase more precisely than Book alone. The single-page navigation has no breadcrumb hierarchy. The site makes no structured claims about ratings or stock. See [Google's product snippet requirements](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).

## Build and indexing

Netlify supplies the primary site address through its build variable `URL`. The static build uses that address for the homepage canonical, Open Graph URL, social image, product image, and production sitemap. The owner selected the Netlify-provided address. If a custom domain becomes primary later, rebuild with the updated URL. See [Netlify build variables](https://docs.netlify.com/build/configure-builds/environment-variables/).

Only the production build emits an indexable page and sitemap. Source and preview HTML include a robots noindex directive. A preview build also generates a site-wide noindex response header. Its robots file allows crawling so search engines can read that directive. See [Google's indexing guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

After an approved launch, add the actual HTTPS homepage as a URL-prefix property in Search Console. The HTML-tag method supplies a verification token. Set the token value in Netlify's production build environment as `GOOGLE_SITE_VERIFICATION`, rebuild, then verify the property. Submit `/sitemap.xml`, inspect the homepage canonical, and check the published URL in Google's Rich Results Test. Search Console ownership and indexing have to be checked on the live domain.

## Assets

The original three active PNGs total 5,977,984 bytes. Their largest WebP equivalents total 553,772 bytes, about 91% smaller. The hero loads with high priority. The two inline photos are lazy-loaded and use higher-quality desktop exports up to the original resolution. Their intrinsic dimensions reserve space and CSS scales their height with width. Phones use a shorter landscape crop capped at 220 pixels. The share card is a 1200 by 630 JPEG. The six source PNGs are archived outside the published directory. Two unused originals contain metadata. Use the exported assets for publishing.

DM Sans and Libre Baskerville load from the same host as the page. The Latin WOFF2 subsets and their licenses are in `assets/fonts/`. Browser checks at 360, 390, 768, 1024, and 1440 pixels confirmed image decoding, hero source selection, loaded fonts, a matching offer price, and zero third-party resource loads.

## Performance measurement

One Lighthouse 12.8.2 mobile navigation against the production-mode static output on localhost scored **99 performance, 100 accessibility, and 100 SEO**. The run used default simulated mobile throttling, headless Chrome, a fresh profile, and Python's static HTTP server. Lab LCP was 2.0 seconds, CLS was 0, and total blocking time was 0 ms. These are lab measurements. Field LCP, CLS, and INP at the 75th percentile require eligible production traffic. Cache lifetimes and text compression should be measured again with the actual hosting headers.

To reproduce, build with `CONTEXT=production` and `URL` set to an HTTPS test origin or the primary site origin. Serve the output with `python -m http.server 48137 --bind 127.0.0.1 --directory dist`. From another terminal run:

```sh
npx --yes lighthouse@12.8.2 http://127.0.0.1:48137/ --only-categories=performance,accessibility,seo --chrome-flags="--headless --disable-gpu"
```

## Editorial roadmap

| Proposed article | Reader question | Review before publication |
| --- | --- | --- |
| Recognizing coercive control | What distinguishes an isolated disagreement from a recurring restriction on choice? | Use reviewed examples and established domestic-violence resources. |
| Gaslighting and disagreement | How might I describe a confusing exchange without having to diagnose anyone? | Review terminology and avoid drawing conclusions from one incident. |
| Noticing patterns over time | How can I reflect on repeated behavior if writing it down feels uncomfortable? | Include options for reflection and have a qualified reviewer check digital-safety guidance. |

These are planning topics. Each article requires source review, professional review of clinical language, and owner approval before publication.
