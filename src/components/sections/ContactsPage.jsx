import React from 'react';
import { AtSign, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageBand } from '../ui/molecules/PageBand';
import { RequestForm } from '../ui/organisms/RequestForm';
import { SiteButton } from '../ui/atoms/SiteButton';
import { contactConsent, contactInfo, contactTopics } from '../../data/contacts';
import { openPanel } from '../../panelBus';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

const fields = [
  { name: 'name', label: tr('Имя'), type: 'text', required: true, placeholder: tr('Ваше имя'), autoComplete: 'name', error: tr('Введите имя') },
  { name: 'phone', label: tr('Номер телефона'), type: 'tel', required: true, placeholder: '+44 7700 900123', autoComplete: 'tel' },
  { name: 'email', label: tr('Электронная почта'), type: 'email', placeholder: 'example@mail.com', autoComplete: 'email' },
  { name: 'topic', label: tr('Тема обращения'), type: 'select', placeholder: tr('Выберите тему'), options: contactTopics },
  { name: 'message', label: tr('Сообщение'), type: 'textarea', required: true, placeholder: tr('Ваш вопрос или пожелание...'), error: tr('Напишите сообщение') },
];

const Item = ({ icon: Icon, title, children }) => (
  <li className="flex gap-4">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-cr2 border border-alpha-d-5 bg-surface-01 text-dacia-text-secondary">
      <Icon size={20} strokeWidth={1.5} aria-hidden />
    </span>
    <div className="min-w-0">
      <p className="text-caption font-light text-ink-13">{title}</p>
      <p className="text-root text-dacia-text-secondary">{children}</p>
    </div>
  </li>
);

/** /contacts: contact details (left), request form (right), map block (link to OpenStreetMap, no heavy embed). */
export function ContactsPage() {
  return (
    <>
      <PageBand title={tr('Контакты')} subtitle={tr('Мы всегда на связи: позвоните, напишите или приезжайте')} />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-[400px_1fr] xl:gap-16 xl:py-16">
        <div {...reveal('left')}>
          <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{tr('Свяжитесь с нами')}</h2>
          <ul className="mt-6 flex flex-col gap-5">
            <Item icon={Phone} title={tr('Телефон')}><a href={contactInfo.phone.href} className="hover:text-dacia-dark-green">{contactInfo.phone.label}</a></Item>
            <Item icon={AtSign} title={tr('Электронная почта')}><a href={contactInfo.email.href} className="hover:text-dacia-dark-green">{contactInfo.email.label}</a></Item>
            <Item icon={MapPin} title={tr('Адрес')}>{contactInfo.address}</Item>
            <Item icon={Clock} title={tr('Режим работы')}>{contactInfo.hours}</Item>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row xl:flex-col">
            <SiteButton variant="outline" onClick={() => openPanel('contact')} className="gap-2">
              <MessageCircle size={20} strokeWidth={1.5} aria-hidden />
              {tr('Написать в мессенджер')}
            </SiteButton>
            <SiteButton href="/dealers" variant="outline">{tr('Все дилеры')}</SiteButton>
          </div>
        </div>

        <div id="form" className="scroll-mt-28 xl:scroll-mt-24" {...reveal('up', 100)}>
          <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{tr('Напишите нам')}</h2>
          <RequestForm
            className="mt-6"
            fields={fields}
            consentText={contactConsent}
            submitLabel={tr('Отправить сообщение')}
            successText={tr('Спасибо за обращение! Мы ответим вам в ближайшее время.')}
            successLabel={tr('На главную')}
          />
        </div>
      </div>

      <section aria-label={tr('Как нас найти')} className="bg-surface-03">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14">
          <a
            href={contactInfo.map}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[280px] items-center justify-center overflow-hidden rounded-cr2 border border-alpha-d-10 bg-gradient-to-br from-surface-07 to-surface-09 text-center md:h-[360px]"
          >
            <span className="flex flex-col items-center gap-3 text-dacia-text-secondary">
              <MapPin size={40} strokeWidth={1.5} aria-hidden />
              <span className="font-block text-hs5 xl:text-h5">{contactInfo.address}</span>
              <span className="rounded-cr2 bg-dacia-dark-green px-5 py-2.5 text-small font-medium text-surface-01 transition-opacity group-hover:opacity-90">{tr('Открыть на карте')}</span>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
