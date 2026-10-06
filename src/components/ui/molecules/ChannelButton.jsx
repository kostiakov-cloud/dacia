import React from 'react';
import { cn } from '../utils';

/** Contact channel button: 160x48, light fill, 1px d-5 border, icon + bold label. */
export const ChannelButton = React.forwardRef(({ icon: Icon, href = '#', className, children, ...props }, ref) => (
  <a
    ref={ref}
    data-mega-item
    href={href}
    className={cn(
      'inline-flex h-12 w-full items-center md:w-40 justify-center gap-3 rounded-[2px] border border-alpha-d-5 bg-surface-01',
      'font-block text-[14px] font-bold leading-6 text-dacia-text-secondary transition-colors duration-200',
      'hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
      className
    )}
    {...props}
  >
    {Icon && <Icon className="shrink-0" />}
    {children}
  </a>
));
ChannelButton.displayName = 'ChannelButton';
