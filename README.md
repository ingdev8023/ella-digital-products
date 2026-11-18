# Unmasking Control

Static landing page for the Mental Health For You ebook and six companion PDFs. Netlify serves the sales page and Gumroad handles checkout and digital delivery.

- Open [the landing page](unmasking-control-landing/index.html) for a local preview, or run `python -m http.server 4173 --bind 127.0.0.1 --directory unmasking-control-landing` from the repository root.
- Run `node scripts/build-site.mjs` with Node 22 to produce the static publish directory, `dist/`. Local and preview builds default to noindex. Netlify sets the primary URL and deploy context.
- The source and licensed assets are in `unmasking-control-landing/`. Source artwork is archived in `artwork/originals/`. Browser checks live under `tests/`.
- Follow the [deployment and rollback guide](docs/deployment.md) for production-mode tests, hosting settings and launch checks. See the [architecture](docs/architecture.md), [checkout notes](unmasking-control-landing/README.md), and [milestone record](docs/milestones.md).
