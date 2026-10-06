import React from 'react';
import { cn } from '../utils';
import { reveal } from '../../../reveal';

/**
 * One timeline row around the central line: round photo on the line, year on one side and the text on the other
 * (they swap on every second row). Desktop / tablet: centred layout. Phones: line on the left, everything on the right.
 */
export function TimelineItem({ year, title, text, image, flip = false }) {
  const yearEl = (
    <p className={cn('font-block text-hs5 text-dacia-text-secondary xl:text-h5', flip ? 'md:text-left' : 'md:text-right')}>{year}</p>
  );
  const body = (
    <div className={cn(flip ? 'md:text-right' : 'md:text-left')}>
      <h3 className="text-root font-medium text-dacia-text-secondary">{title}</h3>
      <p className="mt-2 text-small font-light text-ink-13">{text}</p>
    </div>
  );
  return (
    <li {...reveal('up')} className="relative grid grid-cols-[48px_1fr] gap-x-4 gap-y-2 pb-10 md:grid-cols-[1fr_96px_1fr] md:gap-x-6 md:pb-12">
      {/* photo on the line */}
      <span className="relative z-10 row-span-2 size-12 overflow-hidden rounded-full bg-surface-06 md:order-2 md:row-span-1 md:size-24">
        <img src={image.src} alt="" width={96} height={96} loading="lazy" decoding="async" className="size-full object-cover" />
      </span>
      {/* phones: year above the text; md+: year and text sit on opposite sides */}
      <div className={cn('flex items-center md:items-start', flip ? 'md:order-3 md:justify-start md:pt-8' : 'md:order-1 md:justify-end md:pt-8')}>{yearEl}</div>
      <div className={cn('col-start-2 md:col-start-auto', flip ? 'md:order-1 md:pt-7' : 'md:order-3 md:pt-7')}>{body}</div>
    </li>
  );
}
