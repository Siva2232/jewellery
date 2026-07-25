import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hero, brand } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import BrandLogo from "../ui/BrandLogo";

const SLIDE_MS = 5500;

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

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

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
      className="relative overflow-hidden bg-ink lg:min-h-[100svh]"
    >
      <div className="grain !opacity-[0.05] !mix-blend-soft-light" />

      <div className="relative grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Brand panel — first on mobile, left on desktop */}
        <div className="relative z-10 order-1 flex flex-col justify-center px-5 pb-8 pt-28 sm:pt-32 md:px-10 md:pb-12 md:pt-36 lg:order-1 lg:px-12 lg:py-32 xl:px-16">
          <motion.div
            className="mx-auto w-full max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:mx-0 lg:max-w-[520px] xl:max-w-[580px]"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.15, delay: 1.9, ease: easeLuxury }}
          >
            <BrandLogo
              className="h-auto w-full"
              imgClassName="w-full drop-shadow-[0_8px_30px_rgba(201,169,110,0.25)]"
            />
            <span className="sr-only">{brand.name}</span>
          </motion.div>

          <motion.h1
            className="mx-auto mt-6 max-w-md text-center font-display text-xl leading-snug text-champagne-light/95 sm:text-2xl md:mt-8 md:text-3xl lg:mx-0 lg:mt-10 lg:text-left lg:text-[2.15rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 2.35, ease: easeLuxury }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-sm text-center text-[14px] leading-relaxed text-stone/85 sm:text-[15px] md:mt-5 md:text-base lg:mx-0 lg:mt-6 lg:text-left"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.55, ease: easeLuxury }}
          >
            {hero.subline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:mt-10 lg:mt-12 lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 2.75, ease: easeLuxury }}
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
              className="link-underline text-[11px] font-medium tracking-[0.2em] text-stone uppercase"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>
        </div>

        {/* Media carousel — second on mobile, right on desktop */}
        <div
          className="relative order-2 h-[58vw] min-h-[240px] max-h-[420px] w-full sm:h-[50vw] sm:max-h-[480px] lg:order-2 lg:h-auto lg:min-h-full lg:max-h-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0 grid h-full lg:grid-cols-[1.4fr_0.8fr]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.15, ease: easeLuxury }}
              >
                <div className="relative h-full overflow-hidden">
                  <motion.img
                    src={active.primary}
                    alt={`ORRA ${active.label} jewellery`}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.12 }}
                    animate={reduce ? { scale: 1 } : { scale: 1.04 }}
                    transition={{
                      duration: reduce ? 0.8 : SLIDE_MS / 1000 + 0.8,
                      ease: "linear",
                    }}
                  />
                </div>
                <div className="relative hidden h-full overflow-hidden lg:block">
                  <motion.img
                    src={active.secondary}
                    alt={`ORRA ${active.label} detail`}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.16, x: 24 }}
                    animate={reduce ? { scale: 1, x: 0 } : { scale: 1.06, x: 0 }}
                    transition={{
                      duration: reduce ? 0.8 : SLIDE_MS / 1000 + 1,
                      ease: easeLuxury,
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/50 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-ink/45" />

          {/* Carousel controls */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 md:p-7 lg:p-8">
            <div className="flex items-end justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.55, ease: easeLuxury }}
                    className="mb-2.5 text-[9px] font-medium tracking-[0.28em] text-champagne-light uppercase sm:mb-3 sm:text-[10px] sm:tracking-[0.32em]"
                  >
                    {active.label}
                  </motion.p>
                </AnimatePresence>

                <div className="flex max-w-[11rem] gap-1.5 sm:max-w-xs sm:gap-2">
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
              </div>

              <div className="flex shrink-0 items-center gap-2 text-porcelain sm:gap-3">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => goTo(index - 1)}
                  className="flex h-9 w-9 items-center justify-center border border-porcelain/25 text-sm transition-colors duration-400 hover:border-champagne hover:text-champagne sm:h-10 sm:w-10"
                >
                  ←
                </button>
                <span className="min-w-[3rem] text-center font-display text-base tracking-wide sm:min-w-[3.5rem] sm:text-lg">
                  <span className="text-champagne-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1 text-porcelain/35">/</span>
                  <span className="text-porcelain/55">
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => goTo(index + 1)}
                  className="flex h-9 w-9 items-center justify-center border border-porcelain/25 text-sm transition-colors duration-400 hover:border-champagne hover:text-champagne sm:h-10 sm:w-10"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
