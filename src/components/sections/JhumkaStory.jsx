import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { jhumkaStory } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";
import GoldDust from "../ui/GoldDust";

function parsePercent(value) {
  return Number.parseFloat(String(value).replace("%", "")) || 50;
}

export default function JhumkaStory() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const story = jhumkaStory;
  const earX = parsePercent(story.earAnchor.x);
  const earY = parsePercent(story.earAnchor.y);
  const [burstKey, setBurstKey] = useState(0);
  const [denseDust, setDenseDust] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDenseDust(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    if (v >= 0.66 && v < 0.78) {
      setBurstKey((k) => (k === 0 ? 1 : k));
    } else if (v < 0.6) {
      setBurstKey((k) => (k === 0 ? k : 0));
    }
  });

  // Intro copy: visible early, fades as travel begins
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28],
    reduce ? [0, 0, 0] : [1, 1, 0]
  );
  const introY = useTransform(
    scrollYProgress,
    [0, 0.28],
    reduce ? [0, 0] : [0, -24]
  );

  // Portrait reveals mid-scroll
  const portraitOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.38, 1],
    reduce ? [1, 1, 1] : [0, 1, 1]
  );
  const portraitScale = useTransform(
    scrollYProgress,
    [0.2, 0.55, 0.75, 1],
    reduce ? [1, 1, 1, 1] : [1.08, 1.04, 1.02, 0.96]
  );

  // Background warmth
  const stageWarmth = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduce ? [0.2, 0.55, 0.55] : [0, 0.55, 0.7]
  );

  // Jhumka path within portrait frame: center → curve → ear
  const jhumkaX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.55, 0.68],
    reduce
      ? [`${earX}%`, `${earX}%`, `${earX}%`, `${earX}%`, `${earX}%`]
      : ["50%", "38%", "52%", `${earX - 3}%`, `${earX}%`]
  );
  const jhumkaY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.55, 0.68],
    reduce
      ? [`${earY}%`, `${earY}%`, `${earY}%`, `${earY}%`, `${earY}%`]
      : ["42%", "28%", "32%", `${earY - 3}%`, `${earY}%`]
  );
  const jhumkaRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.68],
    reduce ? [0, 0, 0, 0] : [-6, 12, -8, 2]
  );
  const jhumkaScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.68, 1],
    reduce ? [0.28, 0.28, 0.28, 0.28, 0.24] : [0.95, 0.85, 0.48, 0.26, 0.22]
  );

  // Trail sparks follow slightly behind
  const trailOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.35, 0.55, 0.65],
    reduce ? [0, 0, 0, 0] : [0, 0.7, 0.5, 0]
  );
  const trailX = useTransform(jhumkaX, (x) => {
    const n = parsePercent(x);
    return `${n - 4}%`;
  });
  const trailY = useTransform(jhumkaY, (y) => {
    const n = parsePercent(y);
    return `${n + 5}%`;
  });

  // Settle sparkle + shine
  const settleOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.7, 0.82],
    reduce ? [0, 0.6, 0] : [0, 1, 0]
  );

  // Finale branding
  const finaleOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.82, 1],
    reduce ? [1, 1, 1] : [0, 1, 1]
  );
  const finaleY = useTransform(
    scrollYProgress,
    [0.72, 0.88],
    reduce ? [0, 0] : [28, 0]
  );

  const settleLineOpacity = useTransform(
    scrollYProgress,
    [0.62, 0.72, 0.82],
    reduce ? [0, 0, 0] : [0, 1, 0]
  );

  const go = (href) => {
    scrollToId(href);
  };

  return (
    <section
      id="jhumka-story"
      ref={ref}
      className="relative h-[200vh] md:h-[260vh] lg:h-[280vh]"
      aria-label="Jhumka scroll story"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-porcelain">
        {/* Soft luxury backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#fbf9f6_0%,#f6f2ec_45%,#e6dfd4_100%)]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,169,110,0.28),transparent_55%)]"
          style={{ opacity: stageWarmth }}
        />
        <div className="grain !opacity-[0.035]" />

        <GoldDust dense={denseDust} />

        {/* Shared portrait frame — girl + jhumka dock share the same box */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <motion.div
            className="relative h-[78%] w-[min(92vw,420px)] sm:h-[82%] sm:w-[min(70vw,520px)] md:w-[min(52vw,560px)]"
            style={{ scale: portraitScale }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ opacity: portraitOpacity }}
            >
              <img
                src={story.portrait}
                alt={story.portraitAlt}
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-porcelain/50 via-transparent to-porcelain/20" />
            </motion.div>

            {/* Sparkle trail (portrait-relative) */}
            <motion.div
              className="pointer-events-none absolute z-[3] -translate-x-1/2 -translate-y-1/2"
              style={{ left: trailX, top: trailY, opacity: trailOpacity }}
              aria-hidden
            >
              <span className="absolute h-1 w-1 rounded-full bg-champagne-light/80 shadow-[0_0_8px_rgba(221,196,154,0.9)]" />
              <span className="absolute left-3 top-2 h-0.5 w-0.5 rounded-full bg-champagne/70" />
              <span className="absolute -left-2 top-4 h-1 w-1 rounded-full bg-champagne-deep/50" />
            </motion.div>

            {/* Floating jhumka → settles on ear (origin at stud / top) */}
            <motion.div
              className="pointer-events-none absolute z-[4] will-change-transform drop-shadow-[0_16px_36px_rgba(168,135,76,0.35)]"
              style={{
                left: jhumkaX,
                top: jhumkaY,
                x: "-50%",
                rotate: jhumkaRotate,
                scale: jhumkaScale,
                transformOrigin: "50% 8%",
              }}
            >
              <div className="relative">
                {!reduce && (
                  <motion.div
                    className="absolute inset-[-8%] rounded-full bg-champagne/10"
                    animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  />
                )}
                <img
                  src={story.jhumka}
                  alt={story.jhumkaAlt}
                  className="relative h-[min(48vw,260px)] w-auto max-w-[min(42vw,220px)] object-contain mix-blend-lighten drop-shadow-[0_18px_40px_rgba(20,17,15,0.35)] sm:h-[280px] sm:max-w-[240px] md:h-[320px] md:max-w-[280px]"
                  draggable={false}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ opacity: settleOpacity }}
                  aria-hidden
                >
                  <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-champagne-light/40 to-transparent animate-gold-shine" />
                </motion.div>
              </div>
            </motion.div>

            {/* Settle sparkle at ear */}
            <motion.div
              className="pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${earX}%`,
                top: `${earY}%`,
                opacity: settleOpacity,
              }}
              aria-hidden
            >
              {burstKey > 0 && (
                <span
                  key={burstKey}
                  className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/40 animate-sparkle-burst"
                />
              )}
              <span className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne-light shadow-[0_0_12px_rgba(221,196,154,1)]" />
              <span className="absolute left-4 top-[-10px] h-1 w-1 rounded-full bg-champagne" />
              <span className="absolute left-[-14px] top-3 h-1.5 w-1.5 rounded-full bg-champagne-light/90" />
              <span className="absolute left-2 top-5 h-1 w-1 rounded-full bg-champagne-deep/80" />
            </motion.div>
          </motion.div>
        </div>

        {/* Settle line */}
        <motion.p
          className="pointer-events-none absolute inset-x-0 bottom-[22%] z-[6] text-center font-display text-xl text-ink/80 md:text-2xl"
          style={{ opacity: settleLineOpacity }}
        >
          {story.settleLine}
        </motion.p>

        {/* Intro copy */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[6] flex flex-col items-center px-5 pb-16 text-center md:pb-20"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p className="eyebrow mb-4">{story.eyebrow}</p>
          <h2 className="max-w-xl font-display text-4xl leading-tight text-ink text-balance sm:text-5xl md:text-6xl">
            {story.headline}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted md:text-base">
            {story.line}
          </p>
          <p className="mt-8 text-[10px] tracking-[0.28em] text-champagne-deep uppercase">
            Scroll to continue
          </p>
        </motion.div>

        {/* Finale branding + CTAs */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[7] flex flex-col items-center px-5 pb-14 text-center md:pb-16"
          style={{ opacity: finaleOpacity, y: finaleY }}
        >
          <p className="text-[11px] font-medium tracking-[0.32em] text-champagne-deep uppercase">
            {story.brandLine}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={story.cta.href}
              onClick={(e) => {
                e.preventDefault();
                go(story.cta.href);
              }}
              className="btn-luxe-fill min-w-[11rem]"
            >
              {story.cta.label}
            </a>
            <a
              href={story.secondaryCta.href}
              onClick={(e) => {
                e.preventDefault();
                go(story.secondaryCta.href);
              }}
              className="btn-luxe-ghost min-w-[11rem] border-ink/15 bg-porcelain/70"
            >
              {story.secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
