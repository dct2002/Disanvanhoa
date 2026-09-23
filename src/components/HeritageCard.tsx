import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Heritage } from "../types";
import { eraLabels } from "../types";
import HeritageImage from "./HeritageImage";

interface HeritageCardProps {
  heritage: Heritage;
  onOpen: (heritage: Heritage) => void;
  className?: string;
}

export default function HeritageCard({ heritage, onOpen, className = "" }: HeritageCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [style, setStyle] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ rx: py * -10, ry: px * 12, tx: px * 6, ty: py * 6 });
  }

  function handleLeave() {
    setStyle({ rx: 0, ry: 0, tx: 0, ty: 0 });
  }

  return (
    <button
      ref={ref}
      data-cursor-hover
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(heritage)}
      className={`card-3d group relative flex-shrink-0 text-left ${className}`}
    >
      <motion.div
        animate={{ rotateX: style.rx, rotateY: style.ry, y: style.ty * 0.3 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-panel relative h-full overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.35)]"
      >
        <div className="relative h-56 overflow-hidden sm:h-64">
          <HeritageImage
            src={heritage.image}
            alt={heritage.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
          {heritage.unesco && (
            <span className="absolute right-3 top-3 rounded-full border border-gold/60 bg-ink/60 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest text-gold backdrop-blur">
              UNESCO {heritage.unescoYear}
            </span>
          )}
        </div>

        <div className="relative p-5" style={{ transform: "translateZ(30px)" }}>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/80">
            {heritage.location} · {eraLabels[heritage.era]}
          </p>
          <h3 className="mt-2 font-display text-lg leading-snug text-ivory sm:text-xl">
            {heritage.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ivory-dim">{heritage.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Khám phá <span aria-hidden>→</span>
          </span>
        </div>
      </motion.div>
    </button>
  );
}
