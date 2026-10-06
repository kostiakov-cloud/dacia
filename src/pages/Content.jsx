import React from 'react';
import { ContentPage } from '../components/sections/ContentPage';
import { contentPages } from '../data/content';

/** Generic text page, picked by path (see routes in App.jsx). */
export default function Content({ path }) {
  return <ContentPage page={contentPages[path]} />;
}
