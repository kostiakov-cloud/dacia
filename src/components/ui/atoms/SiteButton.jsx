import React from 'react';
import { cn } from '../utils';

/**
 * Button for light backgrounds. `solid` = Dacia dark green fill, `outline` = green frame.
 * Square 2px corners, Medium. Sizes: `l` = 48px / 16px (default — buttons are L everywhere but the menu), `m` = 40px / 14px.
 */
const variants = {
  solid: 'border border-dacia-dark-green bg-dacia-dark-green text-surface-01 hover:opacity-90',
  outline: 'border border-dacia-dark-green bg-transparent text-dacia-dark-green hover:bg-dacia-dark-green hover:text-surface-01',
};
const sizes = {
  m: 'h-10 px-6 text-[14px] leading-6',
  l: 'h-12 px-8 text-[16px] leading-6',
};

export const SiteButton = React.forwardRef(({ variant = 'solid', size = 'l', href, className, children, ...props }, ref) => {
  const Comp = href ? 'a' : 'button';
  return (
    <Comp
      ref={ref}
      href={href}
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-cr2 font-medium',
        'transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});
SiteButton.displayName = 'SiteButton';
