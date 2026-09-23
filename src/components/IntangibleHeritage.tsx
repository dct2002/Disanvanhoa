import { motion } from "framer-motion";
import { heritageList } from "../data/heritage";
import type { Heritage } from "../types";
import HeritageImage from "./HeritageImage";
import SectionHeading from "./SectionHeading";

interface Props {
  onOpenDetail: (heritage: Heritage) => void;
}

export default function IntangibleHeritage({ onOpenDetail }: Props) {
  const intangible = heritageList.filter((h) => h.type === "intangible");

  return (
    <section id="intangible" className="relative overflow-hidden bg-burgundy-dark py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.1),transparent_65%)]" />
      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Di sản phi vật thể"
          title="DI SẢN PHI VẬT THỂ"
          subtitle="Những giá trị vô hình sống trong lời ca, điệu múa và nhịp điệu của cộng đồng."
        />

        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-14">
          {intangible.map((h, i) => (
            <FloatingObject key={h.id} heritage={h} index={i} onOpen={onOpenDetail} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingObject({
  heritage,
  index,
  onOpen,
}: {
  heritage: Heritage;
  index: number;
  onOpen: (h: Heritage) => void;
}) {
  const offset = index % 3 === 0 ? 0 : index % 3 === 1 ? 18 : -14;
  const duration = 5 + (index % 4);

  return (
    <motion.button
      data-cursor-hover
      onClick={() => onOpen(heritage)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
      style={{ marginTop: offset }}
      className="group flex w-36 flex-col items-center text-center sm:w-44"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-gold/15 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gold/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:border-gold sm:h-40 sm:w-40">
          <HeritageImage
            src={heritage.image}
            alt={heritage.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
        {heritage.unesco && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/60 bg-ink/80 px-2 py-0.5 text-[0.55rem] uppercase tracking-widest text-gold">
            UNESCO
          </span>
        )}
      </motion.div>
      <p className="mt-5 font-display text-sm leading-snug text-ivory sm:text-base">
        {heritage.name}
      </p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-gold/70">{heritage.location}</p>
    </motion.button>
  );
}

function FloatingParticles() {
  const dots = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], y: [0, -20, 0] }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: (i % 7) * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
