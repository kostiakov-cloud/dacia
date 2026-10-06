import React from 'react';
import { Download } from 'lucide-react';
import { PageBand } from '../ui/molecules/PageBand';
import { SiteButton } from '../ui/atoms/SiteButton';
import { models } from '../../data/models';
import { trimsFor } from '../../data/modelPage';
import { priceListFile } from '../../data/priceList';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

/** /price-list: download button + prices by model and trim (#trims). */
export function PriceListPage() {
  return (
    <>
      <PageBand title={tr('Скачать цены')} subtitle={tr('Актуальные цены на автомобили Dacia по комплектациям')}>
        <div className="mt-6 flex flex-col items-center gap-2">
          <SiteButton href={priceListFile.href} className="gap-2 max-md:w-full"><Download size={20} strokeWidth={1.5} aria-hidden />{priceListFile.label}</SiteButton>
          <p className="text-caption font-light text-ink-13">{priceListFile.note}</p>
        </div>
      </PageBand>
      <section id="trims" className="mx-auto max-w-[1000px] scroll-mt-28 px-4 py-10 md:px-8 md:py-14 xl:py-16">
        <div className="flex flex-col gap-4">
          {models.map((m, i) => (
            <article key={m.id} {...reveal('up', (i % 2) * 80)} className="rounded-cr2 border border-alpha-d-10 bg-surface-01 p-5 md:p-6">
              <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5"><a href={`/models/${m.id}`} className="hover:underline">{m.name}</a></h2>
              <dl className="mt-3 grid gap-x-8 sm:grid-cols-3">
                {trimsFor(m).map((t) => (
                  <div key={t.id} className="flex justify-between gap-4 border-b border-alpha-d-5 py-2 text-small sm:flex-col sm:border-b-0">
                    <dt className="font-light text-ink-13">{t.name}</dt>
                    <dd className="font-medium text-dacia-text-secondary">{t.price}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
