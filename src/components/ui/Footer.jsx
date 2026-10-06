import React from 'react';
import { cn } from './utils';
import { Input } from './input';
import { reveal } from '../../reveal';
import { openConsentSettings } from '../../lib/consent';
import lifebuoy from '../../assets/footer/lifebuoy.svg';
import reload from '../../assets/footer/reload.svg';
import shieldTick from '../../assets/footer/shield-tick.svg';
import steeringWheel from '../../assets/footer/steering-wheel.svg';
import send from '../../assets/footer/send.svg';
import facebook from '../../assets/footer/facebook.svg';
import instagram from '../../assets/footer/instagram.svg';
import youtube from '../../assets/footer/youtube.svg';
import tiktok from '../../assets/footer/tiktok.svg';
import logoSign from '../../assets/footer/logo-sign.svg';
import { tr } from '../../i18n';

/** Wraps an exported Figma SVG as an icon component (`size` prop, like lucide). */
const img = (src, name, defaultSize) => {
  const Icon = ({ size = defaultSize, className }) => (
    <img src={src} alt="" width={size} height={size} className={className} />
  );
  Icon.displayName = name;
  return Icon;
};

const LifebuoyIcon = img(lifebuoy, 'LifebuoyIcon', 40);
const ReloadIcon = img(reload, 'ReloadIcon', 40);
const ShieldTickIcon = img(shieldTick, 'ShieldTickIcon', 40);
const SteeringWheelIcon = img(steeringWheel, 'SteeringWheelIcon', 40);
const SendIcon = img(send, 'SendIcon', 20);
const FacebookIcon = img(facebook, 'FacebookIcon', 20);
const InstagramIcon = img(instagram, 'InstagramIcon', 20);
const YoutubeIcon = img(youtube, 'YoutubeIcon', 20);
const TiktokIcon = img(tiktok, 'TiktokIcon', 20);

/* ---- Default content (mirrors the Figma screenshot) ---- */
const defaultBenefits = [
  { icon: LifebuoyIcon, text: tr('Круглосуточная помощь 24/7') },
  { icon: ReloadIcon, text: tr('Трейд-ин: обновление старой DACIA на новую') },
  { icon: ShieldTickIcon, text: tr('Управляйте автомобилем уверенно благодаря гарантии DACIA') },
  { icon: SteeringWheelIcon, text: tr('Тест-драйв: протестируйте автомобиль на ваш выбор') },
];

const defaultColumns = [
  {
    // first column: brand tagline + links (no heading)
    tagline: tr('Откройте для себя марку Dacia'),
    taglineHref: '/about',
    links: [
      { label: tr('Контакты'), href: '/contacts' },
      { label: tr('Дилеры'), href: '/dealers' },
      { label: tr('Корпоративные продажи'), href: '/corporate' },
    ],
    logo: true,
  },
  {
    title: tr('Пользователям Dacia'),
    links: [
      { label: tr('Гарантия'), href: '/warranty' },
      { label: tr('Поддержка'), href: '/faq' },
      { label: tr('Скачать цены'), href: '/price-list' },
      { label: tr('Новости'), href: '/news' },
    ],
  },
  {
    title: tr('Автомобили Dacia'),
    links: [
      { label: tr('Модельный ряд Dacia'), href: '/models' },
      { label: tr('Трейд-ин'), href: '/trade-in' },
      { label: tr('Финансирование'), href: '/financing' },
      { label: tr('Тест-драйв'), href: '/test-drive' },
    ],
  },
];

const defaultSocials = [
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
  { label: 'TikTok', href: '#', icon: TiktokIcon },
];

const defaultLegal = [
  { label: tr('Обработка персональных данных'), href: '/privacy' },
  { label: tr('Юридическая информация'), href: '/legal' },
  { label: 'Cookies', href: '#cookies', action: 'cookies' },
  { label: tr('Доступность'), href: '/accessibility' },
];

const linkClass =
  'text-[16px] font-light leading-[24px] text-alpha-l-80 transition-colors duration-200 hover:text-surface-01 focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-01';

/**
 * Footer — Dacia site footer.
 *
 * Sections (top → bottom): benefits strip, main block (brand column, link columns,
 * newsletter + socials), legal bar. Everything is data-driven; defaults match the design.
 *
 * Props:
 *   benefits   [{ icon: Component, text }]
 *   columns    [{ title?, tagline?, logo?, links: [{ label, href }] }]
 *   subscribe  { title, placeholder, onSubmit(email) } | false to hide
 *   socials    [{ label, href, icon: Component }]
 *   legalLinks [{ label, href }]
 *   copyright  string
 *   className
 *
 * Colours come from the OKUX tokens (tailwind.config.js): surface-*, alpha-l-*, dacia-*.
 */
export const Footer = React.forwardRef(({
  benefits = defaultBenefits,
  columns = defaultColumns,
  subscribe = {},
  socials = defaultSocials,
  legalLinks = defaultLegal,
  copyright = '© 2026 Dacia',
  className,
  ...props
}, ref) => {
  const sub = subscribe === false ? null : {
    title: tr('Подпишитесь на Dacia'),
    placeholder: tr('Ваш email для рассылки'),
    ...subscribe,
  };
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sub?.onSubmit?.(email);
  };

  return (
    <footer ref={ref} className={cn('w-full', className)} {...props}>
      {/* 1. Benefits strip */}
      {benefits?.length > 0 && (
        <div className="border-t border-alpha-d-3 bg-surface-02">
          <ul className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-8 gap-y-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-8 lg:py-12">
            {benefits.map(({ icon: Icon, text }, i) => (
              <li key={text} {...reveal('up', (i % 4) * 90)} className="flex flex-col items-center gap-4 text-center">
                <Icon size={40} className="shrink-0" />
                <p className="max-w-[280px] text-[14px] font-medium leading-[28px] text-dacia-text-secondary">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. Main block */}
      <div className="bg-surface-20 text-surface-01">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:py-20">
          {columns.map((col, i) => (
            <div key={col.title || col.tagline || i} {...reveal('up', i * 90)} className="flex min-w-0 flex-col items-center gap-4 text-center md:items-start md:text-left">
              {col.logo && (
                <a href="/" aria-label="Dacia" className="mb-2 block w-fit">
                  <img src={logoSign} alt="Dacia" width={57} height={16} />
                </a>
              )}
              {col.title && <h3 className="text-[14px] font-medium leading-[24px] text-surface-01">{col.title}</h3>}
              {col.tagline && (col.taglineHref ? <a href={col.taglineHref} className={linkClass}>{col.tagline}</a> : <p className="text-[16px] font-light leading-[24px] text-alpha-l-80">{col.tagline}</p>)}
              <ul className="flex flex-col items-center gap-4 md:items-start">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkClass}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(sub || socials?.length > 0) && (
            <div className="flex min-w-0 flex-col items-center gap-4 text-center md:items-start md:text-left">
              {sub && (
                <>
                  <h3 className="text-[14px] font-medium leading-[24px] text-surface-01">{sub.title}</h3>
                  <form onSubmit={handleSubmit} className="w-full">
                    <Input
                      size="l"
                      borderless
                      type="email"
                      name="email"
                      required
                      aria-label={sub.title}
                      placeholder={sub.placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      action={{ icon: SendIcon, type: 'submit', 'aria-label': tr('Подписаться') }}
                    />
                  </form>
                </>
              )}
              {socials?.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        className="flex size-10 items-center justify-center rounded-cr2 border border-alpha-l-20 text-surface-01 transition-colors duration-200 hover:bg-alpha-l-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-01"
                      >
                        <Icon />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Legal bar: below xl two centred rows (links / divider / copyright), on desktop one row (links left, © right) */}
      <div className="bg-surface-02">
        <div className="mx-auto max-w-[1280px] text-[14px] font-light leading-[24px] text-dacia-text-secondary xl:flex xl:items-center xl:justify-between xl:px-8 xl:py-4">
          <ul className="flex flex-col items-center gap-3 px-4 py-8 md:flex-row md:flex-wrap md:justify-center md:gap-y-1 md:py-3.5 xl:justify-start xl:p-0">
            {legalLinks.map((l, i) => (
              <li key={l.label} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 hidden h-3 w-px bg-alpha-d-20 md:block" />}
                <a
                  href={l.href}
                  onClick={l.action === 'cookies' ? (e) => { e.preventDefault(); openConsentSettings(); } : undefined}
                  className="transition-colors duration-200 hover:text-dacia-dark-green"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="border-t border-alpha-d-3 py-3.5 text-center font-medium xl:border-0 xl:p-0 xl:text-right">{copyright}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
