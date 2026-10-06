import React from 'react';
import { CircleCheck } from 'lucide-react';
import { SiteButton } from '../atoms/SiteButton';

/** "Заявка отправлена" panel shown after a form was submitted. */
export function FormSuccess({ text = 'Мы свяжемся с вами по указанным контактам, чтобы подтвердить время визита.', backHref = '/', backLabel = 'На главную' }) {
  return (
    <div role="status" className="mx-auto flex max-w-[640px] flex-col items-center px-4 py-20 text-center md:py-28">
      <CircleCheck size={56} strokeWidth={1.5} className="text-dacia-dark-green" aria-hidden />
      <h2 className="mt-6 font-block text-hs3 text-dacia-text-secondary xl:text-h3">Заявка отправлена</h2>
      <p className="mt-3 text-root font-light text-ink-13">{text}</p>
      <SiteButton href={backHref} variant="outline" className="mt-8 max-md:w-full">
        {backLabel}
      </SiteButton>
    </div>
  );
}
