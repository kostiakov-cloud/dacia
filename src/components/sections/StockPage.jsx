import React from 'react';
import { PageBand } from '../ui/molecules/PageBand';
import { FilterChips } from '../ui/molecules/FilterChips';
import { Select } from '../ui/molecules/Select';
import { ModelImage } from '../ui/atoms/ModelImage';
import { SiteButton } from '../ui/atoms/SiteButton';
import { models } from '../../data/models';
import { stockCars, stockCities } from '../../data/stock';
import { reveal } from '../../reveal';

const fmt = (n) => `${new Intl.NumberFormat('ru-RU').format(n).replace(/ /g, ' ')} €`;

/** /stock: city chips + model select + cards of cars in stock (placeholder data). `?model=<id>` preselects a model. */
export function StockPage() {
  const [city, setCity] = React.useState('Все');
  const [model, setModel] = React.useState(() => {
    const q = new URLSearchParams(window.location.search).get('model') || '';
    return models.some((m) => m.id === q) ? q : '';
  });
  const shown = stockCars.filter((c) => (city === 'Все' || c.city === city) && (!model || c.model === model));
  return (
    <>
      <PageBand title="Авто в наличии" subtitle="Автомобили Dacia, готовые к выдаче у наших дилеров">
        <div className="mx-auto mt-6 flex max-w-[560px] flex-col items-center gap-4 md:mt-8">
          <FilterChips label="Город" value={city} onChange={setCity} options={stockCities.map((c) => ({ value: c, label: c }))} className="justify-center" />
          <Select label="Модель" placeholder="Все модели" value={model} onChange={(e) => setModel(e.target.value)} options={models.map((m) => m.id)} optionLabels={Object.fromEntries(models.map((m) => [m.id, m.name]))} />
        </div>
      </PageBand>
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14 xl:py-16">
        <p className="sr-only" aria-live="polite">Найдено автомобилей: {shown.length}</p>
        {shown.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-root text-ink-13">По выбранным условиям автомобилей нет.</p>
            <SiteButton href="/offer-request" className="mt-6 max-md:w-full">Получить предложение</SiteButton>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {shown.map((c, i) => {
              const m = models.find((x) => x.id === c.model);
              return (
                <article key={c.id} {...reveal('up', (i % 3) * 90)} className="flex flex-col rounded-cr2 border border-alpha-d-10 bg-surface-01 p-5">
                  <ModelImage model={m} sizes="(min-width: 1280px) 340px, 45vw" className="mx-auto aspect-[2/1] w-full object-contain" />
                  <h2 className="mt-4 font-block text-hs6 text-dacia-text-secondary xl:text-h6">{m.name} {c.trim}</h2>
                  <p className="mt-1 text-small font-light text-ink-13">{c.engine} · {c.color} · {c.year}</p>
                  <p className="mt-1 text-small font-light text-ink-13">{c.city}</p>
                  <p className="mt-3 text-root text-ink-13">Цена <span className="font-medium text-dacia-text-secondary">{fmt(c.price)}</span></p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <SiteButton href={`/offer-request?model=${c.model}`} className="px-2">Запросить</SiteButton>
                    <SiteButton href="/test-drive" variant="outline" className="px-2">Тест-драйв</SiteButton>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
