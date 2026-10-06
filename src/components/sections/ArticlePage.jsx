import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { ArticleCard } from '../ui/molecules/ArticleCard';
import { VideoModal } from '../ui/molecules/VideoModal';
import { SiteButton } from '../ui/atoms/SiteButton';
import { articles } from '../../data/articles';
import { reveal } from '../../reveal';

/** /news/:slug: back link, date, title, photo (or video button), body, then two other stories. */
export function ArticlePage({ article }) {
  const [playing, setPlaying] = React.useState(false);
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <>
      <article className="mx-auto max-w-[820px] px-4 py-10 md:px-8 md:py-14">
        <a href="/news" className="inline-flex items-center gap-2 text-small font-medium text-dacia-text-secondary transition-colors hover:text-dacia-dark-green">
          <ArrowLeft size={18} strokeWidth={1.5} aria-hidden /> Все новости
        </a>
        <time className="mt-6 block text-caption font-light text-ink-13">{article.date}</time>
        <h1 className="mt-2 font-block text-hs2 text-dacia-text-secondary xl:text-h3">{article.title}</h1>

        <div {...reveal('fade')} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-cr2 bg-ink-18">
          {article.image ? <img src={article.image.src} srcSet={article.image.srcSet} sizes="820px" alt="" fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" /> : <div className="absolute inset-0 bg-gradient-to-br from-ink-14 to-ink-19" />}
          {article.videoUrl && (
            <button type="button" aria-label="Смотреть видео" onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-surface-01">
              <Play size={64} strokeWidth={1.5} className="text-surface-01 drop-shadow" aria-hidden />
            </button>
          )}
        </div>
        {article.videoUrl && <VideoModal open={playing} url={article.videoUrl} title={article.title} onClose={() => setPlaying(false)} />}

        <div className="mt-8 flex flex-col gap-5">
          {article.body.map((t) => (
            <p key={t} className="text-root font-light text-ink-13">{t}</p>
          ))}
        </div>
        <SiteButton href="/news" variant="outline" className="mt-10 max-md:w-full">Больше новостей</SiteButton>
      </article>

      <section aria-labelledby="more-news" className="border-t border-alpha-d-3 bg-surface-03">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16">
          <h2 id="more-news" className="mb-8 text-center font-block text-hs3 text-dacia-text-secondary xl:text-h3">Читайте также</h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
            {more.map((a) => <ArticleCard key={a.slug} {...a} />)}
          </div>
        </div>
      </section>
    </>
  );
}
