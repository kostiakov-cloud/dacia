import React from 'react';
import { PageBand } from '../ui/molecules/PageBand';
import { FilterChips } from '../ui/molecules/FilterChips';
import { DealerCard } from '../ui/molecules/DealerCard';
import { dealerCities, dealers } from '../../data/dealers';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

/** /dealers: city filter chips + dealer cards (2 columns from xl). */
export function DealersPage() {
  const [city, setCity] = React.useState(tr('Все'));
  const shown = dealers.filter((d) => city === tr('Все') || d.city === city);
  return (
    <>
      <PageBand title={tr('Дилеры')} subtitle={tr('Найдите ближайший автоцентр Dacia')}>
        <div className="mt-6 flex justify-center md:mt-8">
          <FilterChips label={tr('Город')} value={city} onChange={setCity} options={dealerCities.map((c) => ({ value: c, label: c }))} />
        </div>
      </PageBand>
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14 xl:py-16">
        <p className="sr-only" aria-live="polite">{tr('Найдено дилеров:')} {shown.length}</p>
        <div className="grid gap-4 md:gap-6 xl:grid-cols-2 xl:gap-8">
          {shown.map((d, i) => (
            <DealerCard key={d.id} {...d} {...reveal('up', (i % 2) * 110)} />
          ))}
        </div>
      </div>
    </>
  );
}
