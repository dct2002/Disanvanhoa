import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Heritage } from "../types";
import { eraLabels, heritageTypeLabels, regionLabels } from "../types";
import HeritageImage from "./HeritageImage";

interface Props {
  heritage: Heritage | null;
  onClose: () => void;
}

const FOCUSABLE = 'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function HeritageDetailModal({ heritage, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const isOpen = heritage !== null;

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Keyed on open/closed only: `onClose` is a fresh inline function on every
  // App render, and re-running this effect would re-capture the opener and
  // yank focus back to the close button mid-interaction.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {heritage && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="heritage-modal-title"
            initial={{ opacity: 0, scale: 0.92, rotateX: 8, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            style={{ transformStyle: "preserve-3d" }}
            className="glass-panel relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl sm:rounded-[2rem]"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              data-cursor-hover
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ink/60 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Keyed by heritage.id so switching between items while the
                modal stays open remounts this with fresh gallery-index
                state, instead of an effect resetting it after the fact. */}
            <GalleryHero key={heritage.id} heritage={heritage} />

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="flex flex-wrap gap-4 text-xs text-ivory-dim">
                  <span>📍 {heritage.location}</span>
                  <span>🗺️ {regionLabels[heritage.region]}</span>
                  <span>⏳ {eraLabels[heritage.era]}</span>
                  {heritage.year && <span>📅 {formatYear(heritage.year)}</span>}
                </div>

                <p className="mt-6 font-serif text-lg italic leading-relaxed text-ivory">
                  {heritage.description}
                </p>
                <div className="divider-gold my-6" />
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold">
                  Lịch sử & giá trị văn hóa
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ivory-dim">
                  {heritage.longDescription}
                </p>

                {heritage.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {heritage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-ivory-dim"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {heritage.significance && (
                  <InfoRow label="Ý nghĩa" value={heritage.significance} />
                )}
                {heritage.culturalSpace && (
                  <InfoRow label="Không gian văn hóa" value={heritage.culturalSpace} />
                )}
                {heritage.practitioners && (
                  <InfoRow label="Cộng đồng thực hành" value={heritage.practitioners} />
                )}
                {heritage.material && <InfoRow label="Chất liệu" value={heritage.material} />}
                {heritage.origin && <InfoRow label="Nguồn gốc" value={heritage.origin} />}
                {heritage.pattern && <InfoRow label="Họa tiết" value={heritage.pattern} />}

                <div className="glass-panel rounded-xl p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                    Vị trí trên bản đồ
                  </p>
                  <div className="relative mt-3 h-28 overflow-hidden rounded-lg bg-burgundy-dark/40">
                    <div className="ornament-pattern absolute inset-0" />
                    {heritage.mapPosition && (
                      <span
                        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gold shadow-[0_0_12px_3px_rgba(212,175,55,0.6)]"
                        style={{
                          left: `${heritage.mapPosition.x}%`,
                          top: `${heritage.mapPosition.y}%`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GalleryHero({ heritage }: { heritage: Heritage }) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = heritage.gallery && heritage.gallery.length > 0 ? heritage.gallery : [heritage.image];

  return (
    <>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <HeritageImage
          key={gallery[activeImage]}
          src={gallery[activeImage]}
          alt={heritage.name}
          eager
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {heritageTypeLabels[heritage.type]}
            </p>
            <h2 id="heritage-modal-title" className="mt-1 font-display text-2xl text-ivory sm:text-4xl">
              {heritage.name}
            </h2>
          </div>
          {heritage.unesco && (
            <span className="rounded-full border border-gold bg-ink/70 px-3 py-1.5 text-xs uppercase tracking-widest text-gold">
              UNESCO {heritage.unescoYear}
            </span>
          )}
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-6 pt-4">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActiveImage(i)}
              className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === activeImage ? "border-gold" : "border-transparent opacity-60"
              }`}
            >
              <HeritageImage src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel rounded-xl border-l-2 border-gold/60 p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ivory-dim">{value}</p>
    </div>
  );
}

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} TCN`;
  return `${year}`;
}
