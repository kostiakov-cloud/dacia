import React from 'react';
import { cn } from '../utils';
import logoName from '../../../assets/menu/logo-name.svg';

/**
 * Dacia wordmark (152x16) + optional market suffix (".md": Dacia Block Bold 14/28, text-tertiary).
 * Renders a link when `href` is passed.
 */
export const Logo = React.forwardRef(({ suffix = '', href, className, ...props }, ref) => {
  const Comp = href ? 'a' : 'div';
  return (
    <Comp
      ref={ref}
      href={href}
      aria-label="Dacia"
      className={cn('flex items-end gap-2', className)}
      {...props}
    >
      <img src={logoName} alt="Dacia" width={152} height={16} className="shrink-0" />
      {suffix && (
        <span className="whitespace-nowrap font-block text-[14px] font-bold leading-[28px] text-ink-13 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {suffix}
        </span>
      )}
    </Comp>
  );
});

Logo.displayName = 'Logo';
