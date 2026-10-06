import React from 'react';
import { cn } from '../utils';
import { Avatar } from '../atoms/Avatar';
import { Stars } from '../atoms/Stars';
import { ChevronDownIcon, ChevronUpIcon } from '../atoms/SliderChevrons';

/**
 * Review card: white, 1px border. Desktop = avatar left of name + stars, text below (indented under the name);
 * phones = everything centred. The text is clamped to 5 lines; the «Развернуть» toggle appears only when the text
 * really is longer and flips to «Свернуть».
 */
export function ReviewCard({ name, rating, avatar, text, onExpandedChange, className }) {
  const [open, setOpen] = React.useState(false);
  const [clamped, setClamped] = React.useState(false);
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      if (!open) setClamped(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, text]);

  return (
    <article className={cn('flex h-full flex-col rounded-cr2 border border-alpha-d-3 bg-surface-01 p-6 md:p-8', className)}>
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-4 md:text-left">
        <Avatar src={avatar} name={name} size={48} />
        <div className="flex flex-col items-center md:items-start">
          <p className="text-root text-dacia-text-secondary">{name}</p>
          <Stars value={rating} className="mt-1" />
        </div>
      </div>

      <div className="mt-3 text-center md:mt-3 md:pl-16 md:text-left">
        <p ref={ref} className={cn('text-root font-light text-ink-13', !open && 'line-clamp-5')}>
          {text}
        </p>
        {(clamped || open) && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => {
              onExpandedChange?.(!open);
              setOpen((v) => !v);
            }}
            className="mt-3 inline-flex items-center gap-1 text-small font-medium text-dacia-text-secondary transition-colors hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
          >
            {open ? 'Свернуть' : 'Развернуть'}
            {open ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
          </button>
        )}
      </div>
    </article>
  );
}
