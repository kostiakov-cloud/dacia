import React from 'react';
import { PageBand } from '../ui/molecules/PageBand';
import { ArticleCard } from '../ui/molecules/ArticleCard';
import { articles } from '../../data/articles';
import { reveal } from '../../reveal';

/** /news: all stories as a card grid (1 / 2 / 3 columns). */
export function NewsPage() {
  return (
    <>
      <PageBand title="Новости" subtitle="Будьте в курсе главных событий Dacia" />
      <div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-10 md:grid-cols-2 md:gap-6 md:px-8 md:py-14 xl:grid-cols-3 xl:gap-8 xl:py-16">
        {articles.map((a, i) => (
          <ArticleCard key={a.slug} {...a} {...reveal('up', (i % 3) * 90)} />
        ))}
      </div>
    </>
  );
}
