import React from 'react';
import { AtSign, Check, Clock, Phone, User } from 'lucide-react';
import { PageBand } from '../ui/molecules/PageBand';
import { RequestForm } from '../ui/organisms/RequestForm';
import { contactConsent, corporate } from '../../data/contacts';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

const fields = [
  { name: 'company', label: tr('Компания'), type: 'text', required: true, placeholder: tr('Название организации'), error: tr('Укажите компанию') },
  { name: 'name', label: tr('Контактное лицо'), type: 'text', required: true, placeholder: tr('Ваше имя'), autoComplete: 'name', error: tr('Введите имя') },
  { name: 'phone', label: tr('Номер телефона'), type: 'tel', required: true, placeholder: '+44 7700 900123', autoComplete: 'tel' },
  { name: 'email', label: tr('Электронная почта'), type: 'email', required: true, placeholder: 'example@company.md', autoComplete: 'email' },
  { name: 'fleet', label: tr('Размер автопарка'), type: 'select', placeholder: tr('Выберите'), options: corporate.fleet, cols: 2 },
  { name: 'message', label: tr('Комментарий'), type: 'textarea', placeholder: tr('Какие автомобили и задачи вас интересуют...') },
];

/** /corporate: manager card + benefits (left), company request form (right). */
export function CorporatePage() {
  const m = corporate.manager;
  const rows = [
    [User, m.name],
    [Phone, m.phone],
    [AtSign, m.email],
    [Clock, m.hours],
  ];
  return (
    <>
      <PageBand title={tr('Корпоративные продажи')} subtitle={tr('Автомобили Dacia для бизнеса: выгодные условия для автопарков')} />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-[400px_1fr] xl:gap-16 xl:py-16">
        <div {...reveal('left')} className="flex flex-col gap-8">
          <div className="rounded-cr2 border border-alpha-d-10 bg-surface-03 p-6">
            <h2 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">{tr('Ваш менеджер')}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {rows.map(([Icon, text]) => (
                <li key={text} className="flex items-start gap-3 text-small text-dacia-text-secondary">
                  <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden />
                  <span className="min-w-0 break-words">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">{tr('Что вы получаете')}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {corporate.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-small font-light text-ink-13">
                  <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-dacia-dark-green" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div {...reveal('up', 100)}>
          <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{tr('Оставить заявку')}</h2>
          <RequestForm
            className="mt-6"
            fields={fields}
            consentText={contactConsent}
            submitLabel={tr('Отправить заявку')}
            successText={tr('Спасибо! Корпоративный менеджер свяжется с вами в ближайшее время.')}
            successHref="/models"
            successLabel={tr('Смотреть модели')}
          />
        </div>
      </div>
    </>
  );
}
