import React from 'react';
import { cn } from '../utils';
import { ModelImage } from '../atoms/ModelImage';
import { SiteButton } from '../atoms/SiteButton';
import { DropdownButton } from './DropdownButton';
import { offerLabels } from '../../../data/offers';
import { reveal } from '../../../reveal';

/**
 * One offer row: car photo + text block (title, orange "special price" plate, description, "Идеально для", 3 actions).
 * Two equal columns from xl, rows alternate (`reverse` = photo on the right); below xl the photo is on top.
 */
export function OfferRow({ id, model, title, price, text, idealFor, priceFiles, reverse = false, tinted = false, className }) {
  return (
    <article id={id} className={cn('scroll-mt-28 xl:scroll-mt-24', tinted && 'bg-surface-03', className)}>
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-2 xl:gap-16 xl:py-16">
        <ModelImage
          id={model}
          alt={title}
          sizes="(min-width: 1280px) 560px, (min-width: 768px) 640px, 90vw"
          className={cn('mx-auto w-full max-w-[560px] object-contain', reverse && 'xl:order-2')}
          {...reveal(reverse ? 'right' : 'left')}
        />
        <div {...reveal('up', 120)} className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-hx3 font-bold tracking-wider text-dacia-text-secondary md:text-hx2">{title}</h2>
            <span className="inline-flex items-center gap-1.5 rounded-cr2 bg-dacia-orange px-3 py-1.5 text-[12px] font-medium leading-4 text-surface-01">
              {offerLabels.special}
              <span className="text-[16px] font-bold leading-5">{price}</span>
            </span>
          </div>
          <p className="mt-5 text-small font-light text-ink-13">{text}</p>
          <p className="mt-5 text-small font-medium text-dacia-text-secondary">{offerLabels.idealFor}</p>
          <p className="mt-1 text-small font-light text-ink-13">{idealFor}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:flex xl:flex-row xl:flex-wrap">
            <DropdownButton label={offerLabels.priceList} items={priceFiles} className="xl:w-auto" />
            <SiteButton href={`/stock?model=${model}`} variant="outline" className="px-3 md:px-5">
              {offerLabels.stock}
            </SiteButton>
            <SiteButton href={`/offer-request?model=${id}`} variant="solid" className="col-span-2 px-5 md:col-span-1">
              {offerLabels.get}
            </SiteButton>
          </div>
        </div>
      </div>
    </article>
  );
}
