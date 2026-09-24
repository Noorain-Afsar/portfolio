const revealItems = document.querySelectorAll('.role, .capability, .certificate-list > div, .education-list > div');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal-item');
  revealObserver.observe(item);
});