import React from 'react';
import { TradeInForm } from './TradeInForm';
import { tradeInHero, tradeInInfo } from '../../data/tradein';
import { reveal } from '../../reveal';

/**
 * /trade-in: hero (sky -> wall gradient with the "new car peeling off the old one" cut-out sitting on the bottom edge),
 * two information columns on a light band, then the request form.
 */
export function TradeInPage({ hero = tradeInHero, info = tradeInInfo }) {
  return (
    <>
      <section aria-labelledby="tradein-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#cfd6dc] via-[#c3cad0] to-[#aab1b7]">
        {/* the wall behind the car */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-gradient-to-b from-[#4a4d50] to-[#2c2e30]" />
        <div className="mx-auto flex h-[360px] max-w-[1440px] flex-col items-center px-4 pt-8 text-center md:h-[440px] md:px-8 md:pt-10 xl:h-[520px] xl:pt-10">
          <h1 id="tradein-title" {...reveal('up')} className="font-block text-hs2 text-dacia-dark-green xl:text-h2">
            {hero.title}
          </h1>
          <p {...reveal('up', 100)} className="mt-3 max-w-[760px] xl:max-w-[900px] font-block text-hs6 text-dacia-text-secondary xl:text-h6">
            {hero.subtitle}
          </p>
        </div>
        <img
          src={hero.image.src}
          srcSet={hero.image.srcSet}
          sizes="(min-width: 1440px) 1440px, 120vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute left-1/2 top-[50%] w-[140%] max-w-none -translate-x-1/2 select-none md:top-[34%] md:w-[104%] xl:top-[19%] xl:w-[90%]"
        />
      </section>

      <section aria-label="Информация о программе" className="border-b border-alpha-d-3 bg-surface-03">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-2 md:gap-16 md:px-8 md:py-16 xl:py-20">
          {info.map((b, i) => (
            <div key={b.title} {...reveal('up', i * 100)}>
              <h2 className="font-block text-hs3 text-dacia-text-secondary xl:text-h3">{b.title}</h2>
              <div className="mt-5 flex flex-col gap-4">
                {b.paragraphs.map((t) => (
                  <p key={t} className="text-small font-light text-ink-13">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <TradeInForm />
    </>
  );
}
