import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heritageList } from "../data/heritage";
import type { Heritage } from "../types";
import SearchBar from "./SearchBar";
import FilterPanel, { type Filters } from "./FilterPanel";
import HeritageCard from "./HeritageCard";
import SectionHeading from "./SectionHeading";

interface Props {
  onOpenDetail: (heritage: Heritage) => void;
}

const DEFAULT_FILTERS: Filters = { type: "all", region: "all", era: "all" };

export default function Explore({ onOpenDetail }: Props) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return heritageList.filter((h) => {
      if (filters.type !== "all" && h.type !== filters.type) return false;
      if (filters.region !== "all" && h.region !== filters.region) return false;
      if (filters.era !== "all" && h.era !== filters.era) return false;
      if (!q) return true;
      return (
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
      );
    });
  }, [query, filters]);

  const isFiltering = query.trim() !== "" || JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <section id="explore" className="relative bg-charcoal-light py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Tra cứu di sản"
          title="Tìm kiếm & khám phá"
          subtitle="Tìm theo tên, địa phương, loại hình hoặc thời kỳ để bắt đầu hành trình của riêng bạn."
        />

        <div className="mx-auto mt-10 max-w-2xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mx-auto mt-6 max-w-4xl">
          <FilterPanel filters={filters} onChange={setFilters} />
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div
                key={isFiltering ? "results" : "all"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {results.map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
                  >
                    <HeritageCard heritage={h} onOpen={onOpenDetail} className="w-full" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center font-serif italic text-ivory-dim"
              >
                Không tìm thấy di sản phù hợp. Hãy thử một từ khóa hoặc bộ lọc khác.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
