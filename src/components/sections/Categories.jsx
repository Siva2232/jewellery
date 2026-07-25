import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand, categories, featuredPieces } from "../../data/jewellery";
import { formatPrice, scrollToId } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Categories() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeIndex = categories.findIndex((c) => c.id === activeId);
  const active = categories[activeIndex] ?? categories[0];

  const pieces = useMemo(() => {
    const matched = featuredPieces.filter((p) => p.category === activeId);
    return matched.length ? matched : featuredPieces.slice(0, 3);
  }, [activeId]);

  const enquire = (name) =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'm interested in ${name} from your ${active.name} category.`
    )}`;

  const enquireCategory = () =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'd like to explore your ${active.name} collection.`
    )}`;

  return (
    <section id="categories" className="relative overflow-hidden bg-porcelain">
      <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-champagne/10 blur-3xl" />

      <div className="section-shell section-pad relative">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeLuxury }}
              className="eyebrow"
            >
              The ORRA edit
            </motion.p>
            <RevealText
              text="Find your form"
              className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.25rem]"
              delay={0.08}
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeLuxury }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base"
            >
              Necklaces, earrings, rings, and more — choose a silhouette, then
              refine by type.
            </motion.p>
            <GoldLine className="mt-8 w-20" delay={0.3} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="hidden font-display text-6xl leading-none text-stone-deep/50 lg:block xl:text-7xl"
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="text-3xl text-stone-deep/40">
              /{String(categories.length).padStart(2, "0")}
            </span>
          </motion.p>
        </div>

        {/* Mobile category rail */}
        <div className="-mx-5 mb-8 lg:hidden">
          <div className="flex gap-3 overflow-x-auto px-5 pb-1 scrollbar-none">
            {categories.map((cat, i) => {
              const on = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`relative shrink-0 overflow-hidden transition-all duration-500 ${
                    on ? "w-[7.5rem]" : "w-[4.75rem]"
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                    <img
                      src={cat.image}
                      alt=""
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        on ? "scale-100 opacity-100" : "scale-110 opacity-70"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 transition-colors duration-500 ${
                        on ? "bg-ink/25" : "bg-ink/50"
                      }`}
                    />
                    {on && (
                      <motion.span
                        layoutId="cat-mobile-line"
                        className="absolute inset-x-2 bottom-2 h-px bg-champagne"
                      />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-[10px] tracking-[0.16em] uppercase ${
                      on ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} {cat.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main stage */}
        <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-16">
          {/* Desktop vertical index */}
          <nav className="hidden lg:block" aria-label="Jewellery categories">
            <ul className="sticky top-32 space-y-0 border-l border-line">
              {categories.map((cat, i) => {
                const on = cat.id === activeId;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(cat.id)}
                      className="group relative flex w-full items-center gap-4 py-4 pl-6 text-left transition-colors"
                    >
                      {on && (
                        <motion.span
                          layoutId="cat-desk-line"
                          className="absolute top-1/2 left-0 h-8 w-px -translate-y-1/2 bg-champagne"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                      <span
                        className={`font-display text-sm transition-colors duration-400 ${
                          on ? "text-champagne-deep" : "text-ink-muted/50 group-hover:text-ink-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[13px] font-medium tracking-[0.14em] uppercase transition-colors duration-400 ${
                          on
                            ? "text-ink"
                            : "text-ink-muted group-hover:text-ink"
                        }`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: easeLuxury }}
              className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-10"
            >
              {/* Cinematic image */}
              <div className="relative overflow-hidden bg-ink">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:min-h-[640px] xl:aspect-auto">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.img
                      key={active.image}
                      src={active.image}
                      alt={active.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ scale: 1.12, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.04, opacity: 0 }}
                      transition={{ duration: 1.1, ease: easeLuxury }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.6 }}
                      className="text-[10px] tracking-[0.3em] text-champagne-light uppercase sm:text-[11px]"
                    >
                      {active.count} curated pieces
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22, duration: 0.7, ease: easeOutExpo }}
                      className="mt-3 font-display text-4xl text-porcelain sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.65 }}
                      className="mt-3 max-w-sm text-sm leading-relaxed text-stone/90"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <div className="absolute top-5 right-5 hidden items-center gap-2 sm:flex md:top-8 md:right-8">
                    <span className="h-px w-8 bg-champagne/70" />
                    <span className="text-[10px] tracking-[0.28em] text-porcelain/70 uppercase">
                      {brand.tagline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Types + pieces */}
              <div className="flex flex-col xl:min-h-[640px]">
                <div>
                  <div className="mb-5 flex items-baseline justify-between gap-4">
                    <p className="eyebrow">Shop by type</p>
                    <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
                      {active.types.length} styles
                    </span>
                  </div>

                  <ul className="border-t border-line">
                    {active.types.map((type, i) => (
                      <motion.li
                        key={type}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.06 + i * 0.045,
                          ease: easeOutExpo,
                        }}
                        className="border-b border-line"
                      >
                        <button
                          type="button"
                          onClick={() => scrollToId("#contact")}
                          className="group flex w-full items-center gap-4 py-4 text-left transition-colors duration-400 hover:bg-stone/40 sm:gap-5 sm:py-[1.15rem]"
                        >
                          <span className="w-6 shrink-0 font-display text-sm text-champagne-deep/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-[15px] text-ink transition-colors group-hover:text-ink-soft sm:text-base">
                            {type}
                          </span>
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.35}
                            className="shrink-0 text-ink-muted/60 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne-deep"
                          />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex-1">
                  <div className="mb-5 flex items-end justify-between gap-3">
                    <p className="eyebrow">Selected pieces</p>
                    <button
                      type="button"
                      onClick={() => scrollToId("#featured")}
                      className="link-underline text-[10px] tracking-[0.16em] text-ink-muted uppercase sm:text-[11px]"
                    >
                      View all
                    </button>
                  </div>

                  <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
                    {pieces.slice(0, 3).map((piece, i) => (
                      <motion.a
                        key={piece.id}
                        href={enquire(piece.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2 + i * 0.08,
                          duration: 0.6,
                          ease: easeLuxury,
                        }}
                        className="group w-[42vw] max-w-[11rem] shrink-0 sm:w-auto sm:max-w-none"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                          <img
                            src={piece.image}
                            alt={piece.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                        </div>
                        <p className="mt-3 font-display text-base leading-snug text-ink sm:text-lg">
                          {piece.name}
                        </p>
                        <p className="mt-1 text-[11px] tracking-wide text-ink-muted">
                          {formatPrice(piece.price)}
                        </p>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={enquireCategory()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxe-fill w-full text-center sm:w-auto"
                  >
                    Enquire · {active.name}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveId(
                        categories[(activeIndex + 1) % categories.length].id
                      )
                    }
                    className="btn-luxe-ghost w-full sm:w-auto"
                  >
                    Next category →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
