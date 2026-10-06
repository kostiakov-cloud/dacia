import React from 'react';
import { cn } from '../ui/utils';
import { ModelCard } from '../ui/molecules/ModelCard';
import { SiteButton } from '../ui/atoms/SiteButton';
import { models as modelsData } from '../../data/models';
import { modelsHref } from '../../data/navigation';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

/**
 * "Модельный ряд DACIA": centred heading + all models in a grid (4 cols desktop, 2 tablet, 1 mobile)
 * and the "view all" button. Heading: Heading H2 (Dacia Block, 40/48; Heading Small H2 26/36 on small screens).
 */
export function ModelGrid({ models = modelsData, className }) {
  return (
    <section aria-labelledby="models-title" className={cn('mx-auto max-w-[1280px] px-4 pb-12 pt-5 md:px-8 md:pb-16 md:pt-0 xl:pb-24', className)}>
      <header {...reveal()} className="mb-8 text-center md:mb-12">
        <h2 id="models-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
          {tr('Модельный ряд DACIA')}
        </h2>
        <p className="mt-2 text-small text-ink-13 md:text-root">{tr('Доступные модели')}</p>
      </header>

      {/* -mx-4 cancels the card padding, so the photos line up with the container edges */}
      <div className="-mx-4 grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-y-4 xl:grid-cols-4">
        {models.map((m, i) => (
          <ModelCard key={m.id} actions {...m} {...reveal('up', (i % 4) * 90)} />
        ))}
      </div>

      <div {...reveal()} className="mt-10 flex justify-center md:mt-14">
        <SiteButton href={modelsHref} variant="solid" size="l" className="max-md:w-full">
          {tr('Смотреть все модели')}
        </SiteButton>
      </div>
    </section>
  );
}
