import React from 'react';
import { Hero } from '../components/sections/Hero';
import { PromoTiles } from '../components/sections/PromoTiles';
import { ModelGrid } from '../components/sections/ModelGrid';
import { ModelShowcase } from '../components/sections/ModelShowcase';
import { CompareModels } from '../components/sections/CompareModels';
import { ServiceTiles } from '../components/sections/ServiceTiles';
import { Reviews } from '../components/sections/Reviews';
import { NewsSection } from '../components/sections/NewsSection';
import { InstagramFeed } from '../components/sections/InstagramFeed';

/** Home page content (header / footer come from <SiteLayout> in App.jsx). */
export default function Home() {
  return (
    <>
      <Hero />
      <PromoTiles />
      <ModelGrid />
      <ModelShowcase />
      <CompareModels />
      <ServiceTiles />
      <Reviews />
      <NewsSection />
      <InstagramFeed />
    </>
  );
}
