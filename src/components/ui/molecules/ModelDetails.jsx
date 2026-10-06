import React from 'react';
import { cn } from '../utils';
import { CountUp } from '../atoms/CountUp';
import { tr } from '../../../i18n';

function Stat({ value, unit, label }) {
  return (
    <div className="rounded-cr2 border border-alpha-d-5 bg-surface-01 px-2 py-4 text-center md:px-3">
      <p className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">
        <CountUp value={value} />
        {unit && <span className="ml-1 text-small font-medium">{unit}</span>}
      </p>
      <p className="mt-1 text-caption text-ink-13">{label}</p>
    </div>
  );
}

/**
 * Text block of a model "feature": «Новый» label, name (Heading Dacia), hybrid plate, price, version, eco class and
 * three spec cards. Centred on phones / tablets, left-aligned from xl. Shared by the home slider and the catalogue list.
 * `as` = heading tag of the name (h2 by default); `variant="list"` = catalogue rows (smaller name, spec cards span the column).
 */
export function ModelDetails({ model, as: Heading = 'h2', variant = 'slider', href, className, ...rest }) {
  const list = variant === 'list';
  return (
    <div {...rest} className={cn('flex flex-col items-center text-center xl:items-start xl:text-left', className)}>
      {model.isNew && <span className="font-display text-hx6 font-bold uppercase tracking-wider text-dacia-text-secondary">{tr('Новый')}</span>}
      <Heading className={cn('font-display text-hx3 font-bold uppercase tracking-wider text-dacia-text-secondary', !list && 'md:text-hx2')}>{href ? <a href={href} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green">{model.name}</a> : model.name}</Heading>

      {model.hybrid && <span className="mt-3 rounded-cr2 bg-dacia-orange px-2 py-0.5 text-tiny font-medium text-surface-01">{tr('Полный гибрид')}</span>}

      <p className="mt-4 text-root text-ink-13">
        {tr('Цена от')} <span className="font-medium text-dacia-text-secondary">{model.price}</span>
      </p>
      <p className="mt-1 text-small font-light text-ink-13">{model.version}</p>

      {model.eco && (
        <p className="mt-3 flex items-center gap-2 text-small text-dacia-text-secondary">
          {tr('Класс экологичности')}
          <span className="flex size-6 items-center justify-center rounded-cr2 bg-status-success text-small font-medium text-surface-01">{model.eco}</span>
        </p>
      )}

      {model.stats && (
        <div className={cn('mt-6 grid w-full grid-cols-3 gap-2 xl:mt-8', list ? 'max-w-[560px]' : 'max-w-[480px]')}>
          {model.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      )}
    </div>
  );
}
