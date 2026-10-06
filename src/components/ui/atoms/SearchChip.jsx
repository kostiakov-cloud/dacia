import React from 'react';
import { cn } from '../utils';

/** Quick-search chip: 42px high, px 20, light fill, 1px d-5 border, 14px Medium. */
export const SearchChip = React.forwardRef(({ href = '#', className, children, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    data-mega-item
    className={cn(
      'inline-flex h-[42px] items-center whitespace-nowrap rounded-[2px] border border-alpha-d-5 bg-surface-01 px-5',
      'text-[14px] font-medium leading-6 text-dacia-text-secondary transition-colors duration-200',
      'hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
      className
    )}
    {...props}
  >
    {children}
  </a>
));
SearchChip.displayName = 'SearchChip';
