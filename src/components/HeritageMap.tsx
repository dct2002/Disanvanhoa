import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { regions } from "../data/regions";
import { allHeritage } from "../data/heritage";
import { scrollToElement } from "../hooks/useLenis";
import type { Heritage, RegionInfo } from "../types";
import HeritageImage from "./HeritageImage";
import SectionHeading from "./SectionHeading";

interface HeritageMapProps {
  onOpenDetail: (heritage: Heritage) => void;
}

export default function HeritageMap({ onOpenDetail }: HeritageMapProps) {
  const [hovered, setHovered] = useState<RegionInfo | null>(null);
  const [active, setActive] = useState<RegionInfo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const activeHeritage = useMemo(() => {
    if (!active) return [];
    return allHeritage.filter((h) => h.region === active.region && h.id !== "trong-dong-dong-son");
  }, [active]);

  // Hover/tilt are mouse-only: a touch tap emulates enter + move but never a
  // matching leave, which left the preview popup stuck over the map and the
  // map frozen at whatever angle the tap landed on.
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  }

  // Neighbouring pins sit as close as 16px apart (Hà Nội / Bắc Ninh on
  // mobile), so finger-sized hit areas overlap and whichever button is on top
  // would steal the tap — resolve by the pin whose centre is nearest instead.
  function nearestRegion(x: number, y: number, fallback: RegionInfo) {
    let chosen = fallback;
    let best = Infinity;
    for (const btn of containerRef.current?.querySelectorAll<HTMLButtonElement>("button[data-region-id]") ?? []) {
      const r = btn.getBoundingClientRect();
      const d = Math.hypot(r.x + r.width / 2 - x, r.y + r.height / 2 - y);
      const match = regions.find((reg) => reg.id === btn.dataset.regionId);
      if (d < best && match) {
        best = d;
        chosen = match;
      }
    }
    return chosen;
  }

  // Mouse selects on press, not click: the tilted map's hit-testing can put
  // press and release on different elements, and then no click fires at all
  // (measured: 7–9 of 10 pins clickable). Touch still selects on click so a
  // scroll gesture that starts on a pin isn't mistaken for a selection.
  function handlePinPointerDown(e: React.PointerEvent<HTMLButtonElement>, region: RegionInfo) {
    if (e.pointerType === "mouse" && e.button === 0) selectRegion(nearestRegion(e.clientX, e.clientY, region));
  }

  // Keyboard activation (detail === 0) keeps the focused pin. For mouse this
  // re-selects the same region the press already chose — harmless.
  function handlePinClick(e: React.MouseEvent<HTMLButtonElement>, region: RegionInfo) {
    selectRegion(e.detail > 0 ? nearestRegion(e.clientX, e.clientY, region) : region);
  }

  function selectRegion(region: RegionInfo) {
    setActive(region);
    const panel = detailRef.current;
    // Single-column layout puts the detail panel below the map, out of view.
    if (panel && panel.getBoundingClientRect().top > window.innerHeight * 0.7) {
      scrollToElement(panel, -100);
    }
  }

  return (
    <section id="map" className="relative overflow-hidden bg-charcoal py-28">
      <div className="ornament-pattern absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Storytelling"
          title="Việt Nam — Đất nước của di sản"
          subtitle="Trải dọc hình chữ S, mỗi vùng đất mang trong mình những lớp trầm tích văn hóa riêng biệt. Di chuyển và chạm vào bản đồ để bắt đầu hành trình khám phá."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
            className="card-3d relative mx-auto aspect-[3/4] w-full max-w-md"
            // Both levels must stay `flat` for pins to be clickable while tilted.
            // Container: with .card-3d's preserve-3d, the half of the map that
            // rotates away sinks behind this plane and pointer events land here
            // (0/10 pins clickable by mouse). Map: with preserve-3d, the SVG and
            // the pins are coplanar in 3D, so which one gets hit flips on
            // sub-degree tilt changes between press and release — no click.
            style={{ transformStyle: "flat" }}
          >
            <motion.div
              className="glass-panel relative h-full w-full rounded-[2rem] p-6"
              animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
            >
              <svg viewBox="0 0 100 130" className="h-full w-full drop-shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <path
                  d="M52 4 C64 6 70 14 68 22 C66 30 58 30 60 38 C62 46 72 48 70 58 C68 66 58 66 56 74 C54 82 62 86 58 96 C55 104 46 104 46 112 C46 118 52 122 48 128 C44 132 34 122 36 112 C38 104 30 100 32 90 C34 82 42 78 38 68 C35 60 26 58 28 48 C30 40 38 38 36 30 C34 22 40 16 44 10 C46 6 48 3 52 4 Z"
                  fill="rgba(92,26,36,0.25)"
                  stroke="#d4af37"
                  strokeWidth="0.5"
                  opacity="0.85"
                />
              </svg>

              {regions.map((region) => (
                <button
                  key={region.id}
                  data-cursor-hover
                  aria-label={region.name}
                  data-region-id={region.id}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(region)}
                  onPointerLeave={() => setHovered((h) => (h?.id === region.id ? null : h))}
                  onPointerDown={(e) => handlePinPointerDown(e, region)}
                  onClick={(e) => handlePinClick(e, region)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-3"
                  style={{ left: `${region.mapPosition.x}%`, top: `${region.mapPosition.y}%` }}
                >
                  <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-gold/30" />
                  <span
                    className={`relative block h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                      active?.id === region.id
                        ? "scale-150 border-gold bg-gold"
                        : "border-gold bg-gold/70 group-hover:scale-125"
                    }`}
                  />
                </button>
              ))}
            </motion.div>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel pointer-events-none absolute left-1/2 top-2 z-20 w-56 -translate-x-1/2 rounded-xl p-3 sm:left-auto sm:right-0 sm:translate-x-0"
                >
                  <HeritageImage
                    src={hovered.image}
                    alt={hovered.name}
                    className="mb-2 h-24 w-full rounded-lg object-cover"
                  />
                  <p className="font-display text-sm text-ivory">{hovered.name}</p>
                  <p className="mt-0.5 text-xs text-gold">{hovered.heritageCount} di sản tiêu biểu</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div ref={detailRef} className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel rounded-2xl p-6"
                >
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold">
                    Vùng đất di sản
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ivory">{active.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{active.description}</p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeHeritage.map((h) => (
                      <button
                        key={h.id}
                        data-cursor-hover
                        onClick={() => onOpenDetail(h)}
                        className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2 text-left transition-colors hover:border-gold/40"
                      >
                        <HeritageImage
                          src={h.image}
                          alt={h.name}
                          className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                        />
                        <span className="text-xs text-ivory-dim group-hover:text-ivory">{h.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel rounded-2xl p-8 text-center"
                >
                  <p className="font-serif italic text-ivory-dim">
                    Chạm vào một điểm sáng trên bản đồ để khám phá di sản của từng vùng miền.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
