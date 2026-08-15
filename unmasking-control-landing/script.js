document.getElementById('year').textContent = new Date().getFullYear();

// Open one FAQ item at a time while retaining native, accessible <details> behavior.
document.querySelectorAll('[data-accordion] details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('[data-accordion] details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Set the real checkout address here (or replace #checkout in index.html).
document.querySelectorAll('[data-checkout-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#checkout') {
      event.preventDefault();
      alert('Before publishing, replace #checkout with your secure Systeme checkout URL.');
    }
  });
});
