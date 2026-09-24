const revealItems = document.querySelectorAll('.role, .capability, .certificate-list > div, .education-list > div');

const pageSections = {
  home: 'home',
  about: 'about',
  projects: 'showcase',
  experience: 'work',
  education: 'education-certificates',
  contact: 'contact'
};

const requestedPage = new URLSearchParams(window.location.search).get('page');
const selectedSection = pageSections[requestedPage];
const topLevelSections = document.querySelectorAll('main > section');
const activePage = pageSections[requestedPage] ? requestedPage : 'home';
  document.body.dataset.page = activePage;
document.querySelectorAll('.nav a').forEach((link) => {
  const linkPage = new URL(link.href).searchParams.get('page') || 'home';
  if (linkPage === activePage) {
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');
  }
});

if (selectedSection) {
  topLevelSections.forEach((section) => {
    section.classList.add('route-hidden');
  });
  document.getElementById(selectedSection)?.classList.remove('route-hidden');
} else {
  topLevelSections.forEach((section) => {
    if (section.id !== 'home') {
      section.classList.add('route-hidden');
    }
  });
}

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