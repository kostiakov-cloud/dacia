/**
 * /offers page. Texts / prices are from the design mock (descriptions of the first row are partly placeholders).
 * `model` = id in data/models.js (the photo comes from the shared model registry). `priceFiles` feed the «Прайс-лист» menu.
 */
export const offersIntro = { title: 'Предложения' };

export const offerTabs = [{ id: 'autumn', label: 'Осеннее предложение' }];

const priceFiles = [
  { label: 'Скачать прайс-лист (PDF)', href: '/price-list' },
  { label: 'Комплектации и цены', href: '/price-list#trims' },
];

export const offers = [
  {
    id: 'duster',
    model: 'duster',
    title: 'Duster',
    price: '17,700€',
    text: 'Dacia Duster переосмысливает дух приключений благодаря высокому дорожному просвету и современным технологиям помощи водителю. Надёжный внедорожник, созданный для тех, кто стремится к полной свободе независимо от маршрута.',
    idealFor: 'Любителей приключений, активных семей и профессионалов, которым нужна безопасная мобильность на любом типе дороги.',
    priceFiles,
  },
  {
    id: 'logan',
    model: 'logan-new',
    title: 'LOGAN',
    price: '10,980€',
    text: 'Элегантный и экономичный, Dacia Logan предлагает идеальный баланс между комфортом, просторным салоном и низким расходом топлива. Умное решение для повседневной мобильности с дополнительной долей утончённости.',
    idealFor: 'Бизнеса, ежедневных поездок и семей, которые ищут надёжный и экономичный седан.',
    priceFiles,
  },
  {
    id: 'sandero',
    model: 'sandero',
    title: 'Sandero',
    price: '13,880€',
    text: 'Dacia Sandero впечатляет современным дизайном, интуитивной связью и отличной управляемостью. Современный хэтчбек, идеально адаптированный к городскому образу жизни.',
    idealFor: 'Молодых профессионалов, города и динамичного ежедневного использования.',
    priceFiles,
  },
  {
    id: 'bigster',
    model: 'bigster',
    title: 'Bigster',
    price: '20,500€',
    text: 'Новый Dacia Bigster придаёт больше статуса благодаря внушительным размерам, просторному салону и эффективным двигателям. Идеальный выбор для тех, кто ищет премиальный комфорт и расширенную универсальность.',
    idealFor: 'Больших семей, премиального бизнеса и тех, кто хочет пространство и статус в современном SUV.',
    priceFiles,
  },
  {
    id: 'jogger',
    model: 'jogger',
    title: 'Jogger',
    price: '18,800€',
    text: 'Просторный и гибкий, Dacia Jogger — идеальный партнёр для семьи и путешествий. До 7 мест и отличная модульность для любых планов.',
    idealFor: 'Семей, ежедневных поездок и поездок на выходные.',
    priceFiles,
  },
];

/** key for ?model= on /offer-request */
export const offerRequestKey = { duster: 'duster', logan: 'logan', sandero: 'sandero', bigster: 'bigster', jogger: 'jogger' };

export const offerLabels = { priceList: 'Прайс-лист', stock: 'Авто в наличии', get: 'Получить предложение', special: 'Спец. цена от:', idealFor: 'Идеально для:' };
