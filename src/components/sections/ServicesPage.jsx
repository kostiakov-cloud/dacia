import React from 'react';
import { ServiceFeature } from '../ui/molecules/ServiceFeature';
import { serviceSections, servicesIntro } from '../../data/services-page';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

/**
 * /services: light header band (title + anchor chips that scroll to each block) and the four service blocks, the
 * photo alternating left / right. Anchors: /services#oil | #tires | #ac | #brakes.
 */
export function ServicesPage({ sections = serviceSections, intro = servicesIntro }) {
  return (
    <>
      <section aria-labelledby="services-page-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 pb-8 pt-10 text-center md:px-8 md:pb-10 md:pt-14">
          <h1 id="services-page-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {intro.title}
          </h1>
          <nav aria-label={tr('Разделы')} className="mt-4 flex flex-wrap items-center justify-center gap-2 md:mt-[21px]">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex h-10 items-center rounded-cr2 border border-alpha-d-5 bg-surface-01 px-5 text-[14px] font-medium leading-6 text-dacia-text-secondary transition-colors duration-200 hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="pb-8 pt-6 md:pb-12 md:pt-10 xl:pb-20">
        {sections.map((s, i) => (
          <ServiceFeature key={s.id} {...s} reverse={i % 2 === 1} />
        ))}
      </div>
    </>
  );
}
