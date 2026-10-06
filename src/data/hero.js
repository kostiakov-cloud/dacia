import { tr } from '../i18n';
/**
 * Hero slides. One slide is designed so far, its text is shared; each slide has its own photo.
 * Photos are art-directed by orientation. The cars sit on the vertical centre line of the source, so both
 * variants are centred (`object-position: 50% 50%`) and the cars stay mid-screen at any hero height.
 */
const photos = {
  // slide 1: line-up of cars on the desert road
  lineup: {
    portrait: { src: '/images/hero-p-828.webp', srcSet: '/images/hero-p-640.webp 640w, /images/hero-p-828.webp 828w, /images/hero-p-1200.webp 1200w' },
    landscape: { src: '/images/hero-l-1440.webp', srcSet: '/images/hero-l-1440.webp 1440w, /images/hero-l-2048.webp 2048w' },
  },
  // slide 2: blue Bigster from above on the coast road
  bigster: {
    portrait: { src: '/images/hero-2-p-828.webp', srcSet: '/images/hero-2-p-640.webp 640w, /images/hero-2-p-828.webp 828w, /images/hero-2-p-1200.webp 1200w' },
    landscape: { src: '/images/hero-2-l-1440.webp', srcSet: '/images/hero-2-l-1440.webp 1440w, /images/hero-2-l-2048.webp 2048w' },
  },
  // slide 3: Striker in the mountains
  striker: {
    portrait: { src: '/images/hero-3-p-828.webp', srcSet: '/images/hero-3-p-640.webp 640w, /images/hero-3-p-828.webp 828w, /images/hero-3-p-1200.webp 1200w' },
    landscape: { src: '/images/hero-3-l-1440.webp', srcSet: '/images/hero-3-l-1440.webp 1440w, /images/hero-3-l-2048.webp 2048w' },
  },
};

const slide = {
  title: tr('Осеннее предложение'),
  subtitle: tr('Модельный ряд Dacia'),
  primary: { label: tr('Посмотреть все предложения'), href: '/offers' },
  secondary: { label: tr('Запросить тест-драйв'), href: '/test-drive' },
};

export const heroSlides = [
  { id: 'autumn-1', ...slide, photo: photos.lineup },
  { id: 'autumn-2', ...slide, title: 'Dacia Bigster', photo: photos.bigster },
  { id: 'autumn-3', ...slide, title: 'Dacia Striker', photo: photos.striker },
];
