import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "../../data/jewellery";
import { easeLuxury } from "../../utils/motion";
import BrandLogo from "./BrandLogo";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: easeLuxury, delay: 0.15 },
          }}
        >
          <div className="grain opacity-[0.08] mix-blend-soft-light" />

          <div className="relative flex flex-col items-center px-6">
            <motion.div
              className="w-[280px] sm:w-[360px] md:w-[440px]"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: easeLuxury }}
            >
              <BrandLogo className="w-full" imgClassName="w-full drop-shadow-[0_0_40px_rgba(201,169,110,0.2)]" />
            </motion.div>

            <motion.p
              className="mt-8 text-[11px] tracking-[0.32em] text-champagne-light uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {brand.tagline}
            </motion.p>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-champagne"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: easeLuxury }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
