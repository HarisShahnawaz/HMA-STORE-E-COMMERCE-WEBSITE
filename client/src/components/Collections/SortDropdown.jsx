import { useState } from "react";

const OPTIONS = ["Featured", "Newest", "Price: Low to High", "Price: High to Low"];

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em]">Sort By:</span>
        <span className="font-sans text-[11px] text-muted-foreground uppercase tracking-widest">{value}</span>
        <span className={`text-[9px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-52 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors
                ${value === opt
                  ? "bg-red-500 text-white"
                  : "hover:bg-muted text-foreground"
                }`}
            >
              {opt}
              {value === opt && <span className="float-right">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}