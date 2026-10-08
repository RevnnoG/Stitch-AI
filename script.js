/* =============================================
   SCRIPT.JS — Revanno Gavin Portfolio
   ============================================= */

// -------- Navbar Scroll Effect --------
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// -------- Hamburger Menu --------
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// -------- Active Nav Link on Scroll --------
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// -------- Intersection Observer — Scroll Animations --------
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.classList.add('in-view');
      }, parseInt(delay));
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => {
  animateObserver.observe(el);
});

// -------- Project Card Mouse Spotlight --------
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    card.style.setProperty('--mouse-x', x);
    card.style.setProperty('--mouse-y', y);
  });
});

// -------- Contact Form --------
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const original = btn.innerHTML;

  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
    Sending...
  `;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Sent!
    `;
    btn.style.background = 'linear-gradient(135deg, #34D399, #059669)';
    showToast('✅ Message sent! I\'ll get back to you soon.');
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1800);
}

// -------- Toast Notification --------
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// -------- Smooth Scroll Polyfill for Anchors --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// -------- CSS Spin Animation (for button) --------
const style = document.createElement('style');
style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

// -------- Typing Effect in Hero (Optional Enhancement) --------
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const texts = [
    'Student Developer & Future Software Engineer',
    'Building Projects. Learning Every Day.',
    'PPLG Student @ SMKN 2 Surakarta'
  ];
  let idx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseCount = 0;

  function typeEffect() {
    const current = texts[idx];
    if (!deleting) {
      heroSubtitle.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        pauseCount = 0;
        setTimeout(typeEffect, 2500);
        return;
      }
    } else {
      heroSubtitle.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % texts.length;
      }
    }
    setTimeout(typeEffect, deleting ? 40 : 70);
  }

  // Start typing after a brief delay to let page settle
  setTimeout(typeEffect, 1500);
}

// -------- Page Load --------
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
