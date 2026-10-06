import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../utils';

/** "Подробнее ↗" — 14px Medium action link used in mega menu columns and promo cards. */
export const ArrowLink = React.forwardRef(({ href, className, children, ...props }, ref) => {
  const Comp = href ? 'a' : 'button';
  return (
    <Comp
      ref={ref}
      href={href}
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={cn(
        'inline-flex w-fit items-center gap-2 text-left text-[14px] font-medium leading-6 text-dacia-text-secondary',
        'transition-colors duration-200 hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
        className
      )}
      {...props}
    >
      {children}
      <ArrowUpRight size={20} strokeWidth={1.5} className="shrink-0" />
    </Comp>
  );
});
ArrowLink.displayName = 'ArrowLink';
