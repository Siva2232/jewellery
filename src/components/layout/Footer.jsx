import { motion } from "framer-motion";
import { brand, navLinks } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";
import { fadeUp, staggerContainer } from "../../utils/motion";
import GoldLine from "../ui/GoldLine";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-porcelain">
      <div className="grain !opacity-[0.06] !mix-blend-soft-light" />
      <div className="section-shell section-pad relative !py-20 md:!py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr]"
        >
          <motion.div variants={fadeUp} custom={0}>
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-40 w-auto object-contain md:h-48"
            />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-stone">
              {brand.tagline}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.2em] text-champagne-light/80 uppercase">
              {brand.descriptor}
            </p>
            <p className="mt-3 text-[11px] tracking-[0.18em] text-champagne/70 uppercase">
              {brand.motto}
            </p>
            <GoldLine className="mt-8 w-16" delay={0.2} />
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1}>
            <p className="eyebrow !text-champagne-light">Navigate</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.href);
                    }}
                    className="link-underline text-sm text-stone transition-colors hover:text-porcelain"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.18}>
            <p className="eyebrow !text-champagne-light">Studio</p>
            <ul className="mt-6 space-y-3.5 text-sm text-stone">
              <li className="max-w-[16rem] leading-relaxed">{brand.address}</li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="link-underline hover:text-porcelain"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="link-underline hover:text-porcelain"
                >
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-porcelain"
                >
                  @{brand.instagram}
                </a>
              </li>
              <li>{brand.hours}</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-8 text-[11px] tracking-[0.14em] text-stone/60 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.fullName}</p>
          <p>{brand.motto}</p>
        </div>
      </div>
    </footer>
  );
}
