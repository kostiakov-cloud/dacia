import React from 'react';
import { CirclePlus, Play } from 'lucide-react';
import { cn } from '../utils';
import { VideoModal } from './VideoModal';

// `max-*` variants only hide; they never override the card's own `display: flex`
const showClass = { all: '', md: 'max-md:hidden', xl: 'max-xl:hidden' };

function Media({ image, imageClass, video, className }) {
  return (
    <div className={cn('relative shrink-0 overflow-hidden bg-ink-18', className)}>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className={cn('absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]', imageClass)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-14 to-ink-19" />
      )}
      {video && (
        <span aria-hidden className="absolute inset-0 flex items-center justify-center">
          <Play size={56} strokeWidth={1.5} className="text-surface-01 drop-shadow" />
        </span>
      )}
    </div>
  );
}

/**
 * News card. Below xl: vertical (photo on top, 361:260). From xl it follows `layout`:
 * 'text-image' | 'text' | 'image' | 'wide' (full-width row, media left) - see data/news.js.
 * The whole card is one link ("Читать больше ⊕" is its visible affordance); with `videoUrl` it is a button that opens a
 * YouTube lightbox instead. Radius 2px, 1px border.
 */
export function NewsCard({ layout = 'text-image', show = 'all', phone = false, video = false, videoUrl, title, text, href = '#', image, imageClass, className, id: _id, ...rest }) {
  const [playing, setPlaying] = React.useState(false);
  const isVideo = Boolean(videoUrl);
  const hasText = layout !== 'image';
  const hasMedia = layout !== 'text';
  return (
    <article
      {...rest}
      className={cn(
        'group relative overflow-hidden rounded-cr2 bg-surface-01',
        hasText && 'border border-alpha-d-3',
        'flex flex-col xl:h-[280px]',
        layout === 'wide' ? 'xl:col-span-2 xl:flex-row' : 'xl:flex-row',
        phone ? (show === 'xl' ? 'md:max-xl:hidden' : '') : showClass[show],
        className
      )}
    >
      {hasMedia && (
        <Media
          image={image}
          imageClass={imageClass}
          video={video || isVideo}
          className={cn(
            'aspect-[361/260] w-full xl:aspect-auto xl:h-full',
            layout === 'wide' ? 'xl:w-[592px]' : layout === 'image' ? 'xl:w-full' : 'xl:order-2 xl:w-[280px]'
          )}
        />
      )}

      {hasText && (
        <div className={cn('flex min-w-0 flex-1 flex-col justify-between gap-4 p-6', layout === 'text-image' ? 'xl:p-6' : 'xl:p-8')}>
          <div>
            <h3 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">{title}</h3>
            {text && (
              <p className={cn('mt-3 text-root font-light text-ink-13', layout === 'text-image' ? 'line-clamp-3 xl:line-clamp-2' : 'line-clamp-3')}>{text}</p>
            )}
          </div>
          <span className="inline-flex items-center gap-2 text-small font-medium text-dacia-text-secondary transition-colors group-hover:text-dacia-dark-green">
            Читать больше
            <CirclePlus size={20} strokeWidth={1.5} aria-hidden />
          </span>
        </div>
      )}

      {/* the whole card is one control: a link, or - for video cards - a button that opens the player */}
      {isVideo ? (
        <>
          <button
            type="button"
            aria-label={`Смотреть видео: ${title}`}
            onClick={() => setPlaying(true)}
            className="absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dacia-dark-green"
          />
          <VideoModal open={playing} url={videoUrl} title={title} onClose={() => setPlaying(false)} />
        </>
      ) : (
        <a
          href={href}
          aria-label={hasText ? undefined : title}
          className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dacia-dark-green"
        >
          <span className="sr-only">{hasText ? title : ''}</span>
        </a>
      )}
    </article>
  );
}
