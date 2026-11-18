const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const output = path.resolve(__dirname, "../dist");
const production = process.env.CONTEXT === "production";
const checkout = "https://mentalhealthforyou.gumroad.com/l/unmasking-control?wanted=true";
const weather = "https://www.weather.gov/";
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".xml": "application/xml", ".txt": "text/plain", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".webp": "image/webp", ".jpg": "image/jpeg",
};

function readHeaders() {
  const [rule, ...lines] = fs.readFileSync(path.join(output, "_headers"), "utf8").trim().split(/\r?\n/);
  assert.equal(rule, "/*");
  return Object.fromEntries(lines.map(line => {
    const match = line.trim().match(/^([\w-]+): (.+)$/);
    assert(match, "Invalid header declaration");
    return [match[1].toLowerCase(), match[2]];
  }));
}

async function run() {
  const headers = readHeaders();
  assert.equal(headers["referrer-policy"], "no-referrer");
  assert.equal(headers["x-content-type-options"], "nosniff");
  assert.equal(headers["x-frame-options"], "DENY");
  assert.match(headers["content-security-policy"], /frame-ancestors 'none'/);
  assert.match(headers["permissions-policy"], /geolocation=\(\)/);
  assert.equal(headers["x-robots-tag"], production ? undefined : "noindex");
  if (production) assert.match(headers["strict-transport-security"], /max-age=31536000/);
  const entries = fs.readdirSync(output, { recursive: true, withFileTypes: true });
  const files = new Map();
  for (const entry of entries.filter(entry => !entry.isDirectory())) {
    const file = path.join(entry.parentPath, entry.name);
    const urlPath = "/" + path.relative(output, file).split(path.sep).join("/");
    if (urlPath === "/_headers") continue;
    assert.match(urlPath, /^\/(index\.html|styles\.css|script\.js|favicon\.svg|robots\.txt|sitemap\.xml|assets\/[\w-]+\.(jpg|webp)|assets\/fonts\/[\w-]+\.(woff2|txt))$/);
    files.set(urlPath, file);
  }
  assert.equal(files.has("/sitemap.xml"), production);
  const server = http.createServer((req, res) => {
    const key = new URL(req.url, "http://localhost").pathname;
    const file = files.get(key === "/" ? "/index.html" : key);
    if (!file) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { ...headers, "Content-Type": mime[path.extname(file)] });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const origin = "http://127.0.0.1:" + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
    const page = await browser.newPage({ reducedMotion: "reduce" });
    const errors = [];
    const external = [];
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.route("https://**/*", route => {
      external.push(route.request().url());
      return route.fulfill({ body: "Navigation received", contentType: "text/html" });
    });
    const response = await page.goto(origin);
    assert.equal(response.headers()["content-security-policy"], headers["content-security-policy"]);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), production ? "index, follow" : "noindex");
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    const product = JSON.parse(await page.locator('[type="application/ld+json"]').textContent());
    assert.equal(product.offers.url, checkout);
    assert.equal(product.offers.priceCurrency, "USD");
    assert.equal(await page.locator(".price strong").innerText(), "$" + Number(product.offers.price));
    if (production) {
      const canonical = new URL(process.env.URL).href;
      assert.equal(await page.locator('[rel="canonical"]').getAttribute("href"), canonical);
      assert.equal(await page.locator('[property="og:url"]').getAttribute("content"), canonical);
      assert.equal(product.image, canonical + "assets/social-preview.jpg");
      const xml = fs.readFileSync(files.get("/sitemap.xml"), "utf8");
      assert.equal(await page.evaluate(text => new DOMParser().parseFromString(text, "application/xml").querySelector("loc")?.textContent, xml), canonical);
      assert(fs.readFileSync(files.get("/robots.txt"), "utf8").includes("Sitemap: " + canonical + "sitemap.xml"));
    }
    assert(await page.locator('a[href^="#"]').evaluateAll(links => links.every(a => document.getElementById(a.hash.slice(1)))));
    assert(!/YOUR_[A-Z_]+/.test(await page.content()));
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to content");
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 850 });
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(el => el.decode());
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    const faq = page.locator("[data-accordion] summary").first();
    await faq.focus();
    await page.keyboard.press("Enter");
    assert(await page.locator("[data-accordion] details[open] p").first().isVisible());
    assert.deepEqual(external, []);
    for (const selector of [".header-cta", ".hero-actions .button", ".offer-box a", ".final-cta a", ".mobile-cta a", ".quick-exit"]) {
      await page.setViewportSize({ width: selector === ".mobile-cta a" ? 390 : 1440, height: 850 });
      const destination = selector === ".quick-exit" ? weather : checkout;
      await page.locator(selector).click();
      await page.waitForURL(destination);
      assert.deepEqual(external.splice(0), [destination]);
      await page.goto(origin);
    }
    assert.deepEqual(errors, []);
    console.log("PASS", production ? "production" : "preview", "artifact, headers, indexing, assets, five viewports, keyboard and navigation");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
