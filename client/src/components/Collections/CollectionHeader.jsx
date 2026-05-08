import { LayoutGrid, Grid2x2 } from "lucide-react";
import SortDropdown from "./SortDropdown";

export default function CollectionHeader({
  title,
  description,
  count,
  sortValue,
  onSortChange,
  gridCols,
  onGridChange,
}) {
  return (
    <div className="text-center pt-8 pb-12">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      <div className="flex justify-between items-end mt-12 pb-4 border-b border-border/50">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">
          {count} products
        </div>
        <div className="flex items-center gap-4">
          <SortDropdown value={sortValue} onChange={onSortChange} />

          {/* Grid toggle — 4-col vs 2-col */}
          <div className="hidden md:flex items-center gap-1 border-l border-border pl-4 ml-2">
            <button
              onClick={() => onGridChange(4)}
              className={`p-1 rounded transition-colors ${gridCols === 4 ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"}`}
              title="4 columns"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onGridChange(2)}
              className={`p-1 rounded transition-colors ${gridCols === 2 ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"}`}
              title="2 columns"
            >
              <Grid2x2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}