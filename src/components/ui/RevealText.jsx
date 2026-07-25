import { motion } from "framer-motion";
import { easeOutExpo, staggerSlow, wordReveal } from "../../utils/motion";

export default function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.055,
              delayChildren: delay,
            },
          },
        }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden">
            <motion.span className="inline-block" variants={wordReveal}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function RevealLines({ lines, as: Tag = "p", className = "", delay = 0 }) {
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          ...staggerSlow,
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: delay,
            },
          },
        }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.9, ease: easeOutExpo },
                },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
