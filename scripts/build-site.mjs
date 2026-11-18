import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "unmasking-control-landing");
const output = path.join(root, "dist");
const production = process.env.CONTEXT === "production";
const site = process.env.URL ? new URL(process.env.URL) : null;
if (production && !site) throw new Error("Production builds need Netlify's primary URL.");
if (site && (site.protocol !== "https:" || site.href !== site.origin + "/")) {
  throw new Error("The site URL must be an HTTPS origin.");
}

await mkdir(output, { recursive: true });
for (const file of ["assets", "styles.css", "script.js", "favicon.svg"]) {
  await cp(path.join(source, file), path.join(output, file), { recursive: true });
}
let html = await readFile(path.join(source, "index.html"), "utf8");
let robots = await readFile(path.join(source, "robots.txt"), "utf8");
let headers = (await readFile(path.join(source, "_headers"), "utf8")).trimEnd();
if (site) {
  const tags = [
    `<link rel="canonical" href="${site.href}" />`,
    `<meta property="og:url" content="${site.href}" />`,
  ];
  html = html.replace('    <meta property="og:type"', "    " + tags.join("\n    ") + '\n    <meta property="og:type"');
  html = html.replaceAll('"assets/social-preview.jpg"', JSON.stringify(new URL("assets/social-preview.jpg", site).href));
}
if (production) {
  const verification = process.env.GOOGLE_SITE_VERIFICATION;
  if (verification) {
    if (!/^[a-zA-Z0-9_-]+$/.test(verification)) throw new Error("Expected a Search Console verification token.");
    html = html.replace("</head>", `  <meta name="google-site-verification" content="${verification}" />\n  </head>`);
  }
  html = html.replace('<meta name="robots" content="noindex" />', '<meta name="robots" content="index, follow" />');
  robots = robots.trimEnd() + `\nSitemap: ${site.href}sitemap.xml\n`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.href}</loc></url></urlset>\n`;
  await writeFile(path.join(output, "sitemap.xml"), sitemap);
  headers += "\n  Strict-Transport-Security: max-age=31536000";
} else {
  await rm(path.join(output, "sitemap.xml"), { force: true });
  headers += "\n  X-Robots-Tag: noindex";
}
await writeFile(path.join(output, "_headers"), headers + "\n");
await writeFile(path.join(output, "index.html"), html);
await writeFile(path.join(output, "robots.txt"), robots);
