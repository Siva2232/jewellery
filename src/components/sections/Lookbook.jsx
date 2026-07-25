import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { lookbook } from "../../data/jewellery";
import { easeLuxury, easeOutExpo } from "../../utils/motion";

export default function Lookbook() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"]);

  return (
    <section
      id="lookbook"
      ref={ref}
      className="relative min-h-[75vh] overflow-hidden bg-ink md:min-h-[90vh]"
    >
      <motion.div
        className="absolute inset-0 h-[130%] w-full -top-[15%]"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
      >
        <img
          src={lookbook.image}
          alt={lookbook.title}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/25" />
      <div className="grain !opacity-[0.06] !mix-blend-soft-light" />

      <motion.div
        style={reduce ? undefined : { y: textY }}
        className="relative section-shell flex min-h-[75vh] items-end px-5 py-20 md:min-h-[90vh] md:px-8 md:py-28"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeLuxury }}
            className="mb-5 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-champagne" />
            <p className="text-[11px] font-medium tracking-[0.32em] text-champagne-light uppercase">
              Lookbook
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-5xl text-porcelain md:text-7xl lg:text-8xl"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: easeOutExpo }}
            >
              {lookbook.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeLuxury }}
            className="mt-5 text-base text-stone md:text-lg"
          >
            {lookbook.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
