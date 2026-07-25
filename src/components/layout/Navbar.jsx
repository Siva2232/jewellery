import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, navLinks } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);

  const menuActive = open || exiting;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      overflow: style.overflow,
      width: style.width,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";
    style.width = "100%";

    return () => {
      style.position = prev.position;
      style.top = prev.top;
      style.left = prev.left;
      style.right = prev.right;
      style.overflow = prev.overflow;
      style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const closeMenu = () => {
    if (!open) return;
    setOpen(false);
    setExiting(true);
  };

  const toggleMenu = () => {
    if (open) {
      closeMenu();
      return;
    }
    setExiting(false);
    setOpen(true);
  };

  const go = (href) => {
    closeMenu();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToId(href));
    });
  };

  const light = !scrolled && !menuActive;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || menuActive
          ? "border-b border-line bg-porcelain/95 shadow-[0_1px_0_rgba(20,17,15,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-[5.5rem] items-center justify-between px-5 md:h-[6.5rem] md:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              });
            });
          }}
          className="relative flex h-[4.25rem] items-center md:h-[5.25rem]"
          aria-label={brand.name}
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-[4.25rem] w-auto object-contain md:h-[5.25rem]"
          />
        </a>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className={`link-underline text-[10px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 xl:text-[11px] xl:tracking-[0.18em] ${
                  light ? "text-stone hover:text-porcelain" : "text-ink-soft"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go("#contact");
          }}
          className={`hidden px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 lg:inline-block ${
            light
              ? "border border-porcelain/35 text-porcelain hover:bg-porcelain hover:text-ink"
              : "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-porcelain"
          }`}
        >
          Enquire
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`inline-flex h-10 w-10 items-center justify-center transition-colors duration-300 lg:hidden ${
            light ? "text-porcelain" : "text-ink"
          }`}
          onClick={toggleMenu}
        >
          {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </nav>

      <AnimatePresence onExitComplete={() => setExiting(false)}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="absolute inset-x-0 top-full max-h-[calc(100svh-5.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-porcelain lg:hidden"
          >
            <ul className="flex flex-col gap-0.5 px-5 py-8">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span className="font-display text-3xl text-ink sm:text-4xl">
                      {link.label}
                    </span>
                    <span className="font-display text-sm text-champagne-deep/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    go("#contact");
                  }}
                  className="btn-luxe-fill"
                >
                  Enquire
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
