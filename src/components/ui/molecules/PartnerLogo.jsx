import React from 'react';
import { cn } from '../utils';

const tones = {
  green: { box: 'bg-surface-02', main: 'text-[#12803a] text-[64px] font-extrabold leading-none', sub: 'text-[#12803a] text-[24px] font-semibold' },
  bt: { box: 'bg-[#fff0c4]', main: 'text-[#1a1a1a] font-serif text-[22px] font-bold', sub: 'text-[#1a1a1a] font-serif text-[12px]' },
  maib: { box: 'bg-surface-02', main: 'text-[#12394f] text-[52px] font-extrabold leading-none lowercase', sub: 'text-[#13a2b2] text-[52px] font-extrabold leading-none lowercase' },
  blue: { box: 'bg-surface-02', main: 'text-[#1d6fb8] text-[32px] font-semibold leading-none', sub: '' },
};

/** Partner logo tile (square). Real logo = `image` { src, alt } (`bleed` stretches it edge to edge, no padding, cropping to fill); otherwise a neutral text placeholder in the brand colours. */
export function PartnerLogo({ logo, image, name, bleed = false, className }) {
  const t = tones[logo?.tone] || tones.blue;
  return (
    <div className={cn('flex aspect-square w-full items-center justify-center overflow-hidden', bleed ? 'p-0' : 'p-4', image ? 'bg-transparent' : t.box, className)}>
      {image ? (
        <img src={image.src} alt={image.alt || name} loading="lazy" decoding="async" className={bleed ? 'size-full object-cover' : 'max-h-full max-w-full object-contain'} draggable={false} />
      ) : (
        <div role="img" aria-label={name} className="flex flex-col items-center text-center font-sans">
          <span className={t.main}>{logo.text}</span>
          {logo.sub && <span className={t.sub}>{logo.sub}</span>}
        </div>
      )}
    </div>
  );
}
