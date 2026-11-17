/* =====================================================================
   PIYUSH.DEV PORTFOLIO — script.js (Vanilla JS, no dependencies)
   Modules:
   1.  Helpers & config
   2.  Typing animation
   3.  Navbar (scroll state, progress bar, mobile menu)
   4.  Smooth scrolling
   5.  Active section highlighting
   6.  Scroll reveal (IntersectionObserver)
   7.  Project filters, feature toggles, card spotlight
   8.  Back-to-top
   9.  Placeholder link guard
   10. Contact form validation + Formspree submit
   11. Footer year
   ===================================================================== */
(() => {
  'use strict';

  /* ---------- 1. HELPERS & CONFIG ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Roles shown in the hero typing animation
  const ROLES = [
    'Fresher Software Developer',
    'Aspiring Software Engineer',
    'Full Stack Developer',
    'Problem Solver'
  ];

  // Your public contact email. Used by the contact form's email fallback
  // (when Formspree is not configured yet).
  const CONTACT_EMAIL = 'dolarpiyush1@gmail.com';

  // Any link whose URL matches this pattern is still a placeholder
  const PLACEHOLDER_PATTERN = /YOUR_|example\.com/i;

  // Small toast notification
  const toastEl = $('#toast');
  let toastTimer;
  function showToast(message, duration = 3800) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  /* ---------- 2. TYPING ANIMATION ---------- */
  function initTyping() {
    const el = $('#typedText');
    if (!el) return;

    // Respect reduced motion: show the first role without animating
    if (reduceMotion) {
      el.textContent = ROLES[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = ROLES[0].length; // hero HTML already shows the first role
    let deleting = true;             // so start by deleting it after a pause

    function tick() {
      const role = ROLES[roleIndex];
      let delay;

      if (deleting) {
        charIndex--;
        delay = 38;
        if (charIndex <= 0) {            // fully erased: move to next role
          charIndex = 0;
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          delay = 350;
        }
      } else {
        charIndex++;
        delay = 70;
        if (charIndex >= role.length) {  // fully typed: pause, then erase
          charIndex = role.length;
          deleting = true;
          delay = 1700;
        }
      }

      el.textContent = ROLES[deleting ? roleIndex : roleIndex].slice(0, charIndex);
      setTimeout(tick, delay);
    }

    setTimeout(tick, 2200);
  }

  /* ---------- 3. NAVBAR ---------- */
  function initNavbar() {
    const navbar = $('#navbar');
    const progress = $('#scrollProgress');
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');
    if (!navbar || !hamburger || !navLinks) return;

    // Scroll state + progress bar (throttled with requestAnimationFrame)
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 20);

        if (progress) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
        }

        const backTop = $('#backToTop');
        if (backTop) backTop.classList.toggle('show', y > 600);

        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu open/close
    function setMenu(open) {
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    }

    hamburger.addEventListener('click', () => {
      setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a link
    $$('a', navLinks).forEach(link => link.addEventListener('click', () => setMenu(false)));

    // Close with Escape (and return focus to the button)
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenu(false);
        hamburger.focus();
      }
    });

    // Close when clicking outside the panel
    document.addEventListener('click', e => {
      if (!navLinks.classList.contains('open')) return;
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) setMenu(false);
    });

    // If the viewport grows to desktop size, reset the mobile menu
    window.matchMedia('(min-width: 992px)').addEventListener('change', e => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 4. SMOOTH SCROLLING ---------- */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = $(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        history.pushState(null, '', id);

        // Move keyboard focus to the section for screen-reader/keyboard users
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- 5. ACTIVE SECTION HIGHLIGHTING ---------- */
  function initActiveNav() {
    const links = $$('.nav-link');
    const sections = links
      .map(l => $(l.getAttribute('href')))
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const setActive = id => {
      links.forEach(l => {
        const isActive = l.getAttribute('href') === '#' + id;
        l.classList.toggle('active', isActive);
        if (isActive) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      });
    };

    // A section counts as "current" when it crosses the middle of the viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));

    // The Profiles section is not in the nav; clear highlight while inside it
    const profiles = $('#profiles');
    if (profiles) {
      new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setActive('__none__'); });
      }, { rootMargin: '-45% 0px -50% 0px' }).observe(profiles);
    }
  }

  /* ---------- 6. SCROLL REVEAL ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    // Stagger children inside .reveal-group containers
    $$('.reveal-group').forEach(group => {
      $$(':scope > .reveal', group).forEach((child, i) => {
        child.style.setProperty('--d', `${i * 90}ms`);
      });
    });

    // Fallback: no IntersectionObserver or reduced motion -> show immediately
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
  }

  /* ---------- 7. PROJECT INTERACTIONS ---------- */
  function initProjects() {
    const cards = $$('.project-card');
    const filterBtns = $$('.filter-btn');
    const emptyNote = $('#emptyNote');

    // 7a. Category filters
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        let visibleCount = 0;
        cards.forEach(card => {
          const cats = (card.dataset.category || '').split(' ');
          const show = filter === 'all' || cats.includes(filter);
          card.classList.toggle('is-hidden', !show);
          if (show) {
            visibleCount++;
            card.classList.add('visible'); // make sure revealed cards stay visible
          }
        });
        if (emptyNote) emptyNote.hidden = visibleCount !== 0;
      });
    });

    // 7b. Expand / collapse "Key features"
    $$('.feature-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const panel = document.getElementById(toggle.getAttribute('aria-controls'));
        if (!panel) return;
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      });
    });

    // 7c. Cursor-follow spotlight on cards (pointer devices only)
    if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
      cards.forEach(card => {
        card.addEventListener('pointermove', e => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
          card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
      });
    }
  }

  /* ---------- 8. BACK TO TOP ---------- */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', window.location.pathname);
      const skip = $('.skip-link');
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* ---------- 9. PLACEHOLDER LINK GUARD ---------- */
  // Stops visitors landing on 404 pages while you still have YOUR_ placeholders.
  function initPlaceholderGuard() {
    $$('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!PLACEHOLDER_PATTERN.test(href)) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        showToast('This link is still a placeholder. Edit it in index.html (see README).');
      });
    });
  }

  /* ---------- 10. CONTACT FORM ---------- */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    const statusEl = $('#formStatus');
    const submitBtn = $('#submitBtn');
    const submitLabel = $('span', submitBtn);

    const rules = {
      name: v => (v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'),
      email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
      subject: v => (v.trim().length >= 3 ? '' : 'Please add a subject (at least 3 characters).'),
      message: v => (v.trim().length >= 10 ? '' : 'Your message should be at least 10 characters.')
    };

    function validateField(input) {
      const rule = rules[input.name];
      if (!rule) return true;
      const msg = rule(input.value);
      const field = input.closest('.field');
      const errorEl = $('.error', field);
      field.classList.toggle('invalid', Boolean(msg));
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (errorEl) errorEl.textContent = msg;
      return !msg;
    }

    function setStatus(text, type) {
      statusEl.textContent = text;
      statusEl.className = 'form-status' + (type ? ' ' + type : '');
    }

    // Live validation after the user has interacted with a field
    $$('input[name], textarea[name]', form).forEach(input => {
      if (!rules[input.name]) return;
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      setStatus('', '');

      // Validate everything; focus the first invalid field
      const inputs = $$('input[name], textarea[name]', form).filter(i => rules[i.name]);
      const results = inputs.map(validateField);
      if (results.includes(false)) {
        inputs[results.indexOf(false)].focus();
        setStatus('Please fix the highlighted fields.', 'err');
        return;
      }

      // Fallback while Formspree is not configured: open the visitor's email app
      // with the message pre-filled, addressed to CONTACT_EMAIL.
      const endpoint = form.getAttribute('action') || '';
      if (/YOUR_FORM_ID/i.test(endpoint)) {
        const data = new FormData(form);
        const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        // Clear the form right away so the visitor returns to an empty form
        form.reset();
        $$('.field', form).forEach(f => {
          f.classList.remove('invalid');
          const inp = $('input, textarea', f);
          if (inp) inp.removeAttribute('aria-invalid');
          const err = $('.error', f);
          if (err) err.textContent = '';
        });
        setStatus(`Opening your email app with your message ready to send. If nothing opens, please email me at ${CONTACT_EMAIL}.`, 'ok');
        return;
      }

      // Honeypot: bots fill hidden fields, humans do not
      const honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      submitBtn.disabled = true;
      submitLabel.textContent = 'Sending...';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.reset();
          $$('.field', form).forEach(f => f.classList.remove('invalid'));
          setStatus('Thanks! Your message has been sent. I will get back to you soon.', 'ok');
        } else {
          setStatus('Something went wrong while sending. Please try again or email me directly.', 'err');
        }
      } catch (error) {
        setStatus('Network error. Please check your connection and try again.', 'err');
      } finally {
        submitBtn.disabled = false;
        submitLabel.textContent = 'Send Message';
      }
    });
  }

  /* ---------- 11. FOOTER YEAR ---------- */
  function initYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    initNavbar();
    initSmoothScroll();
    initActiveNav();
    initReveal();
    initProjects();
    initBackToTop();
    initPlaceholderGuard();
    initContactForm();
    initYear();
  });
})();