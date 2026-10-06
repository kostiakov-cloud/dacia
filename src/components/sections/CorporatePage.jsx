import React from 'react';
import { AtSign, Check, Clock, Phone, User } from 'lucide-react';
import { PageBand } from '../ui/molecules/PageBand';
import { RequestForm } from '../ui/organisms/RequestForm';
import { contactConsent, corporate } from '../../data/contacts';
import { reveal } from '../../reveal';

const fields = [
  { name: 'company', label: 'Компания', type: 'text', required: true, placeholder: 'Название организации', error: 'Укажите компанию' },
  { name: 'name', label: 'Контактное лицо', type: 'text', required: true, placeholder: 'Ваше имя', autoComplete: 'name', error: 'Введите имя' },
  { name: 'phone', label: 'Номер телефона', type: 'tel', required: true, placeholder: '+44 7700 900123', autoComplete: 'tel' },
  { name: 'email', label: 'Электронная почта', type: 'email', required: true, placeholder: 'example@company.md', autoComplete: 'email' },
  { name: 'fleet', label: 'Размер автопарка', type: 'select', placeholder: 'Выберите', options: corporate.fleet, cols: 2 },
  { name: 'message', label: 'Комментарий', type: 'textarea', placeholder: 'Какие автомобили и задачи вас интересуют...' },
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
      <PageBand title="Корпоративные продажи" subtitle="Автомобили Dacia для бизнеса: выгодные условия для автопарков" />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-[400px_1fr] xl:gap-16 xl:py-16">
        <div {...reveal('left')} className="flex flex-col gap-8">
          <div className="rounded-cr2 border border-alpha-d-10 bg-surface-03 p-6">
            <h2 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">Ваш менеджер</h2>
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
            <h2 className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">Что вы получаете</h2>
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
          <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">Оставить заявку</h2>
          <RequestForm
            className="mt-6"
            fields={fields}
            consentText={contactConsent}
            submitLabel="Отправить заявку"
            successText="Спасибо! Корпоративный менеджер свяжется с вами в ближайшее время."
            successHref="/models"
            successLabel="Смотреть модели"
          />
        </div>
      </div>
    </>
  );
}
