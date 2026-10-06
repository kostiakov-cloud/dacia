import React from 'react';
import { cn } from '../ui/utils';
import { ModelCard } from '../ui/molecules/ModelCard';
import { ModelFeatureRow } from '../ui/molecules/ModelFeatureRow';
import { FilterChips } from '../ui/molecules/FilterChips';
import { ViewToggle } from '../ui/molecules/ViewToggle';
import { RangeSlider } from '../ui/molecules/RangeSlider';
import { models as modelsData } from '../../data/models';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

// order of the catalogue in the design (the home page keeps the order of data/models.js)
const catalogOrder = ['sandero-stepway-new', 'sandero-stepway', 'logan-new', 'logan', 'bigster', 'duster', 'jogger', 'sandero'];
const byCatalogOrder = (a, b) => {
  const i = catalogOrder.indexOf(a.id);
  const j = catalogOrder.indexOf(b.id);
  return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
};

const filters = [
  { value: 'all', label: tr('Все'), test: () => true },
  { value: 'hybrid', label: 'Hybrid', test: (m) => Boolean(m.hybrid) },
  { value: 'stepway', label: 'Stepway', test: (m) => /stepway/i.test(m.name) },
];

/**
 * Model catalogue: light header band (title, filter chips, grid/list switch, price range) and the model grid.
 * Filters work together: chip + price range. Grid = 3 columns on desktop, 2 on tablet, 1 on phones; the cards
 * show «Подробнее» / «Конфигуратор» on hover (hover devices only).
 */
export function ModelsCatalog({ models: modelsProp = modelsData, className }) {
  const models = React.useMemo(() => [...modelsProp].sort(byCatalogOrder), [modelsProp]);
  const prices = models.map((m) => m.priceValue);
  const min = Math.floor(Math.min(...prices) / 500) * 500; // round the bounds to 500 EUR: 10 500 ... 20 500
  const max = Math.ceil(Math.max(...prices) / 500) * 500;
  const [filter, setFilter] = React.useState('all');
  const [view, setView] = React.useState('grid');
  const [range, setRange] = React.useState([min, max]);

  const test = filters.find((f) => f.value === filter).test;
  const shown = models.filter((m) => test(m) && m.priceValue >= range[0] && m.priceValue <= range[1]);

  return (
    <div className={className}>
      <section aria-labelledby="catalog-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 pb-10 pt-10 text-center md:px-8 md:pb-12 md:pt-14">
          <h1 id="catalog-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {tr('Модельный ряд Dacia')}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-8">
            <FilterChips options={filters} value={filter} onChange={setFilter} label={tr('Тип модели')} />
            <ViewToggle value={view} onChange={setView} className="max-sm:hidden" />
          </div>
          <div className="mt-8 md:mt-10">
            <RangeSlider min={min} max={max} value={range} onChange={setRange} />
          </div>
        </div>
      </section>

      <section aria-label={tr('Список моделей')} className="mx-auto max-w-[1280px] px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10 xl:pb-24 xl:pt-12">
        <p className="sr-only" aria-live="polite">
          {tr('Найдено моделей:')} {shown.length}
        </p>
        {shown.length === 0 ? (
          <p className="py-16 text-center text-root text-ink-13">{tr('По выбранным условиям моделей нет. Измените фильтр или диапазон цен.')}</p>
        ) : view === 'list' ? (
          <div className="-mx-4 md:-mx-8">
            {shown.map((m, i) => (
              <ModelFeatureRow key={m.id} model={m} reverse={i % 2 === 1} />
            ))}
          </div>
        ) : (
          <div className="-mx-4 grid grid-cols-1 gap-y-0 sm:mx-0 sm:grid-cols-2 sm:gap-y-6 xl:grid-cols-3 xl:gap-y-10">
            {shown.map((m, i) => (
              <ModelCard
                key={m.id}
                actions
                {...m}
                {...reveal('up', (i % 3) * 90)}
                mediaClassName="aspect-[16/9] sm:aspect-[2/1]"
                imageClassName="max-h-[90%] max-w-[90%] sm:max-h-full sm:max-w-[64%]"
                sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                className={cn('xl:px-8 xl:py-8')}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
