import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { brand } from "../../data/jewellery";

export default function ContactToggle() {
  const href = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi ${brand.name} — I'd like to enquire about a piece.`
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 3.4, duration: 0.7 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed right-5 bottom-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-ink text-porcelain shadow-[0_12px_40px_rgba(20,17,15,0.35)] ring-1 ring-champagne/30 md:right-8 md:bottom-8"
      style={{ width: 52, height: 52 }}
    >
      <MessageCircle size={20} strokeWidth={1.4} />
    </motion.a>
  );
}
