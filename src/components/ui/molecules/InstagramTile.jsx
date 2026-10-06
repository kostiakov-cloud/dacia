import React from 'react';
import { Play } from 'lucide-react';
import { cn } from '../utils';
import instagramIcon from '../../../assets/footer/instagram.svg';
import { tr } from '../../../i18n';

/**
 * Portrait (4:5) Instagram post tile: photo (gradient placeholder without `image`), on hover / keyboard focus a dark veil
 * with the Instagram glyph fades in and the photo zooms slowly. Opens the post in a new tab.
 */
export function InstagramTile({ href = '#', alt = '', image, video = false, className, id: _id, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tr('{alt} (открыть в Instagram)', { alt })}
      {...rest}
      className={cn(
        'group relative isolate block aspect-[4/5] overflow-hidden bg-ink-18 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-surface-01',
        className
      )}
    >
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 768px) 16.7vw, 33vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08]"
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-14 to-ink-19 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]" />
      )}
      {video && (
        <span aria-hidden className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-cr2 bg-black/60 text-surface-01">
          <Play size={12} fill="currentColor" strokeWidth={0} />
        </span>
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-black/45 group-hover:opacity-100 group-focus-visible:bg-black/45 group-focus-visible:opacity-100">
        <img src={instagramIcon} alt="" width={32} height={32} className="size-5 translate-y-2 md:size-8 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0" />
      </span>
    </a>
  );
}
