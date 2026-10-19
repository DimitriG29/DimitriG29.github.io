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

const emailStatus = document.querySelector('#email-status');

function copyEmailAddress(email) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(email);
  }

  const fallback = document.createElement('textarea');
  fallback.value = email;
  fallback.setAttribute('readonly', '');
  fallback.style.position = 'fixed';
  fallback.style.opacity = '0';
  document.body.append(fallback);
  fallback.select();
  document.execCommand('copy');
  fallback.remove();
  return Promise.resolve();
}

document.querySelectorAll('[data-copy-email]').forEach((action) => {
  action.addEventListener('click', () => {
    copyEmailAddress(action.dataset.copyEmail)
      .then(() => { emailStatus.textContent = 'Email copied — paste it into any mail app.'; })
      .catch(() => { emailStatus.textContent = 'Email: DimitriGunawan2029@gmail.com'; });
  });
});
