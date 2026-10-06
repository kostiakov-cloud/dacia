import React from 'react';
import { AtSign, Phone, Printer } from 'lucide-react';
import { cn } from '../utils';
import { ArrowLink } from '../atoms/ArrowLink';
import { PartnerLogo } from './PartnerLogo';

const Row = ({ icon: Icon, children }) => (
  <li className="flex items-start gap-3 text-small font-light text-ink-13">
    <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-dacia-text-secondary" aria-hidden />
    <span className="min-w-0 break-words">{children}</span>
  </li>
);

/** Financing partner card: logo tile on the left (top on phones), contacts and the action link on the right. */
export function PartnerCard({ id, name, phones = [], fax, email, link, logo, image, bleed = false, className, ...rest }) {
  return (
    <article id={id} {...rest} className={cn('flex scroll-mt-28 flex-col overflow-hidden rounded-cr2 border border-alpha-d-10 bg-surface-03 sm:flex-row xl:scroll-mt-24', className)}>
      <div className="sm:w-[44%] sm:max-w-[260px] sm:shrink-0">
        <PartnerLogo logo={logo} image={image} name={name} bleed={bleed} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 p-6 md:p-8">
        <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{name}</h2>
        <ul className="flex flex-col gap-3">
          {phones.length > 0 && (
            <Row icon={Phone}>
              {phones.map((p, i) => (
                <React.Fragment key={p}>
                  {i > 0 && ', '}
                  <a href={`tel:${p.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-dacia-dark-green">
                    {p}
                  </a>
                </React.Fragment>
              ))}
            </Row>
          )}
          {fax && <Row icon={Printer}>{fax}</Row>}
          {email && (
            <Row icon={AtSign}>
              <a href={`mailto:${email}`} className="transition-colors hover:text-dacia-dark-green">
                {email}
              </a>
            </Row>
          )}
        </ul>
        {link && <ArrowLink href={link.href}>{link.label}</ArrowLink>}
      </div>
    </article>
  );
}
