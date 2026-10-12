const nav = document.querySelector('.nav-wrap');
const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 16), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 2) * 80}ms`;
  observer.observe(element);
});
