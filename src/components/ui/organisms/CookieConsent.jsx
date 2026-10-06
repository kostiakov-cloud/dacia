import React from 'react';
import { createPortal } from 'react-dom';
import { Cookie, X } from 'lucide-react';
import { cn } from '../utils';
import { Logo } from '../atoms/Logo';
import { Switch } from '../atoms/Switch';
import { SiteButton } from '../atoms/SiteButton';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { OPEN_CONSENT_EVENT, consentCategories, getConsent, saveConsent } from '../../../lib/consent';
import { tr } from '../../../i18n';

const text = {
  title: tr('Мы ценим вашу приватность!'),
  body: tr('На этом сайте мы используем файлы cookie и аналогичные функции для обработки информации о конечном устройстве и персональных данных (например, IP-адреса или информация о браузере). Обработка используется для таких целей, как интеграция контента, внешних служб и элементов от третьих лиц, статистический анализ/измерение, персонализированная реклама и интеграция социальных сетей. В зависимости от функции данные передаются третьим лицам и обрабатываются ими. Это согласие является добровольным, не требуется для использования нашего сайта и может быть отозвано в любое время с помощью значка в левом нижнем углу.'),
  selected: tr('Принять выбранные'),
  all: tr('Принять все'),
};

const allOff = Object.fromEntries(consentCategories.map((c) => [c.id, c.locked === true]));
const allOn = Object.fromEntries(consentCategories.map((c) => [c.id, true]));

/**
 * Cookie consent dialog. Shown on the first visit (nothing stored); the choice is saved in localStorage
 * (src/lib/consent.js). X / Esc = only the necessary ("Функция") cookies. A round cookie button bottom-left (and the
 * footer "Cookies" link) re-opens it. Same backdrop as the mega menu (#000 30% + blur 20); focus is trapped inside,
 * page scroll is locked, focus returns to where it was.
 */
export default function CookieConsent() {
  const [open, setOpen] = React.useState(() => getConsent() === null);
  const [choice, setChoice] = React.useState(() => ({ ...allOff, ...(getConsent()?.categories || {}) }));
  const [saved, setSaved] = React.useState(() => getConsent() !== null);
  const dialog = React.useRef(null);
  const opener = React.useRef(null);

  const close = React.useCallback((categories) => {
    saveConsent(categories);
    setSaved(true);
    setOpen(false);
  }, []);

  // re-open from the footer link / the round button
  React.useEffect(() => {
    const onOpen = () => {
      opener.current = document.activeElement;
      setChoice({ ...allOff, ...(getConsent()?.categories || {}) });
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = dialog.current;
    const focusables = () => [...root.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]')];
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') return close(allOff);
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      opener.current?.focus?.();
    };
  }, [open, close]);

  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto p-4 md:p-8">
          <div aria-hidden className="fixed inset-0 bg-alpha-d-30 backdrop-blur-[20px]" />
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            className="consent-in relative my-auto w-full max-w-[592px] rounded-cr2 bg-surface-01 p-6 shadow-xl md:p-12"
          >
            <div className="flex items-start justify-between">
              <Logo href="/" className="[&>img]:h-4 [&>img]:w-auto" />
              <button
                type="button"
                aria-label={tr('Закрыть: только необходимые cookie')}
                onClick={() => close(allOff)}
                className="-mr-1 -mt-1 flex size-8 items-center justify-center text-dacia-text-secondary transition-colors hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <LanguageSwitcher className="mt-6 !justify-start" />

            <h2 id="consent-title" className="mt-8 text-root font-medium text-dacia-text-secondary">
              {text.title}
            </h2>
            <p className="mt-4 text-small font-light text-ink-13">{text.body}</p>

            <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-[auto_auto_auto] sm:justify-between">
              {consentCategories.map((c) => (
                <Switch
                  key={c.id}
                  label={c.label}
                  locked={c.locked}
                  checked={Boolean(choice[c.id])}
                  onChange={(e) => setChoice((p) => ({ ...p, [c.id]: e.target.checked }))}
                />
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <SiteButton variant="outline" onClick={() => close(choice)}>
                {text.selected}
              </SiteButton>
              <SiteButton variant="solid" onClick={() => close(allOn)}>
                {text.all}
              </SiteButton>
            </div>
          </div>
        </div>
      )}

      {saved && !open && (
        <button
          type="button"
          aria-label={tr('Настройки cookie')}
          onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
          className={cn(
            'fixed bottom-4 left-4 z-30 flex size-12 items-center justify-center rounded-full border border-alpha-d-10 bg-surface-01 text-dacia-text-secondary shadow-md',
            'transition-colors hover:border-dacia-dark-green hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2'
          )}
        >
          <Cookie size={22} strokeWidth={1.5} />
        </button>
      )}
    </>,
    document.body
  );
}
