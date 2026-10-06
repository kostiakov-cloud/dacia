import React from 'react';
import { CirclePlus } from 'lucide-react';
import { cn } from '../utils';
import { reveal } from '../../../reveal';

/** Vertical news card for the /news list: photo (gradient placeholder without one), date, title, excerpt, "Читать больше". */
export function ArticleCard({ slug, date, title, excerpt, image, className, videoUrl: _v, ...rest }) {
  return (
    <article {...rest} className={cn('group relative flex flex-col overflow-hidden rounded-cr2 border border-alpha-d-10 bg-surface-01', className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-18">
        {image ? (
          <img src={image.src} srcSet={image.srcSet} sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink-14 to-ink-19" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time className="text-caption font-light text-ink-13">{date}</time>
        <h2 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">{title}</h2>
        <p className="line-clamp-3 text-small font-light text-ink-13">{excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-small font-medium text-dacia-text-secondary transition-colors group-hover:text-dacia-dark-green">
          Читать больше <CirclePlus size={20} strokeWidth={1.5} aria-hidden />
        </span>
      </div>
      <a href={`/news/${slug}`} className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dacia-dark-green">
        <span className="sr-only">{title}</span>
      </a>
    </article>
  );
}
