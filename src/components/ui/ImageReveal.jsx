import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeLuxury } from "../../utils/motion";

export default function ImageReveal({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
  hoverScale = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -40px 0px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${
          hoverScale
            ? "transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-105"
            : ""
        } ${imgClassName}`}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={
          inView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1.12 }
        }
        transition={{
          duration: 1.15,
          delay,
          ease: easeLuxury,
        }}
      />
    </div>
  );
}
