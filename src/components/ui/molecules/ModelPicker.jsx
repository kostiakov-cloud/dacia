import React from 'react';
import { cn } from '../utils';
import { ModelImage } from '../atoms/ModelImage';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '../atoms/SliderChevrons';
import { tr } from '../../../i18n';

const focus = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green';

/**
 * Model selector card: light panel with the car and its name.
 * Phone spacing is measured from the Figma mock (172px-wide card: arrow centre 40px from the top, car, name Heading Dacia H6 12/20 (reserve: 2 lines from 390px up, 3 lines on narrower phones, so the card never jumps), arrow, 24px bottom). Arrows: ‹ › on the sides from `md`; on phones ⌃ above and ⌄ below the card (the name may wrap there, so two lines of height are always reserved and the card never jumps).
 * Controlled — the owner changes `model` in `onPrev` / `onNext`. `dir` (1 | -1) is the last direction,
 * used by the swap animation (.model-swap in index.css).
 */
export function ModelPicker({ model, dir = 1, onPrev, onNext, label, className, ...rest }) {
  const side = cn('absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center text-dacia-text-secondary transition-opacity hover:opacity-60 md:flex', focus);
  const vertical = cn('mx-auto flex size-8 shrink-0 items-center justify-center text-dacia-text-secondary transition-opacity hover:opacity-60 md:hidden', focus);
  return (
    <div {...rest} role="group" aria-label={label} className={cn('relative flex flex-col overflow-hidden rounded-cr2 bg-dacia-light-bg px-4 pb-6 pt-6 md:px-14 md:pb-6 md:pt-8', className)}>
      {/* tablet / desktop: side arrows */}
      <button type="button" aria-label={tr('{label}: предыдущая модель', { label })} onClick={onPrev} className={cn(side, 'left-3')}>
        <ChevronLeftIcon size={24} />
      </button>
      <button type="button" aria-label={tr('{label}: следующая модель', { label })} onClick={onNext} className={cn(side, 'right-3')}>
        <ChevronRightIcon size={24} />
      </button>

      {/* phones: up arrow */}
      <button type="button" aria-label={tr('{label}: предыдущая модель', { label })} onClick={onPrev} className={vertical}>
        <ChevronUpIcon size={32} />
      </button>

      <div key={model.id} className="model-swap flex flex-1 flex-col items-center text-center max-md:mt-5" style={{ '--dir': dir }}>
        <ModelImage
          model={model}
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 260px, 45vw"
          className="aspect-[3/2] w-full max-w-[300px] object-contain"
        />
        {/* tablet / desktop: "Новый" on its own row, name = Heading Dacia H5, one line */}
        <span className="mt-2 hidden h-5 items-end font-display text-hx6 font-bold uppercase tracking-wider text-dacia-text-secondary md:flex">
          {model.isNew && tr('Новый')}
        </span>
        {/* phones: "Новый NAME" in one run, Heading Dacia H6 (12/20); room for lines is reserved so the card never jumps */}
        <span
          aria-live="polite"
          className="-mx-3 mt-3 font-display text-[clamp(10px,3.1vw,12px)] font-bold leading-5 tracking-normal text-dacia-text-secondary max-md:min-h-10 max-[389px]:min-h-[60px] md:mx-0 md:mt-0 md:text-hx5 md:leading-6 md:tracking-wider md:whitespace-nowrap"
        >
          {model.isNew && <span className="md:hidden">{tr('Новый')} </span>}
          <span className="uppercase">{model.name}</span>
        </span>
      </div>

      {/* phones: down arrow, pinned to the bottom so both cards line up whatever the name length */}
      <button type="button" aria-label={tr('{label}: следующая модель', { label })} onClick={onNext} className={cn(vertical, 'mt-4')}>
        <ChevronDownIcon size={32} />
      </button>
    </div>
  );
}
