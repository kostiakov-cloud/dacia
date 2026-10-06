import React from 'react';
import { cn } from '../utils';
import { ChevronLeftIcon, ChevronRightIcon } from '../atoms/SliderChevrons';
import { tr } from '../../../i18n';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Sizes: `l` = 32px chevrons, 16px counter, 14px bullets (hero); `m` = compact (20px / 12px / 8px).
 * Bullet geometry is the same SVG ring for both: r = size/2 - stroke/2.
 */
const sizes = {
  l: { gap: 'gap-6', arrow: 'size-8', icon: 32, text: 'text-[16px] leading-6', dotBtn: 'size-5', dot: 14, stroke: 2 },
  m: { gap: 'gap-3', arrow: 'size-8', icon: 20, text: 'text-[12px] leading-4', dotBtn: 'size-4', dot: 8, stroke: 1.5 },
};

function Dot({ size, active, progressRef }) {
  const { dot, stroke } = size;
  const r = dot / 2 - stroke / 2;
  const c = dot / 2;
  const common = { cx: c, cy: c, r, fill: 'none', stroke: 'currentColor', strokeWidth: stroke };
  return (
    <svg width={dot} height={dot} viewBox={`0 0 ${dot} ${dot}`} aria-hidden>
      {/* base ring */}
      <circle {...common} strokeOpacity={active && !progressRef ? 1 : 0.4} />
      {/* progress arc: grows clockwise from 12 o'clock while the slide is active */}
      {active && progressRef && (
        <circle
          {...common}
          ref={progressRef}
          pathLength="100"
          strokeDasharray="100"
          style={{ strokeDashoffset: 100 }}
          transform={`rotate(-90 ${c} ${c})`}
        />
      )}
    </svg>
  );
}

/**
 * Slider controls: ‹ 01/03 ◯ ◯ ◯ ›. `tone="light"` for photo backgrounds, `"dark"` for light ones.
 * Controlled. For autoplay sliders pass `progressRef`: it is attached to the active bullet's arc,
 * and the owner animates `style.strokeDashoffset` (100 = empty → 0 = full) without re-rendering.
 */
export function SliderControls({ index, count, onPrev, onNext, onDot, tone = 'light', size = 'm', progressRef, className }) {
  const s = sizes[size] || sizes.m;
  const light = tone === 'light';
  const arrow = cn(
    s.arrow,
    'flex shrink-0 items-center justify-center transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2',
    light ? 'text-surface-01 focus-visible:ring-surface-01' : 'text-dacia-text-secondary focus-visible:ring-dacia-dark-green'
  );
  return (
    <div className={cn('flex items-center font-medium', s.gap, s.text, light ? 'text-surface-01' : 'text-dacia-text-secondary', className)}>
      <button type="button" aria-label={tr('Предыдущий слайд')} onClick={onPrev} className={arrow}>
        <ChevronLeftIcon size={s.icon} />
      </button>
      <span className="tabular-nums" aria-live="off">
        {pad(index + 1)}/{pad(count)}
      </span>
      <div className="flex items-center">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={tr('Слайд {n0}', { n0: i + 1 })}
            aria-current={i === index}
            onClick={() => onDot?.(i)}
            className={cn(s.dotBtn, 'flex items-center justify-center focus:outline-none focus-visible:ring-2', light ? 'focus-visible:ring-surface-01' : 'focus-visible:ring-dacia-dark-green')}
          >
            <Dot size={s} active={i === index} progressRef={i === index ? progressRef : undefined} />
          </button>
        ))}
      </div>
      <button type="button" aria-label={tr('Следующий слайд')} onClick={onNext} className={arrow}>
        <ChevronRightIcon size={s.icon} />
      </button>
    </div>
  );
}
