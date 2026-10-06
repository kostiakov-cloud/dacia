/**
 * Dealers. ALL PLACEHOLDERS: abstract names / regions, made-up addresses, phones (reserved fictional +44 20 7946 range) and example.com e-mails.
 * `city` drives the filter. `services`: what the dealer offers. `map` = link opened by "Маршрут" ('#' until real).
 */
export const dealers = [
  {
    id: 'center-main',
    city: 'Центральный',
    name: 'Dacia Центр',
    address: 'Центральный район, ул. Примерная, 100',
    phones: ['+44 20 7946 0101', '+44 20 7946 0102'],
    email: 'center@example.com',
    hours: 'Пн–Пт: 09:00–19:00; Сб: 09:00–14:00',
    services: ['Продажи', 'Сервис', 'Запчасти'],
    map: '#',
  },
  {
    id: 'center-partner',
    city: 'Центральный',
    name: 'Dacia Центр — Альфа Авто',
    address: 'Центральный район, ул. Образцовая, 250',
    phones: ['+44 20 7946 0201'],
    email: 'alfa@example.com',
    hours: 'Пн–Пт: 08:30–18:30; Сб: 09:00–13:00',
    services: ['Продажи', 'Сервис'],
    map: '#',
  },
  {
    id: 'north-partner',
    city: 'Северный',
    name: 'Dacia Север — Бета Мотор',
    address: 'Северный район, ул. Тестовая, 12',
    phones: ['+44 20 7946 0301'],
    email: 'north@example.com',
    hours: 'Пн–Пт: 09:00–18:00; Сб: 09:00–13:00',
    services: ['Продажи', 'Сервис'],
    map: '#',
  },
  {
    id: 'south-partner',
    city: 'Южный',
    name: 'Dacia Юг — Гамма Авто',
    address: 'Южный район, ул. Условная, 45',
    phones: ['+44 20 7946 0401'],
    email: 'south@example.com',
    hours: 'Пн–Пт: 09:00–18:00',
    services: ['Продажи', 'Сервис'],
    map: '#',
  },
];

export const dealerCities = ['Все', ...new Set(dealers.map((d) => d.city))];
