import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils';
import { SiteButton } from '../atoms/SiteButton';
import { reveal } from '../../../reveal';

function Tips({ title, items }) {
  return (
    <div className="mt-5">
      <p className="text-small font-medium text-dacia-text-secondary">{title}</p>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-small font-light text-ink-13">
            <ChevronRight size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-dacia-text-secondary" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Service block of the /services page: square photo + text column (title, lead, body, tips, outline button).
 * Two equal columns from xl, `reverse` swaps the photo to the right; below xl the photo sits on top. The block is an
 * anchor target (`id`), `scroll-mt-*` keeps it clear of the fixed header.
 */
export function ServiceFeature({ id, title, lead, text, text2, tipsTitle, tips, tipsText, tipsAfter, button, image, reverse = false, className }) {
  return (
    <article id={id} className={cn('mx-auto grid max-w-[1280px] scroll-mt-28 items-center gap-6 px-4 py-8 md:px-8 xl:grid-cols-2 xl:gap-16 xl:py-10 xl:scroll-mt-24', className)}>
      <div {...reveal(reverse ? 'right' : 'left')} className={cn('relative aspect-[4/3] overflow-hidden rounded-cr2 bg-ink-18 xl:aspect-square', reverse && 'xl:order-2')}>
        {image ? (
          <img src={image.src} srcSet={image.srcSet} sizes="(min-width: 1280px) 592px, 100vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink-14 to-ink-19" />
        )}
      </div>

      <div {...reveal('up', 120)}>
        <h2 className="font-block text-hs3 text-dacia-text-secondary xl:text-h3">{title}</h2>
        <p className="mt-4 text-root text-dacia-text-secondary">{lead}</p>
        {text && <p className="mt-4 text-small font-light text-ink-13">{text}</p>}
        {text2 && <p className="mt-3 text-small font-light text-ink-13">{text2}</p>}
        {tips && <Tips title={tipsTitle} items={tips} />}
        {tipsText && (
          <div className="mt-5">
            <p className="text-small font-medium text-dacia-text-secondary">{tipsTitle}</p>
            <p className="mt-2 text-small font-light text-ink-13">{tipsText}</p>
          </div>
        )}
        {tipsAfter && (
          <div className="mt-5">
            <p className="text-small font-medium text-dacia-text-secondary">{tipsAfter.title}</p>
            <p className="mt-2 text-small font-light text-ink-13">{tipsAfter.text}</p>
          </div>
        )}
        {button && (
          <SiteButton href={button.href} variant="outline" className="mt-6 max-md:w-full">
            {button.label}
          </SiteButton>
        )}
      </div>
    </article>
  );
}
