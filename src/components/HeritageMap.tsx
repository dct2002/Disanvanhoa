import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { regions } from "../data/regions";
import { allHeritage } from "../data/heritage";
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
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const activeHeritage = useMemo(() => {
    if (!active) return [];
    return allHeritage.filter((h) => h.region === active.region && h.id !== "trong-dong-dong-son");
  }, [active]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
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
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
            className="card-3d relative mx-auto aspect-[3/4] w-full max-w-md"
          >
            <motion.div
              className="glass-panel relative h-full w-full rounded-[2rem] p-6"
              animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              style={{ transformStyle: "preserve-3d" }}
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
                  onMouseEnter={() => setHovered(region)}
                  onMouseLeave={() => setHovered((h) => (h?.id === region.id ? null : h))}
                  onClick={() => setActive(region)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
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

          <div className="flex flex-col justify-center">
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
