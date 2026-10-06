import React from 'react';
import { cn } from '../utils';
import { OnDarkButton } from '../atoms/OnDarkButton';

/** Static class map so Tailwind sees every `order-*` (used for the mobile single-column order). */
const mobileOrder = { 1: 'order-1', 2: 'order-2', 3: 'order-3', 4: 'order-4' };

/**
 * Promo tile: photo background (gradient placeholder without `image`), centred Heading H3 (Dacia Block, 32/40; Heading Small H3 24/32 on mobile) / Root text / L button on top.
 * Always square. The photo slightly zooms on hover.
 */
export function PromoTile({ title, text, cta, image, imageClass, imageAlt = '', order, className, id: _id, mobileOrder: _mo, ...rest }) {
  return (
    <article
      {...rest}
      className={cn(
        'group relative isolate aspect-square overflow-hidden rounded-cr2 bg-ink-18 text-surface-01 md:order-none',
        order && mobileOrder[order],
        className
      )}
    >
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1280px) 592px, (min-width: 768px) 46vw, 100vw"
          alt={imageAlt}
          width={592}
          height={592}
          loading="lazy"
          decoding="async"
          className={cn('absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]', imageClass)}
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-15 to-ink-19 transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
      )}
      {/* darkening under the text */}
      <div className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="flex flex-col items-center gap-2 px-6 pt-6 text-center md:gap-3 md:pt-10 xl:pt-14">
        <h3 className="font-block text-hs3 xl:text-h3">{title}</h3>
        <p className="max-w-[360px] text-small md:text-root">{text}</p>
        {cta && (
          <OnDarkButton variant="solid" size="l" href={cta.href} className="mt-3 md:mt-4">
            {cta.label}
          </OnDarkButton>
        )}
      </div>
    </article>
  );
}
