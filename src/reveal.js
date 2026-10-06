/**
 * Scroll-reveal for the whole site: one IntersectionObserver, CSS-only animation (opacity + transform, no layout cost).
 *
 *   <h2 {...reveal('up')}>            - rises 24px while fading in
 *   <li {...reveal('scale', 120)}>    - scales 0.94 -> 1, starts 120ms after it enters the viewport (for staggering)
 *
 * Variants: 'up' (default) | 'fade' | 'scale' | 'left' | 'right'. The hidden state exists only while JS runs
 * (html.reveal-ready), so without JS everything is simply visible. `prefers-reduced-motion` disables it entirely.
 * After an element has played, its reveal attributes are removed again, so it keeps its own hover transitions.
 * Elements that mount later (lazy pages, route changes) are picked up by a MutationObserver.
 */
export const reveal = (variant = 'up', delay = 0) => ({ 'data-reveal': variant, 'data-reveal-delay': delay });

export function initReveal() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('reveal-ready');

  const seen = new WeakSet();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        io.unobserve(el);
        const delay = Number(el.dataset.revealDelay) || 0;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('reveal-in');
        // once played, give the element its own transitions back
        setTimeout(() => {
          el.removeAttribute('data-reveal');
          el.removeAttribute('data-reveal-delay');
          el.classList.remove('reveal-in');
          el.style.removeProperty('--reveal-delay');
        }, delay + 1100);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  const watch = (el) => {
    if (seen.has(el)) return;
    seen.add(el);
    io.observe(el);
  };
  const scan = (node) => {
    if (node.nodeType !== 1) return;
    if (node.hasAttribute('data-reveal')) watch(node);
    node.querySelectorAll?.('[data-reveal]').forEach(watch);
  };

  scan(document.body);
  new MutationObserver((records) => records.forEach((r) => r.addedNodes.forEach(scan))).observe(document.body, { childList: true, subtree: true });
}
