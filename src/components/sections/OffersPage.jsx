import React from 'react';
import { OfferRow } from '../ui/molecules/OfferRow';
import { offerTabs, offers, offersIntro } from '../../data/offers';
import { reveal } from '../../reveal';

/** /offers: title band with the campaign tab, then the offer rows (photo alternates, every second row on a light band). */
export function OffersPage({ items = offers, tabs = offerTabs, intro = offersIntro }) {
  return (
    <>
      <section aria-labelledby="offers-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 pb-8 pt-10 text-center md:px-8 md:pb-10 md:pt-14">
          <h1 id="offers-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {intro.title}
          </h1>
          <div role="tablist" aria-label="Акции" className="mt-4 flex justify-center gap-2 md:mt-[21px]">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected="true"
                className="inline-flex h-10 items-center rounded-cr2 border border-alpha-d-5 bg-surface-01 px-5 text-[14px] font-medium leading-6 text-dacia-text-secondary"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div role="tabpanel">
        {items.map((o, i) => (
          <OfferRow key={o.id} {...o} reverse={i % 2 === 1} tinted={i % 2 === 1} />
        ))}
      </div>
    </>
  );
}
