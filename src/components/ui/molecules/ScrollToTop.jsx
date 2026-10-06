import React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../utils';
import { useScrolled } from '../../../hooks/useScrolled';
import { tr } from '../../../i18n';

/** Square "up" button, bottom-right; fades in after 600px of scroll. */
export function ScrollToTop({ className }) {
  const visible = useScrolled(600);
  return (
    <button
      type="button"
      aria-label={tr('Наверх')}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      className={cn(
        'fixed bottom-4 right-4 z-30 flex size-12 items-center justify-center rounded-[2px] border border-alpha-d-5 bg-surface-02 text-dacia-text-secondary',
        'transition-all duration-200 hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        className
      )}
    >
      <ArrowUp size={20} strokeWidth={1.5} />
    </button>
  );
}
