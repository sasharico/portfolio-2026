const container = document.getElementById('scroll-container');

// ─────────────────────────────────────────────────
// 1. IntersectionObserver — animate elements in/out
// ─────────────────────────────────────────────────
const animEls = document.querySelectorAll(
  '.anim-head, .anim-text, .anim-img, .anim-doodle'
);

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    } else {
      e.target.classList.remove('visible');
    }
  });
}, { root: container, threshold: 0.12 });

animEls.forEach(el => io.observe(el));


// ─────────────────────────────────────────────────
// 2. Color-wipe reveal for divider sections
// ─────────────────────────────────────────────────
const wipeSections = document.querySelectorAll('.color-wipe-section');

const wipeIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('wiped');
    } else {
      e.target.classList.remove('wiped');
    }
  });
}, { root: container, threshold: 0.35 });

wipeSections.forEach(s => wipeIO.observe(s));


// ─────────────────────────────────────────────────
// 3. Parallax — doodles move slightly slower
// ─────────────────────────────────────────────────
const parallaxEls = document.querySelectorAll('.pdoodle');
const vh = window.innerHeight;

function onScroll() {
  const scrollTop = container.scrollTop;
  parallaxEls.forEach(el => {
    const section = el.closest('.section');
    if (!section) return;
    const sTop = section.offsetTop;
    const rel  = scrollTop - sTop;
    if (Math.abs(rel) < vh * 1.4) {
      const speed = parseFloat(el.dataset.speed || '0.3');
      el.style.transform = `translateY(${rel * speed * -0.35}px)`;
    }
  });
}

container.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// ─────────────────────────────────────────────────
// 4. Smooth-scroll TOC links
// ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  });
});
