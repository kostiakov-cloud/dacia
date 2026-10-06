import React from 'react';
import { ArticlePage } from '../components/sections/ArticlePage';

export default function Article({ article }) {
  return <ArticlePage key={article.slug} article={article} />;
}
