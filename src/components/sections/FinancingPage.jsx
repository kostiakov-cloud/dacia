import React from 'react';
import { PartnerCard } from '../ui/molecules/PartnerCard';
import { financingIntro, financingPartners } from '../../data/financing';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

/** /financing: title band with anchor chips, then a 2-column grid of partner cards (1 column below xl). */
export function FinancingPage({ partners = financingPartners, intro = financingIntro }) {
  return (
    <>
      <section aria-labelledby="financing-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 pb-8 pt-10 text-center md:px-8 md:pb-10 md:pt-14">
          <h1 id="financing-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {intro.title}
          </h1>
          <nav aria-label={tr('Партнёры')} className="mt-4 flex flex-wrap items-center justify-center gap-2 md:mt-[21px]">
            {partners.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="inline-flex h-10 items-center rounded-cr2 border border-alpha-d-5 bg-surface-01 px-5 text-[14px] font-medium leading-6 text-dacia-text-secondary transition-colors duration-200 hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2"
              >
                {p.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-10 md:gap-6 md:px-8 md:py-16 xl:grid-cols-2 xl:gap-8 xl:py-20">
        {partners.map((p, i) => (
          <PartnerCard key={p.id} {...p} {...reveal('up', (i % 2) * 110)} />
        ))}
      </div>
    </>
  );
}
