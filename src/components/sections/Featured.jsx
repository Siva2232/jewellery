import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredPieces, brand } from "../../data/jewellery";
import { formatPrice, scrollToId } from "../../utils/helpers";
import {
  easeLuxury,
  easeOutExpo,
  fadeUp,
  staggerContainer,
} from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Featured() {
  const reduce = useReducedMotion();
  const [spotlight, ...rest] = featuredPieces;
  const total = featuredPieces.length;

  const enquire = (name) =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'm interested in the ${name}.`
    )}`;

  return (
    <section
      id="featured"
      className="section-pad relative overflow-hidden bg-stone/40"
    >
      <div className="grain !opacity-[0.035]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-champagne/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-champagne/8 blur-3xl"
      />

      <div className="section-shell relative">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="flex items-center gap-4"
            >
              <p className="eyebrow">Signature pieces</p>
              <span className="h-px w-10 bg-champagne/60" />
              <span className="font-display text-sm text-champagne-deep tabular-nums">
                {String(total).padStart(2, "0")}
              </span>
            </motion.div>

            <RevealText
              text="Selected for the light they hold"
              className="mt-5 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-[3.5rem]"
              delay={0.08}
            />
            <GoldLine className="mt-8 w-20" delay={0.3} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.9, ease: easeLuxury }}
            className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-right"
          >
            A curated edit of bridal, festive, and everyday forms — finished for
            lasting wear.
          </motion.p>
        </div>

        {/* Spotlight */}
        {spotlight && (
          <motion.a
            href={enquire(spotlight.name)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.05, ease: easeLuxury }}
            className="group relative mb-6 block overflow-hidden bg-ink md:mb-8 lg:mb-10"
          >
            <div className="relative grid lg:grid-cols-[1.35fr_0.9fr]">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:min-h-[560px]">
                <motion.img
                  src={spotlight.image}
                  alt={spotlight.name}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={reduce ? false : { scale: 1.14 }}
                  whileInView={reduce ? undefined : { scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: easeLuxury }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ink/20 lg:to-ink/55" />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/15" />
              </div>

              <div className="relative flex flex-col justify-between gap-10 bg-ink px-6 py-8 text-porcelain sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.28em] text-champagne-light uppercase">
                      01 · Featured
                    </p>
                    <p className="mt-3 text-[10px] tracking-[0.22em] text-porcelain/45 uppercase">
                      {spotlight.collection}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center border border-porcelain/25 text-porcelain transition-all duration-500 group-hover:border-champagne group-hover:text-champagne">
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.4}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.35rem]">
                    {spotlight.name}
                  </h3>
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-porcelain/15 pt-6">
                    <p className="text-sm tabular-nums text-champagne-light">
                      {formatPrice(spotlight.price)}
                    </p>
                    <span className="text-[11px] font-medium tracking-[0.22em] text-porcelain/70 uppercase transition-colors duration-400 group-hover:text-champagne-light">
                      Enquire
                      <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Grid */}
        <motion.div
          className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.06 }}
          variants={staggerContainer}
        >
          {rest.map((piece, i) => {
            const index = String(i + 2).padStart(2, "0");
            const tall = i % 3 === 1;

            return (
              <motion.article
                key={piece.id}
                variants={fadeUp}
                custom={i * 0.06}
                className={`group ${tall ? "lg:mt-10" : ""}`}
              >
                <a
                  href={enquire(piece.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className={`relative overflow-hidden bg-stone ${
                      tall ? "aspect-[3/4]" : "aspect-[4/5]"
                    }`}
                  >
                    <motion.img
                      src={piece.image}
                      alt={piece.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                      initial={reduce ? false : { scale: 1.12 }}
                      whileInView={reduce ? undefined : { scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.45,
                        delay: 0.05 + i * 0.04,
                        ease: easeLuxury,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5">
                      <span className="font-display text-sm text-porcelain/80">
                        {index}
                      </span>
                      <span className="text-[9px] tracking-[0.22em] text-porcelain/55 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-[10px]">
                        {piece.collection}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
                      <span className="border border-porcelain/40 bg-porcelain/10 px-4 py-2 text-[10px] tracking-[0.2em] text-porcelain uppercase backdrop-blur-sm">
                        Enquire
                      </span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.35}
                        className="text-porcelain/80"
                      />
                    </div>

                    <motion.span
                      aria-hidden
                      className="absolute inset-x-4 bottom-0 h-px origin-left bg-champagne/80 md:inset-x-5"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.25 + i * 0.05,
                        ease: easeOutExpo,
                      }}
                    />
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium tracking-[0.24em] text-champagne-deep uppercase">
                        {piece.collection}
                      </p>
                      <h3 className="mt-2 font-display text-[1.55rem] leading-tight text-ink transition-colors duration-400 group-hover:text-ink-soft md:text-[1.7rem]">
                        {piece.name}
                      </h3>
                    </div>
                    <p className="shrink-0 pt-1 text-sm tabular-nums text-ink-muted">
                      {formatPrice(piece.price)}
                    </p>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Footer cue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease: easeLuxury }}
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center md:mt-20 md:pt-12"
        >
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            Looking for something made to measure? Tell us the occasion — we
            will shape the piece around it.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("#contact")}
            className="btn-luxe-ghost group"
          >
            <span>Talk to us</span>
            <span className="ml-3 inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
