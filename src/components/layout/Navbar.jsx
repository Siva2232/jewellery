import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, navLinks } from "../../data/jewellery";
import { scrollToId } from "../../utils/helpers";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const pendingHref = useRef(null);
  const menuPanelRef = useRef(null);

  const menuActive = open || exiting;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Lock background scroll WITHOUT position:fixed / scrollTo.
   * position:fixed was jumping the page (GSAP pins) on every menu toggle.
   * Keep lock until exit animation finishes (menuActive).
   */
  useEffect(() => {
    if (!menuActive) return undefined;

    const { body, documentElement: html } = document;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.classList.add("menu-open");

    const allowTouchScroll = (target) => {
      const panel = menuPanelRef.current;
      if (!panel || !target) return false;
      let node = target;
      while (node && node !== panel) {
        if (
          node instanceof HTMLElement &&
          node.scrollHeight > node.clientHeight + 1
        ) {
          return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const onTouchMove = (e) => {
      if (allowTouchScroll(e.target)) return;
      e.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      body.classList.remove("menu-open");
      document.removeEventListener("touchmove", onTouchMove);

      // Navigate only when a menu link was chosen — never on plain toggle close.
      const href = pendingHref.current;
      pendingHref.current = null;
      if (!href) return;

      requestAnimationFrame(() => {
        if (href === "#top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToId(href);
        }
      });
    };
  }, [menuActive]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        pendingHref.current = null;
        setOpen(false);
        setExiting(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches && (open || exiting)) {
        pendingHref.current = null;
        setOpen(false);
        setExiting(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, exiting]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    pendingHref.current = null; // toggle never navigates / never scrolls
    if (open) {
      setOpen(false);
      setExiting(true);
      return;
    }
    setExiting(false);
    setOpen(true);
  };

  const go = (href) => {
    pendingHref.current = href;
    setOpen(false);
    setExiting(true);
  };

  const light = !scrolled && !menuActive;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || menuActive
          ? "border-b border-line bg-porcelain shadow-[0_1px_0_rgba(20,17,15,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="section-shell relative z-[2] flex h-[5.5rem] items-center justify-between px-5 md:h-[6.5rem] md:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            if (menuActive) {
              go("#top");
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
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
                  scrollToId(link.href);
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
            scrollToId("#contact");
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
          aria-controls="mobile-nav-menu"
          className={`relative z-[3] inline-flex h-10 w-10 items-center justify-center transition-colors duration-300 lg:hidden ${
            light ? "text-porcelain" : "text-ink"
          }`}
          onClick={toggleMenu}
        >
          {open ? (
            <X size={22} strokeWidth={1.25} />
          ) : (
            <Menu size={22} strokeWidth={1.25} />
          )}
        </button>
      </nav>

      <AnimatePresence
        onExitComplete={() => {
          setExiting(false);
        }}
      >
        {open && (
          <motion.div
            id="mobile-nav-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[1] bg-porcelain lg:hidden"
          >
            <div className="absolute inset-0 bg-porcelain" aria-hidden />

            <div className="relative flex h-[100svh] flex-col pt-[5.5rem]">
              <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-5 py-6 pb-28 scrollbar-none">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.href);
                      }}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
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
                <li className="pt-8">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
