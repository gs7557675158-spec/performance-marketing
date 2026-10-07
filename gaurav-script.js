(() => {
'use strict';

/* ============================================================
   CONFIG: fill these in, nothing else needs editing to go live
   ============================================================ */
const CONFIG = {
  email:    'gs7557675158@gmail.com',
  phone:    '7557675158'
};

/* ============================================================
   CASE FILES: every client drawn from the portfolio PDF.
   Order: Miffy's Mansion, Salmon Stretch, remaining ongoing
   clients, then the rest in portfolio order.
   ============================================================ */
const CASES = [
  { id:'miffys', feat:true, mono:'MM', title:"Miffy's Mansion", industry:'Interior Design & Home Decor',
    agency:'Direct client', period:'Ongoing, about 1 year', role:'Google & Meta Ads',
    platform:'Google Ads, Meta Ads', objective:"Build demand for luxury kids' room projects starting from ₹10 lakh.",
    strategy:'Manage both Google and Meta campaigns end to end for a high-ticket, considered-purchase category.',
    execution:'Ongoing account management across both platforms for about a year.',
    tags:['Google Ads','Meta Ads','Luxury'], metrics:[{label:'Project scope', value:'From ₹10L+'}], images:[] },
  { id:'salmon', mono:'SS', title:'Salmon Stretch', industry:'Fashion & Apparel',
    agency:'Direct client', period:'Ongoing', role:'Paid Advertising (account turnaround)',
    platform:'Meta Ads', objective:'Turn around an ad account stuck at 1–3 orders a month after a previous agency and freelancer.',
    strategy:'Took over the account in early September and rebuilt the paid media approach from scratch.',
    execution:'Rebuilt campaigns and creative direction, lifting order volume enough for the client to increase budget.',
    tags:['Meta Ads','Account Turnaround','Fashion'], metrics:[{label:'ROAS', value:'4x'},{label:'Budget', value:'Increased after turnaround'}], images:[] },
  { id:'homesaga', mono:'HS', title:'The Home Saga', industry:'Interior Design & Home Decor',
    agency:'Direct client', period:'Ongoing', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Grow luxury homeware brands through exhibitions held in different cities each year.',
    strategy:'Support exhibition-led growth with paid campaigns timed around each event.',
    execution:'Ongoing account management across multiple annual exhibitions.',
    tags:['Paid Advertising','Events','Luxury'], metrics:[], images:[] },
  { id:'aren', mono:'AJ', title:'Aren Jewellers', industry:'Jewellery & Luxury',
    agency:'Direct client', period:'Ongoing, about 1 year', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Support a premium jewellery brand that holds international exhibitions, including in the US.',
    strategy:'Run ongoing paid campaigns aligned to both the Chandigarh base and international exhibition activity.',
    execution:'Managed the account continuously for about a year.',
    tags:['Jewellery','Luxury','International'], intl:true, metrics:[], images:[] },
  { id:'saahibha', mono:'SG', title:'Saahibha Groverr', industry:'Jewellery & Luxury',
    agency:'Direct client', period:'Ongoing, 3 months', role:'Paid Advertising',
    platform:'Meta Ads', objective:'Support a Delhi jewellery brand following the opening of a new outlet in Dhanmill.',
    strategy:'Launch and optimize campaigns timed to the new outlet opening.',
    execution:'Managed the account for three months and counting.',
    tags:['Jewellery','Luxury'], metrics:[{label:'ROAS', value:'2.1x'}], images:[] },
  { id:'sunita', mono:'SA', title:'Dr. Sunita Arora', industry:'Healthcare',
    agency:'Direct client', period:'Ongoing, 8 months', role:'Paid Advertising + Website',
    platform:'Google Ads, Meta Ads, Website', objective:'Help a leading infertility and IVF specialist attract more patients.',
    strategy:"Build the practice's website and pair it with ongoing paid campaigns.",
    execution:'Designed and built drsunitaarora.com, then ran the paid media driving patients to it.',
    tags:['Healthcare','Website','Paid Advertising'], metrics:[{label:'ROAS', value:'3.1x'}], images:[] },
  { id:'elysian', mono:'EH', title:'Elysian Home Decor', industry:'Interior Design & Home Decor',
    agency:'Direct client', period:'Client work', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Grow sales for a luxury home decor products brand.',
    strategy:'Run performance campaigns focused on sales efficiency.',
    execution:'Managed paid media against a clear ROAS target.',
    tags:['Home Decor','Luxury'], metrics:[{label:'ROAS', value:'3.5x'}], images:[] },
  { id:'klifora', mono:'KD', title:'Klifora Diamond', industry:'Jewellery & Luxury',
    agency:'Direct client', period:'8 months', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Grow sales for a lab-grown diamond jewellery brand that also sells franchises.',
    strategy:'Run separate campaign tracks for luxury jewellery sales and franchise lead generation.',
    execution:'Managed both tracks over eight months.',
    tags:['Jewellery','Franchise','Lab-Grown Diamonds'], metrics:[{label:'ROAS, jewellery sales', value:'2.5x'},{label:'ROAS, franchise sales', value:'2x'}], images:[] },
  { id:'kkdental', mono:'KK', title:'K K Dental Clinic', industry:'Healthcare',
    agency:'Uniworld Studios', period:'3 months', role:'Paid Advertising',
    platform:'Meta Ads, Google Ads', objective:'Help a Faridabad dental clinic get more clients.',
    strategy:'Run local-focused paid campaigns for the clinic.',
    execution:'Managed the account for three months at Uniworld Studios.',
    tags:['Healthcare','Local'], metrics:[{label:'ROAS', value:'1.8x'}], images:[] },
  { id:'modern', mono:'MS', title:'Modern School, Barakhamba', industry:'Education',
    agency:'Uniworld Studios', period:'Client work', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Bring in more leads and admissions for a luxury school group.',
    strategy:'Run campaigns across three schools and one hostel under the same brand.',
    execution:'Managed ads for all four properties at Uniworld Studios.',
    tags:['Education','Multi-Property'], metrics:[], images:[] },
  { id:'ielts', mono:'IG', title:'IELTS Guru', industry:'Education',
    agency:'Uniworld Studios', period:'Client work', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Generate leads for an institute coaching students headed abroad for IELTS and further study.',
    strategy:'Run lead generation campaigns targeted at prospective overseas students.',
    execution:'Managed the account at Uniworld Studios.',
    tags:['Education','Lead Generation'], metrics:[], images:[] },
  { id:'rita', mono:'R', title:'Rita Drinks', sub:'Dubai, UAE', industry:'FMCG / Food & Beverage',
    agency:'Uniworld Studios', period:'Client work', role:'SEO + Paid Advertising',
    platform:'SEO, Paid Media (UAE)', objective:'Fix underperforming SEO from a previous agency, then grow the brand in the UAE.',
    strategy:'Start with a full SEO audit, then move into UAE paid media once the audit showed clear improvement.',
    execution:'Delivered the audit and recommendations, then ran paid media that boosted the brand in the UAE market.',
    tags:['SEO','International','UAE'], intl:true, metrics:[{label:'Sales increase', value:'2.2x'}], images:[] },
  { id:'nutroyumm', mono:'NY', title:'NutroYumm', industry:'FMCG / Food & Beverage',
    agency:'Direct client', period:'2 months', role:'Paid Advertising (seasonal)',
    platform:'Meta Ads, Google Ads', objective:'Drive festive-season sales for a healthy, vegan, premium-priced chips brand.',
    strategy:'Plan and run advertising timed to the Diwali festive season.',
    execution:'Ran a focused two-month campaign around the festive window.',
    tags:['FMCG','Seasonal','D2C'], metrics:[{label:'Sales increase', value:'2.6x'}], images:[] },
  { id:'elan', mono:'EE', title:'Elan The Emperor', sub:'Gurugram', industry:'Real Estate',
    agency:'Direct client', period:'Client work', role:'Paid Advertising',
    platform:'Google Ads, Meta Ads', objective:'Sell out one property for a luxury real estate developer in Gurugram.',
    strategy:'Run a focused campaign aimed at closing the specific property.',
    execution:'Managed the campaign through to a full sell-out.',
    tags:['Real Estate','Luxury'], metrics:[{label:'Time to sell out', value:'50 days'}], images:[] },
  { id:'suresh', mono:'SM', title:'Suresh Mansharamani', industry:'Personal Brand / Coaching',
    agency:'Direct client', period:'Client work', role:'Paid Advertising',
    platform:'Meta Ads, Google Ads', objective:'Drive ticket sales for a business seminar run by a coach who has taken a company through an IPO.',
    strategy:'Run a ticket-sales campaign against the seminar date.',
    execution:'Managed the campaign to a full sell-out ahead of schedule.',
    tags:['Coaching','Events','Ticket Sales'], metrics:[{label:'Tickets', value:'Sold out 14 days early'}], images:[] },
  { id:'rentelse', mono:'RE', title:'Rentelse', industry:'Rental / E-commerce',
    agency:'Freelance client', period:'Client work', role:'SEO + Paid Advertising',
    platform:'SEO, Paid Advertising', objective:'Grow a business renting out home electronics and appliances such as fridges, ACs and heaters.',
    strategy:'Combine SEO with paid advertising for the rental catalog.',
    execution:'Handled both disciplines directly as a freelance client.',
    tags:['SEO','E-commerce','Rentals'], metrics:[], images:[] },
  { id:'uniworld', mono:'US', title:'Uniworld Studios', industry:'Digital Marketing Agency',
    agency:'Uniworld Studios', period:'Client work', role:'SEO + Internal Ads',
    platform:'SEO, Paid Advertising', objective:"Support the agency's own SEO and client-acquisition advertising.",
    strategy:"Handle the agency's SEO completely, then take on its internal ads.",
    execution:"Managed both the agency's SEO and its own ads to help bring in more clients.",
    tags:['SEO','Agency','Internal'], metrics:[], images:[] },
  { id:'tangenz', mono:'TC', title:'Tangenz Corporation', sub:'US', industry:'IT & Tech',
    agency:'Direct client', period:'Client work', role:'SEO',
    platform:'SEO', objective:'Grow organic traffic for a top Oracle Cloud Implementation Partner in the US.',
    strategy:'Handle SEO from start to finish, including website implementation recommendations.',
    execution:'Delivered multiple website implementations and recommendations that noticeably increased traffic.',
    tags:['SEO','IT & Tech','International'], intl:true, metrics:[{label:'Client outcome', value:'Noticeable traffic increase'}], images:[] },
  { id:'iamsg', mono:'SG', title:'Iamsg', sub:'Saransh Gupta', industry:'Personal Brand',
    agency:'Direct client', period:'Client work', role:'SEO',
    platform:'SEO', objective:"Grow inbound interest for the personal website of Uniworld Studios' owner.",
    strategy:'Handle SEO for the personal site.',
    execution:'SEO work helped bring in calls for the business.',
    tags:['SEO','Personal Brand'], metrics:[{label:'Outcome', value:'Increased inbound calls'}], images:[] }
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
  b.innerHTML = `<span class="file__cv">${cover}${c.feat ? '<span class="file__tag">Featured client</span>' : ''}${c.intl ? '<span class="file__tag">International client</span>' : ''}</span>
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
tl(1);

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
  a.href = `https://wa.me/91${CONFIG.phone}?text=${encodeURIComponent("Hi Yogesh, I'd like to talk about performance marketing.")}`;
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
