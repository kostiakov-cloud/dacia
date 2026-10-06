import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';

/**
 * Mobile bottom sheet: blurred 30% black backdrop (same as the mega menu) + panel sliding up.
 * CSS transitions only (no JS animation lib). Esc / backdrop / X close it; body scroll is locked.
 */
export function BottomSheet({ open, onClose, title, className, children }) {
  const [rendered, setRendered] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  if (open && !rendered) setRendered(true);

  React.useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = setTimeout(() => setRendered(false), 260);
    return () => clearTimeout(t);
  }, [open]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!rendered) return null;
  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <div
        aria-hidden
        onClick={onClose}
        className={cn('absolute inset-0 bg-alpha-d-30 backdrop-blur-[20px] transition-opacity duration-200', shown ? 'opacity-100' : 'opacity-0')}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto bg-surface-02 p-6 pb-8 transition-transform duration-[260ms] ease-out',
          shown ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-[18px] font-bold leading-8 text-dacia-text-secondary">{title}</h2>
          <button type="button" aria-label="Закрыть" onClick={onClose} className="flex size-6 shrink-0 items-center justify-center text-dacia-text-secondary">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
