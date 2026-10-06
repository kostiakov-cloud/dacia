import React from 'react';
import { cn } from '../utils';
import { ArrowLink } from '../atoms/ArrowLink';

/** Left 400px promo card of a mega menu: Light BG, title, action link, optional picture (`image` = { src, srcSet, className, blend }) bottom-right, cropped by the card on purpose. */
export function MegaPromo({ title, linkLabel, href, image, imageAlt = '', className }) {
  return (
    <div data-mega-item className={cn('relative min-h-[348px] w-[400px] shrink-0 self-stretch overflow-hidden rounded-cr2 bg-dacia-light-bg p-8', className)}>
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="max-w-[320px] font-block text-h4 text-dacia-text-secondary">{title}</h2>
        {linkLabel && <ArrowLink href={href}>{linkLabel}</ArrowLink>}
      </div>
      {image && (
        <img
          data-mega-image
          src={image.src}
          srcSet={image.srcSet}
          sizes="400px"
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn('pointer-events-none absolute max-w-none select-none', image.blend && 'mix-blend-multiply', image.className)}
        />
      )}
    </div>
  );
}
