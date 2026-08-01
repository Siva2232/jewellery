import { motion } from "framer-motion";
import { whyChooseUs } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury, easeOutExpo, fadeUp, staggerContainer } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function WhyChooseUs() {
  const { eyebrow, headline, description, motto, quote, points, stats } =
    whyChooseUs;

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-ink text-porcelain"
    >
      <div className="grain !opacity-[0.055] !mix-blend-soft-light" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,169,110,0.16),transparent_52%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-[32rem] w-[32rem] translate-x-1/4 translate-y-1/4 rounded-full bg-champagne/8 blur-3xl"
      />

      <div className="section-shell section-pad relative">
        {/* Header band */}
        <div className="mb-14 grid gap-10 lg:mb-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="flex items-center gap-4"
            >
              <p className="eyebrow !text-champagne-light">{eyebrow}</p>
              <span className="h-px w-12 bg-gradient-to-r from-champagne/60 to-transparent" />
              <span className="font-display text-sm tabular-nums text-champagne/70">
                {String(points.length).padStart(2, "0")}
              </span>
            </motion.div>

            <RevealText
              text={headline}
              className="mt-5 font-display text-4xl tracking-tight text-porcelain text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
              delay={0.08}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.85, ease: easeLuxury }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-stone md:mt-6 md:text-base"
            >
              {description}
            </motion.p>

            <GoldLine className="mt-8 w-20" delay={0.32} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.9, ease: easeLuxury }}
            className="lg:pb-2"
          >
            <p className="font-display text-xl leading-snug text-champagne-light/90 italic sm:text-2xl md:text-[1.65rem]">
              “{quote}”
            </p>
            <p className="mt-5 text-[10px] tracking-[0.28em] text-champagne/65 uppercase">
              {motto}
            </p>
            <button
              type="button"
              onClick={() => scrollToId("#contact")}
              className="btn-luxe-light mt-8"
            >
              Talk to us
              <span className="ml-3 inline-block">→</span>
            </button>
          </motion.div>
        </div>

        {/* Reasons — editorial list, not cards */}
        <motion.ol
          className="border-t border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer}
        >
          {points.map((point, i) => (
            <motion.li
              key={point.id}
              variants={fadeUp}
              custom={i * 0.08}
              className="group relative border-b border-white/10"
            >
              <div className="grid gap-4 py-7 sm:grid-cols-[4.5rem_minmax(0,0.95fr)_minmax(0,1.15fr)] sm:items-start sm:gap-8 sm:py-9 md:gap-12 md:py-10">
                <span className="font-display text-2xl tabular-nums text-champagne/50 transition-colors duration-500 group-hover:text-champagne-light sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-2xl tracking-tight text-porcelain transition-colors duration-500 group-hover:text-champagne-light sm:text-[1.65rem] md:text-[1.85rem]">
                  {point.title}
                </h3>

                <p className="max-w-md text-sm leading-relaxed text-stone/85 sm:ml-auto sm:text-[15px]">
                  {point.description}
                </p>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-champagne via-champagne-light/70 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </motion.ol>

        {/* Stats strip */}
        <motion.div
          className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:mt-16 sm:grid-cols-3 sm:gap-0 sm:pt-12 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i * 0.1}
              className={`text-center sm:px-6 sm:text-left ${
                i > 0 ? "sm:border-l sm:border-white/10" : ""
              }`}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.8,
                  ease: easeOutExpo,
                }}
                className="font-display text-3xl tracking-tight text-champagne-light md:text-4xl lg:text-[2.75rem]"
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 text-[10px] tracking-[0.24em] text-stone/70 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
