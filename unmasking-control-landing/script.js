const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Open one FAQ item at a time while retaining native, accessible <details> behavior.
document.querySelectorAll("[data-accordion] details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll("[data-accordion] details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
