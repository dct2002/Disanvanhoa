import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLenis } from "../hooks/useLenis";

const NAV_ITEMS = [
  { label: "Trang chủ", id: "hero" },
  { label: "Di sản vật thể", id: "tangible" },
  { label: "Di sản phi vật thể", id: "intangible" },
  { label: "Di sản tư liệu", id: "documentary" },
  { label: "Bản đồ di sản", id: "map" },
  { label: "Dòng thời gian", id: "timeline" },
  { label: "Về dự án", id: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => goTo("hero")}
          className="group flex items-center gap-2 font-display text-sm tracking-[0.25em] text-ivory sm:text-base"
        >
          <span className="inline-block h-2 w-2 rotate-45 bg-gold transition-transform duration-300 group-hover:rotate-[135deg]" />
          DI SẢN VIỆT NAM
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="relative text-xs uppercase tracking-[0.15em] text-ivory-dim transition-colors duration-300 hover:text-gold"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Mở menu"
        >
          <span
            className={`h-px w-6 bg-gold transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-gold transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-nav overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="border-b border-white/5 py-3 text-left text-sm uppercase tracking-wider text-ivory-dim transition-colors hover:text-gold"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
