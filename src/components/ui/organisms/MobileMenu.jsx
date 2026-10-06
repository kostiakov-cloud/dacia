import React from 'react';
import { ArrowLeft, AtSign, CalendarDays, ChevronRight, Phone, User, X } from 'lucide-react';
import { cn } from '../utils';
import { Logo } from '../atoms/Logo';
import { ArrowLink } from '../atoms/ArrowLink';
import { MegaLink } from '../atoms/MegaLink';
import { PhoneIcon, SearchIcon } from '../atoms/MenuIcons';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { ModelRow } from '../molecules/ModelRow';
import { SearchBlock } from '../molecules/SearchBlock';
import { BottomSheet } from '../molecules/BottomSheet';
import { ContactChannels } from '../molecules/ContactChannels';
import { ContactRow, MegaText, NewsItem } from '../molecules/MegaColumn';
import { ctaLabel, navigation, phone } from '../../../data/navigation';
import { models as modelsData } from '../../../data/models';

const contactIcons = { user: User, phone: Phone, mail: AtSign, calendar: CalendarDays };

/**
 * Turns a panel's sections into mobile blocks: sections sorted by `mobileOrder`; `text` sections become
 * plain link rows merged into the first links block (as in the design); the first block has no title.
 */
export function buildMobileBlocks(sections = []) {
  const sorted = [...sections].sort((a, b) => (a.mobileOrder ?? 0) - (b.mobileOrder ?? 0));
  const blocks = [];
  let pending = [];
  for (const s of sorted) {
    if (s.kind === 'text') {
      pending.push({ label: s.title, href: s.more?.href });
    } else if (s.kind === 'links' && blocks.length === 0) {
      blocks.push({ kind: 'links', links: [...pending, ...s.links], more: s.more });
      pending = [];
    } else {
      if (pending.length) blocks.push({ kind: 'links', links: pending });
      pending = [];
      blocks.push(s);
    }
  }
  if (pending.length) blocks.push({ kind: 'links', links: pending });
  return blocks;
}

function Block({ block, index }) {
  const more = block.more && (
    <ArrowLink href={block.more.href || '#'} className="mt-3">
      {block.more.label}
    </ArrowLink>
  );
  return (
    <section className={cn('border-b border-alpha-d-3 px-6 py-6', index % 2 === 1 && 'bg-surface-03')}>
      {index > 0 && block.title && <h3 className="mb-3 text-[16px] font-medium leading-6 text-dacia-text-secondary">{block.title}</h3>}
      <div className="flex flex-col gap-1">
        {block.kind === 'links' &&
          block.links.map((l) => (
            <MegaLink key={l.label} href={l.href} price={l.price} className="min-h-12 flex-wrap py-2">
              {l.label}
            </MegaLink>
          ))}
        {block.kind === 'text' && <MegaText>{block.text}</MegaText>}
        {block.kind === 'news' && (
          <div className="flex flex-col gap-4">
            {block.items.map((n) => (
              <NewsItem key={n.label} date={n.date} href={n.href}>
                {n.label}
              </NewsItem>
            ))}
          </div>
        )}
        {block.kind === 'contacts' &&
          block.items.map((c) => (
            <ContactRow key={c.label} icon={contactIcons[c.icon]} className="min-h-12 items-start py-3">
              {c.label}
            </ContactRow>
          ))}
      </div>
      {more}
    </section>
  );
}

const iconBtn = 'flex size-10 items-center justify-center text-dacia-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green';

/**
 * Full-screen mobile menu with three views: root list → section panel (drill-down) / search.
 * Reads the same `navigation` data as the desktop mega menu. The phone opens a bottom sheet.
 */
export function MobileMenu({ open, onClose, nav = navigation, models = modelsData, images = {} }) {
  const [view, setView] = React.useState({ type: 'root' });
  const [sheet, setSheet] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setView({ type: 'root' });
      setSheet(false);
      return undefined;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key !== 'Escape' || sheet) return;
      if (view.type === 'root') onClose?.();
      else setView({ type: 'root' });
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, view.type, sheet, onClose]);

  if (!open) return null;

  const panel = view.type === 'panel' ? nav.find((n) => n.id === view.id) : null;
  const close = (
    <button type="button" aria-label="Закрыть меню" onClick={onClose} className={iconBtn}>
      <X size={24} strokeWidth={1.5} />
    </button>
  );

  return (
    <div role="dialog" aria-modal="true" aria-label="Меню" className="fixed inset-0 z-[60] flex flex-col bg-surface-01 text-dacia-text-secondary">
      {/* top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-alpha-d-3 bg-surface-02 px-4">
        {panel ? (
          <button type="button" onClick={() => setView({ type: 'root' })} className="flex items-center gap-3 text-[18px] font-medium leading-8">
            <ArrowLeft size={24} strokeWidth={1.5} />
            {panel.label}
          </button>
        ) : (
          <Logo href="/" />
        )}
        {close}
      </div>

      <div key={panel ? panel.id : view.type} className="menu-view flex-1 overflow-y-auto overscroll-contain">
        {view.type === 'root' && (
          <div className="flex flex-col">
            <div className="px-6 pt-6">
              <button
                type="button"
                onClick={() => setView({ type: 'search' })}
                className="flex h-12 w-full items-center justify-between rounded-[2px] border border-alpha-d-10 bg-surface-01 px-4 text-left text-[16px] font-light text-ink-12"
              >
                Что будем искать?
                <SearchIcon size={24} />
              </button>
            </div>
            <ul className="flex flex-col px-6 py-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setView({ type: 'panel', id: item.id })}
                    className="flex w-full items-center justify-between py-3 text-left text-[18px] leading-8 transition-colors hover:text-dacia-dark-green"
                  >
                    {item.label}
                    <ChevronRight size={24} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-8">
              <a href="#" className="flex h-12 w-full items-center justify-center rounded-[2px] bg-dacia-dark-green text-[16px] font-medium text-surface-01">
                {ctaLabel}
              </a>
            </div>
            <div className="flex flex-col gap-4 border-t border-alpha-d-3 bg-surface-03 px-6 py-6 text-[16px]">
              <button type="button" onClick={() => setSheet(true)} className="flex items-center justify-between text-left">
                <span className="font-light text-dacia-text-tertiary">Позвоните нам:</span>
                <span className="flex items-center gap-2 font-medium">
                  {phone.label}
                  <PhoneIcon size={24} />
                </span>
              </button>
              <div className="flex items-center justify-between">
                <span className="font-light text-dacia-text-tertiary">Язык:</span>
                <LanguageSwitcher
                  options={[
                    { value: 'ro', label: 'Romanian' },
                    { value: 'ru', label: 'Русский' },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {view.type === 'search' && (
          <div className="px-6 py-6">
            <SearchBlock bordered />
          </div>
        )}

        {panel && panel.kind === 'models' && (
          <ul className="px-6 py-2">
            {models.map((m) => (
              <li key={m.id} className="border-b border-alpha-d-3 last:border-0">
                <ModelRow {...m} />
              </li>
            ))}
          </ul>
        )}

        {panel && panel.kind !== 'models' && buildMobileBlocks(panel.sections).map((b, i) => <Block key={i} block={b} index={i} />)}
      </div>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Выберите способ связи">
        <ContactChannels hideTitle />
      </BottomSheet>
    </div>
  );
}
