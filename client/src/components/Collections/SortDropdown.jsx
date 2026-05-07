import { useState } from "react";

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const options = ["Featured", "Newest", "Price: Low to High", "Price: High to Low"];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 group cursor-pointer"
      >
        <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em]">Sort By:</span>
        <span className="font-sans text-[11px] text-muted-foreground uppercase tracking-widest">{selected}</span>
        <span className={`text-[9px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => { setSelected(option); setIsOpen(false); }}
              className={`w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider hover:bg-muted transition-colors ${selected === option ? 'text-brand-accent' : 'text-foreground'}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}