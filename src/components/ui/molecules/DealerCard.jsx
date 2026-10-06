import React from 'react';
import { AtSign, Clock, MapPin, Phone } from 'lucide-react';
import { cn } from '../utils';
import { SiteButton } from '../atoms/SiteButton';
import { tr } from '../../../i18n';

const Row = ({ icon: Icon, children }) => (
  <li className="flex items-start gap-3 text-small font-light text-ink-13">
    <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-dacia-text-secondary" aria-hidden />
    <span className="min-w-0 break-words">{children}</span>
  </li>
);

/** Dealer card: name + service badges, contact rows (address, phones, e-mail, hours) and two actions. */
export function DealerCard({ id, name, address, phones = [], email, hours, services = [], map, className, ...rest }) {
  return (
    <article id={id} {...rest} className={cn('scroll-mt-28 rounded-cr2 border border-alpha-d-10 bg-surface-03 p-6 md:p-8 xl:scroll-mt-24', className)}>
      <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{name}</h2>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label={tr('Услуги дилера')}>
        {services.map((s) => (
          <li key={s} className="rounded-cr2 border border-alpha-d-5 bg-surface-01 px-2.5 py-0.5 text-caption font-medium text-dacia-text-secondary">{s}</li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-col gap-3">
        <Row icon={MapPin}>{address}</Row>
        <Row icon={Phone}>
          {phones.map((p, i) => (
            <React.Fragment key={p}>
              {i > 0 && ', '}
              <a href={`tel:${p.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-dacia-dark-green">{p}</a>
            </React.Fragment>
          ))}
        </Row>
        <Row icon={AtSign}><a href={`mailto:${email}`} className="transition-colors hover:text-dacia-dark-green">{email}</a></Row>
        <Row icon={Clock}>{hours}</Row>
      </ul>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <SiteButton href="/service-booking" variant="solid" size="m" className="px-3">{tr('Записаться на ТО')}</SiteButton>
        <SiteButton href={map} variant="outline" size="m" className="px-3" target="_blank" rel="noopener noreferrer">{tr('Маршрут')}</SiteButton>
      </div>
    </article>
  );
}
