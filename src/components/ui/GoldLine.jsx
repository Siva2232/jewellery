import { motion } from "framer-motion";
import { lineGrow } from "../../utils/motion";

export default function GoldLine({ className = "", delay = 0 }) {
  return (
    <motion.div
      className={`gold-hairline origin-left ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={lineGrow}
      custom={delay}
    />
  );
}
