import { motion } from "framer-motion";
import { collections } from "../../data/jewellery";
import { fadeUp, staggerContainer } from "../../utils/motion";
import { scrollToId } from "../../utils/helpers";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Collections() {
  return (
    <section id="collections" className="section-pad relative bg-porcelain">
      <div className="section-shell">
        <div className="mb-16 max-w-2xl md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Collections
          </motion.p>
          <RevealText
            text="Dress the occasion"
            className="mt-5 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl"
            delay={0.1}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink-muted"
          >
            Three moods — ceremony, celebration, and the everyday — composed to
            feel distinct without shouting.
          </motion.p>
          <GoldLine className="mt-8 w-24" delay={0.35} />
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer}
        >
          {collections.map((col, i) => (
            <motion.button
              key={col.id}
              type="button"
              variants={fadeUp}
              custom={i * 0.12}
              onClick={() => scrollToId("#contact")}
              className="group relative block aspect-[3/4] w-full overflow-hidden text-left md:aspect-[3/5]"
            >
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5 transition-all duration-700 group-hover:via-ink/40" />

              <div className="absolute inset-x-0 top-0 flex justify-between p-6 md:p-8">
                <span className="text-[10px] tracking-[0.3em] text-champagne-light uppercase">
                  0{i + 1}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-porcelain/50 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 transition-transform duration-700 group-hover:-translate-y-1 md:p-8">
                <h3 className="font-display text-3xl text-porcelain md:text-4xl lg:text-5xl">
                  {col.name}
                </h3>
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-stone">
                  {col.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-champagne-light uppercase">
                  Enquire
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
