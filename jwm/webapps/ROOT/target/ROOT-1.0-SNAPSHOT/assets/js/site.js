const siteConfig = {
  showPartnerOne: true,
  showPartnerTwo: true
};

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const adSlots = {
  'partner-one': siteConfig.showPartnerOne,
  'partner-two': siteConfig.showPartnerTwo
};

Object.entries(adSlots).forEach(([slot, visible]) => {
  const element = document.querySelector(`[data-ad-slot="${slot}"]`);
  if (element && !visible) element.hidden = true;
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach(element => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});

document.querySelector('[data-demo-form]')?.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('[data-form-status]');
  status.textContent = 'Prototype only: the form layout works, but no message was sent.';
});

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});
