import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';
import { Logo } from '../atoms/Logo';
import { MenuItem } from '../atoms/MenuItem';
import { PhoneIcon, SearchIcon } from '../atoms/MenuIcons';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { MegaPromo } from '../molecules/MegaPromo';

// GSAP is only needed once a panel opens, so it is fetched on the first sign of user intent (pointer / touch / key),
// with a 4s idle fallback. Until it arrives panels simply appear without animation.
let gsap = null;
if (typeof window !== 'undefined') {
  let started = false;
  const events = ['pointermove', 'pointerdown', 'touchstart', 'keydown'];
  const load = () => {
    if (started) return;
    started = true;
    events.forEach((e) => window.removeEventListener(e, load));
    import('gsap').then((m) => {
      gsap = m.default;
    });
  };
  events.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));
  setTimeout(load, 4000);
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Page backdrop under an open panel: #000 30% + blur(20), faded in/out with GSAP. */
function MenuOverlay({ open, onClose }) {
  const ref = React.useRef(null);
  const [rendered, setRendered] = React.useState(open);
  if (open && !rendered) setRendered(true);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!gsap) {
      if (!open) setRendered(false);
      return undefined;
    }
    const d = reduceMotion() ? 0 : 1;
    gsap.killTweensOf(el);
    if (open) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 * d, ease: 'power2.out' });
    } else {
      gsap.to(el, { opacity: 0, duration: 0.2 * d, ease: 'power2.in', onComplete: () => setRendered(false) });
    }
    return () => gsap.killTweensOf(el);
  }, [open, rendered]);

  if (!rendered) return null;
  return createPortal(
    <div ref={ref} aria-hidden onClick={onClose} className="fixed inset-0 z-40 bg-alpha-d-30 backdrop-blur-[20px]" />,
    document.body
  );
}

const MenuContext = React.createContext({ value: undefined, select: () => {}, floating: true, open: null, setOpen: () => {}, hoverOut: () => {}, cancelClose: () => {}, isPinned: () => true });

function MenuRoot({ value, defaultValue, onValueChange, open, defaultOpen = null, onOpenChange, floating = true, morph = false, className, children, ...props }) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value !== undefined ? value : inner;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const currentOpen = open !== undefined ? open : innerOpen;
  // 'hover' panels close when the pointer leaves header + panel; 'click' panels stay until closed
  const openedBy = React.useRef('click');
  const closeTimer = React.useRef();
  const cancelClose = React.useCallback(() => clearTimeout(closeTimer.current), []);
  const setOpen = React.useCallback(
    (v, by = 'click') => {
      cancelClose();
      openedBy.current = by;
      if (open === undefined) setInnerOpen(v);
      onOpenChange?.(v);
    },
    [open, onOpenChange, cancelClose]
  );
  const hoverOut = React.useCallback(() => {
    cancelClose();
    if (openedBy.current !== 'hover') return;
    closeTimer.current = setTimeout(() => {
      if (open === undefined) setInnerOpen(null);
      onOpenChange?.(null);
    }, 150);
  }, [open, onOpenChange, cancelClose]);
  React.useEffect(() => cancelClose, [cancelClose]);

  // other components can ask the header to open a panel: openPanel('contact') (see src/panelBus.js)
  React.useEffect(() => {
    const onOpen = (e) => e.detail?.id && setOpen(e.detail.id, 'click');
    window.addEventListener('app:open-panel', onOpen);
    return () => window.removeEventListener('app:open-panel', onOpen);
  }, [setOpen]);

  // any page navigation (link click, Back / Forward) closes the open panel, the header itself stays mounted
  React.useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener('app:navigate', close);
    window.addEventListener('popstate', close);
    return () => {
      window.removeEventListener('app:navigate', close);
      window.removeEventListener('popstate', close);
    };
  }, [setOpen]);
  const ctx = React.useMemo(
    () => ({
      floating,
      open: currentOpen,
      setOpen,
      cancelClose,
      hoverOut,
      isPinned: () => openedBy.current === 'click',
      value: current,
      select: (v) => {
        if (value === undefined) setInner(v);
        onValueChange?.(v);
      },
    }),
    [current, value, onValueChange, floating, currentOpen, setOpen, cancelClose, hoverOut]
  );

  return (
    <MenuContext.Provider value={ctx}>
      <header
        className={cn(
          'flex flex-wrap items-center justify-between gap-y-1 xl:flex-nowrap xl:gap-x-6 xl:gap-y-0 min-[1440px]:gap-x-0',
          morph
            ? // From xl the bar is `fixed` in BOTH states and only its geometry / colours change, so the static -> floating
              // switch is one smooth CSS transition (the page reserves the static height with a placeholder, see SiteHeader).
              // Below xl it is the normal static / sticky bar.
              cn(
                'relative z-50 w-full border-b bg-surface-01 px-6 pt-3 max-xl:sticky max-xl:top-0',
                'xl:fixed xl:w-auto xl:box-border xl:py-0 xl:transition-[top,left,right,height,padding,border-radius,background-color,border-color,backdrop-filter] xl:duration-[600ms] xl:ease-[cubic-bezier(0.16,1,0.3,1)]',
                floating
                  ? 'xl:left-4 xl:right-4 xl:top-4 xl:h-12 xl:rounded-[2px] xl:border-transparent xl:bg-alpha-popup-bg xl:pl-6 xl:pr-0 xl:backdrop-blur-md'
                  : 'border-alpha-d-3 xl:inset-x-0 xl:top-0 xl:h-[81px] xl:rounded-none xl:px-8 xl:backdrop-blur-0'
              )
            : floating
              ? // sticky, 16px from top and sides, 48px high, translucent "Popup BG" token + blur
                'sticky top-4 z-50 mx-4 h-12 rounded-[2px] bg-alpha-popup-bg pl-6 pr-0 backdrop-blur-md'
              : 'relative z-50 w-full border-b border-alpha-d-3 bg-surface-01 px-6 pt-3 max-xl:sticky max-xl:top-0 xl:px-8 xl:py-[18px]',
          // with an open mega panel the bar becomes opaque and merges with it
          currentOpen != null && 'rounded-b-none bg-surface-02 backdrop-blur-none',
          className
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={hoverOut}
        {...props}
      >
        {children}
      </header>
      <MenuOverlay open={currentOpen != null} onClose={() => setOpen(null)} />
    </MenuContext.Provider>
  );
}

/** Left slot (240px). Renders the Dacia logo by default. */
function MenuLogo({ className, children, ...props }) {
  return (
    <div className={cn('order-1 flex shrink-0 items-end xl:order-none xl:w-auto min-[1440px]:w-60', className)}>
      {children || <Logo {...props} />}
    </div>
  );
}

/** Centre navigation (gap 28px). */
function MenuNav({ className, children, ...props }) {
  return (
    <nav className={cn('order-3 mt-3 flex w-[calc(100%+3rem)] -mx-6 items-center justify-center gap-7 border-t border-alpha-d-3 py-3 xl:gap-5 min-[1440px]:gap-7 xl:order-none xl:m-0 xl:w-auto xl:border-0 xl:py-2', className)} {...props}>
      {children}
    </nav>
  );
}

/**
 * Groups the nav and the trailing cluster. From `xl` it is one flex row (the desktop bar);
 * below `xl` it is `display: contents`, so nav / group / actions become direct, re-orderable
 * children of the header (tablet: logo + group + CTA on row 1, nav on row 2).
 */
function MenuCenter({ className, children, ...props }) {
  return (
    <div className={cn('contents xl:flex xl:items-center xl:gap-7', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Item; `value` takes part in page selection, `panel` opens the mega panel with that id:
 * `trigger="hover"` (default) on pointer enter, `trigger="click"` on click only; with `href` a mouse click navigates.
 */
const canHover = () => typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches;

const MenuNavItem = React.forwardRef(({ value, panel, trigger = 'hover', href, onClick, onMouseEnter, active, ...props }, ref) => {
  const ctx = React.useContext(MenuContext);
  const hasPanel = panel !== undefined;
  const isOpen = hasPanel && ctx.open === panel;
  // while a panel is open it owns the highlight, otherwise the selected page does
  const selected = active ?? (ctx.open != null ? isOpen : value !== undefined && ctx.value === value);
  return (
    <MenuItem
      ref={ref}
      active={selected}
      aria-expanded={hasPanel ? isOpen : undefined}
      aria-haspopup={hasPanel ? 'true' : undefined}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (hasPanel && trigger === 'hover' && !isOpen) ctx.setOpen(panel, 'hover');
      }}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (value !== undefined) ctx.select(value);
        // An item with both `panel` and `href`: a mouse click follows the link (and closes the panel);
        // on touch screens there is no hover, so the tap opens the panel instead and the link is not followed.
        if (hasPanel && href) {
          if (canHover()) ctx.setOpen(null);
          else {
            e.preventDefault();
            // touch browsers fire an emulated hover right before the tap: pin the panel instead of closing it
            if (isOpen && ctx.isPinned()) ctx.setOpen(null);
            else ctx.setOpen(panel, 'click');
          }
          return;
        }
        // a click pins a hover-opened panel; a second click closes it
        if (hasPanel) {
          if (isOpen && ctx.isPinned()) ctx.setOpen(null);
          else ctx.setOpen(panel, 'click');
        }
      }}
      {...props}
    />
  );
});
MenuNavItem.displayName = 'Menu.Item';

/** Trailing cluster inside the nav: phone / language / search (pl 12, gap 32). */
function MenuGroup({ className, children, ...props }) {
  return (
    <div className={cn('order-2 ml-auto flex items-center gap-5 xl:order-none xl:ml-0 xl:gap-5 xl:pl-3 min-[1440px]:gap-8', className)} {...props}>
      {children}
    </div>
  );
}

function MenuLanguage(props) {
  return <LanguageSwitcher {...props} />;
}

/** Search trigger. With `panel` it toggles the mega panel with that id (click). */
function MenuSearch({ className, icon, panel, onClick, ...props }) {
  const ctx = React.useContext(MenuContext);
  const hasPanel = panel !== undefined;
  const isOpen = hasPanel && ctx.open === panel;
  return (
    <button
      type="button"
      aria-label="Search"
      aria-expanded={hasPanel ? isOpen : undefined}
      aria-haspopup={hasPanel ? 'true' : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (hasPanel) ctx.setOpen(isOpen ? null : panel, 'click');
      }}
      className={cn(
        'flex size-5 shrink-0 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green',
        className
      )}
      {...props}
    >
      {icon || <SearchIcon />}
    </button>
  );
}

/** Right slot (240px, right-aligned, gap 12). */
function MenuActions({ className, children, ...props }) {
  const { floating } = React.useContext(MenuContext);
  return (
    <div className={cn('order-2 ml-5 flex shrink-0 items-center justify-end gap-3 xl:order-none xl:ml-0 xl:w-auto min-[1440px]:w-60', floating && 'self-stretch', className)} {...props}>
      {children}
    </div>
  );
}

/** Call to action: ds/Button — dark green, h40, px24, Medium 16/28. */
const MenuCta = React.forwardRef(({ href, className, children, ...props }, ref) => {
  const { floating } = React.useContext(MenuContext);
  const Comp = href ? 'a' : 'button';
  return (
    <Comp
      ref={ref}
      href={href}
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[2px] bg-dacia-dark-green px-6 py-2.5 transition-[height,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        floating ? 'h-12' : 'h-10',
        'text-[16px] font-medium leading-[28px] text-surface-01',
        'transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});
MenuCta.displayName = 'Menu.Cta';

/**
 * Mega panel for `<Menu.Item panel={value}>`. `promo` ({ title, linkLabel, href, image }) renders the
 * 400px card on the left; children are the columns. `bare` drops the promo/column layout
 * (e.g. the models carousel gets the full width).
 */
function MenuMega({ value, promo, bare = false, label, className, children }) {
  const { open, setOpen, floating } = React.useContext(MenuContext);
  const isOpen = open === value;
  const panelRef = React.useRef(null);
  const [rendered, setRendered] = React.useState(isOpen);
  if (isOpen && !rendered) setRendered(true);

  React.useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, setOpen]);

  // GSAP: reveal the panel top-down, then stagger its blocks (`[data-mega-item]`) up into place.
  React.useLayoutEffect(() => {
    const el = panelRef.current;
    if (isOpen) {
      if (!el || !gsap) return undefined;
      const d = reduceMotion() ? 0 : 1;
      const items = el.querySelectorAll('[data-mega-item]');
      gsap.killTweensOf([el, items]);
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)', y: -10 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.4 * d, ease: 'power3.out', clearProps: 'clipPath,transform' }
      );
      // the promo picture drives in from the lower right with a slight zoom-out, a beat after the card
      const pics = el.querySelectorAll('[data-mega-image]');
      gsap.killTweensOf(pics);
      gsap.fromTo(
        pics,
        { x: 90, y: 40, scale: 1.12, opacity: 0, transformOrigin: '100% 100%' },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1 * d, delay: 0.18 * d, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 * d, delay: 0.06 * d, stagger: 0.045 * d, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
      return () => gsap.killTweensOf([el, items]);
    }
    if (!rendered) return undefined;
    // switching to another panel: swap instantly; closing for good: quick collapse
    if (open !== null || !el || !gsap || reduceMotion()) {
      setRendered(false);
      return undefined;
    }
    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: 'inset(0 0 100% 0)',
      y: -8,
      opacity: 0.4,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => setRendered(false),
    });
    return () => gsap.killTweensOf(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!rendered) return null;

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label={label || promo?.title}
      className={cn(
        'absolute top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto bg-surface-02',
        floating ? '-inset-x-4' : 'inset-x-0',
        className
      )}
    >
      <div className="relative flex gap-10 p-6 xl:gap-16 xl:p-8">
        {promo && (
          <div className="hidden xl:flex">
            <MegaPromo {...promo} />
          </div>
        )}
        {bare ? (
          <div className="min-w-0 flex-1">{children}</div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-wrap content-start gap-x-16 gap-y-8 pt-8 xl:flex-nowrap xl:pt-[34px]">{children}</div>
        )}
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => setOpen(null)}
          data-mega-item
          className="absolute right-6 top-6 flex size-6 xl:right-8 xl:top-8 items-center justify-center text-dacia-text-secondary transition-colors hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export const Menu = Object.assign(MenuRoot, {
  Logo: MenuLogo,
  Nav: MenuNav,
  Center: MenuCenter,
  Item: MenuNavItem,
  Group: MenuGroup,
  Language: MenuLanguage,
  Search: MenuSearch,
  Actions: MenuActions,
  Cta: MenuCta,
  Mega: MenuMega,
});

export { PhoneIcon, SearchIcon };
