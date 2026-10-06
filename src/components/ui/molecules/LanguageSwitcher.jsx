import React from 'react';
import { cn } from '../utils';

/**
 * Language Switcher — two (or more) options split by a 12px divider.
 * Selected option: Medium 14/24, text-secondary. Others: Regular 16/28, text-tertiary.
 */
const defaultOptions = [
  { value: 'ro', label: 'Ro' },
  { value: 'ru', label: 'Ру' },
];

export const LanguageSwitcher = React.forwardRef(({
  options = defaultOptions,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}, ref) => {
  const [inner, setInner] = React.useState(defaultValue ?? options[options.length - 1]?.value);
  const current = value ?? inner;

  const select = (v) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
  };

  return (
    <div ref={ref} role="group" aria-label="Language" className={cn('flex items-center justify-center gap-2', className)} {...props}>
      {options.map((o, i) => {
        const selected = o.value === current;
        return (
          <React.Fragment key={o.value}>
            {i > 0 && <span aria-hidden className="h-3 w-[1.2px] shrink-0 bg-dacia-text-tertiary" />}
            <button
              type="button"
              lang={o.lang || o.value}
              aria-pressed={selected}
              onClick={() => select(o.value)}
              className={cn(
                'whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
                selected
                  ? 'text-[14px] font-medium leading-[24px] text-dacia-text-secondary'
                  : 'text-[16px] font-normal leading-[28px] text-dacia-text-tertiary hover:text-dacia-text-secondary'
              )}
            >
              {o.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
