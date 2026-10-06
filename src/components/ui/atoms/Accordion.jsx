import React from 'react';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { cn } from '../utils';

/**
 * One accordion row: question button (+ / - circle on the right) and an answer that expands smoothly (CSS grid-rows
 * 0fr -> 1fr, no height measuring). Uncontrolled by default (`defaultOpen`), or controlled via `open` / `onToggle`.
 * Accessible: <button aria-expanded aria-controls>, the answer is a labelled region and hidden from AT while closed.
 */
export function AccordionItem({ question, children, defaultOpen = false, open: openProp, onToggle, className }) {
  const [inner, setInner] = React.useState(defaultOpen);
  const open = openProp ?? inner;
  const uid = React.useId();
  const toggle = () => {
    if (openProp === undefined) setInner(!open);
    onToggle?.(!open);
  };
  const Icon = open ? CircleMinus : CirclePlus;
  return (
    <div className={cn('border-b border-alpha-d-5', className)}>
      <h3>
        <button
          type="button"
          id={`${uid}-q`}
          aria-expanded={open}
          aria-controls={`${uid}-a`}
          onClick={toggle}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-root text-dacia-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2"
        >
          <span className="transition-colors duration-200 group-hover:text-dacia-dark-green">{question}</span>
          <Icon size={24} strokeWidth={1.5} className="shrink-0 transition-colors duration-200 group-hover:text-dacia-dark-green" aria-hidden />
        </button>
      </h3>
      <div
        id={`${uid}-a`}
        role="region"
        aria-labelledby={`${uid}-q`}
        hidden={false}
        inert={!open || undefined}
        className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-small font-light text-ink-13">{children}</div>
        </div>
      </div>
    </div>
  );
}
