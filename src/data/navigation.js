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
export const navigation = [
  { id: 'models', label: 'Модели', kind: 'models' },
  {
    id: 'services',
    label: 'Сервисы',
    promo: { title: 'Сервисы и обслуживание', linkLabel: 'Запись на ТО', href: '#' },
    sections: [
      {
        kind: 'links',
        title: 'Сервисы',
        links: [
          { label: 'Замена масла' },
          { label: 'Проверка шин' },
          { label: 'Обслуживание кондиционера' },
          { label: 'Проверка тормозов' },
          { label: 'Часто задаваемые вопросы' },
        ],
        more: { label: 'Подробнее' },
      },
      {
        kind: 'text',
        title: 'Техническое обслуживание',
        width: 'max-w-[300px]',
        mobileOrder: -1,
        text: 'Регулярное ТО — залог надежности и долговечности вашего Dacia. Мы используем только оригинальные запчасти и рекомендуемые материалы, чтобы сохранить гарантию и гарантировать вашу безопасность на дороге.',
        more: { label: 'Записаться на ТО' },
      },
    ],
  },
  {
    id: 'trade-in',
    label: 'Трейд-ин',
    promo: { title: 'Трейд-ин', linkLabel: 'Заполнить форму', href: '#' },
    sections: [
      {
        kind: 'text',
        title: 'Трейд-ин',
        width: 'max-w-[300px]',
        text: 'Trade-IN – это финансовый инструмент, который позволяет зачесть стоимость старого автомобиля в счет стоимости нового. Проще говоря, «Trade-IN» - представляет собой обмен автомобилей.',
        more: { label: 'Рассчитать стоимость старого авто' },
      },
      {
        kind: 'text',
        title: 'Выкуп авто на утилизацию',
        width: 'max-w-[480px]',
        text: 'Мы предлагаем ответственные решения по сбору вышедших из эксплуатации транспортных средств и отработанного моторного масла, напрямую способствуя защите окружающей среды, предотвращению загрязнения и рациональному использованию восстановимых ресурсов.',
        more: { label: 'Подать заявку онлайн' },
      },
    ],
  },
  {
    id: 'offers',
    label: 'Предложения',
    promo: { title: 'Предложения и финансирование', linkLabel: 'Получите предложение', href: '#' },
    sections: [
      {
        kind: 'links',
        title: 'Предложения на авто',
        links: [
          { label: 'Dacia Duster', price: '17 700 €' },
          { label: 'Dacia Logan', price: '11 500 €' },
          { label: 'Dacia Sandero Stepway', price: '13 880 €' },
          { label: 'Dacia Bigster', price: '20 500 €' },
          { label: 'Dacia Jogger', price: '18 880 €' },
        ],
        more: { label: 'Просмотреть все предложения' },
      },
      {
        kind: 'links',
        title: 'Финансирование',
        links: [{ label: 'Capital Leasing' }, { label: 'BT Leasing' }, { label: 'MAIB Leasing' }, { label: 'Credit Rapid' }],
        more: { label: 'Смотреть все' },
      },
    ],
  },
  {
    id: 'about',
    label: 'О нас',
    promo: { title: 'О нас', linkLabel: 'Новое поколение Dacia', href: '#' },
    sections: [
      {
        kind: 'links',
        title: 'О нас',
        links: [
          { label: 'Откройте марку Dacia' },
          { label: 'Гарантия Dacia' },
          { label: 'Скачать цены' },
          { label: 'Философия Dacia' },
          { label: 'История Dacia' },
          { label: 'Двигатели ECO-G' },
        ],
      },
      {
        kind: 'links',
        title: 'Новое поколение',
        links: [
          { label: 'Dacia Logan', price: '12 880 €' },
          { label: 'Dacia Sandero', price: '13 990 €' },
          { label: 'Dacia Sandero Stepway', price: '13 880 €' },
          { label: 'Dacia Spring', price: '18 220 €' },
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
        more: { label: 'Читать больше новостей' },
      },
    ],
  },
  {
    id: 'contacts',
    label: 'Контакты',
    promo: { title: 'Контакты', linkLabel: 'Свяжитесь с нами', href: '#' },
    sections: [
      {
        kind: 'links',
        title: 'Свяжитесь с нами',
        links: [
          { label: 'Запрос информации' },
          { label: 'Запросить тест-драйв' },
          { label: 'Запросить предложение' },
          { label: 'Запись на ТО' },
        ],
      },
      {
        kind: 'links',
        title: 'Дилеры',
        links: [
          { label: 'Кишинёв' },
          { label: 'Кишинёв - Autosport SRL' },
          { label: 'Бельцы - Autosport SRL' },
          { label: 'Кагул - Integral Auto SRL' },
        ],
        more: { label: 'Подробнее' },
      },
      {
        kind: 'contacts',
        title: 'Корпоративные продажи',
        items: [
          { icon: 'user', label: 'Mladin Iulian' },
          { icon: 'phone', label: '022 205 880 , +373 (78) 300 697' },
          { icon: 'mail', label: 'iulian.mladin@dacia.md' },
          { icon: 'calendar', label: 'Пн-Пт: 09:00-19:00; Сб: 09:00-14:00' },
        ],
        more: { label: 'Подробнее' },
      },
    ],
  },
];

export const phone = { label: '022 205 860', href: 'tel:022205860' };

export const ctaLabel = 'Запросить тест-драйв';

export const searchChips = ['Часто задаваемые вопросы', 'Новые поступления', 'Финансирование', 'Трейд-ин', 'Запросить тест-драйв'];

/** Messengers in the "Выберите способ связи" panel / bottom sheet. */
export const contactChannels = ['FaceTime', 'Telegram', 'Viber', 'WhatsApp', 'Signal'];
