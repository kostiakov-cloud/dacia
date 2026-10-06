import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils';
import { ChevronDownIcon } from '../atoms/SliderChevrons';

/**
 * Multi-choice dropdown with removable chips (like the design: «Полное ТО ×» + chevron). Controlled: `value` = string[].
 * Keyboard (on the chevron button): ↓ / ↑ open and move, Enter / Space toggle the highlighted option, Esc closes.
 * Pointer: click the field to open, click outside to close; each chip has its own remove button.
 */
export function MultiSelect({ label, options = [], value = [], onChange, placeholder = 'Выберите', error = false, errorMessage, className }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const root = React.useRef(null);
  const uid = React.useId();
  const toggle = (o) => onChange?.(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !root.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const onKey = (e) => {
    if (e.key === 'Escape') return setOpen(false);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return setOpen(true);
      setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      toggle(options[active]);
    }
  };

  return (
    <div ref={root} className={cn('relative flex w-full flex-col gap-1', className)}>
      {label && (
        <span id={`${uid}-label`} className="text-[14px] font-normal leading-[24px] text-[#232d3b]">
          {label}
        </span>
      )}
      <div
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex min-h-12 w-full cursor-pointer items-center gap-2 rounded-[2px] border bg-[#fcfcfd] py-2 pl-3 pr-1 transition-colors duration-200',
          open ? 'border-[#232d3b]' : error ? 'border-[#c10a26]' : 'border-black/5'
        )}
      >
        <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {value.length === 0 && <li className="px-2 text-[16px] font-light text-ink-13">{placeholder}</li>}
          {value.map((v) => (
            <li key={v} className="flex items-center gap-1 rounded-cr2 border border-alpha-d-5 bg-surface-01 py-1 pl-2.5 pr-1 text-[12px] font-medium leading-4 text-dacia-text-secondary">
              {v}
              <button
                type="button"
                aria-label={`Убрать: ${v}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
                className="flex size-5 items-center justify-center rounded-cr2 hover:bg-surface-06 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
              >
                <X size={12} strokeWidth={2} />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${uid}-list`}
          aria-labelledby={`${uid}-label`}
          aria-invalid={error || undefined}
          aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
          onKeyDown={onKey}
          className="flex size-10 shrink-0 items-center justify-center text-[#333] focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
        >
          <ChevronDownIcon size={24} className={cn('transition-transform duration-200', open && 'rotate-180')} />
        </button>
      </div>

      {open && (
        <ul id={`${uid}-list`} role="listbox" aria-multiselectable="true" aria-labelledby={`${uid}-label`} className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-[2px] border border-alpha-d-10 bg-surface-01 py-1 shadow-lg">
          {options.map((o, i) => {
            const on = value.includes(o);
            return (
              <li
                key={o}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={on}
                onClick={() => toggle(o)}
                onMouseEnter={() => setActive(i)}
                className={cn('flex cursor-pointer items-center gap-3 px-4 py-2.5 text-[16px] font-light text-dacia-text-secondary', i === active && 'bg-surface-04')}
              >
                <span aria-hidden className={cn('flex size-5 shrink-0 items-center justify-center rounded-cr2 border text-[12px] leading-none', on ? 'border-dacia-dark-green bg-dacia-dark-green text-surface-01' : 'border-alpha-d-10')}>
                  {on ? '✓' : ''}
                </span>
                {o}
              </li>
            );
          })}
        </ul>
      )}
      {error && errorMessage && <p className="text-[12px] font-light leading-[20px] text-[#c10a26]">{errorMessage}</p>}
    </div>
  );
}
