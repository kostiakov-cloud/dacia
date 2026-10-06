import React from 'react';
import { cn } from '../ui/utils';
import { NewsCard } from '../ui/molecules/NewsCard';
import { SiteButton } from '../ui/atoms/SiteButton';
import { news as newsData, newsMoreCta } from '../../data/news';
import { reveal } from '../../reveal';

/**
 * "Последние новости": continues the light band of the reviews. Desktop = 2-column zig-zag grid of 280px rows
 * (see data/news.js `layout`); tablet = 2 vertical cards; phones = 1 card. The CTA is full-width on phones only.
 */
export function NewsSection({ items = newsData, cta = newsMoreCta, className }) {
  return (
    <section aria-labelledby="news-title" className={cn('bg-surface-03', className)}>
      <div className="mx-auto max-w-[1280px] px-4 pb-12 pt-4 md:px-8 md:pb-16 md:pt-8 xl:pb-24">
        <header {...reveal()} className="mb-8 text-center md:mb-12">
          <h2 id="news-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            Последние новости
          </h2>
          <p className="mt-2 text-small text-ink-13 md:text-root">Будьте в курсе главных событий Dacia</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:gap-8">
          {items.map((n, i) => (
            <NewsCard key={n.id} {...n} {...reveal('up', (i % 2) * 110)} />
          ))}
        </div>

        <div {...reveal()} className="mt-8 flex justify-center md:mt-12">
          <SiteButton href={cta.href} variant="solid" size="l" className="max-md:w-full">
            {cta.label}
          </SiteButton>
        </div>
      </div>
    </section>
  );
}
