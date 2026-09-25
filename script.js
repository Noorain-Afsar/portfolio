const revealItems = document.querySelectorAll('.role, .capability, .certificate-list > div, .education-list > div');

document.querySelectorAll('.project-skills strong').forEach((label) => {
  if (label.textContent.trim() === 'DAX & Analytics Skills') {
    label.textContent = 'Key Skills Demonstrated';
  }
});

const projectCards = document.querySelectorAll('.showcase .project-card');
const projectCopy = [
  {
    title: 'US Retail Sales Analytics',
    tools: 'Excel · Python · Pandas · SQL · Tableau',
    description: 'Analyzed retail sales data to identify trends in sales, profitability, customer segments, product and regional performance, and discount impact. Cleaned and transformed the dataset using Python and SQL, performed exploratory data analysis, and developed an interactive Tableau dashboard to communicate key business insights and support data-driven decision-making.',
    workflow: 'Raw Data ➔ Python & Pandas ➔ Data Cleaning ➔ SQL Analysis ➔ EDA ➔ Tableau ➔ Dashboard ➔ Business Insights'
  },
  {
    title: 'US Retail Profitability Analytics',
    description: 'Built a deep-dive financial diagnostics dashboard in Tableau to isolate and analyze regional profitability drivers across complex product categories. Engineered custom Tableau calculations, dynamic parameter actions, and forecasting analysis to surface hidden margin leakages. The resulting interface allows operations managers to instantly cross-reference quarterly profit trajectories with regional discount impacts to safeguard retail margins.'
  },
  {
    title: 'UAE Retail Infrastructure: Regional Sales & Profit Optimization',
    tools: 'Power BI · Power Query · DAX · SQL · Python',
    description: 'Analyzed UAE retail sales data to identify trends in sales, profitability, customer segments, product performance, regional performance, and delivery patterns. Cleaned and prepared the dataset using Python, validated and analyzed the data using SQL, and developed an interactive Power BI dashboard using Power Query and DAX to visualize key KPIs and communicate business insights.',
    workflow: 'Raw UAE Retail Data ➔ Python & Pandas ➔ Data Cleaning & Preparation ➔ SQL Validation & Analysis ➔ Power Query ➔ DAX Measures ➔ Power BI Dashboard ➔ Business Insights',
    skills: ['Data Cleaning & Transformation', 'Python & Pandas', 'SQL Analysis', 'Power Query', 'DAX', 'Power BI', 'Data Visualization', 'KPI Analysis', 'Profitability Analysis', 'Business Insights']
  },
  {
    title: 'E-Commerce Data Model Optimization & DAX Analytics',
    description: 'Analyzed e-commerce data to evaluate sales, profitability, customer activity, order performance, product metrics, and year-over-year trends through an optimized analytical model and DAX analytics.',
    workflow: 'E-Commerce Data Schema ➔ Data Model Design ➔ DAX Measures ➔ Performance Matrices ➔ Stakeholder Strategy Insights'
  },
  {
    tools: 'Python · SQL · Power BI',
    description: 'Analyzed Amazon sales data to evaluate sales and profitability across categories, regions, and other business dimensions. Cleaned and prepared the dataset using Python, checked and analyzed the data using SQL, and developed an interactive Power BI dashboard to visualize total sales, total profit, profit by category, profit by region, and other key performance metrics.',
    workflow: 'Raw Data ➔ Python ➔ Data Cleaning ➔ SQL Validation & Analysis ➔ Power BI ➔ Interactive Dashboard & Insights',
    skills: ['Data Cleaning & Transformation', 'Python & Pandas', 'SQL Analysis', 'Power BI', 'Data Visualization', 'Sales Analysis', 'Profitability Analysis', 'Regional Analysis', 'Business Insights']
  }
];

projectCards.forEach((card, index) => {
  const copy = projectCopy[index];
  if (!copy) return;
  if (copy.title) card.querySelector('h2').textContent = copy.title;
  if (copy.tools) card.querySelector('.project-tools').textContent = copy.tools;
  if (copy.description) card.querySelector('.project-content > p:not(.project-tools)').textContent = copy.description;
  if (copy.workflow) card.querySelector('.project-workflow span').textContent = copy.workflow;
  if (copy.skills) {
    const skillsList = card.querySelector('.project-skills ul');
    skillsList.innerHTML = copy.skills.map((skill) => `<li>${skill}</li>`).join('');
    card.querySelector('.project-skills strong').textContent = 'Key Skills Demonstrated';
  }
});

const pageSections = {
  home: 'home',
  about: 'about',
  projects: 'showcase',
  studio: 'studio',
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

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  const setMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileMenu.classList.toggle('is-open', isOpen);
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });
}

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

const routeLinks = document.querySelectorAll('.nav a, .mobile-menu a');
routeLinks.forEach((link) => {
  const linkPage = new URL(link.href).searchParams.get('page');
  if (!linkPage || !pageSections[linkPage]) return;

  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = pageSections[linkPage];
    window.history.pushState({}, '', link.href);
    document.body.dataset.page = linkPage;
    topLevelSections.forEach((section) => section.classList.add('route-hidden'));
    document.getElementById(sectionId)?.classList.remove('route-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

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

const homeProjectGallery = document.querySelector('#home-project-gallery');
const homeProjectItems = homeProjectGallery ? [...homeProjectGallery.querySelectorAll('.home-project-item')] : [];
let homeProjectIndex = 0;
let homeProjectTimer;

const showHomeProject = (index) => {
  homeProjectItems.forEach((item, itemIndex) => {
    item.classList.toggle('is-current', itemIndex === index);
  });
};

const startHomeProjectRotation = () => {
  if (homeProjectItems.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  homeProjectTimer = window.setInterval(() => {
    homeProjectIndex = (homeProjectIndex + 1) % homeProjectItems.length;
    showHomeProject(homeProjectIndex);
  }, 2000);
};

if (homeProjectGallery) {
  homeProjectGallery.addEventListener('mouseenter', () => window.clearInterval(homeProjectTimer));
  homeProjectGallery.addEventListener('mouseleave', startHomeProjectRotation);
  homeProjectGallery.addEventListener('focusin', () => window.clearInterval(homeProjectTimer));
  homeProjectGallery.addEventListener('focusout', startHomeProjectRotation);
  startHomeProjectRotation();
}

const studioCases = {
  retail: { label: 'RETAIL SIGNAL', title: 'Find the margin leak.', copy: 'Compare discount depth with regional profit to see where growth is quietly becoming expensive.', tool: 'Tableau · SQL · Python', result: 'Decision: protect high-volume margin' },
  uae: { label: 'UAE GROWTH', title: 'Read the regional pulse.', copy: 'Map sales velocity across emirates to make inventory and distribution decisions with more confidence.', tool: 'Power BI · DAX · Power Query', result: 'Decision: rebalance regional supply' },
  commerce: { label: 'E-COMMERCE', title: 'Make demand visible.', copy: 'Connect product, customer, and order signals to see which categories are creating durable value.', tool: 'Power BI · SQL · Python', result: 'Decision: focus the product mix' }
};
const studioLenses = {
  performance: { label: 'PERFORMANCE', shift: '01—03' },
  customers: { label: 'CUSTOMERS', shift: '02—03' },
  operations: { label: 'OPERATIONS', shift: '03—03' }
};
const studio = document.querySelector('.virtual-studio');
if (studio) {
  let activeCase = 'retail';
  let activeLens = 'performance';
  const renderStudio = () => {
    const currentCase = studioCases[activeCase];
    const currentLens = studioLenses[activeLens];
    studio.querySelector('#studio-output-case').textContent = `${currentCase.label} / ${currentLens.label}`;
    studio.querySelector('#studio-output-index').textContent = currentLens.shift;
    studio.querySelector('#studio-output-title').textContent = currentCase.title;
    studio.querySelector('#studio-output-copy').textContent = currentCase.copy;
    studio.querySelector('#studio-output-tool').textContent = currentCase.tool;
    studio.querySelector('#studio-output-result').textContent = currentCase.result;
  };
  studio.querySelectorAll('[data-studio-case]').forEach((button) => button.addEventListener('click', () => {
    activeCase = button.dataset.studioCase;
    studio.querySelectorAll('[data-studio-case]').forEach((item) => item.classList.toggle('is-selected', item === button));
    renderStudio();
  }));
  studio.querySelectorAll('[data-studio-lens]').forEach((button) => button.addEventListener('click', () => {
    activeLens = button.dataset.studioLens;
    studio.querySelectorAll('[data-studio-lens]').forEach((item) => item.classList.toggle('is-selected', item === button));
    renderStudio();
  }));
  studio.querySelector('#studio-activate').addEventListener('click', () => {
    studio.classList.toggle('is-active');
    const isActive = studio.classList.contains('is-active');
    studio.querySelector('#studio-session-status').textContent = isActive ? 'live and exploring' : 'ready to activate';
    studio.querySelector('.studio-button-label').textContent = isActive ? 'Pause studio' : 'Activate studio';
  });
}