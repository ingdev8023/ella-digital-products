# Architecture

Netlify runs the Node build from the repository root. It copies the public assets and browser code to `dist/`, renders context-specific metadata and indexing directives, and emits a Netlify response-header file. Netlify serves these files directly. Checkout, FAQs, images, and the initial page render require no client framework.

The browser loads scripts, styles, fonts, and photographs from the landing-page origin. The FAQ uses native disclosure elements. JavaScript adds exclusive opening, updates the year, and replaces the current history entry during ordinary Quick Exit activation. Its direct weather link also works when JavaScript is disabled.

A purchase link navigates to Gumroad with the owner's checkout query. Gumroad handles email, payment, the receipt, and downloadable files. Support links and the weather exit navigate away from the site. The no-referrer policy applies to these boundaries. The landing page receives no checkout callback or payment details.

Netlify can summarize host requests and Gumroad reports sales independently. The repository has no backend, customer database, browser analytics SDK, or analytics credentials. See the [analytics plan](analytics-plan.md) for metric scope and the [privacy notes](privacy-and-safety.md) for visitor guidance.
