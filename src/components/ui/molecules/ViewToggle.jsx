import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '../utils';
import { tr } from '../../../i18n';

const items = [
  { value: 'grid', label: tr('Плитка'), icon: LayoutGrid },
  { value: 'list', label: tr('Список'), icon: List },
];

/** Two-button grid / list switch (40px segments, the active one has a light grey fill). */
export function ViewToggle({ value, onChange, className }) {
  return (
    <div role="radiogroup" aria-label={tr('Вид')} className={cn('flex overflow-hidden rounded-cr2 border border-alpha-d-5 bg-surface-01', className)}>
      {items.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => onChange?.(v)}
            className={cn(
              'flex size-10 items-center justify-center text-dacia-text-secondary transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dacia-dark-green',
              active ? 'bg-surface-07' : 'hover:bg-surface-04'
            )}
          >
            <Icon size={20} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}
