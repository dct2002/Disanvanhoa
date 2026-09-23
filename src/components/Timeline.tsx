import { useRef } from "react";
import { motion } from "framer-motion";
import { timelineEvents } from "../data/timeline";
import HeritageImage from "./HeritageImage";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollerRef.current?.scrollBy({ left: e.deltaY * 1.4 });
    }
  }

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section id="timeline" className="relative bg-ink py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(92,26,36,0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Hành trình lịch sử"
          title="Dòng thời gian di sản"
          subtitle="Hơn bốn nghìn năm dựng nước và giữ nước được khắc ghi qua từng mốc son lịch sử."
        />

        <div className="mt-10 flex items-center justify-end gap-3">
          <button
            data-cursor-hover
            onClick={() => scrollBy(-360)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold/10"
            aria-label="Lùi mốc thời gian"
          >
            ←
          </button>
          <button
            data-cursor-hover
            onClick={() => scrollBy(360)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold/10"
            aria-label="Tiến mốc thời gian"
          >
            →
          </button>
        </div>

        <div
          ref={scrollerRef}
          onWheel={handleWheel}
          className="no-scrollbar relative mt-6 flex gap-0 overflow-x-auto pb-10 pt-4"
        >
          <div className="absolute left-0 right-0 top-[7.5rem] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="relative flex w-[260px] flex-shrink-0 flex-col items-center px-4 sm:w-[300px]"
            >
              <span className="font-display text-xl text-gold sm:text-2xl">{event.yearLabel}</span>
              <span className="relative my-4 flex h-4 w-4 items-center justify-center">
                <span className="absolute h-4 w-4 animate-ping rounded-full bg-gold/40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-gold" />
              </span>

              <div className="glass-panel w-full overflow-hidden rounded-xl">
                <HeritageImage
                  src={event.image}
                  alt={event.title}
                  className="h-32 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="font-display text-sm text-ivory sm:text-base">{event.title}</h4>
                  <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-ivory-dim">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
