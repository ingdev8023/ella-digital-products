const assert = require("node:assert/strict");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "../unmasking-control-landing");
const start = "http://127.0.0.1:4173/index.html";
const previous = "http://127.0.0.1:4173/previous";
const weather = "https://www.weather.gov/";
const checkout = "https://mentalhealthforyou.gumroad.com/l/unmasking-control?wanted=true";

async function checkExit(browser, input, javaScriptEnabled) {
  const context = await browser.newContext({
    javaScriptEnabled,
    hasTouch: input === "touch",
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.route(previous, route => route.fulfill({ body: "Previous page", contentType: "text/html" }));
    await page.route(/127\.0\.0\.1:4173\/(index\.html|styles\.css|script\.js)$/, route =>
      route.fulfill({ path: path.join(root, path.basename(route.request().url())) })
    );
    await page.route(/^http:\/\/127\.0\.0\.1:4173\/(assets\/(fonts\/)?[\w-]+\.(webp|woff2)|favicon\.svg)$/, route =>
      route.fulfill({ path: path.join(root, new URL(route.request().url()).pathname.slice(1)) })
    );
    let referrer;
    await page.route(weather, route => {
      referrer = route.request().headers().referer;
      return route.fulfill({ body: "Weather destination", contentType: "text/html" });
    });
    await page.goto(previous);
    await page.goto(start);
    await page.evaluate(() => document.fonts.ready);
    const exit = page.getByRole("link", { name: "Quick exit to the National Weather Service" });
    for (const width of [320, 360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      assert(await exit.isVisible());
      assert.equal(await page.locator('a[href="' + checkout + '"]').count(), 5);
      assert.equal(await page.locator(".mobile-cta a").isVisible(), width <= 760);
      const fits = await page.evaluate(() => {
        const brand = document.querySelector(".brand").getBoundingClientRect();
        const nav = document.querySelector(".header-nav").getBoundingClientRect();
        const link = document.querySelector(".quick-exit").getBoundingClientRect();
        return document.documentElement.scrollWidth <= innerWidth && brand.right <= nav.left &&
          link.right <= innerWidth && link.height >= 44;
      });
      assert(fits, "Header fit at " + width);
    }
    await page.setViewportSize({ width: input === "touch" ? 360 : 1440, height: 800 });
    const faq = page.getByText("What does Quick exit do?", { exact: true });
    await faq.focus();
    await page.keyboard.press("Enter");
    assert(await page.locator("[data-accordion]").getByText("Quick exit opens the National Weather Service", { exact: false }).isVisible());
    // Settle responsive image requests from scrolling the FAQ before measuring exit traffic.
    await page.evaluate(() => {
      for (const image of document.images) image.loading = "eager";
    });
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => Promise.all(Array.from(document.images, image => image.decode())));
    const requests = [];
    page.on("request", req => requests.push(req.url()));
    if (input === "keyboard") {
      await exit.focus();
      await page.keyboard.press("Enter");
    } else if (input === "touch") {
      await exit.tap();
    } else {
      await exit.click();
    }
    await page.waitForURL(weather);
    assert.deepEqual(requests, [weather]);
    assert.equal(referrer, undefined);
    await page.goBack();
    assert.equal(page.url(), javaScriptEnabled ? previous : start);
    assert.deepEqual(errors, []);
    console.log("PASS", input, "JavaScript", javaScriptEnabled);
  } finally {
    await context.close();
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
  try {
    await checkExit(browser, "keyboard", true);
    await checkExit(browser, "touch", true);
    await checkExit(browser, "mouse", true);
    await checkExit(browser, "keyboard", false);
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
