import React from 'react';
import { cn } from '../utils';
import { reveal } from '../../../reveal';

/** Brand-value block: photo (3:2) + title, lead, text. Two equal columns from xl, `reverse` puts the photo on the right. */
export function AboutFeature({ id, title, lead, text, image, reverse = false, className }) {
  return (
    <article id={id} className={cn('mx-auto grid max-w-[1280px] scroll-mt-28 items-center gap-6 px-4 py-6 md:px-8 xl:grid-cols-2 xl:gap-16 xl:py-6 xl:scroll-mt-24', className)}>
      <div {...reveal(reverse ? 'right' : 'left')} className={cn('relative aspect-[3/2] overflow-hidden rounded-cr2 bg-ink-18', reverse && 'xl:order-2')}>
        <img src={image.src} alt="" width={592} height={394} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
      </div>
      <div {...reveal('up', 120)} className="xl:px-4">
        <h2 className="font-block text-hs3 text-dacia-text-secondary xl:text-h3">{title}</h2>
        <p className="mt-4 text-root text-dacia-text-secondary">{lead}</p>
        <p className="mt-4 text-small font-light text-ink-13">{text}</p>
      </div>
    </article>
  );
}
