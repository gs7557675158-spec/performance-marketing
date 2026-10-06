(() => {
'use strict';
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

const reveal = $$('.r');
if (reduce || !('IntersectionObserver' in window)) {
  reveal.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((es, o) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); }
  }), { threshold: .15 });
  reveal.forEach(el => io.observe(el));
}
})();
