import { tr } from '../i18n';
/** /contacts and /corporate content (phones / e-mail / address are PLACEHOLDERS, same style as the rest of the site). */
export const contactInfo = {
  phone: { label: '020 7946 0958', href: 'tel:+442079460958' },
  email: { label: 'info@example.com', href: 'mailto:info@example.com' },
  address: tr('Центральный район, ул. Примерная, 100'),
  hours: tr('Пн–Пт: 09:00–19:00; Сб: 09:00–14:00'),
  map: '#',
};

export const contactTopics = [tr('Общий вопрос'), tr('Покупка автомобиля'), tr('Сервис и запчасти'), tr('Финансирование'), tr('Другое')];

export const contactConsent = [
  tr('Отправляя форму, я даю согласие на обработку моих персональных данных, указанных в обращении, в целях подготовки ответа в соответствии с применимым законодательством о защите персональных данных.'),
  tr('Согласие можно отозвать в любой момент письменным заявлением.'),
];

export const corporate = {
  manager: { name: tr('Иван Примеров'), phone: '+44 20 7946 0501, +44 20 7946 0502', email: 'corporate@example.com', hours: tr('Пн–Пт: 09:00–19:00; Сб: 09:00–14:00') },
  benefits: [
    tr('Индивидуальные условия для автопарков от 3 автомобилей'),
    tr('Лизинг и финансирование для юридических лиц'),
    tr('Сервисное обслуживание парка с приоритетной записью'),
    tr('Выделенный менеджер и единый счёт'),
  ],
  fleet: [tr('1–2 автомобиля'), tr('3–9 автомобилей'), tr('10–49 автомобилей'), tr('50 и более')],
};
