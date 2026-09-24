document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile nav
const toggle = $('.nav-toggle'), nav = $('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Reading progress + header shadow
const bar = document.createElement('div');
bar.className = 'progress-bar';
document.body.prepend(bar);
const hdr = $('.site-header');
const onScroll = () => {
  const d = document.documentElement;
  const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
  bar.style.transform = `scaleX(${p})`;
  hdr?.classList.toggle('scrolled', d.scrollTop > 8);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll reveal
const revealEls = $$('.hero .wrap > *, .hero-grid > *, .section-head, .filters, .case, .pillar-grid > div, .stats .wrap > div, .project-facts .wrap > div, .xp-item, .story-row, .cv-item, .cv-h2, .block, .beyond-grid > *, .facts, .form, .project-nav a, .why .wrap > *, .refl-hero .wrap > *, .post > *, .teaser-card');
revealEls.forEach(el => {
  el.classList.add('reveal');
  const i = [...el.parentElement.children].indexOf(el);
  el.style.transitionDelay = `${Math.min(i, 8) * 70}ms`;
});
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
revealEls.forEach(el => io.observe(el));

// Count-up numbers
$$('.stats strong, .project-facts strong').forEach(el => {
  const m = el.textContent.trim().match(/^(\d+)(.*)$/);
  if (!m) return;
  const n = +m[1], suffix = m[2];
  el.textContent = '0' + suffix;
  const o = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    o.disconnect();
    const t0 = performance.now(), dur = 1100;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.5 });
  o.observe(el);
});

// Rotating word in hero
$$('.rotate').forEach(r => {
  const words = (r.dataset.words || '').split('|').filter(Boolean);
  if (words.length < 2) return;
  let i = 0;
  const span = r.firstElementChild;
  setInterval(() => {
    span.classList.add('out');
    setTimeout(() => { i = (i + 1) % words.length; span.textContent = words[i]; span.classList.remove('out'); }, 320);
  }, 2600);
});

// Work filters
const filters = $('.filters');
filters?.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  $$('button', filters).forEach(x => x.classList.toggle('on', x === b));
  const f = b.dataset.f;
  $$('.case').forEach(c => {
    const show = f === 'all' || (c.dataset.cat || '').split(' ').includes(f);
    c.classList.toggle('hide', !show);
    if (show) c.classList.add('in');
  });
});

// Experience accordion
$$('.xp-head').forEach(b => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!open));
  b.parentElement.classList.toggle('open', !open);
}));

// On-this-page scroll spy
const tocLinks = $$('.toc a');
if (tocLinks.length) {
  const secs = tocLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) tocLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-25% 0px -65% 0px' });
  secs.forEach(s => spy.observe(s));
}

// Lightbox for photos
const zoomables = $$('.project-photo > .wrap > img, .beyond-grid img');
if (zoomables.length) {
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<button class="lb-x" aria-label="Close">×</button><img alt="">';
  document.body.append(lb);
  const close = () => lb.classList.remove('open');
  lb.addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  zoomables.forEach(im => {
    im.classList.add('zoomable');
    im.addEventListener('click', () => { $('img', lb).src = im.currentSrc || im.src; lb.classList.add('open'); });
  });
}

// Contact form: hand off to the visitor's email app with the fields filled in
$$('.contact-form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const v = id => (f.querySelector('#' + id)?.value || '').trim();
  const from = v('email'), name = v('name'), msg = v('message');
  const subject = `Portfolio message from ${name || from}`;
  const body = `${msg}\n\n— ${name ? name + ' · ' : ''}${from}`;
  location.href = `mailto:${f.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}));

// Copy email
const legacyCopy = text => {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.append(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
};
$$('.copy-email').forEach(b => b.addEventListener('click', async () => {
  const email = b.dataset.email;
  let copied = false;
  try { await navigator.clipboard.writeText(email); copied = true; } catch { copied = legacyCopy(email); }
  if (!copied) { location.href = 'mailto:' + email; return; }
  const t = b.textContent;
  b.textContent = 'Copied!';
  b.blur();
  setTimeout(() => (b.textContent = t), 1800);
}));
