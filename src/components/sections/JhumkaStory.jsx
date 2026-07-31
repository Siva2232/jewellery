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
  const [burstKey, setBurstKey] = useState(0);
  const [denseDust, setDenseDust] = useState(false);

  // One anchor for all screens — portrait frame is locked to girl.png aspect.
  const earX = parsePercent(story.earAnchor.x);
  const earY = parsePercent(story.earAnchor.y);
  const studX = parsePercent(story.studOrigin?.x ?? "50%");
  const studY = parsePercent(story.studOrigin?.y ?? "21.5%");

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

  const portraitOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.38, 1],
    reduce ? [1, 1, 1] : [0, 1, 1]
  );
  const portraitScale = useTransform(
    scrollYProgress,
    [0.2, 0.55, 0.75, 1],
    reduce ? [1, 1, 1, 1] : [1.06, 1.03, 1.01, 1]
  );

  const stageWarmth = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduce ? [0.2, 0.55, 0.55] : [0, 0.55, 0.7]
  );

  // Path ends exactly on the piercing; studOrigin keeps the stud on that point.
  const jhumkaX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.55, 0.68],
    reduce
      ? [`${earX}%`, `${earX}%`, `${earX}%`, `${earX}%`, `${earX}%`]
      : ["50%", "38%", "52%", `${earX - 2.5}%`, `${earX}%`]
  );
  const jhumkaY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.55, 0.68],
    reduce
      ? [`${earY}%`, `${earY}%`, `${earY}%`, `${earY}%`, `${earY}%`]
      : ["42%", "28%", "32%", `${earY - 2.5}%`, `${earY}%`]
  );
  const jhumkaRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.68],
    reduce ? [0, 0, 0, 0] : [-6, 12, -8, 1]
  );
  const jhumkaScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.68, 1],
    reduce ? [0.3, 0.3, 0.3, 0.3, 0.26] : [0.92, 0.82, 0.46, 0.28, 0.26]
  );

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

  const settleOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.7, 0.82],
    reduce ? [0, 0.6, 0] : [0, 1, 0]
  );

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#fbf9f6_0%,#f6f2ec_45%,#e6dfd4_100%)]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,169,110,0.28),transparent_55%)]"
          style={{ opacity: stageWarmth }}
        />
        <div className="grain !opacity-[0.035]" />

        <GoldDust dense={denseDust} />

        {/* Fixed 2:3 frame (= girl.png) so ear % stays on the piercing on every phone */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center px-4 pt-14 pb-28 sm:pb-24 md:pt-16 md:pb-20">
          <motion.div
            className="relative aspect-[2/3] h-auto max-h-full w-full max-w-[min(92vw,420px)] sm:max-w-[min(70vw,520px)] md:max-w-[min(52vw,560px)]"
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-porcelain/45 via-transparent to-porcelain/15" />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute z-[3] -translate-x-1/2 -translate-y-1/2"
              style={{ left: trailX, top: trailY, opacity: trailOpacity }}
              aria-hidden
            >
              <span className="absolute h-1 w-1 rounded-full bg-champagne-light/80 shadow-[0_0_8px_rgba(221,196,154,0.9)]" />
              <span className="absolute left-3 top-2 h-0.5 w-0.5 rounded-full bg-champagne/70" />
              <span className="absolute -left-2 top-4 h-1 w-1 rounded-full bg-champagne-deep/50" />
            </motion.div>

            {/* Stud origin pinned to earAnchor — works at every scale */}
            <motion.div
              className="pointer-events-none absolute z-[4] will-change-transform drop-shadow-[0_12px_28px_rgba(168,135,76,0.4)]"
              style={{
                left: jhumkaX,
                top: jhumkaY,
                x: `-${studX}%`,
                y: `-${studY}%`,
                rotate: jhumkaRotate,
                scale: jhumkaScale,
                transformOrigin: `${studX}% ${studY}%`,
              }}
            >
              <div className="relative">
                <img
                  src={story.jhumka}
                  alt={story.jhumkaAlt}
                  className="relative h-[min(52vw,280px)] w-auto max-w-[min(46vw,240px)] object-contain mix-blend-lighten drop-shadow-[0_14px_32px_rgba(20,17,15,0.3)] sm:h-[300px] sm:max-w-[260px] md:h-[340px] md:max-w-[300px]"
                  draggable={false}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ opacity: settleOpacity }}
                  aria-hidden
                >
                  <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-champagne-light/35 to-transparent animate-gold-shine" />
                </motion.div>
              </div>
            </motion.div>

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
                  className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/35 animate-sparkle-burst"
                />
              )}
              <span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne-light shadow-[0_0_10px_rgba(221,196,154,1)]" />
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          className="pointer-events-none absolute inset-x-0 bottom-[22%] z-[6] text-center font-display text-xl text-ink/80 md:text-2xl"
          style={{ opacity: settleLineOpacity }}
        >
          {story.settleLine}
        </motion.p>

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

        <motion.div
          className="absolute inset-x-0 bottom-0 z-[7] flex flex-col items-center px-5 pb-14 text-center md:pb-16"
          style={{ opacity: finaleOpacity, y: finaleY }}
        >
          <p className="text-[11px] font-medium tracking-[0.32em] text-champagne-deep uppercase">
            {story.brandLine}
          </p>
          <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
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
