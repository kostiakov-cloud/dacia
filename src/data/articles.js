import { news } from './news';

/**
 * News articles (/news, /news/:slug). The first five are the home-page news (same ids -> same photos / video); the rest are
 * PLACEHOLDER stories. Body texts are placeholders - replace with the real publications.
 */
const img = (id) => news.find((n) => n.id === id)?.image ?? null;
/** Stories without their own photo reuse the /about feature pictures (public/images/about). */
const aboutImg = (n) => ({ src: `/images/about/feature-${n}.webp` });
const lorem = [
  'Dacia продолжает развивать модельный ряд, делая ставку на честную цену, надёжность и простоту. Новые решения направлены на то, чтобы автомобиль был доступен как можно большему числу семей.',
  'Особое внимание уделяется безопасности и экономичности владения: расход топлива, стоимость обслуживания и срок службы остаются главными аргументами бренда.',
  'Подробности о комплектациях, ценах и сроках поступления в салоны уточняйте у менеджеров или на странице модели.',
];

export const articles = [
  { slug: 'premiere-suv', date: '17 июня 2026', title: 'Премьера, которая меняет правила игры в сегменте доступных SUV', excerpt: 'Dacia представляет премьеру даже по меркам мировой автомобильной индустрии.', image: img('premiere-suv'), body: ['В 2025 году Dacia представляет премьеру даже по меркам мировой автомобильной индустрии: запускает первую в мире систему, которая делает автомобиль ещё доступнее.', ...lorem] },
  { slug: 'new-generation', date: '3 апреля 2026', title: 'Новое поколение Dacia', excerpt: 'Обновлённый дизайн, новая платформа и расширенная линейка двигателей.', image: aboutImg(1), body: lorem },
  { slug: 'ecorun', date: '29 сентября 2025', title: 'DACIA — ген. партнер соревнований EcoRun', excerpt: 'Новая Dacia Duster стала официальным автомобилем соревнований по экономичности.', image: img('ecorun'), body: ['Новая Dacia Duster стала официальным автомобилем соревнований EcoRun, где участники соревнуются в экономичности и бережном отношении к природе.', ...lorem] },
  { slug: 'duster-offroad', date: '12 августа 2025', title: 'Dacia Duster на бездорожье', excerpt: 'Испытания полного привода в горах: репортаж с тестовой трассы.', image: img('duster-offroad'), body: lorem },
  { slug: 'iaa-2021', date: '13 сентября 2021', title: 'Мировая премьера DACIA на IAA MOBILITY 2021 в Мюнхене', excerpt: 'Бренд впервые представил многоцелевую семейную модель на 7 мест.', image: img('iaa-2021'), videoUrl: 'https://www.youtube.com/watch?v=PHZsROeZN7E', body: ['Бренд Dacia примет участие в Международном автосалоне в Мюнхене в 2021 году и впервые в мире представит многоцелевую семейную модель на 7 мест.', ...lorem] },
  { slug: 'jogger-hybrid', date: '20 мая 2025', title: 'Jogger Hybrid: семейный универсал на 7 мест с гибридом', excerpt: 'Больше места и меньше расход — гибридная версия уже в салонах.', image: aboutImg(2), body: lorem },
  { slug: 'service-days', date: '2 марта 2025', title: 'Дни сервиса: бесплатная диагностика весной', excerpt: 'Проверьте подвеску, тормоза и климат-систему перед сезоном.', image: aboutImg(3), body: lorem },
  { slug: 'trade-in-spring', date: '15 января 2025', title: 'Трейд-ин: повышенная оценка старого автомобиля', excerpt: 'До конца квартала действует бонус при обмене на новую Dacia.', image: aboutImg(4), body: lorem },
];

export const articleBySlug = (slug) => articles.find((a) => a.slug === slug);
