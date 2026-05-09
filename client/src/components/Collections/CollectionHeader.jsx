import { LayoutGrid, Grid3X3, SlidersHorizontal } from "lucide-react";
import SortDropdown from "./SortDropdown";

export default function CollectionHeader({
  title,
  description,
  count,
  sortValue,
  onSortChange,
  gridCols,
  onGridChange,
  onOpenFilters,
}) {
  return (
    <div className="text-center pt-8 pb-12">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col md:flex-row md:justify-between md:items-end mt-12 pb-4 border-b border-border/50 gap-4">
        
        <div className="hidden md:block text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">
          {count} products
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          
          <button 
            onClick={onOpenFilters}
            className="flex md:hidden items-center justify-center gap-2 px-6 py-2 border border-black/10 rounded-lg bg-secondary/30 text-[12px] font-sans uppercase tracking-wider flex-1"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <div className="flex-1 md:flex-none">
            <SortDropdown value={sortValue} onChange={onSortChange} />
          </div>

          <div className="hidden md:flex items-center gap-1 border-l border-border pl-4 ml-2">
            {/* 4 Column Toggle */}
            <button
              onClick={() => onGridChange(4)}
              className={`p-1 rounded transition-colors ${gridCols === 4 ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"}`}
              title="4 columns"
            >
              <LayoutGrid size={18} />
            </button>
            {/* 3 Column Toggle */}
            <button
              onClick={() => onGridChange(3)}
              className={`p-1 rounded transition-colors ${gridCols === 3 ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"}`}
              title="3 columns"
            >
              <Grid3X3 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}