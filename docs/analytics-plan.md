# Analytics and privacy

## Launch decision

Use Netlify Web Analytics for aggregate traffic and Gumroad's product-filtered sales dashboard for orders and money. Both providers already serve the purchase journey. The site sends no browser analytics events. This decision leaves checkout-click counts unavailable. Account settings, billing, and live data require owner verification at launch.

## Provider comparison

| Question | Netlify Web Analytics | Plausible Cloud |
| --- | --- | --- |
| Cost and history | Credit plans list Free with one day, Personal at $9/month with seven days, and Pro at $20/month with 30 days. Enterprise terms vary. Some legacy plans list a $9/site/month add-on. Confirm the actual team plan before activation. [Pricing](https://www.netlify.com/pricing/) and [legacy terms](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/) | At 10k monthly pageviews, monthly Starter is $9, Growth $14, and Business $19. Starter and Growth advertise three years of history, Business five. Traffic tier and billing interval affect price. [Pricing](https://plausible.io/#pricing) |
| Data and recipients | Netlify derives pageviews, IP-based visitor estimates, top pages, referring URLs, and geographic summaries from host requests. Dashboard history above describes available reports. Operational log retention is a separate provider setting or contract question. [Web Analytics](https://docs.netlify.com/manage/monitoring/web-analytics/overview/) | The browser sends data to an additional processor. Plausible describes page path, campaign/referrer, browser and device, approximate city/region/country, and engagement data. It uses IP and user agent for a daily identifier and says it does not retain the raw IP or user agent. [Data policy](https://plausible.io/data-policy) |
| Integration and cookies | Hosting-side reporting with no site analytics script or visitor analytics cookie. Verify the dashboard once a production deploy exists. | Install and maintain a browser script and a separate account. No analytics cookies. Client blocking can reduce recorded activity. |
| Events and attribution | Documented charts support traffic totals and sources. They provide neither external checkout events nor a documented campaign funnel. | Supports campaigns and custom event goals. A single checkout event is possible. A custom property such as CTA location requires Business under current plans. [Plan features](https://plausible.io/docs/subscription-plans) |

Netlify adds the least collection for this audience. Avoid granular source URLs, geographic reporting, reading behavior, identity fields, advertising integrations, or redirects created to count clicks. Quick exit and support links use direct navigation. The landing page's no-referrer policy also limits Gumroad's ability to attribute visits back to this page.

## Reporting

Use the same closed date interval, currency, product filter, and recorded time zone in each review. Keep only aggregate totals in reporting. Read the [Gumroad dashboard definitions](https://gumroad.com/help/article/74-the-analytics-dashboard) before comparing amounts.

| Metric | Source and calculation |
| --- | --- |
| Pageviews | Netlify's count of served HTML pages. Inspect the landing-page path where available. Repeat views and provider counting rules affect totals. |
| Visitors and sessions | Netlify's unique visitors are IP-based estimates. Do not sum daily uniques into monthly people or report them as sessions. Leave session counts unavailable. |
| Acquisition | Group top incoming sources by broad channel, such as search or newsletter. Suppress small groups and omit raw URLs. Campaign-level results are unavailable unless a provider reports the campaign directly. |
| Checkout clicks and click-through rate | Unmeasured. Leave these fields blank or mark unavailable. Do not estimate from Gumroad views. |
| Purchases | Count completed paid orders for Unmasking Control from Gumroad for the interval. Exclude test orders and record refunds separately. Gumroad product views and other channels can have a different scope from the landing page. |
| Money | Record Gumroad-reported gross sales, refunds, fees, and net amount with their dashboard labels. Keep payouts and booked sales distinct. Do not multiply clicks or order counts by the list price. |

For each reporting interval record dates, reporting zone, Netlify pageviews, broad sources, Gumroad paid orders, refunds, gross sales, fees, and net. Record missing intervals as unavailable. Select a reporting cadence that fits the confirmed history window. Daily reads may be necessary on Free. Do not publish a landing-page purchase conversion rate by dividing all-channel sales by IP estimates or pageviews.

## Privacy and consent

Visitors can open **Privacy and site measurement** in the page footer before following checkout. The host processes IP addresses and request details for delivery. The landing page does not set analytics cookies, accept relationship details, or link visits to orders. Gumroad separately processes checkout information. Limit reporting access to authorized staff. Verify the host's retention and access settings and the seller's actual data practices before launch.

The US review depends on jurisdiction, actual data use, and whether identifiable health information is inferred or shared. Washington's Attorney General distinguishes ordinary purchases from data processed to infer health status. Do not infer a visitor's experiences from viewing this page. Before introducing a new recipient, personalized targeting, or sensitive event data, review the applicable notice, consent, and rights obligations with qualified counsel. Cookie-free operation alone does not determine them. [Washington AG guidance](https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy)

## Operational verification

1. On the authorized production site, check the team's plan, the project's Analytics status, billing impact and history window. Enable only after owner approval if activation or a charge is required.
2. In a clean browser, open the page, expand the footer disclosure and FAQ, and follow a checkout button. Inspect the landing-page network log. Only same-origin assets should load before navigation. Checkout should open its normal Gumroad URL even with scripts disabled.
3. Exercise Quick exit separately. Only navigation to the weather site should result from activation. The automated exit test checks the request and referrer.
4. Check production pageviews after the provider's reporting delay. Record the observed time range and source coverage. Use Gumroad's supported seller test flow for delivery QA. Keep test activity outside sales totals.
5. If a dashboard is disabled, delayed, or unavailable, mark the affected metrics unavailable and continue serving the page. No analytics endpoint participates in checkout.
