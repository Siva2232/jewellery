import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand, categories, categoryPieces } from "../../data/jewellery";
import { formatPrice } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

export default function Categories() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [activeType, setActiveType] = useState(null);
  const activeIndex = categories.findIndex((c) => c.id === activeId);
  const active = categories[activeIndex] ?? categories[0];

  const selectCategory = (id) => {
    setActiveId(id);
    setActiveType(null);
  };

  const pieces = useMemo(() => {
    const matched = categoryPieces.filter((p) => p.category === activeId);
    if (!matched.length) return [];
    if (!activeType) return matched;
    const typed = matched.filter((p) => p.type === activeType);
    return typed.length ? typed : matched;
  }, [activeId, activeType]);

  const enquire = (name) =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'm interested in ${name} from your ${active.name} category.`
    )}`;

  const enquireType = (type) =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'd like to see ${type} in your ${active.name} collection.`
    )}`;

  const enquireCategory = () =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'd like to explore your ${active.name} collection.`
    )}`;

  return (
    <section id="categories" className="relative overflow-x-hidden bg-porcelain">
      <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-champagne/10 blur-3xl" />

      <div className="section-shell section-pad relative !px-4 sm:!px-5 md:!px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:mb-14 md:gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-2xl">
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
              className="mt-3 font-display text-3xl tracking-tight text-ink sm:mt-4 sm:text-5xl md:text-6xl lg:text-[4.25rem]"
              delay={0.08}
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeLuxury }}
              className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-5 sm:text-[15px] md:text-base"
            >
              Rings, earrings, bangles, temple forms, and more — pick a
              category, then browse the pieces beneath it.
            </motion.p>
            <GoldLine className="mt-6 w-16 sm:mt-8 sm:w-20" delay={0.3} />
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

        {/* Mobile category chips — scroll, no overflow */}
        <div className="mb-6 lg:hidden">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:-mx-5 sm:px-5">
            {categories.map((cat, i) => {
              const on = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  className={`shrink-0 border px-3.5 py-2.5 text-left transition-colors duration-300 ${
                    on
                      ? "border-ink bg-ink text-porcelain"
                      : "border-line bg-foam text-ink-muted"
                  }`}
                >
                  <span
                    className={`block text-[9px] tracking-[0.18em] uppercase ${
                      on ? "text-champagne-light" : "text-champagne-deep/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block max-w-[9.5rem] truncate text-[11px] font-medium tracking-[0.08em] uppercase">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center font-display text-sm text-ink-muted/70">
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="text-ink-muted/40">
              {" "}
              / {String(categories.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="grid min-w-0 gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-16">
          {/* Desktop nav */}
          <nav className="hidden lg:block" aria-label="Jewellery categories">
            <ul className="sticky top-28 max-h-[calc(100svh-8rem)] space-y-0 overflow-y-auto border-l border-line scrollbar-none">
              {categories.map((cat, i) => {
                const on = cat.id === activeId;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => selectCategory(cat.id)}
                      className="group relative flex w-full items-center gap-3 py-3.5 pl-5 text-left transition-colors"
                    >
                      {on && (
                        <motion.span
                          layoutId="cat-desk-line"
                          className="absolute top-1/2 left-0 h-7 w-px -translate-y-1/2 bg-champagne"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 36,
                          }}
                        />
                      )}
                      <span
                        className={`font-display text-sm transition-colors duration-400 ${
                          on
                            ? "text-champagne-deep"
                            : "text-ink-muted/50 group-hover:text-ink-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`min-w-0 text-[12px] font-medium tracking-[0.1em] uppercase transition-colors duration-400 ${
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

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: easeLuxury }}
              className="grid min-w-0 gap-7 md:gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:gap-10"
            >
              {/* Hero image */}
              <div className="relative min-w-0 overflow-hidden bg-ink">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5] xl:min-h-[560px] xl:aspect-auto">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.img
                      key={active.image}
                      src={active.image}
                      alt={active.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.02, opacity: 0 }}
                      transition={{ duration: 0.9, ease: easeLuxury }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
                    <p className="text-[9px] tracking-[0.28em] text-champagne-light uppercase sm:text-[10px]">
                      {active.count} curated pieces
                    </p>
                    <h3 className="mt-2 font-display text-[1.75rem] leading-[1.1] text-porcelain text-balance sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl">
                      {active.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-stone/90 sm:mt-3 sm:text-sm">
                      {active.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 hidden items-center gap-2 sm:flex md:top-8 md:right-8">
                    <span className="h-px w-8 bg-champagne/70" />
                    <span className="text-[10px] tracking-[0.28em] text-porcelain/70 uppercase">
                      {brand.tagline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Types + pieces */}
              <div className="flex min-w-0 flex-col">
                <div className="min-w-0">
                  <div className="mb-4 flex items-baseline justify-between gap-3 sm:mb-5">
                    <p className="eyebrow">Sub products</p>
                    <span className="shrink-0 text-[10px] tracking-[0.14em] text-ink-muted uppercase sm:text-[11px]">
                      {active.types.length} styles
                    </span>
                  </div>

                  <ul className="border-t border-line">
                    {active.types.map((type, i) => {
                      const on = activeType === type;
                      return (
                        <motion.li
                          key={type}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.04 + i * 0.03,
                            ease: easeOutExpo,
                          }}
                          className="border-b border-line"
                        >
                          <div className="flex w-full min-w-0 items-center">
                            <button
                              type="button"
                              onClick={() => setActiveType(on ? null : type)}
                              className={`flex min-w-0 flex-1 items-center gap-3 py-3.5 pr-2 pl-1 text-left transition-colors duration-300 sm:gap-4 sm:py-4 sm:pl-2 ${
                                on ? "bg-stone/50" : "active:bg-stone/30"
                              }`}
                            >
                              <span className="w-5 shrink-0 font-display text-sm text-champagne-deep/80 sm:w-6">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`min-w-0 flex-1 truncate text-[13px] sm:text-[15px] ${
                                  on ? "text-ink" : "text-ink"
                                }`}
                              >
                                {type}
                              </span>
                              {on && (
                                <span className="hidden shrink-0 text-[9px] tracking-[0.16em] text-champagne-deep uppercase sm:inline">
                                  Showing
                                </span>
                              )}
                            </button>
                            <a
                              href={enquireType(type)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center text-ink-muted/60 transition-colors hover:text-champagne-deep sm:mr-2"
                              aria-label={`Enquire about ${type}`}
                            >
                              <ArrowUpRight size={16} strokeWidth={1.35} />
                            </a>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8 min-w-0 sm:mt-10">
                  <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
                    <p className="eyebrow min-w-0 truncate">
                      {activeType ? activeType : "Selected pieces"}
                    </p>
                    {activeType && (
                      <button
                        type="button"
                        onClick={() => setActiveType(null)}
                        className="link-underline shrink-0 text-[10px] tracking-[0.16em] text-ink-muted uppercase"
                      >
                        Show all
                      </button>
                    )}
                  </div>

                  <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
                    {pieces.slice(0, 3).map((piece, i) => (
                      <motion.a
                        key={piece.id}
                        href={enquire(piece.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 + i * 0.06,
                          duration: 0.5,
                          ease: easeLuxury,
                        }}
                        className="group w-[38vw] max-w-[10.5rem] shrink-0 sm:w-auto sm:max-w-none"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                          <img
                            src={piece.image}
                            alt={piece.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-2.5 font-display text-[0.95rem] leading-snug text-ink sm:mt-3 sm:text-lg">
                          {piece.name}
                        </p>
                        <p className="mt-0.5 truncate text-[9px] tracking-[0.12em] text-champagne-deep uppercase sm:text-[10px]">
                          {piece.type}
                        </p>
                        <p className="mt-1 text-[11px] tracking-wide text-ink-muted">
                          {formatPrice(piece.price)}
                        </p>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-3">
                  <a
                    href={enquireCategory()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxe-fill w-full truncate text-center sm:w-auto sm:max-w-[16rem]"
                  >
                    Enquire · {active.name}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      selectCategory(
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
