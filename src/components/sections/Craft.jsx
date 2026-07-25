import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { brand, craft, craftPoints } from "../../data/jewellery";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Craft() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="craft"
      ref={ref}
      className="relative overflow-hidden bg-ink text-porcelain"
    >
      <div className="grain !opacity-[0.07] !mix-blend-soft-light" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-24 h-[28rem] w-[28rem] rounded-full bg-champagne/10 blur-3xl"
        style={reduce ? undefined : { y: glowY }}
      />

      <div className="section-shell section-pad relative">
        {/* Top header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="eyebrow !text-champagne-light"
            >
              {craft.eyebrow}
            </motion.p>
            <RevealText
              text={craft.headline}
              className="mt-4 font-display text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-[3.75rem]"
              delay={0.08}
            />
            <GoldLine className="mt-8 w-24" delay={0.28} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.9, ease: easeLuxury }}
            className="max-w-xs text-sm leading-relaxed text-stone/80 lg:text-right"
          >
            {brand.descriptor}
            <span className="mt-2 block tracking-[0.2em] text-champagne-light/80 uppercase">
              {brand.tagline}
            </span>
          </motion.p>
        </div>

        {/* Main stage */}
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          {/* Image column */}
          <div className="relative overflow-hidden bg-ink-soft">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[640px]">
              <motion.div
                className="absolute inset-0 h-[120%] w-full -top-[10%]"
                style={reduce ? undefined : { y: imgY, scale: imgScale }}
              >
                <img
                  src={craft.image}
                  alt={craft.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.9, ease: easeLuxury }}
                className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10"
              >
                <span className="mb-4 block h-px w-12 bg-champagne" />
                <p className="max-w-md font-display text-2xl leading-snug text-porcelain italic sm:text-3xl md:text-[2rem]">
                  “{craft.quote}”
                </p>
              </motion.blockquote>

              <div className="absolute top-5 left-5 flex items-center gap-3 sm:top-8 sm:left-8">
                <span className="text-[10px] tracking-[0.28em] text-champagne-light uppercase">
                  Atelier
                </span>
                <span className="h-px w-8 bg-porcelain/30" />
                <span className="text-[10px] tracking-[0.2em] text-porcelain/50 uppercase">
                  {brand.name}
                </span>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: easeLuxury }}
                className="text-[15px] leading-relaxed text-stone sm:text-base"
              >
                {brand.about}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.85, ease: easeLuxury }}
                className="mt-4 text-[15px] leading-relaxed text-stone/70 sm:text-base"
              >
                {brand.aboutSecondary}
              </motion.p>

              <div className="mt-10 border-t border-white/10 sm:mt-12">
                {craftPoints.map((point, i) => {
                  const on = active === i;
                  return (
                    <motion.button
                      key={point.id}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.12 + i * 0.08,
                        duration: 0.7,
                        ease: easeOutExpo,
                      }}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`group relative block w-full border-b border-white/10 py-6 text-left transition-colors duration-500 sm:py-7 ${
                        on ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="craft-active"
                          className="absolute top-0 bottom-0 left-0 w-px bg-champagne"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}

                      <div className="flex items-start gap-5 pl-4 sm:gap-7 sm:pl-5">
                        <span
                          className={`font-display text-3xl transition-colors duration-500 sm:text-4xl ${
                            on ? "text-champagne-light" : "text-porcelain/25"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div className="min-w-0 flex-1 pt-1">
                          <h3
                            className={`font-display text-2xl transition-colors duration-500 sm:text-3xl ${
                              on ? "text-porcelain" : "text-porcelain/70"
                            }`}
                          >
                            {point.title}
                          </h3>
                          <AnimatePresence initial={false}>
                            {on && (
                              <motion.p
                                key="desc"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: easeLuxury }}
                                className="overflow-hidden"
                              >
                                <span className="mt-3 block max-w-md text-sm leading-relaxed text-stone">
                                  {point.description}
                                </span>
                              </motion.p>
                            )}
                          </AnimatePresence>
                          {!on && (
                            <p className="mt-2 line-clamp-1 max-w-md text-sm text-stone/45">
                              {point.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: easeLuxury }}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:mt-12 sm:gap-6"
            >
              {craft.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-champagne-light sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.18em] text-stone/55 uppercase sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
