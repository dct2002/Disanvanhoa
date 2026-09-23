interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="glass-panel flex items-center gap-3 rounded-full px-5 py-3.5 sm:px-6 sm:py-4">
      <svg
        className="h-5 w-5 flex-shrink-0 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Bạn muốn khám phá di sản nào?"
        className="w-full bg-transparent font-serif text-sm text-ivory placeholder:text-ivory-dim/60 focus:outline-none sm:text-base"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="flex-shrink-0 text-ivory-dim transition-colors hover:text-gold"
          aria-label="Xóa tìm kiếm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
