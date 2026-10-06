import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';

/** Extracts the 11-char YouTube id from a watch / youtu.be / embed / shorts URL (or returns a bare id). */
export function youtubeId(url = '') {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return m ? m[1] : /^[\w-]{11}$/.test(url) ? url : null;
}

/**
 * Lightbox for a YouTube video. The iframe exists only while the modal is open (privacy-friendly
 * youtube-nocookie domain, autoplay), so the page itself loads no YouTube code. Esc / backdrop / X close it,
 * body scroll is locked and focus returns to the opener.
 */
export function VideoModal({ open, url, title = 'Видео', onClose }) {
  const id = youtubeId(url);
  const closeRef = React.useRef(null);
  const opener = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    opener.current = document.activeElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      opener.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !id) return null;
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-alpha-d-80 backdrop-blur-[20px]" />
      <div className={cn('relative aspect-video w-full max-w-[1100px] overflow-hidden rounded-cr2 bg-black')}>
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
      <button
        ref={closeRef}
        type="button"
        aria-label="Закрыть видео"
        onClick={onClose}
        className="absolute right-4 top-4 flex size-10 items-center justify-center text-surface-01 transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-01 md:right-8 md:top-8"
      >
        <X size={32} strokeWidth={1.5} />
      </button>
    </div>,
    document.body
  );
}
