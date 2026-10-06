import React from 'react';
import { cn } from '../utils';
import { OnDarkButton } from '../atoms/OnDarkButton';
import { tr } from '../../../i18n';

// children of the hover panel: start 20px lower and transparent, settle with a long expo-out curve
const rise =
  'translate-y-5 opacity-0 transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100';

/**
 * Service tile: square photo (gradient placeholder without `image`), title bottom-left.
 * On hover / keyboard focus (hover-capable devices) a dark glass panel shows the title, description and a
 * "Записаться на ТО" button. The whole tile stays one big link (the panel lets clicks through except the button),
 * so on touch screens a tap simply opens `href`.
 */
export function ServiceTile({ title, text, href = '#', bookingHref = '/service-booking', image, buttonLabel = tr('Записаться на ТО'), className, id: _id, ...rest }) {
  return (
    <article {...rest} className={cn('group relative isolate aspect-square overflow-hidden rounded-cr2 bg-ink-18 text-surface-01', className)}>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 22vw, 46vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-14 to-ink-19 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]" />
      )}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* default state: centred title, the whole tile is the link. On hover it lifts and fades out. */}
      <a
        href={href}
        className="absolute inset-0 flex items-end justify-center px-2 pb-8 pt-3 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-surface-01 xl:px-5"
      >
        <h3 className="whitespace-nowrap font-block text-hs6 transition-[opacity,transform] duration-[450ms] ease-out group-focus-within:-translate-y-3 group-focus-within:opacity-0 group-hover:-translate-y-3 group-hover:opacity-0 xl:text-h6">
          {title}
        </h3>
      </a>

      {/* hover / focus state (hover-capable devices only): glass panel fades + un-blurs in, then title, text and
          button rise one after another (staggered transition-delay, expo-out easing) */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 hidden flex-col items-center justify-center gap-3 p-5 text-center [@media(hover:hover)]:flex',
          'bg-black/0 opacity-0 backdrop-blur-0 transition-[background-color,opacity,backdrop-filter] duration-500 ease-out',
          'group-focus-within:bg-black/65 group-focus-within:opacity-100 group-focus-within:backdrop-blur-sm',
          'group-hover:bg-black/65 group-hover:opacity-100 group-hover:backdrop-blur-sm'
        )}
      >
        <h3 className={cn(rise, 'delay-75 text-hs6 font-block xl:text-h6')}>{title}</h3>
        <p className={cn(rise, 'delay-150 text-small font-light')}>{text}</p>
        <div className={cn(rise, 'delay-[225ms] pointer-events-auto')}>
          <OnDarkButton href={bookingHref} size="l" variant="solid" className="mt-1">
            {buttonLabel}
          </OnDarkButton>
        </div>
      </div>
    </article>
  );
}
