import React from 'react';
import { cn } from '../utils';

/** "от 12 880 €" chip: Light prefix + Medium price, 1px d-5 border. */
export function PriceBadge({ prefix = 'от', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-[2px] border border-alpha-d-5 bg-surface-01 px-2 text-[12px] leading-[22px]',
        className
      )}
    >
      {prefix && <span className="font-light text-ink-13">{prefix}</span>}
      <span className="font-medium text-dacia-text-secondary">{children}</span>
    </span>
  );
}
