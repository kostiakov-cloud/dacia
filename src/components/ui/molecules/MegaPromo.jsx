import React from 'react';
import { cn } from '../utils';
import { ArrowLink } from '../atoms/ArrowLink';

/** Left 400px promo card of a mega menu: Light BG, title, action link, optional image bottom-right. */
export function MegaPromo({ title, linkLabel, href, image, imageAlt = '', className }) {
  return (
    <div data-mega-item className={cn('relative min-h-[348px] w-[400px] shrink-0 self-stretch overflow-hidden rounded-cr2 bg-dacia-light-bg p-8', className)}>
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="max-w-[320px] font-display text-[28px] font-bold leading-9 text-dacia-text-secondary">{title}</h2>
        {linkLabel && <ArrowLink href={href}>{linkLabel}</ArrowLink>}
      </div>
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="pointer-events-none absolute bottom-0 right-0 max-h-[75%] max-w-full object-contain object-right-bottom"
        />
      )}
    </div>
  );
}
