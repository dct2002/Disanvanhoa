import type { Era, HeritageType, Region } from "../types";
import { eraLabels, heritageTypeLabels, regionLabels } from "../types";

export interface Filters {
  type: HeritageType | "all";
  region: Region | "all";
  era: Era | "all";
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const TYPE_OPTIONS: { value: Filters["type"]; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "tangible", label: heritageTypeLabels.tangible },
  { value: "intangible", label: heritageTypeLabels.intangible },
  { value: "documentary", label: heritageTypeLabels.documentary },
];

const REGION_OPTIONS: { value: Filters["region"]; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "bac-bo", label: regionLabels["bac-bo"] },
  { value: "trung-bo", label: regionLabels["trung-bo"] },
  { value: "tay-nguyen", label: regionLabels["tay-nguyen"] },
  { value: "nam-bo", label: regionLabels["nam-bo"] },
];

const ERA_OPTIONS: { value: Filters["era"]; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "co-dai", label: eraLabels["co-dai"] },
  { value: "trung-dai", label: eraLabels["trung-dai"] },
  { value: "can-dai", label: eraLabels["can-dai"] },
  { value: "hien-dai", label: eraLabels["hien-dai"] },
];

function FilterGroup<T extends string>({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: { value: T; label: string }[];
  active: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 text-[0.65rem] uppercase tracking-[0.25em] text-gold/80">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            data-cursor-hover
            onClick={() => onSelect(opt.value)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300 ${
              active === opt.value
                ? "border-gold bg-gold text-ink"
                : "border-white/10 text-ivory-dim hover:border-gold/50 hover:text-ivory"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  return (
    <div className="glass-panel flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:flex-wrap sm:gap-8 sm:p-6">
      <FilterGroup
        label="Loại di sản"
        options={TYPE_OPTIONS}
        active={filters.type}
        onSelect={(v) => onChange({ ...filters, type: v })}
      />
      <FilterGroup
        label="Khu vực"
        options={REGION_OPTIONS}
        active={filters.region}
        onSelect={(v) => onChange({ ...filters, region: v })}
      />
      <FilterGroup
        label="Thời kỳ"
        options={ERA_OPTIONS}
        active={filters.era}
        onSelect={(v) => onChange({ ...filters, era: v })}
      />
    </div>
  );
}
