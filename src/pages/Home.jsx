import React from 'react';
import { SiteHeader } from '../components/ui/organisms/SiteHeader';
import { Footer } from '../components/ui/Footer';
import { Hero } from '../components/sections/Hero';
import { PromoTiles } from '../components/sections/PromoTiles';
import { ModelGrid } from '../components/sections/ModelGrid';
import { ModelShowcase } from '../components/sections/ModelShowcase';
import { CompareModels } from '../components/sections/CompareModels';
import { ServiceTiles } from '../components/sections/ServiceTiles';
import { Reviews } from '../components/sections/Reviews';
import { ScrollToTop } from '../components/ui/molecules/ScrollToTop';

/** Home page. Sections are added one by one below the header (hero, tiles, models, ...). */
export default function Home() {
  return (
    <div className="min-h-screen bg-surface-01 font-sans text-dacia-text-secondary">
      <SiteHeader />
      <main id="main">
        <Hero />
        <PromoTiles />
        <ModelGrid />
        <ModelShowcase />
        <CompareModels />
        <ServiceTiles />
        <Reviews />
        {/* placeholder until the hero and the sections are built */}
        <div className="flex min-h-[400px] items-start justify-center bg-surface-03 px-6 pt-24 text-center">
          <p className="font-display text-[28px] font-bold leading-9 text-dacia-text-tertiary">Следующие секции — следующие шаги</p>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
