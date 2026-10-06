import React from 'react';
import { cn } from '../utils';
import { tr } from '../../../i18n';

/**
 * Single-choice filter chips (radio group semantics): the active chip is dark green, the rest white with a 1px border.
 * 40px high, 14px Medium, 2px corners. `options` = [{ value, label }].
 */
export function FilterChips({ options, value, onChange, label = tr('Фильтр'), className }) {
  return (
    <div role="radiogroup" aria-label={label} className={cn('flex flex-wrap items-center gap-2', className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(o.value)}
            className={cn(
              'h-10 rounded-cr2 border px-5 text-[14px] font-medium leading-6 transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2',
              active
                ? 'border-dacia-dark-green bg-dacia-dark-green text-surface-01'
                : 'border-alpha-d-5 bg-surface-01 text-dacia-text-secondary hover:border-dacia-dark-green'
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
