import React from 'react';
import { cn } from '../utils';
import { SiteButton } from '../atoms/SiteButton';
import { ModelImage } from '../atoms/ModelImage';

/**
 * Car card: image, "Новый" label, name, price, version, optional hybrid tag.
 * `actions` (the home grid) adds padding, a grey hover state and the «Подробнее» / «Конфигуратор» buttons that
 * appear on hover / keyboard focus (hover-capable devices only; touch layouts show the plain card).
 * Without `actions` it is the compact card of the mega-menu carousel.
 */
export function ModelCard({ id, name, isNew, image, price, version, hybrid, href = '#', configHref = '#', actions = false, sizes, className }) {
  return (
    <article
      className={cn(
        'group flex w-full flex-col items-center text-center',
        actions && 'rounded-cr2 px-4 py-3 transition-colors sm:p-4 duration-200 focus-within:bg-surface-03 hover:bg-surface-03',
        className
      )}
    >
      <a
        href={href}
        className="flex w-full flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
      >
        <div className={cn('flex aspect-[16/9] w-full items-end justify-center', actions && !image && 'rounded-cr2 bg-surface-04')}>
          <ModelImage
            model={{ id, name, image }}
            sizes={sizes}
            className={cn('object-contain transition-transform duration-300 group-hover:scale-[1.03]', actions ? 'max-h-[90%] max-w-[90%]' : 'max-h-full max-w-full')}
          />
        </div>
        <div className="mt-3 flex h-5 items-end font-display text-hx6 font-bold uppercase tracking-wider text-dacia-text-secondary">
          {isNew && 'Новый'}
        </div>
        <h3 className="font-display text-hx5 font-bold uppercase tracking-wider text-dacia-text-secondary">{name}</h3>
        <p className="mt-2 text-small font-light text-dacia-text-tertiary">
          Цена от <span className="font-medium text-dacia-text-secondary">{price}</span>
        </p>
        <p className="text-caption font-light text-dacia-text-secondary">{version}</p>
        <div className="mt-2 flex h-5 items-center gap-2 text-tiny">
          {hybrid && (
            <>
              <span className="font-light text-dacia-text-tertiary">Доступен:</span>
              <span className="rounded-cr2 border border-dacia-orange px-1.5 font-medium text-dacia-orange">Полный гибрид</span>
            </>
          )}
        </div>
      </a>

      {actions && (
        <div className="mt-4 hidden w-full grid-cols-2 gap-2 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:grid">
          <SiteButton href={href} variant="solid" className="px-2">
            Подробнее
          </SiteButton>
          <SiteButton href={configHref} variant="outline" className="px-2">
            Конфигуратор
          </SiteButton>
        </div>
      )}
    </article>
  );
}
