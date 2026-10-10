(() => {
'use strict';

/* ============================================================
   CONFIG: fill these in, nothing else needs editing to go live
   ============================================================ */
const CONFIG = {
  email:    'akshara31singh@gmail.com',
  phone:    '9927602553'
};

/* ============================================================
   CASE FILES: role-by-role impact, drawn from verified resume content.
   ============================================================ */
const CASES = [
  { id:'current', feat:true, mono:'BM', title:'Brand strategy across three markets', sub:'Current role', company:null, industry:null,
    agency:'Uniworld Studios', period:'June 2022 – Present', role:'Brand Manager',
    platform:'Social, SEO, performance marketing and content', objective:'Support client growth across real estate, education, e-commerce and lifestyle brands in India, the USA and the UAE.',
    strategy:'Build tailored brand and social media roadmaps aligned to client goals, backed by market research, competitor analysis and brand audits.',
    execution:'Lead a cross-functional team of designers, content creators and performance marketers from onboarding through delivery, keeping brand presence consistent across every platform and resolving client challenges as they come up.',
    tags:['Brand Strategy','Team Leadership','Client Management'],
    metrics:[{label:'Markets served', value:'India, USA, UAE'},{label:'Client industries', value:'4 verticals'}], images:[] },
  { id:'dme', mono:'DM', title:'Scaling engagement through content', industry:null,
    agency:'Uniworld Studios', period:'Nov 2021 – May 2022', role:'Digital Marketing Executive',
    platform:'LinkedIn, Instagram, Facebook, X and YouTube', objective:'Manage end-to-end digital strategy and brand communication for Indian and USA-based clients.',
    strategy:'Build content calendars and short-form video content tailored to each audience, paired with Canva-designed creatives and decks.',
    execution:'Owned day-to-day social handling, client delivery and reporting, tracking KPIs to guide the next cycle of content.',
    tags:['Social Media','Content Strategy','Reporting'],
    metrics:[{label:'Engagement lift (self-reported)', value:'30–40%'}], images:[] },
  { id:'ga', mono:'GA', title:'500+ influencers, 20+ partnerships', industry:null,
    agency:'Gamezop', period:'November 2020 – February 2020', role:'Growth Analyst',
    platform:'Influencer marketing, regional outreach', objective:'Scale brand presence across Gujarat, Rajasthan, Haryana and Delhi through influencer partnerships.',
    strategy:'Research and shortlist regional influencers, then track engagement, reach and relevance in a structured database.',
    execution:'Closed 20+ partnerships, negotiated deliverables with influencers, and monitored reach, views and ROI across the campaign.',
    tags:['Influencer Marketing','Regional Growth','Partnerships'],
    metrics:[{label:'Influencers shortlisted', value:'500+'},{label:'Partnerships closed', value:'20+'},{label:'Regional reach lift (self-reported)', value:'20–30%'}], images:[] },
  { id:'intern-dm', mono:'DM', title:'Foundations across SEO, SEM and content', industry:null,
    agency:'Uniworld Studios', period:'May 2021 – October 2021', role:'Digital Marketing Intern',
    platform:'SEO, SEM, social and content', objective:'Support campaigns and client projects across digital marketing disciplines.',
    strategy:'Keyword research, on-page and off-page SEO, and content calendars for client accounts.',
    execution:'Assisted ad campaigns, client communications and performance reporting while building a foundation across the full digital marketing stack.',
    tags:['SEO','SEM','Client Projects'], metrics:[], images:[] },
  { id:'intern-ga', mono:'GA', title:'Regional influencer network, early career', industry:null,
    agency:'Gamezop', period:'August 2019 – October 2019', role:'Growth Analyst Intern',
    platform:'Influencer marketing, regional outreach', objective:'Strengthen brand reach and visibility across regional markets through influencer collaborations.',
    strategy:'Identify potential influencers and build an outreach database for partnerships.',
    execution:'Negotiated early collaborations and maintained relationships with regional influencers across four states.',
    tags:['Influencer Marketing','Outreach'], metrics:[], images:[] }
].map(c => ({ ...c, metrics:c.metrics||[], images:c.images||[] }));

/* ============================================================
   UTILITIES
   ============================================================ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const onView = (els, cb, opt) => {
  const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { cb(e.target); o.unobserve(e.target); } }), opt || { threshold: .2 });
  els.forEach(e => io.observe(e));
};
const ph = t => `<span class="ph">[${t}]</span>`;
const ic = id => `<svg class="ic" aria-hidden="true"><use href="#${id}"/></svg>`;

/* ============================================================
   FIT TEXT: sizes the poster headlines to the container edge to edge
   ============================================================ */
const fitEls = $$('[data-fit]');
function fit() {
  fitEls.forEach(el => {
    el.style.fontSize = '100px';
    let max = 0;
    $$('.row', el).forEach(r => {
      const lns = $$('.ln', r);
      const flex = getComputedStyle(r).display === 'flex';
      let w = 0;
      if (flex) { lns.forEach(l => w += l.getBoundingClientRect().width); w += 100 * .24 * (lns.length - 1); }
      else lns.forEach(l => w = Math.max(w, l.getBoundingClientRect().width));
      max = Math.max(max, w);
    });
    const cw = el.clientWidth;
    if (max > 0 && cw > 0) el.style.fontSize = Math.min(100 * cw / max * .992, 300) + 'px';
    else el.style.fontSize = '';
  });
}
let fitT; addEventListener('resize', () => { cancelAnimationFrame(fitT); fitT = requestAnimationFrame(fit); });
fit();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
addEventListener('load', fit);

/* Hero + contact posters: reveal when in view (hero immediately) */
const reveal = el => el.classList.add('in');
requestAnimationFrame(() => requestAnimationFrame(() => reveal($('#hero-h'))));
onView($$('#ct-h'), reveal, { threshold: .25 });

/* ============================================================
   3D SCROLL REVEAL
   Tags a group of elements as .r3d, staggers them with --i,
   then flips each one upright as it enters the viewport.
   ============================================================ */
function reveal3d(list, stagger) {
  list.forEach((el, i) => { el.classList.add('r3d'); el.style.setProperty('--i', i % (stagger || 6)); });
  onView(list, el => el.classList.add('in'), { threshold: .22 });
}
reveal3d($$('.proof > div'));
reveal3d($$('#nums .num'));
reveal3d($$('.tl__btn'));
reveal3d($$('.agencies > div'));

/* Edge reveal: elements marked .edge (.l or .r) slide in as they enter view */
onView($$('.edge'), el => el.classList.add('in'), { threshold: .2 });

/* Photo ID card: tilts toward the cursor on desktop, flips upright on scroll */
const idcard = $('#idcard'), idimg = $('.idcard__img', idcard);
reveal3d([idcard]);
if (fine && !reduce) {
  idcard.addEventListener('pointermove', e => {
    const r = idcard.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    idimg.style.transform = `rotateY(${px * 16}deg) rotateX(${py * -16}deg)`;
  });
  idcard.addEventListener('pointerleave', () => { idimg.style.transform = ''; });
}

/* ============================================================
   HEADING WORD REVEAL
   ============================================================ */
function split(el) {
  let n = 0;
  (function walk(node) {
    Array.from(node.childNodes).forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.append(p);
          else { const w = document.createElement('span'), i = document.createElement('i');
            w.className = 'w'; i.textContent = p; i.style.setProperty('--w', n++); w.append(i); frag.append(w); }
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) walk(c);
    });
  })(el);
}
const heads = $$('[data-split]');
heads.forEach(split);
onView(heads, reveal, { threshold: .3 });

/* ============================================================
   HERO VISUALIZATION (illustrative, generated, not real data)
   ============================================================ */
const viz = $('#viz');
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
let vizW = 0;
function buildViz() {
  const W = viz.clientWidth, H = viz.clientHeight;
  if (!W || Math.abs(W - vizW) < 24) return;
  vizW = W;
  const svg = $('svg', viz), r = rng(7);
  const x0 = 18, x1 = W - 18, top = 54, base = H - 46, span = x1 - x0;
  const step = 10, n = Math.floor(span / step);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  let s = '<g class="gr">';
  for (let k = 0; k < 4; k++) { const y = top + k * (base - top) / 3; s += `<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}"/>`; }
  s += '</g>';
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const h = (base - top) * (.16 + .5 * Math.pow(t, 1.15) + r() * .2);
    const x = x0 + i * step;
    s += `<rect class="b${t > .72 ? ' hi' : ''}" x="${x}" y="${base - h}" width="4" height="${h}" style="--d:${Math.round(i * 16)}ms;--s:${(.62 + r() * .3).toFixed(2)}"/>`;
    if (i % 4 === 0 || i === n - 1) { const v = .12 + .8 * (1 - Math.pow(1 - t, 1.8)) + (r() - .5) * .06; pts.push([x + 2, base - (base - top) * .1 - v * (base - top) * .86]); }
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i]; d += ` Q${p[0]},${p[1]} ${(p[0] + q[0]) / 2},${(p[1] + q[1]) / 2}`; }
  const L = pts[pts.length - 1]; d += ` L${L[0]},${L[1]}`;
  s += `<line class="scan" x1="${x0}" x2="${x0}" y1="${top}" y2="${base}" style="--w:${span}px"/>`;
  s += `<path class="sig" pathLength="1" d="${d}"/>`;
  s += `<circle class="pr" cx="${L[0]}" cy="${L[1]}" r="5"/><circle class="pt" cx="${L[0]}" cy="${L[1]}" r="5"/>`;
  svg.innerHTML = s;
}
buildViz();
let vT; addEventListener('resize', () => { clearTimeout(vT); vT = setTimeout(buildViz, 160); });

/* ============================================================
   COUNTERS + LEDGER
   ============================================================ */
const allCounters = $$('[data-count]');
allCounters.forEach(c => { c.textContent = '0'; });
function count(el) {
  const to = +el.dataset.count;
  if (reduce) { el.textContent = to; return; }
  const dur = 1700, t0 = performance.now();
  (function tick(t) {
    const p = Math.min((t - t0) / dur, 1), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = Math.round(to * e);
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
onView($$('.proof [data-count]'), count, { threshold: .2 });
onView($$('#nums [data-count]'), count, { threshold: .3 });

/* ============================================================
   NAV, PROGRESS, FAB, ACTIVE LINK
   ============================================================ */
const nav = $('#nav'), prog = $('#progress'), fab = $('#fab');
let tick = false;
function onScroll() {
  tick = false;
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  nav.classList.toggle('is-stuck', y > 40);
  prog.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  const c = $('#contact').getBoundingClientRect();
  fab.classList.toggle('show', y > innerHeight * .8 && c.top > innerHeight * .6);
}
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

const links = $$('.nav__links a');
const secs = ['work', 'about', 'experience', 'skills', 'contact'].map(id => document.getElementById(id));
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'));
}), { rootMargin: '-45% 0px -50% 0px' });
secs.forEach(s => spy.observe(s));

/* Mobile menu */
const burger = $('#burger'), menu = $('#menu');
function menuSet(open) {
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.documentElement.classList.toggle('lock', open);
}
burger.addEventListener('click', () => menuSet(!menu.classList.contains('open')));
$$('a', menu).forEach(a => a.addEventListener('click', () => menuSet(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { menuSet(false); burger.focus(); } });

/* ============================================================
   CASE RAIL + MODAL
   ============================================================ */
const rail = $('#rail');
CASES.forEach((c, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'file' + (c.feat ? ' file--feat' : ''); b.dataset.case = c.id;
  b.setAttribute('aria-haspopup', 'dialog');
  const cover = c.images && c.images[0] ? `<img src="${c.images[0]}" alt="" loading="lazy" decoding="async">` : `<span class="file__mono" aria-hidden="true">${c.mono}</span>`;
  b.innerHTML = `<span class="file__cv">${cover}${c.feat ? '<span class="file__tag">Current role</span>' : ''}${c.intl ? '<span class="file__tag">International client</span>' : ''}</span>
    <span class="file__bd"><span class="file__t">${c.title}</span>
    ${c.sub ? `<span class="file__s">${c.sub}</span>` : ''}
    <span class="file__m">${c.agency}<br>${c.period}</span>
    <span class="chips">${c.tags.map(t => `<span class="chip">${t}</span>`).join('')}</span></span>
    <span class="file__plus" aria-hidden="true">${ic('i-plus')}</span>`;
  b.setAttribute('aria-label', `Open case file: ${c.title}`);
  rail.append(b);
});
reveal3d($$('.file', rail), 8);

const modal = $('#modal'), mBody = $('#mBody');
let cur = 0;
function render(i) {
  cur = (i + CASES.length) % CASES.length;
  const c = CASES[cur];
  $('#mCount').textContent = `Case file ${cur + 1} of ${CASES.length}`;
  const client = c.company === null ? 'Multiple clients (see individual case files below)' : c.title + (c.sub ? ` (${c.sub})` : '');
  const ind = c.industry ? c.industry : ph('Add industry');
  const mets = (c.metrics && c.metrics.length)
    ? `<div class="mets">${c.metrics.map(m => `<div class="met real"><span>${m.label}</span><b>${m.value}</b></div>`).join('')}</div>`
    : `<div class="mets"><div class="met"><span>Add a verified metric</span><b>–</b></div><div class="met"><span>Add a verified metric</span><b>–</b></div><div class="met"><span>Add a verified metric</span><b>–</b></div></div>`;
  mBody.innerHTML = `<h3 id="mTitle">${c.title}</h3><p class="role">${c.role}, ${c.agency}. ${c.period}.</p>
    <dl class="cs">
      <div><dt>Client and industry</dt><dd>${c.feat ? client : (c.sub ? c.title + ' (' + c.sub + ')' : c.title)}, ${ind}${c.intl ? '. International client.' : ''}</dd></div>
      <div><dt>Platform</dt><dd>${c.platform}</dd></div>
      <div><dt>Objective</dt><dd>${c.objective}</dd></div>
      <div><dt>Strategy</dt><dd>${c.strategy}</dd></div>
      <div><dt>Execution</dt><dd>${c.execution}</dd></div>
      <div><dt>Results</dt><dd class="res"><span>Detailed campaign metrics available on request.</span>${mets}</dd></div>
    </dl>`;
  mBody.scrollTop = 0;
}
function openCase(id) {
  const i = CASES.findIndex(c => c.id === id);
  if (i < 0) return;
  render(i);
  if (!modal.open) { modal.showModal(); document.documentElement.classList.add('lock'); }
}
modal.addEventListener('close', () => document.documentElement.classList.remove('lock'));
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
$('#mClose').addEventListener('click', () => modal.close());
$('#mPrev').addEventListener('click', () => render(cur - 1));
$('#mNext').addEventListener('click', () => render(cur + 1));
document.addEventListener('click', e => {
  const t = e.target.closest('[data-case]');
  if (t && !rail.classList.contains('drag')) openCase(t.dataset.case);
});

/* Rail: buttons, progress, mouse-drag */
const bar = $('#railBar'), prev = $('#railPrev'), next = $('#railNext');
function railUpdate() {
  const max = rail.scrollWidth - rail.clientWidth;
  const ratio = rail.clientWidth / rail.scrollWidth;
  bar.style.width = Math.max(ratio * 100, 12) + '%';
  const p = max > 0 ? rail.scrollLeft / max : 0;
  bar.style.transform = `translateX(${p * (100 / Math.max(ratio, .12) - 100)}%)`;
  prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft > max - 8;
}
rail.addEventListener('scroll', () => requestAnimationFrame(railUpdate), { passive: true });
addEventListener('resize', railUpdate);
const cardStep = () => { const c = $('.file:not(.file--feat)', rail); return (c ? c.getBoundingClientRect().width : 320) + 16; };
prev.addEventListener('click', () => rail.scrollBy({ left: -cardStep() * 1.5, behavior: reduce ? 'auto' : 'smooth' }));
next.addEventListener('click', () => rail.scrollBy({ left: cardStep() * 1.5, behavior: reduce ? 'auto' : 'smooth' }));
railUpdate();
let dragging = false, sx = 0, sl = 0, moved = 0;
rail.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; dragging = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; });
addEventListener('pointermove', e => {
  if (!dragging) return;
  const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
  if (moved > 6) { rail.classList.add('drag'); rail.scrollLeft = sl - dx; }
});
addEventListener('pointerup', () => {
  if (!dragging) return; dragging = false;
  setTimeout(() => rail.classList.remove('drag'), 0);
});

/* ============================================================
   TIMELINE
   ============================================================ */
const tb = $$('.tl__btn'), tp = $$('.tl__panel');
function tl(i) {
  tb.forEach((b, k) => { const on = k === i; b.classList.toggle('on', on); b.setAttribute('aria-expanded', String(on)); tp[k].classList.toggle('on', on); });
}
const wide = matchMedia('(min-width: 900px)');
tb.forEach((b, i) => {
  b.addEventListener('click', () => tl(i));
  b.addEventListener('focus', () => tl(i));
  b.addEventListener('mouseenter', () => { if (fine && wide.matches) tl(i); });
});
tl(4);

/* ============================================================
   APPROACH TABS
   ============================================================ */
const at = $$('.ap__tab'), ap = $$('.ap__pn'), apEl = $('#ap');
function step(i, focus) {
  at.forEach((t, k) => { const on = k === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; ap[k].classList.toggle('on', on); });
  apEl.style.setProperty('--step', i);
  if (focus) at[i].focus();
}
at.forEach((t, i) => {
  t.addEventListener('click', () => step(i));
  t.addEventListener('mouseenter', () => { if (fine && wide.matches) step(i); });
  t.addEventListener('keydown', e => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); step((i + 1) % 4, true); }
    if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); step((i + 3) % 4, true); }
  });
});

/* Skills: tap to highlight on touch */
$$('#sk li').forEach(li => li.addEventListener('click', () => { $$('#sk li.sel').forEach(x => x !== li && x.classList.remove('sel')); li.classList.toggle('sel'); }));

/* ============================================================
   CONTACT LINKS
   ============================================================ */
$$('[data-whatsapp]').forEach(a => {
  if (!CONFIG.phone) { a.addEventListener('click', e => { e.preventDefault(); $('#contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }); return; }
  a.href = `https://wa.me/91${CONFIG.phone}?text=${encodeURIComponent("Hi Akshara, I'd like to talk about brand and social strategy.")}`;
  a.target = '_blank';
  a.rel = 'noopener';
});

$$('[data-contact]').forEach(a => {
  const k = a.dataset.contact, v = CONFIG[k];
  if (!v) { a.addEventListener('click', e => { e.preventDefault(); $('#contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }); return; }
  a.href = k === 'email' ? 'mailto:' + v : 'tel:+91' + v;
  const label = $('.v', a); if (label) label.textContent = k === 'phone' ? '+91 ' + v : v;
});
$('#yr').textContent = new Date().getFullYear();

/* ============================================================
   CURSOR + MAGNETIC BUTTONS (fine pointers, motion allowed)
   ============================================================ */
if (fine && !reduce) {
  const cursorEl = $('#cursor'); let tx = 0, ty = 0, x = 0, y = 0, raf;
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY; cursorEl.classList.add('on');
    if (!raf) raf = requestAnimationFrame(loop);
    const t = e.target.closest ? e.target.closest('.file,a,button,[data-case]') : null;
    cursorEl.classList.toggle('view', !!(t && t.classList.contains('file')));
    cursorEl.classList.toggle('link', !!t && !t.classList.contains('file'));
  }, { passive: true });
  function loop() {
    x += (tx - x) * .22; y += (ty - y) * .22;
    cursorEl.style.transform = `translate3d(${x}px,${y}px,0)`;
    raf = (Math.abs(tx - x) > .1 || Math.abs(ty - y) > .1) ? requestAnimationFrame(loop) : 0;
  }
  document.documentElement.addEventListener('mouseleave', () => cursorEl.classList.remove('on'));
  $$('.mag').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}
})();
