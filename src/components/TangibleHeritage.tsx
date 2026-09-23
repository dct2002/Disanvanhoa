import { useRef } from "react";
import { heritageList } from "../data/heritage";
import type { Heritage } from "../types";
import HeritageCard from "./HeritageCard";
import SectionHeading from "./SectionHeading";

interface Props {
  onOpenDetail: (heritage: Heritage) => void;
}

export default function TangibleHeritage({ onOpenDetail }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tangible = heritageList.filter((h) => h.type === "tangible");

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section id="tangible" className="relative bg-ink py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(92,26,36,0.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Di sản vật thể"
          title="DI SẢN VẬT THỂ"
          subtitle="Những dấu tích hữu hình kể lại câu chuyện của hàng nghìn năm lịch sử."
        />

        <div className="mt-14 flex items-center justify-end gap-3">
          <button
            data-cursor-hover
            onClick={() => scrollBy(-420)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold/10"
            aria-label="Cuộn trái"
          >
            ←
          </button>
          <button
            data-cursor-hover
            onClick={() => scrollBy(420)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold/10"
            aria-label="Cuộn phải"
          >
            →
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar mt-6 flex gap-6 overflow-x-auto pb-6 pl-1 pr-6 pt-6"
          style={{ perspective: "1500px" }}
        >
          {tangible.map((h) => (
            <HeritageCard
              key={h.id}
              heritage={h}
              onOpen={onOpenDetail}
              className="w-[280px] sm:w-[320px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
