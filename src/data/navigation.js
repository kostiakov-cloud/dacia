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
  { id: 'models', label: 'Модели', kind: 'models', href: '/models' },
  {
    id: 'services',
    label: 'Сервисы',
    href: '/services',
    promo: { title: 'Сервисы и обслуживание', linkLabel: 'Запись на ТО', href: '/service-booking', image: promoImage('services', 'w-[108%] -right-[4%] -bottom-[3%]', { blend: true }) },
    sections: [
      {
        kind: 'links',
        title: 'Сервисы',
        links: [
          { label: 'Замена масла', href: '/services#oil' },
          { label: 'Проверка шин', href: '/services#tires' },
          { label: 'Обслуживание кондиционера', href: '/services#ac' },
          { label: 'Проверка тормозов', href: '/services#brakes' },
          { label: 'Часто задаваемые вопросы', href: '/faq' },
        ],
        more: { label: 'Подробнее', href: '/services' },
      },
      {
        kind: 'text',
        title: 'Техническое обслуживание',
        width: 'max-w-[300px]',
        mobileOrder: -1,
        text: 'Регулярное ТО — залог надежности и долговечности вашего Dacia. Мы используем только оригинальные запчасти и рекомендуемые материалы, чтобы сохранить гарантию и гарантировать вашу безопасность на дороге.',
        more: { label: 'Записаться на ТО', href: '/service-booking' },
      },
    ],
  },
  {
    id: 'trade-in',
    label: 'Трейд-ин',
    href: '/trade-in',
    promo: { title: 'Трейд-ин', linkLabel: 'Заполнить форму', href: '/trade-in#form', image: promoImage('trade-in', 'w-[96%] -right-[5%] bottom-0') },
    sections: [
      {
        kind: 'text',
        title: 'Трейд-ин',
        width: 'max-w-[300px]',
        text: 'Trade-IN – это финансовый инструмент, который позволяет зачесть стоимость старого автомобиля в счет стоимости нового. Проще говоря, «Trade-IN» - представляет собой обмен автомобилей.',
        more: { label: 'Рассчитать стоимость старого авто', href: '/trade-in#form' },
      },
      {
        kind: 'text',
        title: 'Выкуп авто на утилизацию',
        width: 'max-w-[480px]',
        text: 'Мы предлагаем ответственные решения по сбору вышедших из эксплуатации транспортных средств и отработанного моторного масла, напрямую способствуя защите окружающей среды, предотвращению загрязнения и рациональному использованию восстановимых ресурсов.',
        more: { label: 'Подать заявку онлайн', href: '/trade-in#form' },
      },
    ],
  },
  {
    id: 'offers',
    label: 'Предложения',
    href: '/offers',
    promo: { title: 'Предложения и финансирование', linkLabel: 'Получите предложение', href: '/offer-request', image: promoImage('offers', 'w-[72%] -right-[6%] bottom-0') },
    sections: [
      {
        kind: 'links',
        title: 'Предложения на авто',
        links: [
          { label: 'Dacia Duster', href: '/offers#duster', price: '17 700 €' },
          { label: 'Dacia Logan', href: '/offers#logan', price: '11 500 €' },
          { label: 'Dacia Sandero Stepway', href: '/offers#sandero', price: '13 880 €' },
          { label: 'Dacia Bigster', href: '/offers#bigster', price: '20 500 €' },
          { label: 'Dacia Jogger', href: '/offers#jogger', price: '18 880 €' },
        ],
        more: { label: 'Просмотреть все предложения', href: '/offers' },
      },
      {
        kind: 'links',
        title: 'Финансирование',
        links: [{ label: 'BNP Paribas', href: '/financing#bnp-paribas' }, { label: 'Crédit Agricole', href: '/financing#credit-agricole' }, { label: 'Société Générale', href: '/financing#societe-generale' }, { label: 'Groupe BPCE', href: '/financing#groupe-bpce' }],
        more: { label: 'Смотреть все', href: '/financing' },
      },
    ],
  },
  {
    id: 'about',
    label: 'О нас',
    href: '/about',
    promo: { title: 'О нас', linkLabel: 'Новое поколение Dacia', href: '/models', image: promoImage('about', 'w-[96%] -right-[7%] -bottom-[25%]', { blend: true, widths: [480, 800] }) },
    sections: [
      {
        kind: 'links',
        title: 'О нас',
        links: [
          { label: 'Откройте марку Dacia', href: '/about' },
          { label: 'Гарантия Dacia', href: '/warranty' },
          { label: 'Скачать цены', href: '/price-list' },
          { label: 'Философия Dacia', href: '/philosophy' },
          { label: 'История Dacia', href: '/about#timeline-title' },
          { label: 'Двигатели ECO-G', href: '/eco-g' },
        ],
      },
      {
        kind: 'links',
        title: 'Новое поколение',
        links: [
          { label: 'Dacia Logan', href: '/models/logan-new', price: '12 880 €' },
          { label: 'Dacia Sandero', href: '/models/sandero', price: '13 990 €' },
          { label: 'Dacia Sandero Stepway', href: '/models/sandero-stepway', price: '13 880 €' },
          { label: 'Dacia Spring', href: '/models', price: '18 220 €' },
        ],
      },
      {
        kind: 'news',
        title: 'Новости',
        width: 'max-w-[300px]',
        items: [
          { date: '13 сентября 2026', label: 'Мировая премьера Dacia на IAA Mobility 2021 в Мюнчене' },
          { date: '17 июня 2026', label: 'Премьера, которая меняет правила игры в сегменте доступных SUV' },
        ],
        more: { label: 'Читать больше новостей', href: '/news' },
      },
    ],
  },
  {
    id: 'contacts',
    label: 'Контакты',
    href: '/contacts',
    promo: { title: 'Контакты', linkLabel: 'Свяжитесь с нами', href: '/contacts', image: promoImage('contacts', 'w-[80%] -right-[16%] -bottom-[6%]') },
    sections: [
      {
        kind: 'links',
        title: 'Свяжитесь с нами',
        links: [
          { label: 'Запрос информации', href: '/contacts#form' },
          { label: 'Запросить тест-драйв', href: '/test-drive' },
          { label: 'Запросить предложение', href: '/offer-request' },
          { label: 'Запись на ТО', href: '/service-booking' },
        ],
      },
      {
        kind: 'links',
        title: 'Дилеры',
        links: [
          { label: 'Dacia Центр', href: '/dealers' },
          { label: 'Центр — Альфа Авто', href: '/dealers' },
          { label: 'Север — Бета Мотор', href: '/dealers' },
          { label: 'Юг — Гамма Авто', href: '/dealers' },
        ],
        more: { label: 'Подробнее', href: '/dealers' },
      },
      {
        kind: 'contacts',
        title: 'Корпоративные продажи',
        items: [
          { icon: 'user', label: 'Иван Примеров' },
          { icon: 'phone', label: '+44 20 7946 0501, +44 20 7946 0502' },
          { icon: 'mail', label: 'corporate@example.com' },
          { icon: 'calendar', label: 'Пн-Пт: 09:00-19:00; Сб: 09:00-14:00' },
        ],
        more: { label: 'Подробнее', href: '/corporate' },
      },
    ],
  },
];

/** Model catalogue page (also the target of every "Смотреть все модели" button). */
export const modelsHref = '/models';

export const phone = { label: '020 7946 0958', href: 'tel:+442079460958' };

/** Test-drive request page (header CTA, hero, banner, search chip, mobile menu...). */
export const testDriveHref = '/test-drive';

export const ctaLabel = 'Запросить тест-драйв';

export const searchChips = [
  { label: 'Часто задаваемые вопросы', href: '/faq' },
  { label: 'Новые поступления', href: '/stock' },
  { label: 'Финансирование', href: '/financing' },
  { label: 'Трейд-ин', href: '/trade-in' },
  { label: 'Запросить тест-драйв', href: '/test-drive' },
];

/** Messengers in the "Выберите способ связи" panel / bottom sheet. */
export const contactChannels = ['FaceTime', 'Telegram', 'Viber', 'WhatsApp', 'Signal'];
