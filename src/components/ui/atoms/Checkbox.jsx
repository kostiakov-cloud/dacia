import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../utils';

/**
 * Checkbox with a 20px square box (2px corners, dark-green fill when checked). The native input stays in the page
 * (visually hidden) so keyboard, labels and form validation work. `error` = red frame.
 */
export const Checkbox = React.forwardRef(({ label, error = false, className, id, ...props }, ref) => {
  const autoId = React.useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex cursor-pointer items-center gap-3 text-root font-light text-ink-13', className)}>
      <input ref={ref} id={inputId} type="checkbox" aria-invalid={error || undefined} className="peer sr-only" {...props} />
      <span
        aria-hidden
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-cr2 border bg-surface-02 text-transparent transition-colors duration-200',
          'peer-checked:border-dacia-dark-green peer-checked:bg-dacia-dark-green peer-checked:text-surface-01',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-dacia-dark-green peer-focus-visible:ring-offset-2',
          error ? 'border-[#c10a26]' : 'border-alpha-d-10'
        )}
      >
        <Check size={16} strokeWidth={2.5} />
      </span>
      <span className="min-w-0">{label}</span>
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
