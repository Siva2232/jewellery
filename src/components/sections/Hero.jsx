import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { brand, hero } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";

const SLIDE_MS = 6000;

export default function Hero() {
  const ref = useRef(null);
  const touchX = useRef(null);
  const reduce = useReducedMotion();

  const slides = hero.slides?.length
    ? hero.slides
    : [
        {
          id: "default",
          label: "Signature",
          primary: hero.image,
          secondary: hero.imageAlt,
        },
      ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = slides[index];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const goTo = useCallback(
    (next) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return undefined;
    const t = setInterval(() => goTo(index + 1), SLIDE_MS);
    return () => clearInterval(t);
  }, [index, paused, reduce, slides.length, goTo]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) < 48) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Full-bleed media — single plane */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: easeLuxury }}
          >
            <motion.img
              src={active.primary}
              alt={`ORRA ${active.label} jewellery`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: reduce ? 1 : 1.05 }}
              transition={{
                duration: reduce ? 0.9 : SLIDE_MS / 1000 + 1.2,
                ease: "linear",
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Atmosphere — readability without covering the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,169,110,0.12),transparent_55%)]"
      />
      <div className="grain !opacity-[0.045] !mix-blend-soft-light" />

      {/* Single composition content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-12 md:px-12 md:pb-14 lg:px-16 lg:pb-16 xl:px-20"
        style={
          reduce
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: easeLuxury }}
              className="text-[10px] tracking-[0.32em] text-champagne-light uppercase sm:text-[11px]"
            >
              {brand.descriptor}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: easeLuxury }}
              className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-porcelain text-balance sm:text-5xl md:mt-5 md:text-6xl lg:text-[4.25rem]"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.75, ease: easeLuxury }}
              className="mt-4 max-w-md text-sm leading-relaxed text-stone/90 sm:mt-5 sm:text-[15px] md:text-base"
            >
              {hero.subline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: easeLuxury }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <a
                href={hero.ctaHref}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(hero.ctaHref);
                }}
                className="btn-luxe-light group"
              >
                <span>{hero.cta}</span>
                <span className="ml-3 inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={hero.secondaryCtaHref}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(hero.secondaryCtaHref);
                }}
                className="btn-luxe-light"
              >
                {hero.secondaryCta}
              </a>
            </motion.div>
          </div>

          {/* Slide controls — quiet, one side */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.05, ease: easeLuxury }}
            className="flex w-full max-w-xs flex-col gap-4 lg:items-end"
          >
            <div className="flex items-center gap-4 lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.45, ease: easeLuxury }}
                  className="text-[10px] tracking-[0.28em] text-champagne-light uppercase"
                >
                  {active.label}
                </motion.p>
              </AnimatePresence>
              <span className="font-display text-sm tracking-wide text-porcelain/80">
                <span className="text-champagne-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mx-1 text-porcelain/30">/</span>
                <span className="text-porcelain/45">
                  {String(slides.length).padStart(2, "0")}
                </span>
              </span>
            </div>

            <div className="flex w-full max-w-[14rem] gap-1.5 lg:ml-auto">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="relative h-[2px] flex-1 overflow-hidden bg-porcelain/20"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-champagne"
                    initial={false}
                    animate={{
                      width:
                        i < index ? "100%" : i === index ? "100%" : "0%",
                    }}
                    transition={
                      i === index && !paused && !reduce
                        ? { duration: SLIDE_MS / 1000, ease: "linear" }
                        : { duration: 0.45, ease: easeLuxury }
                    }
                    key={`${slide.id}-${i === index ? index : "idle"}-${paused}`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:justify-end">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => goTo(index - 1)}
                className="flex h-10 w-10 items-center justify-center border border-porcelain/25 text-sm text-porcelain transition-colors duration-400 hover:border-champagne hover:text-champagne"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => goTo(index + 1)}
                className="flex h-10 w-10 items-center justify-center border border-porcelain/25 text-sm text-porcelain transition-colors duration-400 hover:border-champagne hover:text-champagne"
              >
                →
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
