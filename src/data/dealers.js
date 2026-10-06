import { tr } from '../i18n';
/**
 * Dealers. ALL PLACEHOLDERS: abstract names / regions, made-up addresses, phones (reserved fictional +44 20 7946 range) and example.com e-mails.
 * `city` drives the filter. `services`: what the dealer offers. `map` = link opened by "Маршрут" ('#' until real).
 */
export const dealers = [
  {
    id: 'center-main',
    city: tr('Центральный'),
    name: tr('Dacia Центр'),
    address: tr('Центральный район, ул. Примерная, 100'),
    phones: ['+44 20 7946 0101', '+44 20 7946 0102'],
    email: 'center@example.com',
    hours: tr('Пн–Пт: 09:00–19:00; Сб: 09:00–14:00'),
    services: [tr('Продажи'), tr('Сервис'), tr('Запчасти')],
    map: '#',
  },
  {
    id: 'center-partner',
    city: tr('Центральный'),
    name: tr('Dacia Центр — Альфа Авто'),
    address: tr('Центральный район, ул. Образцовая, 250'),
    phones: ['+44 20 7946 0201'],
    email: 'alfa@example.com',
    hours: tr('Пн–Пт: 08:30–18:30; Сб: 09:00–13:00'),
    services: [tr('Продажи'), tr('Сервис')],
    map: '#',
  },
  {
    id: 'north-partner',
    city: tr('Северный'),
    name: tr('Dacia Север — Бета Мотор'),
    address: tr('Северный район, ул. Тестовая, 12'),
    phones: ['+44 20 7946 0301'],
    email: 'north@example.com',
    hours: tr('Пн–Пт: 09:00–18:00; Сб: 09:00–13:00'),
    services: [tr('Продажи'), tr('Сервис')],
    map: '#',
  },
  {
    id: 'south-partner',
    city: tr('Южный'),
    name: tr('Dacia Юг — Гамма Авто'),
    address: tr('Южный район, ул. Условная, 45'),
    phones: ['+44 20 7946 0401'],
    email: 'south@example.com',
    hours: tr('Пн–Пт: 09:00–18:00'),
    services: [tr('Продажи'), tr('Сервис')],
    map: '#',
  },
];

export const dealerCities = [tr('Все'), ...new Set(dealers.map((d) => d.city))];
