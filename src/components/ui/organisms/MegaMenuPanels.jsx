import React from 'react';
import { AtSign, CalendarDays, Phone, User } from 'lucide-react';
import { Menu } from './Menu';
import { ModelCarousel } from './ModelCarousel';
import { ArrowLink } from '../atoms/ArrowLink';
import { MegaLink } from '../atoms/MegaLink';
import { ContactRow, MegaColumn, MegaText, NewsItem } from '../molecules/MegaColumn';
import { ContactChannels } from '../molecules/ContactChannels';
import { SearchBlock } from '../molecules/SearchBlock';
import { navigation } from '../../../data/navigation';
import { models as modelsData } from '../../../data/models';
import { useIsXl } from '../../../hooks/useMediaQuery';

/** Top-level nav entries (id → panel id, label) derived from the shared navigation data. */
export const megaNav = navigation.map(({ id, label }) => ({ panel: id, label }));

/** Panel id of the "Выберите способ связи" popover (opened by clicking the phone number). */
export const contactPanel = 'contact';

/** Panel id of the search panel (opened by clicking the search icon). */
export const searchPanel = 'search';

const contactIcons = { user: User, phone: Phone, mail: AtSign, calendar: CalendarDays };

/** One column of a mega panel, by section kind. */
function Section({ section }) {
  const more = section.more && (
    <ArrowLink href={section.more.href || '#'} className="mt-2">
      {section.more.label}
    </ArrowLink>
  );
  return (
    <MegaColumn title={section.title} className={section.width}>
      {section.kind === 'links' &&
        section.links.map((l) => (
          <MegaLink key={l.label} href={l.href} price={l.price}>
            {l.label}
          </MegaLink>
        ))}
      {section.kind === 'text' && <MegaText>{section.text}</MegaText>}
      {section.kind === 'news' &&
        section.items.map((n) => (
          <NewsItem key={n.label} date={n.date} href={n.href}>
            {n.label}
          </NewsItem>
        ))}
      {section.kind === 'contacts' &&
        section.items.map((c) => (
          <ContactRow key={c.label} icon={contactIcons[c.icon]}>
            {c.label}
          </ContactRow>
        ))}
      {more}
    </MegaColumn>
  );
}

/**
 * All mega panels of the header (models, services, trade-in, offers, about, contacts + phone + search),
 * rendered from `src/data/navigation.js`. Promo/model images are optional (`images` map by id).
 */
export function MegaMenuPanels({ nav = navigation, models = modelsData, images = {} }) {
  const isXl = useIsXl();
  return (
    <>
      {nav.map((item) =>
        item.kind === 'models' ? (
          <Menu.Mega key={item.id} value={item.id} bare label={item.label}>
            <ModelCarousel visible={isXl ? 5 : 3} items={models} />
          </Menu.Mega>
        ) : (
          <Menu.Mega key={item.id} value={item.id} promo={{ ...item.promo, image: images[item.id] ?? item.promo.image }}>
            {item.sections.map((s) => (
              <Section key={s.title} section={s} />
            ))}
          </Menu.Mega>
        )
      )}

      <Menu.Mega value={contactPanel} bare label="Выберите способ связи">
        <ContactChannels />
      </Menu.Mega>

      <Menu.Mega value={searchPanel} bare label="Поиск">
        <SearchBlock />
      </Menu.Mega>
    </>
  );
}
