import React from 'react';
import { Check } from 'lucide-react';
import { PageBand } from '../ui/molecules/PageBand';
import { ModelImage } from '../ui/atoms/ModelImage';
import { ModelDetails } from '../ui/molecules/ModelDetails';
import { ModelCard } from '../ui/molecules/ModelCard';
import { SiteButton } from '../ui/atoms/SiteButton';
import { models } from '../../data/models';
import { compareGroups, compareSpecs } from '../../data/compare';
import { modelHighlights, modelIntro, trimsFor } from '../../data/modelPage';
import { reveal } from '../../reveal';

/**
 * /models/:id: hero (photo + details + actions), highlights, trims table (#versions, the "Конфигуратор" target),
 * full specs and other models. Everything is data-driven by the model id.
 */
export function ModelPage({ model }) {
  const others = models.filter((m) => m.id !== model.id).slice(0, 3);
  const compareWith = models.find((m) => m.id !== model.id).id;
  const specs = compareSpecs[model.id] || {};
  return (
    <>
      <PageBand title={model.name} subtitle={modelIntro(model)}>
        <nav aria-label="Разделы модели" className="mt-5 flex flex-wrap justify-center gap-2">
          {[['versions', 'Комплектации'], ['specs', 'Характеристики'], ['others', 'Другие модели']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="inline-flex h-10 items-center rounded-cr2 border border-alpha-d-5 bg-surface-01 px-5 text-[14px] font-medium text-dacia-text-secondary transition-colors hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green">
              {label}
            </a>
          ))}
        </nav>
      </PageBand>

      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-2 xl:gap-16 xl:py-16">
        <div {...reveal('left')}>
          <ModelImage model={model} priority sizes="(min-width: 1280px) 600px, 90vw" className="mx-auto w-full max-w-[560px] object-contain xl:max-w-none" />
        </div>
        <div {...reveal('up', 120)} className="flex flex-col items-center xl:items-start">
          <ModelDetails model={model} variant="list" as="h2" />
          <div className="mt-8 grid w-full max-w-[560px] gap-3 sm:grid-cols-2">
            <SiteButton href="/test-drive" variant="solid">Тест-драйв</SiteButton>
            <SiteButton href="/offer-request" variant="outline">Получить предложение</SiteButton>
            <SiteButton href={`/compare?models=${model.id},${compareWith}`} variant="outline" className="sm:col-span-2">Сравнить с другой моделью</SiteButton>
          </div>
        </div>
      </div>

      <section aria-label="Преимущества" className="bg-surface-03">
        <ul className="mx-auto grid max-w-[1280px] gap-6 px-4 py-10 md:grid-cols-3 md:px-8 md:py-14">
          {modelHighlights.map((h, i) => (
            <li key={h.title} {...reveal('up', i * 90)} className="rounded-cr2 border border-alpha-d-5 bg-surface-01 p-6 text-center">
              <h3 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">{h.title}</h3>
              <p className="mt-2 text-small font-light text-ink-13">{h.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="versions" aria-labelledby="versions-title" className="scroll-mt-28 xl:scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16">
          <h2 id="versions-title" {...reveal()} className="mb-8 text-center font-block text-hs3 text-dacia-text-secondary xl:text-h3">Комплектации и цены</h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {trimsFor(model).map((t, i) => (
              <article key={t.id} {...reveal('up', i * 90)} className="flex flex-col rounded-cr2 border border-alpha-d-10 bg-surface-01 p-6">
                <h3 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{t.name}</h3>
                <p className="mt-1 text-small font-light text-ink-13">Цена от <span className="font-medium text-dacia-text-secondary">{t.price}</span></p>
                <ul className="mt-5 flex flex-1 flex-col gap-3">
                  {t.items.map((it) => (
                    <li key={it} className="flex gap-3 text-small font-light text-ink-13"><Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-dacia-dark-green" aria-hidden />{it}</li>
                  ))}
                </ul>
                <SiteButton href="/offer-request" variant="outline" className="mt-6">Выбрать</SiteButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" aria-labelledby="specs-title" className="scroll-mt-28 bg-surface-03 xl:scroll-mt-24">
        <div className="mx-auto max-w-[800px] px-4 py-12 md:px-8 md:py-16">
          <h2 id="specs-title" className="mb-8 text-center font-block text-hs3 text-dacia-text-secondary xl:text-h3">Характеристики</h2>
          {compareGroups.slice(1).map((g) => (
            <div key={g.id} {...reveal()} className="mb-8 last:mb-0">
              <h3 className="border-b border-alpha-d-10 pb-3 font-block text-hs6 text-dacia-text-secondary xl:text-h6">{g.title}</h3>
              <dl>
                {g.rows.map((r, i) => (
                  <div key={r.label} className={`flex justify-between gap-4 px-2 py-3 ${i % 2 === 0 ? 'bg-surface-01' : ''}`}>
                    <dt className="text-small font-light text-ink-13">{r.label}</dt>
                    <dd className="text-small font-medium text-dacia-text-secondary">{r.get(model, specs) || '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section id="others" aria-labelledby="others-title" className="scroll-mt-28 xl:scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16">
          <h2 id="others-title" className="mb-8 text-center font-block text-hs3 text-dacia-text-secondary xl:text-h3">Другие модели</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((m) => <ModelCard key={m.id} actions {...m} href={`/models/${m.id}`} configHref={`/models/${m.id}#versions`} />)}
          </div>
        </div>
      </section>
    </>
  );
}
