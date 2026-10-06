import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';
import { ModelCard } from '../molecules/ModelCard';

/**
 * Models slider for the mega menu: `visible` cards per page, arrows, "2-5 из 8" counter,
 * dots (visible window highlighted) and a "view all" button.
 */
export function ModelCarousel({ items = [], visible = 5, allLabel = 'Смотреть все модели', allHref = '#', className }) {
  const max = Math.max(0, items.length - visible);
  const [start, setStart] = React.useState(0);
  const go = (d) => setStart((s) => Math.min(max, Math.max(0, s + d)));
  const end = Math.min(items.length, start + visible);

  return (
    <div className={cn('flex w-full min-w-0 flex-col items-center gap-6', className)}>
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(start * 100) / visible}%)` }}
        >
          {items.map((m) => (
            <div key={m.name + m.price} data-mega-item className="shrink-0 px-2" style={{ width: `${100 / visible}%` }}>
              <ModelCard {...m} sizes="(min-width: 1280px) 220px, 30vw" />
            </div>
          ))}
        </div>
      </div>

      <div data-mega-item className="flex items-center gap-3 text-[12px] font-medium text-dacia-text-secondary">
        <button type="button" aria-label="Назад" disabled={start === 0} onClick={() => go(-1)} className="disabled:opacity-30">
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <span className="whitespace-nowrap">{start + 1}-{end} из {items.length}</span>
        <div className="flex items-center gap-1.5" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className={cn('size-2.5 rounded-full border', i >= start && i < end ? 'border-dacia-dark-green' : 'border-alpha-d-10')}
            />
          ))}
        </div>
        <button type="button" aria-label="Вперёд" disabled={start === max} onClick={() => go(1)} className="disabled:opacity-30">
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      <a
        href={allHref}
        data-mega-item
        className="inline-flex h-10 items-center justify-center rounded-[2px] border border-dacia-dark-green px-6 text-[14px] font-medium leading-6 text-dacia-dark-green transition-colors duration-200 hover:bg-dacia-dark-green hover:text-surface-01 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2"
      >
        {allLabel}
      </a>
    </div>
  );
}
