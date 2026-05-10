import { useState } from "react";
import { ChevronDown } from "lucide-react";

const OPTIONS = ["Featured", "Newest", "Price: Low to High", "Price: High to Low"];

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-4 px-4 py-2 border border-black/10 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all min-w-40"
      >
        <span className="font-sans text-[12px] text-foreground uppercase tracking-wider">
          {value}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Transparent backdrop to close dropdown when clicking outside */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider transition-colors
                  ${value === opt
                    ? "bg-black text-white"
                    : "hover:bg-muted text-foreground"
                  }`}
              >
                {opt}
                {value === opt && <span className="float-right text-[10px]">●</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}