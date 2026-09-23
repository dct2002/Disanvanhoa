import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { allHeritage } from "../data/heritage";
import { unescoStats } from "../data/unesco";
import type { Heritage } from "../types";
import HeritageImage from "./HeritageImage";
import SectionHeading from "./SectionHeading";

interface Props {
  onOpenDetail: (heritage: Heritage) => void;
}

export default function UNESCOSection({ onOpenDetail }: Props) {
  const unescoItems = allHeritage.filter((h) => h.unesco);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % unescoItems.length);
    }, 4200);
    return () => clearInterval(id);
  }, [unescoItems.length]);

  return (
    <section id="unesco" className="relative overflow-hidden bg-burgundy-dark py-28">
      <div className="ornament-pattern absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Vinh danh toàn cầu"
          title="Việt Nam & UNESCO"
          subtitle="Những giá trị văn hóa Việt Nam được thế giới công nhận và gìn giữ cho nhân loại."
        />

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {unescoStats.map((stat) => (
            <Counter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        <div className="relative mt-20 flex h-[380px] items-center justify-center" style={{ perspective: "1600px" }}>
          {unescoItems.map((h, i) => {
            let offset = i - active;
            if (offset > unescoItems.length / 2) offset -= unescoItems.length;
            if (offset < -unescoItems.length / 2) offset += unescoItems.length;
            const isVisible = Math.abs(offset) <= 2;

            return (
              <motion.button
                key={h.id}
                data-cursor-hover
                onClick={() => (offset === 0 ? onOpenDetail(h) : setActive(i))}
                animate={{
                  x: offset * 190,
                  scale: offset === 0 ? 1 : 0.72,
                  rotateY: offset * -35,
                  opacity: isVisible ? 1 - Math.abs(offset) * 0.28 : 0,
                  zIndex: 10 - Math.abs(offset),
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute h-72 w-52 overflow-hidden rounded-2xl border border-gold/30 shadow-2xl sm:h-80 sm:w-60"
                style={{ transformStyle: "preserve-3d" }}
              >
                <HeritageImage src={h.image} alt={h.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="text-[0.6rem] uppercase tracking-widest text-gold">
                    UNESCO {h.unescoYear}
                  </p>
                  <p className="mt-1 font-display text-sm text-ivory">{h.name}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {unescoItems.map((h, i) => (
            <button
              key={h.id}
              onClick={() => setActive(i)}
              aria-label={`Xem ${h.name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-gold" : "w-1.5 bg-gold/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="glass-panel rounded-2xl px-4 py-8 text-center">
      <p className="font-display text-4xl font-bold text-gradient-gold sm:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-3 text-xs uppercase tracking-wider text-ivory-dim">{label}</p>
    </div>
  );
}
