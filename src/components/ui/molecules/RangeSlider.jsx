import React from 'react';
import { cn } from '../utils';

const fmt = (n) => `${new Intl.NumberFormat('ru-RU').format(n).replace(/ /g, ' ')} €`;

/**
 * Two-handle range slider built from two native <input type="range"> (keyboard + screen-reader friendly).
 * The thumbs are styled in index.css (.dual-range); the filled part and the dark value bubbles under the thumbs follow
 * the values. Controlled: `value` = [from, to].
 */
export function RangeSlider({ min, max, step = 100, value, onChange, label = 'Диапазон цен', format = fmt, className }) {
  const [a, b] = value;
  const pct = (v) => ((v - min) / (max - min)) * 100;
  const set = (i, v) => {
    const next = [...value];
    next[i] = v;
    if (i === 0) next[0] = Math.min(v, value[1] - step);
    else next[1] = Math.max(v, value[0] + step);
    onChange?.(next);
  };
  return (
    <div role="group" aria-label={label} className={cn('mx-auto w-full max-w-[512px] px-10 sm:px-0', className)}>
      <p className="mb-3 text-center text-small font-medium text-dacia-text-secondary">{label}</p>
      <div className="dual-range relative mx-3 h-6">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface-08" />
        <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-dacia-dark-green" style={{ left: `${pct(a)}%`, right: `${100 - pct(b)}%` }} />
        <input type="range" min={min} max={max} step={step} value={a} aria-label={`${label}: от`} aria-valuetext={format(a)} onChange={(e) => set(0, +e.target.value)} />
        <input type="range" min={min} max={max} step={step} value={b} aria-label={`${label}: до`} aria-valuetext={format(b)} onChange={(e) => set(1, +e.target.value)} />
      </div>
      <div className="relative mx-3 mt-1 h-8">
        {[a, b].map((v, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute top-0 -translate-x-1/2 whitespace-nowrap rounded-cr2 bg-dacia-text-secondary px-2 py-1 text-caption font-medium text-surface-01"
            style={{ left: `${pct(v)}%` }}
          >
            {format(v)}
          </span>
        ))}
      </div>
    </div>
  );
}
