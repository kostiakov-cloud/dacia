import React from 'react';
import { cn } from '../ui/utils';
import { PromoTile } from '../ui/molecules/PromoTile';
import { promoTiles } from '../../data/tiles';
import { reveal } from '../../reveal';

/** 2×2 promo tiles (1 column on mobile, reordered via `mobileOrder`). */
export function PromoTiles({ tiles = promoTiles, className }) {
  return (
    <section aria-label="Услуги" className={cn('mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-16 xl:py-24', className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:gap-8">
        {tiles.map((t, i) => (
          <PromoTile key={t.id} order={t.mobileOrder} {...t} {...reveal('scale', (i % 2) * 110)} />
        ))}
      </div>
    </section>
  );
}
