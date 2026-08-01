import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[1.5px] origin-left bg-gradient-to-r from-champagne-deep via-champagne-light to-champagne [.menu-open_&]:invisible"
      style={{ scaleX }}
    />
  );
}
