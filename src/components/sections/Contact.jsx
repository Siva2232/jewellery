import { motion } from "framer-motion";
import { brand } from "../../data/jewellery";
import { fadeUp, staggerContainer, easeLuxury } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Contact() {
  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi ${brand.name} — I'd like to enquire about a piece from your collection.`
  )}`;

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-porcelain">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.p
          aria-hidden
          className="select-none font-display text-[18vw] leading-none text-stone/40"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeLuxury }}
        >
          {brand.name}
        </motion.p>
      </div>

      <div className="section-shell relative">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} custom={0} className="eyebrow">
            Private enquiry
          </motion.p>
          <RevealText
            text="Let us find your piece"
            className="mt-5 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl"
            delay={0.1}
          />
          <GoldLine className="mx-auto mt-8 w-20" delay={0.3} />
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink-muted"
          >
            Share the occasion, preferred style, or a piece you love — we&apos;ll
            respond with options and quiet guidance.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.28}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe-fill min-w-[210px]"
            >
              WhatsApp us
            </a>
            <a href={`mailto:${brand.email}`} className="btn-luxe-ghost min-w-[210px]">
              Email studio
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={0.35}
            className="mt-12 text-sm tracking-wide text-ink-muted"
          >
            {brand.phone}
            <span className="mx-3 text-champagne">·</span>
            {brand.hours}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
