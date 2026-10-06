import React from 'react';
import { cn } from '../ui/utils';
import { ServiceTile } from '../ui/molecules/ServiceTile';
import { SiteButton } from '../ui/atoms/SiteButton';
import { services as servicesData, servicesCta, servicesButtonLabel } from '../../data/services';

/**
 * "Сервис и обслуживание": light full-width band, centred heading, 4 service tiles (2×2 on phones, 4 across
 * from md) and the "Запись на техобслуживание" button (full width on phones only).
 */
export function ServiceTiles({ items = servicesData, cta = servicesCta, className }) {
  return (
    <section aria-labelledby="services-title" className={cn('bg-surface-03', className)}>
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16 xl:py-24">
        <header className="mb-8 text-center md:mb-12">
          <h2 id="services-title" className="font-block text-hs2 text-dacia-text-secondary md:text-h2">
            Сервис и обслуживание
          </h2>
          <p className="mt-2 text-small text-dacia-text-tertiary md:text-root">Техническое обслуживание и ремонт</p>
        </header>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 xl:gap-8">
          {items.map((s) => (
            <ServiceTile key={s.id} buttonLabel={servicesButtonLabel} {...s} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-12">
          <SiteButton href={cta.href} variant="solid" size="l" className="max-md:w-full">
            {cta.label}
          </SiteButton>
        </div>
      </div>
    </section>
  );
}
