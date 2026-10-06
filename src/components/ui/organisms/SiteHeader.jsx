import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Menu } from './Menu';
import { MegaMenuPanels, contactPanel, searchPanel } from './MegaMenuPanels';
import { Logo } from '../atoms/Logo';
import { PhoneIcon } from '../atoms/MenuIcons';
import { ctaLabel, navigation, phone, testDriveHref } from '../../../data/navigation';
import { useIsMd, useIsXl } from '../../../hooks/useMediaQuery';
import { useScrolled } from '../../../hooks/useScrolled';

const ContactSheet = React.lazy(() => import('./ContactSheet'));
const MobileMenu = React.lazy(() => import('./MobileMenu').then((m) => ({ default: m.MobileMenu })));

function MobileHeader({ headerRef, open, setOpen }) {
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
    </>
  );
}

/**
 * Site header, one component for every page:
 *  - ≥1280px: static white bar at the top → floating translucent bar (16px margins) once scrolled,
 *    hover mega menus, click phone/search panels;
 *  - 768–1279px: two-row sticky header (burger + logo · phone · language · search · CTA / a divider line / nav), same
 *    panels on tap, the burger opens the same full-screen menu as on phones;
 *  - <768px: logo + burger → full-screen mobile menu.
 * `current` = nav id of the open page (highlighted like an active item).
 * Everything is rendered from `src/data/navigation.js`.
 */
export function SiteHeader({ nav = navigation, images = {}, current }) {
  const isMd = useIsMd();
  const isXl = useIsXl();
  const scrolled = useScrolled(64);

  const floating = isXl && scrolled;
  const headerRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // openPanel('contact') from the page: on phones (no mega menu) it opens the same content as a bottom sheet
  React.useEffect(() => {
    if (isMd) return undefined;
    const onOpen = (e) => e.detail?.id === 'contact' && setSheetOpen(true);
    window.addEventListener('app:open-panel', onOpen);
    return () => window.removeEventListener('app:open-panel', onOpen);
  }, [isMd]);

  // the full-screen menu belongs below xl only; close it when the screen grows past that
  React.useEffect(() => {
    if (isXl) setMenuOpen(false);
  }, [isXl]);

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

  const mobileMenu = menuOpen && !isXl && (
    <React.Suspense fallback={null}>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} images={images} />
    </React.Suspense>
  );

  if (!isMd) {
    return (
      <>
        <MobileHeader headerRef={headerRef} open={menuOpen} setOpen={setMenuOpen} />
        {mobileMenu}
        {sheetOpen && (
          <React.Suspense fallback={null}>
            <ContactSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
          </React.Suspense>
        )}
      </>
    );
  }

  return (
    <>
    {/* placeholder: the bar is fixed from xl, this keeps its (static) height in the page flow so nothing jumps */}
    <div className="max-xl:contents xl:h-[var(--site-header-h)]">
    <Menu ref={headerRef} value={current} floating={floating} morph>
      <Menu.Logo className="items-center gap-4">
        <button
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="flex size-10 items-center justify-center text-dacia-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green xl:hidden"
        >
          <MenuIcon size={24} strokeWidth={1.5} />
        </button>
        <Logo href="/" />
      </Menu.Logo>
      <Menu.Center>
        <Menu.Nav>
          {nav.map((item) => (
            <Menu.Item key={item.id} value={item.id} panel={item.id} href={item.href}>
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
        <Menu.Cta href={testDriveHref}>{ctaLabel}</Menu.Cta>
      </Menu.Actions>
      <MegaMenuPanels nav={nav} images={images} />
    </Menu>
    </div>
    {mobileMenu}
    </>
  );
}
