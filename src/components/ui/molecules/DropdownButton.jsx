import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';

/**
 * Outline button that opens a small menu of links ("Прайс-лист ⌄"). Disclosure pattern: button aria-expanded, menu is a
 * list of links; closes on Esc, outside click, or when a link is chosen. `items` = [{ label, href }].
 */
export function DropdownButton({ label, items = [], className, menuClassName }) {
  const [open, setOpen] = React.useState(false);
  const root = React.useRef(null);
  const uid = React.useId();

  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !root.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn('relative', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${uid}-menu`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-12 w-full items-center xl:w-auto justify-center gap-2 whitespace-nowrap rounded-cr2 border border-dacia-dark-green bg-transparent px-3 md:px-6 text-[16px] font-medium leading-6 text-dacia-dark-green transition-colors duration-200 hover:bg-dacia-dark-green hover:text-surface-01 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2"
      >
        {label}
        <ChevronDown size={18} strokeWidth={1.5} className={cn('transition-transform duration-200', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <ul id={`${uid}-menu`} className={cn('absolute left-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-cr2 border border-alpha-d-10 bg-surface-01 py-1 shadow-lg', menuClassName)}>
          {items.map((it) => (
            <li key={it.label}>
              <a href={it.href} onClick={() => setOpen(false)} className="block whitespace-nowrap px-4 py-2.5 text-small text-dacia-text-secondary transition-colors hover:bg-surface-04 hover:text-dacia-dark-green focus:outline-none focus-visible:bg-surface-04">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
