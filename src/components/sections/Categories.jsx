import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { brand, categories, categoryPieces } from "../../data/jewellery";
import { formatPrice } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import useBulge3D from "../../hooks/useBulge3D";
import RevealText from "../ui/RevealText";
import GoldLine from "../ui/GoldLine";

function PieceCard({ piece, index, href }) {
  const bulge = useBulge3D({ lift: 16, popZ: 48, scale: 1.42 });

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.08 + index * 0.05,
        duration: 0.5,
        ease: easeLuxury,
      }}
      className="group w-[42vw] max-w-[11rem] shrink-0 sm:w-auto sm:max-w-none"
    >
      <div
        ref={bulge.ref}
        onMouseMove={bulge.onMove}
        onMouseLeave={bulge.onLeave}
        className="bulge-scene relative aspect-[4/5] bg-stone ring-1 ring-transparent transition-[box-shadow,ring-color] duration-500 group-hover:shadow-[0_22px_40px_-18px_rgba(20,17,15,0.45)] group-hover:ring-champagne/30"
      >
        <div className="bulge-stage absolute inset-0">
          <img
            src={piece.image}
            alt={piece.name}
            loading="lazy"
            className={`bulge-layer absolute inset-0 h-full w-full object-cover ${
              bulge.active ? "is-bulging" : ""
            }`}
            style={bulge.style}
          />
        </div>
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
  );
}

export default function Categories() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [activeType, setActiveType] = useState(
    () => categories[0]?.types?.[0]?.name ?? null
  );
  const step3Ref = useRef(null);
  const activeIndex = categories.findIndex((c) => c.id === activeId);
  const active = categories[activeIndex] ?? categories[0];

  // Always highlight a sub-product when the category changes.
  useEffect(() => {
    const first = active?.types?.[0]?.name ?? null;
    setActiveType(first);
  }, [activeId, active?.types]);

  const selectCategory = (id) => {
    setActiveId(id);
  };

  const selectType = (typeName) => {
    setActiveType(typeName);
    // Wait a frame so selection state paints, then scroll to Step 3.
    requestAnimationFrame(() => {
      const el = step3Ref.current;
      if (!el) return;
      const navOffset = 96;
      const top =
        el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  };

  const categoryMatched = useMemo(
    () => categoryPieces.filter((p) => p.category === activeId),
    [activeId]
  );

  const typeMeta = useMemo(() => {
    const map = {};
    for (const type of active.types) {
      const matched = categoryMatched.filter((p) => p.type === type.name);
      map[type.name] = {
        count: matched.length,
        image: matched[0]?.image ?? type.image ?? active.image,
      };
    }
    return map;
  }, [active.types, active.image, categoryMatched]);

  const pieces = useMemo(() => {
    if (!categoryMatched.length) return [];
    if (!activeType) return categoryMatched;
    const typed = categoryMatched.filter((p) => p.type === activeType);
    return typed.length ? typed : categoryMatched;
  }, [categoryMatched, activeType]);
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

  const heroBulge = useBulge3D({ lift: 18, popZ: 52, scale: 1.18 });

  return (
    <section id="categories" className="relative overflow-x-hidden bg-porcelain">
      <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-champagne/10 blur-3xl" />

      <div className="section-shell section-pad relative !px-4 sm:!px-5 md:!px-8">
        <div className="mb-8 flex flex-col gap-5 md:mb-14 md:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
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
              Choose a category, then pick a sub-product style — selected pieces
              update below so you can enquire with confidence.
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

        {/* Step 1 — Categories (mobile) */}
        <div className="mb-5 lg:hidden">
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-champagne-deep uppercase">
            Step 1 · Category
          </p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:-mx-5 sm:px-5">
            {categories.map((cat, i) => {
              const on = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  aria-pressed={on}
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
        </div>

        <div className="grid min-w-0 gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-16">
          <nav className="hidden lg:block" aria-label="Jewellery categories">
            <p className="mb-4 pl-5 text-[10px] font-medium tracking-[0.22em] text-champagne-deep uppercase">
              Category
            </p>
            <ul className="sticky top-28 max-h-[calc(100svh-8rem)] space-y-0 overflow-y-auto border-l border-line scrollbar-none">
              {categories.map((cat, i) => {
                const on = cat.id === activeId;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => selectCategory(cat.id)}
                      aria-pressed={on}
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
              className="grid min-w-0 gap-7 md:gap-8 xl:grid-cols-[1fr_1.05fr] xl:gap-10"
            >
              {/* Hero */}
              <div
                ref={heroBulge.ref}
                onMouseMove={heroBulge.onMove}
                onMouseLeave={heroBulge.onLeave}
                className="bulge-scene relative min-w-0 cursor-crosshair bg-ink"
              >
                <div className="bulge-stage relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5] xl:min-h-[560px] xl:aspect-auto">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={active.image}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, ease: easeLuxury }}
                    >
                      <img
                        src={active.image}
                        alt={active.name}
                        className={`bulge-layer absolute inset-0 h-full w-full object-cover ${
                          heroBulge.active ? "is-bulging" : ""
                        }`}
                        style={heroBulge.style}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
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
                </div>
              </div>

              {/* Sub products + pieces */}
              <div className="flex min-w-0 flex-col">
                {/* Step 2 — Sub products */}
                <div className="min-w-0 overflow-hidden rounded-sm border-2 border-champagne/55 bg-porcelain shadow-[0_18px_40px_-28px_rgba(20,17,15,0.35)]">
                  <div className="relative border-b border-champagne/30 bg-gradient-to-r from-ink via-ink to-[#2a241f] px-4 py-4 sm:px-5 sm:py-5 md:px-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-champagne"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-champagne font-display text-lg text-ink sm:h-12 sm:w-12 sm:text-xl">
                          2
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-[10px] font-medium tracking-[0.28em] text-champagne-light uppercase">
                            Step 2 · Choose a style
                          </p>
                          <h4 className="mt-1 font-display text-2xl leading-none text-porcelain sm:text-[1.85rem]">
                            Sub products
                          </h4>
                          <p className="mt-2 max-w-sm text-[13px] leading-snug text-stone/85 sm:text-sm">
                            Tap any style below — we&apos;ll scroll you to the
                            matching pieces.
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 border border-champagne/35 bg-white/5 px-3 py-1.5 text-[10px] tracking-[0.16em] text-champagne-light uppercase">
                        {active.types.length} styles
                      </span>
                    </div>
                  </div>

                  <div className="bg-foam/70 p-4 sm:p-5 md:p-6">
                  {/* Mobile: chip grid with thumbs */}
                  <div className="grid grid-cols-2 gap-2 sm:hidden">
                    {active.types.map((type, i) => {
                      const on = activeType === type.name;
                      const meta = typeMeta[type.name] ?? {};
                      const count = meta.count ?? 0;
                      return (
                        <button
                          key={type.name}
                          type="button"
                          onClick={() => selectType(type.name)}
                          aria-pressed={on}
                          className={`relative flex gap-2.5 border p-2 text-left transition-all duration-300 ${
                            on
                              ? "border-champagne bg-ink text-porcelain shadow-[0_10px_28px_-16px_rgba(20,17,15,0.55)]"
                              : "border-line bg-porcelain text-ink"
                          }`}
                        >
                          <span
                            className={`relative h-14 w-14 shrink-0 overflow-hidden bg-stone ring-1 ${
                              on ? "ring-champagne/50" : "ring-line"
                            }`}
                          >
                            <img
                              src={meta.image}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1 py-0.5 pr-4">
                            <span
                              className={`block font-display text-[10px] ${
                                on
                                  ? "text-champagne-light"
                                  : "text-champagne-deep"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-snug font-medium">
                              {type.name}
                            </span>
                            <span
                              className={`mt-1 block text-[9px] tracking-[0.12em] uppercase ${
                                on ? "text-stone/80" : "text-ink-muted"
                              }`}
                            >
                              {count > 0
                                ? `${count} piece${count === 1 ? "" : "s"}`
                                : "Enquire"}
                            </span>
                          </span>
                          {on && (
                            <span className="absolute top-2 right-2 text-champagne-light">
                              <Check size={14} strokeWidth={2} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Desktop / tablet: selectable list with thumbs */}
                  <ul className="mt-0 hidden border-t border-line sm:mt-0 sm:block">
                    {active.types.map((type, i) => {
                      const on = activeType === type.name;
                      const meta = typeMeta[type.name] ?? {};
                      const count = meta.count ?? 0;
                      return (
                        <motion.li
                          key={type.name}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.03 + i * 0.03,
                            ease: easeOutExpo,
                          }}
                          className="border-b border-line"
                        >
                          <div className="flex w-full min-w-0 items-stretch">
                            <button
                              type="button"
                              onClick={() => selectType(type.name)}
                              aria-pressed={on}
                              className={`relative flex min-w-0 flex-1 items-center gap-3 py-2.5 pr-3 pl-2.5 text-left transition-colors duration-300 sm:gap-3.5 sm:py-3 sm:pl-3 ${
                                on
                                  ? "bg-ink text-porcelain"
                                  : "bg-transparent text-ink hover:bg-stone/50"
                              }`}
                            >
                              {on && (
                                <span
                                  aria-hidden
                                  className="absolute inset-y-0 left-0 w-[3px] bg-champagne"
                                />
                              )}
                              <span
                                className={`relative h-12 w-12 shrink-0 overflow-hidden bg-stone ring-1 sm:h-[3.25rem] sm:w-[3.25rem] ${
                                  on ? "ring-champagne/45" : "ring-line/80"
                                }`}
                              >
                                <img
                                  src={meta.image}
                                  alt=""
                                  loading="lazy"
                                  className={`h-full w-full object-cover transition-transform duration-500 ${
                                    on ? "scale-105" : "scale-100"
                                  }`}
                                />
                              </span>
                              <span
                                className={`w-6 shrink-0 font-display text-sm ${
                                  on
                                    ? "text-champagne-light"
                                    : "text-champagne-deep/80"
                                }`}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="min-w-0 flex-1 text-[14px] sm:text-[15px]">
                                {type.name}
                              </span>
                              <span
                                className={`hidden shrink-0 text-[10px] tracking-[0.14em] uppercase sm:inline ${
                                  on ? "text-champagne-light" : "text-ink-muted"
                                }`}
                              >
                                {count > 0 ? `${count} pc` : "Enquire"}
                              </span>
                              {on && (
                                <Check
                                  size={15}
                                  strokeWidth={2}
                                  className="shrink-0 text-champagne-light"
                                />
                              )}
                            </button>
                            <a
                              href={enquireType(type.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex h-auto w-11 shrink-0 items-center justify-center border-l border-line transition-colors ${
                                on
                                  ? "bg-ink text-champagne-light hover:text-porcelain"
                                  : "text-ink-muted/70 hover:text-champagne-deep"
                              }`}
                              aria-label={`Enquire about ${type.name}`}
                            >
                              <ArrowUpRight size={16} strokeWidth={1.35} />
                            </a>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                  </div>
                </div>

                {/* Step 3 — Pieces for selected sub-product */}
                <div
                  ref={step3Ref}
                  id="category-pieces"
                  className="mt-7 min-w-0 scroll-mt-24 sm:mt-8"
                >
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium tracking-[0.22em] text-champagne-deep uppercase">
                        Step 3 · Pieces
                      </p>
                      <p className="mt-1.5 font-display text-xl text-ink sm:text-2xl">
                        {activeType ?? "All styles"}
                      </p>
                    </div>
                    <a
                      href={enquireType(activeType || active.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline shrink-0 text-[10px] tracking-[0.16em] text-ink-muted uppercase"
                    >
                      Enquire this style
                    </a>
                  </div>

                  {pieces.length > 0 ? (
                    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
                      {pieces.slice(0, 3).map((piece, i) => (
                        <PieceCard
                          key={piece.id}
                          piece={piece}
                          index={i}
                          href={enquire(piece.name)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-line bg-foam/40 px-5 py-8 text-center">
                      <p className="font-display text-lg text-ink">
                        No sample pieces yet
                      </p>
                      <p className="mt-2 text-sm text-ink-muted">
                        Enquire for {activeType} in {active.name} — we&apos;ll
                        share options on WhatsApp.
                      </p>
                      <a
                        href={enquireType(activeType || active.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxe-fill mt-5 inline-flex"
                      >
                        Enquire · {activeType}
                      </a>
                    </div>
                  )}
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
