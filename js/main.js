/* ============================================
   Portfolio JS — Sanae EL-BYARI
   ============================================ */

// ── NAV SCROLL ──────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── TYPEWRITER (multilingue) ────────────────
const rolesByLang = {
  fr: ['Ingénieure Logiciel', 'Dev Full Stack', 'Passionnée IA & Data', 'Ingénieure ESI'],
  en: ['Software Engineer', 'Full Stack Dev', 'Passionate about AI & Data', 'ESI Engineer'],
};

const el = document.getElementById('typewriter');
let currentLang = 'fr';
let roles = rolesByLang[currentLang];
let roleIdx = 0, charIdx = 0, deleting = false, typewriterTimer = null;

function type() {
  const current = roles[roleIdx];

  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      typewriterTimer = setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }

  typewriterTimer = setTimeout(type, deleting ? 50 : 90);
}

function restartTypewriter(lang) {
  currentLang = lang;
  roles = rolesByLang[lang];
  roleIdx = 0; charIdx = 0; deleting = false;
  clearTimeout(typewriterTimer);
  if (el) type();
}

if (el) setTimeout(() => type(), 800);

// ── SCROLL REVEAL ───────────────────────────
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ── SMOOTH ANCHOR ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── COUNTER ANIMATION ───────────────────────
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = true;
      const target = parseInt(entry.target.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        entry.target.textContent = current + (entry.target.dataset.suffix || '');
        if (current >= target) clearInterval(timer);
      }, 35);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));

// ── SCREENSHOT CLICK-TO-REPLACE ─────────────
document.querySelectorAll('.screenshot-placeholder').forEach(placeholder => {
  placeholder.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.className = 'screenshot-img';
        placeholder.replaceWith(img);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });
});

// ── ACTIVE NAV LINK ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

(function(){
  const btns = document.querySelectorAll('[data-lang-btn]');

  function applyLang(lang){
  document.querySelectorAll('[data-fr]').forEach(el => {
    const val = el.getAttribute(lang === 'en' ? 'data-en' : 'data-fr');
    if (val !== null) el.innerHTML = val;
  });
  document.documentElement.setAttribute('lang', lang);
  btns.forEach(b => b.classList.toggle('active', b.dataset.langBtn === lang));
  localStorage.setItem('portfolio-lang', lang);
  restartTypewriter(lang); // ← ajout
}

  btns.forEach(b => {
    b.addEventListener('click', () => applyLang(b.dataset.langBtn));
  });

  const saved = localStorage.getItem('portfolio-lang') || 'fr';
  applyLang(saved);
})();

sections.forEach(s => navObserver.observe(s));
