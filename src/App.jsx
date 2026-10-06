import React from 'react';
import Home from './pages/Home';
import { SiteLayout } from './components/ui/organisms/SiteLayout';
import { RouterLinks, usePath, useScrollToHash } from './router';
import { contentPages } from './data/content';
import { articleBySlug } from './data/articles';
import { models } from './data/models';
import { LANGS, tr, withLang } from './i18n';

// Secondary pages and the component showcase are lazy chunks: the home page never downloads them.
const Models = React.lazy(() => import('./pages/Models'));
const Services = React.lazy(() => import('./pages/Services'));
const ServiceBooking = React.lazy(() => import('./pages/ServiceBooking'));
const Faq = React.lazy(() => import('./pages/Faq'));
const TradeIn = React.lazy(() => import('./pages/TradeIn'));
const Financing = React.lazy(() => import('./pages/Financing'));
const Offers = React.lazy(() => import('./pages/Offers'));
const Compare = React.lazy(() => import('./pages/Compare'));
const TestDrive = React.lazy(() => import('./pages/TestDrive'));
const About = React.lazy(() => import('./pages/About'));
const OfferRequest = React.lazy(() => import('./pages/OfferRequest'));
const Showcase = React.lazy(() => import('./Showcase'));
const CookieConsent = React.lazy(() => import('./components/ui/organisms/CookieConsent'));

const Contacts = React.lazy(() => import('./pages/Contacts'));
const Dealers = React.lazy(() => import('./pages/Dealers'));
const Corporate = React.lazy(() => import('./pages/Corporate'));
const Content = React.lazy(() => import('./pages/Content'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Stock = React.lazy(() => import('./pages/Stock'));
const Calculator = React.lazy(() => import('./pages/Calculator'));
const PriceList = React.lazy(() => import('./pages/PriceList'));
const Search = React.lazy(() => import('./pages/Search'));
const News = React.lazy(() => import('./pages/News'));
const Article = React.lazy(() => import('./pages/Article'));
const ModelDetail = React.lazy(() => import('./pages/ModelDetail'));

/** `current` = nav item highlighted in the header for that page. */
const routes = {
  '/': { title: 'Dacia', element: <Home /> },
  '/models': { title: tr('Модельный ряд Dacia'), current: 'models', element: <Models /> },
  '/services': { title: tr('Сервисы и обслуживание'), current: 'services', element: <Services /> },
  '/trade-in': { title: tr('Трейд-ин'), current: 'trade-in', element: <TradeIn /> },
  '/offer-request': { title: tr('Получите предложение'), current: 'offers', element: <OfferRequest /> },
  '/about': { title: tr('Откройте для себя автомобили Dacia'), current: 'about', element: <About /> },
  '/test-drive': { title: tr('Тест-драйв'), element: <TestDrive /> },
  '/compare': { title: tr('Сравните модели DACIA'), current: 'models', element: <Compare /> },
  '/offers': { title: tr('Предложения'), current: 'offers', element: <Offers /> },
  '/financing': { title: tr('Финансирование'), current: 'offers', element: <Financing /> },
  '/faq': { title: tr('Часто задаваемые вопросы'), current: 'services', element: <Faq /> },
  '/service-booking': { title: tr('Запись на техническое обслуживание'), current: 'services', element: <ServiceBooking /> },
  '/contacts': { title: tr('Контакты'), current: 'contacts', element: <Contacts /> },
  '/dealers': { title: tr('Дилеры'), current: 'contacts', element: <Dealers /> },
  '/news': { title: tr('Новости'), current: 'about', element: <News /> },
  '/stock': { title: tr('Авто в наличии'), current: 'offers', element: <Stock /> },
  '/financing/calculator': { title: tr('Калькулятор финансирования'), current: 'offers', element: <Calculator /> },
  '/price-list': { title: tr('Скачать цены'), current: 'about', element: <PriceList /> },
  '/search': { title: tr('Поиск'), element: <Search /> },
  '/corporate': { title: tr('Корпоративные продажи'), current: 'contacts', element: <Corporate /> },
  // text pages (data/content.js)
  ...Object.fromEntries(
    Object.entries(contentPages).map(([path, p]) => [path, { title: p.title, current: p.current, element: <Content path={path} /> }])
  ),
};

/** Dynamic routes (`/models/:id`, `/news/:slug` ...) are added here; anything unknown is the 404 page. */
const notFound = { title: tr('Страница не найдена'), element: <NotFound /> };
const dynamicRoutes = [
  {
    pattern: /^\/news\/([\w-]+)$/,
    make: (m) => {
      const a = articleBySlug(m[1]);
      return a ? { title: a.title, current: 'about', element: <Article article={a} /> } : notFound;
    },
  },
  {
    pattern: /^\/models\/([\w-]+)$/,
    make: (m) => {
      const model = models.find((x) => x.id === m[1]);
      return model ? { title: `Dacia ${model.name}`, current: 'models', element: <ModelDetail model={model} /> } : notFound;
    },
  },
];

function resolve(path) {
  if (routes[path]) return routes[path];
  for (const r of dynamicRoutes) {
    const m = path.match(r.pattern);
    if (m) return r.make(m);
  }
  return notFound;
}

export default function App() {
  const path = usePath().replace(/\/+$/, '') || '/';
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useScrollToHash();
  const route = resolve(path);
  React.useEffect(() => {
    document.title = route.title;
  }, [route.title]);

  // <link rel="alternate" hreflang> for both language versions of the current page (search engines + "same page, other language")
  React.useEffect(() => {
    document.head.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());
    LANGS.forEach((l) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = window.location.origin + withLang(path + window.location.search, l);
      link.dataset.hreflang = '';
      document.head.appendChild(link);
    });
  }, [path]);

  if (hash === '#/showcase') {
    return (
      <React.Suspense fallback={null}>
        <Showcase />
      </React.Suspense>
    );
  }
  return (
    <>
      <RouterLinks />
      <React.Suspense fallback={null}>
        <CookieConsent />
      </React.Suspense>
      <SiteLayout current={route.current}>
        <React.Suspense fallback={<div className="min-h-[60vh]" />}>{route.element}</React.Suspense>
      </SiteLayout>
    </>
  );
}
