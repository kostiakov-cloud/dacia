import React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { formatNumber } from '../../../i18n';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** '1 455' -> { n: 1455, group: true, prefix: '', suffix: '' }; '10"' -> { n: 10, suffix: '"' }; null when there is no number. */
function parse(text) {
  const m = String(text).match(/^(\D*?)(\d[\d\s ]*)(.*)$/);
  if (!m) return null;
  const digits = m[2].replace(/[\s ]/g, '');
  return { prefix: m[1], n: Number(digits), group: /[\s ]/.test(m[2].trim()), suffix: m[3] };
}

const fmt = (n, group) => (group ? formatNumber(n) : String(n));

/**
 * Scroll-triggered number counter: counts 0 -> value (expo-out, 1.4s) every time the number scrolls into view
 * (so it replays on each slide of a carousel). Keeps non-digit parts ('10"' -> 10 then the quote) and the thousands
 * grouping ('1 455'). The final text is laid out invisibly underneath, so the width never jumps while counting, and it
 * is also the accessible text. With `prefers-reduced-motion` (or without IntersectionObserver) it just shows the value.
 */
export function CountUp({ value, duration = 1400, className }) {
  const parsed = React.useMemo(() => parse(value), [value]);
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const ref = React.useRef(null);
  const [n, setN] = React.useState(null); // null = show the final value (no animation running / possible)
  const raf = React.useRef(0);

  React.useEffect(() => {
    if (!parsed || reduce || typeof IntersectionObserver === 'undefined') return undefined;
    const el = ref.current;
    const run = () => {
      cancelAnimationFrame(raf.current);
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        setN(p === 1 ? null : Math.round(parsed.n * easeOutExpo(p)));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      setN(0);
      raf.current = requestAnimationFrame(tick);
    };
    setN(0); // armed: shows 0 until the number is seen
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) run();
        else {
          cancelAnimationFrame(raf.current);
          setN(0); // re-arm, so the next visit counts again
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [parsed, reduce, duration]);

  if (!parsed) return <span className={className}>{value}</span>;
  const shown = n === null ? value : `${parsed.prefix}${fmt(n, parsed.group)}${parsed.suffix}`;
  return (
    <span ref={ref} className={`inline-grid ${className || ''}`}>
      <span className="invisible col-start-1 row-start-1">{value}</span>
      <span aria-hidden className="col-start-1 row-start-1 tabular-nums">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
