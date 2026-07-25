import { motion } from "framer-motion";
import { occasions } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury, fadeUp, staggerContainer } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Occasions() {
  return (
    <section id="occasions" className="section-pad relative overflow-hidden bg-ink text-porcelain">
      <div className="grain !opacity-[0.06] !mix-blend-soft-light" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full bg-champagne/10 blur-3xl"
      />

      <div className="section-shell relative">
        <div className="mb-14 max-w-2xl md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeLuxury }}
            className="eyebrow !text-champagne-light"
          >
            Occasions
          </motion.p>
          <RevealText
            text="Dressed for the moment"
            className="mt-5 font-display text-4xl tracking-tight md:text-5xl lg:text-6xl"
            delay={0.08}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.85, ease: easeLuxury }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-stone"
          >
            Bridal, festive, everyday — each mood gets a silhouette that feels
            composed, never costume.
          </motion.p>
          <GoldLine className="mt-8 w-20" delay={0.3} />
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer}
        >
          {occasions.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              variants={fadeUp}
              custom={i * 0.1}
              onClick={() => scrollToId("#contact")}
              className="group relative aspect-[3/4] w-full overflow-hidden text-left"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.15s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10 transition-opacity duration-700 group-hover:via-ink/50" />

              <div className="absolute inset-x-0 top-0 flex justify-between p-6">
                <span className="text-[10px] tracking-[0.28em] text-champagne-light uppercase">
                  0{i + 1}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-porcelain/50 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Enquire
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-700 group-hover:-translate-y-1 md:p-7">
                <h3 className="font-display text-3xl md:text-4xl">{item.name}</h3>
                <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-stone">
                  {item.detail}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
