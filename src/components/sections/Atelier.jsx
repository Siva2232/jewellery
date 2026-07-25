import { motion } from "framer-motion";
import { atelier } from "../../data/jewellery";
import { easeLuxury, fadeUp, staggerContainer } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Atelier() {
  return (
    <section id="atelier" className="section-pad relative overflow-hidden bg-porcelain">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 -translate-x-1/3 rounded-full bg-champagne/10 blur-3xl"
      />

      <div className="section-shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.05, ease: easeLuxury }}
            className="relative overflow-hidden bg-stone"
          >
            <div className="relative aspect-[4/5]">
              <img
                src={atelier.image}
                alt="ORRA atelier"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-6 md:p-8">
                <span className="h-px w-8 bg-champagne" />
                <span className="text-[10px] tracking-[0.28em] text-porcelain uppercase">
                  Studio
                </span>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="eyebrow"
            >
              {atelier.eyebrow}
            </motion.p>
            <RevealText
              text={atelier.headline}
              className="mt-5 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-[3.25rem]"
              delay={0.08}
            />
            <GoldLine className="mt-8 w-20" delay={0.28} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.9, ease: easeLuxury }}
              className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base"
            >
              {atelier.body}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32, duration: 0.9, ease: easeLuxury }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base"
            >
              {atelier.secondary}
            </motion.p>

            <motion.ul
              className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {atelier.stats.map((stat, i) => (
                <motion.li key={stat.label} variants={fadeUp} custom={0.1 + i * 0.08}>
                  <p className="font-display text-xl text-ink md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.2em] text-ink-muted uppercase">
                    {stat.label}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
