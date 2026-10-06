import React from 'react';
import { cn } from '../utils';

/**
 * Button for dark / photo backgrounds. `solid` = white fill + dark text, `outline` = 1px white frame
 * on a dark glass. Square 2px corners, Medium. Sizes: `m` = 40px / 14px (default), `l` = 48px / 16px.
 */
const sizes = {
  m: 'h-10 px-6 text-[14px] leading-6',
  l: 'h-12 px-8 text-[16px] leading-6',
};

const variants = {
  solid: 'bg-surface-01 text-dacia-text-secondary hover:bg-surface-06',
  outline: 'border border-surface-01 bg-black/40 text-surface-01 backdrop-blur-sm hover:bg-surface-01 hover:text-dacia-text-secondary',
};

export const OnDarkButton = React.forwardRef(({ variant = 'solid', size = 'm', href, className, children, ...props }, ref) => {
  const Comp = href ? 'a' : 'button';
  return (
    <Comp
      ref={ref}
      href={href}
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-[2px] font-medium',
        sizes[size],
        'transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-01 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});
OnDarkButton.displayName = 'OnDarkButton';
