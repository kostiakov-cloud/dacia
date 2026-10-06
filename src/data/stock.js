import { tr } from '../i18n';
/**
 * /stock (Авто в наличии). ALL PLACEHOLDER cars: model ids come from data/models.js, everything else is made up.
 */
const city = { chi: tr('Центральный'), bal: tr('Северный'), cah: tr('Южный') };
export const stockCities = [tr('Все'), ...Object.values(city)];

export const stockCars = [
  { id: 's1', model: 'duster', trim: 'Expression', engine: '1,3 TCe 150 EDC', color: tr('Бежевый'), year: 2026, price: 17700, city: city.chi },
  { id: 's2', model: 'duster', trim: 'Extreme', engine: '1,6 Hybrid 140', color: tr('Серый'), year: 2026, price: 20400, city: city.bal },
  { id: 's3', model: 'logan-new', trim: 'Essential', engine: '1,2 GPL', color: tr('Белый'), year: 2026, price: 12880, city: city.chi },
  { id: 's4', model: 'logan', trim: 'Essential', engine: '1,0 TCe', color: tr('Серый'), year: 2025, price: 10980, city: city.cah },
  { id: 's5', model: 'sandero', trim: 'Expression', engine: '1,0 TCe 100', color: tr('Синий'), year: 2026, price: 13990, city: city.bal },
  { id: 's6', model: 'sandero-stepway', trim: 'Extreme', engine: '1,5 dCi', color: tr('Оранжевый'), year: 2025, price: 15200, city: city.chi },
  { id: 's7', model: 'jogger', trim: 'Expression', engine: '1,5 dCi 5L', color: tr('Белый'), year: 2026, price: 18880, city: city.cah },
  { id: 's8', model: 'bigster', trim: 'Essential', engine: 'TCe 140', color: tr('Зелёный'), year: 2026, price: 20500, city: city.chi },
];
