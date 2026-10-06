import React from 'react';
import { Phone, User } from 'lucide-react';
import { AccordionItem } from '../ui/atoms/Accordion';
import { Avatar } from '../ui/atoms/Avatar';
import { SiteButton } from '../ui/atoms/SiteButton';
import { faqContact, faqGroups, faqIntro } from '../../data/faq';
import { reveal } from '../../reveal';
import { openPanel } from '../../panelBus';
import { contactPanel } from '../ui/organisms/MegaMenuPanels';

const tints = ['bg-[#f3d9c4]', 'bg-[#d9e2ea]', 'bg-[#e3d3bd]'];

/** Overlapping round avatars (photos when given, tinted person icons otherwise). */
function Faces({ avatars = [] }) {
  return (
    <div className="flex justify-center" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`relative flex size-12 items-center justify-center overflow-hidden rounded-full ring-2 ring-surface-04 ${i > 0 ? '-ml-3' : ''} ${i === 1 ? 'z-10 size-14 -mt-1' : ''} ${tints[i]}`}>
          {avatars[i] ? <Avatar src={avatars[i]} size={56} className="size-full" /> : <User size={22} strokeWidth={1.5} className="text-dacia-text-secondary" />}
        </span>
      ))}
    </div>
  );
}

/**
 * /faq: light title band, two question groups (accordion rows) in a 736px column and the
 * "still have questions?" card with the support phone. Accordion: all collapsed on load, opening one closes the other.
 */
export function FaqPage({ groups = faqGroups, intro = faqIntro, contact = faqContact }) {
  // one answer open at a time on the whole page; everything is collapsed on load
  const [openKey, setOpenKey] = React.useState(null);
  return (
    <>
      <section aria-labelledby="faq-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-8 md:py-14">
          <h1 id="faq-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {intro.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[736px] px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14 xl:max-w-[800px] xl:pb-20">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`faq-${g.id}`} {...reveal()} className="mb-10 last:mb-0 md:mb-12">
            <h2 id={`faq-${g.id}`} className="font-block text-hs6 text-dacia-text-secondary xl:text-h6">
              {g.title}
            </h2>
            <div className="mt-4 border-t border-alpha-d-5">
              {g.items.map((it) => (
                <AccordionItem
                  key={it.q}
                  question={it.q}
                  open={openKey === `${g.id}:${it.q}`}
                  onToggle={(next) => setOpenKey(next ? `${g.id}:${it.q}` : null)}
                >
                  {it.a}
                </AccordionItem>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="faq-contact" {...reveal()} className="mt-12 rounded-cr2 bg-dacia-light-bg px-6 py-10 text-center md:mt-16 md:px-10 md:py-12">
          <Faces avatars={contact.avatars} />
          <h2 id="faq-contact" className="mt-5 font-block text-hs5 text-ink-16 xl:text-h5">
            {contact.title}
          </h2>
          <p className="mt-2 text-root font-light text-ink-13">{contact.text}</p>
          <SiteButton
            href={contact.phone.href}
            variant="solid"
            className="mt-6 gap-2 max-md:w-full"
            aria-haspopup="dialog"
            onClick={(e) => {
              // same "Выберите способ связи" panel as the phone number in the header (the tel: link stays as a fallback)
              e.preventDefault();
              openPanel(contactPanel);
            }}
          >
            <Phone size={20} strokeWidth={1.5} aria-hidden />
            {contact.phone.label}
          </SiteButton>
        </section>
      </div>
    </>
  );
}
