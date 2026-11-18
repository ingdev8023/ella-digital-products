const PIXEL_ID = "1505303678131275";

function enableMetaPixel() {
  if (window.fbq) return;

  window.fbq = function (...args) {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, args)
      : window.fbq.queue.push(args);
  };

  window._fbq = window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://connect.facebook.net/en_US/fbevents.js";

  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

// Call only after an explicit, valid tracking-consent action.
// Do not call automatically during page initialization.
document
  .getElementById("accept-marketing")
  ?.addEventListener("click", enableMetaPixel);