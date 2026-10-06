import React from 'react';
import { cn } from '../utils';
import { PriceBadge } from './PriceBadge';

/** Link row of a mega-menu column (16/24 Regular), optionally with a price chip. */
export const MegaLink = React.forwardRef(({ href = '#', price, className, children, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    className={cn(
      'flex w-fit items-center gap-3 whitespace-nowrap text-[16px] font-normal leading-6 text-dacia-text-secondary',
      'transition-colors duration-200 hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
      className
    )}
    {...props}
  >
    {children}
    {price && <PriceBadge>{price}</PriceBadge>}
  </a>
));
MegaLink.displayName = 'MegaLink';
