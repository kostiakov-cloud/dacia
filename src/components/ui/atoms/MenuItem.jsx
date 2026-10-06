import React from 'react';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { cn } from '../utils';

/**
 * ds/Menu Item — Figma component set 27417:61024.
 *
 * Variants:  Type = Default | Active | Menu title   Mobile = False | True
 * Toggles:   Show Icon (`icon`) / Show Chevron (`chevron`)
 *
 * Props:
 *   - variant: 'default' | 'active' | 'title'  (`active` boolean is a shortcut for variant="active")
 *   - mobile: 18/32 text, gap 8, trailing right chevron
 *   - icon: any node rendered before the label (e.g. <PhoneIcon />)
 *   - chevron: true | 'down' | 'up' | 'right'
 *   - href: renders <a>, otherwise <button>; `as` overrides the element
 */
const text = {
  default: 'font-normal text-dacia-text-secondary',
  active: 'font-normal text-dacia-dark-green',
  title: 'pb-2 font-medium text-dacia-text-secondary',
};

const chevrons = { down: ChevronDown, up: ChevronUp, right: ChevronRight };

export const MenuItem = React.forwardRef(({
  variant = 'default',
  active = false,
  mobile = false,
  icon,
  chevron,
  as,
  href,
  disabled = false,
  className,
  children,
  ...props
}, ref) => {
  const type = active ? 'active' : variant;
  const Comp = as || (href ? 'a' : 'button');
  const Chevron = mobile && !chevron ? ChevronRight : chevrons[chevron === true ? 'down' : chevron];
  const chevronSize = mobile ? 24 : 16;

  return (
    <Comp
      ref={ref}
      href={href}
      {...(Comp === 'button' ? { type: 'button', disabled } : {})}
      aria-current={type === 'active' ? 'page' : undefined}
      className={cn(
        'relative inline-flex items-center whitespace-nowrap bg-transparent',
        'transition-colors duration-200 hover:text-dacia-dark-green',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        mobile ? 'gap-2 text-[18px] leading-[32px]' : 'gap-1 text-[16px] leading-[28px]',
        text[type],
        // Active: 1.2px underline centred on the bottom edge
        type === 'active' && 'after:absolute after:inset-x-0 after:-bottom-[0.6px] after:h-[1.2px] after:bg-dacia-dark-green',
        className
      )}
      {...props}
    >
      {icon && <span className="flex shrink-0 items-center pr-1">{icon}</span>}
      {children}
      {Chevron && <Chevron size={chevronSize} strokeWidth={1.5} className="shrink-0" />}
    </Comp>
  );
});

MenuItem.displayName = 'MenuItem';
