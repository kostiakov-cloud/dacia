import { tr } from '../i18n';
/**
 * Single source for the site navigation: desktop mega menu and mobile drill-down both render this.
 *
 * Section kinds (what a column contains):
 *   links    – { label, href, price? }[]            + optional `more` ({ label, href }) action link
 *   text     – paragraph                              + optional `more`
 *   news     – { date, label, href }[]                + optional `more`
 *   contacts – { icon: 'user'|'phone'|'mail'|'calendar', label }[] + optional `more`
 * `width` = optional Tailwind max-width class for the desktop column,
 * `mobileOrder` = sort key on mobile (default 0).
 */
/**
 * Mega-menu promo pictures (public/images/mega, WebP). `className` positions the picture inside the 400px promo card
 * (it is cropped by the card on purpose); `blend` multiplies pictures that come with a white background onto the card.
 */
const promoImage = (name, className, { blend = false, widths = [480, 800] } = {}) => ({
  src: `/images/mega/${name}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((w) => `/images/mega/${name}-${w}.webp ${w}w`).join(', '),
  className,
  blend,
});

export const navigation = [
  { id: 'models', label: tr('Модели'), kind: 'models', href: '/models' },
  {
    id: 'services',
    label: tr('Сервисы'),
    href: '/services',
    promo: { title: tr('Сервисы и обслуживание'), linkLabel: tr('Запись на ТО'), href: '/service-booking', image: promoImage('services', 'w-[108%] -right-[4%] -bottom-[3%]', { blend: true }) },
    sections: [
      {
        kind: 'links',
        title: tr('Сервисы'),
        links: [
          { label: tr('Замена масла'), href: '/services#oil' },
          { label: tr('Проверка шин'), href: '/services#tires' },
          { label: tr('Обслуживание кондиционера'), href: '/services#ac' },
          { label: tr('Проверка тормозов'), href: '/services#brakes' },
          { label: tr('Часто задаваемые вопросы'), href: '/faq' },
        ],
        more: { label: tr('Подробнее'), href: '/services' },
      },
      {
        kind: 'text',
        title: tr('Техническое обслуживание'),
        width: 'max-w-[300px]',
        mobileOrder: -1,
        text: tr('Регулярное ТО — залог надежности и долговечности вашего Dacia. Мы используем только оригинальные запчасти и рекомендуемые материалы, чтобы сохранить гарантию и гарантировать вашу безопасность на дороге.'),
        more: { label: tr('Записаться на ТО'), href: '/service-booking' },
      },
    ],
  },
  {
    id: 'trade-in',
    label: tr('Трейд-ин'),
    href: '/trade-in',
    promo: { title: tr('Трейд-ин'), linkLabel: tr('Заполнить форму'), href: '/trade-in#form', image: promoImage('trade-in', 'w-[96%] -right-[5%] bottom-0') },
    sections: [
      {
        kind: 'text',
        title: tr('Трейд-ин'),
        width: 'max-w-[300px]',
        text: tr('Trade-IN – это финансовый инструмент, который позволяет зачесть стоимость старого автомобиля в счет стоимости нового. Проще говоря, «Trade-IN» - представляет собой обмен автомобилей.'),
        more: { label: tr('Рассчитать стоимость старого авто'), href: '/trade-in#form' },
      },
      {
        kind: 'text',
        title: tr('Выкуп авто на утилизацию'),
        width: 'max-w-[480px]',
        text: tr('Мы предлагаем ответственные решения по сбору вышедших из эксплуатации транспортных средств и отработанного моторного масла, напрямую способствуя защите окружающей среды, предотвращению загрязнения и рациональному использованию восстановимых ресурсов.'),
        more: { label: tr('Подать заявку онлайн'), href: '/trade-in#form' },
      },
    ],
  },
  {
    id: 'offers',
    label: tr('Предложения'),
    href: '/offers',
    promo: { title: tr('Предложения и финансирование'), linkLabel: tr('Получите предложение'), href: '/offer-request', image: promoImage('offers', 'w-[72%] -right-[6%] bottom-0') },
    sections: [
      {
        kind: 'links',
        title: tr('Предложения на авто'),
        links: [
          { label: 'Dacia Duster', href: '/offers#duster', price: '17 700 €' },
          { label: 'Dacia Logan', href: '/offers#logan', price: '11 500 €' },
          { label: 'Dacia Sandero Stepway', href: '/offers#sandero', price: '13 880 €' },
          { label: 'Dacia Bigster', href: '/offers#bigster', price: '20 500 €' },
          { label: 'Dacia Jogger', href: '/offers#jogger', price: '18 880 €' },
        ],
        more: { label: tr('Просмотреть все предложения'), href: '/offers' },
      },
      {
        kind: 'links',
        title: tr('Финансирование'),
        links: [{ label: 'BNP Paribas', href: '/financing#bnp-paribas' }, { label: 'Crédit Agricole', href: '/financing#credit-agricole' }, { label: 'Société Générale', href: '/financing#societe-generale' }, { label: 'Groupe BPCE', href: '/financing#groupe-bpce' }],
        more: { label: tr('Смотреть все'), href: '/financing' },
      },
    ],
  },
  {
    id: 'about',
    label: tr('О нас'),
    href: '/about',
    promo: { title: tr('О нас'), linkLabel: tr('Новое поколение Dacia'), href: '/models', image: promoImage('about', 'w-[96%] -right-[7%] -bottom-[25%]', { blend: true, widths: [480, 800] }) },
    sections: [
      {
        kind: 'links',
        title: tr('О нас'),
        links: [
          { label: tr('Откройте марку Dacia'), href: '/about' },
          { label: tr('Гарантия Dacia'), href: '/warranty' },
          { label: tr('Скачать цены'), href: '/price-list' },
          { label: tr('Философия Dacia'), href: '/philosophy' },
          { label: tr('История Dacia'), href: '/about#timeline-title' },
          { label: tr('Двигатели ECO-G'), href: '/eco-g' },
        ],
      },
      {
        kind: 'links',
        title: tr('Новое поколение'),
        links: [
          { label: 'Dacia Logan', href: '/models/logan-new', price: '12 880 €' },
          { label: 'Dacia Sandero', href: '/models/sandero', price: '13 990 €' },
          { label: 'Dacia Sandero Stepway', href: '/models/sandero-stepway', price: '13 880 €' },
          { label: 'Dacia Spring', href: '/models', price: '18 220 €' },
        ],
      },
      {
        kind: 'news',
        title: tr('Новости'),
        width: 'max-w-[300px]',
        items: [
          { date: tr('13 сентября 2026'), label: tr('Мировая премьера Dacia на IAA Mobility 2021 в Мюнчене') },
          { date: tr('17 июня 2026'), label: tr('Премьера, которая меняет правила игры в сегменте доступных SUV') },
        ],
        more: { label: tr('Читать больше новостей'), href: '/news' },
      },
    ],
  },
  {
    id: 'contacts',
    label: tr('Контакты'),
    href: '/contacts',
    promo: { title: tr('Контакты'), linkLabel: tr('Свяжитесь с нами'), href: '/contacts', image: promoImage('contacts', 'w-[80%] -right-[16%] -bottom-[6%]') },
    sections: [
      {
        kind: 'links',
        title: tr('Свяжитесь с нами'),
        links: [
          { label: tr('Запрос информации'), href: '/contacts#form' },
          { label: tr('Запросить тест-драйв'), href: '/test-drive' },
          { label: tr('Запросить предложение'), href: '/offer-request' },
          { label: tr('Запись на ТО'), href: '/service-booking' },
        ],
      },
      {
        kind: 'links',
        title: tr('Дилеры'),
        links: [
          { label: tr('Dacia Центр'), href: '/dealers' },
          { label: tr('Центр — Альфа Авто'), href: '/dealers' },
          { label: tr('Север — Бета Мотор'), href: '/dealers' },
          { label: tr('Юг — Гамма Авто'), href: '/dealers' },
        ],
        more: { label: tr('Подробнее'), href: '/dealers' },
      },
      {
        kind: 'contacts',
        title: tr('Корпоративные продажи'),
        items: [
          { icon: 'user', label: tr('Иван Примеров') },
          { icon: 'phone', label: '+44 20 7946 0501, +44 20 7946 0502' },
          { icon: 'mail', label: 'corporate@example.com' },
          { icon: 'calendar', label: tr('Пн-Пт: 09:00-19:00; Сб: 09:00-14:00') },
        ],
        more: { label: tr('Подробнее'), href: '/corporate' },
      },
    ],
  },
];

/** Model catalogue page (also the target of every "Смотреть все модели" button). */
export const modelsHref = '/models';

export const phone = { label: '020 7946 0958', href: 'tel:+442079460958' };

/** Test-drive request page (header CTA, hero, banner, search chip, mobile menu...). */
export const testDriveHref = '/test-drive';

export const ctaLabel = tr('Запросить тест-драйв');

export const searchChips = [
  { label: tr('Часто задаваемые вопросы'), href: '/faq' },
  { label: tr('Новые поступления'), href: '/stock' },
  { label: tr('Финансирование'), href: '/financing' },
  { label: tr('Трейд-ин'), href: '/trade-in' },
  { label: tr('Запросить тест-драйв'), href: '/test-drive' },
];

/** Messengers in the "Выберите способ связи" panel / bottom sheet. */
export const contactChannels = ['FaceTime', 'Telegram', 'Viber', 'WhatsApp', 'Signal'];
