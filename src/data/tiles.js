import { tr } from '../i18n';
/**
 * Promo tiles under the hero. `image` = { src, srcSet } (WebP in public/images); `imageClass` = object-position
 * used when the tile is cropped (wide on mobile, square from md).
 * `mobileOrder` = position in the single-column mobile layout (as in the mobile design).
 */
export const promoTiles = [
  {
    id: 'financing',
    title: tr('Финансирование'),
    text: tr('Выберите самое подходящее предложение'),
    cta: { label: tr('Узнать больше'), href: '/financing' },
    image: { src: '/images/tile-financing-640.webp', srcSet: '/images/tile-financing-640.webp 640w, /images/tile-financing-1200.webp 1200w' },
    imageClass: 'object-[50%_65%]',
    mobileOrder: 3,
  },
  {
    id: 'service',
    title: tr('Техобслуживание'),
    text: tr('Пройдите техническое обслуживание'),
    cta: { label: tr('Записаться на сервис'), href: '/service-booking' },
    image: { src: '/images/tile-service-640.webp', srcSet: '/images/tile-service-640.webp 640w, /images/tile-service-1200.webp 1200w' },
    imageClass: 'object-center',
    mobileOrder: 4,
  },
  {
    id: 'trade-in',
    title: tr('Трейд-ин'),
    text: tr('Обновите свою старую DACIA на новую'),
    cta: { label: tr('Оценить автомобиль'), href: '/trade-in' },
    image: { src: '/images/tile-trade-in-640.webp', srcSet: '/images/tile-trade-in-640.webp 640w, /images/tile-trade-in-1200.webp 1200w' },
    imageClass: 'object-bottom',
    mobileOrder: 1,
  },
  {
    id: 'test-drive',
    title: tr('Запросить тест-драйв'),
    text: tr('Попробуйте одну из моделей Dacia'),
    cta: { label: tr('Запросить тест-драйв'), href: '/test-drive' },
    image: { src: '/images/tile-test-drive-640.webp', srcSet: '/images/tile-test-drive-640.webp 640w, /images/tile-test-drive-784.webp 784w' },
    imageClass: 'object-[50%_70%]',
    mobileOrder: 2,
  },
];
