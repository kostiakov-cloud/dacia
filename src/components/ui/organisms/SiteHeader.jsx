import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Menu } from './Menu';
import { MegaMenuPanels, contactPanel, searchPanel } from './MegaMenuPanels';
import { Logo } from '../atoms/Logo';
import { PhoneIcon } from '../atoms/MenuIcons';
import { ctaLabel, navigation, phone } from '../../../data/navigation';
import { useIsMd, useIsXl } from '../../../hooks/useMediaQuery';
import { useScrolled } from '../../../hooks/useScrolled';

const MobileMenu = React.lazy(() => import('./MobileMenu').then((m) => ({ default: m.MobileMenu })));

function MobileHeader({ nav, images, headerRef }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-alpha-d-3 bg-surface-02 px-4">
        <Logo href="/" />
        <button
          type="button"
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex size-10 items-center justify-center text-dacia-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
        >
          <MenuIcon size={24} strokeWidth={1.5} />
        </button>
      </header>
      {open && (
        <React.Suspense fallback={null}>
          <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} images={images} />
        </React.Suspense>
      )}
    </>
  );
}

/**
 * Site header, one component for every page:
 *  - ≥1280px: static white bar at the top → floating translucent bar (16px margins) once scrolled,
 *    hover mega menus, click phone/search panels;
 *  - 768–1279px: two-row sticky header (logo · phone · language · search · CTA / nav), same panels on tap;
 *  - <768px: logo + burger → full-screen mobile menu.
 * Everything is rendered from `src/data/navigation.js`.
 */
export function SiteHeader({ nav = navigation, images = {} }) {
  const isMd = useIsMd();
  const isXl = useIsXl();
  const scrolled = useScrolled(64);

  const floating = isXl && scrolled;
  const headerRef = React.useRef(null);

  // Publish the static header height as --site-header-h (Hero = 100dvh - header). While the header is
  // floating we keep the last static value, so the hero does not change height during scroll.
  React.useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el || floating) return undefined;
    const set = () => document.documentElement.style.setProperty('--site-header-h', `${el.getBoundingClientRect().height}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [floating, isMd]);

  if (!isMd) return <MobileHeader nav={nav} images={images} headerRef={headerRef} />;

  return (
    <Menu ref={headerRef} floating={floating} className={floating ? 'mt-4' : undefined}>
      <Menu.Logo>
        <Logo href="/" />
      </Menu.Logo>
      <Menu.Center>
        <Menu.Nav>
          {nav.map((item) => (
            <Menu.Item key={item.id} panel={item.id}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Nav>
        <Menu.Group>
          <Menu.Item panel={contactPanel} trigger="click" icon={<PhoneIcon />}>
            {phone.label}
          </Menu.Item>
          <Menu.Language />
          <Menu.Search panel={searchPanel} />
        </Menu.Group>
      </Menu.Center>
      <Menu.Actions>
        <Menu.Cta>{ctaLabel}</Menu.Cta>
      </Menu.Actions>
      <MegaMenuPanels nav={nav} images={images} />
    </Menu>
  );
}
