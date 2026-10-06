import React from 'react';
import { cn } from './utils';
import { Input } from './input';
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
  { icon: LifebuoyIcon, text: 'Круглосуточная помощь 24/7' },
  { icon: ReloadIcon, text: 'Трейд-ин: обновление старой DACIA на новую' },
  { icon: ShieldTickIcon, text: 'Управляйте автомобилем уверенно благодаря гарантии DACIA' },
  { icon: SteeringWheelIcon, text: 'Тест-драйв: протестируйте автомобиль на ваш выбор' },
];

const defaultColumns = [
  {
    // first column: brand tagline + links (no heading)
    tagline: 'Откройте для себя марку Dacia',
    links: [
      { label: 'Контакты', href: '#' },
      { label: 'Дилеры', href: '#' },
      { label: 'Корпоративные продажи', href: '#' },
    ],
    logo: true,
  },
  {
    title: 'Пользователям Dacia',
    links: [
      { label: 'Гарантия', href: '#' },
      { label: 'Поддержка', href: '#' },
      { label: 'Скачать цены', href: '#' },
      { label: 'Новости', href: '#' },
    ],
  },
  {
    title: 'Автомобили Dacia',
    links: [
      { label: 'Модельный ряд Dacia', href: '#' },
      { label: 'Трейд-ин', href: '#' },
      { label: 'Финансирование', href: '#' },
      { label: 'Тест-драйв', href: '#' },
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
  { label: 'Обработка персональных данных', href: '#' },
  { label: 'Юридическая информация', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Доступность', href: '#' },
];

const linkClass =
  'text-[14px] leading-[24px] text-alpha-l-80 transition-colors duration-200 hover:text-surface-01 focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-01';

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
    title: 'Подпишитесь на Dacia',
    placeholder: 'Ваш email для рассылки',
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
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex flex-col items-center gap-4 text-center">
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
            <div key={col.title || col.tagline || i} className="flex min-w-0 flex-col gap-4">
              {col.logo && (
                <a href="/" aria-label="Dacia" className="mb-2 block w-fit">
                  <img src={logoSign} alt="Dacia" width={57} height={16} />
                </a>
              )}
              {col.title && <h3 className="text-[14px] font-medium leading-[24px] text-surface-01">{col.title}</h3>}
              {col.tagline && <p className="text-[14px] leading-[24px] text-alpha-l-80">{col.tagline}</p>}
              <ul className="flex flex-col gap-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkClass}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(sub || socials?.length > 0) && (
            <div className="flex min-w-0 flex-col gap-4">
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
                      action={{ icon: SendIcon, type: 'submit', 'aria-label': 'Подписаться' }}
                    />
                  </form>
                </>
              )}
              {socials?.length > 0 && (
                <ul className="flex flex-wrap gap-2">
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

      {/* 3. Legal bar */}
      <div className="bg-surface-02">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-4 text-[12px] leading-[16px] text-dacia-text-secondary sm:flex-row sm:items-center sm:justify-between md:px-8">
          <ul className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:gap-y-2">
            {legalLinks.map((l, i) => (
              <li key={l.label} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 hidden h-3 w-px bg-alpha-d-20 sm:block" />}
                <a href={l.href} className="transition-colors duration-200 hover:text-dacia-dark-green">{l.label}</a>
              </li>
            ))}
          </ul>
          <p className="text-center font-medium sm:text-right">{copyright}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
