import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '../ui/utils';
import { OnDarkButton } from '../ui/atoms/OnDarkButton';
import { SliderControls } from '../ui/molecules/SliderControls';
import { heroSlides } from '../../data/hero';
import { useMediaQuery } from '../../hooks/useMediaQuery';

function Slide({ slide, index, count, priority }) {
  const Heading = index === 0 ? 'h1' : 'h2';
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} из ${count}`}
      className="relative h-full min-w-0 flex-[0_0_100%]"
    >
      {slide.photo ? (
        <picture>
          <source media="(orientation: portrait)" srcSet={slide.photo.portrait.srcSet} sizes="100vw" />
          <img
            src={slide.photo.landscape.src}
            srcSet={slide.photo.landscape.srcSet}
            sizes="100vw"
            alt=""
            width={2048}
            height={1721}
            fetchPriority={priority ? 'high' : 'auto'}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 size-full object-cover object-center"
          />
        </picture>
      ) : (
        // placeholder until the photo is added
        <div className="absolute inset-0 bg-gradient-to-b from-ink-13 via-ink-15 to-ink-18" />
      )}
      {/* legibility gradient under the text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Paddings: desktop 64 all round, tablet 24 sides / 32 bottom, mobile 16.
          Below xl the bullets sit under the buttons, so the text block reserves the controls plus the gaps above / below them (phones 24 / 24, tablet 32 / 32). */}
      <div className="relative flex h-full flex-col items-center justify-end px-4 pb-20 text-center md:px-6 md:pb-24 xl:items-start xl:px-16 xl:pb-16 xl:text-left">
        <Heading className="max-w-[640px] font-display text-[32px] font-bold leading-[1.15] text-surface-01 md:text-[44px] xl:text-[56px]">
          {slide.title}
        </Heading>
        <p className="mt-4 text-[14px] font-light leading-6 text-surface-01 md:mt-5 md:text-[16px]">{slide.subtitle}</p>
        {/* equal-width buttons: stacked on mobile, a two-column grid (same track width) from sm */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:inline-grid sm:w-auto sm:grid-cols-2 md:mt-10">
          <OnDarkButton size="l" variant="solid" href={slide.primary.href}>
            {slide.primary.label}
          </OnDarkButton>
          <OnDarkButton size="l" variant="outline" href={slide.secondary.href}>
            {slide.secondary.label}
          </OnDarkButton>
        </div>
      </div>
    </div>
  );
}

/**
 * Home hero: header + hero fill exactly one dynamic viewport (`100dvh - var(--site-header-h)`, the variable is
 * measured by <SiteHeader>).
 * full-width looping slider with autoplay (6s). Pauses on hover / focus,
 * is swipeable, and does not autoplay for `prefers-reduced-motion`.
 */
export function Hero({ slides = heroSlides, delay = 6000, className }) {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const plugins = React.useMemo(
    () => (reduce ? [] : [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true })]),
    [reduce, delay]
  );
  const [viewport, embla] = useEmblaCarousel({ loop: true, duration: 28 }, plugins);
  const [index, setIndex] = React.useState(0);
  const sectionRef = React.useRef(null);
  const progressRef = React.useRef(null);

  React.useEffect(() => {
    if (!embla) return undefined;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => embla.off('select', onSelect).off('reInit', onSelect);
  }, [embla]);

  // Fill the active bullet in step with the autoplay timer (only while the hero is on screen).
  // When the plugin is paused (hover / focus) `timeUntilNext()` is null and the arc just holds.
  React.useEffect(() => {
    if (!embla || reduce) return undefined;
    let raf = 0;
    const tick = () => {
      const t = embla.plugins().autoplay?.timeUntilNext?.();
      const el = progressRef.current;
      if (el && t != null) el.style.strokeDashoffset = String(Math.max(0, Math.min(100, (100 * t) / delay)));
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [embla, reduce, delay]);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Главные предложения"
      className={cn('hero-h relative min-h-[480px] overflow-hidden bg-ink-18', className)}
    >
      <div ref={viewport} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {slides.map((s, i) => (
            <Slide key={s.id} slide={s} index={i} count={slides.length} priority={i === 0} />
          ))}
        </div>
      </div>

      {/* bullets: centred under the buttons below xl, bottom-right (64px) on desktop */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 md:px-6 md:pb-8 xl:justify-end xl:px-16 xl:pb-[72px]">
        <SliderControls
          className="pointer-events-auto"
          size="l"
          progressRef={reduce ? undefined : progressRef}
          index={index}
          count={slides.length}
          onPrev={() => embla?.scrollPrev()}
          onNext={() => embla?.scrollNext()}
          onDot={(i) => embla?.scrollTo(i)}
        />
      </div>
    </section>
  );
}
