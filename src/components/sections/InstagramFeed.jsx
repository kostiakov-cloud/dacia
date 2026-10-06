import React from 'react';
import { cn } from '../ui/utils';
import { InstagramTile } from '../ui/molecules/InstagramTile';
import { instagramPosts, instagramProfile } from '../../data/instagram';
import { reveal } from '../../reveal';

/**
 * Instagram strip, edge to edge (no heading, no button - as in the design): ONE row of portrait (4:5) tiles with 2px
 * gaps - 6 tiles from tablet up, the first 3 on phones. It sits between the news and the benefits strip.
 * Data: src/data/instagram.js (static now, feed-ready shape).
 */
export function InstagramFeed({ posts = instagramPosts, profile = instagramProfile, className }) {
  return (
    <section aria-labelledby="instagram-title" className={cn('bg-surface-03', className)}>
      <h2 id="instagram-title" className="sr-only">
        {profile.title}
      </h2>
      <div className="grid grid-cols-3 gap-0.5 md:grid-cols-6">
        {posts.map((p, i) => (
          <InstagramTile key={p.id} {...p} className={i >= 3 ? 'max-md:hidden' : undefined} {...reveal('fade', (i % 6) * 80)} />
        ))}
      </div>
    </section>
  );
}
