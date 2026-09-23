import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "../hooks/useLenis";

interface NavLink {
  label: string;
  id: string;
}

interface NavGroup {
  label: string;
  children: NavLink[];
}

type NavItem = NavLink | NavGroup;

const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", id: "hero" },
  { label: "Bản đồ di sản", id: "map" },
  { label: "Di sản vật thể", id: "tangible" },
  { label: "Di sản phi vật thể", id: "intangible" },
  { label: "Di sản tư liệu", id: "documentary" },
  { label: "Dòng thời gian", id: "timeline" },
  {
    label: "Khám phá",
    children: [
      { label: "UNESCO", id: "unesco" },
      { label: "Hiện vật 3D", id: "artifact" },
      { label: "Tra cứu di sản", id: "explore" },
    ],
  },
  { label: "Về dự án", id: "about" },
];

const desktopItemClass =
  "relative whitespace-nowrap text-xs uppercase tracking-[0.1em] text-ivory-dim transition-colors duration-300 hover:text-gold";
const mobileItemClass =
  "border-b border-white/5 py-3 text-left text-sm uppercase tracking-wider text-ivory-dim transition-colors hover:text-gold";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!groupOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setGroupOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [groupOpen]);

  function goTo(id: string) {
    setOpen(false);
    setGroupOpen(false);
    scrollToSection(id);
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
          className="group flex items-center gap-2 whitespace-nowrap font-display text-sm tracking-[0.25em] text-ivory sm:text-base"
        >
          <span className="inline-block h-2 w-2 rotate-45 bg-gold transition-transform duration-300 group-hover:rotate-[135deg]" />
          DI SẢN VIỆT NAM
        </button>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV_ITEMS.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setGroupOpen(true)}
                onMouseLeave={() => setGroupOpen(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setGroupOpen(false);
                }}
              >
                {/* Open-only (not toggle): hovering already opens it, so a toggle
                    would make a mouse click close the menu it just revealed. */}
                <button
                  onClick={() => setGroupOpen(true)}
                  aria-haspopup="true"
                  aria-expanded={groupOpen}
                  className={`${desktopItemClass} flex items-center gap-1.5 ${groupOpen ? "text-gold" : ""}`}
                >
                  {item.label}
                  <span className={`text-[0.6rem] transition-transform duration-300 ${groupOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {groupOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                    >
                      <div className="glass-panel flex min-w-44 flex-col rounded-xl py-2">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => goTo(child.id)}
                            className="px-5 py-2.5 text-left text-xs uppercase tracking-[0.15em] text-ivory-dim transition-colors hover:bg-gold/10 hover:text-gold"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button key={item.id} onClick={() => goTo(item.id)} className={desktopItemClass}>
                {item.label}
              </button>
            )
          )}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 xl:hidden"
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
            className="glass-nav overflow-hidden xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) =>
                "children" in item ? (
                  <div key={item.label} className="flex flex-col">
                    <p className="pt-3 text-[0.65rem] uppercase tracking-[0.25em] text-gold">{item.label}</p>
                    {item.children.map((child) => (
                      <button key={child.id} onClick={() => goTo(child.id)} className={`${mobileItemClass} pl-4`}>
                        {child.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button key={item.id} onClick={() => goTo(item.id)} className={mobileItemClass}>
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
