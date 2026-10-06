import React from 'react';
import { SiteButton } from '../components/ui/atoms/SiteButton';
import { tr } from '../i18n';

/** 404: shown for every unknown address. */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-block text-[96px] font-bold leading-none text-dacia-dark-green md:text-[128px]">404</p>
      <h1 id="nf-title" className="mt-4 font-block text-hs3 text-dacia-text-secondary xl:text-h3">
        {tr('Страница не найдена')}
      </h1>
      <p className="mt-3 text-root font-light text-ink-13">{tr('Возможно, адрес введён с ошибкой или страница была перемещена.')}</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <SiteButton href="/" variant="solid">{tr('На главную')}</SiteButton>
        <SiteButton href="/models" variant="outline">{tr('Модели')}</SiteButton>
        <SiteButton href="/contacts" variant="outline">{tr('Контакты')}</SiteButton>
      </div>
    </section>
  );
}
