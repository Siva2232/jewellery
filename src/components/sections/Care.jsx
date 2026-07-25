import { motion } from "framer-motion";
import { careSteps } from "../../data/jewellery";
import { easeLuxury, fadeUp, staggerContainer } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Care() {
  return (
    <section id="care" className="section-pad relative overflow-hidden bg-stone/35">
      <div className="grain !opacity-[0.03]" />

      <div className="section-shell relative">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="eyebrow"
            >
              Care guide
            </motion.p>
            <RevealText
              text="Keep the finish luminous"
              className="mt-5 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-[3.35rem]"
              delay={0.08}
            />
            <GoldLine className="mt-8 w-20" delay={0.28} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.85, ease: easeLuxury }}
            className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-right"
          >
            Simple habits protect gold-tone finishes — so every wear still
            catches the light.
          </motion.p>
        </div>

        <motion.ol
          className="grid gap-0 border-t border-line sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {careSteps.map((step, i) => (
            <motion.li
              key={step.id}
              variants={fadeUp}
              custom={i * 0.08}
              className="group border-b border-line px-0 py-10 sm:border-r sm:px-6 lg:px-8 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              <span className="font-display text-3xl text-champagne-deep/70 transition-colors duration-500 group-hover:text-champagne-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-2xl text-ink md:text-[1.65rem]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
