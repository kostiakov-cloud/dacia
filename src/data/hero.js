/**
 * Hero slides. Only one slide is designed so far, so it is repeated three times.
 * Photos are art-directed by orientation. The cars sit on the vertical centre line of the source, so both
 * variants are centred (`object-position: 50% 50%`) and the cars stay mid-screen at any hero height.
 */
const photo = {
  // portrait screens (phones, tablets held upright): the full vertical frame
  portrait: {
    src: '/images/hero-p-828.webp',
    srcSet: '/images/hero-p-640.webp 640w, /images/hero-p-828.webp 828w, /images/hero-p-1200.webp 1200w',
  },
  // landscape screens: a crop centred on the cars
  landscape: {
    src: '/images/hero-l-1440.webp',
    srcSet: '/images/hero-l-1440.webp 1440w, /images/hero-l-2048.webp 2048w',
  },
};

const slide = {
  title: 'Осеннее предложение',
  subtitle: 'Модельный ряд Dacia',
  primary: { label: 'Посмотреть все предложения', href: '#' },
  secondary: { label: 'Запросить тест-драйв', href: '#' },
  photo,
};

export const heroSlides = [
  { id: 'autumn-1', ...slide },
  { id: 'autumn-2', ...slide },
  { id: 'autumn-3', ...slide },
];
