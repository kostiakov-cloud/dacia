import React from 'react';
import { cn } from '../utils';

/** Toggle switch (role=switch checkbox): 44×24 pill, dark-green when on, locked = on and not changeable. */
export const Switch = React.forwardRef(({ label, locked = false, className, id, ...props }, ref) => {
  const autoId = React.useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2 whitespace-nowrap text-small text-ink-13', locked ? 'cursor-default' : 'cursor-pointer', className)}>
      <input ref={ref} id={inputId} type="checkbox" role="switch" disabled={locked} className="peer sr-only" {...props} />
      <span
        aria-hidden
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full bg-surface-09 transition-colors duration-200',
          'after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-surface-01 after:shadow after:transition-transform after:duration-200',
          'peer-checked:bg-dacia-dark-green peer-checked:after:translate-x-5',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-dacia-dark-green peer-focus-visible:ring-offset-2'
        )}
      />
      <span className={locked ? 'text-dacia-text-secondary' : undefined}>{label}</span>
    </label>
  );
});
Switch.displayName = 'Switch';
