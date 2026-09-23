import { motion } from "framer-motion";
import { heritageList } from "../data/heritage";
import type { Heritage } from "../types";
import HeritageImage from "./HeritageImage";
import SectionHeading from "./SectionHeading";

interface Props {
  onOpenDetail: (heritage: Heritage) => void;
}

const rotations = [-4, 3, -2, 5, -5, 2];

export default function DocumentaryHeritage({ onOpenDetail }: Props) {
  const documentary = heritageList.filter((h) => h.type === "documentary");

  return (
    <section id="documentary" className="relative overflow-hidden bg-charcoal py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(212,175,55,0.06)_50%,transparent_60%)]" />
      <DustParticles />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Di sản tư liệu"
          title="KÝ ỨC ĐƯỢC LƯU GIỮ"
          subtitle="Mộc bản, châu bản, bia đá — những trang tư liệu cổ lặng lẽ gìn giữ trí tuệ và ký ức của cha ông."
        />

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-3">
          {documentary.map((h, i) => (
            <DocumentCard
              key={h.id}
              heritage={h}
              rotation={rotations[i % rotations.length]}
              onOpen={onOpenDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentCard({
  heritage,
  rotation,
  onOpen,
}: {
  heritage: Heritage;
  rotation: number;
  onOpen: (h: Heritage) => void;
}) {
  return (
    <motion.button
      data-cursor-hover
      onClick={() => onOpen(heritage)}
      initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ rotate: 0, scale: 1.06, y: -8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative mx-auto w-full max-w-[240px] text-left"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative overflow-hidden rounded-sm border border-gold/25 bg-[#e8dcc0] p-2 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-15px_rgba(212,175,55,0.35)]">
        <div className="relative aspect-[3/4] overflow-hidden">
          <HeritageImage
            src={heritage.image}
            alt={heritage.name}
            className="h-full w-full object-cover sepia-[0.35] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-3">
              <p className="line-clamp-3 text-[0.7rem] leading-relaxed text-ivory-dim">
                {heritage.description}
              </p>
            </div>
          </div>
        </div>
        <div className="px-1.5 py-2.5">
          <p className="font-display text-xs leading-snug text-ink sm:text-sm">{heritage.name}</p>
          {heritage.unescoYear && (
            <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-burgundy">
              Ký ức Thế giới · {heritage.unescoYear}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function DustParticles() {
  const dots = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-ivory-dim"
          style={{ left: `${(i * 29) % 100}%`, top: `${(i * 41) % 100}%` }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -30, -60] }}
          transition={{
            duration: 6 + (i % 6),
            repeat: Infinity,
            delay: (i % 9) * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
